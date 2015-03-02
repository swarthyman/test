(function() {

	var width = 500;
	var height = 500;

    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    
	document.body.appendChild(canvas);

	/////

	var scene = new Scene3D();
	
	var camera = new Obj3D.Camera3D();
	camera.setPos(1, 1, 1);
	camera.setRot(2, 2, 2);
	
	var cube1 = new Obj3D.Cube3D();
	cube1.setRad(4);
	cube1.setPos(-1, -1, -1);
	cube1.setRot(1, -2, 3);
	
	scene.add(camera);
	scene.add(cube1);
	scene.add(canvas);

	scene.render();
	
	setInterval(scene.render, 2000);

})();