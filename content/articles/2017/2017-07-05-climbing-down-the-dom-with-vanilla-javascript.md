---
categories:
- Code
- JavaScript
date: '2017-07-05'
url: /climbing-down-the-dom-with-vanilla-javascript/
title: Climbing down the DOM with vanilla JavaScript
---

A few weeks ago, I published a series of articles on how to [climb up the DOM](/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/) and [get elements](/how-to-get-all-parent-elements-with-vanilla-javascript/) with [specific selectors](/climbing-up-the-dom-until-you-hit-a-match-with-vanilla-javascript/) using vanilla JavaScript.

On Twitter, [Kabolobari asked me how to climb *down* the DOM](https://twitter.com/Kabolobari/status/877579377503985664).

Climbing down the DOM with vanilla JavaScript is much easier than climbing up. Let's look at how to do it!

## Matching by selector

The `querySelector()` and `querySelectorAll` methods are typically used on the document to get all matching elements on a page.

```javascript
var elem = document.querySelectorAll('.some-selector');
```

But, you can also use them to search *within* a particular element rather than just the whole document. You can, for example, find an element with the `.pick-me` class, and then search within that element to find another element with the `.and-me` class.

```javascript
var pickMe = document.querySelector('.pick-me');
var andMe = pickMe.querySelector('.and-me');
```

This will only look for `.and-me` inside your `.pick-me` element.

You can similarly use `querySelectorAll()` to get all matching elements inside the element.

```javascript
var pickMe = document.querySelector('.pick-me');
var meToo = pickMe.querySelectorAll('.me-too');
```

## Only match direct decendants

The `querySelector()` and `querySelectorAll` methods search within all sub-elements of the parent element.

```markup
<div class="parent">
	<div class="sub-element-1">...</div>
	<div class="sub-element-2">
		...
		<div class="sub-element-2a">...</div>
		<div class="sub-element-2b">...</div>
	</div>
	<div class="sub-element-3">...</div>
</div>
```

In the example above, if you used `querySelector()` or `querySelectorAll` on the `.parent` element, they would search all the way down into `.sub-element-2a` and `.sub-element-2b`.

If you only want to search direct descendants, you can use the `.childNodes` property.

```javascript
var parent = document.querySelector('.parent');
var directDecendants = parent.childNodes;
```

That would only return `.sub-element-1`, `.sub-element-2`, and `.sub-element-3`.