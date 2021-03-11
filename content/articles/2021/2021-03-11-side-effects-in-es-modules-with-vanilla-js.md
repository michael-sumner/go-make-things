---
title: "Side effects in ES modules with vanilla JS"
date: 2021-03-11T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we learned [how to renaming imports and exports with ES modules](/renaming-imports-and-exports-with-es-modules-in-vanilla-js/). Today, we're going to learn about _side effects_: what they are and how to work with them.

Let's dig in.

_**Quick note:** I’m working on [a new Pocket Guide to ES Modules](https://vanillajsguides.com). Today’s article is an excerpt from it._

## What's a side effect in an ES module?

In ES modules, _side effects_ are "things that happen" in the module automatically, without the need for the developer to explicitly run a function.

Let's say you have a `dom.js` module.

In it, there's are `$()` and `$$()` functions that provide a shorthands for `document.querySelector()` and `document.querySelectorAll()`, respectively. There's as a `click` event listener.

```javascript
function $ (selector) {
	return document.querySelector(selector);
}

function $$ (selector) {
	return document.querySelectorAll(selector);
}

/**
 * Handle click events
 * @param  {Event} event The event object
 */
function clickHandler (event) {

	// Only run if the clicked element is a button
	if (!event.target.matches('button')) return;

	// Alert the button text
	alert(`You clicked button ${event.target.innerText}!`);

}


// Listen for click events
document.addEventListener('click', clickHandler);


export {$, $$};
```

In your `index.js` file, you import the `$$()` function from `dom.js`.

Because you're importing the `dom.js` file, the event listener also runs, even though you're not explicitly doing anything to run it. It's a side effect of the module.

```javascript
import {$$} from './dom.js';
```

## Side effects only

ES modules don't _need_ to have an `export`, and when you `import` a module, you don't _have_ to access any exports if it has them.

For example, in your `index.js` file, you can import the `dom.js` module _without_ any of its functions or variables. The event listener will run as a side effect, but none of the functions or variables will be imported.

```javascript
import './dom.js';
```

If you want, your `dom.js` file can _only_ run side effects.

You can remove the the `$()` and `$$()` functions, as well as the `export`. It's still a valid a ES module.

```javascript
/**
 * Handle click events
 * @param  {Event} event The event object
 */
function clickHandler (event) {

	// Only run if the clicked element is a button
	if (!event.target.matches('button')) return;

	// Alert the button text
	alert(`You clicked button ${event.target.innerText}!`);

}


// Listen for click events
document.addEventListener('click', clickHandler);
```