/*********************
InteractiveState
*********************/

/*
This is an example of a State-class definition.
Here we define an update method which defines
whatever functionality is unique to this state
as well as enter and exit methods for handling transitions.
*/

/*
In this example, when in the StateInteractive state,
an object can interact with another stateful object.

The constructor accepts a handle on whatever object we're trying to make stateful,
and another stateful object which we want to interact with in this state.
*/
function StateInteractive(self, otherObj) {
	this.self = self;//Whatever object is entering this state
	this.fsm = self.getFSM();//The above object's FSM
	this.other = otherObj;//The object this <self> will be interacting with 
}

//The enter method handles code which runs when transitioning into this state
StateInteractive.prototype.enter = function() {
	console.log("Entering interactive state.");
};

/*
The update method is run every tick (of the application loop) while in this state.
(The time argument is a reference to the current tick of the application loop.)
*/
StateInteractive.prototype.update = function(time) {
	console.log("In interactive state's update method.");
	//Call whatever method <self> has defined for interacting with other stateful objects
	this.self.interactWith(this.other);
	//If the other stateful object has set certain conditions...
	if(this.other.timeToRevert())
	{
		//...have <self> revert from StateInteractive to its previous state.
		this.fsm.goToPreviousState();
	}
};

//The exit method handles code which runs when transitioning out of this state
StateInteractive.prototype.exit = function() {
	console.log("Exiting interactive state.");
};