var raycast = true;

var i = 1;

var isDragging = false;

var res = new THREE.Vector3();

var mouse = new THREE.Vector2();

var raycaster = new THREE.Raycaster();

var c_h_o = "";

help_onclick = function(){
	alert('Управление:\n\
w,a,s,d -- вперёд, влево, назад, вправо\n\
зажать ЛКМ и двигать -- перемещение камеры\n\
двойной клик ЛКМ -- подробный список ошибок\n\
колёсико мыши -- поворот камеры вокруг оси, вдоль которой она смотрит\n\
h -- вернуться в начальную позицию\n\
r -- включить/отключить рэйкастинг\n\
f1 -- справка по управлению (это сообщение)');
}

function catlist(l) {
	res = '';
	for (item in l) {
		res += l[item] + "\n";
	}
	return res;
}

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
    
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
	
	if (raycast) {
		raycaster.setFromCamera( mouse, camera );
	
		// calculate objects intersecting the picking ray
		var intersects = raycaster.intersectObjects( scene.children );
		if (intersects.length >= 1)
		{
			document.getElementById('error-info').innerHTML = intersects[0].object.name + ":\n" + catlist(objxerr[intersects[0].object.name]);
			
			if ((c_h_o != "") && (c_h_o != intersects[0].object.name))
			{
				scene.getObjectByName(c_h_o).material.emissive = new THREE.Color("black");
				c_h_o = "";
			}
			if (intersects[0].object.name != "Плоскость"){
				if (c_h_o != intersects[0].object.name){
					scene.getObjectByName(intersects[0].object.name).material.emissive = new THREE.Color("grey");
					c_h_o = intersects[0].object.name;
				}
			}
		} else
		{
			document.getElementById('error-info').innerHTML = "Задний фон";
		}
	}
};

window.ondblclick = function() {
	alert(document.getElementById('error-info').innerHTML);
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
    camera.position.x = home[0];
    camera.position.y = home[1];
    camera.position.z = home[2];
    camera.up = new THREE.Vector3(0,1,0);
    camera.lookAt(new THREE.Vector3(home[3],home[4],home[5]));
}
else if (K == 112) help_onclick();
else if (K == 82) raycast = !raycast;
else if (K == 49){
	alert([camera.position.x,camera.position.y,camera.position.z])
	//alert(JSON.stringify(objxerr));
	//raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	//var intersects = raycaster.intersectObjects( scene.children );
	//if (intersects.length >= 1)
	//{
	//	document.getElementById('error-info').innerHTML = intersects[0].object.name;
		//alert(intersects[0].object.name);
	//}
	
	
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
