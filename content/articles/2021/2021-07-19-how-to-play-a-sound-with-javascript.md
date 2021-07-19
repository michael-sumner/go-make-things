---
title: "How to play a sound with JavaScript"
date: 2021-07-19T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

Today, we're going to look at how to use vanilla JS to play a sound in the browser. Let's dig in!

_**Quick aside:** autoplaying unwanted background sounds on a webpage can very intrusive and create a terrible user experience. Use this with care!_

## The `new Audio()` constructor

The `new Audio()` constructor lets you create a new `HTMLAudioElement`. Pass in the URL of the audio file as an argument.

```js
let beat = new Audio('/path/to/my/beat.mp3');
```

After you create it, you can use all of the same methods available on an `<audio>` element: `HTMLAudioElement.play()`, `HTMLAudioElement.pause()`, and `HTMLAudioElement.load()` most notably.

```js
// Play the beat
beat.play();

// Pause/stop the beat
beat.pause();

// Reload the beat (back to the start)
beat.load();
```

## Example: a timer app

Let's say we have a simple timer app that counts down to `0`.

It has a `count` variable that starts at `5`. We use [the `setInterval()` method](/how-to-run-a-function-repeatedly-at-a-desired-interval-using-vanilla-js/) to run a callback function every `1000` milliseconds (or every one second).

Inside that callback, we decrease the count by `1` with the _decrement operator_ (`--`). If the `count` is greater than `0`, we show it. Otherwise, we use `clearInterval()` to stop the `timer`, and show an alarm clock emoji (⏰) instead.

```html
<div id="app" aria-live="polite">5</div>
```

```js
// Get the #app element
let app = document.querySelector('#app');

// Track the count
let count = 5;

// Run a callback function once every second
let timer = setInterval(function () {

	// Reduce count by 1
	count--;

	// Update the UI
	if (count > 0) {
		app.textContent = count;
	} else {
		app.textContent = '⏰';
		clearInterval(timer);
	}

}, 1000);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/yLbXqmQ)

Now, what if you wanted to play a chime when the alarm ends?

### Adding a chime to the alarm

For this project, I downloaded [the "ding-dong sound effect" from Free Sounds Library](https://www.freesoundslibrary.com/ding-ding-sound-effect/), and saved it as `ding.mp3` in my project directory.

Next, I added a `playSound()` function.

In it, I create a `new Audio()` object from the `ding.mp3` file. Then, I use the `ding.play()` method to make it play.

```js
/**
 * Play the chime sound
 */
function playSound () {
	let ding = new Audio('ding.mp3');
	ding.play();
}
```

Back in the callback function for my `setInterval()` method, I run the `playSound()` method when the timer reaches `0`.

```js
// Run a callback function once every second
let timer = setInterval(function () {

	// Reduce count by 1
	count--;

	// Update the UI
	if (count > 0) {
		app.textContent = count;
	} else {
		app.textContent = '⏰';
		clearInterval(timer);
		playSound();
	}

}, 1000);
```

Now, whenever the timer ends, a gentle "ding dong" sound is played.

[Play around with the source code on GitHub.](https://gist.github.com/cferdinandi/9842dbe5f7286f0ed1edbb7203453a61)