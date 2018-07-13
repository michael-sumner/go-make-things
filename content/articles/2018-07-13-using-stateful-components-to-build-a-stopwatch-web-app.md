---
title: "Using stateful components to build a stopwatch web app with vanilla JS"
date: 2018-07-13T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
---

This week, we learned about [state and stateful components](/state-based-components-with-vanilla-js/). I also showed you [a helper function you can use to make creating state-based components easier](/a-stateful-component-helper-function-for-vanilla-js/).

Today, we're going to use what we learned to build a stopwatch app. [Here's what the finished app looks like.](http://jsfiddle.net/cferdinandi/nb40j6rf/6/)

Let's get started!

## Getting Setup

Let's start with a bit of basic setup.

First, let's create an element to hold the stopwatch content. We'll give it an id of `#app`, and add `Loading...` as placeholder text while we wait for our script to startup (we're going vanilla, so that's a fraction of a second).

```html
<div id="app">Loading...</div>
```

Let's also drop in [the `Component()` helper function](https://vanillajstoolkit.com/helpers/component/). Now we can setup our stopwatch component.

## Creating the Component

We'll create a `setup()` function where we'll setup our component and render it for the first time.

```js
/**
 * Setup the stopwatch on page load
 */
var setup = function () {
	// Setup our component
};

// Setup the app
setup();
```

Let's create a global `stopwatch` variable that we assign our component to, so that we can access it from other areas of the script.

We're going to add two pieces of data, or *state*, to our component. The `time` property will hold the current time on the timer, and the `running` property is a boolean that we'll indicate if the timer is actively running or not.

```js
var stopwatch

/**
 * Setup the stopwatch on page load
 */
var setup = function () {

	// Create the stopwatch
	stopwatch = new Component('#app', {
		data: {
			time: 0,
			running: false
		}
	});

};
```

Now let's add a template.

We'll include a section with the ID of `#stopwatch` that holds the actual stopwatch timer, and another section with buttons to control the stopwatch.

Each control button will have a `[data-stopwatch]` attribute we can use later to determine what to do when it's clicked.

The first button will display "Start" when `running` is set to `false`, and have an action of `start`. When `running` is `true`, it will say "Stop" (and have an action of `stop`, too).

The second button will say "Reset," and have an action of `reset` as well.

```js
/**
 * Setup the stopwatch on page load
 */
var setup = function () {

	// Create the stopwatch
	stopwatch = new Component('#app', {
		data: {
			time: 0,
			running: false
		},
		template: function (props) {
			var template =
				'<div id="stopwatch">' +
					props.time +
				'</div>' +
				'<p>' +
					'<button data-stopwatch="' + (props.running ? 'stop' : 'start') + '">' + (props.running ? 'Stop' : 'Start') + '</button>' +
					'<button data-stopwatch="reset">Reset</button>' +
				'</p>';
			return template;
		}
	});

	// Render the stopwatch into the DOM
	stopwatch.render();

};
```

## Running the timer

Now we need a way to start, stop, and reset the timer. Let's setup an event listener to detect clicks in the DOM, and pass in a `clickHandler()` callback function.

```js
document.addEventListener('click', clickHandler, false);
```

This approach [uses event delegation](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/), and allows us to listen to all clicks in the DOM and filter out only the ones we need. It's better for performance, and means we don't have to reattach event listeners to specific elements every time the DOM updates.

We'll check if the `event.target`, the element clicked, has the `[data-stopwatch]` attribute using the `getAttribute()` method. If it doesn't, we'll bail.

Next, we'll check to see what the action is. If it's `start`, we'll run a `start()` helper method, if it's `stop`, we'll run a `stop()` helper method, and if it's `reset`, we'll run a `reset()` helper method.

```js
/**
 * Handle click events
 */
var clickHandler = function (event) {

	// Check if a stopwatch action button was clicked
	var action = event.target.getAttribute('data-stopwatch');
	if (!action) return;

	// If it's the start button, start
	if (action === 'start') {
		start();
		return;
	}

	// If it's the stop button, stop
	if (action === 'stop') {
		stop();
		return;
	}

	// If it's the stopwatch button, reset
	if (action === 'reset') {
		reset();
	}

};
```

### Starting the Stopwatch

In the `start()` helper function, the first thing we'll do is update the state to change `stopwatch.data.runnung` to `true`. Then we'll render a fresh copy of the UI.

```js
/**
 * Start the stopwatch
 */
var start = function () {

	// Render immediately
	stopwatch.data.running = true;
	stopwatch.render();

};
```

Our stopwatch counts in seconds, so we'll want to tick it up once a second.

We'll use the `setInterval()` method to run a callback method every 1000 milliseconds (or 1 second). In that callback, we'll update the `stopwatch.data.time` state by adding `1` to it to increase the time by a second.

Then we'll call `stopwatch.render()` to update the UI.

Eventually we'll need to stop the timer from running, so we'll assign it to a global variable, `timer`, that we can use to cancel the `setInterval()` later.

```js
var stopwatch, timer;

/**
 * Start the stopwatch
 */
var start = function () {

	// Render immediately
	stopwatch.data.running = true;
	stopwatch.render();

	// Start the timer
	timer = window.setInterval(function () {

		// Update the timer
		stopwatch.data.time = stopwatch.data.time + 1;
		stopwatch.render();

	}, 1000);

};
```

### Stopping the Stopwatch

In the `stop()` helper method, we'll first set the `stopwatch.data.running` state to `false`.

We can stop our `setInterval()` callback from running by passing it into the `clearInterval()` method. This only works when the interval has been assigned to a named variable.

Then, we'll run `stopwatch.render()` to update the UI.


```js
/**
 * Stop the stopwatch
 */
var stop = function () {
	stopwatch.data.running = false;
	window.clearInterval(timer);
	stopwatch.render();
};
```

### Resetting the Stopwatch

In the `reset()` helper method, we'll update the `stopwatch.data.time` state back to `0`, and run the `stop()` helper function to stop the timer.

```js
/**
 * Reset the stopwatch
 */
var reset = function () {
	stopwatch.data.time = 0;
	stop();
};
```

## Formatting the Time

At this point, we have a working stopwatch. Cool!

[Here's a demo.](http://jsfiddle.net/cferdinandi/nb40j6rf/)

<iframe width="100%" height="300" src="//jsfiddle.net/cferdinandi/nb40j6rf/1/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

But... it only shows time in seconds. After 60 seconds, you ideally want the time to show up as minutes and seconds. And after 60 minutes, you ideally want to show hours, too.

Let's add a `formatTime()` helper method to make the time more visually pleasing and useful.

```js
/**
 * Format the time in seconds into hours, minutes, and seconds
 * @param  {Number} time The time in seconds
 * @return {String}      The time in hours, minutes, and seconds
 */
var formatTime = function (time) {
	// Format the time
};

/**
 * Setup the stopwatch on page load
 */
var setup = function () {

	// Create the stopwatch
	stopwatch = new Component('#app', {
		data: {
			time: 0,
			running: false
		},
		template: function (props) {
			var template =
				'<div id="stopwatch">' +
					formatTime(props.time) +
				'</div>' +
				'<p>' +
					'<button data-stopwatch="' + (props.running ? 'stop' : 'start') + '">' + (props.running ? 'Stop' : 'Start') + '</button>' +
					'<button data-stopwatch="reset">Reset</button>' +
				'</p>';
			return template;
		}
	});

	// Render the stopwatch into the DOM
	stopwatch.render();

};
```

To keeping things simple, let's display our time like this:

```
1h 12m 23s
```

To get `minutes`, we'll take our time (which is in seconds) and divide it by `60` (the number of seconds in a minute).

We'll typically get a number with a decimal back (`1.23` minutes). We can strip off the decimal places by running it through the `parseInt()` function.

```js
/**
 * Format the time in seconds into hours, minutes, and seconds
 * @param  {Number} time The time in seconds
 * @return {String}      The time in hours, minutes, and seconds
 */
var formatTime = function (time) {
	var minutes = parseInt(time / 60, 10);
};
```

Similarly, to get hours, we'll divide `minutes` by `60` (the number of minutes in an hour). We'll again likely get a decimal, which we can convert into an integer with `parseInt()`.

*If* the timer has gone into the hours, our `minutes` will also be greater than `59`. We can strip the `hours` out of our `minutes` by using the [remainder operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder) (sometimes called the *modulo operator*). This gives you the remainder after dividing by a number.

We'll divide by `60` to remove hours.

```js
/**
 * Format the time in seconds into hours, minutes, and seconds
 * @param  {Number} time The time in seconds
 * @return {String}      The time in hours, minutes, and seconds
 */
var formatTime = function (time) {
	var minutes = parseInt(time / 60, 10);
	var hours = parseInt(minutes / 60, 10);
	if (minutes > 59) {
		minutes = minutes % 60;
	}
};
```

Finally, we can return a formatted string.  We'll use [ternary operators](/ternary-operators/) to keep this to one line.

- If `hours` is greater than `0`, we'll include it plus `h`. Otherwise, we'll use an empty string.
- If `minutes` is greater than `0`, we'll include it plus `m`. Otherwise, we'll use an empty string.
- No matter what, we'll include the remainder of `time` (our time in seconds) divided by `60`, with an `s` at the end.

```js
/**
 * Format the time in seconds into hours, minutes, and seconds
 * @param  {Number} time The time in seconds
 * @return {String}      The time in hours, minutes, and seconds
 */
var formatTime = function (time) {
	var minutes = parseInt(time / 60, 10);
	var hours = parseInt(minutes / 60, 10);
	if (minutes > 59) {
		minutes = minutes % 60;
	}
	return (hours > 0 ? hours + 'h ' : '') + (minutes > 0 || hours > 0 ? minutes + 'm ' : '') + (time % 60) + 's';
};
```

And [here's a demo of our finished app](http://jsfiddle.net/cferdinandi/nb40j6rf/6/).

<iframe width="100%" height="300" src="//jsfiddle.net/cferdinandi/nb40j6rf/6/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>