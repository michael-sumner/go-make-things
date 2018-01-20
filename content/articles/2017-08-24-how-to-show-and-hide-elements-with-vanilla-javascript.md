---
categories:
- Code
- CSS
- JavaScript
date: '2017-08-24'
permalink: /how-to-show-and-hide-elements-with-vanilla-javascript/
title: How to show and hide elements with vanilla JavaScript
url: /2017/08/24/how-to-show-and-hide-elements-with-vanilla-javascript
---

This week in my private Vanilla JS Slack channel (available to people who purchase [one of my pocket guides](/guides/)), one of my students asked me how to replicate jQuery's `show()`, `hide()`, and `toggle()` methods with vanilla JavaScript.

Showing and hiding elements with vanilla JS is pretty straightforward. Adding transition effects like the one's jQuery supports is a little bit harder.

Today, let's look at how to write simple show/hide methods. Tomorrow, we'll cover how to add transition animations.

## Simple Show and Hide

jQuery's `show()`, `hide()`, and `toggle()` methods use [inline CSS](/two-ways-to-set-an-elements-css-with-vanilla-javascript/) to change the `display` property of an element.

As we learned yesterday, that's easy to do with the `style` property.

```javascript
// Show an element
var show = function (elem) {
	elem.style.display = 'block';
};

// Hide an element
var hide = function (elem) {
	elem.style.display = 'none';
};

// Toggle element visibility
var toggle = function (elem) {

	// If the element is visible, hide it
	if (window.getComputedStyle(elem).display === 'block') {
		hide(elem);
		return;
	}

	// Otherwise, show it
	show(elem);

};
```

[Here's a live demo.](https://jsfiddle.net/cferdinandi/qgpxvhhb/5/)

You'll notice that we're using `getComputedStyle()`, which [we learned about the other day](/getting-an-elements-css-attributes-with-vanilla-javascript/), to check if an element is visible.

We could also just check it's `style` property, but the element could be hidden via some other CSS (an external stylesheet, for example) besides an inline style.

## Using a class instead of inline styles

While inline CSS works, I prefer to use a class to control behavior like this. It gives you more control, and is faster for the browser to render.

You can name the class anything you want, but for our purposes, we'll use `.is-visible`.

The `classList` set of methods let us add, remove, and toggle classes, so this approach requires no logic. The browser does all of the heavy lifting for us.

```javascript
// Show an element
var show = function (elem) {
	elem.classList.add('is-visible');
};

// Hide an element
var hide = function (elem) {
	elem.classList.remove('is-visible');
};

// Toggle element visibility
var toggle = function (elem) {
	elem.classList.toggle('is-visible');
};
```

We also need to add some CSS to control our content visibility.

```css
.toggle-content {
	display: none;
}

.toggle-content.is-visible {
	display: block;
}
```

[Here's a demo using classes to toggle visibility.](https://jsfiddle.net/cferdinandi/qgpxvhhb/6/)

The nice thing about this approach is that you can easily set the default visibility of an element. Use the `.is-visible` class to make it visible by default. Leave it off to hide it.

```markup
<div class="toggle-content is-visible">Visible by default.</div>

<div class="toggle-content">Hidden by default.</div>
```