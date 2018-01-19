---
categories:
- Code
- JavaScript
date: '2015-06-22'
permalink: /the-anatomy-of-a-vanilla-javascript-plugin/
title: The anatomy of a vanilla JavaScript plugin
url: /2015/06/22/the-anatomy-of-a-vanilla-javascript-plugin
---

For those of you who are in the process of [ditching jQuery](https://gomakethings.com/ditching-jquery/), I thought it might be helpful to talk through how I structure my [native JavaScript plugins](https://gomakethings.com/free-stuff/#interactive-content).

<!--more-->

## The Template

Here's the template I start all of my projects from. We're going to walk through it step-by-step.

```lang-javascript
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define(['buoy'], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(require('buoy'));
	} else {
		root.myPlugin = factory(root, root.buoy);
	}
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var myPlugin = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings; // Placeholder variables

	// Default settings
	var defaults = {
		someVar: 123,
		initClass: 'js-myplugin',
		callbackBefore: function () {},
		callbackAfter: function () {}
	};


	//
	// Methods
	//

	// @todo add plugin methods here

	/**
	 * Handle events
	 * @private
	 */
	var eventHandler = function (event) {
		// @todo Do something on event
	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	myPlugin.destroy = function () {

		// If plugin isn't already initialized, stop
		if ( !settings ) return;

		// Remove init class for conditional CSS
		document.documentElement.classList.remove( settings.initClass );

		// @todo Undo any other init functions...

		// Remove event listeners
		document.removeEventListener('click', eventHandler, false);

		// Reset variables
		settings = null;

	};

	/**
	 * Initialize Plugin
	 * @public
	 * @param {Object} options User settings
	 */
	myPlugin.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		myPlugin.destroy();

		// Merge user options with defaults
		settings = buoy.extend( defaults, options || {} );

		// Add class to HTML element to activate conditional CSS
		document.documentElement.classList.add( settings.initClass );

		// @todo Do stuff...

		// Listen for click events
		document.addEventListener('click', eventHandler, false);

	};


	//
	// Public APIs
	//

	return myPlugin;

});
```

## Dependencies

I include two addtional files with most of my projects. The [classList.js polyfill](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#wrapper) extends classList support back to IE8 (natively, it's IE10+). [Buoy](https://github.com/cferdinandi/buoy) is a tiny collection of helper methods taht I use in most of my scripts.

## UMD Wrapper

I use a [Universal Module Definition (UMD) wrapper](https://github.com/umdjs/umd) for all of my plugins. This wrapper means that my scripts are compatibile with both AMD and CommonJS, and also work as a traditional module pattern.

It also creates scope around the plugin, preventing variables and functions from being added to the global scope or being overridden by similarly named variables in other scripts.

```lang-javascript
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define(['buoy'], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(require('buoy'));
	} else {
		root.myPlugin = factory(root, root.buoy);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	// Plugin stuff...

});
```

This sets up the namespacing for your plugin. You should change `myPlugin` to the name of your plugin.

Any references to `buoy` pass in my helper library as a dependency. In a browser, `root` is the `window`. This line addresses a Browserify bug that doesn't pass in `root` as `window` like it's supposed to.

```lang-javascript
typeof global !== 'undefined' ? global : this.window
```

## `use strict`

`use strict` tells the browser (and JS linting tools) to be more strict about the errors that they throw. This sounds like a bad thing, but if forces you to write better, more cross-compatibile code. Always use it.

## Variables

At the top of my plugin, I setup the variables I'm going to be using throughout. This keeps everything neatly organized and in one place, and makes it easier to access variables without having to specifically pass them in to methods later.

```lang-javascript
//
// Variables
//

var myPlugin = {}; // Object for public APIs
var supports = !!document.querySelector && !!root.addEventListener; // Feature test
var settings; // Placeholder variables

// Default settings
var defaults = {
	someVar: 123,
	initClass: 'js-myplugin',
	callbackBefore: function () {},
	callbackAfter: function () {}
};
```

`myPlugin` should be changed to the name of your plugin. Any public methods (ones that can be accessed and used outside of the module wrapper) are added to this object, which is returned at the end of the script. No variables or functions can be accessed or used outside of your plugin unless they're explicitly added to the `myPlugin` object.

For example, `myPlugin.init()` will be used to initialize the plugin, and is accessible from other scripts, where as the `supports` variable cannot be.

## Event Handler

I pass any event listeners-clicks, scrolls, window resizing-through my `eventHandler` method.

```lang-javascript
/**
 * Handle events
 * @private
 */
var eventHandler = function (event) {
	// @todo Do something on event
};
```

You can put all sorts of login in here. For example, I like to put my click event listeners on the `document` element, and then check to see if the element that was clicked is one of the ones I care about.

```lang-javascript
var eventHandler = function (event) {
	var toggle = buoy.getClosest(event.target, '[data-example]');
	if ( toggle ) {
		// Prevent default click event
		if ( toggle.tagName.toLowerCase() === 'a') {
			event.preventDefault();
		}
		// Run your methods
		myPlugin.someMethod();
	}
};
```

If you want can pass all event types into a single handler, and use some logic to determine the course of action based on the event type.

```lang-javascript
var eventHandler = function (event) {
	if ( event.type === 'scroll' ) {
		myPlugin.scrollMethod();
	}
	if ( event.type === 'click' ) {
		myPlugin.clickMethod();
	}
};
```

## Destroy Method

I like to provide a way to destroy the current initialization of a plugin. This is useful if you need to reinitialize for some reason, or if another script simply needs to halt whatever you've got going. As always, change `myPlugin` to the name of your plugin.

```lang-javascript
/**
 * Destroy the current initialization.
 * @public
 */
myPlugin.destroy = function () {

	// If plugin isn't already initialized, stop
	if ( !settings ) return;

	// Remove init class for conditional CSS
	document.documentElement.classList.remove( settings.initClass );

	// @todo Undo any other init functions...

	// Remove event listeners
	document.removeEventListener('click', eventHandler, false);

	// Reset variables
	settings = null;

};
```

## Initialize

While I sometimes write scripts that run on page load, I generally prefer a deliberate initialization. This allows developers to pass in their own settings that can override plugin defaults. It also lets developers include the script on every page as part of a concatenate file without actually running it on every page.

```lang-javascript
/**
 * Initialize Plugin
 * @public
 * @param {Object} options User settings
 */
myPlugin.init = function ( options ) {

	// feature test
	if ( !supports ) return;

	// Destroy any existing initializations
	myPlugin.destroy();

	// Merge user options with defaults
	settings = buoy.extend( defaults, options || {} );

	// Add class to HTML element to activate conditional CSS
	document.documentElement.classList.add( settings.initClass );

	// @todo Do stuff...

	// Listen for click events
	document.addEventListener('click', eventHandler, false);

};
```

First, I run a check to make sure the required web and JavaScript APIs are supported. In my case, `document.querySelector` and `window.addEventListener` are the big ones. These are defined in the `supports` variable at the beginning of the script.

```lang-javascript
if ( !supports ) return;
```

Then, I destroy any existing initializations of the script to avoid conflicts or duplicate event listeners.

```lang-javascript
myPlugin.destroy();
```

Next, I merge any user settings with the defaults using the `extend` method in Buoy.

```lang-javascript
settings = buoy.extend( defaults, options || {} );
```

A user would pass settings in like so:

```lang-javascript
myPlugin.init({
	someVar: 456,
	initClass: 'js-changeme',
})
```

I'm a huge advocate of progressive enhancement, and I wait until my JavaScript plugin is initialized before using CSS to hide any content. As a result, I add a class to the `html` element that I can hook onto with my CSS after the script initializes.

```lang-javascript
document.documentElement.classList.add( settings.initClass );
```

Lastly, I create my event listeners.

```lang-javascript
document.addEventListener('click', eventHandler, false);
```

Any methods that should run as soon as the plugin initializes should also be called in `myPlugin.init()`.

## Return your public methods

The last thing in my plugins is a return with the `myPlugin` object. This let's developers run any of the public methods in the plugin by prefixing them with `myPlugin.`.

```lang-javascript
return myPlugin;
```

## An example

Let's look at a simple example to see how this all works together.

I want to create a plugin called `clickMe.js` that adds a class to a link when the link is clicked. The class will vary from link to link, and not all links will trigger this behavior. We're going to use the `[data-click-me]` data attribute to identify links that should trigger the class-adding behavior. We'll also use this attribute to pass in the class that should be added.

When the browser is resized, I want to print a message in the console log. It will be same message every time. Here's how I would write this plugin.

```lang-javascript
(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define(['buoy'], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(require('buoy'));
	} else {
		root.clickMe = factory(root, root.buoy);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//

	var clickMe = {}; // Object for public APIs
	var supports = !!document.querySelector && !!root.addEventListener; // Feature test
	var settings; // Placeholder variables

	// Default settings
	var defaults = {
		resizeLog: 'The window was resized!',
		callbackBefore: function () {},
		callbackAfter: function () {}
	};


	//
	// Methods
	//

	/**
	 * Add a class to a link when it's clicked
	 * @private
	 * @param {Event} event The click event
	 */
	var addClass = function ( event ) {

		// Get the thing that was clicked
		var toggle = event.target;

		// Check if the thing that was clicked has the [data-click-me] attribute
		if ( toggle && toggle.hasAttribute( 'data-click-me' ) ) {

			// Prevent default click event
			if ( toggle.tagName.toLowerCase() === 'a') {
				event.preventDefault();
			}

			// Set the [data-click-me] value as a class on the link
			toggle.classList.add( toggle.getAttribute( 'data-click-me' ) );

		}

	};

	/**
	 * Handle events
	 * @private
	 */
	var eventHandler = function (event) {

		// Callback before the event handler runs
		settings.callbackBefore;

		// On click
		if ( event.type === 'click' ) {
			addClass( event );
		}

		// On resize
		if ( event.type === 'resize' ) {
			console.log( settings.resizeLog );
		}

		// Callback after the event handler runs
		settings.callbackAfter;

	};

	/**
	 * Destroy the current initialization.
	 * @public
	 */
	clickMe.destroy = function () {

		// If plugin isn't already initialized, stop
		if ( !settings ) return;

		// Remove all added classes
		var links = document.querySelectorAll( '[data-click-me]' );
		for ( var i = 0, len = links.length; i < len; i++  ) {
			links[i].classList.remove( links[i].getAttribute( 'data-click-me' ) );
		}

		// Remove event listeners
		document.removeEventListener('click', eventHandler, false);
		window.removeEventListener('resize', eventHandler, false);

		// Reset variables
		settings = null;

	};

	/**
	 * Initialize Plugin
	 * @public
	 * @param {Object} options User settings
	 */
	clickMe.init = function ( options ) {

		// feature test
		if ( !supports ) return;

		// Destroy any existing initializations
		clickMe.destroy();

		// Merge user options with defaults
		settings = buoy.extend( defaults, options || {} );

		// Listen for click events
		document.addEventListener('click', eventHandler, false);
		window.addEventListener('resize', eventHandler, false);

	};


	//
	// Public APIs
	//

	return clickMe;

});
```