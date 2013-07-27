/*
Define the StateMachine's class constructor.
The StateMachine is a static class, meaning its constructor
serves only to create a handle for the prototyped methods.

All functionality occurs in the prototyped properties and methods.
*/
function StateMachine() { }
/*
Here we prototype a series of 'states' that the StateMachine can be in at any given time.
The states are functions and detail everything that should or can happen while in that particular state.
*/
StateMachine.prototype.A = function() { console.log("In method A"); };
StateMachine.prototype.B = function() { console.log("In method B"); };
StateMachine.prototype.C = function() { console.log("In method C"); };
//The DEFAULT method is used in this example for the purposes of debugging.
StateMachine.prototype.DEFAULT = function() { console.log("Bad state supplied: In method DEFAULT"); };
//The CURRENT_STATE property indicates to the StateMachine which state function it should be calling at a given time.
StateMachine.prototype.CURRENT_STATE = null;
//The changeState function acts as a setter for the CURRENT_STATE static property.
StateMachine.prototype.changeState = function(state) {
	//In this example, all states have uppercase names.
	state = state.toUpperCase();
	//Check if the state machine actually has a function with the supplied name.
	if(StateMachine[state] === undefined) {
		StateMachine.CURRENT_STATE = "DEFAULT";//If supplied with a state which does not exist, switch to the default.
	} else {
		StateMachine.CURRENT_STATE = state;//If supplied with a state which exists, switch to it.
	}
};
/*
The loop object is not formally part of a finite state machine.
In other examples, the loop would be handled by another object.
For the purposes of this example, the loop object is included
as part of the state machine.

The loop object stores properties and methods relating to the real-time running of the state machine.
Rather than defining states and what those states do, it describes when to run various state functions,
and would responsible for calling the changeState function based on whatever criteria the programmer
gives it.
*/
StateMachine.prototype.loop = {
	wait: 500, //The wait property describes, in miliseconds, how often to trigger the tick method.
	timer: null, //The timer property acts as a handle on the Javascript Interval which calls the tick method.
	/*
	The tick method describes what should happen during the real-time execution of the application.
	In this instance, all that occurs every tick is whatever method is the current state of the StateMachine.
	*/
	tick: function() { StateMachine[StateMachine.CURRENT_STATE](); },
	/*
	The start and stop functions are utility methods for setting and unsetting the Javascript interval which
	calls the tick method. They manipulate the timer property, as it is acting as a handle for the interval.
	*/
	start: function() {
		if(StateMachine.loop.timer === null) {
			StateMachine.loop.timer = setInterval(StateMachine.loop.tick, StateMachine.loop.wait);
		} else {
			StateMachine.loop.stop();
			StateMachine.loop.start();
		}
	},
	stop: function() {
		if(StateMachine.loop.timer !== null) {
			clearInterval(StateMachine.loop.timer);
			StateMachine.loop.timer = null;
		}
	}
};

/*
Because the StateMachine is static -- there will be only one instance,
the constructor can be removed after the class is first initialized.
Here, the slot in memory which held the prototype of the StateMachine
is swapped out for an actual instance of the StateMachine.
*/
StateMachine = new StateMachine();

//When the page has finished loading, initialize the StateMachine to state 'b' and then start the loop.
$(document).ready(function() {
	StateMachine.changeState("b");//The changeState setter handles the input, calling .toUpperCase() on it.
	StateMachine.loop.start();//The StateMachine's loop object is invoked, started, and the StateMachine's states can be triggered.
});