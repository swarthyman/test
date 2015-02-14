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
		
		var iter = 0;
		var upperLimit = 1000; // FIX: remove this
		
		while (iter < upperLimit) 
		{
			a %= b;
			
			if (a == 0) 
			{
				return b;
			}
			
			b %= a;
			
			if (b == 0) 
			{
				return a;
			}
			
			iter++;
		}
	}
	utils.gcd = gcd;
	

	this.utils = utils;

})();