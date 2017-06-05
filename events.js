var i = 1;

var isDragging = false;

var res = new THREE.Vector3();


window.onmousedown = function(e) {
    isDragging = true;
};
window.onmouseup = function(e) {
    isDragging = false;
};
window.onmousemove = function(e) {

    var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;


    if(isDragging) {

        var pLocal = new THREE.Vector3( -1, 0, 0 );
        var pWorld = pLocal.applyMatrix4( camera.matrixWorld );
        var dir = pWorld.sub( camera.position ).normalize();
        var a = camera.getWorldDirection().toArray();
        var b = camera.up.toArray();
        var left = new THREE.Vector3(a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]);
        left.normalize();
        res = camera.getWorldDirection();
        res.applyAxisAngle(camera.up,3.14/2000*movementX);
        res.applyAxisAngle(left,3.14/2000*movementY);
        res.add(new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z));
        camera.lookAt(res);

    }
};

window.onwheel = function(e) {
    e = e || window.event;
    var delta = e.deltaY || e.detail || e.wheelDelta;
    camera.up.applyAxisAngle(camera.getWorldDirection(),delta/100);
    camera.lookAt(camera.getWorldDirection().add(camera.position));
};

window.onkeydown = function (ev)
{
var e = window.event || ev, K = e.keyCode;
     if (K == 65) camera.position.add((new THREE.Vector3( -1, 0, 0 )).applyQuaternion( camera.quaternion ));
else if (K == 68) camera.position.add((new THREE.Vector3( 1, 0, 0 )).applyQuaternion( camera.quaternion ));
else if (K == 87) camera.position.add((new THREE.Vector3( 0, 0, -1 )).applyQuaternion( camera.quaternion ));
else if (K == 83) camera.position.add((new THREE.Vector3( 0, 0, 1 )).applyQuaternion( camera.quaternion ));
else if (K == 72) {
    camera.position.x = 120;
    camera.position.y = 60;
    camera.position.z = 180;
    camera.up = new THREE.Vector3(0,1,0);
    camera.lookAt(new THREE.Vector3(0,60,0));
}
else if (K == 49){
  // var cl = 0x000000;
  // var iter = 0x0a0a0a;
  // // for (var i = 1; i <= 1; i++)
  // // {
  //   console.log("R"+Math.floor(i/10).toString()+(i%10).toString()+"D");
  //   scene.getObjectByName("R"+Math.floor(i/10).toString()+(i%10).toString()+"D").material = new THREE.MeshLambertMaterial({color: cl});
  //   i+=1;
  //   // cl += iter;
  // // }
  }
};
