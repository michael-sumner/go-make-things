---
title: How to start an ordered list with a number other than one
date: 2022-06-24T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
---

This week, [Marcus Herrmann reminded me of one of my favorite HTML tricks](https://twitter.com/_marcusherrmann/status/1539918792964579328).

If you have an ordered list (`ol`) and want it to start with a number other than one, you can add the `start` attribute with the desired first number as its value.

```html
<ol start="4">
	<li>Merlin</li>
	<li>Ursula</li>
	<li>Radgast</li>
</ol>
```

The example above would start with the number four. [Here's a demo.](https://codepen.io/cferdinandi/pen/KKQOgmP)

This is particularly useful if you have a list split across a few columns and want to keep them consistently numbered. Here, the first `.column` would run from one to three, and the second would go from four to six.

```html
<div class="row">
	<div class="column">
		<ol>
			<li>Neville</li>
			<li>Hermione</li>
			<li>Cedric</li>
		</ol>
	</div>
	<div class="column">
		<ol start="4">
			<li>Merlin</li>
			<li>Ursula</li>
			<li>Radgast</li>
		</ol>
	</div>
</div>
```