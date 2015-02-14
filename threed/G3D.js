// Rectangular Coordinate System
function RCS3D() {}

// Cylindrical Coordinate System
function CCS3D() {}

// Tait-Bryan angles Coordinate system
function TBC3D() {}


function G3D() {}

G3D.rotate = function(angles, points)
{
    var xy = angles[0];
    var yz = angles[1];
    var zx = angles[2];
    
    var cos_xy = Math.cos(xy);
    var sin_xy = Math.sin(xy);

    var cos_yz = Math.cos(yz);
    var sin_yz = Math.sin(yz);

    var cos_zx = Math.cos(zx);
    var sin_zx = Math.sin(zx);
    
    var Mxy = new Matrix([
        [cos_xy, -sin_xy, 0],
        [sin_xy,  cos_xy, 0],
        [     0,       0, 1]
    ]);

    var Myz = new Matrix([
        [1,      0,       0],
        [0, cos_yz, -sin_yz],
        [0, sin_yz,  cos_yz]
    ]);

    var Mzx = new Matrix([
        [ cos_zx, 0, sin_zx],
        [      0, 1,      0],
        [-sin_zx, 0, cos_zx]
    ]);
    
    var Mxyz = (Mxy.multiply(Myz)).multiply(Mzx);
    
    console.log(Mxyz.print())
};

function perspectiveProject(point, camera, orientation, viewer)
{
    // point in 3D space to project
    var p = 
    {
        x: point[0],
        y: point[1],
        z: point[2]
    };

    // camera position
    var c = 
    {
        x: camera[0],
        y: camera[1],
        z: camera[2]
    };

    // rotation of camera
    var r = 
    {
        xy: orientation[0],
        yz: orientation[1],
        zx: orientation[2]
    };

    // viewer
    var v = 
    {
        x: viewer[0],
        y: viewer[1],
        z: viewer[2]
    };
    
    
    // point relative to camera
    var pc =
    {
        x: p.x - c.x,
        y: p.y - c.y,
        z: p.z - c.z
    };
    
    /*
     * We have the rotation of the camera as described by r but we have to 
     * rotate the scene such that the camera becomes the center of view so
     * we rotate the scene by the opposite angle
     */

    var cos_xy = Math.cos(-r.xy);
    var sin_xy = Math.sin(-r.xy);

    var cos_yz = Math.cos(-r.yz);
    var sin_yz = Math.sin(-r.yz);

    var cos_zx = Math.cos(-r.zx);
    var sin_zx = Math.sin(-r.zx);

    var Mxy = new Matrix([
        [cos_xy, -sin_xy, 0],
        [sin_xy,  cos_xy, 0],
        [     0,       0, 1]
    ]);

    var Myz = new Matrix([
        [1,      0,       0],
        [0, cos_yz, -sin_yz],
        [0, sin_yz,  cos_yz]
    ]);

    var Mzx = new Matrix([
        [ cos_zx, 0, sin_zx],
        [      0, 1,      0],
        [-sin_zx, 0, cos_zx]
    ]);

    var Mxyz = (Mxy.multiply(Myz)).multiply(Mzx);
    
    
    
    var rpc = new Matrix([pc.x, pc.y, pc.z], true);
    rpc = Mxyz.multiply(rpc);
    rpc = rpc.transpose();
    rpc = rpc.matrix[0];
    
    console.log(rpc);
    
    // point 2D
    var p2 = {
        x: rpc.x / rpc.z,
        y: rpc.y / rpc.z
    };
    
    return p2;
}















