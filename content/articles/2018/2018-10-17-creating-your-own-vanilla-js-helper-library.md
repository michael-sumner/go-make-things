---
title: "Creating your own vanilla JS helper library like Lodash and Underscore.js"
date: 2018-10-17T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I don't use big JavaScript libraries like Underscore.js or Lodash. Instead, [I recommend using your own little collection of helper functions](/legos-for-web-developers/) that contains just what you need for a project.

Today, I want to show you how to build your own micro-library.

## Building your own JavaScript micro-library

Think of a micro-library as a small set of helper functions scoped under a namespace. It's kind of like a mini Lodash or Underscore.js.

To get started, we'll setup a [revealing module pattern](https://vanillajstoolkit.com/boilerplates/#Revealing-Module-Pattern). In keeping with other libraries, we'll use the `_` namespace for it.

We'll setup a `methods` object to hold any public methods we want to expose for our library.

```js
var _ = (function () {

	'use strict';

	// Create the methods object
	var methods = {};

	// Expose the public methods
	return methods;

})();
```

Now, let's add some methods.

## Adding helper methods to the library

For this tutorial, let's add three methods:

1. `get` will get the first matching element in the DOM.
2. `getAll` will get all matching elements in the DOM.
3. `on` will setup an event listener to run events.

First, we'll setup each method, attaching it to the `methods` object.

```js
var _ = (function () {

	'use strict';

	// Create the methods object
	var methods = {};

	//
	// Methods
	//

	methods.get = function () {
		console.log('get');
	};

	methods.getAll = function () {
		console.log('getAll');
	};

	methods.on = function () {
		console.log('on');
	};

	// Expose the public methods
	return methods;

})();
```

Now, you can run each of those methods by calling it on the `_` function, like this.

```js
_.get();
_.getAll();
_.on();
```

[Here's a working demo you can play with.](https://codepen.io/cferdinandi/pen/mzXXxx)

Now, let's actually made those methods do something.

### `_.get()`

For our `_.get()` method, we'll use `querySelector()` to get a matching element in the DOM.

```js
methods.get = function (selector) {
	return document.querySelector(selector);
};
```

Good start, but what if you only want to search in another element rather than the whole document? We can make it even better by providing an option to scope it to an element.

```js
methods.get = function (selector, scope) {
	return scope ? scope.querySelector(selector) : document.querySelector(selector);
};
```

We should also make sure a `selector` was provided.

```js
/**
 * Get an element in the DOM
 * @param  {String} selector The selector to match against
 * @param  {Node} scope      An element to search within [optional]
 * @return {Node}            The first matching element
 */
methods.get = function (selector, scope) {
	if (!selector) throw new Error('Please provide a selector.');
	return scope ? scope.querySelector(selector) : document.querySelector(selector);
};
```

### `_.getAll()`

The `_.getAll()` method will work mostly the same way, but use `querySelectorAll()` instead of `querySelector()`.

```js
/**
 * Get all matching elements in the DOM
 * @param  {String} selector The selector to match against
 * @param  {Node} scope      An element to search within [optional]
 * @return {NodeList}        The matching elements
 */
methods.getAll = function (selector, scope) {
	if (!selector) throw new Error('Please provide a selector.');
	return scope ? scope.querySelectorAll(selector) : document.querySelectorAll(selector);
};
```


### `_.on()`

The `_.on()` method will provide a shorthand for `addEventListener()`. We'll need to allow four arguments:

1. The element to attach to the event to.
2. The event to listen for.
3. The callback to run.
4. [Whether to set `useCapture` to `true` for events that don't support bubbling.](/wtf-is-use-capture-in-vanilla-js-event-listeners/)

```js
methods.on = function (elem, event, callback, useCapture) {
	elem.addEventListener(event, callback, useCapture || false);
};
```

This is a good start, but we should also make sure any required arguments were passed in.

```js
methods.on = function (elem, event, callback, useCapture) {
	if (!elem) throw new Error('Please provide an element to attach the event to.');
	if (!event) throw new Error('Please provide an event to listen for.');
	if (!callback) throw new Error('Please provide a callback to run');
	elem.addEventListener(event, callback, useCapture || false);
};
```

We should also make sure that the `callback` is actually an event.

```js
/**
 * Setup an event listener
 * @param  {Node}     elem        The element to attach the listener to
 * @param  {String}   event       The event to listen for
 * @param  {Function} callback    The callback to run on the event
 * @param  {Boolean}  useCapture  If true, set useCapture to true [optional]
 */
methods.on = function (elem, event, callback, useCapture) {
	if (!elem) throw new Error('Please provide an element to attach the event to.');
	if (!event) throw new Error('Please provide an event to listen for.');
	if (!callback || typeof callback !== 'function') throw new Error('Please provide a valid callback function to run');
	elem.addEventListener(event, callback, useCapture || false);
};
```

## A demo

Here's the completed helper library.

```js
var _ = (function () {

	'use strict';

	// Create the methods object
	var methods = {};

	//
	// Methods
	//

	/**
	 * Get an element in the DOM
	 * @param  {String} selector The selector to match against
	 * @param  {Node} scope      An element to search within [optional]
	 * @return {Node}            The first matching element
	 */
	methods.get = function (selector, scope) {
		if (!selector) throw new Error('Please provide a selector.');
		return scope ? scope.querySelector(selector) : document.querySelector(selector);
	};

	/**
	 * Get all matching elements in the DOM
	 * @param  {String} selector The selector to match against
	 * @param  {Node} scope      An element to search within [optional]
	 * @return {NodeList}        The matching elements
	 */
	methods.getAll = function (selector, scope) {
		if (!selector) throw new Error('Please provide a selector.');
		return scope ? scope.querySelectorAll(selector) : document.querySelectorAll(selector);
	};

	/**
	 * Setup an event listener
	 * @param  {Node}     elem        The element to attach the listener to
	 * @param  {String}   event       The event to listen for
	 * @param  {Function} callback    The callback to run on the event
	 * @param  {Boolean}  useCapture  If true, set useCapture to true [optional]
	 */
	methods.on = function (elem, event, callback, useCapture) {
		if (!elem) throw new Error('Please provide an element to attach the event to.');
		if (!event) throw new Error('Please provide an event to listen for.');
		if (!callback || typeof callback !== 'function') throw new Error('Please provide a valid callback function to run');
		elem.addEventListener(event, callback, useCapture || false);
	};

	// Expose the public methods
	return methods;

})();
```

[And here's a demo you can play with.](https://codepen.io/cferdinandi/pen/mzXxyz)