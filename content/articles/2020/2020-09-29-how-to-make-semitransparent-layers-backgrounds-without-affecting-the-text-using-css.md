---
title: "How to make semitransparent layers backgrounds without affecting the text using CSS"
date: 2020-09-29T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
---

Let's say you have an image, [like this crab](https://unsplash.com/photos/V9ounv39B7k), and you want to put it behind some text in your UI.

```html
<div class="hero">
	<h1>This is a crab</h1>
	<p>I want an image of a crab behind this text.</p>
</div>
```

But, if you just put the image behind your text, the text might be hard to read, so you want to also add a darker, semi-transparent overlay on top of the image, but behind the text.

Today, let's look at how to do that with just CSS.

## Base styling

Here's some base styling for our element.

This adds a little bit of space on the top, bottom, and sides. It also aligns the text in the center of the element. Let's also give it a black background with white text.

```css
.hero {
	background-color: #000000;
	color: #ffffff;
	padding: 1em;
	text-align: center;
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/XWdwbpM)

Now, let's go ahead and add a background image.

## Adding a background image

In our CSS, we'll add a `background-image` property to add our image.

We'll also add `background-position` and `background-size` properties to center the image and make it fill up the whole container.

```css
.hero {
	background-color: #000000;
	background-image: url(https://images.unsplash.com/photo-1580841129862-bc2a2d113c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80);
	background-position: center;
	background-size: cover;
	color: #ffffff;
	padding: 1em;
	text-align: center;
}
```

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/dyMEoRK)

You might notice that some of the text is hard to read because of how it's positioned on top of the crab. This is an accessibility and usability issue.

Let's look at how to fix that.

## Adding an overlay

To fix this, we'll add a semi-transparent black overlay on top of our, below our text.

If you include multiple items with the `background-image` property, it will stack them, with the first listed item on top.

We're going to add a `linear-gradient` to our `background-image`. We'll use the `rgba()` color declaration, with `0, 0, 0` for black. Then, we'll use `0.7` for our *alpha* (how transparent to make it).

```css
.hero {
	background-color: #000000;
	background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1580841129862-bc2a2d113c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80);
	background-position: center;
	background-size: cover;
	color: #ffffff;
	padding: 1em;
	text-align: center;
}
```

[Here's a demo with the overlay.](https://codepen.io/cferdinandi/pen/VwaOLrG)

Now there's a semi-transparent overlay on top of the image, but below the text. The words are easier for sighted users to see, but you can still make out the background image underneath it.