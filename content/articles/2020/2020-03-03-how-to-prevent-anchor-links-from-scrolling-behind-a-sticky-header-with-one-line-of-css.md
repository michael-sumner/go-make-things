---
title: "How to prevent anchor links from scrolling behind a sticky header with one line of CSS"
date: 2020-03-03T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
---

Yesterday, we looked at how to create sticky headers with the `position: sticky` CSS property.

One problem with sticky headers are anchor links. By default, they snap to the top of the document, behind the sticky navigation menu.

[You can see it yourself in this demo.](https://codepen.io/cferdinandi/pen/vYOZMRN)

Today, I want to talk about a CSS one-liner you can use to fix this.

## The `scroll-margin-top` property

The `scroll-margin-top` property lets you define a top margin that the browser should use when snapping a scrolled element into place.

In our demo, every anchored element also has a `.section` class on it.

```html
<article class="section" id="a">
	<h2>Section A</h2>
</article>
```

```css
.section {
	color: #ffffff;
	height: 75vh;
	margin: 0;
}
```

We'll add the `scroll-margin-top` property to it, and give it a value of `1em`.

```css
.section {
	color: #ffffff;
	height: 75vh;
	margin: 0;
	scroll-margin-top: 1em;
}
```

Now, when the browser jumps to the anchor link, it will leave a margin of `1em` at the top.

This margin *only applies* to scroll snapping. The element still has its normal margins within the context of the document.

[Here's a demo.](https://codepen.io/cferdinandi/pen/GRJvozN)

## Browser Compatibility

The `scroll-margin-top` property works in all modern browsers, but has no IE support.