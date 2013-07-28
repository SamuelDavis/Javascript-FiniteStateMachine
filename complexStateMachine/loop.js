/*
The loop object handles the timing, or calls up update methods (ticks), for the application.
*/
function Loop(waitTime) {
	this.startTime = null;//The time at which the loop is started.
	this.stopTime = null;//How long the loop should run before stopping.
	this.wait = waitTime;//The time between ticks
	this.timer = null;//A handle on the Javascript interval (its ID in the window)
}

Loop.prototype.objects = [];//Maintain a reference to all existing objects.

/*
The update method handles all the real-time functionality of the application.
Update is being called inside of a Javascript interval's closure, meaning
a reference to the loop object must be passed into it so it can reference
the loop's properties.
*/
Loop.prototype.update = function(self, FSMs) {
	console.log("Update");
	//Loop over all existing objects' state machines and call their update functions.
	this.objects.forEach(function(e, i, a) {
		e.fsm.update(1);
	});
	//If a stopTime was defined, and it has been reached/passed...
	if(self.stopTime !== null && new Date() - self.startTime >= self.stopTime) {
		self.stop();//...stop the application loop.
	}
};

//The start method initalizes the Javascript interval which will run the application in real-time.
Loop.prototype.start = function(stopTime) {
	console.log("Start");
	//If the timer is already set...
	if(this.timer !== null) {
		this.stop();//...clear it.
	}
	//If a stopTime (the time to run the application before stopping) was provided, save its value.
	if(stopTime !== null) {
		this.stopTime = stopTime;
	}
	//Record the start time of the application to check against the stopTime.
	this.startTime = new Date();
	/*
	Finally, set the timer to reference the Javascript interval which calls the application's update method.
	Note that the setInterval function acts as a closure (this is redefined to refer to the interval, rather than the loop),
	as a result we need to save a reference to the loop and pass it into the interval.
	*/
	var self = this;
	this.timer = setInterval(function() { self.update(self); }, this.wait);
};

//The stop method clears the Javascript interval which is running the application in real-time.
Loop.prototype.stop = function() {
	console.log("Stop");
	//If the timer is in fact set...
	if(this.timer !== null) {
		clearInterval(this.timer);//...clear it and...
		this.timer = null;//...make sure the handle is nullified.
	}
};