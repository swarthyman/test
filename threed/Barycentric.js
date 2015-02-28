function isPointInTriangle(p, p1, p2, p3)
{   
    var _r1 = p2.y - p3.y;
    var _r2 =  p.x - p3.x;
    var _r3 = p3.x - p2.x;
    var _r4 =  p.y - p3.y;
    var _r5 = p1.x - p3.x;
    var _r6 = p3.y - p1.y;
    
    // var lam1 = (p2.y - p3.y) * ( p.x - p3.x) + (p3.x - p2.x) * ( p.y - p3.y);
    // var lam2 = (p3.y - p1.y) * ( p.x - p3.x) + (p1.x - p3.x) * ( p.y - p3.y);
    // var detT = (p2.y - p3.y) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y);
    
    
    var lam1 = _r1 * _r2 + _r3 * _r4;
    var lam2 = _r6 * _r2 + _r5 * _r4;
    var detT = _r1 * _r5 - _r3 * _r6;
    
    var sign = Math.sign(detT);
    
    lam1 = lam1 * sign;
    lam2 = lam2 * sign;
    detT = detT * sign;
    
    var isInTriangle = (lam1 > 0) && (lam2 > 0) && (lam1 + lam2 <= detT);
    
    return isInTriangle;
}