---
title: "An ES6 way to get all sibling elements with vanilla JS"
date: 2018-09-12T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I had a few folks respond to my article last week on [how to get all of an element's sibling elements](/how-to-get-all-of-an-elements-siblings-with-vanilla-js/) with some alternate approaches.

Today, I wanted to show you a simplified approach using some newer ES6 methods.

## A quick recap

For comparison, here's the original version from last week. It works back to IE9.

```js
var getSiblings = function (elem) {

	// Setup siblings array and get the first sibling
	var siblings = [];
	var sibling = elem.parentNode.firstChild;

	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling
	}

	return siblings;

};
```

## A more modern approach

Another way to approach this would be to get the element's parent node, then get *all* direct descendant elements (this would include both the element and it's siblings).

```js
var getSiblings = function (elem) {
	var descendants = elem.parentNode.children;
};
```

Then, we can filter out the element itself, leaving just the siblings.

The [ES6 `Array.filter()` method](/find-every-matching-item-in-an-array-with-vanilla-javascript/) provides a way to do just that! *But...* it only works on arrays and the `.children` property returns an HTMLCollection.

We *could* [use the `Array.from()` method](/converting-a-nodelist-to-an-array-with-vanilla-javascript/#converting-a-nodelist-to-an-array) to convert our HTMLCollection into an array, but it has spotty browser support and would require a polyfill.

There's another way to use `Array.filter()` on items that aren't arrays, though: the `call()` method.

The `Function.call()` method *calls* a function, assigning whatever thing you pass in as `this`. You can also pass in arguments for the function to use.

In our case, we can pass in our `descendants`, an HTMLCollection, to be used as `this` on `Array.prototype.filter()`, allowing us to use the method on an item that's iterable but *not* an array. We'll pass in our callback function as the second argument, returning only `sibling` elements that are not our original `elem`.

```js
var getSiblings = function (elem) {
	var descendants = elem.parentNode.children;
	return Array.prototype.filter.call(descendants, function (sibling) {
		return sibling !== elem;
	});
};
```

And finally, as a tiny optimization, we don't need to set the `descendants` variable at all. We can pass its value directly into the `call()` method.

```js
var getSiblings = function (elem) {
	return Array.prototype.filter.call(elem.parentNode.children, function (sibling) {
		return sibling !== elem;
	});
};
```

Now we've got a much smaller function that does the same thing as the original. [Here's a demo.](https://codepen.io/cferdinandi/pen/rZvMJL)

## Browser Compatibility

Here's the crazy thing: this modified function has the same browser compatibility as the original!

It works in all modern browsers, and IE9 and up. I've updated the helper function on the [Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers) accordingly.