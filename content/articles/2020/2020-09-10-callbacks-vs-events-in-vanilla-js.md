---
title: "Callbacks vs. custom events in vanilla JS"
date: 2020-09-10T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In your websites and web apps, you may occasionally want to run some code in response to something that happens.

These are often things above-and-beyond the core functionality of your plugin or script. You might have a generic modal plugin, accordion script, or toggle menu feature that you use, and you need to adjust it's behavior a little in certain situations.

**For example...**

- After a modal button is clicked, fetch some Ajax content and load it into the modal.
- After an accordion is expanded, find and collapse any other open accordions.
- After the menu is expanded, reduce the size of the logo to free up more space.

Let's look at two approaches to handling this.

## An example

To make this tangible, let's pretend we have a script that counts up every time a button is clicked.

```html
<p>
	<button data-count>Add One</button>
</p>

<p>
	Total: <span id="counter">0</span>
</p>
```

```js
/**
 * The counter script
 * @param  {Node} btn     The counter button
 * @param  {Node} counter The count in the UI
 */
var countUp = function (btn, counter) {

	// The current count
	var currentCount = 0;

	// Handle button clicks
	btn.addEventListener('click', function (event) {

		// Increase the count
		currentCount++;

		// Update the UI
		counter.textContent = currentCount;

	});

};

// Get the button and count elements
var btn = document.querySelector('[data-count]');
var counter = document.querySelector('#counter');

// Run the script
countUp(btn, counter);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/eYZMrXB)

Let's imagine that whenever the button is clicked, we want to check if the total is 10 or more. If it is, we want to alert the user that they're "over capacity."

That's not the script's core function, but it's something we as a developer need to do for our project.

## Approach 1: Callbacks

A callback is a function that runs after another one finishes running.

In our `counter()` function, we could add a callback by creating a third optional argument, a callback function, and running it after increasing the count.

We can even pass in some internal information, like the current `count`, as an argument for the callback function.

```js
/**
 * The counter script
 * @param  {Node}     btn      The counter button
 * @param  {Node}     counter  The count in the UI
 * @param  {Function} callback An optional callback function
 */
var countUp = function (btn, counter, callback) {

	// The current count
	var currentCount = 0;

	// Handle button clicks
	btn.addEventListener('click', function (event) {

		// Increase the count
		currentCount++;

		// Update the UI
		counter.textContent = currentCount;

		// If there's a callback, run it
		if (callback && typeof callback === 'function') {
			callback(currentCount);
		}

	});

};
```

To use it, we could do something like this.

```js
countUp(btn, counter, function (count) {

	// if the count is 10 or more, alert the user
	if (count > 9) {
		alert('You are over capacity!');
	}

});
```

[Here's a demo with the callback approach.](https://codepen.io/cferdinandi/pen/PoNReLL)

## Approach 2: Custom Events

Callbacks are great, but they come with two drawbacks:

1. They require you to account for any use cases at the time that you run your script
2. You have to include any code that's supposed to run in one spot

For example, let's say you later add another script that, when the venue reaches capacity, pings an API and sends an email requesting additional dates or locations be added because of how popular your event is.

Depending on how your project is structured, you may want that code to live in its own file. Maybe you also want to load it asynchronously as needed to reduce the size of your JavaScript file.

With a callback function, you can't do that.

And what happens if you switch to a different approach and remove it? Now you need to remember to go into wherever `countUp()` is run and remove it from the callback.

It's a lot to keep track of as an app grows.

### Decoupling things that happen from reactions to them

Custom events provide a way to decouple *the thing that happens* from *the code that runs in response*.

JavaScript provides a way to emit a custom event that you can listen for with `addEventListener()`, just like any of the native events like `click` or `scroll`.

You can even pass custom data along that the event listener's callback function (ironic, right?) can use.

### Creating a custom event

You can create a custom event with the `new CustomEvent()` constructor.

Pass in the name of your event and an object of options as arguments. The options can include whether or not it bubbles, whether or not it can be canceled, and any details you want exposed to the event listener.

```js
// Create a new event
var event = new CustomEvent('counted', {
	bubbles: true,
	cancelable: true,
	detail: {
		currentCount: currentCount
	}
});
```

Then, you call the `dispatchEvent()` method on the element you want to attach the event to, and pass the custom `event` object in as an argument.

```js
counter.dispatchEvent(event);
```

### Back to our script

Here's what our `countUp()` script would look like using this approach.

```js
/**
 * The counter script
 * @param  {Node}     btn      The counter button
 * @param  {Node}     counter  The count in the UI
 */
var countUp = function (btn, counter) {

	// The current count
	var currentCount = 0;

	// Emit a custom event
	var emitEvent = function () {

		// Create a new event
		var event = new CustomEvent('counted', {
			bubbles: true,
			cancelable: true,
			detail: {
				currentCount: currentCount
			}
		});

		// Dispatch the event
		counter.dispatchEvent(event);

	};

	// Handle button clicks
	btn.addEventListener('click', function (event) {

		// Increase the count
		currentCount++;

		// Update the UI
		counter.textContent = currentCount;

		// Emit the custom event
		emitEvent();

	});

};
```

And to alert the user when they're over capacity, we would instead do this.

```js
// Run the script
countUp(btn, counter);

// Alert the user when the count reaches 10
counter.addEventListener('counted', function (event) {
	if (event.detail.currentCount > 9) {
		alert('You are over capacity!');
	}
});
```

[Here's another demo using a custom event.](https://codepen.io/cferdinandi/pen/MWyVXJm)

### Browser compatibility

Custom events work in all modern browsers, and IE11. [You can push support back to IE9 with a polyfill.](https://vanillajstoolkit.com/polyfills/customevent/)

## Which approach should you use?

For really simple scripts, I sometimes still use a callback function.

But I generally prefer the custom event approach instead. It provides greater developer flexibility, and feels like a more modern way to approach building plugins and apps.