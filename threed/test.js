



// This is supposed to be a blend of constructor with prototypes pattern and 
// self-contained module pattern.
var Scene3D = (function() {

    ////////////////////////////////////////////////////////////////////////////
    // "CLASS CONSTRUCTOR" /////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
	function Scene3D(label) {
		if (!(this instanceof Scene3D)) return new Scene3D();
		
		instances++;
		
		this.label = label || "you forgot to assign a label";
	}
	
	////////////////////////////////////////////////////////////////////////////
    // PRIVATE CLASS PROPERTIES ////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
	var instances = 0;

	var privateObject = "don't touch this";
	

	
	////////////////////////////////////////////////////////////////////////////
    // PRIVATE CLASS METHODS ///////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
	function innerFart() {
		return "the inner fart";
	}

    ////////////////////////////////////////////////////////////////////////////
    // PUBLIC INSTANCE PROPERTIES //////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    Scene3D.prototype.smell = "offending";
    
    ////////////////////////////////////////////////////////////////////////////
    // PUBLIC INSTANCE METHODS /////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    Scene3D.prototype.fart = function() {
        return "fart, " + innerFart();
    };
	
	Scene3D.prototype.add = function(obj) {
	};
	
	Scene3D.prototype.getPrivateObject = function() { return privateObject; };
	Scene3D.prototype.setPrivateObject = function(value) { privateObject = value; };
	
	////////////////////////////////////////////////////////////////////////////
    // PUBLIC PROPERTIES ///////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
	Scene3D.type = "Scene3D";
	
	////////////////////////////////////////////////////////////////////////////
    // PUBLIC CLASS METHODS ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
	Scene3D.getNumberOfInstances = function() {
		return instances;
	};

	////////////////////////////////////////////////////////////////////////////
	// RETURN Scene3D CONSTRUCTOR //////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	return Scene3D;
})();

var objA = Scene3D("Object A");
var objB = new Scene3D("Object B");


console.log(objA.getPrivateObject());
console.log(objB.getPrivateObject());


objA.setPrivateObject("do touch this");

console.log(objA.getPrivateObject());
console.log(objB.getPrivateObject());

