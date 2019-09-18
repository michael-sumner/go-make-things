---
title: "How saferInnerHTML() works"
date: 2018-08-27T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

On Friday, [I wrote about `saferInnerHTML()`](/a-safer-alternative-to-innerhtml-with-vanilla-js/), a new helper function I wrote to more safely inject markup templates into the DOM ([on GitHub here](https://github.com/cferdinandi/saferInnerHTML)).

Today, I wanted to break down how to the script actually works.

## How it works

Before digging into the code, I think it's helpful to understand how `saferInnerHTML()` actually works.

You pass in an element to inject content into, and your HTML as a string.

```js
var app = document.querySelector('#app');
saferInnerHTML(app, '<h1>Hello, world!</h1>');
```

If you want to append your markup to what's already there instead of completely replacing it, pass in `true` as a third argument.

```js
saferInnerHTML(app, '<h1>Hello, world!</h1>', true);
```

Behind-the-scenes, `saferInnerHTML()` does the following:

1. Converts your string to actual HTML without rendering it.
2. Crawls the HTML and creates an array-based map of every element, its content, and its properties and attributes (element type, classes, data attributes, etc.).
3. Loops through each element in the map and creates a new element, adding the attributes and properties. This is where the sanitization happens.
4. Appends the new elements into the DOM.

Lets look at each of these steps.

## 1. Convert a string into HTML

The easiest way to do this is by creating a temporary element and injecting the string as `innerHTML`.

```js
var temp = document.createElement('div');
temp.innerHTML = template;
```

**This still exposes you to XSS attacks.**

Even if you don't inject the content into the DOM, `onerror` properties will still run and can trigger cross-site scripting attacks. I had to find another way.

After some Googling, I discovered the `DOMParser()` method.

It creates an HTML document from whatever string you provide. We can pass our template into it and return the document `body` with real HTML elements.

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

It works back to IE9, but the `text/html` format that we need starts at IE10 and up. Any polyfill I've found for it uses `innerHTML`, which we don't want, so this is a hard limit on browser support.

## 2. Map our HTML

To map our HTML into an array, I use `element.childNodes` to get each child node for our element (this is all the stuff inside our template).

I pass it into `Array.from()` to create an array, then use the `Array.forEach()` method to loop through each item.

In the loop, I set up keys for the element's content, attributes, and node type. I recursively pass the element back into `createDOMMap()` to get any child elements of the element.

```js
/**
 * Create a DOM Tree Map for an element
 * @param  {Node}   element The element to map
 * @return {Array}          A DOM tree map
 */
var createDOMMap = function (element) {
	var map = [];
	Array.from(element.childNodes).forEach(function (node) {
		map.push({
			content: node.childNodes && node.childNodes.length > 0 ? null : node.textContent,
			atts: node.nodeType === 3 ? [] : getAttributes(node.attributes),
			type: node.nodeType === 3 ? 'text' : node.tagName.toLowerCase(),
			children: createDOMMap(node)
		});
	});
	return map;
};
```

I'm using a helper function, `getAttributes()`, to get the element's attributes.

It takes the `element.attributes` property as it's argument, converts it to an array, and uses the `Array.map()` method to strip out everything but the `name` and `value` of each attribute.

```js
/**
 * Create an array of the attributes on an element
 * @param  {NamedNodeMap} attributes The attributes on an element
 * @return {Array}                   The attributes on an element as an array of key/value pairs
 */
var getAttributes = function (attributes) {
	return Array.from(attributes).map(function (attribute) {
		return {
			att: attribute.name,
			value: attribute.value
		};
	});
};
```

## 3/4. Create new elements and inject them into the DOM

When the script runs, it passing the template into the `stringToHTML()` helper, then passes that into `createDOMMap()`.

The result map is passed into a `renderToDOM()` helper function.

```js
renderToDOM(createDOMMap(stringToHTML(template)));
```

If the content *isn't* getting appended, the `renderToDOM()` helper wipes any existing content out using `innerHTML = ''`.

Then it loops through the map of elements, passing each element into a `makeElem()` helper function, and appends the resulting element into the target element.

```js
/**
 * Render the template items to the DOM
 * @param  {Array} map A map of the items to inject into the DOM
 */
var renderToDOM = function (map) {
	if (!append) { app.innerHTML = ''; }
	map.forEach(function (node, index) {
		app.appendChild(makeElem(node));
	});
};
```

### Making elements

The `makeElem()` helper function creates the actual content.

If the element `type` is `text`, it uses `createTextNode()`. Otherwise, it uses `createElement()`.

It adds any attributes with an `addAttributes()` helper. Then, if the element has children, it recursively passes them into `makeElem()` and appends the results to the new node. Otherwise, it adds any text content using the `textContent` property.

Finally, it returns the newly created node.

```js
/**
 * Make an HTML element
 * @param  {Object} elem The element details
 * @return {Node}        The HTML element
 */
var makeElem = function (elem) {

	// Create the element
	var node = elem.type === 'text' ? document.createTextNode(elem.content) : document.createElement(elem.type);

	// Add attributes
	addAttributes(node, elem.atts);

	// If the element has child nodes, create them
	// Otherwise, add textContent
	if (elem.children.length > 0) {
		elem.children.forEach(function (childElem) {
			node.appendChild(makeElem(childElem));
		});
	} else if (elem.type !== 'text') {
		node.textContent = elem.content;
	}

	return node;

};
```

### Adding attributes

The `addAttributes()` helper is where some of the most important sanitization happens. It strips out things like `onerror` properties to prevent XSS attacks.

It loops through each property. If the property is a class, it uses `className` to set it. If it's a data attribute, it uses `setAttribute()`.

Otherwise, it sets it as a property on the element itself (`elem[propertyName] = value`).

```js
/**
 * Add attributes to an element
 * @param {Node}  elem The element
 * @param {Array} atts The attributes to add
 */
var addAttributes = function (elem, atts) {
	atts.forEach(function (attribute) {
		// If the attribute is a class, use className
		// Else if it starts with `data-`, use setAttribute()
		// Otherwise, set is as a property of the element
		if (attribute.att === 'class') {
			elem.className = attribute.value;
		} else if (attribute.att.slice(0, 5) === 'data-') {
			elem.setAttribute(attribute.att, attribute.value || '');
		} else {
			elem[attribute.att] = attribute.value || '';
		}
	});
};
```

## Checking for browser support

To check browser support, first I make sure `Array.from` and `window.DOMParser` exist. If not, I return `false`.

Checking browser support for this is a touch less straightforward than normal, though.

While `DOMParser()` works in IE9 and up, the features we need start with IE10. So, we can't *just* check if `window.DOMParser` exists. We need to actually try to use it with `text/html` and see if it throws an error.

To do that, I use `try...catch`. If there's an error, I return `false`. Otherwise, I return `true`.

```js
var supports = function () {
	if (!Array.from || !window.DOMParser) return false;
	parser = parser || new DOMParser();
	try {
		parser.parseFromString('x', 'text/html');
	} catch(err) {
		return false;
	}
	return true;
};
```

Before I run the script, is make sure `supports()` returns `true`, and if not, throw an error.

```js
// Check for browser support
if (!supports()) throw new Error('safeInnerHTML: Your browser is not supported.');
```

I also make sure an element to inject into was provided, and if not, throw an error for that.

```js
// Don't run if there's no element to inject into
if (!app) throw new Error('safeInnerHTML: Please provide a valid element to inject content into');
```