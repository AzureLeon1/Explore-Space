<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import Cesium from "cesium/Cesium";
import widgets from "cesium/Widgets/widgets.css";

export default {
  name: "cesiumContainer",
  mounted() {
    var viewer = new Cesium.Viewer("cesiumContainer");
    viewer._cesiumWidget._creditContainer.style.display = "none";
    //  viewer._cesiumWidget._creditViewport.style.display="none";

    // Enable lighting based on sun/moon positions
    viewer.scene.globe.enableLighting = true;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
