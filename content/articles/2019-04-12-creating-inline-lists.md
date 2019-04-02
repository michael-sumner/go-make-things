---
title: "Creating inline lists"
date: 2019-04-12T10:30:00-04:00
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

Yesterday, we looked at [how to create unstyled lists with CSS](/creating-unstyled-lists/). Today, let's look at how to create inline lists.

## We're halfway there

We can actually take our code from yesterday, copy/paste it, and use it as a starting point.

Let's rename our class `.list-inline`.

```html
<ul class="list-inline">
	<li>Neville</li>
	<li>Hermione</li>
	<li>Harry Potter</li>
	<li>Dumbledore</li>
</ul>
```

```css
.list-inline {
	list-style: none;
	margin-left: 0;
	padding-left: 0;
}

/**
 * @bugfix Prevent webkit from removing list semantics
 * https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
 * 1. Add a non-breaking space
 * 2. Make sure it doesn't mess up the DOM flow
 */
.list-inline > li:before {
	content: "\200B"; /* 1 */
	position: absolute; /* 2 */
}
```

## Making the list "inline"

First, lets take the list items and make them `inline-block`.

```css
.list-inline > li {
	display: inline-block;
}
```

[Here's what that looks like.](https://codepen.io/cferdinandi/pen/ROPOqe)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="css,result" data-user="cferdinandi" data-slug-hash="ROPOqe" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Inline Lists"></p>

It's a good start, but we want more control over the spacing between each item.

Let's add a negative margin to the left and right of our list. I'm using half an `em`, but use whatever value you'd like.

```css
.list-inline {
	list-style: none;
	margin-left: -0.5em;
	margin-right: -0.5em;
	padding-left: 0;
}
```

Then, we'll add that same margin as a positive number to the left and right of our list items.

```css
.list-inline > li {
	display: inline-block;
	margin-left: 0.5em;
	margin-right: 0.5em;
}
```

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/qwdwvx)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="css,result" data-user="cferdinandi" data-slug-hash="qwdwvx" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Inline Lists with Spacing"></p>

To change the spacing, change that `0.5em` number in both places.