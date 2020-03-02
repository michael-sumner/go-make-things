---
title: "How to create a sticky navigation with only CSS"
date: 2020-03-02T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
---

Sticky navs are navigation components that *stick* to the top of the page as you scroll down.

For a long time, making the nav "stick" required using JavaScript to detect when the navigation was going to scroll past the top of the page, then adding a class to switch to `position: absolute`.

But today, you can use a simple CSS property to get the same effect. Let's look at how it works.

## `position: sticky`

The `position: sticky` property tells the browser to let an element scroll with the rest of the document until it reaches to the top of the page.

Once it does, it should *stick* there, and let the rest of the elements on the page scroll behind it.

```css
.sticky {
	position: -webkit-sticky;
	position: sticky;
	top: 0;
}
```

```html
<nav class="sticky">
	<ul>
		<li><a href="#a">Section A</a></li>
		<li><a href="#b">Section B</a></li>
		<li><a href="#c">Section C</a></li>
		<li><a href="#d">Section D</a></li>
	</ul>
</nav>
```

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/vYOZMRN)

I'm continually amazed at CSS's ability to replace complex JavaScript with one-liner properties. More of this please!

## Browser Compatibility

The `position: sticky` property works in all modern browsers, but cannot currently be used on `thead` or `tr` elements in Chrome or Edge (it does work on `th` elements, though).

It has no support in IE 11 and older and some more basic mobile browsers.

Some webkit browsers require the `-webkit-` prefix (`position: -webkit-sticky`), so you should always include it for the time being.