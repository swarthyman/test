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

Complex.prototype.abs = function()
{
    var hypsq = this.re * this.re + this.im * this.im;

    var re = Math.sqrt(hypsq);
    var im = 0;

    return new Complex(re, im);
};

Complex.prototype.add = function(that)
{
    var re = this.re + that.re;
    var im = this.im + that.im;

    return new Complex(re, im);
};

Complex.prototype.subtract = function(that)
{
    var re = this.re - that.re;
    var im = this.im - that.im;
    
    return new Complex(re, im);
};

Complex.prototype.divide = function(that)
{
    var hypsq = this.re * this.re + this.im * this.im;

    var re = (this.re * that.re + this.im * that.im) / hypsq;
    var im = (this.im * that.re - this.re * that.im) / hypsq;
    
    return new Complex(re, im);
};

Complex.prototype.reciprocal = function()
{
    var hypsq = this.re * this.re + this.im + this.im;
    
    var re =  this.re / hypsq;
    var im = -this.im / hypsq;

    return new Complex(re, im);
};

Complex.prototype.conjugate = function()
{
    var re = this.re;
    var im = -this.im;
    
    return new Complex(re, im);
};