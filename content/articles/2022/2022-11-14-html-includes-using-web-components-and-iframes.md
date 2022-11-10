---
title: HTML includes using web components and iframes
date: 2022-11-14T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

This article is part of a series on HTML includes. Last week, we looked at [how to include external HTML using iframes](/4-ways-to-include-external-content-in-your-html/), and [how to build a web component to fetch remote HTML](/html-includes-with-web-components/).

Today, we're going to combine the two techniques, [courtesy of Andy Bell](https://codepen.io/andybelldesign/project/full/DyVyPG).

We'll start with our custom `include-html` element.

```html
<include-html path="about.html">
	<a href="about.html">Learn more about me.</a>
</include-html>
```

Inside the `constructor()` for our web component class, we'll remove the `#getHTML()` method entirely.

Instead, we'll use the `Element.innerHTML` property to inject an `iframe` with our `path` as the `src`. We'll include [the `onload` technique](/4-ways-to-include-external-content-in-your-html/) to pop the `iframe` content out into the main document.

```js
/**
 * The class constructor object
 */
constructor () {

	// Always call super first in constructor
	super();

	// Get the source HTML to load
	let path = this.getAttribute('path');
	if (!path) return;

	// Render HTML
	this.innerHTML = `<iframe src="${path}" onload="this.before(...(this.contentWindow.document.body||this.contentWindow.document).children);this.remove()">`;

}
```

This provides us with an extra layer of resilience, and prevents use from having to make a `fetch()` call. We just work with what the browser already does.

You can [download the source code on GitHub](https://gist.github.com/cferdinandi/c73f0abcf931562041f1f650c15b97a0).

You'll need to run a web server to make this work, which you can do [using the command line](https://gist.github.com/willurd/5720255) or running [a GUI tool like MAMP](https://www.mamp.info/).

Tomorrow, we'll learn how to use includes using compilers.