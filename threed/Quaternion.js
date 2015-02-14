function Quaternion(a, b, c, d)
{
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
}

Quaternion.prototype.add = function(that)
{
    var a = this.a + that.a;
    var b = this.b + that.b;
    var c = this.c + that.c;
    var d = this.d + that.d;
    
    return new Quaternion();
};

Quaternion.prototype.multiply = function(that)
{
    var a = this.a * that.a - this.b * that.b - this.c * that.c - this.d * that.d;
    var b = this.a * that.b + this.b * that.a + this.c * that.d - this.d * that.c;
    var c = this.a * that.c - this.b * that.d + this.c * that.a + this.d * that.b;
    var d = this.a * that.d + this.b * that.c - this.c * that.b + this.d * that.a;
    
    return new Quaternion(a, b, c, d);
};
