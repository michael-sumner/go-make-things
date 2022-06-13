---
title: How to create a helper library with vanilla JavaScript
date: 2022-06-13T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, one of my students asked...

> Have you written about your approach to creating helper functions? I was more wondering about your mental model when making something like that to be widely used...perhaps how you break down the problem to make the most effective/efficient or DRY helper?

Great question. Today, I want to discuss how I approach helper functions.

Let's dig in!

## Standalone vs. collection

For a while, I was really into _helper libraries_. I liked creating lightweight utility libraries that worked a bit like jQuery or lodash without all of the extra stuff built in. 

Today, I tend to favor [standalone helper functions](https://vanillajstoolkit.com/helpers/) that do just one thing. You copy/paste in the snippet you need, and that's that.

Both approaches have pros and cons.

With a _utility library_, you can abstract reused code into it's own helper function.

```js
/**
 * Create an array of unique items from a NodeList of items
 * @param  {NodeList} nodeList The original NodeList
 * @return {Array}             The unique array
 */
function toUniqueArray (nodeList) {
	return [...new Set(nodeList)];
}

/**
 * A function that does stuff
 */
function addClasses (nodes, classes) {
	let unique = toUniqueArray(nodeList);
	for (let node of unique) {
		// ...
	}
}

/**
 * Another function that does stuff
 */
function removeClasses (nodes, classes) {
	let unique = toUniqueArray(nodeList);
	for (let node of unique) {
		// ...
	}
}
```

With standalone functions, you may end up with the same code repeated in multiple places.

```js
/**
 * A function that does stuff
 */
function addClasses (nodes, classes) {
	let unique = [...new Set(nodeList)];
	for (let node of unique) {
		// ...
	}
}

/**
 * Another function that does stuff
 */
function removeClasses (nodes, classes) {
	let unique = [...new Set(nodeList)];
	for (let node of unique) {
		// ...
	}
}
```

This was obviously a stupid example because the "shared code" is really simple. But often, it's not!

A shared library lets you keep your code more DRY when using many functions that share some code.

Conversely, if you only need a few functions, a utility library can include way more stuff than you need, resulting in more bloated code. (_We'll look at some ways around that shortly._)

If you only need one or two of them, standalone functions can result in less code overall even if there's a few repeated bits in there.

## How to create a utility library

For utility libraries loaded directly into the browser, I like to use a _revealing module pattern_.

With this pattern, you create an Immediately Invoked Function Expression (or IIFE) that returns an object of functions.

```js
let myLib = (function () {
	
	/**
	 * Create an array of unique items from a NodeList of items
	 * @param  {NodeList} nodeList The original NodeList
	 * @return {Array}             The unique array
	 */
	function toUniqueArray (nodeList) {
		return [...new Set(nodeList)];
	}

	/**
	 * A function that does stuff
	 */
	function addClasses (nodes, classes) {
		let unique = toUniqueArray(nodeList);
		for (let node of unique) {
			// ...
		}
	}

	/**
	 * Another function that does stuff
	 */
	function removeClasses (nodes, classes) {
		let unique = toUniqueArray(nodeList);
		for (let node of unique) {
			// ...
		}
	}

	return {addClasses, removeClasses};

})();
```

The benefit of this pattern is it scopes all of your functions to a namespace, in this case, `myLib`. This helps prevent naming collisions.

And because your code is wrapped in a function itself, you can keep certain things private to the library. In the example above, the `toUniqueArray()` function is used by several functions internally, but cannot be called directly by developers.

(_Again, a stupid example. Why shouldn't developers be able to use that function?_)

## How to create standalone functions

Standalone functions are pretty straightforward. 

You write the function, and then copy/paste it into your code. I try to [write good documentation](/how-to-write-good-comments/) in [the JSDoc format](/documenting-javascript/), both for myself later and for other developers who may use it.

```js
/**
 * Add multiple classes to every node in a NodeList
 * @param {NodeList}     nodes   The nodes
 * @param {Array|String} classes The class or classes to add
 */
function addClasses (nodes, classes) {
	let unique = [...new Set(nodeList)];
	for (let node of unique) {
		// ...
	}
}

/**
 * Remove multiple classes from every node in a NodeList
 * @param {NodeList}     nodes   The nodes
 * @param {Array|String} classes The class or classes to remove
 */
function removeClasses (nodes, classes) {
	let unique = [...new Set(nodeList)];
	for (let node of unique) {
		// ...
	}
}
```

## The best of both worlds: ES modules

Today, I like to [use ES modules](https://vanillajsguides.com/es-modules/) for my libraries. 

They give me the best of both utility libraries and standalone functions, with the flexibility to mix-and-match approaches on a per-project basis.

With ES modules, I author my functions as if I'm creating a utility library. I can have shared functions to keep my code more DRY.

At the end of the file, instead of returning an object of functions, I `export` the object.

```js
/**
 * Create an array of unique items from a NodeList of items
 * @param  {NodeList} nodeList The original NodeList
 * @return {Array}             The unique array
 */
function toUniqueArray (nodeList) {
	return [...new Set(nodeList)];
}

/**
 * A function that does stuff
 */
function addClasses (nodes, classes) {
	let unique = toUniqueArray(nodeList);
	for (let node of unique) {
		// ...
	}
}

/**
 * Another function that does stuff
 */
function removeClasses (nodes, classes) {
	let unique = toUniqueArray(nodeList);
	for (let node of unique) {
		// ...
	}
}

export {addClasses, removeClasses};
```

When I want to use one or more of the functions, I can `import` them into my project.

```js
import {addClasses} from './myLib.js';

let sandwiches = document.querySelectorAll('.sandwich');
addClasses(sandwiches, ['mayo', 'pickles']);
```

This would import the `addClasses()` function _and_ the `toUniqueArray()` function that it uses. 

Just like with a revealing module pattern, though, I would _not_ be able to use the `toUniqueArray()` function. It's private and internal.

If I wanted the whole library, I could instead import everything and assign it to a variable. Then, I could use the variable as a namespace for all of the functions, just like with a revealing module pattern.

```js
import * as myLib from './myLib.js';

let sandwiches = document.querySelectorAll('.sandwich');
myLib.addClasses(sandwiches, ['mayo', 'pickles']);
```

## Bundling ES modules for even more flexibility

If I create libraries intended to be used by other developers, I'll use a module bundler like [rollup.js](https://www.rollupjs.org/) to convert my library to a variety of formats.

With rollup.js, I can author my code as ES modules (spread across multiple files if I want), and export it into...

- A revealing module pattern than can be loaded directly in the browser
- A single file with all of my ES modules exported
- A common JS file that can be used in Node.js

[You don't need to learn command line to be a good developer](/the-tools-i-use-to-make-working-with-command-line-easier/), but CLI tools like rollup.js absolutely make certain things a bit easier.