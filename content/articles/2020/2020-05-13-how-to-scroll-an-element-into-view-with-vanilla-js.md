---
title: "How to scroll an element into view with vanilla JS"
date: 2020-05-13T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, I learned about the `Element.scrollIntoView()` method. You can use it to scroll an element that's not in the viewport into the viewport.

## How it works

Let's say you've got some markup like this.

```html
<p>Hi there!</p>
.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>
<p id="anchor">You made it! ⚓︎</p>
```

You can scroll down to the `#anchor` element using vanilla JS like this.

```js
var anchor = document.querySelector('#anchor');
anchor.scrollIntoView();
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/OJywOBx)

## Options

If you pass `true` into `scrollIntoView()`, it will align the element with the top of the page (the default if you do nothing). If you pass in `false`, it will scroll to the bottom of the page.

You can also pass in an object of options instead of a boolean.

```js
elem.scrollIntoView({
	behavior: 'auto|smooth', // Defines the transition animation. default: auto
	block: 'start|center|end|nearest', // Defines vertical alignment. default: start
	inline: 'start|center|end|nearest' // Defines horizontal alignment. default: nearest
});
```

And [if you use the `scroll-behavior: smooth` CSS property](/how-to-animate-scrolling-to-anchor-links-with-one-line-of-css/), the scroll will be animated, too.

## Browser compatibility

The `Element.scrollIntoView()` method works in all modern browsers, and back to IE8. In IE8 there are a few options that don't work, but it's fully featured from IE9 and above.