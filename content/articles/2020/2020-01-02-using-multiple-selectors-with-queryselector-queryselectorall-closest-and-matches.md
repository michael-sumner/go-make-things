---
title: "Using multiple selectors with querySelector(), querySelectorAll(), closest(), and matches()"
date: 2020-01-02T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The `document.querySelector()`, `document.querySelectorAll(`), `Element.closest()`, and `Element.matches()` methods all accept CSS selectors are their argument.

One thing people often don't realize is that you can pass in *any* valid CSS selector. That includes comma-separated selectors for targeting multiple different selectors.

For example, in CSS, if you wanted to add a `font-weight` of `bold` to both elements with the `.sandwich` class and `label` elements inside the `#contact` form, you would do this.

```css
.sandwich,
#contact label {
	font-weight: bold;
}
```

If you wanted to get the first of those elements on a page, you would pass them in as a comma-separated list into `querySelector()`.

```js
var sandwichOrLabel = document.querySelector('.sandwich, #contact label');
```

The selector follows the same pattern as CSS.

```js
// Get's any element with the .sandwich class, and all labels inside the #contact element
var elems = document.querySelectorAll('.sandwich, #contact label');

// Checks if the element has the .sandwich class or is a label in the #contact element
if (element.matches('.sandwich, #contact label')) {
	// Do stuff...
}

// Checks if the element is in an element with the .sandwich class or a label in the #contact element
if (elem.closest('.sandwich, #contact label')) {
	// Do stuff...
}
```

This works with any JavaScript method that access a CSS selector as it's argument. It *doesn't* work with things like `getElementById()` or `getElementsByTagName()`, because you're only passing in the *value* and not a selector.