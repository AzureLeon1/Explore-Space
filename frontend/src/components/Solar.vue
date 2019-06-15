<template>
  <div id="solar">
    <h1 style="color: white">Solar</h1>
    <div class="canvasbox" id="canvasbox">
    </div>
    <div id="wrapper"></div>
  </div>
</template>

<script>
export default {
  name: "Solar",
  data() {
    return {
    };
  },
  methods: {
    start() {
      var canvasbox = document.getElementById("canvasbox");
      /* 基础 */
      var scene, camera, renderer, states, controls;

      // 太阳、水、金、地、火、木、土、土星环、天、天王星环、海王星
      var taiyang, shui, jin, di, huo, mu, tu, tu_huan, tian, tian_huan, hai;
      // 定义角度
      var shui_deg, jin_deg, di_deg, huo_deg, mu_deg, tu_deg, tian_deg, hai_deg;
      shui_deg = jin_deg = di_deg = huo_deg = mu_deg = tu_deg = tian_deg = hai_deg = 0;
      var PI2 = 2 * Math.PI; // 弧度的最大值

      var name_zh = {
        'Sun': "太阳",
        'Mercury': "水星",
        'Venus': "金星",
        'Earth': "地球",
        'Mars': "火星",
        'Jupiter': "木星",
        'Saturn': "土星",
        'Uranus': "天王星",
        'Neptune': "海王星",
      }
      var introduction = {
        'Sun': "  太阳是太阳系的中心天体，占有太阳系总体质量的99.86%。 太阳系中的八大行星、小行星、流星、彗星、外海王星天体以及星际尘埃等，都围绕着太阳公转，而太阳则围绕着银河系的中心公转。 太阳是位于太阳系中心的恒星，它几乎是热等离子体与磁场交织着的一个理想球体。",
        'Mercury': "  水星是太阳系八大行星最内侧也是最小的一颗行星，也是离太阳最近的行星。中国称为辰星，有着八大行星中第二大（包括冥王星）的轨道偏心率。它每87.968个地球日绕行太阳一周，而每公转2.01周同时也自转3圈。",
        'Venus': "  金星是太阳系中八大行星之一，按离太阳由近及远的次序，是第二颗，距离太阳0.725天文单位。 它是离地球最近的行星（火星有时候会更近）。 古罗马人称作维纳斯，中国古代称之为长庚、启明、太白或太白金星，古希腊神话中称为阿佛洛狄特。",
        'Earth': "  地球是太阳系八大行星之一，按离太阳由近及远的次序排为第三颗，也是太阳系中直径、质量和密度最大的类地行星，距离太阳1.5亿公里。地球自西向东自转，同时围绕太阳公转。现有40~46亿岁，它有一个天然卫星——月球，二者组成一个天体系统——地月系统。46亿年以前起源于原始太阳星云。",
        'Mars': "  火星是太阳系八大行星之一，是太阳系由内往外数的第四颗行星，属于类地行星，直径约为地球的53%，质量为地球的14%。自转轴倾角、自转周期均与地球相近，公转一周约为地球公转时间的两倍。橘红色外表是地表的赤铁矿（氧化铁）。我国古书上将火星称为“荧惑星”，西方古代（古罗马）称为“神话玛尔斯星”是十二星座白羊座的独一守护星，并非天蝎座的守护行星。",
        'Jupiter': "  木星是太阳系八大行星中体积最大、自转最快的行星，从内向外的第五颗行星。它的质量为太阳的千分之一，是太阳系中其它七大行星质量总和的2.5倍。由于木星与土星、天王星、海王星皆属气体行星，因此四者又合称类木行星（木星和土星合称气态巨行星）。木星是一个气态巨行星，占所有太阳系行星质量的70%，主要由氢组成，占其总质量的75%，其次为氦，占总质量的25%，岩核则含有其他较重的元素。人类所看到的通常是大气中云层的顶端，压强比1个大气压略高。",
        'Saturn': "  土星是太阳系八大行星之一，距日距离（由近到远）第6位。质量、直径仅次于木星，并与木星同属气态巨行星。欧洲古代（古希腊）称土星为大地之母盖娅，希腊语：Γαία、英语：Gaia (Gaea)，在古代中国也叫镇星或福星。",
        'Uranus': "  天王星为太阳系八大行星之一，是太阳系由内向外的第七颗行星（18.37~20.08天文单位），其体积在太阳系中排名第三（比海王星大），质量排名第四（小于海王星），几乎横躺着围绕太阳公转。",
        'Neptune': "  海王星是太阳系八大行星中的远日行星。按照行星与太阳的距离排列，海王星是第八颗行星，直径上是第四大行星，质量上是第三大行星。海王星的亮度仅为7.85等，只有在天文望远镜里才能看到它。由于它那荧荧的淡蓝色光，所以西方人用罗马神话中的海神——尼普顿（Neptune）”的名字来称呼它。在中文里，把它译为海王星。",

      }

      //鼠标事件相关
      var mouse = new THREE3.Vector2(), //屏幕鼠标向量
        INTERSECTED;
      var raycaster;
      raycaster = new THREE3.Raycaster(); //指向镭射
      //    onmouseenter
      canvasbox.addEventListener("mousemove", onMouseMove, false);
      document.addEventListener("mouseup", onDocumentMouseUp, false);

      var flag = 0;
      var animationFlag = false;
      var aa = false;

      function onMouseMove(event) {
        event.preventDefault();
        mouse.x = (event.clientX / $("canvas").width()) * 2 - 1;
        mouse.y = -(event.clientY / $("canvas").height()) * 2 + 1;

        // console.log(event.clientX, $("canvas").width());
        //射线
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0 && intersects[0].object.name != "") {
          flag++;
          /*取第一个交汇对像（最接近相机）*/
          if (INTERSECTED != intersects[0].object) {
            selection = intersects[0].object;
            var name = selection.name;
            if (flag == 1) {
              if ($("#content").width() == null) {
                animationFlag = true;
                aa = true;
                loader.load("../../static/text.json", function(font) {
                  var textGeo = new THREE3.TextGeometry(name, {
                    size: 17, //字号大小，一般为大写字母的高度
                    height: 0, //文字的厚度
                    weight: "normal", //值为'normal'或'bold'，表示是否加粗
                    font: font, //字体，默认是'helvetiker'，需对应引用的字体文件
                    style: "normal", //值为'normal'或'italics'，表示是否斜体
                    bevelThickness: 1, //倒角厚度
                    bevelSize: 1, //倒角宽度
                    curveSegments: 12, //弧线分段数，使得文字的曲线更加光滑
                    bevelEnabled: false //布尔值，是否使用倒角，意为在边缘处斜切
                  });
                  var textMaterial = new THREE3.MeshPhongMaterial({
                    color: 0xff0000
                  });
                  mesh = new THREE3.Mesh(textGeo, textMaterial);
                  mesh.name = "name";
                  scene.add(mesh);
                  /*复制行星位置*/
                  mesh.position.set(
                    selection.position.x,
                    0,
                    selection.position.z
                  );
                  /*文字居中*/
                  mesh.geometry.center();
                  /*显示在行星的上方（y轴）*/
                  mesh.position.y = selection.position.y + 50;
                  /*面向相机*/
                  mesh.lookAt(camera.position);
                });
              }
              animate();
            }
          }
        } else if (!aa) {
          //鼠标一直在外面，
          flag = 0;
          if (mesh === undefined) {
          } else {
            mesh.visible = false;
          }
          console.log("1");
        } else {
          //鼠标进入后再出来
          flag = 0;
          if (mesh === undefined) {
          } else {
            mesh.visible = false;
          }
          console.log("2");
          aa = false;
          animate();

          var s = scene.children;
          for (var i = 0; i < s.length; i++) {
            if (s[i].name == "name") {
              s[i].visible = false;
            }
          }
        }
      }

      //点击事件
      function onDocumentMouseUp(event) {
        event.preventDefault();
        event.stopPropagation();
        controls = new THREE3.OrbitControls(camera, renderer.domElement);
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        //射线
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        var W = window.innerWidth + "px";
        var H = window.innerHeight + "px";
        var MH = window.innerHeight * 0.05 + "px";
        if (intersects.length > 0 && intersects[0].object.name != "") {
          //            flag++
          /*取第一个交汇对像（最接近相机）*/
          if (INTERSECTED != intersects[0].object) {
            selection = intersects[0].object;

            //                debugger
            if ($("#content").width() == null) {
              $("#canvasbox").animate(
                {
                  width: window.innerWidth * 0.6 + "px",
                  left: 0
                },
                windowChange
              );
              $("canvas").animate({
                width: window.innerWidth * 0.6 + "px",
                left: 0
              });
              $("#wrapper").animate({
                width: window.innerWidth * 0.6 + "px"
              });

              var s = scene.children;
              for (var i = 0; i < s.length; i++) {
                if (s[i].name == "name") {
                  s[i].visible = false;
                }
              }

              console.log(selection.name);

              var c_name = ""
              if (name_zh.hasOwnProperty(selection.name)) {
                c_name = name_zh[selection.name]
              }
              else {
                content = "暂无数据"
              }
              var content = ""
              if (introduction.hasOwnProperty(selection.name)) {
                content = introduction[selection.name]
              }
              else {
                content = "暂无数据"
              }

              //                    $("canvas").width(window.innerWidth*0.2+'px')
              var html = "";
              html +=
                '<div id="content" style="position: absolute;top:0;left: ' +
                W +
                ";width:" +
                W +
                ";height:" +
                H +
                ';background:rgba(0,0,0,0.25);">' +
                '<div style="width: 90%;height: 90%;margin: 0 auto;background: rgba(255,255,255,0.5);border-radius: 5px;position: relative;top:' +
                MH +
                '">' +
                '<div style="width: 100%;height: 30px;text-align: right"><div class="btn-close" style="display: inline-block;font-size: 16px;color: #cccccc;width: 30px;text-align: center">x</div><div style="text-align:center; margin-top: 30px; font-size: 26px; color: #74b9ff;">'+ c_name +'</div><div style="text-align: left; margin: 30px;font-size: 16px;">'+content+'</div></div>' +
                "</div>" +
                "</div>";
              $("body").append(html);
              //                    windowChange()
              $("#content").animate(
                {
                  width: $("#canvasbox").width() * 0.4 + "px",
                  left: $("#canvasbox").width() * 0.6 + "px"
                  //                        width: $("#canvasbox").width()*0.6+'px'
                  //                        left:0
                },
                500
              );
            }

            //                controls = new THREE3.OrbitControls(camera);
          }
        }
      }

      $("body").on("click", ".btn-close", function() {
        $("canvas").animate({
          width: window.innerWidth + "px",
          left: 0
        });
        $("#canvasbox").animate(
          {
            width: window.innerWidth + "px",
            left: 0
          },
          windowChange
        );
        $("#wrapper").animate({
          width: window.innerWidth + "px"
        });
        $("#content").animate({
          left: -window.innerWidth + "px"
        });
        $("#content").remove();
      });
      $(window).on("resize" /*,"#content"*/, function() {
        //        var W = $("body").width() + 'px'
        //        var H = $("body").height() + 'px'
        //        var MH = H * 0.05 + 'px'
        if ($("#content").width() == null) {
        } else {
          $("#canvasbox").width(window.innerWidth * 0.4 + "px");
          $("canvas").width(window.innerWidth * 0.4 + "px");
          $("#wrapper").width(window.innerWidth * 0.4 + "px");
          $("#content")
            .width(window.innerWidth * 0.6 + "px")
            .css("left", $("#canvasbox").width());
        }

        //        windowChange()
      });

      // 场景
      scene = new THREE3.Scene();
      // 照相机
      var initCamera = function() {
        camera = new THREE3.PerspectiveCamera(
          60,
          canvasbox.clientWidth / canvasbox.clientHeight,
          1,
          10000
        );
      };
      initCamera();
      camera = new THREE3.PerspectiveCamera(
        60,
        canvasbox.clientWidth / canvasbox.clientHeight,
        1,
        10000
      );

      camera.position.set(300, 380, 0);
      camera.lookAt({
        x: 0,
        y: 0,
        z: 0
      });
      // 渲染器
      renderer = new THREE3.WebGLRenderer({
        antialias: true
      });
      renderer.setSize(canvasbox.clientWidth, canvasbox.clientHeight);
      renderer.clear(0xffffff);
      canvasbox.appendChild(renderer.domElement);
      // 监视器

      controls = new THREE3.OrbitControls(camera, renderer.domElement);
      var huanjing = new THREE3.AmbientLight(0x8f8f8f);
      scene.add(huanjing);

      var creatobjtaiyang = function() {
        console.log("11");
        var taiyang_geometry = new THREE3.SphereGeometry(32, 100, 100);
        var taiyang_material = new THREE3.MeshLambertMaterial({
          emissive: 0xe65f05,
          map: THREE3.ImageUtils.loadTexture("../../static/img/sunCore.jpg"),
          side: THREE3.DoubleSide,
          color: 0xffffff
        });
        taiyang = new THREE3.Mesh(taiyang_geometry, taiyang_material);
        scene.add(taiyang);
        taiyang.position.set(0, 0, 0);
        taiyang.name = "Sun";
        var taiyang_light = new THREE3.PointLight(0xffffff, 1, 400);
        taiyang_light.position.set(0, 0, 0);
        scene.add(taiyang_light);
      };
      var creatobjshuixing = function() {
        var shui_geometry = new THREE3.SphereGeometry(5, 100, 100);
        var shui_material = new THREE3.MeshLambertMaterial({
          map: THREE3.ImageUtils.loadTexture("../../static/img/shuiCore.jpg"),
          side: THREE3.DoubleSide
        });
        shui = new THREE3.Mesh(shui_geometry, shui_material);
        scene.add(shui);
        shui.position.set(0, 0, 45);
        shui.name = "Mercury";

        var curve = new THREE3.EllipseCurve(
          0,
          0, // ax, aY
          45,
          90, // xRadius, yRadius
          0,
          2 * Math.PI, // aStartAngle, aEndAngle
          false, // aClockwise
          0 // aRotation
        );
        var path = new THREE3.Path(curve.getPoints(150));
        var geometry = path.createPointsGeometry(150);
        var material = new THREE3.LineBasicMaterial({ color: 0x888888 });
        var ellipse = new THREE3.Line(geometry, material);
        scene.add(ellipse);
        ellipse.rotation.x = -Math.PI / 2;
      };
      var creatobjjinxing = function() {
        var jin_geometry = new THREE3.SphereGeometry(7, 100, 100);
        var jin_material = new THREE3.MeshLambertMaterial({
          map: THREE3.ImageUtils.loadTexture("../../static/img/jinCore.jpg"),
          side: THREE3.DoubleSide
        });
        jin = new THREE3.Mesh(jin_geometry, jin_material);
        scene.add(jin);
        jin.position.set(0, 0, 62);
        jin.name = "Venus";

        var curve = new THREE3.EllipseCurve(
          0,
          0, // ax, aY
          62,
          132, // xRadius, yRadius
          0,
          2 * Math.PI, // aStartAngle, aEndAngle
          false, // aClockwise
          0 // aRotation
        );
        var path = new THREE3.Path(curve.getPoints(150));
        var geometry = path.createPointsGeometry(150);
        var material = new THREE3.LineBasicMaterial({ color: 0x888888 });
        var ellipse = new THREE3.Line(geometry, material);
        scene.add(ellipse);
        ellipse.rotation.x = -Math.PI / 2;
      };
      var creatobjdiqiu = function() {
        var di_geometry = new THREE3.SphereGeometry(6, 100, 100);
        var di_material = new THREE3.MeshLambertMaterial({
          map: THREE3.ImageUtils.loadTexture("../../static/img/diCore.jpg"),
          side: THREE3.DoubleSide
        });
        di = new THREE3.Mesh(di_geometry, di_material);
        scene.add(di);
        di.position.set(0, 0, 75);
        di.name = "Earth";

        var curve = new THREE3.EllipseCurve(
          0,
          0, // ax, aY
          75,
          165, // xRadius, yRadius
          0,
          2 * Math.PI, // aStartAngle, aEndAngle
          false, // aClockwise
          0 // aRotation
        );
        var path = new THREE3.Path(curve.getPoints(150));
        var geometry = path.createPointsGeometry(150);
        var material = new THREE3.LineBasicMaterial({ color: 0x888888 });
        var ellipse = new THREE3.Line(geometry, material);
        scene.add(ellipse);
        ellipse.rotation.x = -Math.PI / 2;
      };
      var creatobjhuoxing = function() {
        var huo_geometry = new THREE3.SphereGeometry(9, 100, 100);
        var huo_material = new THREE3.MeshLambertMaterial({
          map: THREE3.ImageUtils.loadTexture("../../static/img/huoCore.jpg"),
          side: THREE3.DoubleSide
        });
        huo = new THREE3.Mesh(huo_geometry, huo_material);
        scene.add(huo);
        huo.position.set(0, 0, 90);
        huo.name = "Mars";

        var curve = new THREE3.EllipseCurve(
          0,
          0, // ax, aY
          90,
          210, // xRadius, yRadius
          0,
          2 * Math.PI, // aStartAngle, aEndAngle
          false, // aClockwise
          0 // aRotation
        );
        var path = new THREE3.Path(curve.getPoints(150));
        var geometry = path.createPointsGeometry(150);
        var material = new THREE3.LineBasicMaterial({ color: 0x888888 });
        var ellipse = new THREE3.Line(geometry, material);
        scene.add(ellipse);
        ellipse.rotation.x = -Math.PI / 2;
      };
      var creatobjmuxing = function() {
        var mu_geometry = new THREE3.SphereGeometry(17, 100, 100);
        var mu_material = new THREE3.MeshLambertMaterial({
          map: THREE3.ImageUtils.loadTexture("../../static/img/muCore.jpg"),
          side: THREE3.DoubleSide
        });
        mu = new THREE3.Mesh(mu_geometry, mu_material);
        scene.add(mu);
        mu.position.set(0, 0, 120);
        mu.rotation.set(0, 20, 0);
        mu.name = "Jupiter";

        var curve = new THREE3.EllipseCurve(
          0,
          0, // ax, aY
          120,
          240, // xRadius, yRadius
          0,
          2 * Math.PI, // aStartAngle, aEndAngle
          false, // aClockwise
          0 // aRotation
        );
        var path = new THREE3.Path(curve.getPoints(150));
        var geometry = path.createPointsGeometry(150);
        var material = new THREE3.LineBasicMaterial({ color: 0x888888 });
        var ellipse = new THREE3.Line(geometry, material);
        scene.add(ellipse);
        ellipse.rotation.x = -Math.PI / 2;
      };
      var mesh;
      var loader = new THREE3.FontLoader();
      var creatobjtuxing = function() {
        var tu_geometry = new THREE3.SphereGeometry(11, 100, 100);
        var tu_material = new THREE3.MeshLambertMaterial({
          map: THREE3.ImageUtils.loadTexture("../../static/img/tuCore.jpg"),
          side: THREE3.DoubleSide
        });
        tu = new THREE3.Mesh(tu_geometry, tu_material);
        scene.add(tu);
        tu.position.set(0, 0, 160);
        tu.rotation.set(0.5, 0, 0);
        tu.name = "Saturn";

        // 土星环
        var tu_huan_geometry = new THREE3.CylinderGeometry(
          14,
          22,
          0,
          100,
          100,
          true
        );
        var tu_huan_material = new THREE3.MeshLambertMaterial({
          map: THREE3.ImageUtils.loadTexture("../../static/img/tuhuanCore.jpg"),
          side: THREE3.DoubleSide
        });
        tu_huan = new THREE3.Mesh(tu_huan_geometry, tu_huan_material);
        scene.add(tu_huan);
        tu_huan.position.set(0, 0, 160);
        tu_huan.rotation.set(0.5, 0, 0);
        //        tu_huan.name = 'tu_huan'

        var curve = new THREE3.EllipseCurve(
          0,
          0, // ax, aY
          160,
          280, // xRadius, yRadius
          0,
          2 * Math.PI, // aStartAngle, aEndAngle
          false, // aClockwise
          0 // aRotation
        );
        var path = new THREE3.Path(curve.getPoints(150));
        var geometry = path.createPointsGeometry(150);
        var material = new THREE3.LineBasicMaterial({ color: 0x888888 });
        var ellipse = new THREE3.Line(geometry, material);
        scene.add(ellipse);
        ellipse.rotation.x = -Math.PI / 2;
      };
      var creatobjtianwangxing = function() {
        var tian_geometry = new THREE3.SphereGeometry(9, 100, 100);
        var tian_material = new THREE3.MeshLambertMaterial({
          map: THREE3.ImageUtils.loadTexture("../../static/img/tianCore.jpg"),
          side: THREE3.DoubleSide
        });
        tian = new THREE3.Mesh(tian_geometry, tian_material);
        scene.add(tian);
        tian.position.set(0, 0, 190);
        tian.rotation.set(0, 0, 0.3);
        tian.name = "Uranus";

        // 天王星环
        var tian_huan_geometry = new THREE3.CylinderGeometry(
          10,
          12,
          0,
          100,
          100,
          true
        );
        var tian_huan_material = new THREE3.MeshLambertMaterial({
          map: THREE3.ImageUtils.loadTexture(
            "../../static/img/tianhuanCore.jpg"
          ),
          side: THREE3.DoubleSide
        });
        tian_huan = new THREE3.Mesh(tian_huan_geometry, tian_huan_material);
        scene.add(tian_huan);
        tian_huan.position.set(0, 0, 190);
        tian_huan.rotation.set(0, 0, 0.3);
        var curve = new THREE3.EllipseCurve(
          0,
          0, // ax, aY
          190,
          310, // xRadius, yRadius
          0,
          2 * Math.PI, // aStartAngle, aEndAngle
          false, // aClockwise
          0 // aRotation
        );
        var path = new THREE3.Path(curve.getPoints(150));
        var geometry = path.createPointsGeometry(150);
        var material = new THREE3.LineBasicMaterial({ color: 0x888888 });
        var ellipse = new THREE3.Line(geometry, material);
        scene.add(ellipse);
        ellipse.rotation.x = -Math.PI / 2;
      };
      var creatobjhaiwangxing = function() {
        var hai_geometry = new THREE3.SphereGeometry(6, 100, 100);
        var hai_material = new THREE3.MeshLambertMaterial({
          map: THREE3.ImageUtils.loadTexture("../../static/img/haiCore.jpg"),
          side: THREE3.DoubleSide
        });
        hai = new THREE3.Mesh(hai_geometry, hai_material);
        scene.add(hai);
        hai.position.set(0, 0, 212);
        hai.name = "Neptune";

        var curve = new THREE3.EllipseCurve(
          0,
          0, // ax, aY
          212,
          332, // xRadius, yRadius
          0,
          2 * Math.PI, // aStartAngle, aEndAngle
          false, // aClockwise
          0 // aRotation
        );

        var path = new THREE3.Path(curve.getPoints(150));
        var geometry = path.createPointsGeometry(150);
        var material = new THREE3.LineBasicMaterial({ color: 0x888888 });
        var ellipse = new THREE3.Line(geometry, material);
        scene.add(ellipse);
        ellipse.rotation.x = -Math.PI / 2;
      };
      var zizhuan = function() {
        taiyang.rotation.y =
          taiyang.rotation.y + 0.01 >= 2 * PI2 ? 0 : taiyang.rotation.y + 0.01; // 太阳自转
        shui.rotation.y =
          shui.rotation.y + 0.1 >= 2 * PI2 ? 0 : shui.rotation.y + 0.1; // 水星自转
        jin.rotation.y =
          jin.rotation.y + 0.05 >= 2 * PI2 ? 0 : jin.rotation.y + 0.05; // 金星自转
        di.rotation.y =
          di.rotation.y + 0.05 >= 2 * PI2 ? 0 : di.rotation.y + 0.05; // 地球自转
        huo.rotation.y =
          huo.rotation.y + 0.03 >= 2 * PI2 ? 0 : huo.rotation.y + 0.03; // 火星自转
        mu.rotation.y =
          mu.rotation.y + 0.003 >= 2 * PI2 ? 0 : mu.rotation.y + 0.003; // 木星自转
        tu.rotation.y =
          tu.rotation.y + 0.01 >= 2 * PI2 ? 0 : tu.rotation.y + 0.01; // 土星自转
        tian.rotation.y =
          tian.rotation.y + 0.005 >= 2 * PI2 ? 0 : tian.rotation.y + 0.005; // 天王自转
        hai.rotation.y =
          hai.rotation.y + 0.003 >= 2 * PI2 ? 0 : hai.rotation.y + 0.003; // 海王星自转
      };
      var gongzhuan = function() {
        // 公转
        // 水星
        shui_deg = shui_deg + 0.0001 >= PI2 ? 0 : shui_deg + 0.001;
        shui.position.set(45 * Math.sin(shui_deg), 0, 90 * Math.cos(shui_deg));
        // 金星
        jin_deg = jin_deg + 0.0007 >= PI2 ? 0 : jin_deg + 0.0007;
        jin.position.set(62 * Math.sin(jin_deg), 0, 132 * Math.cos(jin_deg));
        // 地球
        di_deg = di_deg + 0.0003 >= PI2 ? 0 : di_deg + 0.0003;
        di.position.set(75 * Math.sin(di_deg), 0, 165 * Math.cos(di_deg));
        // 火星
        huo_deg = huo_deg + 0.0005 >= PI2 ? 0 : huo_deg + 0.0005;
        huo.position.set(90 * Math.sin(huo_deg), 0, 210 * Math.cos(huo_deg));
        // 木星
        mu_deg = mu_deg + 0.0002 >= PI2 ? 0 : mu_deg + 0.0002;
        mu.position.set(120 * Math.sin(mu_deg), 0, 240 * Math.cos(mu_deg));
        // 土星
        tu_deg = tu_deg + 0.0003 >= PI2 ? 0 : tu_deg + 0.0003;
        tu.position.set(160 * Math.sin(tu_deg), 0, 280 * Math.cos(tu_deg));
        tu_huan.position.set(160 * Math.sin(tu_deg), 0, 280 * Math.cos(tu_deg));
        // 天王星
        tian_deg = tian_deg + 0.0005 >= PI2 ? 0 : tian_deg + 0.0005;
        tian.position.set(
          190 * Math.sin(tian_deg),
          0,
          310 * Math.cos(tian_deg)
        );
        tian_huan.position.set(
          190 * Math.sin(tian_deg),
          0,
          310 * Math.cos(tian_deg)
        );
        // 海王星
        hai_deg = hai_deg + 0.0003 >= PI2 ? 0 : hai_deg + 0.0003;
        hai.position.set(212 * Math.sin(hai_deg), 0, 332 * Math.cos(hai_deg));
      };

      //星空
      var cloud;
      function createPointCloud(
        size,
        transparent,
        opacity,
        sizeAttenuation,
        color
      ) {
        var geom = new THREE3.Geometry();

        var material = new THREE3.PointCloudMaterial({
          size: size,
          transparent: transparent,
          opacity: 0.5,
          //            map: getTexture(),
          sizeAttenuation: sizeAttenuation,
          color: color
        });

        var range = 5000;
        for (var i = 0; i < 5000; i++) {
          var particle = new THREE3.Vector3(
            Math.random() * range - range / 2,
            Math.random() * range - range / 2,
            Math.random() * range - range / 2
          );
          geom.vertices.push(particle);
        }

        cloud = new THREE3.PointCloud(geom, material);
        //        cloud.name = 'pointcloud';
        cloud.sortParticles = true;
        scene.add(cloud);
        console.log(scene);
      }

      // 窗口改变事件
      function windowChange() {
        var x = camera.position.x,
          y = camera.position.y,
          z = camera.position.z;
        initCamera();
        controls = new THREE3.OrbitControls(camera, renderer.domElement);
        camera.position.set(x, y, z);
        camera.lookAt({
          x: 0,
          y: 0,
          z: 0
        });

        if ($("#content").width() == null) {
          renderer.setSize($("body").width(), $("body").height());
        } else {
          $("#canvasbox").width(window.innerWidth * 0.4 + "px");
          $("canvas").width(window.innerWidth * 0.4 + "px");
          $("#wrapper").width(window.innerWidth * 0.4 + "px");
          $("#content")
            .width(window.innerWidth * 0.6 + "px")
            .css("left", $("#canvasbox").width());
          renderer.setSize($("#canvasbox").width(), $("#canvasbox").height());
        }
      }
      // 动画
      var selection = null;
      var starNames = {}; //指向显示的星星名字对象
      var displayName = undefined; //当前显示名字
      var animation;
      var xx = 0;
      var bb;
      function ddd() {
        xx++;
      }
      function animate() {
        cancelAnimationFrame(animation);

        zizhuan();
        gongzhuan();

        renderer.clear();
        renderer.render(scene, camera);
        animation = requestAnimationFrame(animate);
      }
      // 初始化
      function init() {
        createPointCloud();
        creatobjtaiyang();
        creatobjshuixing();
        creatobjjinxing();
        creatobjdiqiu();
        creatobjhuoxing();
        creatobjmuxing();
        creatobjtuxing();
        creatobjtianwangxing();
        creatobjhaiwangxing();
        console.log(window);
        window.addEventListener("resize", windowChange, false);
        animate();
      }
      init();
    }
  },
  created() {
  },
  mounted() {
    this.start();
  }
};
</script>

<style>
#solar {
  position: fixed;
  height: 100%;
  width: 100%;
}

body {
  margin: 0;
}

body,
html {
  overflow: hidden;
}

body,
html,
.canvasbox {
  width: 100%;
  height: 100%;
}

#wrapper {
  position: relative;
  text-align: center;
}

#wrapper h1 {
  font: normal 60pt Arial;
  color: #ffffff;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
}

#canvasbox {
  position: fixed;
  top: 0;
  left: 0;
}

.btn-close:hover {
  cursor: pointer;
}
</style>
