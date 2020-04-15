---
title: "You should treat browser support differently for CSS and JavaScript"
date: 2018-08-13T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Browser support comes up quite a bit with my students.

> - Do I *really* need to support IE9?
> - What about IE11?
> - Should I use polyfills for older browsers or just not the code?
> - If I'm supporting IE9 and up, does that mean I can't use things like flexbox, which starts at IE11?

This stuff is confusing. And it can *feel* complicated.

Today, I want to share a simple approach I use to make browser support a lot less painful.

## Setting expectations

I let clients know up-front that their websites and web apps will *not* look the same in all browsers. That's *literally impossible* today, given the wide range of screen sizes and device capabilities.

I also let them know that **I support all browsers, but optimize for IE11 and above**.

[Brad Frost once said](http://bradfrost.com/blog/mobile/support-vs-optimization/) (I'm paraphrasing):

> Support is not the same as optimization.

I want my people to be able to *use* my site on literally any device or browser. That's support. I provide the best experience for IE11 and up. That's optimization.

So what does that look like in practice?

## Support vs. Optimization

Support means that content is always accessible. Optimization means that it gets nicer layouts, add-on features, and interactivity.

For example, lets say I have a site with accordion content.

By default, all of that content is visible to everyone. After the script that powers the accordion loads, if the browser supports features like `addEventListener()` and `querySelector()`, I hide the content, transforming it into an accordion that's visible when they click things.

```html
<h2>Some Heading</h2>
<div class="accordion">
	Some content...
</div>
```

```js
var accordion = function () {

	// Check for browser support
	var supports = 'addEventListener()' in window && 'querySelector' in document;
	if (!supports) return;

	// Hide the accordion content
	document.documentElement.className += ' accordion-loaded';

	// The rest of my script...

};
```

```css
.accordion-loaded .accordion {
	display: none;
	visibility: hidden;
}
```

If I have content behind a modal window, I might include that as visible content down in the footer that gets hidden after the script loads and runs. Or I might have it live on another page as a standalone HTML page, and use AJAX to get it and load it onto the current page.

That way if the JS doesn't work, the modal toggle is still a functional link that takes the visitor to content.

If the only way to get the content is with JS, I use polyfills (typically through a service like [polyfill.io](https://polyfill.io)) to push support back as far as I possibly can.

## What makes CSS different?

When a browser doesn't support a JavaScript method or API, things break.

Scripts stop running. Content doesn't display. It's the most fragile, unforgiving layer in the stack.

If a browser doesn't support, for example, flexbox, it just skips it and moves on. The content is still displayed, just without the fancy styling.

For me, that means that IE10 and lower might get a simple, single-column layout, while IE11 and up get the fancy multi-column version. I'm ok with that!

The content is still visible to everyone.

## A mental model to make this easier

The easiest way to start coding like this: start with nothing but HTML.

Put your markup in place, and then build on top of it.

Then ask yourself, can users always get to this content, even when things go wrong?