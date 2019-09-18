---
title: "Adding options and settings to a script"
date: 2019-01-09T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

I just finished a big update to my [*Writing Plugins* pocket guide](https://vanillajsguides.com/writing-vanilla-js-plugins/) (and am going to be recording the video course this week).

One of the sections that got a big refresh was on adding options and settings to a script.

## The power of plugins

Imagine you have a script that gets all of the `h2` elements on the page and creates a table of contents for you.

```js
var tableOfContents = function () {

	// Variables
	var headings = document.querySelectorAll('h2');
	var target = document.querySelector('#toc');

	// Make sure there's a target and headings
	if (!target || headings.length < 1) return;

	// Create the table of contents items
	var tocItems = Array.prototype.map.call(headings, function (heading) {
		return '<li>' + heading.textContent + '</li>';
	});

	// Add the table of contents to the DOM
	target.innerHTML =
		'<h2>Table of Contents</h2>' +
		'<ul>' +
			tocItems.join('');
		'</ul>';

};
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/dwjLRO)

What if you wanted to change the `target` that the table of contents was rendered into? What if you wanted to use `h3` headings, instead of `h2`? What if you wanted to use an ordered list for the items, or change the heading above the table of contents?

In it's current form, you would need to go in and update the script. But what if you could instead pass in options to override the default behaviors?

User options allow developers to change things about how your script works without touching the source code. It makes your script more flexible, and allows developers to use it in different applications more easily.

This is, to me, what makes a script a *plugin* and not just a *helper function*.

## Adding options and settings

For this to work, we need to do three things:

1. Setup an object of `defaults` to use.
2. Accept user `options` as a function argument, and merge them into the defaults.
3. Use the merged settings in the script instead of hard-coded values.

### Setting up defaults

In the `tableOfContents()` function, let's create some `defaults`. We'll add a default for anything that can be customized by the user.

```js
var tableOfContents = function () {

	// Default settings
	var defaults = {
		selector: 'h2',
		target: '#toc',
		listType: 'ul',
		heading: 'Table of Contents',
		headingLevel: 'h2'
	};

	// Variables
	var headings = document.querySelectorAll('h2');
	var target = document.querySelector('#toc');

	// Make sure there's a target and headings
	if (!target || headings.length < 1) return;

	// Create the table of contents items
	var tocItems = Array.prototype.map.call(headings, function (heading) {
		return '<li>' + heading.textContent + '</li>';
	});

	// Add the table of contents to the DOM
	target.innerHTML =
		'<h2>Table of Contents</h2>' +
		'<ul>' +
			tocItems.join('');
		'</ul>';

};
```

### Accept user options and merge them into the defaults

Let's go ahead and add an `options` argument to our function.

```js
var tableOfContents = function (options) {
	// All the things...
};
```

Now, we can merge those into the `defaults`.

The `Object.assign()` method merges one or more objects into another object. Any objects beyond the first that you pass in will be merged into the first.

Rather than override `defaults`, let's create a new `settings` variable to hold the merged data. We'll pass in an empty object (`{}`) as the first argument, and merge the `defaults` and `options` into it.

```js
var tableOfContents = function (options) {

	// Default settings
	var defaults = {
		selector: 'h2',
		target: '#toc',
		listType: 'ul',
		heading: 'Table of Contents',
		headingLevel: 'h2'
	};

	// Merged settings
	var settings = Object.assign({}, defaults, options);

	// Variables
	var headings = document.querySelectorAll('h2');
	var target = document.querySelector('#toc');

	// Make sure there's a target and headings
	if (!target || headings.length < 1) return;

	// Create the table of contents items
	var tocItems = Array.prototype.map.call(headings, function (heading) {
		return '<li>' + heading.textContent + '</li>';
	});

	// Add the table of contents to the DOM
	target.innerHTML =
		'<h2>Table of Contents</h2>' +
		'<ul>' +
			tocItems.join('');
		'</ul>';

};
```

If no `options` have been provided, the `settings` variable will contain all of the defaults.

### User settings instead of hard-coded values

Now we can go through and use `settings` values instead of anything hard-coded in the script.

```js
var tableOfContents = function (options) {

	// Default settings
	var defaults = {
		selector: 'h2',
		target: '#toc',
		listType: 'ul',
		heading: 'Table of Contents',
		headingLevel: 'h2'
	};

	// Merged settings
	var settings = Object.assign({}, defaults, options);

	// Variables
	var headings = document.querySelectorAll(settings.selector);
	var target = document.querySelector(settings.target);

	// Make sure there's a target and headings
	if (!target || headings.length < 1) return;

	// Create the table of contents items
	var tocItems = Array.prototype.map.call(headings, function (heading) {
		return '<li>' + heading.textContent + '</li>';
	});

	// Add the table of contents to the DOM
	target.innerHTML =
		'<' + settings.headingLevel + '>' + settings.heading + '</' + settings.headingLevel + '>' +
		'<' + settings.listType + '>' +
			tocItems.join('');
		'</' + settings.listType + '>';

};
```

[And here's a demo you can play with.](https://codepen.io/cferdinandi/pen/VqBOqq)

<p data-height="265" data-theme-id="0" data-slug-hash="VqBOqq" data-default-tab="html,result" data-user="cferdinandi" data-pen-title="VqBOqq" class="codepen"></p>

## Browser Compatibility

The `Object.assign()` method works in all modern browsers, but has no IE support. You can [push support back to IE9 with a polyfill](https://vanillajstoolkit.com/polyfills/objectassign/).