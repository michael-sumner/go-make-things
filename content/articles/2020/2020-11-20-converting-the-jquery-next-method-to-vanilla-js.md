---
title: "Converting the jQuery next() method to vanilla JS"
date: 2020-11-20T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

As part of my ongoing series on [converting jQuery methods to vanilla JS](/series/converting-jquery-to-vanilla-js/), today, we're going to look at the jQuery `next()` method.

Let's dig in.

## The jQuery `next()` method

The jQuery `next()` method gets the next sibling of an element. You can optionally filter by a selector.

For example, let's say you have markup like this.

```html
<ul>
	<li>list item 1</li>
	<li>list item 2</li>
	<li class="third-item">list item 3</li>
	<li>list item 4</li>
	<li>list item 5</li>
</ul>
```

You can use the jQuery `next()` method to get the `li` with `list item 4` in it like this.

```js
$('.third-item').next();
```

If you only wanted to get the element if it was a button, you could do this instead.

```js
$('.third-item').next('button');
```

Let's look at how to do that with vanilla JS.

## The `nextSibling` and `nextElementSibling` properties

The vanilla JS `nextSibling` property returns the next sibling node (including both elements _and_ other nodes likes text strings, comments, and so on). The `nextElementSibling` returns the sibling, but _only_ elements.

To get the `li` with `list item 4` in it with vanilla JS, you would do this.

```js
document.querySelector('.third-item').nextElementSibling;
```

### Filtering by selector

The jQuery `next()` method also lets you filter by a selector. How would you do that with vanilla JS?

Let's create a little helper method for this.

First, we'll pass in the element, and an optional selector to use. Then, we'll get the `elem`'s `nextElementSibling`.

If there's no `selector` to filter by, we'll just return the element. Otherwise, we'll check if the `nextElem` matches the selector using [the `matches()` method](https://vanillajstoolkit.com/reference/selectors/element-matches/). If it matches, we'll return it, If not, we'll return `null`.

```js
var next = function (elem, selector) {

	// Get the next element
	var nextElem = elem.nextElementSibling;

	// If there's no selector, return the next element
	if (!selector) {
		return nextElem;
	}

	// Otherwise, check if the element matches the selector
	if (nextElem && nextElem.matches(selector)) {
		return nextElem;
	}

	// if it's not a match, return null
	return null;

};
```

## Browser Compatibility

The `nextSibling` property works in all modern browsers, and back to at least IE6. The `nextElementSibling` also works in all modern browsers, but only back to IE9.

The `matches()` method works in all modern browsers, and back to IE9, but in older implementations of those browsers used vendor prefixing. You can [ensure consistent behavior across browsers with a polyfill](https://vanillajstoolkit.com/polyfills/matches/).