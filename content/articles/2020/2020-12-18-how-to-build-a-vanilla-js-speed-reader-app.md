---
title: "How to build a vanilla JS speed reader app"
date: 2020-12-18T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- CSS
- HTML
- JavaScript
---

[Inspired by a tweet from Chris C on Twitter](https://twitter.com/chris_07734/status/1339292970999287815), today I wanted to look at how to build a speed reader app with vanilla JS.

Let's dig in.

## The starting HTML

This app has two sections.

I'm using the `details` and `summary` elements to hold my app settings. This is where users can paste in the text to read, set the number of words-per-minute they'd like to read, and start and stop the reader.

```html
<details id="settings">
	<summary>Settings</summary>

	<label for="text">Text to Read</label>
	<textarea id="text"></textarea>

	<label for="wpm">Words Per Minute</label>
	<input type="tel" id="wpm" min="1" value="250">

	<button id="start">Start</button> <button id="stop">Stop</button>
</details>
```

There's also a `#reader` section where the actual words will get displayed. I've wrapped in a `#reader-wrapper` element that I'm going to use for styling purposes.

Because we want screen readers to announce the text, I've added `[aria-live="assertive"]` to the `#reader`.

```html
<div id="reader-wrapper">
	<div id="reader" aria-live="assertive"></div>
</div>
```

In addition to some basic form input styles, I want my words to be displayed centered both vertically and horizontally on the page. I'm using `display: flex` for that.

```css
#reader-wrapper {
	align-items: center;
	display: flex;
	font-size: 2.5em;
	justify-content: center;
	min-height: 70vh;
}
```

With that out of the way, let's dig into the actual code.

## Getting all the things

The first step for this project is to find the elements we're going to be using and cache them to variables.

I want the `#text` and `#wpm` elements, as well as the `#reader` element where we'll be displaying the words. But I also want the `#settings` element, because I plan to close it when the user starts the reader.

```js
var settings = document.querySelector('#settings');
var text = document.querySelector('#text');
var wpm = document.querySelector('#wpm');
var reader = document.querySelector('#reader');
```

Next, I want to set up some "placeholder variables" that have no defined value yet, but will be assigned one later. We'll get into what each of these is shortly.

```js
// Placeholders for words, speed, current word, and interval
var words, speed, current, interval;
```

## Listening for clicks

I want to start my reader when someone clicks the `#start` button, and stop it when they click the `#stop` button.

Rather than setup two event listeners, [I want to use a technique called event delegation](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/). First, let's setup a `click` event listener. I'm going to use a named function, `clickHandler()`, as my callback function.

```js
document.addEventListener('click', clickHandler);
```

Inside the `clickHandler()` function, I'm going to run two functions: `start()` and `stop()`. I'll pass the `event` object into each one.

```js
/**
 * Handle click events
 * @param  {Event} event The event object
 */
var clickHandler = function (event) {
	start(event);
	stop(event);
};
```

Inside the `start()` function, I'm going to check if the `event.target`, the thing clicked, has the `#start` ID. If not, I'll use the `return` operator to end the function.

Inside the `stop()` function, I'll do the same thing with the `#stop` ID.

```js
/**
 * Stop the reader
 * @param  {Event} event The event object
 */
var stop = function (event) {

	// Only run on #stop button
	if (event.target.id !== 'stop') return;

};

/**
 * Start the reader
 * @param  {Event} event The event object
 */
var start = function (event) {

	// Only run on #start button
	if (event.target.id !== 'start') return;

};
```

## Processing the user settings

Now that we're listening for when the user tries to start or stop the reader, we can process their settings and do things with them.

Inside the `start()` method, I want to make sure the `text` element has actual text in it. If not, I can again use the `return` operator to quit early.

```js
/**
 * Start the reader
 * @param  {Event} event The event object
 */
var start = function (event) {

	// Only run on #start button
	if (event.target.id !== 'start') return;

	// If there's no text to read, do nothing
	if (!text.value.length) return;

};
```

Next, I want to break the text up into an array of words.

I'll use the `Array.split()` method to create an array of words, using a space (` `) to mark the break between each word. If there's more than one space together between words, we may end up with empty strings in our array. To fix that, we'll also use [the `Array.filter()` method](https://vanillajstoolkit.com/reference/arrays/array-filter/) to remove any word that has no length.

```js
/**
 * Start the reader
 * @param  {Event} event The event object
 */
var start = function (event) {

	// Only run on #start button
	if (event.target.id !== 'start') return;

	// If there's no text to read, do nothing
	if (!text.value.length) return;

	// Get the words
	words = text.value.split(' ').filter(function (word) {
		return word.length;
	});

};
```

Next, I want to figure out how often to update the word shown on screen based on the user's specified _words-per-minute_.

I'm going to divide `60` (the number of seconds in a minute) by the number of words. I use [the `parseInt()` method](https://vanillajstoolkit.com/reference/numbers/parseint/) to convert the string that the `wpm.value` returns into a number.

Finally, I multiply the result by `1000` to get that number in milliseconds (which we'll use for updating our view) and assign the result to the `speed` variable.

```js
/**
 * Start the reader
 * @param  {Event} event The event object
 */
var start = function (event) {

	// Only run on #start button
	if (event.target.id !== 'start') return;

	// If there's no text to read, do nothing
	if (!text.value.length) return;

	// Get the words
	words = text.value.split(' ').filter(function (word) {
		return word.length;
	});

	// Get the words-per-minute
	speed = (60 / parseInt(wpm.value, 10)) * 1000;

};
```

Now we're ready to run our speed reader. I set the index for the `current` word to `0`. Then, I'm going to use another method, `run()`, to actually start the reader.

```js
/**
 * Start the reader
 * @param  {Event} event The event object
 */
var start = function (event) {

	// Only run on #start button
	if (event.target.id !== 'start') return;

	// If there's no text to read, do nothing
	if (!text.value.length) return;

	// Get the words
	words = text.value.split(' ').filter(function (word) {
		return word.length;
	});

	// Get the words-per-minute
	speed = (60 / parseInt(wpm.value, 10)) * 1000;

	// Set the current item to the first word
	current = 0;

	// Run the reader
	run();

};
```

## Running the reader

If the `settings` element is open, I want to close it. I use the `removeAttribute()` method to remove the `open` attribute from the `details` element, which closes it.

```js
/**
 * Start the interval
 */
var run = function () {

	// Close settings
	settings.removeAttribute('open');

};
```

Now, I can start showing words in the UI. To do that, I'm going to use [the `setInterval()` method](/how-to-run-a-function-repeatedly-at-a-desired-interval-using-vanilla-js/).

Because I want to clear it when the user stops the reader, I assign it to the `interval` variable. Inside the callback function, I set the `reader.textContent` to the `current` item in the `words` array. Then I increase the `current` index by `1`.

I use the `speed` in milliseconds as the frequency.

```js
/**
 * Start the interval
 */
var run = function () {

	// Close settings
	settings.removeAttribute('open');

	// Run the reader
	interval = setInterval(function () {

		// Show the word
		reader.textContent = words[current];

		// Go to the next word
		current++;

	}, speed);

};
```

If the reader goes through all of the words in the text, I want it to stop. Before updating the UI in my callback function, I'm going to check if `words[current]` exists. If not, I'm going to run an `end()` function and `return`.

```js
/**
 * Start the interval
 */
var run = function () {

	// Close settings
	settings.removeAttribute('open');

	// Run the reader
	interval = setInterval(function () {

		// If there are no more words, stop
		if (!words[current]) {
			end();
			return;
		}

		// Show the word
		reader.textContent = words[current];

		// Go to the next word
		current++;

	}, speed);

};
```

## Stopping the app

Inside my `end()` function, I use the `clearInterval()` method to stop my `interval`.

```js
/**
 * Clear the interval
 */
var end = function () {
	clearInterval(interval);
};
```

Now that we've got this method set up, we can also use it to stop the app when the user clicks the `#stop` button. Inside the `stop()` function, I can run my `end()` function, too.

```js
/**
 * Stop the reader
 * @param  {Event} event The event object
 */
var stop = function (event) {

	// Only run on #stop button
	if (event.target.id !== 'stop') return;

	// End the interval
	end();

};
```

## Putting it all together

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/VwKWzrJ) You can also view the full, completed source code.

[I've used _Moby Dick_ as demo text](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0001), because it's in the Creative Commons now.

One thing our app doesn't currently support is the ability to pause and resume from the spot where you left off. That might be a fun thing to add, if you want to practice with this app yourself.