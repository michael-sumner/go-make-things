---
title: "Dom diffing with vanilla JS: part 1"
date: 2019-08-19T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, I started a series on how [Reef, my 2.5kb alternative to React and Vue](/a-simple-alternative-to-react-and-vue-that-weighs-just-2.5kb/), works under-the-hood.

First, we learned [how to convert markup strings into real HTML elements](/converting-a-string-into-markup-with-vanilla-js/). Then, we learned [how to create a map of the DOM tree](/how-to-create-a-map-of-dom-nodes-with-vanilla-js/).

Today, we're going to learn how to put them both together to diff the DOM and selectively update just the things that need changing.

*__Quick head up:__ this is a bit more complex than the kind of things I normally write about. As a result, this article is both longer than usual, and is split into two parts. The second part in the series drops tomorrow.*

## What is DOM diffing?

If you're not familiar with the concept already, DOM diffing is the process of comparing the existing UI to the UI you want and identifying what needs to change to get there.

For example, let's say you're working on a todo list app, and the existing UI looks like this.

```html
<div id="app">

	<h1>Starting at Hogwarts</h1>

	<p><em>You don't have any todo items yet.</em></p>

</div>
```

And you wanted the markup to look like this.

```html
<div id="app">

	<h1>Starting at Hogwarts</h1>

	<ul>
		<li>
			<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 800 800">
				<title>Completed</title>
				<path d="M0 0v800h800V0H0zm750 750H50V50h700v700z"/>
			</svg>
			Fix my wand
		</li>
		<li>
			<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 800 800">
				<title>Incomplete</title>
				<path d="M0 0v800h800V0H0zm750 750H50V50h700v700z"/>
				<path d="M125 400l75-75 125 125 275-275 75 75-350 350z"/>
			</svg>
			Buy new robes
		</li>
		<li>
			<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 800 800">
				<title>Incomplete</title>
				<path d="M0 0v800h800V0H0zm750 750H50V50h700v700z"/>
				<path d="M125 400l75-75 125 125 275-275 75 75-350 350z"/>
			</svg>
			Enroll in courses
		</li>
	</ul>

</div>
```

In diffing the DOM, your script should identify that the `h1` element is identical and doesn't need any changes.

It should detect that the `p` element is gone and should be removed, and that a `ul` element with a variety of child elements and text nodes need to be created.

Let's look at how we'd do that.

## Getting DOM tree maps

Before we do anything else, we'll need to get DOM tree maps for the existing UI and the desired UI.

We'll need to run our template's markup string through [the `stringToHTML()` method we discussed last week](/converting-a-string-into-markup-with-vanilla-js/). Then, we'll pass it an the `#app` element through [the `createDOMMap()` mapping function](/how-to-create-a-map-of-dom-nodes-with-vanilla-js/).

```js
// The desired UI
var template = '<h1>Starting at Hogwarts</h1> ...';

// Get the existing UI node
var app = document.querySelector('#app');

// Get DOM maps
var templateMap = createDOMMap(stringToHTML(template));
var domMap = createDOMMap(app);
```

Now we're ready to start diffing.

## Creating a diffing function

Let's start by creating a diffing helper function.

We'll pass in three arguments: the DOM tree map for the template, the DOM tree map for the existing UI, and the element the DOM tree map in the existing UI belongs to (in the example above, that would be the `#app` element).

```js
/**
 * Diff the existing DOM node versus the template
 * @param  {Array} templateMap A DOM tree map of the template content
 * @param  {Array} domMap      A DOM tree map of the existing DOM node
 * @param  {Node}  elem        The element to render content into
 */
var diff = function (templateMap, domMap, elem) {
	// code goes here...
};
```

We'll use it like this.

```js
// The desired UI
var template = '<h1>Starting at Hogwarts</h1> ...';

// Get the existing UI node
var app = document.querySelector('#app');

// Get DOM maps
var templateMap = createDOMMap(stringToHTML(template));
var domMap = createDOMMap(app);

// Diff the DOM
diff(templateMap, domMap, app);
```

## Removing extra elements

The first thing we're going to do is remove excess elements from the DOM. For example, imagine if the todo list had five items and we needed to reduce it to three.

We'll get the `length` of our `domMap` array, and subtract it from the `length` of our `templateMap`. If the number is greater than `0`&mdash;if the DOM has more elements than the desired UI&mdash;we'll remove some.

```js
var diff = function (templateMap, domMap, elem) {

	// If extra elements in domMap, remove them
	var count = domMap.length - templateMap.length;
	if (count > 0) {
		// Remove the extra nodes
	}

};
```

We can do this with a `for` loop.

Instead of starting at `0` and working our way up, we'll use it to loop backwards and decrease our `count` by `1`. As long as `count` is higher than `0`, we'll keep going.

Inside the loop, we'll [use the `removeChild()` method](https://vanillajstoolkit.com/reference/dom-injection/element-removechild/) to remove the element (which you may recall we cached to the `node` property).

```js
var diff = function (templateMap, domMap, elem) {

	// If extra elements in domMap, remove them
	var count = domMap.length - templateMap.length;
	if (count > 0) {
		for (; count > 0; count--) {
			domMap[domMap.length - count].node.parentNode.removeChild(domMap[domMap.length - count].node);
		}
	}

};
```

## Diff each element

Now that we've removed the extra elements, let's loop through each item in our `templateMap` and compare it to the corresponding element in the `domMap`.

We'll use [the `Array.forEach()` method](https://vanillajstoolkit.com/reference/loops/array-foreach/) for this. We'll compare the current item to the item at the same `index` in the `domMap` array.

```js
var diff = function (templateMap, domMap, elem) {

	// If extra elements in domMap, remove them
	var count = domMap.length - templateMap.length;
	if (count > 0) {
		for (; count > 0; count--) {
			domMap[domMap.length - count].node.parentNode.removeChild(domMap[domMap.length - count].node);
		}
	}

	// Diff each item in the templateMap
	templateMap.forEach(function (node, index) {
		// Diff all the things!
	});

};
```

## Creating new elements

If the element doesn't exist in the `domMap`, we'll need to create it.

Let's create a `makeElem()` helper function to create the actual element for us. We'll pass in the node details from our `templateMap` as an argument.

```js
/**
 * Make an HTML element
 * @param  {Object} elem The element details
 * @return {Node}        The HTML element
 */
var makeElem = function (elem) {
	// Code goes here...
};
```

If the element `type` is `text`, we'll use the `createTextNode()` method to create a text node with the `content` property as its value. If it's `comment`, we'll use the `createComment()` method to create a comment element.

You may recall [in the DOM map article](/how-to-create-a-map-of-dom-nodes-with-vanilla-js/) I mentioned that we need to handle SVGs a little differently. If our element has the `isSVG` property, we'll use the `createEelementNS` to create an SVG.

For any other type of element, we'll use the `createElement()` method to create an element.

```js
var makeElem = function (elem) {

	// Create the element
	var node;
	if (elem.type === 'text') {
		node = document.createTextNode(elem.content);
	} else if (elem.type === 'comment') {
		node = document.createComment(elem.content);
	} else if (elem.isSVG) {
		node = document.createElementNS('http://www.w3.org/2000/svg', elem.type);
	} else {
		node = document.createElement(elem.type);
	}

};
```

Next, we need to add any required attributes to our element. To keep our function more readable, we'll create a helper function for that, and pass the newly created `node` and the `elem.attributes` into it as arguments.

We'll look at how this function works in just a minute.

```js
var makeElem = function (elem) {

	// Create the element
	var node;
	if (elem.type === 'text') {
		node = document.createTextNode(elem.content);
	} else if (elem.type === 'comment') {
		node = document.createComment(elem.content);
	} else if (elem.isSVG) {
		node = document.createElementNS('http://www.w3.org/2000/svg', elem.type);
	} else {
		node = document.createElement(elem.type);
	}

	// Add attributes
	addAttributes(node, elem.atts);

};
```

Then, we'll return our newly created `node`.

```js
var makeElem = function (elem) {

	// Create the element
	var node;
	if (elem.type === 'text') {
		node = document.createTextNode(elem.content);
	} else if (elem.type === 'comment') {
		node = document.createComment(elem.content);
	} else if (elem.isSVG) {
		node = document.createElementNS('http://www.w3.org/2000/svg', elem.type);
	} else {
		node = document.createElement(elem.type);
	}

	// Add attributes
	addAttributes(node, elem.atts);

	return node;

};
```

## Handling child nodes

If the element has any child nodes&mdash;if the `length` of the `elem.children` property is greater than `0`&mdash;we'll look through each one and recursively pass it into the `makeElem()` method.

Then, we'll use [the `appendChild()` method](https://vanillajstoolkit.com/reference/dom-injection/element-appendchild/) to inject it into the newly created `node`.

```js
var makeElem = function (elem) {

	// Create the element
	var node;
	if (elem.type === 'text') {
		node = document.createTextNode(elem.content);
	} else if (elem.type === 'comment') {
		node = document.createComment(elem.content);
	} else if (elem.isSVG) {
		node = document.createElementNS('http://www.w3.org/2000/svg', elem.type);
	} else {
		node = document.createElement(elem.type);
	}

	// Add attributes
	addAttributes(node, elem.atts);

	// If the element has child nodes, create them
	// Otherwise, add textContent
	if (elem.children.length > 0) {
		elem.children.forEach(function (childElem) {
			node.appendChild(makeElem(childElem));
		});
	}

	return node;

};
```

## Adding content

If there are no child elements, *and* if our element isn't a text node, we'll use the `textContent` property to add the `content` property value to our `node`.

```js
var makeElem = function (elem) {

	// Create the element
	var node;
	if (elem.type === 'text') {
		node = document.createTextNode(elem.content);
	} else if (elem.type === 'comment') {
		node = document.createComment(elem.content);
	} else if (elem.isSVG) {
		node = document.createElementNS('http://www.w3.org/2000/svg', elem.type);
	} else {
		node = document.createElement(elem.type);
	}

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

## Adding attributes

Now lets look at how to add attributes to the element we created in our `makeElem()` function.

Our `addAttributes()` helper function will accept two arguments: the element, and an array of attributes.

```js
/**
 * Add attributes to an element
 * @param {Node}  elem The element
 * @param {Array} atts The attributes to add
 */
var addAttributes = function (elem, atts) {
	// Code goes here...
};
```

We'll use the `Array.forEach()` method to loop through each attribute and add it to the element.

The easiest way to add each attribute is with [the `setAttribute()` method](https://vanillajstoolkit.com/reference/attributes/setattribute/).

```js
var addAttributes = function (elem, atts) {
	atts.forEach(function (attribute) {
		elem.setAttribute(attribute.att, attribute.value);
	});
};
```

### Handling attributes without a value

Certain attributes, like `hidden` or `required` or `checked`, don't need a value to work on an element.

```html
<!-- This is valid -->
<input type="checkbox" checked>
```

The attribute object for that element would look like this:

```js
var attribute = {
	att: 'checked',
	value: null
};
```

But `setAttribute()` requires a second argument to work in certain browsers (like Firefox). We'll add a conditional `true` for the second argument if no value is present, to make sure this works everywhere.

```js
var addAttributes = function (elem, atts) {
	atts.forEach(function (attribute) {
		elem.setAttribute(attribute.att, attribute.value || true);
	});
};
```

### Handling classes

The `setAttribute()` method won't work for classes. If the `att` property is `class`, we'll use the `className` property instead.

```js
var addAttributes = function (elem, atts) {
	atts.forEach(function (attribute) {
		// If the attribute is a class, use className
		// Otherwise, set the attribute
		if (attribute.att === 'class') {
			elem.className = attribute.value;
		} else {
			elem.setAttribute(attribute.att, attribute.value || true);
		}
	});
};
```

### Handling styles

The `setAttribute()` method also won't work for styles. If the `att` value is `style`, the value will be an a string of styles separated by a semicolon, like this.

```js
var attribute = {
	att: 'style',
	value: 'background-color: rebeccapurple; color: white;'
};
```

To add those to the element, we need to convert each item into an array, loop through each one, and add it with the `style` property.

First, let's create a `getStyleMap()` function to convert our style string into an array. We'll accept the `styles` string as an argument.

```js
/**
 * Create an array map of style names and values
 * @param  {String} styles The styles
 * @return {Array}         The styles
 */
var getStyleMap = function (styles) {
	// Code goes here...
};
```

First, we'll split our string into an array with [the `String.split()` method](https://vanillajstoolkit.com/reference/strings/string-split/), passing in a semicolon (`;`) as the delimiter.

```js
var getStyleMap = function (styles) {
	return styles.split(';');
};
```

With our previous example, this would return an array like this:

```js
var styles = [
	'background-color: rebeccapurple',
	'color: white'
];
```

Now let's split each style into it's own set of key/value pairs. We'll use [the `Array.reduce()` method](/using-array.reduce-in-vanilla-js/) to create a new array.

If there's no property name&mdash;if the first value in the `style` item is the color (`:`), we'll ignore it. Otherwise, we'll `split()` it again, this time using a colon as the delimiter.

```js
var getStyleMap = function (styles) {
	return styles.split(';').reduce(function (arr, style) {
		if (style.trim().indexOf(':') > 0) {
			var styleArr = style.split(':');
		}
	}, []);
};
```

Then, we'll push an object with our style properties into our new array (`arr`).

```js
var getStyleMap = function (styles) {
	return styles.split(';').reduce(function (arr, style) {
		if (style.trim().indexOf(':') > 0) {
			var styleArr = style.split(':');
			arr.push({
				name: styleArr[0] ? styleArr[0].trim() : '',
				value: styleArr[1] ? styleArr[1].trim() : ''
			});
		}
		return arr;
	}, []);
};
```

Back in our `addAttributes()` method, we can now get an array of style properties.

Then, we'll loop through each one with the `forEach()` method and add it to the element with the `style` property.

```js
var addAttributes = function (elem, atts) {
	atts.forEach(function (attribute) {
		// If the attribute is a class, use className
		// Else if it's style, diff and update styles
		// Otherwise, set the attribute
		if (attribute.att === 'class') {
			elem.className = attribute.value;
		} else if (attribute.att === 'style') {
			var styles = getStyleMap(attribute.value);
			styles.forEach(function (style) {
				elem.style[style.name] = style.value;
			});
		} else {
			elem.setAttribute(attribute.att, attribute.value || true);
		}
	});
};
```

## Injecting the new element into the DOM

Now that we've got our element, we can inject it into the DOM, again using the `appendChild()` method.

```js
// Diff each item in the templateMap
templateMap.forEach(function (node, index) {

	// If element doesn't exist, create it
	if (!domMap[index]) {
		elem.appendChild(makeElem(templateMap[index]));
		return;
	}

});
```

## To be continued...

This was a *lot* for one article, and this is a good place to start.

Tomorrow, we'll pick this back up. We'll look at how to update element types, add and remove classes, styles, and other attributes, and update content within an element.