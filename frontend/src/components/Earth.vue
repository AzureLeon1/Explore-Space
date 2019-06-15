<template>
  <div id="earth">
    <div id="updatenote" class="updatenote mt10">loading model ..</div>
    <button
      id="trackbutton"
      class="bx--btn bx--btn--secondary mt10 trackbutton"
      type="button"
      disabled
    >Toggle Video Control ..</button>
    <video class="videobox canvasbox" autoplay="autoplay" id="myvideo" style="display: none"></video>
    <canvas id="canvas" class="border canvasbox"></canvas>
  </div>
</template>

<script>
export default {
  name: "Earth",
  data() {
    return {};
  },
  methods: {
    init() {
      var delta_x = 0;
      var delta_y = 0;
      var temp_delta_x = 0;
      var temp_delta_y = 0;
      var isMove = false;
      //////////////////////
      ///  SCENE/CAMERA  ///
      //////////////////////

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      var renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      // document.body.appendChild( renderer.domElement );
      document.getElementById("earth").appendChild(renderer.domElement);

      camera.position.set(0, 50, 300);
      var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

      //////////////////////
      /////  LIGHTS  ///////
      //////////////////////

      var light = new THREE.AmbientLight(0x888888);
      scene.add(light);

      var light = new THREE.DirectionalLight(0xfdfcf0, 1);
      light.position.set(10, 10, 10);
      scene.add(light);

      //////////////////////
      /////  OBJECTS  //////
      //////////////////////

      var earthGeometry = new THREE.SphereGeometry(50, 50, 50);
      var earthMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.ImageUtils.loadTexture(
          "../../static/images/earth_texture_2.jpg"
        ),
        specular: 0x000000,
        shininess: 0
      });
      var earth = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earth);

      // var saturnRingGeometry = new THREE.RingGeometry(55, 100, 50, 20, 0, 2 * Math.PI);
      // var saturnRingMaterial = new THREE.MeshPhongMaterial({
      //   map: new THREE.ImageUtils.loadTexture("/images/saturnringpattern.gif"),
      //   specular: new THREE.ImageUtils.loadTexture("/images/saturnringcolor.jpg"),
      //   side: THREE.DoubleSide
      // });
      // var saturnRings = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
      // scene.add(saturnRings);

      var starGeometry = new THREE.SphereGeometry(500, 100, 100);
      var starMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.ImageUtils.loadTexture(
          "../../static/images/galaxy_starfield.png"
        ),
        side: THREE.DoubleSide,
        shininess: 0
      });
      var starField = new THREE.Mesh(starGeometry, starMaterial);
      scene.add(starField);

      ///////////////////////////
      /// RENDERING/ANIM LOOP ///
      ///////////////////////////
      var dx = 0.062;
      var dy = -0.027;
      var dz = -0.3;

      var saturnVec = new THREE.Vector3(0, 0, 0);

      var render = function(actions) {
        earth.rotation.y -= 0.001;

        if (isMove) {
          // earth.rotation.x += temp_delta_x * 0.00001 * Math.PI;
          // earth.rotation.y += temp_delta_y * 0.001 * Math.PI;
          earth.rotation.x += delta_y * 0.003 * Math.PI;
          earth.rotation.y += delta_x * 0.02 * Math.PI;
        }

        // camera.position.x += dx;
        // camera.position.y += dy;
        // camera.position.z += dz;

        if (camera.position.y < 2) {
          camera.lookAt(saturnVec);
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
      };
      render();

      const video = document.getElementById("myvideo");
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      console.log(context);
      let trackButton = document.getElementById("trackbutton");
      let updateNote = document.getElementById("updatenote");

      let imgindex = 1;
      let isVideo = false;
      let model = null;
      let videoInterval = 10;

      let last_x = -1;
      let last_y = -1;

      let hand_x = 0;
      let hand_y = 0;

      // video.width = 500
      // video.height = 400

      const modelParams = {
        flipHorizontal: true, // flip e.g for video
        maxNumBoxes: 1, // maximum number of boxes to detect
        iouThreshold: 0.5, // ioU threshold for non-max suppression
        scoreThreshold: 0.6 // confidence threshold for predictions.
      };

      function startVideo() {
        handTrack.startVideo(video).then(function(status) {
          console.log("video started", status);
          if (status) {
            updateNote.innerText = "Now tracking";
            isVideo = true;
            runDetection();
          } else {
            updateNote.innerText = "Please enable video";
          }
        });
      }

      function toggleVideo() {
        if (!isVideo) {
          updateNote.innerText = "Starting video";
          startVideo();
        } else {
          updateNote.innerText = "Stopping video";
          handTrack.stopVideo(video);
          isVideo = false;
          updateNote.innerText = "Video stopped";
        }
      }

      trackButton.addEventListener("click", function() {
        toggleVideo();
      });

      function runDetection() {
        model.detect(video).then(predictions => {
          // console.log("Predictions: ", predictions);
          // get the middle x value of the bounding box and map to paddle location
          model.renderPredictions(predictions, canvas, context, video);
          if (!predictions[0]) {
            isMove = false;
            last_x = -1;
            last_y = -1;
          }
          if (predictions[0]) {
            isMove = true;
            let midval = predictions[0].bbox[0] + predictions[0].bbox[2] / 2;
            // console.log(predictions[0].bbox[0],predictions[0].bbox[1],predictions[0].bbox[2], predictions[0].bbox[3]);
            // gamex = document.body.clientWidth * (midval / video.width)
            // updatePaddleControl(gamex)
            // console.log('Predictions: ', gamex);
            hand_x = predictions[0].bbox[0];
            hand_y = predictions[0].bbox[1];
            temp_delta_x = hand_x - last_x;
            temp_delta_y = hand_y - last_y;
            delta_x =
              temp_delta_x /
              Math.sqrt(Math.pow(temp_delta_x, 2) + Math.pow(temp_delta_y, 2));
            delta_y =
              temp_delta_y /
              Math.sqrt(Math.pow(temp_delta_x, 2) + Math.pow(temp_delta_y, 2));
            last_x = hand_x;
            last_y = hand_y;
          }
          if (isVideo) {
            setTimeout(() => {
              runDetection(video);
            }, videoInterval);
          }
        });
      }

      // Load the model.
      handTrack.load(modelParams).then(lmodel => {
        // detect objects in the image.
        model = lmodel;
        updateNote.innerText = "Loaded Model!";
        trackButton.disabled = false;

        $(".overlaycenter").animate(
          {
            opacity: 0,
            fontSize: "0vw"
          },
          pauseGameAnimationDuration,
          function() {
            $(".pauseoverlay").hide();
          }
        );
      });

      let windowXRange,
        worldXRange = 0;
      let paddle;
      let Vec2;
      let accelFactor;

      // TestBed Details
      var windowHeight = $(document).height();
      var windowWidth = document.body.clientWidth;

      console.log(windowHeight, windowWidth);

      var scale_factor = 10;
      var SPACE_WIDTH = windowWidth / scale_factor;
      var SPACE_HEIGHT = windowHeight / scale_factor;

      // Bead Details
      var NUM_BEADS = 6;
      var BEAD_RESTITUTION = 0.7;

      // Paddle Details
      accelFactor = 0.042 * SPACE_WIDTH;

      var paddleMap = new Map();
      var maxNumberPaddles = 10;
      windowHeight = window.innerHeight;
      windowWidth = window.innerWidth;

      var bounceClip = new Audio("http://victordibia.com/skyfall/bounce.wav");
      bounceClip.type = "audio/wav";
      var enableAudio = false;
      var pauseGame = false;
      var pauseGameAnimationDuration = 500;

      $("input#sound").click(function() {
        enableAudio = $(this).is(":checked");
        soundtext = enableAudio ? "sound on" : "sound off";
        $(".soundofftext").text(soundtext);
      });

    }
  },
  mounted() {
    this.init();
    // this.startGestrue();
  }
};
</script>

<style>
#canvas {
  position: fixed;
  right: 0;
  top: 0;
  width: 25%;
  /* border-left: 1px solid #9c9c9c;
      border-bottom: 1px solid #9c9c9c;
      box-sizing: border-box; */
}
#earth {
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>
