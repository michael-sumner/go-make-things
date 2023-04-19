---
title: How to scale a JavaScript project over time (part 1)
date: 2023-04-19T10:30:00-04:00
draft: false
---

Over the last few weeks, I've gotten a few emails from readers about how to structure JavaScript projects, and how to manage them as projects grow and scale over time.

Today, I wanted to talk about my approach to this. It's a lengthy topic, so this one will be broken up into a few parts.

Let's dig in!

## In the beginning...

Nearly every project I have starts as a simple `.js` file.

I don't think anything fancy. No wrappers or hooks or worrying about reusability as a library or anything like that. Just a file.

For example, let's say I have a _table of contents_ script that automatically creates a table of contents from the headings on the page.

It might live in a `table-of-content.js`  file, and look a little something like this.

```js
// Get DOM elements
let headings = document.querySelectorAll('h2');
let toc = document.querySelector('#table-of-contents');

// Create the list items
let listItems = Array.from(headings).map(function (heading) {

	// If there's no ID on the heading, skip to the next one
	if (!heading.id) return;

	return `<li><a href="#${heading.id}">${heading.innerText}</a></li>`;

}).join('');

// Inject the table of contents into the DOM
toc.innerHTML = `<ul>${listItems}</ul>`;
```

Depending on the project, I might [wrap that code in an IIFE](/the-many-ways-to-write-an-immediately-invoked-function-expression-iife-in-javascript/) or [import it as an ES module](https://vanillajsguides.com/es-modules/).

I'm not doing much beyond that.

## Refactoring for reusability

After a while, I may have another project that would benefit from a table of contents script, too.

But, I might want to change somethings. Maybe I want the list to display inline, which requires adding a class to the `ul` element. Maybe I want to use an ordered list instead of an unordered one. Maybe I want to change the element the list gets injected into, or the heading level to generate the list from.

At this point, I'm going to convert my script into a small library.

### Run-once

If I have a script that would generally only ever be run once on a page, I will typically create an _initializing function_ to handle this.

In the case of my table of contents script, I'd just wrap the whole thing in a named function that accepts an object of settings as an argument. I typically give the `options` parameter an empty object as a [default parameter](/default-function-parameters-in-vanilla-javascript/).

```js
function toc (options = {}) {

	// Get DOM elements
	let headings = document.querySelectorAll('h2');
	let toc = document.querySelector('#table-of-contents');

	// Create the list items
	let listItems = Array.from(headings).map(function (heading) {

		// If there's no ID on the heading, skip to the next one
		if (!heading.id) return;

		return `<li><a href="#${heading.id}">${heading.innerText}</a></li>`;

	}).join('');

	// Inject the table of contents into the DOM
	toc.innerHTML = `<ul>${listItems}</ul>`;

}
```

Inside the function, I use [the `Object.assign()` method](https://vanillajstoolkit.com/reference/objects/object-assign/) to merge any `options` into a default object of settings.

I also like to use [object destructuring](/the-ins-and-outs-of-object-destructuring-with-vanilla-js/) to pull out properties into individual variables.

```js
function toc (options = {}) {

	// Get options
	let {level, elem, listStyle, listClass} = Object.assign({
		level: 'h2',
		elem: '#table-of-contents',
		listStyle: 'ul',
		listClass: ''
	}, options);

	// Get DOM elements
	let headings = document.querySelectorAll('h2');
	let toc = document.querySelector('#table-of-contents');

	// ...
}
```

Then, I use those options in the script...

```js
function toc (options = {}) {

	// Get options
	let {level, elem, listStyle, listClass} = Object.assign({
		level: 'h2',
		elem: '#table-of-contents',
		listStyle: 'ul',
		listClass: ''
	}, options);

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
```

Now, I can use the script like this...

```js
toc({elem: '[data-toc]', listStyle: 'ol'});
```

Historically, I would just load the script up as-is. Today, I typically export the initialization function (in this case, `toc()`) as an ES module, and import it where needed.

```js
export default toc;
```

### Multiple instances

If the script might be used multiple times on a page, potentially with different settings each time, I'll instead use [a JavaScript Class Pattern](/the-vanilla-js-class-pattern/).

In years past, I'd used [a constructor pattern](/the-vanilla-js-constructor-pattern/), but JS Classes provide some nice features and are easier to write.

All of the code that I would have put in an initialization method for one-time use goes in the `constructor()` method in the class.

The only change I typically make with DOM scripts is to move the `elem` selector as its own parameter, without a default, as a required argument.

```js
class TOC {

	constructor (elem, options = {}) {

		// Get options
		let {level, listStyle, listClass} = Object.assign({
			level: 'h2',
			listStyle: 'ul',
			listClass: ''
		}, options);

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

Now, I can use it like this...

```js
// An instance with default settings
let toc = new TOC('[data-toc]');

// Another one, scoped to a different element
let toc2 = new TOC('#toc-two', {
	level: '#some-elem h3',
	listClass: 'list-inline'
});
```

## What next?

Tomorrow, we're going to look at how to make scripts more flexible, and allow them to interact more easily with other code, while keeping them _encapsulated_ to avoid any nasty side-effects.

Then, we'll look at how to document code and organize your files for easier maintainability.