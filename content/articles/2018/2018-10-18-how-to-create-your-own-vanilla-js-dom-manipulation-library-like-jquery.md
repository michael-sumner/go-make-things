---
title: "How to create your own vanilla JS DOM manipulation library like jQuery"
date: 2018-10-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to create your own small vanilla JS helper library](/creating-your-own-vanilla-js-helper-library-like-lodash-and-underscore.js/)---a kind of mini Lodash or Underscore.js.

Today, I'm going to show you how to build a tiny DOM manipulation library. This one will be more like a micro-jQuery.

## Setting up the library

Just like yesterday, we’ll setup a [revealing module pattern](https://vanillajstoolkit.com/boilerplates/#Revealing-Module-Pattern). In keeping with other DOM manipulation libraries, we’ll use the `$` namespace for it.

```js
var $ = (function () {

	'use strict';

})();
```

With yesterday's helper library, we wanted to expose a collection of helper methods.

**This is different.** With a DOM manipulation, we want to get elements from the DOM and call methods on them.

To make that work, instead of returning an object we want to return [a constructor pattern](/an-introduction-to-the-javascript-constructor-pattern/). We'll pass in a selector, use `querySelectorAll()` to find matching elements, and attach them to the instance.

```js
var $ = (function () {

	'use strict';

	/**
	 * Create the constructor
	 * @param {String} selector The selector to use
	 */
	var Constructor = function (selector) {
		this.elems = document.querySelectorAll(selector);
	};

	/**
	 * Return the constructor
	 */
	return Constructor;

})();
```

Now, we can setup an object for our library like this.

```js
var sandwiches = new $('.sandwiches');

// Logs the NodeList of .sandwich elements
console.log(sandwiches.elems);
```

## Elements as selectors

In it's current form, `document` and `window` won't work as selectors. To fix that, we'll add a couple of `if` statements to the `Constructor`.

```js
var $ = (function () {

	'use strict';

	/**
	 * Create the constructor
	 * @param {String} selector The selector to use
	 */
	var Constructor = function (selector) {
		if (selector === 'document') {
			this.elems = [document];
		} else if (selector === 'window') {
			this.elems = [window];
		} else {
			this.elems = document.querySelectorAll(selector);
		}
	};

	/**
	 * Return the constructor
	 */
	return Constructor;

})();
```

Now you can do things like this.

```js
var doc = new $('document');
var win = new $('window');
```

## Avoid having to use `new` each time

In order to instantiate the constructor pattern, we need to use the `new` operator with it. But this gets really tedious and annoying.

To get around this, we can create an `instantiation()` method that we'll return instead. Inside this method, we'll create a `new Constructor()` and return that.

```js
var $ = (function () {

	'use strict';

	/**
	 * Create the constructor
	 * @param {String} selector The selector to use
	 */
	var Constructor = function (selector) {
		if (selector === 'document') {
			this.elems = [document];
		} else if (selector === 'window') {
			this.elems = [window];
		} else {
			this.elems = document.querySelectorAll(selector);
		}
	};

	/**
	 * Instantiate a new constructor
	 */
	var instantiate = function (selector) {
		return new Constructor(selector);
	};

	/**
	 * Return the constructor instantiation
	 */
	return instantiate;

})();
```

## Adding methods

For this tutorial, we'll add three methods:

1. `each()` will loop through each DOM element and run a callback.
2. `addClass()` will add a class to each matching element.
3. `removeClass()` will remove a class from each matching element.

Since we're calling these methods against a NodeList of DOM elements, we'll attach them to the `Constructor.prototype`.

This will give us access to `this.elems` in each of the methods.

### `each()`

For this method, we'll pass in a `callback` function to run on each element. We want to use it like this.

```js
$('.sandwich').each(function (sandwich, index) {
	console.log(sandwich); // The element
	console.log(index); // It's index in the NodeList
});
```

First, let's make sure a callback was provided and that it's a method. If not, we'll bail.

```js
/**
 * Run a callback on each item
 * @param  {Function} callback The callback function to run
 */
Constructor.prototype.each = function (callback) {
	if (!callback || typeof callback !== 'function') return;
};
```

Next, we'll loop through each item in `this.elems` with a `for` loop. For each item, we'll pass the current item in the loop and its index into the `callback()` method as arguments.

```js
/**
 * Run a callback on each item
 * @param  {Function} callback The callback function to run
 */
Constructor.prototype.each = function (callback) {
	if (!callback || typeof callback !== 'function') return;
	for (var i = 0; i < this.elems.length; i++) {
		callback(this.elems[i], i);
	}
};
```

### `addClass()`

For this method, we want to be able to add a class to each matching element, like this.

```js
$('.sandwich').addClass('tuna');
```

We can use the `each()` method we just created to make this easier.

We'll call `this.each()` to access the method on the current instantiation. In the callback, we'll use `classList.add()` to add the `className` to each item.

```js
/**
 * Add a class to elements
 * @param {String} className The class name
 */
Constructor.prototype.addClass = function (className) {
	this.each(function (item) {
		item.classList.add(className);
	});
};
```

### `removeClass()`

The `removeClass()` method should work more or less like `addClass()`.

```js
$('.sandwich').removeClass('turkey');
```

The code for it is more or less the same, too, only we'll use `classList.remove()` instead.

```js
/**
 * Remove a class to elements
 * @param {String} className The class name
 */
Constructor.prototype.removeClass = function (className) {
	this.each(function (item) {
		item.classList.remove(className);
	});
};
```

## Chaining

One thing that's nice about jQuery is that you can chain methods together, like this.

```js
$('.sandwich').addClass('tuna').removeClass('turkey');
```

As it's currently written, our library would throw an error if you tried to do this.

*But...* we can support chaining with one small change: `return this`.

If we add `return this` to the end of each method, we'll return the current instantiation, giving you access to it and all of the methods again.

```js
/**
 * Run a callback on each item
 * @param  {Function} callback The callback function to run
 */
Constructor.prototype.each = function (callback) {
	if (!callback || typeof callback !== 'function') return;
	for (var i = 0; i < this.elems.length; i++) {
		callback(this.elems[i], i);
	}
	return this;
};

/**
 * Add a class to elements
 * @param {String} className The class name
 */
Constructor.prototype.addClass = function (className) {
	this.each(function (item) {
		item.classList.add(className);
	});
	return this;
};

/**
 * Remove a class to elements
 * @param {String} className The class name
 */
Constructor.prototype.removeClass = function (className) {
	this.each(function (item) {
		item.classList.remove(className);
	});
	return this;
};
```

## Helper Methods

What if you wanted to *also* add helper methods that weren't tied to a specific element? You can create an instance of the library *without* providing a selector.

For example, here's an `ajax()` method that, for demo purposes, just logs whatever URL you provide to the console.

```js
/**
 * Do ajax stuff
 * @param  {String} url The URL to get
 */
Constructor.prototype.ajax = function (url) {
	// Do some XHR/Fetch thing here
	console.log(url);
};
```

And you'd use it like this.

```js
$().ajax('https://gomakethings.com');
```

Of course, there's no sense if trying to find elements with `querySelectorAll()` if there's no selector, so let's also update the `Constructor` a bit. We'll just bail if there's no `selector` provided.

```js
/**
 * Create the constructor
 * @param {String} selector The selector to use
 */
var Constructor = function (selector) {
	if (!selector) return;
	if (selector === 'document') {
		this.elems = [document];
	} else if (selector === 'window') {
		this.elems = [window];
	} else {
		this.elems = document.querySelectorAll(selector);
	}
};
```

## Pulling it all together

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/xyWZOQ) And here's the full source code.

```js
var $ = (function () {

	'use strict';

	/**
	 * Create the constructor
	 * @param {String} selector The selector to use
	 */
	var Constructor = function (selector) {
		if (!selector) return;
		if (selector === 'document') {
			this.elems = [document];
		} else if (selector === 'window') {
			this.elems = [window];
		} else {
			this.elems = document.querySelectorAll(selector);
		}
	};

	/**
	 * Do ajax stuff
	 * @param  {String} url The URL to get
	 */
	Constructor.prototype.ajax = function (url) {
		// Do some XHR/Fetch thing here
		console.log(url);
	};

	/**
	 * Run a callback on each item
	 * @param  {Function} callback The callback function to run
	 */
	Constructor.prototype.each = function (callback) {
		if (!callback || typeof callback !== 'function') return;
		for (var i = 0; i < this.elems.length; i++) {
			callback(this.elems[i], i);
		}
		return this;
	};

	/**
	 * Add a class to elements
	 * @param {String} className The class name
	 */
	Constructor.prototype.addClass = function (className) {
		this.each(function (item) {
			item.classList.add(className);
		});
		return this;
	};

	/**
	 * Remove a class to elements
	 * @param {String} className The class name
	 */
	Constructor.prototype.removeClass = function (className) {
		this.each(function (item) {
			item.classList.remove(className);
		});
		return this;
	};

	/**
	 * Instantiate a new constructor
	 */
	var instantiate = function (selector) {
		return new Constructor(selector);
	};

	/**
	 * Return the constructor instantiation
	 */
	return instantiate;

})();
```