//When the page has finished loading, initialize the StateMachine to state 'b' and then start the loop.
$(document).ready(function() {
	//Create a new instance of the utility class for cleaner console-logging.
	var utility = new Utility();
	/*
	COMPLEX FINITE STATE MACHINE EXAMPLE
	*/
	utility.consoleHeader("Complex FSM");
	/*
	This is an object-oriented example of a finite state machine.
	In this example, states themselves are defined as classes
	which are then manipulated by the FSM -- another class in itself.

	The files/classes associated with this example are:
	FiniteStateMachine.js
	StateInteractive.js
	StateIdle.js
	ObjectA.js
	loop.js
	*/
	//Create an instance of the application loop (to run in real-time)
	var loop = new Loop(500);
	//Create two objects and give them each a state machine.
	var a = new ObjectA(new StateMachine(), loop);
	var b = new ObjectA(new StateMachine(), loop);

	//Set the next state of one of the objects...
	a.fsm.setNextState(new StateIdle(a, 5));
	a.fsm.goToNextState();//...and set its current state to be that state...
	//...then reset its next state to be some other state.
	a.fsm.setNextState(new StateInteractive(a, b));

	//Start the application loop
	loop.start(2000);
});