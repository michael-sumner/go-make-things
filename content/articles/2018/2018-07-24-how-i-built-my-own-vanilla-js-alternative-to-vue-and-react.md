---
title: "How I built my own vanilla JS alternative to Vue and React"
date: 2018-07-24T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Yesterday, I wrote about [Reef.js, my new vanilla JS alternative to Vue and React](https://github.com/cferdinandi/reef), and [why I decided to write my own little helper method](/why-i-wrote-my-own-vanilla-js-alternative-to-vue-and-react/).

Today, I want to show you *how* I actually built it, and what makes it all work under the hood.

Let's dig in!

## A quick refresher

If you forgot/aren't familiar with Reef's syntax, here's [an example of a simple clock app](http://jsfiddle.net/cferdinandi/7o5zydvL/5/).

The `Reef()` method accepts two arguments. The first is the element to render your template into, either as a selector string or the actual node itself. The second is an object with your template, and optionally, your data/or state.

The template can be a simple string, or a function that returns a string. If a function is used, your data or state is passed in as an argument. For a more JSX/React-like experience, you can use template literals.

```html
<div id="app"></div>
```

```js
// Setup the component
var app = new Reef('#app', {
	data: {
		time: new Date().toLocaleTimeString()
	},
	template: function (props) {
		return '<strong>The time is:</strong> ' + props.time;
	}
});

// Render the component
app.render();

// Update the clock once a second
window.setInterval(function () {
	app.data.time = new Date().toLocaleTimeString();
	app.render();
}, 1000);
```

[Dig into the full documentation on GitHub.](https://github.com/cferdinandi/reef)

## The foundation

*__Note:__ Reef is an improved version of the [state-based component helper function](/a-stateful-component-helper-function-for-vanilla-js/) I wrote about a couple of weeks ago. If you read that article, a lot of this will seem familiar.*

First, I setup a [UMD wrapper](https://vanillajstoolkit.com/boilerplates/#UMD). Never heard of UMD?

> If you want your plugin to work with RequireJS, Node, or Browserify, you should use a Universal Module Definition (UMD) pattern. This wrapper for your plugin provides support for AMD and CommonJS modules, as well as global variables (like you would use with a revealing module pattern).

Here's what that looks like.

```js
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.Reef = factory(root);
	}
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

	'use strict';

	// My code will go here...

});
```

Next, I created a component object that holds all of the properties (the element, the state/data, and the template) for a component.

First, I make sure `DOMParser` is supported. We'll talk about this more later, but its what allows us to securely turn strings into DOM elements. Then, I make sure that an `elem` argument and an `options.template` property were provided. Without either of them, Reef is useless.

Assuming all is good, I set the `elem`, `template`, and `data` (if provided) as properties of the `Component`. Then, I return it.

```js
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.Reef = factory(root);
	}
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

	'use strict';

	/**
	 * Create the Component object
	 * @param {String|Node} elem    The element to make into a component
	 * @param {Object}      options The component options
	 */
	var Component = function (elem, options) {

		// Check browser support
		if (!('DOMParser' in window)) throw 'Reef.js is not supported by this browser.';

		// Make sure an element is provided
		if (!elem) throw 'Reef.js: You did not provide an element to make into a component.';

		// Make sure a template is provided
		if (!options || !options.template) throw 'Reef.js: You did not provide a template for this component.';

		// Set the component properties
		this.elem = elem;
		this.data = options.data;
		this.template = options.template;

	};

	return Component;

});
```

We've now got enough code in place that we can use the `new Reef()` method. It won't do anything, but it won't throw errors, either.

```js
var myApp = new Reef('#my-app', {
	data: [],
	template: ''
});
```

## Rendering the DOM

Now that we've got our stateful component set up, we can use the `template`, and optionally the `data`, to create HTML and inject it into the DOM.

In [my original series on stateful components](a-stateful-component-helper-function-for-vanilla-js/), I used `innerHTML` to do this. It's simple and it works, but [it leaves you exposed to cross-site scripting attacks](/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/).

To work around this, I included a [helper method to sanitize third-party data](https://vanillajstoolkit.com/helpers/sanitizehtml/). It works, but it requires developer discipline to work properly. You need to remember to use it and do so proactively.

One nice thing about Vue and React is that they handle this for you, and I wanted Reef to do that, too. This roughly doubled the size of the function, from 0.7kb to 1.5kb. Not a bad tradeoff for better out-of-the-box security!

Let's look at how that works.

### The `.render()` method

I added a `.render()` method to the `Component.prototype`.

First up: some checks and tests to make sure we have everything we need. The method does is double-check that `DOMParser` is supported and that a `template` exists.

Then, if the `elem` property is a string, it uses `querySelector()` to find it. Otherwise, it uses the provided DOM node. If the element doesn't exist, it throws an error.

Finally, if the `template` property is a function, it runs it to get the template. Otherwise, it uses it outright. If the template is not a string or number, Reef throws an error.

```js
/**
 * Render a template into the DOM
 * @return {Node}                   The element
 */
Component.prototype.render = function () {

	// Check browser support
	if (!('DOMParser' in window)) throw 'Reef.js is not supported by this browser.';

	// Make sure there's a template
	if (!this.template) throw 'Reef.js: No template was provided.';

	// If elem is an element, use it.
	// If it's a selector, get it.
	var elem = typeof this.elem === 'string' ? document.querySelector(this.elem) : this.elem;
	if (!elem) throw 'Reef.js: The DOM element to render your template into was not found.';

	// Get the template
	var template = (typeof this.template === 'function' ? this.template(this.data) : this.template);
	if (['string', 'number'].indexOf(typeof template) === -1) return;

};
```

### Injecting the template into the DOM

This is where we deviate from some of my older tutorials.

I pass my template string into a `stringToHTML()` method that converts it into actual DOM elements that can be parsed. Then, I pass that result into another helper method called `createDOMMap()`. This creates a nested array of the elements in the DOM tree for the template.

```js
/**
 * Render a template into the DOM
 * @return {Node}                   The element
 */
Component.prototype.render = function () {

	// Check browser support
	if (!('DOMParser' in window)) throw 'Reef.js is not supported by this browser.';

	// Make sure there's a template
	if (!this.template) throw 'Reef.js: No template was provided.';

	// If elem is an element, use it.
	// If it's a selector, get it.
	var elem = typeof this.elem === 'string' ? document.querySelector(this.elem) : this.elem;
	if (!elem) throw 'Reef.js: The DOM element to render your template into was not found.';

	// Get the template
	var template = (typeof this.template === 'function' ? this.template(this.data) : this.template);
	if (['string', 'number'].indexOf(typeof template) === -1) return;

	// Create DOM maps of the template and target element
	// var templateMap = sanitize(template);
	var templateMap = createDOMMap(stringToHTML(template));

};
```

It looks something like this:

```js
[
	{
		content: 'Hello world',
		atts: [
			{
				att: 'class',
				value: 'hero-text'
			},
			{
				att: 'data-name',
				value: 'world'
			}
		],
		type: 'h1',
		children: [],
		node: h1 // this is the actual Node itself
	},
	{
		content: null,
		atts: [],
		type: 'div',
		children: [
			// An array like this one, with all of the elements inside the div
			{
				content: 'In this chapter...',
				atts: [],
				type: 'h2',
				children: [],
				node: h2 // this is the actual Node itself
			},
			// ...
		],
		node: div
	}
]
```

I do the same thing with the element we're going to render the template into.

Then, I run them both through a `diff()` helper function that compares each node in the two DOM tree maps, looks for differences, and only updates the things that have changed.

We'll look at how that all works in just a few moments.

```js
/**
 * Render a template into the DOM
 * @return {Node}                   The element
 */
Component.prototype.render = function () {

	// Check browser support
	if (!('DOMParser' in window)) throw 'Reef.js is not supported by this browser.';

	// Make sure there's a template
	if (!this.template) throw 'Reef.js: No template was provided.';

	// If elem is an element, use it.
	// If it's a selector, get it.
	var elem = typeof this.elem === 'string' ? document.querySelector(this.elem) : this.elem;
	if (!elem) throw 'Reef.js: The DOM element to render your template into was not found.';

	// Get the template
	var template = (typeof this.template === 'function' ? this.template(this.data) : this.template);
	if (['string', 'number'].indexOf(typeof template) === -1) return;

	// Create DOM maps of the template and target element
	// var templateMap = sanitize(template);
	var templateMap = createDOMMap(stringToHTML(template));
	var domMap = createDOMMap(elem);

	// Diff and update the DOM
	diff(templateMap, domMap, elem);

};
```

Finally, I emit a custom event, `render`, on the element that our template was injected into. You can listen for these events with `addEventListener()`.

```js
document.addEventListener('render', function (event) {
	if (event.target.id === 'my-app') {
		console.log('My app was rendered!');
	}
}, false);
```

Then, I return the element itself. This isn't likely to be used often, but I wanted to bake as much flexibility in for use cases I haven't thought of as I could.

```js
/**
 * Render a template into the DOM
 * @return {Node}                   The element
 */
Component.prototype.render = function () {

	// Check browser support
	if (!('DOMParser' in window)) throw 'Reef.js is not supported by this browser.';

	// Make sure there's a template
	if (!this.template) throw 'Reef.js: No template was provided.';

	// If elem is an element, use it.
	// If it's a selector, get it.
	var elem = typeof this.elem === 'string' ? document.querySelector(this.elem) : this.elem;
	if (!elem) throw 'Reef.js: The DOM element to render your template into was not found.';

	// Get the template
	var template = (typeof this.template === 'function' ? this.template(this.data) : this.template);
	if (['string', 'number'].indexOf(typeof template) === -1) return;

	// Create DOM maps of the template and target element
	// var templateMap = sanitize(template);
	var templateMap = createDOMMap(stringToHTML(template));
	var domMap = createDOMMap(elem);

	// Diff and update the DOM
	diff(templateMap, domMap, elem);

	// Dispatch a render event
	if (typeof window.CustomEvent === 'function') {
		var event = new CustomEvent('render', {
			bubbles: true
		});
		elem.dispatchEvent(event);
	}

	// Return the elem for use elsewhere
	return elem;

};
```

### Converting a string into HTML

A simple way to convert a string to HTML is to do something like this.

```js
var template =
	'<h1>Hello world!</h1>' +
	'<div>' +
		'<h2>This article contains...</h2>' +
	'</div>';
var tempDiv = document.createElement('div');
tempDiv.innerHTML = template;
```

*However*... even if you don't render your `tempDiv` into the DOM, it will still execute things like `onerror` properties that can be used to run [cross-site scripting attacks](/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/).

After a bunch of Googling, [I discovered `DOMParser()`](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser), a browser API that let's you create DOM nodes from a string *without* executing them. It works in all modern browsers, and IE9 and up. Perfect!

It creates an entire HTML document (with a `headder`, `body` and so on). In my `stringToHTML()` method, I pass in my string and return the document `body`. It has the template as actual HTML elements from our template.

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

### Creating a map of DOM nodes

Now that we've converted our string into HTML elements, we can map them into an array with the `createDOMMap()` helper method.

In this method, I created a `map` array that will hold all of the data about our DOM tree.

I used the `.childNodes` property to get all of the direct descendant HTML nodes inside our element. You *could* also use the `.children`, but it excludes text nodes that are not wrapper in HTML elements.

```html
<h1>This would get included</h1>
<p>This would, too!</p>
But this would not...
```

Then, I pass it through `Array.from()` to create an array from the NodesList that it returns, and use the `forEach()` method to loop through each item.

```js
/**
 * Create a DOM Tree Map for an element
 * @param  {Node}   element The element to map
 * @return {Array}          A DOM tree map
 */
var createDOMMap = function (element) {
	var map = [];
	Array.from(element.childNodes).forEach(function (node) {
		// Do something...
	});
};
```

In the `forEach()` loop, I push an object into the `map` array, with the following properties:

- `content` - The `.textContent` of the node, or `null` if the node has other nodes in it.
- `atts` - The attributes on the element. This is created by passing the `.attributes` property value into a `getAttributes()` helper that we'll look at in a bit.
- `type` - the `.tagName` (`h1`, `div`, etc.). If the element is a text node (`nodeType === 3`), it doesn't have a `.tagName` property so we'll use `text` instead.
- `children` - A map of the child nodes for the element. I create this by recursively passing the current node into `createDOMMap()`.
- `node` - The actual HTML element itself.

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
			children: createDOMMap(node),
			node: node
		});
	});
	return map;
};
```

### Getting the attributes on a DOM node

The `.attributes` property is a list NamedNodeMap of all of the properties and attributes on an element. It contains a ton of info, and since it's not an array, isn't ideal to work with.

I used `Array.from()` to create an array from it, then used the `map()` method to create a new array with just the attribute name and it's value.

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

### Diffing DOM Maps

The hardest part of this project was, by far, creating the function to identify differences between the `templateMap` and the existing `domMap`, and make only the needed updates.

Why do this versus just wipe out and start over?

The two big ones:

1. It's better for performance.
2. It preserves as much of the DOM state as possible, so you don't, for example, lose focus on a form field you're actively typing into (imagine an app that shows you a preview in real time as you type).

First, I calculated the difference in length between the existing `domMap` and the `templateMap`. If the `domMap` has more elements, I loop through it in reverse and remove items until they're the same length.

Then, I can loop through each item in my `templateMap` and compare it to the corresponding item in the `domMap`.

```js
/**
 * Diff the existing DOM node versus the template
 * @param  {Array} templateMap A DOM tree map of the template content
 * @param  {Array} domMap      A DOM tree map of the existing DOM node
 * @param  {Node}  elem        The element to render content into
 */
var diff = function (templateMap, domMap, elem) {

	// If extra elements in domMap, remove them
	var count = domMap.length - templateMap.length;
	if (count > 0) {
		for (; count > 0; count--) {
			domMap[domMap.length - count].node.remove();
		}
	}

	// Diff each item in the templateMap
	templateMap.forEach(function (node, index) {
		// Compare
	});

};
```

If the item in my `templateMap` doesn't exist at all in the `domMap`, I'll create a new DOM element using a `makeElem()` helper function (more on how that works in a bit). Then I'll append it to the parent element with the `appendChild()` method.

If the item exists, but they're not the same type, I'll use `makeElem()` to create a new method, and the `replaceChild()` method to replace it in the DOM.

```js
/**
 * Diff the existing DOM node versus the template
 * @param  {Array} templateMap A DOM tree map of the template content
 * @param  {Array} domMap      A DOM tree map of the existing DOM node
 * @param  {Node}  elem        The element to render content into
 */
var diff = function (templateMap, domMap, elem) {

	// If extra elements in domMap, remove them
	var count = domMap.length - templateMap.length;
	if (count > 0) {
		for (; count > 0; count--) {
			domMap[domMap.length - count].node.remove();
		}
	}

	// Diff each item in the templateMap
	templateMap.forEach(function (node, index) {

		// If element doesn't exist, create it
		if (!domMap[index]) {
			elem.appendChild(makeElem(templateMap[index]));
			return;
		}

		// If element is not the same type, replace it with new element
		if (templateMap[index].type !== domMap[index].type) {
			domMap[index].node.parentNode.replaceChild(makeElem(templateMap[index]), domMap[index].node);
			return;
		}

	});

};
```

That takes care of creating new elements, but what about elements where only the content or some attributes have changed?

I created a helper method, `diffAtts()`, to check for differences in attributes and update them accordingly. We'll look at that shortly, too.

If the `content` properties don't match, I use `textContent` to update the content in the DOM.

And if the item has child elements, I pass it recursively into the `diff()` method so that it can repeat the process.

```js
/**
 * Diff the existing DOM node versus the template
 * @param  {Array} templateMap A DOM tree map of the template content
 * @param  {Array} domMap      A DOM tree map of the existing DOM node
 * @param  {Node}  elem        The element to render content into
 */
var diff = function (templateMap, domMap, elem) {

	// If extra elements in domMap, remove them
	var count = domMap.length - templateMap.length;
	if (count > 0) {
		for (; count > 0; count--) {
			domMap[domMap.length - count].node.remove();
		}
	}

	// Diff each item in the templateMap
	templateMap.forEach(function (node, index) {

		// If element doesn't exist, create it
		if (!domMap[index]) {
			elem.appendChild(makeElem(templateMap[index]));
			return;
		}

		// If element is not the same type, replace it with new element
		if (templateMap[index].type !== domMap[index].type) {
			domMap[index].node.parentNode.replaceChild(makeElem(templateMap[index]), domMap[index].node);
			return;
		}

		// If attributes are different, update them
		diffAtts(templateMap[index], domMap[index], domMap[index].node);

		// If content is different, update it
		if (templateMap[index].content !== domMap[index].content) {
			domMap[index].node.textContent = templateMap[index].content;
		}

		// Repeat for child elements
		if (node.children.length > 0) {
			diff(node.children, domMap[index].children || [], domMap[index].node);
		}

	});

};
```

### Diffing attributes

Finding the differences between attributes was a bit more involved that I had expected.

First, I need to find attributes that are currently in the DOM but aren't in the new template.

To do that, I pass the existing attributes into the `Array.filter()` method. In the callback, I use the `Array.find()` method to look the existing attribute in the new attributes array. If it's `undefined`, I return the item to the `filter()` array as one to be removed.

```js
/**
 * Diff the attributes on an existing element versus the template
 * @param  {Object} template The new template
 * @param  {Object} existing The existing DOM node
 */
var diffAtts = function (template, existing) {

	// Get attributes to remove
	var remove = existing.atts.filter(function (att) {
		var getAtt = template.atts.find(function (newAtt) {
			return att.att === newAtt.att;
		});
		return getAtt === undefined;
	});

};
```

Next, I need to find existing attributes that need to be updated and new ones to be added.

I again use `Array.filter()`, this time with the new template attributes. Again, inside the callback, I use `Array.find()`, this time looking to see if the new attribute is already in the DOM.

If it's `undefined`, or if the values don't match, I return it to the new array as an item to get added/updated.

```js
/**
 * Diff the attributes on an existing element versus the template
 * @param  {Object} template The new template
 * @param  {Object} existing The existing DOM node
 */
var diffAtts = function (template, existing) {

	// Get attributes to remove
	var remove = existing.atts.filter(function (att) {
		var getAtt = template.atts.find(function (newAtt) {
			return att.att === newAtt.att;
		});
		return getAtt === undefined;
	});

	// Get attributes to change
	var change = template.atts.filter(function (att) {
		var getAtt = existing.atts.find(function (existingAtt) {
			return att.att === existingAtt.att;
		});
		return getAtt === undefined || getAtt.value !== att.value;
	});

};
```

Then, I pass the `change` array into and `addAttributes()`, and the `remove` array into the `removeAttributes()` array

```js
/**
 * Diff the attributes on an existing element versus the template
 * @param  {Object} template The new template
 * @param  {Object} existing The existing DOM node
 */
var diffAtts = function (template, existing) {

	// Get attributes to remove
	var remove = existing.atts.filter(function (att) {
		var getAtt = template.atts.find(function (newAtt) {
			return att.att === newAtt.att;
		});
		return getAtt === undefined;
	});

	// Get attributes to change
	var change = template.atts.filter(function (att) {
		var getAtt = existing.atts.find(function (existingAtt) {
			return att.att === existingAtt.att;
		});
		return getAtt === undefined || getAtt.value !== att.value;
	});

	// Add/remove any required attributes
	addAttributes(existing.node, change);
	removeAttributes(existing.node, remove);

};
```

#### Adding attributes

I loop through each attribute in the array using the `Array.forEach()` method.

If the attribute type is `class`, I use `className` to set/update it. If the attribute name starts with `data-` (as in, it's a data attribute), I use `setAttribute()` to add it.

Otherwise, I set it as a property directly on the element.

Why not just use `setAttribute()` for everything? It would set things like `onerror`, opening you up to, again cross-site scripting. This approach is more secure.

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

#### Removing attributes

I loop through each attribute using the `Array.forEach()` method.

If the attribute type is `class`, I use `className` to wipe it out. Otherwise, I use `removeAttribute()` to remove it.

```js
/**
 * Remove attributes from an element
 * @param {Node}  elem The element
 * @param {Array} atts The attributes to remove
 */
var removeAttributes = function (elem, atts) {
	atts.forEach(function (attribute) {
		// If the attribute is a class, use className
		// Otherwise, use removeAttribute()
		if (attribute.att === 'class') {
			elem.className = '';
		} else {
			elem.removeAttribute(attribute.att);
		}
	});
};
```

### Creating Elements

Finally, let's look at the `makeElem()` helper method and how I create the actual elements to inject into the DOM.

If the element `type` property is `text`, I use `document.createTextNode()` to create the node. Otherwise, I use `document.createElement()`.

Then, I pass the new node and it's `atts` property into the `addAttributes()` helper function to add all of the attributes.

If the element has child nodes, I loop through each one with `Array.forEach()`, and recursively pass it into `makeElem()` and append it to the element.

Otherwise, if it's not a `text` node, I set the content with the `.textContent` property. Then, I return the node.

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

## Ensuring browser compatibility

Reef.js works in all modern browsers, and IE9 and up.

It does use some newer ES6 methods, though. So do I make sure it works across a wide range of browsers?

[Polyfills.](/why-i-love-polyfills/)

Many of the included methods work in IE9 and above already&mdash;`Array.forEach()`, for example. For those that don't&mdash;`Array.find()`, `Array.from()`, and `Element.remove()`&mdash;[I included polyfills](https://vanillajstoolkit.com/polyfills/).

(*There's also a non-polyfilled version for people who already include their own.*)

## Wrapping Up

Amazingly, the core Reef.js file is only 267 lines long, including lots of whitespace and in-code documentation. The polyfills add 150 lines (and 4kb *before* minifying and gzipping).

In the process of creating Reef, I learned a lot about the sheer engineering effort that goes into writing robust frameworks like Vue and React. So much respect for the developers who built those tools, even if I don't prefer to use them myself.

I had originally looked into adding Reactivity: having the UI automatically re-render whenever the data is updated. After [reading up on how that works](https://hackernoon.com/how-to-build-your-own-reactivity-system-fc48863a1b7c), though, I decided it wasn't worth the extra bytes.

I'm most proud of how little Reef actually does.

I believe the best* tools are the ones that do as little as possible. I want my plugins and helpers to work like developer legos that can be mixed-and-matched as needed for any given project.

(_*This is totally subjective!_)

With Reef, I've built a stateful component helper method that...

- Weighs under 2kb (minified and gzipped), with zero dependencies.
- Uses simple templating with JavaScript strings or template literals.
- Can be loaded with a humble `script` tag&mdash;no command line or transpiling required.
- Updates only the parts of the DOM that have changed. Keep those form fields in focus!
- Sanitizes templates automatically, reducing the risk of XSS attacks.
- Works with native JavaScript methods and browser APIs.

Not too shabby!
