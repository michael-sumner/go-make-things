---
categories:
- Code
- JavaScript
date: '2017-06-21'
title: How to get an element&#8217;s siblings with vanilla JavaScript
---

Over the last few days, we've learned how to [climb up the DOM](https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/) and [get parent elements](https://gomakethings.com/how-to-get-all-parent-elements-with-vanilla-javascript/) in a variety of [different ways](https://gomakethings.com/climbing-up-the-dom-until-you-hit-a-match-with-vanilla-javascript/).

Today, let's look at how to get an element's siblings.

For example, if you had a list item (an `<li>`), how would you get get all the others in the list? jQuery makes this really easy with the `siblings()` method.

But, with about 8 lines of code, we can easily create a vanilla JavaScript helper function that does the same thing.

## Getting Setup

First, let's create a helper function named `getSiblings()`.

```javascript
var getSiblings = function (elem) {
	// Code goes here...
};
```

Now, let's create an array that we'll push each sibling element to.

```javascript
var getSiblings = function (elem) {
	var siblings = [];
};
```

Next, we want to grab the first sibling of our element. Using a list item as an example, we want to grab the first `<li>` in the list that our list item belongs to.

We'll do that using the `.parentNode` property to get the parent list, and then the `.firstChild` property to get the first item.

```javascript
var getSiblings = function (elem) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
};
```

## Getting all sibling elements

Now we're ready to loop through each of our siblings and push them to our array.

We'll use a `for` loop for this. After each iteration of the loop, we'll update our `sibling` variable to point to the next sibling in the list using the `nextSibling` property.

As long as a `sibling` exists, we'll keep looping through.

```javascript
var getSiblings = function (elem) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	for (; sibling; sibling = sibling.nextSibling) {
		// Do something...
	}
};
```

In our loop, we want to check if our current `sibling` is our original `elem` element. If it is, we'll skip it.

We also want to make sure that the current `sibling` is really an element and not a string of text or anything weird like that. We'll use `nodeType` to check that.

Otherwise, we'll push our `sibling` to the `siblings` array.

```javascript
var getSiblings = function (elem) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	for (; sibling; sibling = sibling.nextSibling) {
		if (sibling.nodeType !== 1 || sibling === elem) continue;
		siblings.push(sibling);
	}
};
```

And finally, when the loop is done, we'll return it.

```javascript
var getSiblings = function (elem) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	for (; sibling; sibling = sibling.nextSibling) {
		if (sibling.nodeType !== 1 || sibling === elem) continue;
		siblings.push(sibling);
	}
	return siblings;
};
```

You would use it like this:

```javascript
var elem = document.querySelector('#some-element');
var siblings = getSiblings(elem);
```

You can also [download this helper function on GitHub](https://github.com/cferdinandi/getSiblings).