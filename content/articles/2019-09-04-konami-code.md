---
title: "How to create a Konami Code easter egg with vanilla JS"
date: 2019-09-04T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

If you grew up playing video games in the 80's, you may remember the *Konami Code*, a cheat code you could enter on many of the video games made by [Konami](https://en.wikipedia.org/wiki/Konami).

The *Konami Code* is `Up Up Down Down Left Right Left Right B A`.

Entering it at, for example, the start of *Teenage Mutant Ninja Turtles* would unlock *Very Hard Mode*. Entering it at the start of *Contra* would give you 30 lives.

Today, I'm going to show you how to enable a *Konami Code* easter egg on your site with vanilla JavaScript.

## Listening for key events

The first thing we need to do is detect when someone has pressed a key on their keyboard.

We can do that using [the `addEventListener()` listener method](https://vanillajstoolkit.com/reference/event-listeners/addeventlistener/) and the `keydown` event. We'll pass in a `keyHandler` function as our callback.

```js
document.addEventListener('keydown', keyHandler, false);
```

This will fire every time the user presses down on a key. We can get the specific key that was pressed using the `event.key` property.

```js
var keyHandler = function (event) {
	console.log(event.key);
};
```

[Try it yourself on CodePen.](https://codepen.io/cferdinandi/pen/XWrzaOe)

## Defining a pattern

To make this work, we need to detect when a pattern of keys are entered in a sequence.

To get started, we'll create an array with the keys in the pattern. To find out what the key is called, use the trick above to log `event.key` values.

```js
var pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
```

We also need a way to track how many keys in the pattern have been successfully pressed, so that we know when it's complete.

Let's add a variable named `current`, and set it to `0` by default.

```js
var pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
var current = 0;
```

## Detecting when the pattern has been entered

Now we're ready to match key presses against our pattern.

In our `keyHandler()` function, we first need to make sure that the key that was pressed is in the `pattern` at all. If it's not, we'll reset the number of matched items (`current`) to `0` and `return` so that our callback function stops running.

We can use [the `Array.indexOf()` method](https://vanillajstoolkit.com/reference/arrays/array-indexof.md/) to check if the key is in our `pattern` array. If the index is less than `0`, it's not there.

```js
var keyHandler = function (event) {

	// If the key isn't in the pattern, reset
	if (pattern.indexOf(event.key) < 0) {
		current = 0;
		return;
	}

};
```

We also need to make sure the key was entered in the right sequence.

For example, if someone typed `b a ArrowDown`, those are all in the sequence, but not in the right order. This is where our `current` variable becomes really useful.

We're going to increase `current` by `1` every time a key matches, so it will always have the same value as the index of the next item in the `pattern`.

We can check to see if the item in `pattern` at the `current` index is the same as `event.key`. If not, the sequence was entered wrong. We'll again reset `current` and bail.

```js
var keyHandler = function (event) {

	// If the key isn't in the pattern, or isn't the current key in the pattern, reset
	if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
		current = 0;
		return;
	}

};
```

Otherwise, we can update how much of the pattern has been completed by increasing `current` by `1`. We'll use [the *increment operator*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Increment) for that.

```js
var keyHandler = function (event) {

	// If the key isn't in the pattern, or isn't the current key in the pattern, reset
	if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
		current = 0;
		return;
	}

	// Update how much of the pattern is complete
	current++;

};
```

## Successfully completing the pattern

After the last item is entered successful, `current` will have a value of `10`, which is the same value as the `length` of the `pattern` array.

We can check if they match, and if so, the pattern is complete and we can reveal our easter egg. If the pattern can be used again, you'll also want to reset `current` to `0`.

```js
var keyHandler = function (event) {

	// If the key isn't in the pattern, or isn't the current key in the pattern, reset
	if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
		current = 0;
		return;
	}

	// Update how much of the pattern is complete
	current++;

	// If complete, alert and reset
	if (pattern.length === current) {
		current = 0;
		window.alert('You found it!');
	}

};
```

[Here's a working demo.](https://codepen.io/cferdinandi/pen/qBWVPqL)

<script>
	// Define the pattern and completed items in the sequence
	var pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
	var current = 0;

	// Event listener callback
	var keyHandler = function (event) {

		// If the key isn't in the pattern, or isn't the current key in the pattern, reset
		if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
			current = 0;
			return;
		}

		// Update how much of the pattern is complete
		current++;

		// If complete, rick roll!
		if (pattern.length === current) {
			window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
		}

	};

	// Listen for keydown events
	document.addEventListener('keydown', keyHandler, false);
</script>