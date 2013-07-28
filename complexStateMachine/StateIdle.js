/*********************
StateIdle
*********************/

/* The IdleState is non-interactive. */
function StateIdle(self, waitTime) {
	this.self = self;//Whatever object is entering this state
	this.fsm = self.getFSM();//The above object's FSM
	this.waitTime = waitTime;//The time to wait before transitioning to the next state.
	this.timeRemaining = null;//The time remaining before transitioning to the next state.
}

//The enter method handles code which runs when transitioning into this state
StateIdle.prototype.enter = function() {
	console.log("Entering idle state.");
	//Set the time until triggering the next state.
	this.timeRemaining = this.waitTime;
};

/*
The update method is run every tick (of the application loop) while in this state.
(The time argument is a reference to the current tick of the application loop.)
*/
StateIdle.prototype.update = function(time) {
	console.log("In idle state's update method");
	//Tick down to transition time.
	this.timeRemaining -= time;
	console.log("Time remaining: " + this.timeRemaining);
	if(this.timeRemaining <= 0) {
		this.fsm.goToNextState();
	}
};

//The exit method handles code which runs when transitioning out of this state
StateIdle.prototype.exit = function() {
	console.log("Exiting idle state.");
};