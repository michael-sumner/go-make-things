---
title: Three simple ways to get and set CSS properties with vanilla JavaScript
date: 2022-01-18T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
---

In today's article, we're going to look at three different techniques you can use to get and set CSS properties with vanilla JS.

Let's dig in!

## A quick note on case

Vanilla JavaScript uses camelCased versions of the properties you would use in CSS.

For example, `background-image` in CSS is `backgroundImage` in JavaScript. The `font-weight` property in CSS is `fontWeight` in JavaScript.

[The Mozilla Developer Network provides a comprehensive list of available attributes and their JavaScript counterparts.](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)

## The `Element.style` property

You can get and set inline styles for an element with the `Element.style` property.

The `Element.style` property is a read-only object. You can get and set individual style properties on it using camelCase style names as properties on the `Element.style` object.

```html
<p id="sandwich" style="background-color: green; color: white;">
	Sandwich
</p>
```

```js
let sandwich = document.querySelector('#sandwich');

// Get a style
// If this style is not set as an inline style directly on the element, it returns an empty string
let bgColor = sandwich.style.backgroundColor; // this will return "green"
let fontWeight = sandwich.style.fontWeight; // this will return ""

// Set the background-color style property
sandwich.style.backgroundColor = 'purple';
```

You can also _get and set_ a string representation of the entire inline `style` property on the element itself with the `Element.style.cssText` property.

```js
// Get the styles on an element
// returns "background-color: green; color: white;"
let styles = sandwich.style.cssText;

// Completely replace the inline styles on an element
sandwich.style.cssText = 'font-size: 2em; font-weight: bold;';

// Add additional styles
sandwich.style.cssText += 'color: purple;';
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/OJxGPRK)

## The `window.getComputedStyle()` method

The `window.getComputedStyle()` method gets the actual computed style of an element. This factors in browser default styles as well as external stylesheets being used on the page.

```js
let sandwich = document.querySelector('#sandwich');
let bgColor = window.getComputedStyle(sandwich).backgroundColor;
```

This is _read only_, and can't be used to actually modify styles on an element.

[Here's another demo.](https://codepen.io/cferdinandi/pen/gOGybLJ?editors=1111)

## Adding a styles to the document

The `Element.style` property is useful for adding inline styles to specific elements. 

But what if you want to add styles to _all elements_ that match a specific selector? You _could_ loop through each matching element and add styles using the `Element.style` property.

```js
let wizards = document.querySelectorAll('.wizard');

for (let wizard of wizards) {
	wizard.style.backgroundColor = 'rebeccapurple';
	wizard.style.color = 'white';
}
```

Or, you can add CSS directly to the document by creating a `style` element and appending it into the DOM.

First, create a `style` element using the `document.createElement()` method. Then, add your CSS to it using the `Element.textContent` property.

Finally, you can inject it into the document using the `Element.append()` method. I like to append into the `document.head`, but `document.body` works, too.

```js
let style = document.createElement('style');
style.textContent =
	`.wizard {
		background-color: rebeccapurple;
		color: white;
	}`;
document.head.append(style);
```

[Here's one last demo.](https://codepen.io/cferdinandi/pen/RwLONVd)