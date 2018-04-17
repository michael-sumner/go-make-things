---
title: "Public vs. private functions in JavaScript"
date: 2018-04-17T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

Today, [reader Kevin Marmet asked](https://twitter.com/kevinjmarmet/status/986194016747315200) (shared with permission):

> I’m trying to understand #javascript patterns — especially private and public functions.

Let's dig into this a bit.

## Public vs. Private Functions

So what's the difference between a public and private function?

A private function can only be used inside of it's parent function or module. A public function can be used inside or outside of it. Public functions can call private functions inside them, however, since they typically [share the same scope](/keeping-your-javascript-out-of-the-global-scope-and-why-you-want-to/).

Providing public access to some functions but not others is helpful when building plugins and other modular scripts.

## An example

For example, in [Houdini, an accordion script](https://github.com/cferdinandi/houdini) I wrote, users initialize the plugin like this.

```js
houdini.init();
```

The `init()` method is a public function.

While the script automatically opens and closes accordion content when users click toggle links, I also provide developers with the ability to dynamically open or close content from their own scripts using some additional public methods.

```js
// Shows the accordion content with the ID `#some-content`
houdini.openContent('#some-content');

// Hides the accordion content with the ID `#some-other-content`
houdini.closeContent('#some-other-content');
```

In this example, `openContent()` and `closeContent()` are also public methods.

Houdini also includes some private methods that are used within the plugin, but can't be access by developers. For example, I use a helper function to bring newly opened content into focus for visitors using assistive technology like screen readers.

```js
var adjustFocus = function ( content, settings ) {
	// Do stuff...
};
```

This function cannot be called from another developer's script. It's private.

## How to do this with your own scripts

The secret sauce that makes this all work is a JavaScript pattern known as the [Revealing Module Pattern](https://vanillajstoolkit.com/boilerplates/#Revealing-Module-Pattern).

Here's an example of a plugin called `beNice()` that you can use to say nice things.

The `smile()` method is public. You can pass in a message as an argument, or let it create one for you. It uses the private `saySomethingNice()` method to `alert()` your message.

```js
var beNice = (function () {

	'use strict';

	// My public methods will get added to this object
	var publicAPIs = {};

	// A private method
	var saySomethingNice = function (somethingNice) {
		alert(somethingNice);
	};

	// A public method
	publicAPIs.smile = function (message) {
		if (message) {
			saySomethingNice(message);
		} else {
			saySomethingNice('You make the world better just by being you!');
		}
	};

	// Return our public methods so that they can be accessed
	return publicAPIs;

})();
```

If you call `beNice.smile()` (with or without a message passed in), it will show an alert with a nice message. If you try to call `saySomethingNice()`, you'll get an error.

```js
Uncaught ReferenceError: saySomethingNice is not defined
```