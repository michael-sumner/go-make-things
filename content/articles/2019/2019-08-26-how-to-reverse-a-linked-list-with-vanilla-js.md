---
title: "How to reverse a linked list with vanilla JS"
date: 2019-08-26T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Late last week, I saw a tweet about a technical interview question making the rounds on the Twitter.

> How would you reverse a linked list?

Let's say you had a list of items like this.

```html
<ol id="wizards">
	<li><a href="#hermione">Hermione</a></li>
	<li><a href="#harry">Harry Potter</a></li>
	<li><a href="#neville">Neville</a></li>
	<li><a href="#dumbledore">Dumbledore</a></li>
</ol>
```

How would you reverse the order of that list so that Dumbeldore was first and Hermione was last?

Today, let's look at how I would approach this with vanilla JS.

*__Update:__ apparently, what I think of as a linked list is not what people with computer science backgrounds think of. [A linked list in CS is a way of structuring data](https://code.tutsplus.com/articles/data-structures-with-javascript-singly-linked-list-and-doubly-linked-list--cms-23392), and is almost certainly what the interview question is about.*

## Getting all of the list items

First, let's use `querySelectorAll()` to get every list item in our list.

```js
var items = document.querySelectorAll('#wizards li');
```

Next, we want to loop through each item and move it.

The simplest way to do that is with a `forEach()` loop. The `querySelectorAll()` returns a NodeList, and not all browsers have a `NodeList.forEach()` method. You can [polyfill it](https://vanillajstoolkit.com/polyfills/nodelistforeach/), or [convert the NodeList into an Array](/using-array-methods-with-nodelists-in-vanilla-js/) so that you can use the `Array.forEach()` method instead.

Let's convert our NodeList with `Array.prototype.slice.call()`.

```js
var items = Array.prototype.slice.call(document.querySelectorAll('#wizards li'));
```

Now, we can loop through each item.

```js
items.forEach(function (item) {
	// Move it...
});
```

## Reordering the items

Reordering them is deceivingly simple. We can use the `Node.insertBefore()` method to move each item to the top of the list.

The `insertBefore()` method is called on the parent element. You pass in the item you want to insert, and the item you want to insert it before.

The `item.parentNode` is the list element itself. The `firstChild` property will return the current first element in the list, which we can pass in as our second argument.

```js
items.forEach(function (item) {
	item.parentNode.insertBefore(item, item.parentNode.firstChild);
});
```

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/XWrMBzZ)

## What's happening here?

There's a little trick happening with `insertBefore()`: if the item is already in the DOM, it's not copied&mdash;it's removed from it's current spot and placed in a new location in the DOM.

As we loop through each item, we can move it to the top of the list, effectively reversing the order of the list.

On the first loop, the list looks exactly the same, because the first item is placed before itself.

```html
<ol id="wizards">
	<li><a href="#hermione">Hermione</a></li>
	<li><a href="#harry">Harry Potter</a></li>
	<li><a href="#neville">Neville</a></li>
	<li><a href="#dumbledore">Dumbledore</a></li>
</ol>
```

On the second loop, `Harry Potter` is moved up to the top.

```html
<ol id="wizards">
	<li><a href="#harry">Harry Potter</a></li>
	<li><a href="#hermione">Hermione</a></li>
	<li><a href="#neville">Neville</a></li>
	<li><a href="#dumbledore">Dumbledore</a></li>
</ol>
```

On the third loop, `Neville` is placed above `Harry Potter`.

```html
<ol id="wizards">
	<li><a href="#neville">Neville</a></li>
	<li><a href="#harry">Harry Potter</a></li>
	<li><a href="#hermione">Hermione</a></li>
	<li><a href="#dumbledore">Dumbledore</a></li>
</ol>
```

Finally, on the last loop, `Dumblebore` is moved to the top.

```html
<ol id="wizards">
	<li><a href="#dumbledore">Dumbledore</a></li>
	<li><a href="#neville">Neville</a></li>
	<li><a href="#harry">Harry Potter</a></li>
	<li><a href="#hermione">Hermione</a></li>
</ol>
```