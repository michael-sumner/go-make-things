---
title: How to keep your JavaScript organized
date: 2022-12-05T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

One of the more common questions I get from students is something like...

> How do I keep my code more organized as things grow?

Today, I wanted to talk about that. Let's dig in!

_**Note:** Almost everything I'll be talking about here is explored in greater detail in my [JavaScript Structure & Scale workshop](https://vanillajsacademy.com/advanced)._

## Structure within a file

I follow a pattern in my JavaScript files...

1. Variables go at the top
2. Functions go in the middle
3. Event listeners and function execution goes at the end

Here's an over-simplified example of a script that listens for form `submit` events and sends them to a server with Ajax.

```js
// 
// Variables
// 

// DOM elements
let form = document.querySelector('#join-newsletter');
let formStatus = form.querySelector('[role="status"]');

// API endpoint
let endpoint = 'https://path-to-my-api.com';


// 
// Functions
// 

/**
 * Handle submit events
 * @param  {Event} event The event object
 */
function submitHandler (event) {

	// Get the form data
	let data = new FormData(event);

	// Submit the data to the API
	fetch(endpoint, {
		method: 'POST',
		body: data
	}).then(function (response) {
		return response.json();
	}).then(function (json) {
		formStatus.textContent = json.msg;
	}).catch(function (error) {
		formStatus.textContent = error;
	});

}


// 
// Inits & Event Listeners
// 

form.addEventListener('submit', submitHandler);
```

On bigger scripts, I include heading comments for each section. On smaller scripts, I typically skip them.

## Good in-code documentation

I document my code thoroughly.

The common explanation for why to do this is so that other people can more easily work with your code. The selfish reason is that if I don't look at code for a month or two and come back to it, it's a _lot_ easier to jump right in and start working again if the code is well documented.

[I'm a big fan of JSDoc for documentation.](/how-to-document-object-properties-with-jsdoc/)

[JSDoc](https://jsdoc.app/) is an industry convention based on the DocBlocker format. It provides information about what a function does, the parameters it accepts, and the data that it returns back out.

```js
/**
 * Get the details about a wizard to render into the UI
 * @param  {Object}  wizard         The wizard data
 * @param  {String}  wizard.name    The wizard's name
 * @param  {Array}   wizard.spells  A list of spells the wizard knows
 * @param  {Integer} wizard.age     The wizards age
 * @return {String}                 The message about the wizard
 */
function getWizardMessage (wizard) {
	let {name, spells, age} = wizard;
	return `${name} is ${age} years old, and knows the following spells: ${spells.join(', ')}`;
}
```

Many modern text editors will also automatically use JSDoc headings to show you hints when you go to type a function or hover over it later in your code.

A little time spent writing in-context documentation now is a lot of time saved later!

## Library wrappers

For code that might be reused across projects, or that contains some specific functionality, I will often create a tiny library.

I used to be a big fan of [the Revealing Module Pattern](/the-vanilla-js-revealing-module-pattern/). More recently, I've found that [the Constructor Pattern](/the-vanilla-js-constructor-pattern/) or [JavaScript Classes](/the-vanilla-js-class-pattern/) better meet my needs.

Either way, the goal is to provide a self-contained wrapper for some specific piece of functionality that makes it easier to use in other places.

DOM manipulation and data manipulation tasks are good candidates for this approach.

You might [create a library](https://vanillajsguides.com/writing-js-libraries/) for things like form validation, or an accordion or dropdown component.

This allows you to load the script on a page, and then use with just one or two lines or code.

```js
let navMenu = new Dropdown('#nav-menu');
```

For many DOM manipulation scripts, [a native Web Component](/what-are-browser-native-web-components/) might be a better choice. They allow you to include custom elements in the HTML, with all of your JavaScript tucked away in a nice little wrapper class.

```html
<nav-menu>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/about">About Us</a></li>
		<li><a href="/services">How We Can Help</a></li>
	</ul>
</nav-menu>
```

[If you want to learn how to create your own Web Components, I have a new course on that.](https://vanillajsguides.com/web-components/)

## Modularizing your code base

Within a site or app, I might have lots of functions that are reused in various places, but not needed on every page.

[ES Modules](/series/es-modules/) provide you with a way to break your code into small, modular parts, and keep variables and functions scoped to just where they’re needed.

Conceptually, ES modules work like this:

- In a file, you declare certain functions and variables as exportable, which means that they can be used outside of that file.
- In another file, you import the functions and variables you need from the first file.

For example, I may have a `math.js` file, with `add()` and `subtract()` functions.

```js
function add (num1, num2) {
	return num1 + num2;
}

function subtract (num1, num2) {
	return num1 - num2;
}
```

I have another function, `calculator.js`, where I want to run those functions in response to some user actions.

```js
function doAddition () {
	answer.textContent = add(42, 2022);
}
```

In `math.js`, I can use the `export` operator to export an object of functions.

```js
export {add, subtract};
```

Then, in my `subtract.js` file, I can `import` the functions I need, and use them.

```js
import {add} from './math.js';
```

ES Modules allow me to create a code base with a handful of smaller, more focused files. They also help me reuse specific functions without having to copy/paste things or have one giant file for the entire site.

[If you want to learn the ins-and-outs of ES Modules, I have a course on that, too.](https://vanillajsguides.com/es-modules/)