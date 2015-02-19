/* //////////////////////////////////////////////////////////////////////// */
/* // Obj3D /////////////////////////////////////////////////////////////// */
/* //////////////////////////////////////////////////////////////////////// */

var Obj3D = (function() 
{
	function Obj3D() {}

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
    function Camera3D() {}
    
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
    
    function Cube3D(radius, position, orientation)
    {
        _self = this;
        
        _o.rad = radius;
        _o.pos = position;
        _o.rot = orientation;
        
		// Initialization
		
        _c.rad = _o.rad;
        _c.pos = _o.pos;
        _c.rot = _o.rot;
		
		_self.rotate();
		
        _create3D();
        _incrementInstances();

    }

    ///////////////////////////////////////////////////////////////////////////
    // PRIVATE PROPERTIES /////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    var _instances = 0;
    
    var _self;
	
    var _isRotated = false;
	
	// vertices and edges
	var item3D = {

	};
	
	var item2D = {
	};
	
	/**
	 * Original configuration
	 */
	var _o = {
		rad: 1, // radius
		pos: [0, 0, 0], // position
		rot: [0, 0, 0], // Tait–Bryan angles
		item3D: {
			v: [
				[ 1,  1,  1], [-1,  1,  1], [-1, -1,  1], [ 1, -1,  1],
				[ 1,  1, -1], [-1,  1, -1], [-1, -1, -1], [ 1, -1, -1],
			],
			e: [
				[0, 1], [1, 2], [2, 3], [3, 0],
				[0, 4], [1, 5], [2, 6], [3, 7],
				[4, 5], [5, 6], [6, 7], [7, 4],
			]
		}
	};
	
	/**
	 * Current configuration
	 */
	var _c = {
		rad: 1, // radius
		pos: [0, 0, 0], // position
		rot: [0, 0, 0], // Tait–Bryan angles
		item3D: {
			v: [
				[ 1,  1,  1], [-1,  1,  1], [-1, -1,  1], [ 1, -1,  1],
				[ 1,  1, -1], [-1,  1, -1], [-1, -1, -1], [ 1, -1, -1],
			],
			e: [
				[0, 1], [1, 2], [2, 3], [3, 0],
				[0, 4], [1, 5], [2, 6], [3, 7],
				[4, 5], [5, 6], [6, 7], [7, 4],
			]
		},
		item2D: {
			v: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
			e: [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
		}
	};
	
    
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
    
    ///////////////////////////////////////////////////////////////////////////
    // PRIVATE METHODS ////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    function _incrementInstances()
    {
        _instances++;
    }
    
    ///////////////////////////////////////////////////////////////////////////
    // PUBLIC INSTANCE METHODS ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    Cube3D.prototype.getCopyOfRotationMatrix = function()
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
    
    Cube3D.prototype.getRadius = function()
    {
        return _c.rad;
    };
    
    Cube3D.prototype.setRadius = function(radius)
    {
        // TODO update rest
        _c.rad = radius;
    };

    Cube3D.prototype.getPosition = function()
    {
        return _c.pos;
    };
    
    Cube3D.prototype.setPosition = function(position)
    {
        // TODO update rest
        _c.pos = position;
    };    
    
    Cube3D.prototype.rotate = function(rotation)
    {
		var rot = rotation;
	
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
            var xy_changed = (_c.rot[0] === rot[0]) ? false : true;
            var yz_changed = (_c.rot[1] === rot[1]) ? false : true;
            var zx_changed = (_c.rot[2] === rot[2]) ? false : true;
            
            console.log("Stats: " + [xy_changed, yz_changed, zx_changed]);
            
            if (xy_changed || yz_changed || zx_changed)
            {
                console.log("Rotation differs from previous");
                _c.rot[0] = (xy_changed ? rot[0] : _c.rot[0]);
                _c.rot[1] = (yz_changed ? rot[1] : _c.rot[1]);
                _c.rot[2] = (zx_changed ? rot[2] : _c.rot[2]);
                
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
    // PUBLIC STATIC METHODS //////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    Cube3D.getNumberOfInstances = function()
    {
        return _instances;
    };
    
    ///////////////////////////////////////////////////////////////////////////
    // EXPOSE TO WORLD ////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    return Cube3D;

})();
