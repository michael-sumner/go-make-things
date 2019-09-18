---
title: "Converting a string into markup with vanilla JS"
date: 2019-08-13T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, I wrote about [Reef, my lightweight alternative to Vue and React](/a-simple-alternative-to-react-and-vue-that-weighs-just-2.5kb/). Over the next few days, I want to take a look at how various parts of it work under-the-hood.

Today, we're going to look at how to take an HTML string and convert it into actual markup.

## Why you'd need this

If you wanted to inject a string into the DOM, you can do that pretty simply with `innerHTML`.

```js
app.innerHTML = '<h1>Hello, world!</h1>';
```

But Reef doesn't just push markup into an element. It compares the existing markup in an element with how it should look, and only updates the things that need to change.

For example, if the existing content inside `app` was this:

```html
<h1>Hi, universe!</h1>
```

Reef would update just the text inside the `h1` instead of creating an entirely new element.

In order for that to work, we need to convert HTML strings into actual HTML elements that can be traversed, mapped, and analyzed.

## Creating a helper method

First, let's create a helper function that will accept a string and return HTML.

```js
/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
var stringToHTML = function (str) {
	// Code goes here...
};
```

## The simple approach

The simplest way to do this is to create an element, insert the string into with `innerHTML`, then return the element.

```js
/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
var stringToHTML = function (str) {
	var dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;
};
```

This approach isn't perfect, though.

Even though this element is *detached*&mdash;that is, not actually in the existing DOM&mdash;the browser will still do things like download image files.

This would trigger an image file to download, even though the markup isn't displayed anywhere yet.

```js
stringToHTML('<img src="my-awesome-photo.jpg">');
```

## A better way

After doing a bunch of research, I discovered a native browser method that avoids this problem: `DOMParser()`. The `DOMParser()` object creates a new DOM document from a string.

To use it, you instantiate a new instance. Then you use the `parseFromString()` method to convert your string into a new `document` element. The method accepts the string as it's first argument. Set the second argument to `text/html`.

Because it's literally a new `document` element, we'll return the `body`.

```js
/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};
```

Now we can do this, and no download will be triggered.

```js
stringToHTML('<img src="my-awesome-photo.jpg">');
```

## Combining the two approach

The `DOMParser()` method is awesome, but the `parseFromString()` method stops at IE10.

I like to combine the two approaches, using `DOMParser()` when it's supported, and falling back to creating an element and using `innerHTML` when it's not.

To test for support, we'll assign [an IIFE](/the-anatomy-of-an-immediately-invoked-function-expression/) to the variable `support`.

Inside the IIFE, we'll first check if `DOMParser` exists in the `window`. If not, we'll return `false`. Next, we'll try to use `parseFromString()` to create a `document`. If it fails, we'll return `false`. Otherwise, we'll return `true`.

```js
var support = (function () {
	if (!window.DOMParser) return false;
	var parser = new DOMParser();
	try {
		parser.parseFromString('x', 'text/html');
	} catch(err) {
		return false;
	}
	return true;
})();
```

Inside our `stringToHTML()` method, we'll conditionally use `DOMParser()` when it's supported, and `innerHTML` when it's not.

```js
/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
var stringToHTML = function (str) {

	// If DOMParser is supported, use it
	if (support) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(str, 'text/html');
		return doc.body;
	}

	// Otherwise, fallback to old-school method
	var dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;

};
```

[Here's a demo on CodePen for you to play around with.](https://codepen.io/cferdinandi/pen/MWgavzX)

Tomorrow, we'll look at how to create a map of DOM nodes that we can use for DOM diffing.