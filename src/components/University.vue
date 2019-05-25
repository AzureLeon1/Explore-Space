<template>
  <div class="home">
    <div id="container"></div>

    <div id="info">
      <strong>
        <a href="http://www.chromeexperiments.com/globe">WebGL Globe</a>
      </strong>
      <span class="bull">&bull;</span> Created by the Leon Wang
      <span class="bull">&bull;</span> Data acquired from
      <a href="http://sedac.ciesin.columbia.edu/gpw/">SEDAC</a>
    </div>

    <div id="title">Top 500 Universities</div>
    <!-- <div id="currentInfo">
      <span id="year1990" class="year">1990</span>
      <span id="year1995" class="year">1995</span>
      <span id="year2000" class="year">2000</span>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "University",
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
      if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
      } else {
        var container = document.getElementById("container");
        var opts = {
          imgDir: "../../static/"
        };
        var globe = new DAT.Globe(container, opts);

        var xhr;

        xhr = new XMLHttpRequest();
        xhr.open("GET", "../../static/school.json", true);

        xhr.onreadystatechange = function(e) {
          console.log(xhr);
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);
              // console.log(data);
              window.data = data;
              globe.addData(data, { format: "magnitude" });
              globe.createPoints();
              globe.animate();
              document.body.style.backgroundImage = "none"; // remove loading
            }
          }
        };
        xhr.send(null);
      }
    }
  },
  mounted() {
    // this.importJS()
    this.init();
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
</style>
