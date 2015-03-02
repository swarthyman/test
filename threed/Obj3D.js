/* //////////////////////////////////////////////////////////////////////// */
/* // Obj3D /////////////////////////////////////////////////////////////// */
/* //////////////////////////////////////////////////////////////////////// */

var Obj3D = (function() 
{
	function Obj3D() {
		// This public instance method should be immutable, so don't change it
		var type = "Obj3D";
		this.getType = function() { return type; };
	}

	// Private
	
    var _utils = {};
  
    
    var _matrix = {
    
        temp: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    };
    
    _utils.matrixMultiplication = function(matrix_left, matrix_right, 
        matrix_result)
    {
        var i, j, k, sum;
    
        for (i = 0; i < matrix_left.length; i++)
        {
            for (j = 0; j < matrix_right[0].length; j++)
            {
                sum = 0;
                
                for (k = 0; k < matrix_left[0].length; k++)
                {
                    sum += matrix_left[i][k] * matrix_right[k][j];
                }
                
                matrix_result[i][j] = sum;
            }
        }
    };
    
    _utils.createRotationMatrix = function(mxy, myz, mzx, xy, yz, zx, fxy, fyz, 
        fzx)
    {
        fxy = (typeof fxy === "undefined") ? true : fxy;
        fyz = (typeof fyz === "undefined") ? true : fyz;
        fzx = (typeof fzx === "undefined") ? true : fzx;
    
        if (fxy)
        {
            var cos_xy = Math.cos(xy);
            var sin_xy = Math.sin(xy);
            
            mxy[0][0] =  cos_xy; mxy[0][1] = -sin_xy; mxy[0][2] =       0;
            mxy[1][0] =  sin_xy; mxy[1][1] =  cos_xy; mxy[1][2] =       0;
            mxy[2][0] =       0; mxy[2][1] =       0; mxy[2][2] =       1;
        }
        
        if (fyz)
        {
            var cos_yz = Math.cos(yz);
            var sin_yz = Math.sin(yz);
            
            myz[0][0] =       1; myz[0][1] =       0; myz[0][2] =       0;
            myz[1][0] =       0; myz[1][1] =  cos_yz; myz[1][2] = -sin_yz;
            myz[2][0] =       0; myz[2][1] =  sin_yz; myz[2][2] =  cos_yz;
        }
        
        if (fzx)
        {
            var cos_zx = Math.cos(zx);
            var sin_zx = Math.sin(zx);
            
            mzx[0][0] =  cos_zx; mzx[0][1] =       0; mzx[0][2] =  sin_zx;
            mzx[1][0] =       0; mzx[1][1] =       1; mzx[1][2] =       0;
            mzx[2][0] = -sin_zx; mzx[2][1] =       0; mzx[2][2] =  cos_zx;
        }
    };

    // Expose interface ////////////////////////////////////////////////////////
    
    Obj3D.utils = _utils;
    
    return Obj3D;

})();

/* ///////////////////////////////////////////////////////////////////////// */
/* // Camera3D ///////////////////////////////////////////////////////////// */
/* ///////////////////////////////////////////////////////////////////////// */

Obj3D.Camera3D = (function() 
{
    function Camera3D() {
		// This public instance method should be immutable, so don't change it
		var type = "Obj3D.Camera3D";
		this.getType = function() { return type; };
		console.log(this);
	
	}
	
	// abstract reference
	var _constructor_ = Camera3D;
	console.log(_constructor_);
	
	// x, y, z
	var position = [];
	
	// xy, yz, zx
	var rotation = [];
	
	////////////////////////////////////////////////////////////////////////////
	
	_constructor_.prototype.getPos = function() {
		return [
			position[0], 
			position[1], 
			position[2]
		];
    };
	
	_constructor_.prototype.setPos = function(x, y, z) {
		position[0] = x;
		position[1] = y;
		position[2] = z;
    };
	
	_constructor_.prototype.getPosX = function() {
        return position[0];
    };
	
	_constructor_.prototype.setPosX = function(x) {
		position[0] = x;
	};
	
	_constructor_.prototype.getPosY = function() {
		return position[1];
	};
	
	_constructor_.prototype.setPosY = function(y) {
		position[1] = y;
	};
	
	_constructor_.prototype.getPosZ = function() {
		return position[2];
	};
	
	_constructor_.prototype.setPosZ = function(z) {
		position[2] = z;
	};
	
	_constructor_.prototype.getRot = function() {
		return [
			rotation[0], 
			rotation[1], 
			rotation[2]
		];
    };
	
	_constructor_.prototype.setRot = function(xy, yz, zx) {
		rotation[0] = xy;
		rotation[1] = yz;
		rotation[2] = zx;
    };
	
	_constructor_.prototype.getRotXY = function() {
		return rotation[0];
	};
	
	_constructor_.prototype.setRotXY = function(xy) {
		rotation[0] = xy;
	};
	
	_constructor_.prototype.getRotYZ = function() {
		return rotation[1];
	};
	
	_constructor_.prototype.setRotYZ = function(yz) {
		rotation[1] = yz;
	};
	
	_constructor_.prototype.getRotZX = function() {
		return rotation;
	};
	
	_constructor_.prototype.setRotZX = function(zx) {
		rotation[2] = zx;
	};
	
	////////////////////////////////////////////////////////////////////////////
    
    return Camera3D;

})();

/* ///////////////////////////////////////////////////////////////////////// */
/* // Cube3D /////////////////////////////////////////////////////////////// */
/* ///////////////////////////////////////////////////////////////////////// */

Obj3D.Cube3D = (function() 
{
    ///////////////////////////////////////////////////////////////////////////
    // CLASS CONSTRUCTOR //////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    function Cube3D()
    {
		////////////////////////////////////////////////////////////////////////
		// This public instance method should be immutable, so don't change it
		var type = "Obj3D.Cube3D";
		this.getType = function() { return type; };
		////////////////////////////////////////////////////////////////////////
		
        self = this;
		
		self.rotate();
    }
	
	// abstract reference
	var _constructor_ = Cube3D;
	console.log(_constructor_);

    ////////////////////////////////////////////////////////////////////////////
    // PRIVATE PROPERTIES //////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    
    var self;
	
    var _isRotated = false;
	

	
	
	var radius = 1;
	
	// x, y, z
	var position = [];
	
	// xy, yz, zx
	var rotation = [];
	
	// vertices and edges
	var item3D = {
		v: [
			[ 1,  1,  1], [-1,  1,  1], [-1, -1,  1], [ 1, -1,  1],
			[ 1,  1, -1], [-1,  1, -1], [-1, -1, -1], [ 1, -1, -1],
		],
		e: [
			[0, 1], [1, 2], [2, 3], [3, 0],
			[0, 4], [1, 5], [2, 6], [3, 7],
			[4, 5], [5, 6], [6, 7], [7, 4],
		]
	};
	
	// projected and warped
	var itemProj3D = {
		v: [
			[ 1,  1,  1], [-1,  1,  1], [-1, -1,  1], [ 1, -1,  1],
			[ 1,  1, -1], [-1,  1, -1], [-1, -1, -1], [ 1, -1, -1],
		],
		e: [
			[0, 1], [1, 2], [2, 3], [3, 0],
			[0, 4], [1, 5], [2, 6], [3, 7],
			[4, 5], [5, 6], [6, 7], [7, 4],
		]
	};
	
	// vertices and edges
	var item2D = {
		v: [
			[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
			[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]
		],
		e: [
			[0, 0], [0, 0], [0, 0], [0, 0],
			[0, 0], [0, 0], [0, 0], [0, 0],
			[0, 0], [0, 0], [0, 0], [0, 0]
		]
	};
	
    // rotation matrices
    var m = {
        xy: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 1]
        ],
        yz: [
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        zx: [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ],
        xyz: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ],
        xy_yz: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ],
        temp: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]
    };
	
	////////////////////////////////////////////////////////////////////////////
	
	_constructor_.prototype.getPos = function() {
		return [
			position[0], 
			position[1], 
			position[2]
		];
    };
	
	_constructor_.prototype.setPos = function(x, y, z) {
		position[0] = x;
		position[1] = y;
		position[2] = z;
    };
	
	_constructor_.prototype.getPosX = function() {
        return position[0];
    };
	
	_constructor_.prototype.setPosX = function(x) {
		position[0] = x;
	};
	
	_constructor_.prototype.getPosY = function() {
		return position[1];
	};
	
	_constructor_.prototype.setPosY = function(y) {
		position[1] = y;
	};
	
	_constructor_.prototype.getPosZ = function() {
		return position[2];
	};
	
	_constructor_.prototype.setPosZ = function(z) {
		position[2] = z;
	};
	
	_constructor_.prototype.getRot = function() {
		return [
			rotation[0], 
			rotation[1], 
			rotation[2]
		];
    };
	
	_constructor_.prototype.setRot = function(xy, yz, zx) {
		rotation[0] = xy;
		rotation[1] = yz;
		rotation[2] = zx;
    };
	
	_constructor_.prototype.getRotXY = function() {
		return rotation[0];
	};
	
	_constructor_.prototype.setRotXY = function(xy) {
		rotation[0] = xy;
	};
	
	_constructor_.prototype.getRotYZ = function() {
		return rotation[1];
	};
	
	_constructor_.prototype.setRotYZ = function(yz) {
		rotation[1] = yz;
	};
	
	_constructor_.prototype.getRotZX = function() {
		return rotation;
	};
	
	_constructor_.prototype.setRotZX = function(zx) {
		rotation[2] = zx;
	};
	
	////////////////////////////////////////////////////////////////////////////
	
    _constructor_.prototype.getRadius = function()
    {
        return radius;
    };
    
    _constructor_.prototype.setRadius = function(value)
    {
       radius = value;
    };
	
	////////////////////////////////////////////////////////////////////////////
	
    
    _constructor_.prototype.getCopyOfRotationMatrix = function()
    {
        var matrix = [[0,0,0],[0,0,0],[0,0,0]];
        
        for (var i = 0; i < m.xyz.length; i++)
        {
            for (var j = 0; j < m.xyz[0].length; j++)
            {
                matrix[i][j] = m.xyz[i][j];
            }
        }
        
        return matrix;
    };  
    
    _constructor_.prototype.rotate = function(rotationArray)
    {
		// if no argument rotate around self
		var rot = rotationArray || rotation;
	
        if (typeof rot === "undefined")
        {
            console.log("No new rotation input");
            
            if (!_isRotated)
            {
                console.log("Needs initial rotation.");
            
                Obj3D.utils.createRotationMatrix(
                    m.xy, m.yz, m.zx,
                    _c.rot[0], _c.rot[1], _c.rot[2]
                );
                
                Obj3D.utils.matrixMultiplication(m.xy, m.yz, m.xy_yz);
                Obj3D.utils.matrixMultiplication(m.xy_yz, m.zx, m.xyz);
                
                _isRotated = true;
            }
        }
        else
        {
            console.log("New rotation.");
            var xy_changed = (rotation[0] === rot[0]) ? false : true;
            var yz_changed = (rotation[1] === rot[1]) ? false : true;
            var zx_changed = (rotation[2] === rot[2]) ? false : true;
            
            console.log("Stats: " + [xy_changed, yz_changed, zx_changed]);
            
            if (xy_changed || yz_changed || zx_changed)
            {
                console.log("Rotation differs from previous");
                rotation[0] = (xy_changed ? rot[0] : _c.rot[0]);
                rotation[1] = (yz_changed ? rot[1] : _c.rot[1]);
                rotation[2] = (zx_changed ? rot[2] : _c.rot[2]);
                
                Obj3D.utils.createRotationMatrix(
                    m.xy, m.yz, m.zx,
                    _c.rot[0], _c.rot[1], _c.rot[2],
                    xy_changed, yz_changed, zx_changed
                );
                
                if (xy_changed || yz_changed) {
                    console.log("xy - yz change");
                    Obj3D.utils.matrixMultiplication(m.xy, m.yz, m.xy_yz);
                }
                
                Obj3D.utils.matrixMultiplication(m.xy_yz, m.zx, m.xyz);
            }
        }
    };
    
    ///////////////////////////////////////////////////////////////////////////
    // EXPOSE TO WORLD ////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    return Cube3D;

})();
