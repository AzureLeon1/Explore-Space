<template>
  <div class="home">
    <div id="updatenote" class="updatenote mt10">loading model ..</div>
    <button
      id="trackbutton"
      class="bx--btn bx--btn--secondary mt10 trackbutton"
      style="position: fixed; z-index: 5; top: 0; left: 45%"
      type="button"
      disabled
    >Toggle Video Control ..</button>
    <video class="videobox canvasbox" autoplay="autoplay" id="myvideo" style="display: none"></video>
    <canvas id="canvas" class="border canvasbox"></canvas>

    <div id="container"></div>

    <div id="info">
      <strong>
        <a href="http://www.chromeexperiments.com/globe">WebGL Globe</a>
      </strong>
      <span class="bull">&bull;</span> Created by the Leon Wang
      <span class="bull">&bull;</span> Data acquired from
      <a href="http://sedac.ciesin.columbia.edu/gpw/">SEDAC</a>
    </div>

    <div id="title">World Population</div>
    <div id="currentInfo">
      <span id="year1990" class="year">1990</span>
      <span id="year1995" class="year">1995</span>
      <span id="year2000" class="year">2000</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Population",
  data() {
    return {};
  },
  methods: {
    importJS() {
      const oScript = document.createElement("script");
      oScript.type = "text/javascript";
      oScript.src = "./static/js/third-party/three.min.js";
    },
    init() {
      var delta_x = 0;
      var delta_y = 0;
      var temp_delta_x = 0;
      var temp_delta_y = 0;
      var isMove = false;

      console.log(Detector.webgl);
      if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
      } else {
        var years = ["1990", "1995", "2000"];
        var container = document.getElementById("container");
        var opts = {
          imgDir: "../../static/"
        };
        var globe = new DAT.Globe(container, opts);

        console.log(globe);
        var i,
          tweens = [];

        var settime = function(globe, t) {
          return function() {
            new TWEEN.Tween(globe)
              .to({ time: t / years.length }, 500)
              .easing(TWEEN.Easing.Cubic.EaseOut)
              .start();
            var y = document.getElementById("year" + years[t]);
            if (y.getAttribute("class") === "year active") {
              return;
            }
            var yy = document.getElementsByClassName("year");
            for (i = 0; i < yy.length; i++) {
              yy[i].setAttribute("class", "year");
            }
            y.setAttribute("class", "year active");
          };
        };

        for (var i = 0; i < years.length; i++) {
          var y = document.getElementById("year" + years[i]);
          y.addEventListener("click", settime(globe, i), false);
        }

        var xhr;
        TWEEN.start();

        xhr = new XMLHttpRequest();
        xhr.open("GET", "../../static/population909500.json", true);
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState === 4) {
            console.log(xhr.status);
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              window.data = data;
              console.log(data.length);
              for (i = 0; i < data.length; i++) {
                globe.addData(data[i][1], {
                  format: "magnitude",
                  name: data[i][0],
                  animated: true
                });
              }
              globe.createPoints();
              settime(globe, 0)();
              globe.animate();
              document.body.style.backgroundImage = "none"; // remove loading
            }
          }
        };
        xhr.send(null);
      }

      console.log("test-113");
      // TODO: 手部跟踪
      const video = document.getElementById("myvideo");
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
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
            console.log("delta_x: " + delta_x.toString());
            console.log("delta_y: " + delta_y.toString());
            globe.moveHandHandler(delta_x, delta_y)
          }
          if (isVideo) {
            setTimeout(() => {
              runDetection(video);
            }, videoInterval);
          }
        });
      }

      console.log("test");
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
    // this.importJS()
    this.init()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#info {
  font-size: 11px;
  position: fixed;
  z-index: 1;
  bottom: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 3px;
  right: 10px;
  padding: 10px;
  color: #fff;
}

#currentInfo {
  width: 300px;
  position: fixed;
  z-index: 1;
  right: 20px;
  top: 63px;

  background-color: rgba(0, 0, 0, 0.2);

  border-top: 4px solid rgba(255, 255, 255, 0.4);
  padding: 10px;
}

a {
  color: #aaa;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

.bull {
  padding: 0 5px;
  color: #555;
}

#title {
  position: fixed;
  z-index: 1;
  top: 20px;
  width: 270px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  font: 20px Georgia;
  padding: 10px;
  color: #fff;
}

.year {
  font: 16px Georgia;
  line-height: 26px;
  height: 30px;
  text-align: center;
  float: left;
  width: 90px;
  color: rgba(255, 255, 255, 0.4);

  cursor: pointer;
  -webkit-transition: all 0.1s ease-out;
}

.year:hover,
.year.active {
  font-size: 23px;
  color: #fff;
}

#canvas {
  position: fixed;
  right: 0;
  top: 30%;
  width: 25%;
  /* border-left: 1px solid #9c9c9c;
      border-bottom: 1px solid #9c9c9c;
      box-sizing: border-box; */
}
</style>
