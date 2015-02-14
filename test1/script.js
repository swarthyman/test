function main()
{
	var canvas = document.createElement("canvas");
	canvas.width = 512;
	canvas.height = 512;
	
	var ctx = canvas.getContext("2d");
	draw(canvas, ctx);
	
	var img = document.createElement("img");
	img.src = canvas.toDataURL("image/jpg");
	document.body.appendChild(img);
}
main();

function draw(canvas, ctx)
{
	var i = 0;
	var j = 0;
	
	var x = 0;
	var y = 0;

	var selection = 2;
	var count = 16;
	var ctx;

	if (selection === 1)
	{
		canvas.width = 2048;
		canvas.height = 512;
		
		ctx = canvas.getContext("2d");
		
		var w = canvas.width;
		var h = canvas.height;
		
		for (i = 0; i < count; i++)
		{
			var h_from = h * (i / count);
			var h_to = h * ((i + 1) / count);
			
			
			
			ctx.fillStyle = (i % 2 === 0) ? "black" : (((i + 1) % 4 === 0) ? "red" : "blue" );
			ctx.fillRect(0, h_from, w, h_to);
		}
	}
	else if (selection === 2)
	{
	
		canvas.width = 1440;
		canvas.height = 720;
	
		ctx = canvas.getContext("2d");
	
	
	
		var w = canvas.width;
		var h = canvas.height;
		
		
		// vertical count
		var vc = 1440 / 4;
		var hc = 720;
		
		vc /= 2 * 2 * 3;
		hc /= 2 * 2 * 3;
		
		
		for (j = 0; j < vc; j++)
		{
			for (i = 0; i < hc; i++)
			{
				var x_1 = w * (i / hc);
				var x_2 = w * ((i + 1) / hc);
				
				var y_1 = h * (j / vc);
				var y_2 = h * ((j + 1) / vc);
				
				ctx.fillStyle = ((i + j) % 2 === 0) ? "#000" : "#111";
				
				ctx.fillRect(x_1, y_1, x_2, y_2);
			}
		}
	}
}
