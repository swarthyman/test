(function() {

	var utils = {};
	
	function gcd(a,b) 
	{
		if (isNaN(a) || isNaN(b)) return 0;
	
		if (a < 0) 
		{
			a = -a;
		}
		
		if (b < 0) 
		{
			b = -b;
		}
		
		if (b > a) 
		{
			var temp = a; 
			a = b; b =
			temp;
		}
		
		while (true) 
		{
			a %= b;
			
			if (a <= 0) 
			{
				return b;
			}
			
			b %= a;
			
			if (b <= 0) 
			{
				return a;
			}
		}
	}
	utils.gcd = gcd;
	
	function triangulation(angle1, angle2, length)
	{
		var distance = length * Math.sin(angle1) * Math.sin(angle2) / Math.sin(angle1 + angle2);
		
		return distance;
	}
	utils.triangulation = triangulation;
	

	this.utils = utils;

})();