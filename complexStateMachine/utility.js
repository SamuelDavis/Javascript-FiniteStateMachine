/*
This is a catch-all class for defining utility methods.
In general, it is bad practice to throw misc. methods
into a general-purpose class. As a result, this will
(hopefully) be exploded into several distinct classes.
Until that time, this will be a kind of sandbox to 
test interesting ideas and a place to store methods
which provide boilerplate functionality.
*/

/*
Currently, the constructor for this class is largely irrelevant.
To reference more formal languages: these methods would be static.
They're purely for use with other classes, rather than itself.
*/
function Utility() {

}

/*
This method creates a very clean break in the browser console.
Primarily this allows multiple pieces of example code
to use the console, without creating a huge amount of clutter.
*/
Utility.prototype.consoleHeader = function(title) {
	console.log("\n\n\n==============");
	/*
	Use uppercase to make the title really stand out.
	Note: parameters don't need to be assigned
	to local properties before use.
	Parameters are actually declared variables
	-- they have their own slot in memory
	and can be accessed directly from the arguments!
	*/
	console.log(title.toUpperCase());
	console.log("\n");
};

/*
This method accepts a series of properties
which should be defined in another class.
It is meant to quickly create very basic
getter/setter methods which can be copy-pasted
into the other class.
*/
Utility.prototype.generateGetSet = function(obj, className, checkType) {
	/* Setters can implement typechecking if the user supplys that value */
	var typeCheck = false;
	if(typeof typeCheck === "boolean")
		typeCheck = checkType;

	console.log(typeCheck);
	/*
	Loop through all the properties in the object.
	Note that methods are listed as properties
	(due to the crazy way JS works!).
	*/
	var properties = []; //Create array for non-functions
	for(property in obj) { //JS doesn't *really* like this kind of loop
		/*
		Print out the property names and what type they are
		(ie. string, integer, function, etc.).
		Note if they are/are not functions.
		*/
		console.log(property + ": " + typeof obj[property]);
		if(typeof obj[property] !== "function") {
			console.log("(not a function!)");
			properties.push(property); //If it's a property, add it to the property array
		}
	}

	//Only create getter/setter for properties (not methods).
	console.log(properties);
	/*
	For every property, echo a generic getter/setter
	(using a jQuery handle on the output div)
	*/
	$output = $("#output");
	for (var i = 0; i < properties.length; i++) {
		//Getter
		$output.html("<pre>" + $output.html() + className + ".prototype.get" + properties[i].charAt(0).toUpperCase() + properties[i].slice(1) + " = function() {\n" +
			"\treturn this." + properties[i] + ";\n};\n</pre>");

		//Setter
		if(typeCheck) {
			$output.html("<pre>" + $output.html() + className + ".prototype.set" + properties[i].charAt(0).toUpperCase() + properties[i].slice(1) + " = function(val) {\n" +
				"\tif(typeof val === \"" + typeof obj[properties[i]] + "\") {\n" +
				"\t\tthis." + properties[i] + " = val;\n\t}\n};</pre>");
		} else {
			$output.html("<pre>" + $output.html() + className + ".prototype.set" + properties[i].charAt(0).toUpperCase() + properties[i].slice(1) + " = function(val) {\n" +
				"\tthis." + properties[i] + " = val;\n};\n\n</pre>");
		}
	}
};