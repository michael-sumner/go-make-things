---
title: "Getting direct descendant elements by selector with vanilla JS"
date: 2018-10-31T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

## Using `querySelector()` and `querySelectorAll()`

You *technically can* use `querySelector()` and `querySelectorAll()` for this. The trick is a two-selector punch:

1. Use the direct descendant selector (`>`).
2. Use the `:scope` pseudo-class as the parent item.

The direct descendant CSS selector let's you target only direct descendants of an element.

```css
/**
 * These styles will only apply to .tuna elements directly under the #sandwich element
 * In the example markup above, it targets #one and #three
 */
#sandwich > .tuna {
	color: rebeccapurple;
	font-weight: bold;
}
```

You can easily use that in JavaScript with the example above like this.

```js
var tuna = document.querySelectorAll('#sandwich > .tuna');
```

That's fine for parents IDs, but what about situations where there may be more than one matching parent item?

```js
var tuna = document.querySelectorAll('.sandwiches > .tuna');
```

That's where the `:scope` selector comes in. It acts a proxy for whatever the element you're currently searching in is.

```js
// Get the #sandwich element
var sandwiches = document.querySelector('#sandwiches');

// Get direct descendant elements inside #sandwich with the .tuna class
// In this case :scope is the `sandwiches` variable (ie. the #sandwich element)
var tuna = sandwiches.querySelectorAll(':scope > .tuna');
```

**There's one big problem, though: this has bad browser support.**

It works in Firefox and Chrome, but has absolutely no IE *or* MS Edge support. So what else can we do?