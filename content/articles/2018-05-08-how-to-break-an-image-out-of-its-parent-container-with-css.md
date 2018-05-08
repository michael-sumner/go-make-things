---
title: "How to break an image out of its parent container with CSS"
date: 2018-05-08T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
---

I have argued on several occasions that [too many JavaScript developers don't know CSS well enough](https://gomakethings.com/whats-wrong-with-css-in-js/#tl-dr), causing us to turn to JS for solutions that are better handled with CSS.

With that in mind, today I wanted to show you a technique for breaking an image out of it's parent container using only CSS.

## Breaking what now?

Let's say you have a layout with a column of content that's centered on the page, with some white space on either size.

Maybe there's a max width of `40em`, and you use responsive image techniques to dynamically resize the images to fit the container as well.

```css
body {
	margin-left: auto;
	margin-right: auto;
	max-width: 40em;
	width: 88%;
}

img {
	height: auto;
	max-width: 100%;
}
```

[Here's an example.](https://jsfiddle.net/cferdinandi/206d6e3w/)

That's great, but what if you wanted one of those images to span the full width of the page?

You *could* use some `div` elements with classes to create container areas, but that can make your markup start to get complicated. Maybe there's an easier way.

## The `.full-width` class

This trick comes courtesy of [CSS expert Una Kravets](https://twitter.com/una/status/951519740840873984?s=21).

A simple utility class, `.full-width`, will break the image out of it's parent container using some negative margins, relative positioning, and the viewport width (`vw`) unit of measure.

```css
.full-width {
	left: 50%;
	margin-left: -50vw;
	margin-right: -50vw;
	max-width: 100vw;
	position: relative;
	right: 50%;
	width: 100vw;
}
```

Add it to your image, and the CSS handles the rest.

```html
<img class="full-width" src="https://source.unsplash.com/random/1200x400">
```

[Here's a demo of it in action.](https://jsfiddle.net/cferdinandi/206d6e3w/2/)

## Browser Compatibility

This technique works in [all browsers that support the `vw` unit](https://caniuse.com/#feat=viewport-units), so... all modern browsers, and IE11 and up.