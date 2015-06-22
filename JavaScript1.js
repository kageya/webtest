/// <reference path = "three.js" />
/// <reference path = "TrackballControls.js" />
/// <reference path = "FlyControls.js" />
/// <reference path = "CSS3DRenderer.js" />

var w, h;
var tileW = 1024;
var tileH = 1024;
window.addEventListener("load", function () {

    w = window.innerWidth;
    h = window.innerHeight;
    document.getElementById("content").innerHTML = "start";
//    resizeTo(516, 539);
    threeStart();
});

function threeStart() {
    initThree();
//    initObject();
    initCamera();
    //    loop();
//    drawAxis();
//    drawImage();
    readTile();
//    document.getElementById("content").innerHTML = "startanimate";
    animate();
}

var renderer, scene, canvasFrame;
var planeX = 600;    //平面横幅
var planeY = 400;    //平面縦幅
function initThree() {
    document.getElementById("content").innerHTML = "initThree";
    canvasFrame = document.getElementById('canvas-frame');
    renderer = new THREE.WebGLRenderer({ antialias: true });
//    renderer = new THREE.CanvasRenderer;
    if (!renderer) alert('Three.js の初期化に失敗しました');
    renderer.setSize(w, h);
    canvasFrame.appendChild(renderer.domElement);
    renderer.setClearColor(0xeeeeee, 1.0);

    scene = new THREE.Scene();
}

var camera;
var controls;
function initCamera() {
    document.getElementById("content").innerHTML = "initCamera";
    camera = new THREE.PerspectiveCamera(45, w / h, 1, 100000);
    camera.position.set(1500, 1500, 1500);
    camera.up.set(0, 0, 1);
    camera.lookAt({x:0, y:0, z:0});
    //scene.add(camera);

//    document.getElementById("content").innerHTML = "initCamera 11";
//    trackball = new THREE.TrackballControls(camera, canvasFrame);
//    document.getElementById("content").innerHTML = "initCamera 22";
//    trackball.screen.width = canvasFrame.clientWidth;
//    trackball.screen.height = canvasFrame.clientHeight;
//    trackball.screen.offsetLeft = canvasFrame.getBoundingClientRect.left;
//    trackball.screen.offsetTop = canvasFrame.getBoundingClientRect.top;

//    trackball.noRotate = false;
//    trackball.rotateSpeed = 4.0;
//    trackball.noZoom = false;
//    trackball.zoomSpeed = 4.0;
//    trackball.noPan = false;
//    trackball.panSpeed = 1.0;
//    trackball.target = new THREE.Vector3(0, 10, 0);

//    trackball.staticMoving = true;
    //    trackball.dynamicDampingFactor = 0.3;

//    controls = new THREE.FlyControls(camera, canvasFrame);
//    controls.movementSpeed = 100.0;
//    controls.rollSpeed = Math.PI / 6;
//    controls.autoForward = false;
//    controls.dragToLook = false;

//    var vs = new THREE.Vector3(0, 0, -1);
//    var c = camera.position.clone().normalize().negate();
//    var cos = vs.dot(c);
//    var theta = Math.acos(cos);
//    var v = vs.clone().cross(c).normalize();
//    var q = new THREE.Quaternion().setFromAxisAngle(v, theta);
//    controls.object.quaternion.multiply(q);

//    var v2 = new THREE.Vector2(camera.position.x, camera.position.y).normalize();
//    var my = new THREE.Vector2(0, -1);
//    var cos2 = v2.dot(my);
//    var theta2 = Math.acos(cos2);
//    var q2 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), theta2);

    //    controls.object.quaternion.multiply(q2);

//    var dlight = new THREE.DirectionalLight(0xff0000, 1);
//    dlight.position.set(2000, 0, 1000);
//    scene.add(dligh);
//    dlight = new THREE.DirectionalLight(0x00ff00, 1);
//    dlight.position.set(0,2000, 1000);
//    scene.add(dligh);

//    light = new THREE.AmbientLight(0x000088);
//    scene.add(light);
}

var axis;
var cubes = [];
function initObject() {
    document.getElementById("content").innerHTML = "initObject";
    axis = new THREE.AxisHelper(100);
    scene.add(axis);
    axis.position.set(0, 0, 0);

    var geometry = new THREE.CubeGeometry(30, 30, 30);
    var material = new THREE.MeshNormalMaterial();

    cubes[0] = new THREE.Mesh(geometry, material);
    scene.add(cubes[0]);
    cubes[0].position.set(0, -50, 0);

    cubes[1] = new THREE.Mesh(geometry, material);
    scene.add(cubes[1]);
    cubes[1].position.set(0, 0, 0);

    cubes[2] = new THREE.Mesh(geometry, material);
    scene.add(cubes[2]);
    cubes[2].position.set(0, 50, 0);
}

var step = 0;
var lastTime = new Date();
function loop() {
    //    trackball.update();

    var nowTime = new Date();
    var delta = (nowTime - lastTime) / 1000;
    lastTime = nowTime;
    controls.update(delta);

    step++;
    cubes[0].rotation.set(step / 100, 0, 0);
    cubes[1].rotation.set(0, step / 100,  0);
    cubes[2].rotation.set(0, 0, step / 100);

//    var cameraX = 150 * Math.cos(step / 100);
//    var cameraY = 150 * Math.sin(step / 100);
//    var cameraZ = 150 * Math.cos(step / 100);
//    camera.position.set(cameraX, cameraY, cameraZ);
//    camera.lookAt({ x: 0, y: 0, z: 0 });

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

function animate() {
//    renderer.clear()
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}
function drawAxis() {
    document.getElementById("content").innerHTML = "drawAxis";
    var i, j, x, y, z, c = 0xff0000;
    for (j = 0; j < 3; j++, c >>= 8) {
        switch (j) {
            case 0:
                x = 1, y = 0, z = 0, txt = "X";
                break;
            case 1:
                x = 0, y = 1, z = 0, txt = "Y";
                break;
            case 2:
                x = 0, y = 0, z = 1, txt = "Z";
                break;
        }

        var geometry = new THREE.Geometry();
        col = new THREE.Color(c);
        for (i = -planeX; i < planeX; i += 5) {
            geometry.vertices.push(new THREE.Vector3(x * i, y * i, z * i));
            geometry.colors.push(col);
        }
        var material = new THREE.ParticleBasicMaterial({ size: 10 });
        material.vertexColors = true;
//        material.color = 0xffffff;
        var mesh = new THREE.ParticleSystem(geometry, material);
        mesh.sortParticles = true;
        scene.add(mesh);
        mesh.position.set(0, 0, 0);

//        geometry = new THREE.TextGeometry(txt, { size: 50, height: 1 });
//        mesh = new THREE.Mesh(geometry, material);
//        mesh.position.set(x * -planeX, y * -planeX, z * -planeX);
//        scene.add(mesh);
    }
}

var axis;
function drawAxis2() {
    document.getElementById("content").innerHTML = "drawAxis2";
    axis = new THREE.AxisHelper(100);
    //軸オブジェクトのシーンへの追加
    scene.add(axis);
    //軸オブジェクトの位置座標を設定
    axis.position.set(0, 0, 0);

    var geometry = new THREE.Geometry();
    geometry.vertices[0] = new THREE.Vector3(50, 0, 0);
    geometry.vertices[1] = new THREE.Vector3(0,50,  0);
    geometry.vertices[2] = new THREE.Vector3(0, 0, 50);
    geometry.colors[0] = new THREE.Color(0xff0000);
    geometry.colors[1] = new THREE.Color(0x00ff00);
    geometry.colors[2] = new THREE.Color(0x0000ff);
    var material = new THREE.ParticleBasicMaterial({ color:0xffffff, size: 1000, vertexColors:true });
    var mesh = new THREE.ParticleSystem(geometry, material);
    scene.add(mesh);
    mesh.position.set(0, 0, 0);


}

function drawImage() {
    Sw = planeX / 100;
    Sh = planeY / 100;

    var geometry = new THREE.PlaneBufferGeometry(planeX, planeY, Sw, Sh);
    var vertices = geometry.attributes.position.array;
//    for (var y = 0; y < Sh + 1; y++) {
//        for (var x = 0; x < Sw + 1; x++) {
//            if (x % 2 == 1 && y % 2 == 1)
//                vertices[(y * (Sw + 1) + x) * 3 + 2] = 200;
//        }
    //    }
    vertices[2] = 200;
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    var material = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, blending: THREE.NormalBlending, opacity: 0.7 })
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    var material = new THREE.MeshBasicMaterial({ color: 0x888888, wireframe: true })
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

}
//---------------------------------------------------------
//    標高タイルを読み込む
//---------------------------------------------------------
function readTile() {
    var csv = "http://cyberjapandata.gsi.go.jp/xyz/dem/14/14511/6332.txt";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", csv, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) //処理終了
        {
            var hyoko = new Array();
            if (xhr.status === 200)    //成功
            {
                var txt = xhr.responseText;
                var rows = txt.split(String.fromCharCode(10));
                for (var R = 0; R < rows.length - 1; R++) {
                    var txt2 = rows[R].replace(/(\n)+$/g, '').replace(/(\r)+$/g, '');
                    hyoko.push(txt2.split(","));
                }
            }
            drawTile(hyoko);
        }
    }
    document.getElementById("content").innerHTML = "start hxr.send";
    xhr.send(null);
}

//---------------------------------------------------------
//  メッシュを作る
//---------------------------------------------------------
function drawTile(hyoko) {
    //地図画像をロードしてマテリアルを作成
//    var img = "http://cyberjapandata.gsi.go.jp/xyz/std/14/14547/6463.png";
//    THREE.ImageUtils.crossOrigin = "*";        //他鯖のイメージを読み込む
//    var texture = THREE.ImageUtils.loadTexture(img);
//    var material = new THREE.MeshLambertMaterial({ color: 0x00ff00, map: texture });

    //ジオメトリを作成
    if (hyoko == undefined || hyoko.length == 0) {
        var geometry = new THREE.PlaneBufferGeometry(tileW, tileH, 1, 1);
        document.getElementById("content").innerHTML = "hyoko undeifine";
    }
    else {
        //セグメント数
        var Sw = hyoko[0].length - 1;
        var Sh = hyoko.length - 1;

        //単位高さを計算
        var h = (250000 * 10) / (((40000 * 1000) / Math.pow(2, 14)) * tileW);

        //ジオメトリを作成
        var geometry = new THREE.PlaneBufferGeometry(tileW, tileH, Sw, Sh);
        var vertices = geometry.attributes.position.array;
        for (var y = 0; y < Sh + 1; y++) {
            for (var x = 0; x < Sw + 1; x++)
                //標高データをzにセット
                if (hyoko[y][x] != "e")
                    vertices[(y * (Sw + 1) + x) * 3 + 2] = parseFloat(hyoko[y][x]) * h;
        }
        document.getElementById("content").innerHTML = "hyoko "+vertices[26];

        //法線ベクトルの自動計算
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
    }

    //メッシュを作ってシーンに追加
    var material = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, blending: THREE.NormalBlending, opacity: 0.7 });
//    var material = new THREE.ShaderMaterial({
//        vertexShader: document.getElementById('vertexShader').textContent,
//        fragmentShader: document.getElementById('fragmentShader').textContent,
//    });
    var mesh = new THREE.Mesh(geometry, material);

    var dx = 0, dy = 0;
//    mesh.position.x = tileW * dx -  tileW / 2;
//    mesh.position.y = -(tileH * dy - tileH / 2);
    mesh.position.x = 512;
    mesh.position.y = -1024;
    scene.add(mesh);
    var material = new THREE.MeshBasicMaterial({ color: 0x888888, wireframe: true })
    var mesh = new THREE.Mesh(geometry, material);
//    mesh.position.x = tileW * dx - tileW / 2;
//    mesh.position.y = -(tileH * dy - tileH / 2);
    mesh.position.x = 512;
    mesh.position.y = -1024;
    scene.add(mesh);
    document.getElementById("content").innerHTML = "position " + mesh.position.x + ":" + mesh.position.y;

//    var geometryLine = new THREE.Geometry();
//    geometryLine.vertices[0] = new THREE.Vector3(150, 0, 0);
//    geometryLine.vertices[1] = new THREE.Vector3(0, 150, 0);
//    geometryLine.vertices[1] = new THREE.Vector3(0, 0, 150);
//    geometryLine.colors[0] = new THREE.Color(0xff0000);
//    geometryLine.colors[1] = new THREE.Color(0xff0000);
//    geometryLine.colors[2] = new THREE.Color(0xff0000);
//    var materialLine = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 5, vertexColors: true });
//    var lines = new THREE.Line(geometryLine, materialLine);
//    scene.add(lines);
}

