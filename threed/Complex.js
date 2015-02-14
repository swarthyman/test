function Complex(re, im)
{
    this.re = re;
    this.im = im;
}

Complex.prototype.multiply = function(that)
{
    var re = this.re * that.re - this.im * that.im;
    var im = this.im * that.re + this.re * that.im;
    
    return new Complex(re, im);
};

Complex.prototype.add = function(that)
{
    var re = this.re + that.re;
    var im = this.im + that.im;

    return new Complex(re, im);
};

Complex.prototype.reciprocal = function()
{
    
};

Complex.prototype.conjugate = function()
{
    var re = this.re;
    var im = -this.im;
    
    return new Complex(re, im);
};