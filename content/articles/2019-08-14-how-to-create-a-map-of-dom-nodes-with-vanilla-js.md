---
title: "How to create a map of DOM nodes with vanilla JS"
date: 2019-08-14T11:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

This week, we're looking a the code under-the-hood of [Reef, my 2.5kb alternative to Vue and React](/a-simple-alternative-to-react-and-vue-that-weighs-just-2.5kb/).

One of the big things UI libraries do is selectively update only the things that have changed in a UI instead of just replacing everything. To do that, we need to:

1. Convert HTML template strings into actual HTML.
2. Create a map of the HTML elements and their properties in the desired UI and the current one.
3. Compare the two and figure out what's different.

Yesterday, we learned [how to transform an HTML string into actual DOM elements](/converting-a-string-into-markup-with-vanilla-js/).

Today, we're going to look at how to create a map of DOM nodes and their properties.

## Getting started

Let's imagine you have an existing UI with the following HTML:

```html
<div id="app">

	<h1 class="title">Hello, world!</h1>

	<p id="subtitle" data-attribute="be friendly">
		<strong style="color: rebeccapurple;">How are you today?</strong>
	</p>

	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewbox="0 0 800 800" aria-described="title-thumbsup">
		<title id="title-thumbsup">Thumbs Up!</title>
		<path d="M725 450c57.031 0 25 150-25 150 25 0 0 125-50 125 0 50-50 75-100 75-211.212 0-136.925-52.852-350-75V325C388.22 268.541 575 127.012 575 0c41.406 0 150 50 0 300h150c75 0 50 150 0 150zM150 325v400h50v25H100c-27.5 0-50-33.75-50-75V375c0-41.25 22.5-75 50-75h100v25h-50z"/>
	</svg>

	I'm doing pretty good, thanks!

</div>
```

We want to map all of the elements and their properties. To get started, let's create a helper function.

```js
/**
 * Create a DOM Tree Map for an element
 * @param  {Node}   element The element to map
 * @return {Array}          A DOM tree map
 */
var createDOMMap = function (element) {
	// Code will go here...
};
```

## Getting an elements child nodes

Now we're ready to map our DOM.

Let's use `querySelector()` get our parent element, `#app`. Then, we can pass it into `createDOMMap()`.

```js
// Get the #app element
var app = document.querySelector('#app');

// Create a map of it's elements
var map = createDOMMap(app);
```

To create our map, we want to loop through each child element inside our `element` and store some details about it and its properties.

The `childNodes` property will return a NodeList of elements inside an element, including loose text strings like `I'm doing pretty good, thanks!`.

```js
/**
 * Create a DOM Tree Map for an element
 * @param  {Node}   element The element to map
 * @return {Array}          A DOM tree map
 */
var createDOMMap = function (element) {
	return element.childNodes;
};
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/xxKZNGM)

We want to loop through our nodes, get some data about them, and return back an array.

[The `Array.map()` method](/what-array.map-does-in-vanilla-js/) is probably a good choice here. It takes an array, loops through each item and lets you modify it, and then returns a new array.

But... it only works with arrays, and we have a NodeList. Fortunately, [we can use the Array.map() method on our NodeList](/using-array-methods-with-nodelists-in-vanilla-js/) using `Array.prototype.map()` and `call()`.

```js
/**
 * Create a DOM Tree Map for an element
 * @param  {Node}   element The element to map
 * @return {Array}          A DOM tree map
 */
var createDOMMap = function (element) {
	return Array.prototype.map.call(element.childNodes, (function (node) {
		return node;
	}));
};
```

[Heres's an updated demo.](https://codepen.io/cferdinandi/pen/KKPVLmo) Right now, it looks pretty much the same as before, except the returned result is an array.

## Mapping the node details

Now we're ready to get some details about our nodes.

Let's create a `details` object. We want to stare info about the node's `content`, attributes (`atts`), and node `type`. Let's also store the `node` itself.

```js
/**
 * Create a DOM Tree Map for an element
 * @param  {Node}   element The element to map
 * @return {Array}          A DOM tree map
 */
var createDOMMap = function (element) {
	return Array.prototype.map.call(element.childNodes, (function (node) {
		var details = {
			content: '',
			atts: '',
			type: '',
			node: node
		};
		return details;
	}));
};
```

For `content`, we'll use [a ternary operator](/ternary-operators/) to check if the `node` has `childNodes`. If it does, we'll set `content` to `null`. Otherwise, we'll grab its `textContent`.

```js
/**
 * Create a DOM Tree Map for an element
 * @param  {Node}   element The element to map
 * @return {Array}          A DOM tree map
 */
var createDOMMap = function (element) {
	return Array.prototype.map.call(element.childNodes, (function (node) {
		var details = {
			content: node.childNodes && node.childNodes.length > 0 ? null : node.textContent,
			atts: '',
			type: '',
			node: node
		};
		return details;
	}));
};
```

The `childNodes` property returns all node types, not just elements. That includes text fragments that aren't inside an element (for example, a bit of text without a paragraph or `div` around it) and HTML comments (`<!-- a comment -->`).

We can use the `nodeType` property to find out what type the `node` is. A value of `1` means it's an element. If our `nodeType` is not `1`, we'll use an empty array (`[]`) for the `atts` property. If not, we'll get the attributes using the `attributes` property.

The `attributes` property returns a `NamedNodeMap`&mdash;an *array-like* object with a lot of details for each attribute. It's way more than we need. Let's create a `getAttributes()` helper method to give us just the info we need.

```js
/**
 * Create a DOM Tree Map for an element
 * @param  {Node}   element The element to map
 * @return {Array}          A DOM tree map
 */
var createDOMMap = function (element) {
	return Array.prototype.map.call(element.childNodes, (function (node) {
		var details = {
			content: node.childNodes && node.childNodes.length > 0 ? null : node.textContent,
			atts: node.nodeType !== 1 ? [] : getAttributes(node.attributes),
			type: '',
			node: node
		};
		return details;
	}));
};
```

In our `getAttributes()` helper method, we'll use `Array.prototype.map.call()` to create an array of properties for our attribute.

Each item in the array will be an object with just two properties: `att`, the name of the attribute, and its `value`.

```js
/**
 * Create an array of the attributes on an element
 * @param  {NamedNodeMap} attributes The attributes on an element
 * @return {Array}                   The attributes on an element as an array of key/value pairs
 */
var getAttributes = function (attributes) {
	return Array.prototype.map.call(attributes, function (attribute) {
		return {
			att: attribute.name,
			value: attribute.value
		};
	});
};
```

Finally, let's get the `type` for the `node`.

The `nodeType` integer value can tell you if the `node` is an element, text, comment, and so on. But for elements, we need to know the actual element type: `div`, `p`, and so on.

If `nodeType` is `3`, we'll set `type` to `text`. If it's `8`, we'll set it to `comment`. Otherwise, we'll use the `tagName` property to get the actual element type, and `toLowerCase()` to make it all lowercase.

```js
/**
 * Create a DOM Tree Map for an element
 * @param  {Node}   element The element to map
 * @return {Array}          A DOM tree map
 */
var createDOMMap = function (element) {
	return Array.prototype.map.call(element.childNodes, (function (node) {
		var details = {
			content: node.childNodes && node.childNodes.length > 0 ? null : node.textContent,
			atts: node.nodeType !== 1 ? [] : getAttributes(node.attributes),
			type: node.nodeType === 3 ? 'text' : (node.nodeType === 8 ? 'comment' : node.tagName.toLowerCase()),
			node: node
		};
		return details;
	}));
};
```

[You can see this action on this CodePen.](https://codepen.io/cferdinandi/pen/PoYNozR)

## Recursion and child nodes

HTML structures are rarely flat. What do we do when one of our `node` elements has nodes inside it?

We can use *recursion* to handle this.

We'll pass the `node` itself back into the `createDOMMap()` method, and set it's return to a new `details.children` property. If any of those `childNodes` have their own `childNodes`, *they'll* get passed in as well. This creates a nested tree mapping all of the DOM nodes.

```js
/**
 * Create a DOM Tree Map for an element
 * @param  {Node}   element The element to map
 * @return {Array}          A DOM tree map
 */
var createDOMMap = function (element) {
	return Array.prototype.map.call(element.childNodes, (function (node) {
		var details = {
			content: node.childNodes && node.childNodes.length > 0 ? null : node.textContent,
			atts: node.nodeType !== 1 ? [] : getAttributes(node.attributes),
			type: node.nodeType === 3 ? 'text' : (node.nodeType === 8 ? 'comment' : node.tagName.toLowerCase()),
			node: node
		};
		details.children = createDOMMap(node, details.isSVG);
		return details;
	}));
};
```

[Here's a demo with recursion.](https://codepen.io/cferdinandi/pen/ZEzWEKE)

## Special case for SVGs

When we cover diffing in a future article, we'll look at how to add attributes back to elements.

One quirk of SVGs is that they use a different method to attributes to them than a normal element. Because of this, we need to know if our `node` (or it's parent) is an SVG or not.

Let's create a new `isSVG` property for the `details` object. We'll check the `details.type` to see if our element is an SVG. If so, `isSVG` will be `true`.

```js
/**
 * Create a DOM Tree Map for an element
 * @param  {Node}   element The element to map
 * @return {Array}          A DOM tree map
 */
var createDOMMap = function (element) {
	return Array.prototype.map.call(element.childNodes, (function (node) {
		var details = {
			content: node.childNodes && node.childNodes.length > 0 ? null : node.textContent,
			atts: node.nodeType !== 1 ? [] : getAttributes(node.attributes),
			type: node.nodeType === 3 ? 'text' : (node.nodeType === 8 ? 'comment' : node.tagName.toLowerCase()),
			node: node
		};
		details.isSVG = details.type === 'svg';
		details.children = createDOMMap(node, details.isSVG);
		return details;
	}));
};
```

But what about the child elements inside an SVG?

Let's add a second argument to `createDOMMap()`: `isSVG`. If that's `true`, we'll set `details.isSVG` to true as well, passing it along to it's child elements.

```js
/**
 * Create a DOM Tree Map for an element
 * @param  {Node}    element The element to map
 * @param  {Boolean} isSVG   If true, node is within an SVG
 * @return {Array}           A DOM tree map
 */
var createDOMMap = function (element, isSVG) {
	return Array.prototype.map.call(element.childNodes, (function (node) {
		var details = {
			content: node.childNodes && node.childNodes.length > 0 ? null : node.textContent,
			atts: node.nodeType !== 1 ? [] : getAttributes(node.attributes),
			type: node.nodeType === 3 ? 'text' : (node.nodeType === 8 ? 'comment' : node.tagName.toLowerCase()),
			node: node
		};
		details.isSVG = isSVG || details.type === 'svg';
		details.children = createDOMMap(node, details.isSVG);
		return details;
	}));
};
```

[And here's a final demo with the `isSVG` property.](https://codepen.io/cferdinandi/pen/dybMyWR)

## Wrapping up

With that, we can now create maps of DOM. You can combine `createDOMMap()` with the `strongToHTML()` method from yesterday to map a string of HTML elements into a tree of nodes.

Tomorrow, we'll look at how to combine all of these to diff the existing UI against the desired one and make updates.