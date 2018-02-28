---
title: "Sharing richer breakpoint data between CSS and JavaScript"
date: 2018-02-28T10:30:00-05:00
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
---

Yesterday, we looked at [how to pass info about the current CSS breakpoint into your JavaScript](/the-easy-way-to-manage-css-breakpoints-in-javascript/).

My buddy [Tommy Hodgins](https://tomhodgins.com/) spends a lot of time exploring the interaction between CSS and JavaScript, and pointed out a limitation of the approach: your media queries may cover several use cases at the same time.

For example, you may have a narrow viewport, but one that's also tall (for example, a tablet in portrait), and you may handle that differently than a narrow, short viewport (like a desktop monitor).

Today, let's look at how to provide a richer set of information about your CSS environment in your JavaScript.

## The obvious way

The most obvious way is to use the cascade and CSS specificity to provide more detailed namespaces.

```css
/**
 * @section Breakpoints
 * These values will not show up in content, but can be queried by JavaScript to know which breakpoint is active. Add or remove as many breakpoints as you like.
 */

body:before {
	content: "small";
	display: none;
	visibility: hidden;
}

@media (min-width: 40em) {
	body:before {
		content: "medium";
	}
}

@media (min-width: 40em) and (min-height: 30em) {
	body:before {
		content: "medium-tall";
	}
}
```

This is fine for simple use cases, but you can probably imagine how quickly this could become a big mess as the number of conditionals you need to check grows.

What we need is a way to pass in multiples pieces of information independently.

## Height and width separately

Currently, we're adding the breakpoint namespace as `content` on the `:before` pseudo-selector.

One approach could be to use the `:before` pseudo-selector for the width namespace, and the `:after` pseudo-selector for height.

```css
body:before,
body:after {
	display: none;
	visibility: hidden;
}

body:before {
	content: "small";
}

body:after {
	content: "short";
}

@media (min-width: 40em) {
	body:before {
		content: "medium";
	}
}

@media (min-height: 20em) {
	body:before {
		content: "medium";
	}
}

@media (min-height: 40em) {
	body:before {
		content: "tall";
	}
}
```

[Building on our JavaScript from yesterday](/the-easy-way-to-manage-css-breakpoints-in-javascript/), we'll setup the `breakpoint` variable as an object instead of a string, with `height` and `width` keys.

In our `getBreakpoint()` method, we'll return an object instead of a string, using the same `getComputedStyle()` method to target the `:after` selector on the `document.body`.

```js
// Setup the breakpoint variable
var breakpoint = {
	height: null,
	width: null
};

// Get the current breakpoint
var getBreakpoint = function () {
	return {
		height: window.getComputedStyle(document.body, ':before').content.replace(/\"/g, ''),
		width: window.getComputedStyle(document.body, ':after').content.replace(/\"/g, '')
	};
};

// Calculate breakpoint on page load
breakpoint = getBreakpoint();

// Recalculate breakpoint on resize
window.addEventListener('resize', function () {
	breakpoint = getBreakpoint();
}, false);
```

[Here's a demo.](https://jsfiddle.net/cferdinandi/aybsatsn/4/)

## Accessing more data with CSS variables

This technique comes courtesy of [Tommy Hodgins](https://tomhodgins.com/).

If you want to pass along more detailed information (such as the active media type), you could also use CSS variables.

```css
:root{
	--breakpoint-width: "small";
	--breakpoint-height: "short";
	--breakpoint-media: "computer";
}

@media (min-width: 40em) {
	:root{
		--breakpoint-width: "medium";
	}
}

@media (min-height: 20em) {
	:root{
		--breakpoint-height: "medium";
	}
}

@media tv {
	:root{
		--breakpoint-media: "tv";
	}
}
```

To access these in JavaScript, we'll again use `getComputedStyle()`. We only need to pass in the `document.body`, and we can use `getPropertyValue()` to get our CSS variables.

```js
// Setup the breakpoint variable
var breakpoint = {
	height: null,
	width: null,
	media: null
};

// Get the current breakpoint
var getBreakpoint = function () {
	return {
		height: window.getComputedStyle(document.body).getPropertyValue('--breakpoint-height').replace(/\"/g, ''),
		width: window.getComputedStyle(document.body).getPropertyValue('--breakpoint-width').replace(/\"/g, ''),
		media: window.getComputedStyle(document.body).getPropertyValue('--breakpoint-media').replace(/\"/g, '')
	};
};

// Calculate breakpoint on page load
breakpoint = getBreakpoint();

// Recalculate breakpoint on resize
window.addEventListener('resize', function () {
	breakpoint = getBreakpoint();
}, false);
```

[Here's a demo of this technique in action.](https://jsfiddle.net/cferdinandi/t5oxpLar/6/)

Keep in mind, support for CSS variables is [good but not great](https://caniuse.com/#feat=css-variables), so the usefulness of this approach may be a bit limited.

## Should you use these approaches?

At some point, [just using the `matchMedia()` method](/a-better-way-to-test-breakpoints-with-vanilla-javascript/) is easier.

But, if you have some breakpoints that you need to share more easily with your JavaScript, you have options.