var Vec3D = (function() 
{
    function Vec3D(x, y, z) 
	{
		if (!(this instanceof Vec3D))
		{
			return new Vec3D(x, y, z);
		}
	
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	Vec3D.subtraction = function(vector1, vector2)
	{
		return new Vec3D(
			vector1.x - vector2.x,
			vector1.y - vector2.y,
			vector1.z - vector2.z
		);
	};
	
	Vec3D.addition = function(vector1, vector2)
	{
		return new Vec3D(
			vector1.x + vector2.x,
			vector1.y + vector2.y,
			vector1.z + vector2.z
		);
	};
	
	Vec3D.scalarDivision = function(vector, scala)
	{
		return new Vec3D(
			vector.x / scalar,
			vector.y / scalar,
			vector.z / scalar
		);
	};
	
	Vec3D.vectorProjection = function(vector1, vector2)
	{
		var dotProduct1 = Vec3D.dotProduct(vector1, vector2);
		var dotProduct2 = Vec3D.dotProduct(vector2, vector2);
	
		var projection = Vec3D.scalarProduct(vector2, dotProduct1 / dotProduct2);
		
		return projection;
	};
	
	Vec3D.length = function(vector)
	{
		var length = Math.sqrt(
			vector.x * vector.x + 
			vector.y * vector.y + 
			vector.z * vector.z
		);
	
		return length;
	};
	
	Vec3D.scalarProduct = function(vector, scalar)
	{
		return new Vec3D(
			vector.x * scalar,
			vector.y * scalar,
			vector.z * scalar
		);
	};
	
    Vec3D.dotProduct = function(u, v)
    {
        return u.x * v.x + u.y * v.y + u.z * v.z;
    };
	
    Vec3D.crossProduct = function(u, v)
    {
		var x = u.y * v.z - u.z * v.y;
		var y = u.z * v.x - u.x * v.z;
		var z = u.x * v.y - u.y * v.x;
	
        return new Vec3D(x, y, z);
    };
	
	Vec3D.reflect = function(u, v) 
	{
		var projection = Vec3D.vectorProjection(u, v);
		
		var reflectedVector = Vec3D.subtraction(Vec3D.scalarProduct(projection, 2), v);
	
		return reflectedVector;
	};
    
    return Vec3D;

})();

var a = Vec3D(1, 2, 3);
var b = Vec3D(3, -1, 4);
var c = Vec3D.crossProduct(a, b);