var i = 1;

var isDragging = false;

var res = new THREE.Vector3();

var mouse = new THREE.Vector2();

var raycaster = new THREE.Raycaster();

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
    console.log(0);
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
	
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );
	if (intersects.length >= 1)
	{
		document.getElementById('error-info').innerHTML = intersects[0].object.name;
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
    camera.lookAt(new THREE.Vector3(0,10,0));
}
else if (K == 49){
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );
	if (intersects.length >= 1)
	{
		document.getElementById('error-info').innerHTML = intersects[0].object.name;
		//alert(intersects[0].object.name);
	}
	
	
	//for ( var i = 0; i < intersects.length; i++ ) {
		
		//intersects[ i ].object.material.color.set( 0xff0000 );

	//}
	
	
//	console.log(1);
	//var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   //x
      //                                  -( event.clientY / window.innerHeight ) * 2 + 1,  //y
        //                                0.5 );                                            //z
   // var raycaster = new THREE.Raycaster();
    //console.log(2);
//    alert(mouse3D);
//    projector.unprojectVector( mouse3D, camera );   
//    mouse3D.sub( camera.position );                
//    mouse3D.normalize();
//    var raycaster = new THREE.Raycaster( camera.position, mouse3D );
//    var intersects = raycaster.intersectObjects( objects );
    // Change color if hit block
//    if ( intersects.length > 0 ) {
//        intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
//    }
    
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
