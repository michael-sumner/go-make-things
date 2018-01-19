---
categories:
- Code
- CSS
- JavaScript
date: '2017-08-28'
permalink: /how-to-a-fade-in-to-vanilla-javascript-show-and-hide-methods/
title: How to a fade in to vanilla JavaScript show and hide methods
url: /2017/08/28/how-to-a-fade-in-to-vanilla-javascript-show-and-hide-methods
---

Last week, we [created some simple `show()` and `hide()` methods](/how-to-show-and-hide-elements-with-vanilla-javascript/), and [added a transition animation to them](/how-to-add-transition-animations-to-vanilla-javascript-show-and-hide-methods/).

One of my readers mentioned that adding a fade in effect would be a nice visual touch, so today, let's look at how to do that.

## It's all CSS

The good news is that this can be done entirely with CSS.

First, we'll add a default `opacity` of `0` to our `.toggle-content` class, and an `opacity` of `1` when the `.is-visible` class is included.

```lang-css
.toggle-content {
	display: none;
	height: 0;
  	opacity: 0;
	overflow: hidden;
	transition: height 350ms ease-in-out;
}

.toggle-content.is-visible {
	display: block;
	height: auto;
  	opacity: 1;
}
```

Next, let's add `opacity` to our transition. If we added another `transition`, it would override the first. Instead, we'll use a comma to add multiple transition effects.

```lang-css
.toggle-content {
	display: none;
	height: 0;
  	opacity: 0;
	overflow: hidden;
	transition: height 350ms ease-in-out, opacity 750ms ease-in-out;
}

.toggle-content.is-visible {
	display: block;
	height: auto;
  	opacity: 1;
}
```

You'll notice that the `opacity` animation is set to take longer than the one for `height`. If they're the same length, the change isn't visible, so we let it complete a little bit after the `height` is completed.

[Here's a demo.](https://jsfiddle.net/cferdinandi/qgpxvhhb/23/)
