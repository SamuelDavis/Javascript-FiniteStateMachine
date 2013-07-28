/*********************
Finite State Machine
*********************/

/*
The state machine class handles the transitioning of states.
*/
function StateMachine() {
	//At application start, we have no state
	this.currentState = null;
	//The previous/nextState properties are used for transitions
	this.previousState = null;
	this.nextState = null;
	this.allMachines.push(this);
}

//Maintain an array of all existing StateMachines.
StateMachine.prototype.allMachines = new Array();

StateMachine.prototype.setNextState = function(state) {
	this.nextState = state;
};

/*
The update method accepts the current tick/time from the application loop
and runs the appropriate update method for the current state.
*/
StateMachine.prototype.update = function(time) {
	//If we're in state...
	if(this.currentState !== null) {
		//...call the update method for this state
		this.currentState.update(time);
	}
};

//The change state method accepts a state object and sets it as the current state
StateMachine.prototype.changeState = function(state) {
	//If we're currently in a state...
	if(this.currentState !== null) {
		//...track this state...
		this.previousState = this.currentState;
		//...and call this state's exit method.
		this.currentState.exit();
	}
	//Set the current state to the given argument.
	this.currentState = state;
	//Run the new state's enter method.
	this.currentState.enter();
};

//This method reverts the current state to the previous.
StateMachine.prototype.goToPreviousState = function() {
	this.changeState(this.previousState);
};

//This method advances the current state to the next.
StateMachine.prototype.goToNextState = function() {
	this.changeState(this.nextState);
};