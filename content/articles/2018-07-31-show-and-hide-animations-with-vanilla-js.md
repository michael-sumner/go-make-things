---
title: "Show and hide animations with vanilla js"
date: 2018-07-31T10:30:00-04:00
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

Last week, reader [Kieran Barker](https://github.com/kieranbarker) asked:

> I was wondering, have you ever written about making vanilla JS animations? To be honest, I’ve no idea how to approach functionality like jQuery’s `slideUp()`, `slideDown()`, `fadeIn()`, or `fadeOut()` methods. Maybe I’m over-complicating it. 😛

This is actually something you can handle today using (mostly) CSS. To trigger the animation, you would toggle a class on or off of the element you want to slide, fade, etc.

My favorite resource for this is [animate.css](https://github.com/daneden/animate.css), an amazing open source collection of CSS animations from Daniel Eden.

First, link to the CDN for the project. It's 3.8kb minified and gzipped, but you can cherry pick just the stuff you want out of it to cut down on bandwidth.

```html
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
```

Let's say I had a heading that I wanted to slide down and fade in when the user clicks a button.

```html
<h1 id="elem">Animate</h1>

<button class="show">Show</button>
<button class="hide">Hide</button>
```

First, I'd add the `animated` class to the element, and the `[hidden]` attribute to hide it by default.

```html
<h1 id="elem" class="animated" hidden>Animate</h1>

<button class="show">Show</button>
<button class="hide">Hide</button>
```

Next, I'd cache the `#elem` element to a variable, and set up a click event listener on the DOM.

```js
var elem = document.querySelector('#elem');
document.addEventListener('click', function (event) {
	// Do something...
}, false);
```

If the clicked element (`event.target`) has the `.show` class (which we can check with the `matches()` method), I would use the `removeAttribute()` method to remove the `[hidden]` attribute, and `classList` to add animate.css's `.fadeInDown` class.

If the clicked element (`event.target`) has the `.hide` class, I'll add the `[hidden]` attribute back and remove the `.fadeInDown` class.

```js
var elem = document.querySelector('#elem');
document.addEventListener('click', function (event) {

	if (event.target.matches('.show')) {
		elem.removeAttribute('hidden');
		elem.classList.add('fadeInDown');
	}

	if (event.target.matches('.hide')) {
		elem.setAttribute('hidden', 'true');
		elem.classList.remove('fadeInDown');
	}

}, false);
```

[Here's a working demo.](https://codepen.io/cferdinandi/pen/PBQmdM)

<p data-height="265" data-theme-id="light" data-slug-hash="PBQmdM" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="CSS + Vanilla JS Animations" class="codepen"></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>