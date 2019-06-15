<template>
  <div id="no-use"></div>
  <!-- 由于未知原因， gio.js 代码对vue组件中的div不起作用，所以实际把div写在了index.html中 -->
</template>

<script>
export default {
  name: "ImportExport",
  methods: {
    init() {
      var lookupData = {
        France: "FR",
        "United States": "US",
        China: "CN",
        Russia: "RU"
      };

      var importData = [
        {
          name: "France",
          y: 1000000,
          sliced: false,
          selected: false
        },
        {
          name: "United States",
          y: 1100000,
          sliced: true,
          selected: true
        },
        {
          name: "China",
          y: 1000000,
          sliced: false,
          selected: false
        },
        {
          name: "Russia",
          y: 3000000,
          sliced: false,
          selected: false
        }
      ];

      var exportData = [
        {
          name: "France",
          y: 1000000,
          sliced: false,
          selected: false
        },
        {
          name: "United States",
          y: 1000000,
          sliced: true,
          selected: true
        },
        {
          name: "China",
          y: 3100000,
          sliced: false,
          selected: false
        },
        {
          name: "Russia",
          y: 1000000,
          sliced: false,
          selected: false
        }
      ];

      var importChart = createImportChart();
      var exportChart = createExportChart();

      // get the container to hold the IO globe

      var container = document.getElementById("globalArea");

      // create controller for the IO globe, input the container as the parameter

      var controller = new GIO.Controller(container);

      // 点击国家的回调函数
      controller.onCountryPicked(onCountryClickedCallback);

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

      $("#globalArea").show();
      $("#chooseCountry").show();
      $("#importChartArea").show();
      $("#exportChartArea").show();
      $("#china").click(function() {
        // use the switchCountry() API to directly change the clicked country without clicked on the surface

        controller.switchCountry("CN");
        $("#countryArea").text("CHINA picked!");
        $("#infoBoard").fadeIn(1000);

        setTimeout(function() {
          $("#infoBoard").fadeOut(1000);
        }, 3000);
        updateImportChart("China");
        updateExportChart("China");
      });

      $("#russia").click(function() {
        controller.switchCountry("RU");
        $("#countryArea").text("RUSSIA picked!");
        $("#infoBoard").fadeIn(1000);

        setTimeout(function() {
          $("#infoBoard").fadeOut(1000);
        }, 3000);
        updateImportChart("Russia");
        updateExportChart("Russia");
      });

      $("#america").click(function() {
        controller.switchCountry("US");
        $("#countryArea").text("AMERICA picked!");
        $("#infoBoard").fadeIn(1000);

        setTimeout(function() {
          $("#infoBoard").fadeOut(1000);
        }, 3000);
        updateImportChart("United States");
        updateExportChart("United States");
      });

      function createImportChart() {
        var chart = {
          plotBackgroundColor: "#000000",
          plotBorderWidth: 0,
          plotShadow: false,
          backgroundColor: "#000000"
        };

        var title = {
          text: "Country Import Pie Chart",
          style: {
            color: "#ffffff"
          }
        };

        var tooltip = {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        };

        var plotOptions = {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}%</b>: {point.percentage:.1f} %",
              style: {
                color:
                  (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "black"
              }
            },
            events: {
              click: function(event) {
                switchClickedCountry(event.point.name);
                switchClickedCountry(event.point.name);
                $("#countryArea").text(event.point.name + " picked!");
                $("#infoBoard").fadeIn(1000);

                setTimeout(function() {
                  $("#infoBoard").fadeOut(1000);
                }, 3000);
                updateExportChart(event.point.name);
              }
            }
          }
        };

        var series = [
          {
            type: "pie",
            name: "import percentage",
            slicedOffset: 20,
            data: importData
          }
        ];

        var credits = {
          enabled: false
        };

        var json = {};
        json.chart = chart;
        json.title = title;
        json.tooltip = tooltip;
        json.series = series;
        json.plotOptions = plotOptions;
        json.credits = credits;

        return Highcharts.chart("importChartArea", json);
      }

      function createExportChart() {
        var chart = {
          plotBackgroundColor: "#000000",
          plotBorderWidth: 0,
          plotShadow: false,
          backgroundColor: "#000000"
        };

        var title = {
          text: "Country Export Pie Chart",
          style: {
            color: "#ffffff"
          }
        };

        var tooltip = {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        };

        var plotOptions = {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}%</b>: {point.percentage:.1f} %",
              style: {
                color:
                  (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "black"
              }
            },
            events: {
              click: function(event) {
                console.log(event);
                switchClickedCountry(event.point.name);
                $("#countryArea").text(event.point.name + " picked!");
                $("#infoBoard").fadeIn(1000);

                setTimeout(function() {
                  $("#infoBoard").fadeOut(1000);
                }, 3000);
                updateImportChart(event.point.name);
              }
            }
          }
        };

        var series = [
          {
            type: "pie",
            name: "export percentage",
            slicedOffset: 20,
            data: exportData
          }
        ];

        var credits = {
          enabled: false
        };

        var json = {};
        json.chart = chart;
        json.title = title;
        json.tooltip = tooltip;
        json.series = series;
        json.plotOptions = plotOptions;
        json.credits = credits;

        return Highcharts.chart("exportChartArea", json);
      }

      function switchClickedCountry(countryName) {
        var abbr = lookupData[countryName];
        controller.switchCountry(abbr);
      }

      function onCountryClickedCallback(clickedCountry) {
        $("#countryArea").text(clickedCountry.name + " picked!");
        $("#infoBoard").fadeIn(1000);

        setTimeout(function() {
          $("#infoBoard").fadeOut(1000);
        }, 3000);

        for (var countryName in lookupData) {
          if (lookupData[countryName] === clickedCountry.ISOCode) {
            console.log(countryName);

            updateImportChart(countryName);
            updateExportChart(countryName);

            return;
          }
        }

        updateImportChart();
        updateExportChart();
      }

      function updateImportChart(countryName) {
        for (var i in importData) {
          var data = importData[i];
          if (data.name === countryName) {
            data.sliced = true;
            data.selected = true;
          } else {
            data.sliced = false;
            data.selected = false;
          }
        }

        importChart.series[0].setData(JSON.parse(JSON.stringify(importData)));
      }

      function updateExportChart(countryName) {
        for (var i in exportData) {
          var data = exportData[i];
          if (data.name === countryName) {
            data.sliced = true;
            data.selected = true;
          } else {
            data.sliced = false;
            data.selected = false;
          }
        }

        exportChart.series[0].setData(JSON.parse(JSON.stringify(exportData)));
      }
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    $("#globalArea").empty();
    $("#globalArea").hide();
    $("#chooseCountry").hide();
    $("#importChartArea").hide();
    $("#exportChartArea").hide();
  }
};
</script>

<style>
</style>
