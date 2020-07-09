---
title: "Run a function after a specified amount of time using vanilla JS"
date: 2020-07-09T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I want to show you how to run code after a specified amount of time using the native `setTimeout()` function.

Let's dig in.

## Setting up code to run later

The `setTimeout()` method accepts two arguments: the function to run, and how long to wait (in milliseconds) before running it.

```js
setTimeout(function () {
	console.log('I will run after 2 seconds');
}, 2000);
```

It's worth noting that [the *timeout time* is a minimum amount of time the browser should wait](/the-delay-on-settimeout-and-setinterval-is-just-a-suggestion/), and not a specific time.

If another function is actively running, the user's tab has gone idle, or a handful of other things are going on, the function may take longer than the time you provided to run.

## The callback function can be anonymous or named

If you want, you can use a named function instead of an anonymous one to keep your code a bit more organized.

If you do, omit the parentheses (`()`) and just include the function name.

```js
var logMe = function () {
	console.log('I will run after 2 seconds');
};

setTimeout(logMe, 2000);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/oNbdPRX)

## Canceling the function

You can also cancel a function you've scheduled with `setTimeout()` before it runs.

Let's say you wanted to check if a user was still actively using your app, and log them out if they've gone idle for security reasons.

```js
setTimeout(function () {
	var active = window.confirm('Are you still here?');
	if (!active) {
		// log the user out
		window.alert('Logged out');
	}
}, 4000);
```

But, if they click anywhere on the page before then, you can assume they *are* still using the app, and don't want to ask them.

Every `setTimeout()` method returns an ID. If you assign your `setTimeout()` method to a variable, you can use it with the `clearTimeout()` method to prevent it from running.

```js
var isActive = setTimeout(function () {
	var active = window.confirm('Are you still here?');
	if (!active) {
		// log the user out
		window.alert('Logged out');
	}
}, 4000);

document.addEventListener('click', function () {
	clearTimeout(isActive);
});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/GRodXar)

Run it twice. The first time, let it run as normal. The second time, click somewhere on the page within the first 4 seconds.

## Browser compatibility

The `setTimeout()` method works in all modern browsers, and back to at least IE6.