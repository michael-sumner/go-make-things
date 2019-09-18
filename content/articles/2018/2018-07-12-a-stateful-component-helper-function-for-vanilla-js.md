---
title: "A stateful component helper function for vanilla JS"
date: 2018-07-12T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we talked about [what state is and how to create state-based components with vanilla JS](/state-based-components-with-vanilla-js/).

Today, I'm going to show you a small helper function that makes creating stateful components (and rendering them into the DOM) easier, without having to rely on a big framework or library. It weighs just 300 bytes (that's 0.3kb) after minification and gzipping, vs 80kb or so for the lightest modern frameworks.

First, I'm going to show you how to use it. Then I'll show you the function itself and break down how it works.

<div id="toc"></div>

## How to use it

The `Component()` method accepts two arguments.

The first is a string selector for the element that you'll be rendering your component into. You can optionally pass in the node itself.

```js
// This works
var app1 = new Component('#app');

// So does this
var app2 = new Component(document.querySelector('#app2'));
```

### Defining a template for your component

The second argument is an object of options. It requires a `template` property, as either a string or an object that requires a string, to render into the DOM.

```js
// Your template can be a string
var app1 = new Component('#app', {
	template: 'Hello, world!'
});

// It can also be a function that returns a string
// Your template can be a string
var app2 = new Component('#app2', {
	template: function () {
		return 'Hello, world!'
	}
});
```

### Adding state to the component

As an optional property of the `options` argument, you can include state for the component with the `data` property.

The `data` is automatically passed into your `template` function, so that you can use it customize the template.

```js
// Some data
var app = new Component('#app', {
	data: {
		greeting: 'Hello',
		name: 'world'
	},
	template: function (props) {
		return props.greeting + ', ' + props.name + '!';
	}
});
```

### Sanitizing state

If your state includes user-provided content, the `Component()` function has a `sanitize()` method built into it that you can use to [strip out malicious code and avoid cross-site scripting attacks](/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/).

```js
// Some data
var app = new Component('#app', {
	data: {
		greeting: 'Hello',
		name: 'world'
	},
	template: function (props) {
		return props.greeting + ', ' + Component.sanitize(props.name) + '!';
	}
});
```

### Rendering your component

To render a component, call the `render()` method on it.

```js
// Create a component
var app = new Component('#app', {
	data: {
		greeting: 'Hello',
		name: 'world'
	},
	template: function (props) {
		return props.greeting + ', ' + props.name + '!';
	}
});

// Render the component
app.render();
```

[Here's a demo.](http://jsfiddle.net/cferdinandi/o9umcx0f/)

### Updating your state

The `data` is a property of your component. You can access and update it directly on the component.

```js
app.data.greeting = 'Bonjour';
app.data.name = 'Universe';
```

You can update your component in the DOM by calling the `render()` method again.

```js
app.render();
```

[Here's an updated demo.](http://jsfiddle.net/cferdinandi/o9umcx0f/2/) It renders the initial layout, and uses `setTimeout()` to update the state and re-render the UI 2 seconds later.

```js
window.setTimeout(function () {
	app.data.greeting = 'Bonjour';
	app.data.name = 'Universe';
    app.render();
}, 2000);
```

## The `Component()` helper function

Here's the full code for the `Component()` helper function. You can also find it on the [Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/component/).

```js
/*!
 * A vanilla JS helper for creating state-based components
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param {String|Node} elem    The element to make into a component
 * @param {Object}      options The component options
 */
var Component = (function () {

	'use strict';

	/**
	 * Create the Component object
	 * @param {String|Node} elem    The element to make into a component
	 * @param {Object}      options The component options
	 */
	var Component = function (elem, options) {
		if (!elem) throw 'ComponentJS: You did not provide an element to make into a component.';
		this.elem = elem;
		this.data = options ? options.data : null;
		this.template = options ? options.template : null;
	};

	/**
	 * Sanitize and encode all HTML in a user-submitted string
	 * @param  {String} str  The user-submitted string
	 * @return {String}      The sanitized string
	 */
	Component.sanitize = function (str) {
		var temp = document.createElement('div');
		temp.textContent = str;
		return temp.innerHTML;
	};

	/**
	 * Render a template into the DOM
	 * @return {[type]}                   The element
	 */
	Component.prototype.render = function () {

		// Make sure there's a template
		if (!this.template) throw 'ComponentJS: No template was provided.';

		// If elem is an element, use it.
		// If it's a selector, get it.
		var elem = typeof this.elem === 'string' ? document.querySelector(this.elem) : this.elem;
		if (!elem) return;

		// Get the template
		var template = (typeof this.template === 'function' ? this.template(this.data) : this.template);
		if (['string', 'number'].indexOf(typeof template) === -1) return;

		// Render the template into the element
		if (elem.innerHTML === template) return;
		elem.innerHTML = template;

		// Dispatch a render event
		if (typeof window.CustomEvent === 'function') {
			var event = new CustomEvent('render', {
				bubbles: true
			});
			elem.dispatchEvent(event);
		}

		// Return the elem for use elsewhere
		return elem;

	};

	return Component;

})();
```

Let's look at what's going on here.

### Setting up our plugin

The `Component()` helper method uses a revealing module pattern.

```js
/**
 * A vanilla JS helper for creating state-based components
 * @param {String|Node} elem    The element to make into a component
 * @param {Object}      options The component options
 */
var Component = (function () {

	'use strict';

})();
```

### Creating the `Component` object

Next, we create a `Component` object that will serve as the prototype for all of our components.

If no element selector (`elem`) is provided, we'll throw an error letting the developer know. Otherwise, we'll assign the element selector, the `template`, and any `data` that was provided as properties of the component.

```js
/**
 * Create the Component object
 * @param {String|Node} elem    The element to make into a component
 * @param {Object}      options The component options
 */
var Component = function (elem, options) {
	if (!elem) throw 'ComponentJS: You did not provide an element to make into a component.';
	this.elem = elem;
	this.data = options ? options.data : null;
	this.template = options ? options.template : null;
};
```

### Adding a sanitize method

It's common for web apps to include user-provided data. Since this [poses a risk for cross-site scripting attacks](/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/), the `Component()` function includes a `sanitize()` method that can be used to remove malicious code.

```js
/**
 * Sanitize and encode all HTML in a user-submitted string
 * @param  {String} str  The user-submitted string
 * @return {String}      The sanitized string
 */
Component.sanitize = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};
```

### Rendering a component

Next, we're going to assign a method to the *prototype* of our `Component()` function.

Whenever we create a new component, it will refer to this original function instead of creating a new copy of it, reducing the load on our memory in the browser.

```js
/**
 * Render a template into the DOM
 * @return {[type]}                   The element
 */
Component.prototype.render = function () {

	// Make sure there's a template
	if (!this.template) throw 'ComponentJS: No template was provided.';

	// If elem is an element, use it.
	// If it's a selector, get it.
	var elem = typeof this.elem === 'string' ? document.querySelector(this.elem) : this.elem;
	if (!elem) return;

	// Get the template
	var template = (typeof this.template === 'function' ? this.template(this.data) : this.template);
	if (typeof template !== 'string') return;

	// Render the template into the element
	if (elem.innerHTML === template) return;
	elem.innerHTML = template;

	// Dispatch a render event
	if (typeof window.CustomEvent === 'function') {
		var event = new CustomEvent('render', {
			bubbles: true
		});
		elem.dispatchEvent(event);
	}

	// Return the elem for use elsewhere
	return elem;

};
```

In our `render()` method, we're going to make sure the component has a `template` property. If not, we'll throw an error.

If the `elem` property is a string, we'll use `querySelector()` to get the element. If it's a node, we'll use that node directly.

Similarly, if the `template` property is a string or number, we'll use it outright. If it's a function, we'll run it to get a string (or number).

Next, we'll run a check to make sure the existing `innerHTML` of our `elem` differs from the `template`. If they're the same, we won't do anything since there's nothing new to render. Otherwise, we'll update the DOM.

Finally, we'll dispatch a custom event that you can hook into with `addEventListener()`, letting you trigger other actions whenever a piece of content is updated. Then we'll return the `elem` itself.

### About custom events

When content is updated, you may need to reinitialize some JavaScript elsewhere in your code base or take additional actions.

[The `CustomEvent` API](/custom-events-with-vanilla-javascript/) let's you create a custom event type that you can listen for with `addEventListener`. In the `Component.render()` method, it's dispatched on the element that was rendered, and bubbles so that you can [use event delegation](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/) if you want.

```js
document.addEventListener('render', function (event) {
	if (event.target.matches('#app')) {
		// Do something...
	}
}, false);
```

## An example

To make this all more tangible, let's create a simple clock using a stateful component.

Here's the HTML.

```html
<div id="clock"></div>
```

Now, let's create a component.

We'll use [the `Date()` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and it's `toLocaleTimeString()` method to get the current time and assign it to the `time` property in our state. Our `template` will return `The time is` followed by this property.

```js
// Create a clock component
var clock = new Component('#clock', {
	data: {
		time: new Date().toLocaleTimeString()
	},
	template: function (props) {
		return 'The time is ' + props.time;
	}
});
```

Now we can render it into the DOM.

```js
// Render the clock
clock.render();
```

Now we've got a simple app that shows you the time when you load the page. [Here it is in action.](http://jsfiddle.net/cferdinandi/y6w04dje/2/)

That's a great start, but we want to update the clock in real time.

To make that happen, we'll use the `setInterval()` method to run a callback function every `1000` millseconds, or 1 second. In that function, we'll update our state and render a fresh UI.

```js
// Update the clock once a second
window.setInterval(function () {
	clock.data.time = new Date().toLocaleTimeString();
	clock.render();
}, 1000);
```

[Here's the finished clock app.](http://jsfiddle.net/cferdinandi/y6w04dje/4/)

You *could* have done something like this instead.

```js
// Get the clock element from the DOM
var clock = document.querySelector('#clock');

// Set the initial time
clock.innerHTML = new Date().toLocaleTimeString();

// Update the time once a second
window.setInterval(function () {
	clock.innerHTML = new Date().toLocaleTimeString();
}, 1000);
```

And honestly, for *really* simple apps like this, that's definitely the smarter and easier approach.

When you start building bigger web apps, though, that targeted manipulation becomes a lot harder to manage. Tomorrow, we'll build a stopwatch app together, and see how building a fresh UI based on state can make maintaining a web app easier and simpler.