// <canvas id='canvas' width='500px', height='500px'></canvas>


function getPoints() {

	var points = [
		[ 8.4, 0.4], //  1
		[ 3.9, 6.9], //  2
		[ 9.0, 9.0], //  3
		[ 6.1, 5.6], //  4
		[ 8.0, 3.5], //  5
		[10.6, 5.9], //  6
		[ 5.1, 9.9], //  7
		[11.3, 2.2], //  8
		[ 3.3, 2.5], //  9
		[ 1.0, 5.0]  // 10
	];

	var resize_factor = 30;
	var offset_x = 10;
	var offset_y = 10;

	points.forEach(function(c, i, a) {
		a[i][0] = a[i][0] * resize_factor + offset_x;
		a[i][1] = a[i][1] * resize_factor + offset_y;
	});

	return points;
}

function drawShit() {

	var canvas;

	if (document.getElementsByTagName('canvas').length > 0) {
		canvas = document.getElementsByTagName('canvas')[0];
	} else {
		canvas = document.createElement('canvas');
	}

	canvas.width = 500;
	canvas.height = 500;
	canvas.style.border = '1px black solid';
	document.body.appendChild(canvas);
	var ctx = canvas.getContext('2d');

	var points = [
		[10, 10],
		[50, 120],
		[60, 20],
		[100, 70]
	];

	points = getPoints();

	var n = points.length;

	// draw triangle
	for (var i = 0; i < n; i += 1) {
		var x1 = points[i][0];
		var y1 = points[i][1];
		var x2 = points[(i + 1) % n][0]
		var y2 = points[(i + 1) % n][1]

		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}

	// fill triangle
	if (true) {
		for (var y = 0; y < 500; y += 2) {
			var listX = polyfill(y, points);
			for (var i = 0; i < listX.length; i += 2) {
				var x1 = listX[i];
				var x2 = listX[i + 1];
		
				ctx.beginPath();
				ctx.moveTo(x1, y);
				ctx.lineTo(x2, y);
				ctx.stroke();
			}
		}
	}

}

function inArray(e, arr) {

	for (var i = 0; i < arr.length; i++) {
		if (e === arr[i]) {
			return true;
		}
	}

	return false;
}

function removeDuplicates(arr) {

	var newArr = [];

	for (var i = 0; i < arr.length; i++) {
		var e = arr[i];

		if (!inArray(e, newArr)) {
			newArr.push(e);
		}
	}

	return newArr;
}

// lots of nasty hacks!
function polyfill(y, points) {

	var listX = [];
	var n = points.length;

	for (var i = 0; i < n; i += 1) {
		var x1 = points[i][0];
		var y1 = points[i][1];
		var x2 = points[(i + 1) % n][0]
		var y2 = points[(i + 1) % n][1]

		var dy1 = y - y1;
		var dy2 = y2 - y1;

		if (dy2 !== 0) {
			var t = dy1 / dy2;
			if (t >= 0 && t <= 1) {
				var s = Math.round(x1 + t * (x2 - x1));
				listX.push(s);
			}
		}
	}
	listX.sort(function(a, b) { return a > b; });
	//

	if (listX.length % 2 === 1) {
		listX = removeDuplicates(listX);
		console.log(listX);
	}

	return listX;
}

drawShit();