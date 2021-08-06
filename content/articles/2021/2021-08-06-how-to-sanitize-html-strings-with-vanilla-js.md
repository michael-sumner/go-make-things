---
title: "How to sanitize HTML strings with vanilla JS to reduce your risk of XSS attacks"
date: 2021-08-06T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Over the last few days, we've looked at [how cross-site scripting attacks work](/how-to-reduce-your-risk-of-cross-site-scripting-attacks-with-vanilla-javascript/), and how [injecting plain text](/injecting-text-instead-of-html-with-vanilla-js-to-reduce-your-risk-of-xss-attacks/) or [encoded HTML strings](/how-to-encode-strings-with-vanilla-js-to-reduce-the-risk-of-xss-attacks/) can help keep you safer. We also looked at some of the downsides with both of those techniques.

Today, we're going to look at one last approach: sanitizing. Let's dig in!

## What is sanitizing?

_Sanitizing_ is the process of removing any attributes, properties, and values that are not included in an allowlist or that are explicitly forbidden on a disallow list.

For example, if the rendered HTML from our HTML string looked like this...

```html
<p><img src=x" onerror="alert('XSS Attack')"></p>
<p><a href="javascript:alert('Another XSS Attack')">View My Profile</a></p>
```

The _sanitized_ version might look like this.

```html
<p><img src=x"></p>
<p><a>View My Profile</a></p>
```

When added to the UI, some items might look broken, but the malicious content will not be rendered.

## How to sanitize HTML strings with vanilla JS

The `DOMParser()` method converts an HTML string into real HTML _without_ rendering it in the actual DOM. As a result, any malicious code is not executed (and won't be until those HTML elements are injected into the UI).

```js
let parser = new DOMParser();
let doc = parser.parseFromString(`<img src="x" onerror="alert('XSS attacks!')">`, 'text/html');

// doc.body is a real HTML element with the malicious image
// No alert is thrown, though, because the elements exist outside the DOM
console.log(doc.body);
```

Sanitizer libraries use the `DOMParser()` method to create HTML elements from your HTML string, then loop through each element and remove any attributes, properties, and values that are not included in an allowlist or are explicitly forbidden on a disallow list.

You can pass your entire HTML string into a sanitizer library, and it will return either a sanitized string that you can use with an HTML string property, or the sanitized elements that you can inject into the DOM with a method like `ParentNode.append()`.

[DOMPurify](https://github.com/cure53/DOMPurify) is an industry-leading library that uses an allowlist and is highly configurable.

I highly recommend it. But today, we're also going to look at how to build our own, less configurable version.

## Creating a sanitizing library

First, let's create a wrapper function for our library called `cleanHTML()`. We'll accept the string to sanitize as an argument.

We can return either a sanitized string OR the sanitized nodes themselves. Let's gives users the ability to decide which they want with a second argument, `nodes`. If `true`, we'll return the nodes instead of a string.

```js
/*!
 * Sanitize an HTML string
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String}          str   The HTML string to sanitize
 * @param  {Boolean}         nodes If true, returns HTML nodes instead of a string
 * @return {String|NodeList}       The sanitized string or nodes
 */
function cleanHTML (str, nodes) {
	// Do stuff here...
}
```

The first thing we want to do is convert our HTML `str` into actual HTML nodes.

Let's create a helper function, `stringToHTML()`, to do that for us. In it, we'll use the `new DOMParser()` constructor and `DOMParser.parseFromString()` method, and return the `doc.body`. If one doesn't exist for some reason, we'll return a new `body` element instead.

We'll run that immediately, and assign the returned value to the `html` variable.

```js
/*!
 * Sanitize an HTML string
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String}          str   The HTML string to sanitize
 * @param  {Boolean}         nodes If true, returns HTML nodes instead of a string
 * @return {String|NodeList}       The sanitized string or nodes
 */
function cleanHTML (str, nodes) {

	/**
	 * Convert the string to an HTML document
	 * @return {Node} An HTML document
	 */
	function stringToHTML () {
		let parser = new DOMParser();
		let doc = parser.parseFromString(str, 'text/html');
		return doc.body || document.createElement('body');
	}

	// Convert the string to HTML
	let html = stringToHTML();

}
```

Now, we're ready to sanitize it.

## Removing `script` elements

First, we want to remove all `script` elements from our HTML. Let's create a `removeScripts()` function that accepts the `html` node as an argument.

We'll use the `document.querySelectorAll()` method to find all `script` elements. Then, we'll use [a `for...of` loop](/the-for...of-loop-in-vanilla-js/) to loop through each one, and use [the `Element.remove()` method](/how-to-remove-an-element-from-the-dom-with-vanilla-js/) to remove it from the DOM.

```js
/**
 * Remove <script> elements
 * @param  {Node} html The HTML
 */
function removeScripts (html) {
	let scripts = html.querySelectorAll('script');
	for (let script of scripts) {
		script.remove();
	}
}
```

Then, we'll pass our converted `html` into it.

```js
// Convert the string to HTML
let html = stringToHTML();

// Sanitize it
removeScripts(html);
```

## Removing malicious attributes

Now, we're ready to remove malicious attributes from our `html`.

Let's create a `clean()` function that accepts the `html` element as a parameter. In it, we'll use [the `Node.children` property](/whats-the-difference-between-the-parentnode.children-and-node.childnodes-properties-in-vanilla-js/) to get all of the child elements in an element.

We can use a `for...of` loop to loop through each one. We'll pass it into a `removeAttributes()` function to remove any malicious attributes.

If the `node` has child elements itself, we want to sanitize those, too. We'll [recursively pass the `node` back into](/recursion-with-vanilla-javascript/) the `clean()` function.

```js
/**
 * Remove dangerous stuff from the HTML document's nodes
 * @param  {Node} html The HTML document
 */
function clean (html) {
	let nodes = html.children;
	for (let node of nodes) {
		removeAttributes(node);
		clean(node);
	}
}
```

In the `removeAttributes()` function, we'll get all of the attributes on an element with the `Element.attributes` property.

We'll loop through each one with a `for...of` loop, using [object destructuring](/destructing-in-vanilla-js/) to get the `name` and `value` of the attribute.

In the loop, we'll check if the attribute `isPossiblyDangerous()` using a helper function. If it's not, we'll use the `continue` operator to skip to the next item. Otherwise, we'll use the `Element.removeAttribute()` method to remove it.

```js
/**
 * Remove potentially dangerous attributes from an element
 * @param  {Node} elem The element
 */
function removeAttributes (elem) {

	// Loop through each attribute
	// If it's dangerous, remove it
	let atts = elem.attributes;
	for (let {name, value} of atts) {
		if (!isPossiblyDangerous(name, value)) continue;
		elem.removeAttribute(name);
	}

}
```

To check if our attribute is dangerous, we'll first look to see if it starts with `on`, since `on*` events run scripts.

We can do that with [the `String.startsWith()` method](/how-to-check-if-a-string-starts-with-another-string-using-vanilla-js/). We'll return `true` if it does.

```js
/**
 * Check if the attribute is potentially dangerous
 * @param  {String}  name  The attribute name
 * @param  {String}  value The attribute value
 * @return {Boolean}       If true, the attribute is potentially dangerous
 */
function isPossiblyDangerous (name, value) {
	if (name.startsWith('on')) return true;
}
```

Next, we want to look for `javascript:` and `data:text/html` when the attribute is a `src`, `href`, or `xlink:href` (a deprecated attribute on SVGs).

We'll first put those property names in an array, and use the `Array.includes()` method to see if the `name` is one of them. If it does, we can use the `String.includes()` method to check for `javascript:` and `data:text/html` in the `value`.

```js
/**
 * Check if the attribute is potentially dangerous
 * @param  {String}  name  The attribute name
 * @param  {String}  value The attribute value
 * @return {Boolean}       If true, the attribute is potentially dangerous
 */
function isPossiblyDangerous (name, value) {
	if (['src', 'href', 'xlink:href'].includes(name)) {
		if (value.includes('javascript:') || value.includes('data:text/html')) return true;
	}
	if (name.startsWith('on')) return true;
}
```

But hackers use all sorts of capitalization and whitespace tricks to avoid stuff like that, so we need to normalize our string.

We can use the `String.replace()` method to remove all whitespace from our string, and the `String.toLowerCase()` method to convert it to lowercase. We'll assign the normalized string to the `val` variable, and use that instead.

```js
/**
 * Check if the attribute is potentially dangerous
 * @param  {String}  name  The attribute name
 * @param  {String}  value The attribute value
 * @return {Boolean}       If true, the attribute is potentially dangerous
 */
function isPossiblyDangerous (name, value) {
	let val = value.replace(/\s+/g, '').toLowerCase();
	if (['src', 'href', 'xlink:href'].includes(name)) {
		if (val.includes('javascript:') || val.includes('data:text/html')) return true;
	}
	if (name.startsWith('on')) return true;
}
```

Now, we have a completed sanitizer.

## Using it

Let's say we have a third-party string like this.

```js
// Malicious third-party code
let thirdPartyString = `<img src=x onerror="alert('XSS Attack')">`;
let thirdPartyURL = `javascript:alert('Another XSS Attack')`;

let htmlStr =
	`<p>${thirdPartyString}</p>
	<p><a href="${thirdPartyURL}">View My Profile</a></p>`;
```

We can inject it into the DOM like this.

```js
let app = document.querySelector('#app');
app.innerHTML = cleanHTML(htmlStr);
```

Alternatively, we can use [the spread operator](/the-spread-syntax-operator-in-vanilla-js/) and the `Node.append()` method with nodes instead.

```js
app.append(...cleanHTML(htmlStr, true));
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/MWmXNeN) You can also [download the finished script on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers).

If you want something more robust, [DOMPurify](https://github.com/cure53/DOMPurify) is an industry-leading library that uses an allowlist and is highly configurable.