---
title: "Building an extensible app or library with vanilla JS"
date: 2019-08-07T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

On a recent project, I led a team that built a pretty large vanilla JS app.

The code base had gotten pretty big, so we wanted to modularize our files. But, we didn't want to muck around with ES6 imports and module bundlers like webpack.

Today, I want to show you how I built a modular, extensible vanilla JS app.

## The core code

The central part of the system is a [revealing module pattern](/creating-your-own-vanilla-js-helper-library-like-lodash-and-underscore.js/), with an object to hold my public methods.

A public method called `extend()` can be used to add functions to the public `methods` object from anywhere. It accepts two arguments: the name of the function to add, and the function itself.

```js
// The core app code
var myApp = (function () {

	'use strict';

	// Create a public methods object
	var methods = {};

	/**
	 * Extend the public methods object
	 * @param  {String}   name The new method name
	 * @param  {Function} fn   The new method
	 */
	methods.extend = function (name, fn) {
		methods[name] = fn;
	};

	// Return public methods object
	return methods;

})();
```

That's it! Now let's put it to work.

## An example: storing app settings

Let's say I wanted to maintain some settings for the app.

I would create a new file called `settings.js`, and add an [Immediately Invoked Function Expression (or IIFE)](/the-anatomy-of-an-immediately-invoked-function-expression/) to it.

```js
// Settings functionality
(function () {

	'use strict';

	// Code goes here...

})();
```

First, let's create an object of settings.

```js
// Settings functionality
(function () {

	'use strict';

	// Create app settings
	var settings = {
		debug: false
	};

})();
```

Next, let's create a function to modify the settings object. It will accept two arguments: the key to update, and the value to set it to.

We'll check that the `key` actually exists in `settings` before doing anything.

```js
// Create app settings
var settings = {
	debug: false
};

/**
 * Update the settings object
 * @param  {String} key The setting key
 * @param  {*}      val The new value
 */
var setting = function (key, val) {

	// if the setting doesn't exist, bail
	if (!(key in settings)) return;

	// Update the settings
	settings[key] = val;

};
```

Next, let's add a way to get settings from the object.

It will accept a `key` as an optional argument. If one is provided, it will return that specific `key` from `settings`. If not, it will [create a copy of the object with `Object.assign()`](https://vanillajstoolkit.com/reference/objects/object-assign/) and return that.

```js
// Create app settings
var settings = {
	debug: false
};

/**
 * Update the settings object
 * @param  {String} key The setting key
 * @param  {*}      val The new value
 */
var setting = function (key, val) {
	// ...
};

/**
 * Get settings
 * @param  {String} key The setting key (optional)
 * @return {*}          The setting or object of settings
 */
var getSettings = function (key) {

	// If there's a key, get a specific setting
	if (key) {
		return settings[key];
	}

	// Otherwise return the whole settings object
	return Object.assign({}, settings);

};
```

Now, we can use `myApp.extend()` to make these methods part of the core `myApp` library.

```js
// Extend myApp
myApp.extend('setting', setting);
myApp.extend('getSettings', getSettings);
```

## Using extended methods

Let's put our new methods to use!

We'll create a new file, `utilities.js`, to hold utility methods for our app. Let's say we want the ability to log messages to the console, but only if the app's `debug` setting is `true`.

We'll again create an IIFE, and add a `log()` function to it. The function will accept a message to log as it's argument.

```js
// Utility functions
(function () {

	'use strict';

	/**
	 * Log a message to the console
	 * @param  {String} msg The message to log
	 */
	var log = function (msg) {
		// Some code...
	};

})();
```

Next, we'll call the new `myApp.getSettings()` method, passing in `debug`, to see if debug mode is active or not. If it's not, we'll `return` immediately and do nothing.

Otherwise, will pass the `msg` into `console.log()`.

```js
/**
 * Log a message to the console
 * @param  {String} msg The message to log
 */
var log = function (msg) {

	// If not in debug mode, do nothing
	if (!myApp.getSettings('debug')) return;

	// Log a message to the console
	console.log(msg);

};
```

Now we can `extend()` the `myApp` library with our `log()` function.

```js
/**
 * Log a message to the console
 * @param  {String} msg The message to log
 */
var log = function (msg) {

	// If not in debug mode, do nothing
	if (!myApp.getSettings('debug')) return;

	// Log a message to the console
	console.log(msg);

};

// Extend myApp
myApp.extend('log', log);
```

## Try it yourself!

If you want to play around with this technique yourself, you can [download the source code on GitHub](https://gist.github.com/cferdinandi/9aab2f7b3accdf73e7ea888632bc2daa).

Open up the console in your browser's Dev Tools, and try running this:

```js
myApp.log('Hello, world!');
```

Nothing will happen, because the default setting for `debug` is `false`. Let's update that.

Run this in the console.

```js
myApp.setting('debug', true);
```

Now, try running the log method again.

```js
myApp.log('Hello, world!');
```

What do you think?

I know a lot of people swear by ES6 imports, but this systems worked really well for us. It gave us a simple, modular, extensible framework we can easily build on in the future.