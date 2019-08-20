---
title: "DOM diffing with vanilla JS: part 2"
date: 2019-08-20T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Yesterday, we started exploring [DOM diffing with vanilla JS](/dom-diffing-with-vanilla-js-part-1/).

We got as far creating new elements. Today, we're going to pick things back and look at how to update element types, add and remove classes, styles, and other attributes, and update content within an element.

*__Quick head up:__ this is a bit more complex than the kind of things I normally write about. As a result, this article is both longer than usual, and is split into two parts. [The first part in the series came out yesterday.](/dom-diffing-with-vanilla-js-part-1/)*

## Where we left off

Here's where we left off yesterday. This `Array.forEach()` loop runs inside our `diff()` function.

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

## Replacing elements

If the element in the current UI (the `domMap`) is a different `type` than the one in the desired UI (the `templateMap`), we need to change it.

To do that, we can use the `replaceChild()` method, which replaces one element with another. You call it on the `parentNode` of the element you want to replace, and pass in the new element and existing one as arguments.

In our case, we'll use our `makeElem()` method to create the new element. Then, we'll `return` so the rest of the tasks in the loop don't run.

```js
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
```

## Updating attributes

If the element isn't new and doesn't need to be replaced, we need to check if any attributes have changed and need to be updated.

We'll create a helper function&mdash;`diffAtts()`&mdash;for that. We'll pass in the current item in the template and the actual DOM as arguments.

```js
/**
 * Diff the attributes on an existing element versus the template
 * @param  {Object} template The new template
 * @param  {Object} existing The existing DOM node
 */
var diffAtts = function (template, existing) {
	// ...
};
```

Let's first get an array of attributes that need to be removed. We can use [the `Array.filter()` method](/what-array.filter-does-in-vanilla-js/) and [the `Array.find()` method](/what-array.find-does-in-vanilla-js/) for this.

We'll call `Array.filter()` on the existing UI's `atts`. For each attribute on the existing element in the DOM, we'll use `Array.find()` to see if that element also exists for the template element. If not (if it's `undefined`), we'll add it to the array of items to be removed.

```js
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

Then we'll repeat the process for items that need to be added or updated.

We'll use `Array.filter()` to create a new array for the template element's attributes. In the callback function, we'll use `Array.find()` to look for that attribute on the existing element.

If the attribute doesn't exist, or if it does but has a different value, we'll add it to the list of attributes to update.

```js
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
		var getAtt = find(existing.atts, function (existingAtt) {
			return att.att === existingAtt.att;
		});
		return getAtt === undefined || getAtt.value !== att.value;
	});

};
```

Next, let's create two helper functions to handle adding and removing attributes. We'll pass the current element, and the array of items to `change` or `remove` in as arguments.

```js
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
		var getAtt = find(existing.atts, function (existingAtt) {
			return att.att === existingAtt.att;
		});
		return getAtt === undefined || getAtt.value !== att.value;
	});

	// Add/remove any required attributes
	addAttributes(existing.node, change);
	removeAttributes(existing.node, remove);

};
```

### Updating attributes

Yesterday, we looked at [building out an `addAttributes()` method](/dom-diffing-with-vanilla-js-part-1/#adding-attributes). We need to make a change to how it handles styles.

In the original version, it just added styles. Now, we need to diff the existing styles and add/remove them as needed. Let's add a `diffStyles()` method, passing in the element and desired styles.

```js
var addAttributes = function (elem, atts) {
	atts.forEach(function (attribute) {
		// If the attribute is a class, use className
		// Else if it's style, diff and update styles
		// Otherwise, set the attribute
		if (attribute.att === 'class') {
			elem.className = attribute.value;
		} else if (attribute.att === 'style') {
			diffStyles(elem, attribute.value);
		} else {
			elem.setAttribute(attribute.att, attribute.value || true);
		}
	});
};
```

The `diffStyles()` method will work a bit like the `diffAtts()` method.

First, we'll use the `getStyleMap()` method we created yesterday to get an array of styles. Then, we'll use [the `Array.prototype`/`call()` trick](/what-the-hell-is-the-call-method-and-when-should-you-use-it/) to use the `Array.filter()` method on the current element's styles.

We'll again use the `Array.find()` method to see if that style also exists on the new element, and if not, we'll add it to an array of styles to remove.

We'll pass the element and that array into a `removeStyles()` function. We'll also pass the element and the `styleMap` array into a `changeStyles()` function.

```js
var diffStyles = function (elem, styles) {

	// Get style map
	var styleMap = getStyleMap(styles);

	// Get styles to remove
	var remove = Array.prototype.filter.call(elem.style, function (style) {
		var findStyle = styleMap.find(function (newStyle) {
			return newStyle.name === style && newStyle.value === elem.style[style];
		});
		return findStyle === undefined;
	});

	// Add and remove styles
	removeStyles(elem, remove);
	changeStyles(elem, styleMap);

};
```

In our `removeStyles()` function, we'll loop through each style in the array and set its value to an empty string on the element.

```js
var removeStyles = function (elem, styles) {
	styles.forEach(function (style) {
		elem.style[style] = '';
	});
};
```

In the `changeStyles()` function, we'll loop through each style in the array and set its value.

```js
var changeStyles = function (elem, styles) {
	styles.forEach(function (style) {
		elem.style[style.name] = style.value;
	});
};
```

### Removing attributes

Removing attributes is a lot more straightforward.

If the attribute is `class`, we'll set `className` to an empty string. If it's `style`, we'll pass an array of styles on the element into the `removeStyles()` method we just created. Otherwise, we'll use the `removeAttribute()` method to remove it.

```js
var removeAttributes = function (elem, atts) {
	atts.forEach(function (attribute) {
		// If the attribute is a class, use className
		// Else if it's style, remove all styles
		// Otherwise, use removeAttribute()
		if (attribute.att === 'class') {
			elem.className = '';
		} else if (attribute.att === 'style') {
			removeStyles(elem, Array.prototype.slice.call(elem.style));
		} else {
			elem.removeAttribute(attribute.att);
		}
	});
};
```

### Running the `diffAtts()` method

Now, after all that, we can finally run our `diffAtts()` method.

```js
// Diff each item in the templateMap
templateMap.forEach(function (node, index) {

	// If element doesn't exist, create it
	if (!domMap[index]) {
		//...
	}

	// If element is not the same type, replace it with new element
	if (templateMap[index].type !== domMap[index].type) {
		// ...
	}

	// If attributes are different, update them
	diffAtts(templateMap[index], domMap[index]);

});
```

We don't need to stop the loop here, as other things might also be different.

## Updating content

Next, let's check if the `content` in the template element is the same as in the existing element in the UI. If they're not, we'll use the `textContent` method to update the DOM.

```js
// Diff each item in the templateMap
templateMap.forEach(function (node, index) {

	// ...

	// If attributes are different, update them
	diffAtts(templateMap[index], domMap[index]);

	// If content is different, update it
	if (templateMap[index].content !== domMap[index].content) {
		domMap[index].node.textContent = templateMap[index].content;
		return;
	}

});
```

## Adding child elements

Now let's look at how to handle child elements.

If the existing UI has child elements (if the `length` of the `children` array is greater than `0`), and the template does not (if it's `length` is less than `1`), we'll use `innerHTML` to wipe out the content.

We *could* loop through each child element and remove it, but that would trigger a lot of reflows. This approach should be better for performance.

```js
// Diff each item in the templateMap
templateMap.forEach(function (node, index) {

	// ...

	// If content is different, update it
	if (templateMap[index].content !== domMap[index].content) {
		domMap[index].node.textContent = templateMap[index].content;
		return;
	}

	// If target element should be empty, wipe it
	if (domMap[index].children.length > 0 && node.children.length < 1) {
		domMap[index].node.innerHTML = '';
		return;
	}

});
```

If the template element has child elements, we need to add them.

The simplest way to do that is to recursively pass template element's children, the current element's children, and current element back into the `diff()` function.

```js
// Diff each item in the templateMap
templateMap.forEach(function (node, index) {

	// ...

	// If target element should be empty, wipe it
	if (domMap[index].children.length > 0 && node.children.length < 1) {
		domMap[index].node.innerHTML = '';
		return;
	}

	// If there are existing child elements that need to be modified, diff them
	if (node.children.length > 0) {
		diff(node.children, domMap[index].children, domMap[index].node);
	}

});
```

This works great.

But... if the current DOM element is empty and the template has a lot of child elements, it will trigger a bunch of a reflows. This is bad for performance and can introduce some jank into the front end.

If that's the case&mdash;if the current DOM element has no children and the template does&mdash;we'll instead [create a document fragment](/two-more-ways-to-create-html-from-an-array-of-data-with-vanilla-js/#creating-a-fragment) and diff that.

A *document fragment* is a new document element that you can add child elements to, but that isn't attached to the current `document`. As a result, modifying it will not trigger reflows.

We'll pass that into `diff()` as the element to append to. Then, we'll append it into the element so that only one reflow happens with all of our new elements in it.

```js
// Diff each item in the templateMap
templateMap.forEach(function (node, index) {

	// ...

	// If target element should be empty, wipe it
	if (domMap[index].children.length > 0 && node.children.length < 1) {
		domMap[index].node.innerHTML = '';
		return;
	}

	// If element is empty and shouldn't be, build it up
	// This uses a document fragment to minimize reflows
	if (domMap[index].children.length < 1 && node.children.length > 0) {
		var fragment = document.createDocumentFragment();
		diff(node.children, domMap[index].children, fragment);
		elem.appendChild(fragment);
		return;
	}

	// If there are existing child elements that need to be modified, diff them
	if (node.children.length > 0) {
		diff(node.children, domMap[index].children, domMap[index].node);
	}

});
```

## Putting it all together

There's obviously a *lot* going on with this code. [Here's a working demo for you to play with.](https://codepen.io/cferdinandi/pen/GRKjeLv?editors=1010)

I learned two big things from this project:

1. You can do a lot of amazing stuff with a relatively small amount of code.
2. The engineering behind bigger frameworks like React and Vue is absolutely amazing, and I'm impressed with what those people have built.