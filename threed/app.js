(function() {
    
    var app = {}; 
        
    function pixel(x, y, r, g, b, a)
    {
		// safety
		x = (x >= dh.width) ? dh.width - 1 : (x < 0) ? 0 : x;
		y = (y >= dh.height) ? dh.height - 1 : (y < 0) ? 0 : y;
		
        var index = (x + y * dh.width) * 4;
        
        var img = dh.img;
        
        img[index + 0] = r;
        img[index + 1] = g;
        img[index + 2] = b;
        img[index + 3] = a || 255;
    }
    
    function red(hex) { return (hex & 0xFF0000) >> 16; };
    function green(hex) { return (hex & 0xFF00) >> 8; };
    function blue(hex) { return (hex & 0xFF); };
    
    function getPixel(a, b, img)
    {
        var aok = !(typeof a === "undefined");
        var bok = !(typeof b === "undefined");
        
        img = dh.imageData.data;
        
        if (aok && bok)
        {
            var x = a;
            var y = b;
            
            x = (x >= dh.width) ? dh.width : (x < 0) ? 0 : x;
            y = (y >= dh.height) ? dh.height : (y < 0) ? 0 : y;
            
            var index = (x + y * dh.width) * 4;
            
            var r = img[index + 0];
            var g = img[index + 1];
            var b = img[index + 2];
            var a = img[index + 3];
            
            return { r: r, g: g, b: b, a: a};
        }
        else if (aok)
        {
            var index = a;
            
            var r = img[index + 0];
            var g = img[index + 1];
            var b = img[index + 2];
            var a = img[index + 3];
            
            return { r: r, g: g, b: b, a: a};
        }
        else
        {
            return 0;
        }
    }
    
    
    var dh = {
        width: 800,
        height: 600,
        latency: 20, // milliseconds
        draw: function() {
            dh.ctx.putImageData(dh.imageData, 0, 0);
        },
        frame: 0
    }
    
    function line(x0, y0, x1, y1, r, g, b)
    {
		r = r || 0;
		g = g || 0;
		b = b || 0;
		
        x0 = Math.abs(x0);
        y0 = Math.abs(y0);
        x1 = Math.abs(x1);
        y1 = Math.abs(y1);
		
		x0 = Math.floor(x0);
        y0 = Math.floor(y0);
        x1 = Math.floor(x1);
        y1 = Math.floor(y1);
		
		x0 = (x0 >= dh.width) ? dh.width - 1 : (x0 < 0) ? 0 : x0;
		x1 = (x1 >= dh.width) ? dh.width - 1 : (x1 < 0) ? 0 : x1;
		
		
		y0 = (y0 >= dh.height) ? dh.height - 1 : (y0 < 0) ? 0 : y0;
		y1 = (y1 >= dh.height) ? dh.height - 1 : (y1 < 0) ? 0 : y1;
	
    
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx-dy;
		
        while (true)
		{
            pixel(x0, y0, r, g, b);
        
            if ((x0 == x1) && (y0 == y1)) break;
            var e2 = 2*err;
            if (e2 >-dy) { err -= dy; x0  += sx; }
            if (e2 < dx) { err += dx; y0  += sy; }
        }
    }
    
    
    
    var camera3D = 
    {
        pos: 
        {
            x: 0,
            y: 0,
            z: 0
        },
        rot: 
        {
            xy: 0,
            yz: 0,
            zx: 0
        },
        computeRotationMatrix: function()
        {
            var xy = -camera3D.rot.xy;
            var yz = -camera3D.rot.yz;
            var zx = -camera3D.rot.zx;
			
			
			xy = xy % 2 * Math.PI;
			yz = yz % 2 * Math.PI;
			zx = zx % 2 * Math.PI;
            
        
            var cos_xy = Math.cos(xy);
            var sin_xy = Math.sin(xy);
        
            var cos_yz = Math.cos(yz);
            var sin_yz = Math.sin(yz);
        
            var cos_zx = Math.cos(zx);
            var sin_zx = Math.sin(zx);
            
            
            var mxy = new Matrix([
                [cos_xy, -sin_xy, 0],
                [sin_xy,  cos_xy, 0],
                [     0,       0, 1]
            ]);
        
            var myz = new Matrix([
                [1,      0,       0],
                [0, cos_yz, -sin_yz],
                [0, sin_yz,  cos_yz]
            ]);
        
            var mzx = new Matrix([
                [ cos_zx, 0, sin_zx],
                [      0, 1,      0],
                [-sin_zx, 0, cos_zx]
            ]);
            
            var mxyz = (mxy.multiply(myz)).multiply(mzx);
            
            camera3D.mxy = mxy;
            camera3D.myz = myz;
            camera3D.mzx = mzx;
            camera3D.mxyz = mxyz;
        },
        mxy: 0,
        myz: 0,
        mzx: 0,
        mxyz: 0
    };
    
    var pyramid3D = [
        [ 2,  0, 0],
        [ 0,  2, 0],
        [-2,  0, 0],
        [ 0, -2, 0],
        [ 0,  0, 2]
    ];
    
    var size = 1;
    var offset_x = 0;
    var offset_y = 0;
    var offset_z = 0;
    
    var cube3D = [
        [+size + offset_x, +size + offset_y, +size + offset_z],
        [-size + offset_x, +size + offset_y, +size + offset_z],
        [-size + offset_x, -size + offset_y, +size + offset_z],
        [+size + offset_x, -size + offset_y, +size + offset_z],
        
        [+size + offset_x, +size + offset_y, -size + offset_z],
        [-size + offset_x, +size + offset_y, -size + offset_z],
        [-size + offset_x, -size + offset_y, -size + offset_z],
        [+size + offset_x, -size + offset_y, -size + offset_z]
    ];
	
	var _r = {
		cxy: 0,
		sxy: 0,
		cyz: 0,
		syz: 0,
		czx: 0,
		szx: 0
	};
	
	function rotateComputeSinoids(rotation3D)
	{
        var xy = rotation3D[0];
        var yz = rotation3D[1];
        var zx = rotation3D[2];
        
        _r.cxy = Math.cos(xy);
        _r.sxy = Math.sin(xy);
        
        _r.cyz = Math.cos(yz);
        _r.syz = Math.sin(yz);
        
        _r.czx = Math.cos(zx);
        _r.szx = Math.sin(zx);
	}
	
	function rotateFinal(point3D, center3D, output3D)
	{
        var x = point3D[0] - center3D[0];
        var y = point3D[1] - center3D[1];
        var z = point3D[2] - center3D[2];
		
        var cxy = _r.cxy;
        var sxy = _r.sxy

        var cyz = _r.cyz;
        var syz = _r.syz;

        var czx = _r.czx;
        var szx = _r.szx;
        
		// Thanks Wolfram|Alpha!
        var dx = cxy * (czx * x + szx * z) + sxy * (syz * (czx * z - szx * x) - cyz * y);
        var dy = cxy * (cyz * y + syz * (szx * x - czx * z)) + sxy * (czx * x + szx * z);
        var dz = cyz * (czx * z - szx * x) + syz * y;
		
		output3D[0] = dx;
		output3D[1] = dy;
		output3D[2] = dz;
	}
    
    function rotateObject(object, center, rotation)
    {
        var x = rotation[0];
        var y = rotation[1];
        var z = rotation[2];
        
        var cos_xy = Math.cos(xy);
        var sin_xy = Math.sin(xy);
        
        var cos_yz = Math.cos(yz);
        var sin_yz = Math.sin(yz);
        
        var cos_zx = Math.cos(zx);
        var sin_zx = Math.sin(zx);
        
        var x = 0;
        var y = 0;
        var z = 0;
        
        var dx = 0;
        var dy = 0;
        var dz = 0;
        
        var mxy = new Matrix([
            [cos_xy, -sin_xy, 0],
            [sin_xy,  cos_xy, 0],
            [     0,       0, 1]
        ]);
        
        var myz = new Matrix([
            [1,      0,       0],
            [0, cos_yz, -sin_yz],
            [0, sin_yz,  cos_yz]
        ]);
        
        var mzx = new Matrix([
            [ cos_zx, 0, sin_zx],
            [      0, 1,      0],
            [-sin_zx, 0, cos_zx]
        ]);
        
        var mxyz = (mxy.multiply(myz)).multiply(mzx);
        
        camera3D.mxy = mxy;
        camera3D.myz = myz;
        camera3D.mzx = mzx;
        camera3D.mxyz = mxyz;
    
        var obj = [];
        for (var i = 0; i < object.length; i++)
        {
            obj[i][0] = object[i][0];
            obj[i][1] = object[i][1];
            obj[i][2] = object[i][2];
            
            var p = new Matrix([x, y, z], true);
        
            var p3_rot = camera3D.mxyz.multiply(p);
        }
    }
    
    // point
    function project(point)
    {
        var x = point[0];
        var y = point[1];
        var z = point[2];
    
    
        x = x - camera3D.pos.x;
        y = y - camera3D.pos.y;
        z = z - camera3D.pos.z;
        
        var p = new Matrix([x, y, z], true);
        
        var p3_rot = camera3D.mxyz.multiply(p);
        
        var p3Dx = p3_rot.matrix[0][0];
        var p3Dy = p3_rot.matrix[1][0];
        var p3Dz = p3_rot.matrix[2][0];
        
        var f = 400;
		
		var p2Dx = 0;
		var p2Dy = 0;

        var depth = p3Dz;

        if (p3Dz > 0)
        {
			p2Dx = f * p3Dx / p3Dz;
			p2Dy = f * p3Dy / p3Dz;
        }
        
        return [p2Dx, p2Dy];
    }
    
    //
	camera3D.pos.x = 1; // red
	camera3D.pos.y = 1; // green
	camera3D.pos.z = -10; // blue
	
	camera3D.rot.xy = 0.04;
    camera3D.rot.yz = 0.00;
    camera3D.rot.zx = 0.00;
		
	var _crot = [0, 0, 0]; // xy yz zx    rg gb br
	var _cpos = [0, 0, 0] // x y z   r g b
    
    function paint()
    {
		// Clear screen
		var x = 0, y = 0, idx = 0;
    
        for (y = 0; y < dh.height; y++)
        {
            for (x = 0; x < dh.width; x++)
            {
                pixel(x, y, 255, 255, 255);
            }
        }
	
		camera3D.pos.x -= 0.00; // red
		camera3D.pos.y += 0.0; // green
		camera3D.pos.z -= 0.00; // blue
		
        camera3D.rot.xy += 0.00;
        camera3D.rot.yz += 0.00;
        camera3D.rot.zx += 0.00;
		
		_crot[0] += 0.02;
		_crot[1] += 0.03;
		_crot[2] += 0.05;
		
		_cpos[0] = 0;
		_cpos[1] = 0;
		_cpos[2] = 0;
		
        camera3D.computeRotationMatrix();
		
    

        
        var r = 0;
        var g = 0;
        var b = 0;
        
        
        var points2D = [];
		
		
        rotateComputeSinoids(_crot);
        for (var i = 0; i < cube3D.length; i++)
        {
            var point3D = [0,0,0];
			
			// rotate point around something...
			rotateFinal(cube3D[i], _cpos, point3D);
			
			
            var point2D = project(point3D);
            
            points2D[i] = [
                +point2D[0] + (dh.width / 2),
                -point2D[1] + (dh.height / 2)
            ];
        }
    
        
        line(points2D[0][0], points2D[0][1], points2D[1][0], points2D[1][1]);
        line(points2D[1][0], points2D[1][1], points2D[2][0], points2D[2][1]);
        line(points2D[2][0], points2D[2][1], points2D[3][0], points2D[3][1]);
        line(points2D[3][0], points2D[3][1], points2D[0][0], points2D[0][1]);
        
        line(points2D[0][0], points2D[0][1], points2D[4][0], points2D[4][1]);
        line(points2D[1][0], points2D[1][1], points2D[5][0], points2D[5][1]);
        line(points2D[2][0], points2D[2][1], points2D[6][0], points2D[6][1]);
        line(points2D[3][0], points2D[3][1], points2D[7][0], points2D[7][1]);
        
        line(points2D[4][0], points2D[4][1], points2D[5][0], points2D[5][1]);
        line(points2D[5][0], points2D[5][1], points2D[6][0], points2D[6][1]);
        line(points2D[6][0], points2D[6][1], points2D[7][0], points2D[7][1]);
        line(points2D[7][0], points2D[7][1], points2D[4][0], points2D[4][1]);
		
		// Coordinate System Axes
		
		var _axr = 1;
		var axes3D = [
			[   0,    0,    0],
			[_axr,    0,    0],
			[   0, _axr,    0],
			[   0,    0, _axr]
		];
		var axes2D = [];
        for (var i = 0; i < axes3D.length; i++)
        {
            var point2D = project(axes3D[i]);
            
            axes2D[i] = [
                +point2D[0] + (dh.width / 2),
                -point2D[1] + (dh.height / 2)
            ];
        }
		
		line(axes2D[0][0], axes2D[0][1], axes2D[1][0], axes2D[1][1], 255);
        line(axes2D[0][0], axes2D[0][1], axes2D[2][0], axes2D[2][1], 0, 255);
        line(axes2D[0][0], axes2D[0][1], axes2D[3][0], axes2D[3][1], 0, 0, 255);
		
		for (var i = 0; i < axes2D.length; i++)
        {
            x = axes2D[i][0];
            y = axes2D[i][1];
            
            x = Math.floor(x);
            y = Math.floor(y);
        
            pixel(x - 1, y - 1, r, g, b);
            pixel(x, y - 1, r, g, b);
            pixel(x + 1, y - 1, r, g, b);
            
            pixel(x - 1, y, r, g, b);
            pixel(x, y, r, g, b);
            pixel(x + 1, y, r, g, b);
            
            pixel(x-1, y+1, r, g, b);
            pixel(x, y+1, r, g, b);
            pixel(x+1, y+1, r, g, b);
        }
        
        
        var r = 0, g = 0, b = 0;
        
        for (var i = 0; i < points2D.length; i++)
        {
            x = points2D[i][0];
            y = points2D[i][1];
            
            x = Math.floor(x);
            y = Math.floor(y);
        
            pixel(x - 1, y - 1, r, g, b);
            pixel(x, y - 1, r, g, b);
            pixel(x + 1, y - 1, r, g, b);
            
            pixel(x - 1, y, r, g, b);
            pixel(x, y, r, g, b);
            pixel(x + 1, y, r, g, b);
            
            pixel(x-1, y+1, r, g, b);
            pixel(x, y+1, r, g, b);
            pixel(x+1, y+1, r, g, b);
        }
        
        for (y = 20; y < 40; y++)
        {
            for (x = 20; x < 40; x++)
            {
                r = Math.floor(Math.random() * 256);
                g = Math.floor(Math.random() * 256);
                b = Math.floor(Math.random() * 256);
            
                pixel(x, y, r, g, b);
            }
        }
    }
    
    function animate()
    {
        paint();
        
        for (var i = 0; i < dh.imageData.data.length; i++)
        {
            dh.imageData.data[i] = dh.img[i];
        }
        
        dh.draw();
        dh.frame++;
    }
    
    function main()
    {
        camera3D.computeRotationMatrix();
        dh.img = new Uint8ClampedArray(4 * dh.width * dh.height);
        
        
    
        dh.canvas = document.createElement("canvas");
        dh.canvas.width = dh.width;
        dh.canvas.height = dh.height;
        document.body.appendChild(dh.canvas);
		
		dh.canvas.addEventListener('dragstart', function(e) {
			// e.preventDefault();
			console.log(e);
			
		}, false);
		
		dh.canvas.addEventListener('dragenter', function(e) {
			console.log(e);
		}, false);
		
		dh.canvas.addEventListener('dragover', function(e) {
			console.log(e);
		}, false);
		
		dh.canvas.addEventListener('dragleave', function(e) {
			console.log(e);
		}, false);
		
		dh.canvas.addEventListener('dragend', function(e) {
			console.log(e);
		}, false);
		
		dh.canvas.addEventListener('drop', function(e) {
			console.log(e);
		}, false);
		
        
        dh.ctx = dh.canvas.getContext("2d");
        dh.imageData = dh.ctx.createImageData(dh.width, dh.height)
        
        animate();
        anim_id = setInterval(animate, dh.latency)
    }
    main();
    
    this.app = app;

})();

