var raycast = true;

var i = 1;

var isDragging = false;

var res = new THREE.Vector3();

var mouse = new THREE.Vector2();

var raycaster = new THREE.Raycaster();

var c_h_o = "";

var prevCol = 0x000000;

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
		res += l[item]['_id'] + ': ' + l[item]['err'] + "\n";
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
				if (Array.isArray(scene.getObjectByName(c_h_o).material))
				{
					for (var i in scene.getObjectByName(c_h_o).material)
					{
						scene.getObjectByName(c_h_o).material[i].emissive = 
							new THREE.Color(prevCol);
					}
				} else
				{
					scene.getObjectByName(c_h_o).material.emissive = new THREE.Color(prevCol);
				}
				//scene.getObjectByName(c_h_o).material.emissive = new THREE.Color("black");
				c_h_o = "";
			}
			if (intersects[0].object.name != "Плоскость"){
					//alert(intersects[0].object.name)
				if (c_h_o != intersects[0].object.name){
					if ('material' in scene.getObjectByName(intersects[0].object.name))
					{
						if (Array.isArray(scene.getObjectByName(intersects[0].object.name).material))
						{
							prevCol = scene.getObjectByName(intersects[0].object.name).material[0].emissive;
							for (var i in scene.getObjectByName(intersects[0].object.name).material)
							{
								scene.getObjectByName(intersects[0].object.name).material[i].emissive = 
									new THREE.Color("grey");
							}
						} else
						{
							prevCol = scene.getObjectByName(intersects[0].object.name).material.emissive;
							scene.getObjectByName(intersects[0].object.name).material.emissive = new THREE.Color("grey");
						}
					}
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
	alert([camera.position.x,camera.position.y,camera.position.z]);
  } else if (K == 90)
  {
	raycaster.setFromCamera( mouse, camera );
	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );
	if (intersects.length >= 1)
	{
		
		objToDel = g.find(function(node) {return node.data._id == intersects[0].object.name});
		if (objToDel.children.length == 0)
		{
			alert("У данного объекта нет составных частей")
		} else
		{
			errObjs = [];
			for (var item in objToDel.children)
			{
				if (!objCanPlace(objToDel.children[item])) errObjs.push(objToDel.children[item].data._id);
			}
			if (errObjs.length == 0)
			{
				for (var item in objToDel.children)
				{
					objOnScene(objToDel.children[item])
				}
				var selectedObject = scene.getObjectByName(objToDel.data._id);
    			scene.remove(selectedObject);
    			c_h_o = "";
    			var listOfErrors = objxerr[objToDel.data._id];
    			var nodeToDel = g.find(function (node)
    			{
					return node.data._id == objToDel.data._id;
				});
				if (nodeToDel != null)
				{
					var newPar = {};
					nodeToDel.traverseDown(function (node)
					{
						if (node.data._id == objToDel.data._id)
						{
							; // Ничего не делаем
						} else if (node.parent.data._id == objToDel.data._id)
						{
							newPar[node.data._id] = node.data._id;
							objxerr[node.data._id] = [];
						} else if (node.parent.data._id in newPar)
						{
							newPar[node.data._id] = newPar[node.parent.data._id];
						}
					});
					//alert(JSON.stringify(newPar));
					for (var item in listOfErrors)
					{
						//alert(listOfErrors[item]['_id']);
						//alert(newPar[listOfErrors[item]]);
						objxerr[newPar[listOfErrors[item]['_id']]].push(listOfErrors[item]);
					}
					objxerr[objToDel.data._id] = [];
				}
    		} else alert('Невозможно разбить данный объект, т.к. некоторые составные части не имеют координат или размеров:\n' 
    			+ JSON.stringify(errObjs))
		}
	}
  }
};
