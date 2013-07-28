/*********************
ObjectA
*********************/

/*
This example object is just used to showcase the states' functionality.
*/

function ObjectA(fsm, loop) {
	this.fsm = fsm;
	loop.objects.push(this);
}

//The update method accounts for any changes to the object between application loop ticks.
ObjectA.prototype.update = function(time) {
	this.fsm.update();
};

//The getFSM is a basic getter for this object's finite state machine.
ObjectA.prototype.getFSM = function() {
	return this.fsm;
};

ObjectA.prototype.interactWith = function(other) {
	console.log("Interacting with " + other);
};

ObjectA.prototype.timeToRevert = function() {
	return true;
};