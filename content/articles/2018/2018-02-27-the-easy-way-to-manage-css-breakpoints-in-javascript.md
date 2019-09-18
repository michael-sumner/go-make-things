---
title: "The easy way to manage CSS breakpoints in JavaScript"
date: 2018-02-27T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- JavaScript
---

Last week, I wrote about [how to test breakpoints in JavaScript](/a-better-way-to-test-breakpoints-with-vanilla-javascript/). It works great, but requires you to duplicate your CSS breakpoints in your JS.

Today, I wanted to share a simple trick you can use to dynamically import those CSS breakpoints into JavaScript to make managing things a lot easier.

## Importing CSS breakpoints into JavaScript

Three years ago, Mike Herchel from Lullabot wrote about [this cool technique for importing CSS breakpoints into JavaScript](https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript).

The article and [accompanying demo](https://codepen.io/mherchel/pen/gbygBd) used both jQuery and device-based breakpoint names (like `tablet`, `smartphone`, and `desktop`).

In this article, I'm going to update their approach to rely only on vanilla JavaScript and used more abstracted breakpoint names that are representative of the diverse device landscape that's emerged since Mike first wrote about this technique.

But full credit where credit is due: this is still Lullabot's technique and I'm just making a few tweaks to it.

## Using CSS to embed breakpoints in your HTML

The heart of this technique involves using CSS to add the name of the current breakpoint hidden in the markup.

This is done by setting the `body:before` pseudo-selector's `content` value, but hiding it from displaying.

```css
body:before {
	content: "xsmall";
	display: none;
	visibility: hidden;
}
```

Now, hidden in the markup, will be the value `xsmall`. We can add additional breakpoints with media queries.

I use a mobile-first approach to web development, starting with an extra small layout and building up to wider viewports with media queries. I use abstracted names like `small`, `medium`, and `large` to describing my layout widths.

```css
/**
 * @section Breakpoints
 * These values will not show up in content, but can be queried by JavaScript to know which breakpoint is active. Add or remove as many breakpoints as you like.
 */

body:before {
	content: "xsmall";
	display: none;
	visibility: hidden;
}

@media (min-width: 20em) {
	body:before {
		content: "small";
	}
}

@media (min-width: 40em) {
	body:before {
		content: "medium";
	}
}

@media (min-width: 60em) {
	body:before {
		content: "large";
	}
}

@media (min-width: 80em) {
	body:before {
		content: "xlarge";
	}
}
```

## Getting the current breakpoint with JavaScript

We can get the current breakpoint using the `getComputedStyle()` method.

This accepts two arguments: the element, and optionally, a pseudo-selector to use. We'll pass in the `document.body` and the `:before` selector.

It will return an object of properties. We want the `content` property value.

```js
// Get the current breakpoint
var getBreakpoint = function () {
	return window.getComputedStyle(document.body, ':before').content;
};
```

The returned string comes with double quotes around. We can use the `replace()` method to remove them.

```js
// Get the current breakpoint
var getBreakpoint = function () {
	return window.getComputedStyle(document.body, ':before').content.replace(/\"/g, '');
};
```

Now that we have a way to get the breakpoint, we can set it to a variable for use in our scripts.

We need to set this variable when the page initially loads. Any time the window is resized, we also need to recalculate it.

```js
// Setup the breakpoint variable
var breakpoint;

// Get the current breakpoint
var getBreakpoint = function () {
	return window.getComputedStyle(document.body, ':before').content.replace(/\"/g, '');
};

// Calculate breakpoint on page load
breakpoint = getBreakpoint();

// Recalculate breakpoint on resize
window.addEventListener('resize', function () {
	breakpoint = getBreakpoint();
}, false);
```

The example above is using a simple resizing event listener, but in production code you should [debounce your resize listener](/debouncing-events-with-requestanimationframe-for-better-performance/) for performance reasons.

Now you can do things with that `breakpoint` variable in your scripts.

```js
if (breakpoint === 'xsmall' || breakpoint === 'small') {
	console.log('Small viewport, yo!');
} else {
	console.log('Not so small!');
}
```

[Here's a demo you can play with.](https://jsfiddle.net/cferdinandi/5ofaa0Lk/6/)