---
title: The JavaScript selector methods that changed EVERYTHING
date: 2023-01-09T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to talk about the two JavaScript selector methods that changed everything: how they work, why they're awesome, and how they basically made all other approaches obsolete.

Let's dig in!

## The before times...

In the heyday of Internet Explorer, getting elements in the DOM used to be comically, absurdly hard!

Let's say you had a button like this, and you wanted to get it to do stuff with it with JavaScript...

```html
<button>Activate Me!</button>
```

If it had an ID on it (this one doesn't), you could use the `getElementById()` method.

```js
var btn = document.getElementById('my-button');
```

But with the current HTML, you'd have to use the `getElementsByTagName()` method, which returns [a live `HTMLCollection`](/static-versus-live-nodelists-and-htmlcollections-in-vanilla-javascript/) of elements. You could then loop through them to find the one you want or use the first one or whatever.

```js
// Get all buttons
var btns = document.getElementsByTagName('button');

// Use the first one
var btn = btns[0];
```

If you had multiple buttons and wanted to get the ones with a specific class? Forget it!

Now you're looping through each one with an old-school `for` loop, and using complex regex patterns to find the items you want. There's no `classList` API yet, so you're using the `className` property.

```js
// Get all buttons
var btns = document.getElementsByTagName('button');

// Create an array for buttons with a specific class
var btnsWithClass = [];

// Loop through all of the buttons
for (var i = 0; i < btns.length; i++) {

	// If the button has the .sandwich class, add it to the new array
	if (new RegExp('(^|\\s)sandwich(\\s|$)').test(btns[i].className)) {
		btnsWithClass.push(btns[i]);
	}

}
```

jQuery came to dominate the web development landscape in large part because it created a simple developer API for common tasks like this (and smoothed over browser inconsistencies).

Then, browsers finally started implementing jQuery-like features...

## The ultimate selector methods

If you weren't around for the before times, you may not realize just how came-changing the `querySelector()` and `querySelectorAll()` methods were.

Yes, they're a bit more verbose than I'd like. But they make all other selector methods obsolete, and easily do things that required huge amounts of effort and multiple steps before.

The two things that make these two methods so powerful are that...

1. You can pass in any valid CSS selector string (from a simple class or ID to a nested selector tree).
2. You can run them on any element, allowing you to search within a parent element.

Remember that button? Now you can find in the DOM _without an ID_.

```js
let btn = document.querySelector('button');
```

Want to get all buttons with the `.sandwich` class? Just pass it into `querySelectorAll()`.

```js
let btns = document.querySelectorAll('.sandwich');
```

Want to find all buttons with the `.sandwich` class _and_ the `[data-condiment="mayo"]` attribute inside the `#lunch` element? Piece of cake!

```js
let sammies = document.querySelectorAll('#lunch .sandwich[data-condiment="mayo"]');
```

You can even use pseudo-classes. Let's say you want to ignore buttons with the `.tuna` class. You can use the `:not()` pseudo-class in your selector string, like this...

```js
let notTuna = document.querySelectorAll('.sandwich:not(.tuna)');
```

You can even look for multiple selectors by separating them with a comma, just like you would in a CSS file.

Let's say you want to find all of the elements with a `.sandwich` or `.drink` class. You can do this...

```js
let lunch = document.querySelectorAll('.sandwich, .drink');
```

## So you _never_ use other selector methods?

Nope! Ok, well... sort of.

If I need to climb up the DOM tree, I use [the `Element.closest()` method](https://vanillajstoolkit.com/reference/traversal/element-closest/), and if I want to test an element I already have, I use [the `Element.matches()` method](https://vanillajstoolkit.com/reference/selectors/element-matches/).

But methods like `getElementById()` and `getElementByTagName()`? Yea, I don't ever use those. Why would I?

The `querySelector()` and `querySelectorAll()` methods do everything I need, and other than "one element or multiple ones," I never have to think about which method to choose.