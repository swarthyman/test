function Scene3D(label) {

	// PUBLIC
	this.label = label;
	
	// PRIVATE
	
	var list = [];
	var cameras = [];
	
	var currentCameraIndex = 0;
	
	var canvas;
	
	var img;
	
	var imageData;
	var ctx;
	
	
	
	
	// PRIVILEGED
	
	this.add = function(obj) {
	
		if (typeof obj === "undefined") {
			console.error("forgot to add argument");
			return;
		}
	
		var type;
		
		if (obj.getType)
		{
			type = obj.getType();
		}
		else if (obj.tagName)
		{
			type = obj.tagName;
			type = type.toLowerCase();
		}
		else
		{
			console.error("Something went wrong", obj);
			return;
		}
		
		console.log("TYPE: " + type);
		
		if (type === "Obj3D.Camera3D") { 
			cameras.push(obj) 
		} else if (type === "canvas") {
			canvas = obj;
		} else {
			list.push(obj);
		}
	};
	
	
	
	this.setCamera3D = function(index) {
		currentCameraIndex = index;
	};
	
	this.render = function() {
	
		// Requires Canvas and Camera3D
		if (cameras.length <= 0) {
			console.error("This scene has no cameras.");
			return;
		}
		
		if (typeof canvas === "undefined") {
			console.error("This scene has no canvas to draw to.");
			return;
		}
		
		if (!img)
		{
			console.log("Initializing 'img'.");
			img = new Uint8ClampedArray(4 * canvas.width * canvas.height);
		}
		
		if (!ctx)
		{
			console.log("Initializing 'ctx'.");
			ctx = canvas.getContext("2d");
		}
		
		if (!imageData)
		{
			console.log("Initializing 'imageData'.");
			imageData = ctx.createImageData(canvas.width, canvas.height);
		}
		
		
		////////////////////////////////////////////////////////////////////////
		// START RENDERING ... /////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////
		
		for (var i = 0; i < img.length; i += 4)
		{
			img[i + 0] = Math.floor(Math.random() * 256);
			img[i + 1] = Math.floor(Math.random() * 256);
			img[i + 2] = Math.floor(Math.random() * 256);
			img[i + 3] = 255;
		}
		
		// Move every object in the scene so the camera is at the center of the 
		// coordinate system.
		
		var camera = cameras[currentCameraIndex];
		
		console.log(camera);
		
		var objects3D = list;
		
		for (var i = 0; i < objects3D.length; i++)
		{
			var object3D = objects3D[i];
			
			// camera projected
			object3D.proj.pos[0] = object3D.pos[0] - camera.pos[0];
			object3D.proj.pos[1] = object3D.pos[1] - camera.pos[1];
			object3D.proj.pos[2] = object3D.pos[2] - camera.pos[2];
		}
		
		// Rotate every object in the scene so the camera is point in the 
		// direction (0, 0, 1) and 3D x and y coordinates map directly to 2D
		// x and y coordinates (with z coordinate being used as a resizing
		// factor)
		
		
		

		
		// Possibly grid-frame rendering
		
		
		
		// Possibly ray casting method and then ray tracing method
		
		
		
		
		////////////////////////////////////////////////////////////////////////
		// DISPLAY IMAGE ///////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////
        for (var i = 0; i < imageData.data.length; i++)
        {
            imageData.data[i] = img[i];
        }
		ctx.putImageData(imageData, 0, 0);
	};
	
}

// PUBLIC

Scene3D.prototype.getLabel = function() {
	return this.label;
};

Scene3D.prototype.setLabel = function(label) {
	this.label = label;
};

var obj = new Scene3D();