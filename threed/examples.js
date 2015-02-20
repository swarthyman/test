// Example

var scene = new Scene3D();

var camera = new Camera3D();
camera.pos(1, 1, 1);
camera.rot(2, 2, 2);

var cube1 = new Cube3D();
cube1.rad(4);
cube1.pos(-1, -1, -1);
cube1.rot(1, -2, 3);

scene.add(camera);
scene.add(cube1);


scene.render()