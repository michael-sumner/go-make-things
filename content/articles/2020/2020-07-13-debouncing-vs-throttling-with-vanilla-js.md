---
title: "Debouncing vs. throttling with vanilla JS"
date: 2020-07-13T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

*Debouncing* and *throttling* are two related but different techniques for improving performance of events in JavaScript plugins and applications.

The terms are often used interchangeably, but they're not the same thing. Let's clear that up.

1. With **throttling**, you run a function immediately, and wait a specified amount of time before running it again. Any additional attempts to run it before that time period is over are ignored.
2. With **debouncing**, you *wait* a specified amount of time before running a function. The last attempt to run the function is the one that runs, and any previous attempts within the time period are ignored.

Let's look at examples of both techniques.

## Logging button clicks

For both examples, we'll be counting the number of clicks on a button.

```html
<button id="click-me">Click Me</button>
```

We're going to detect when the user clicks the button, and will log it to the console.

```js
var count = 0;

document.addEventListener('click', function (event) {

	// Only run if the #click-me button was clicked
	if (event.target.id !== 'click-me') return;

	// Update the count by 1
	count++;

	// Log the count to the console
	console.log('true count', count);

});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/dyGjmgd)

But what if, for performance reasons, you wanted to limit how frequently the log actually happened to once every 3 seconds?

Let's look at how to do that using *throttling* and *debouncing* techniques.

## Throttling

With *throttling*, we'll setup a variable, `wait`, to tell us if we should wait before running the function again or not.

For learning purposes, I also want to show the difference between actual clicks and how many times the throttled function runs. We'll setup a second variable to track the throttled count, so that we can compare it to the actual number of times the button was clicked.

```js
var count = 0;
var throttleCount = 0;
var wait = false;
```

When the event listener runs, we'll still update `count` by one.

Then, we'll update the `throttleCount` by one as well, and log both counts into the console.

```js
var count = 0;
var throttleCount = 0;
var wait = false;

document.addEventListener('click', function (event) {

	// Only run if the #click-me button was clicked
	if (event.target.id !== 'click-me') return;

	// Update the count by 1
	count++;

	// Update the throttleCount
	throttleCount++;

	// Log the counts
	console.log('true count', count);
	console.log('throttled count', throttleCount);

});
```

Now we're ready to actually throttle the function.

After logging the counts to the console, we'll set `wait` to `true`. We'll use the `setTimeout()` method to set it back to `false` after 3 seconds (3000 milliseconds)

```js
var count = 0;
var throttleCount = 0;
var wait = false;

document.addEventListener('click', function (event) {

	// Only run if the #click-me button was clicked
	if (event.target.id !== 'click-me') return;

	// Update the count by 1
	count++;

	// Update the throttleCount
	throttleCount++;

	// Log the counts
	console.log('true count', count);
	console.log('throttled count', throttleCount);

	// Ignore any future requests for the next 3 seconds
	wait = true;
	setTimeout(function (event) {
		wait = false;
	}, 3000);

});
```

Before updating `throttleCount` and logging anything, we'll check if `wait` is `true`. If it is, we'll `return` to end the function and do nothing.

```js
var count = 0;
var throttleCount = 0;
var wait = false;

document.addEventListener('click', function (event) {

	// Only run if the #click-me button was clicked
	if (event.target.id !== 'click-me') return;

	// Update the count by 1
	count++;

	// If currently throttled, ignore the request
	if (wait) return;

	// Update the throttleCount
	throttleCount++;

	// Log the counts
	console.log('true count', count);
	console.log('throttled count', throttleCount);

	// Ignore any future requests for the next 3 seconds
	wait = true;
	setTimeout(function (event) {
		wait = false;
	}, 3000);

});
```

Now, the function will only run once every three seconds.

[Here's a demo of throttling.](https://codepen.io/cferdinandi/pen/ZEQjoEB) Click the button a bunch of times to see it in action.

## Debouncing

Debouncing is actually simpler to implement.

We'll again create a special variable, `debounceCount`, to track the number of debounced clicks versus actual clicks.

```js
var count = 0;
var debounceCount = 0;
```

With debouncing, we delay running our function until a certain period of time has passed using the `setTimeout()` method.

```js
var count = 0;
var debounceCount = 0;

document.addEventListener('click', function (event) {

	// Only run if the #click-me button was clicked
	if (event.target.id !== 'click-me') return;

	// Update the count by 1
	count++;

	// Update and log the counts after 3 seconds
	setTimeout(function () {

		// Update the debounceCount
		debounceCount++;

		// Log the counts to the console
		console.log('true count', count);
		console.log('debounced count', debounceCount);

	}, 3000);

});
```

However, if the button is clicked again, we want to ignore the currently pending function and replace it with the new one.

To do that, we'll assign our `setTimeout()` to a variable. When the event handler runs, we'll clear any existing timeout before setting a new one.

```js
var count = 0;
var debounceCount = 0;
var debounce;

document.addEventListener('click', function (event) {

	// Only run if the #click-me button was clicked
	if (event.target.id !== 'click-me') return;

	// Update the count by 1
	count++;

	// Clear any existing debounce event
	clearTimeout(debounce);

	// Update and log the counts after 3 seconds
	debounce = setTimeout(function () {

		// Update the debounceCount
		debounceCount++;

		// Log the counts to the console
		console.log('true count', count);
		console.log('debounced count', debounceCount);

	}, 3000);

});
```

[Here's a demo of debouncing.](https://codepen.io/cferdinandi/pen/WNrKJwv)

As you can see, with debouncing, nothing is logged into the console until three seconds after the last click. If you click the button continuously for six seconds, nothing is logged until three seconds after that, nine seconds from when you started.

## Which approach should you use?

Which approach you choose will depend on what you're trying to do, and what the desired user experience is.

For example, you might use *debouncing* if you're sending some updates to a database in reaction to user interactions, since the timing of those updates has little impact on the UI. You might *debounce* scroll events to run when the user is completely done scrolling.

For interactions that update the UI, *throttling* might make more sense, because they'll run at predictable intervals.