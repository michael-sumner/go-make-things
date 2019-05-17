---
title: "Loops, DOM injection, and performance with vanilla JS"
date: 2019-05-17T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

Yesterday, I wrote about [two techniques for creating HTML from an array](/two-different-ways-to-create-html-from-an-array-of-data-with-vanilla-js/).

Today, I want to talk about a performance issue I sometimes see when creating markup from array data.

## Building HTML with `Array.forEach()`

In yesterday's article, I shared this approach using the `Array.forEach()` method.

```js
var wizards = ['Hermione', 'Neville', 'Gandalf', 'Radagast'];

// Setup the HTML string
var html = '';

// Loop through each wizard and create a list item
wizards.forEach(function (wizard) {
	// += adds an item to the existing value
	// It's the same as writing this:
	// html = html + '<li>' + wizard + '</li>';
	html += '<li>' + wizard + '</li>';
});

// Wrap items in an unordered list
html = '<ul>' + html + '</ul>';
```

## A common but less performant approach

I sometimes see a modified version of this technique.

In the modified technique, the element the content is going to get injected into in the DOM is cached to a variable. Then, the markup is injected directly into using string concatenation and `innerHTML` on each loop.

```js
var wizards = ['Hermione', 'Neville', 'Gandalf', 'Radagast'];

// Setup the HTML string
var list = document.querySelector('#wizards');

// Loop through each wizard and create a list item
wizards.forEach(function (wizard) {
	// inject each list item into the ul
	list += '<li>' + wizard + '</li>';
});
```

**Do NOT do this. It's bad for performance.**

## Why this technique is bad

The problem with this approach is that instead of updating the DOM once, after the loop is done and the markup is built, it updates the DOM repeatedly in rapid succession&mdash;once for each item in your array.

This causes a ton of repaints that, with larger data sets, can cause a janky, laggy experience for your users.

Instead, build your complete markup first, either with the technique above or [using the `Array.map()` technique](/two-different-ways-to-create-html-from-an-array-of-data-with-vanilla-js/#using-array-map-and-array-join) described yesterday, *then* inject into the DOM.