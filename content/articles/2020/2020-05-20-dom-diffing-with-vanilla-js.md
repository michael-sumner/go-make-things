---
title: "DOM diffing with vanilla JS"
date: 2020-05-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

A couple of weeks ago, we looked at how to build reactive, state-based components with vanilla JS.

1. [How to create a state-based UI component](/how-to-create-a-state-based-ui-component-with-vanilla-js/)
2. [How to add reactivity to a state-based UI component with Proxies](/how-to-create-a-reactive-state-based-ui-component-with-vanilla-js-proxies/)
3. [How to batch UI rendering for better performance](/how-to-batch-ui-rendering-in-a-reactive-state-based-ui-component-with-vanilla-js/)

Today, we're going to learn how to add DOM diffing to our component.

If you haven't yet, go back and read the first three articles, or today's won't make a whole lot of sense. Alright, let's dig in.

## What is DOM diffing?

Up to now, our rendering has used the `innerHTML` property to completely replace the UI with a new one.

This can be bad for performance, since it causes a complete repaint. It can also be frustrating for users. Form fields lose their focus and values whenever the UI updates.

*DOM diffing* is the process of comparing the desired UI to the one currently in the DOM, and selectively changing and updating only the things that are different.

Let's look at how it works under-the-hood.

### But first, a quick aside about the virtual DOM

A lot of the bigger frameworks use something called a *virtual DOM*.

They create an object-based representation of what the DOM looks like in JS, and compare that to a similar map of what the UI should look like.

```js
var dom = [
	{
		elem: 'div',
		content: 'Hello, world!',
		children: [
			{
				elem: 'p',
				content: 'How are you today?',
				children: null
			},
			{
				elem: 'p',
				content: 'Lets go on an adventure.',
				children: null
			}
		]
	}
];
```

A virtual DOM is *theoretically* more performance than querying the real DOM in large apps with lots of elements. It also takes up a lot of space in memory, and requires a fair bit of code to create and manage, so it results in frameworks that are larger than they would be otherwise.

For example, [Preact](https://preactjs.com/) is a 3kb alternative to React (~30kb) with the same API.

The big difference between the two? Preact has no virtual DOM (and a streamlined API).

Alright, let's look at how to actually diff the DOM.

## Converting our template into HTML

The first thing we need to do is convert our string template into HTML.

We *could* inject the string into a `div` and grab the `innerHTML`, but we shouldn't. That actually causes extra work for the browser. For example, if you had an image in your template, it would download. Then it would download again when you render the content into the actual DOM.

Fortunately, there's a browser-native method that prevents the DOM from doing that extra work: `DOMParser()`.

We'll create a helper function, `stringToHTML()`, that we'll pass our template into. We'll create a new `parser` object, and return the `body`, which contains all of the HTML from our template.

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

_**Note:** `DOMParser()` works in all modern browsers, and back to IE9, but support for `text/html` parsing starts with IE10._

In our `render()` function, instead of injecting our template into the UI with `innerHTML`, we'll convert it to HTML with our new `stringToHTML()` method.

```js
/**
 * Render a UI from the template
 */
Rue.prototype.render = function () {

	// Convert the template to HTML
	var templateHTML = stringToHTML(this.template(this.data));

};
```

## Diffing the DOM

Now we're ready to compare our template HTML to the actual UI and make some updates.

Let's create a new `diff()` method that will accept the `templateHTML` and the target element in the UI as arguments.

```js
/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
var diff = function (template, elem) {
	// Do stuff...
};
```

In our `render()` function, we can pass the new `templateHTML` element and `this.elem` into it.

```js
/**
 * Render a UI from the template
 */
Rue.prototype.render = function () {

	// Convert the template to HTML
	var templateHTML = stringToHTML(this.template(this.data));

	// Diff the DOM
	diff(templateHTML, this.elem);

};
```

Now, let's compare the two elements.

## Comparing the template to the DOM

The first thing I want to do is get an array of `childNodes` for both the template and the DOM element.

To do that, I'll pass the `childNodes` property into `Array.prototype.slice.call()` to [convert the resulting NodeList into an array](/using-array-methods-with-nodelists-in-vanilla-js/#array-prototype-slice-call).

```js
/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
var diff = function (template, elem) {

	// Get arrays of child nodes
	var domNodes = Array.prototype.slice.call(elem.childNodes);
	var templateNodes = Array.prototype.slice.call(template.childNodes);

};
```

Next, I want to remove any extra elements in the DOM.

If the `length` of `domNodes` is bigger than the `length` of `templateNodes`, that means the DOM has more child nodes than the template.

We'll create a `count` variable with the difference in length between the two. I'll use a `for` loop to loop through the elements in reverse, and remove each one with [the `removeChild()` method](https://vanillajstoolkit.com/reference/dom-injection/element-removechild/) until `count` is `0` and all of the extras are gone.

```js
/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
var diff = function (template, elem) {

	// Get arrays of child nodes
	var domNodes = Array.prototype.slice.call(elem.childNodes);
	var templateNodes = Array.prototype.slice.call(template.childNodes);

	// If extra elements in DOM, remove them
	var count = domNodes.length - templateNodes.length;
	if (count > 0) {
		for (; count > 0; count--) {
			domNodes[domNodes.length - count].parentNode.removeChild(domNodes[domNodes.length - count]);
		}
	}

};
```

## Adding elements

Now we can loop through the elements in our `templateNodes` array with the `Array.forEach()` method, and compare them to the matching elements in the `templateNodes` array.

If the `domNodes` array doesn't have a matching element at that `index`, we'll use [the `cloneNode()` method](/how-to-make-an-exact-copy-of-an-element-with-vanilla-javascript/) to create a copy of our element (with child elements). Then we'll use [the `appendChild()` method](https://vanillajstoolkit.com/reference/dom-injection/element-appendchild/) to inject it into the DOM.

```js
/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
var diff = function (template, elem) {

	// Get arrays of child nodes
	var domNodes = Array.prototype.slice.call(elem.childNodes);
	var templateNodes = Array.prototype.slice.call(template.childNodes);

	// If extra elements in DOM, remove them
	var count = domNodes.length - templateNodes.length;
	if (count > 0) {
		for (; count > 0; count--) {
			domNodes[domNodes.length - count].parentNode.removeChild(domNodes[domNodes.length - count]);
		}
	}

	// Diff each item in the templateNodes
	templateNodes.forEach(function (node, index) {

		// If element doesn't exist, create it
		if (!domNodes[index]) {
			elem.appendChild(node.cloneNode(true));
			return;
		}

	});

};
```

## Replacing elements

If there *is* an item at that index already, we want to check if its the same type of element or not. For example, is a `p` when it should be a `div`?

We can use the `tagName` property to get the node's type. But, if the node is a comment or string of text, that property won't exist and will throw an error.

Let's create a helper function to get the node type for us.

We'll look at the `nodeType` property, which returns a number, and do a few different things depending on what the value is.

```js
/**
 * Get the type for a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */
var getNodeType = function (node) {
	if (node.nodeType === 3) return 'text';
	if (node.nodeType === 8) return 'comment';
	return node.tagName.toLowerCase();
};
```

In our `diff()` function, we can pass the current node in both the `templateNodes` array and `domNodes` array into the function, and compare their values.

If they're not the same type, we'll again use `cloneNode()` to clone our template node. Then we'll use [the `replaceChild()` method](/how-to-replace-one-element-with-another-with-vanilla-javascript/) to replace the existing item in the DOM with it.

```js
/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
var diff = function (template, elem) {

	// ...

	// Diff each item in the templateNodes
	templateNodes.forEach(function (node, index) {

		// If element doesn't exist, create it
		if (!domNodes[index]) {
			elem.appendChild(node.cloneNode(true));
			return;
		}

		// If element is not the same type, replace it with new element
		if (getNodeType(node) !== getNodeType(domNodes[index])) {
			domNodes[index].parentNode.replaceChild(node.cloneNode(true), domNodes[index]);
			return;
		}

	});

};
```

## Comparing the content

Next, we want to compare the content in our template node to the content in the DOM node.

But, we only want to do that if the template node doesn't have any child elements of its own. If it does, we'll catch those nodes later (including the text content).

Let's create a helper function to get the content.

```js
/**
 * Get the content from a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */
var getNodeContent = function (node) {
	if (node.childNodes && node.childNodes.length > 0) return null;
	return node.textContent;
};
```

We'll pass the template node and DOM node into the `getNodeContent()` method. If the returned values don't match, we'll set the content of the DOM node to that of the template node with the `textContent` property.

```js
/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
var diff = function (template, elem) {

	// ..,

	// Diff each item in the templateNodes
	templateNodes.forEach(function (node, index) {

		// ...

		// If element is not the same type, replace it with new element
		if (getNodeType(node) !== getNodeType(domNodes[index])) {
			domNodes[index].parentNode.replaceChild(node.cloneNode(true), domNodes[index]);
			return;
		}

		// If content is different, update it
		var templateContent = getNodeContent(node);
		if (templateContent && templateContent !== getNodeContent(domNodes[index])) {
			domNodes[index].textContent = templateContent;
		}

	});

};
```

## Checking for child nodes

Now we're ready to think about `childNodes` inside our elements.

If the template node has no `childNodes`, but the template node does, we'll use the `innerHTML` property to completely empty that element in the DOM.

```js
/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
var diff = function (template, elem) {

	// ...

	// Diff each item in the templateNodes
	templateNodes.forEach(function (node, index) {

		// ...

		// If content is different, update it
		var templateContent = getNodeContent(node);
		if (templateContent && templateContent !== getNodeContent(domNodes[index])) {
			domNodes[index].textContent = templateContent;
		}

		// If target element should be empty, wipe it
		if (domNodes[index].childNodes.length > 0 && node.childNodes.length < 1) {
			domNodes[index].innerHTML = '';
			return;
		}

	});

};
```

If the DOM node is empty but the template node is not, we need to add our elements.

For performance reasons, we'll [create a `documentFragement()`](/two-more-ways-to-create-html-from-an-array-of-data-with-vanilla-js/#creating-a-fragment). Then we'll pass our current template node and the `fragment` recursively into the `diff()` method.

All of the child elements will get appended to the `fragment` *without* causing a paint. Once the diffing is done, we can append all of them into the DOM at once with the `appendChild()` method.

```js
/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
var diff = function (template, elem) {

	// ...

	// Diff each item in the templateNodes
	templateNodes.forEach(function (node, index) {

		// ...

		// If target element should be empty, wipe it
		if (domNodes[index].childNodes.length > 0 && node.childNodes.length < 1) {
			domNodes[index].innerHTML = '';
			return;
		}

		// If element is empty and shouldn't be, build it up
		// This uses a document fragment to minimize reflows
		if (domNodes[index].childNodes.length < 1 && node.childNodes.length > 0) {
			var fragment = document.createDocumentFragment();
			diff(node, fragment);
			domNodes[index].appendChild(fragment);
			return;
		}

	});

};
```

And finally, if the template node and DOM node both have `childNodes`, we'll pass elements recursively into `diff()` to repeat the process.

```js
/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
var diff = function (template, elem) {

	// ...

	// Diff each item in the templateNodes
	templateNodes.forEach(function (node, index) {

		// ...

		// If target element should be empty, wipe it
		if (domNodes[index].childNodes.length > 0 && node.childNodes.length < 1) {
			domNodes[index].innerHTML = '';
			return;
		}

		// If element is empty and shouldn't be, build it up
		// This uses a document fragment to minimize reflows
		if (domNodes[index].childNodes.length < 1 && node.childNodes.length > 0) {
			var fragment = document.createDocumentFragment();
			diff(node, fragment);
			domNodes[index].appendChild(fragment);
			return;
		}

		// If there are existing child elements that need to be modified, diff them
		if (node.childNodes.length > 0) {
			diff(node, domNodes[index]);
		}

	});

};
```

## The complete diffing function

Here's the whole thing put together.

```js
/**
 * Get the type for a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */
var getNodeType = function (node) {
	if (node.nodeType === 3) return 'text';
	if (node.nodeType === 8) return 'comment';
	return node.tagName.toLowerCase();
};

/**
 * Get the content from a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */
var getNodeContent = function (node) {
	if (node.childNodes && node.childNodes.length > 0) return null;
	return node.textContent;
};

/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
var diff = function (template, elem) {

	// Get arrays of child nodes
	var domNodes = Array.prototype.slice.call(elem.childNodes);
	var templateNodes = Array.prototype.slice.call(template.childNodes);

	// If extra elements in DOM, remove them
	var count = domNodes.length - templateNodes.length;
	if (count > 0) {
		for (; count > 0; count--) {
			domNodes[domNodes.length - count].parentNode.removeChild(domNodes[domNodes.length - count]);
		}
	}

	// Diff each item in the templateNodes
	templateNodes.forEach(function (node, index) {

		// If element doesn't exist, create it
		if (!domNodes[index]) {
			elem.appendChild(node.cloneNode(true));
			return;
		}

		// If element is not the same type, replace it with new element
		if (getNodeType(node) !== getNodeType(domNodes[index])) {
			domNodes[index].parentNode.replaceChild(node.cloneNode(true), domNodes[index]);
			return;
		}

		// If content is different, update it
		var templateContent = getNodeContent(node);
		if (templateContent && templateContent !== getNodeContent(domNodes[index])) {
			domNodes[index].textContent = templateContent;
		}

		// If target element should be empty, wipe it
		if (domNodes[index].childNodes.length > 0 && node.childNodes.length < 1) {
			domNodes[index].innerHTML = '';
			return;
		}

		// If element is empty and shouldn't be, build it up
		// This uses a document fragment to minimize reflows
		if (domNodes[index].childNodes.length < 1 && node.childNodes.length > 0) {
			var fragment = document.createDocumentFragment();
			diff(node, fragment);
			domNodes[index].appendChild(fragment);
			return;
		}

		// If there are existing child elements that need to be modified, diff them
		if (node.childNodes.length > 0) {
			diff(node, domNodes[index]);
		}

	});

};

/**
 * Render a UI from the template
 */
Rue.prototype.render = function () {

	// Convert the template to HTML
	var templateHTML = stringToHTML(this.template(this.data));

	// Diff the DOM
	diff(templateHTML, this.elem);

};
```

[And here's a working demo.](https://codepen.io/cferdinandi/pen/PoPXBjL)

## What's next?

One thing we didn't cover today is diffing attributes and properties: classes, IDs, data attributes, inline styles, and so on.

Honestly, because of some quirks in how JS works, that's *way* harder than what we did today. There's a bunch of little "gotchas" that will trip you up.

I may cover that in a future article, but hopefully this gives you a better understanding of how diffing works.