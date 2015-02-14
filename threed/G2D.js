// Rectangular Coordinate System
function RCS2D() {}

RCS2D.prototype.rotate = function(point, angle)
{
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    
    var m = new Matrix([
        [cos, -sin],
        [sin, cos]
    ]);
    
    var p = new Matrix(point, true);
    
    var result = m.multiply(p);
    
    console.log(result);
};

(function(context) {
    
    
    
    var attach = {};
    
    
    this.RCS2D = attach;
    
    console.log(this)
})();