<template>
  <div id="no-use"></div>
  <!-- 由于未知原因， gio.js 代码对vue组件中的div不起作用，所以实际把div写在了index.html中 -->
</template>

<script>
export default {
  name: "ImportExport",
  methods: {
    init() {
      // get the container to hold the IO globe

      var container = document.getElementById("globalArea");

      // create controller for the IO globe, input the container as the parameter

      var controller = new GIO.Controller(container);

      // 点击国家的回调函数
      controller.onCountryPicked(callback);
      function callback(selectedCountry) {
        console.log("test");

        $("#countryArea").text(selectedCountry.name + " picked!");
        $("#infoBoard").fadeIn(1000);

        setTimeout(function() {
          $("#infoBoard").fadeOut(1000);
        }, 3000);
      }

      // ask a file for the JSON data, using AJAX to load the data

      $.ajax({
        url: "../../static/sampleData.json",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: "json",
        success: function(inputData) {
          console.log(controller);
          // if received the data, use addData() API to add the the data to the controller

          controller.addData(inputData);

          // call the init() API to show the IO globe in the browser

          controller.init();
        }
      });

      $("#china").show();
      $("#russia").show();
      $("#america").show();
      $("#china").click(function() {
        // use the switchCountry() API to directly change the clicked country without clicked on the surface

        controller.switchCountry("CN");
      });

      $("#russia").click(function() {
        controller.switchCountry("RU");
      });

      $("#america").click(function() {
        controller.switchCountry("US");
      });
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    $("#globalArea").empty();
    $("#china").hide();
    $("#russia").hide();
    $("#america").hide();
  }
};
</script>

<style>
</style>
