---
title: How to scale a JavaScript project over time (part 2)
date: 2023-04-20T10:30:00-04:00
draft: false
---

Yesterday, we looked at [how to scale a project from a simple one-off script to a more robust library](/how-to-scale-a-javascript-project-over-time-part-1/) with options and settings.

Today, we're going to continue this series by looking at how to add various hooks into your script.

Let's dig in!

## Instance methods

As a project grows, you might want to have a bit more control over when and how a script runs.

For example, you might want to regenerate the table of contents after dynamically injecting some elements in the UI. Or you might want destroy it altogether.

For all of that, we want to add some Class methods.

First, I'll save all of the options as _instance properties_, attached to the `this` keyword.

```js
class TOC {

	constructor (elem, options = {}) {

		// Get options
		let {level, listStyle, listClass} = Object.assign({
			level: 'h2',
			listStyle: 'ul',
			listClass: ''
		}, options);

		// Define instance properties
		Object.assign(this, {elem, level, listStyle, listClass});

		// Get DOM elements
		let headings = document.querySelectorAll(level);
		let toc = document.querySelector(elem);

		// Create the list items
		let listItems = Array.from(headings).map(function (heading) {
			// ...
		}).join('');

		// Inject the table of contents into the DOM
		toc.innerHTML = `<${listStyle} class="${listClass}">${listItems}</${listStyle}>`;

	}

}
```

Then, I'll move the code that generates the table of contents into it's own `render()` function.

Instead of using the variables outright, I'll reference the assigned instance properties (`this.elem` instead of `elem`). If I'm using a lot of them, I might _destructure_ them from `this`.

```js
class TOC {

	constructor (elem, options = {}) {

		// Get options
		let {level, listStyle, listClass} = Object.assign({
			level: 'h2',
			listStyle: 'ul',
			listClass: ''
		}, options);

		// Define instance properties
		Object.assign(this, {elem, level, listStyle, listClass});

	}

	render () {

		// Get properties from instance
		let {elem, level, listStyle, listClass} = this;

		// Get DOM elements
		let headings = document.querySelectorAll(level);
		let toc = document.querySelector(elem);

		// Create the list items
		let listItems = Array.from(headings).map(function (heading) {
			// ...
		}).join('');

		// Inject the table of contents into the DOM
		toc.innerHTML = `<${listStyle} class="${listClass}">${listItems}</${listStyle}>`;

	}

}
```

Since I want the table of contents to automatically render when initializing, I'll run my `render()` method inside the `constructor()`.

```js
class TOC {

	constructor (elem, options = {}) {

		// Get options
		let {level, listStyle, listClass} = Object.assign({
			level: 'h2',
			listStyle: 'ul',
			listClass: ''
		}, options);

		// Define instance properties
		Object.assign(this, {elem, level, listStyle, listClass});

		// render the initial UI
		this.render();

	}

	// ...

}
```

For this script, I'll also add a `destroy()` method that removes the table of contents.

```js
class TOC {

	constructor (elem, options = {}) {

		// Get options
		let {level, listStyle, listClass} = Object.assign({
			level: 'h2',
			listStyle: 'ul',
			listClass: ''
		}, options);

		// Define instance properties
		Object.assign(this, {elem, level, listStyle, listClass});

		// render the initial UI
		this.render();

	}

	// ...

	destroy () {
		let toc = document.querySelector(this.elem);
		toc.innerHTML = '';
	}

}
```

Now, I can initialize the script just like before.

```js
let toc = new TOC('[data-toc]');
```

If I were to, for example, dynamically inject some new `h2` headings into the page, I could then re-render the table of contents like this...

```js
toc.render();
```

And if I wanted to remove it entirely, I could do this...

```js
toc.destroy();
```

## Event hooks

On larger projects, different scripts often need to interact with each other.

For example, perhaps your table of contents is getting injected into an expand-and-collapse disclosure element. You don't want to initialize that script until after the table of contents is actually rendered into the page.

You also want to stop that script from running if the table of contents is ever removed.

For that, I like to use [custom events](/custom-events-with-vanilla-js/).

The `new CustomEvent()` constructor lets you create and emit events that you can listen for with the `addEventListener()` method. It's a great way to let other scripts hook into some code without having to modify the core code.

Inside my `TOC` class, I'm going to add an `emit` event. This is not for external use, so I prefix it with a hash (`#`) to make it a [private class feature](/private-class-features-in-vanilla-js-classes/).

I want to have events for when the table of contents renders and is destroyed, so I'll include a `name` parameter. I'll also include the `toc` itself, so I can emit the event on the element being rendered into (or destroyed).

```js
class TOC {

	constructor (elem, options = {}) {
		// ...
	}

	#emit (name, toc) {

		// Create the event
		let event = new CustomEvent(`toc-${name}`, {
			bubbles: true,
			cancelable: false
		});

		// Emit the event on the table of contents element
		toc.dispatchEvent(event);

	}

	render () {
		// ...
	}

	destroy () {
		// ...
	}

}
```

Now, I can run `this.#emit()` in the `render()` and `destroy()` methods after rendering or destroying the table of contents, respectively.

```js
class TOC {

	constructor (elem, options = {}) {
		// ...
	}

	#emit (name, toc) {

		// Create the event
		let event = new CustomEvent(`toc-${name}`, {
			bubbles: true,
			cancelable: false
		});

		// Emit the event on the table of contents element
		toc.dispatchEvent(event);

	}

	render () {

		// Get properties from instance
		let {elem, level, listStyle, listClass} = this;

		// Get DOM elements
		let headings = document.querySelectorAll(level);
		let toc = document.querySelector(elem);

		// ...

		// Emit a custom event
		this.#emit('render', toc);

	}

	destroy () {
		let toc = document.querySelector(this.elem);
		toc.innerHTML = '';
		this.#emit('destroy', toc);
	}

}
```

And I can listen for those events with the `addEventListener()` method.

```js
document.addEventListener('toc-render', function (event) {

	// The element that was rendered into
	let toc = event.target;

	// Run some other code
	// In this example, we're initializing a show/hide script
	new ShowHide(toc);

});
```

## What's next?

Tomorrow, we're going to look at how document code, and how to organize it for easier maintainability.