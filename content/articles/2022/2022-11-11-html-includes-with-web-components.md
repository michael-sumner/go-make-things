---
title: HTML includes with web components
date: 2022-11-11T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

This article is part of a series on HTML includes. Yesterday, we looked at [how to include external HTML using iframes](/4-ways-to-include-external-content-in-your-html/) (it's cooler than it sounds!).

Today, we're looking at web components. Let's dig in!

## Creating a web component

[Web components are awesome!](/how-to-create-a-web-component-with-vanilla-js/) They provide hooks you can use to create a custom HTML element, and add built-in interactivity with JavaScript. 

For our purposes, let's create a custom element called `include-html`.

We'll give it a `path` property that points to our external HTML file.

```html
<include-html path="about.html"></include-html>
```

Next, we'll create an `IncludeHTML` JavaScript class for our web component.

We'll use the `customElement.define()` method to register the `include-html` element with our new `IncludeHTML` class.

```js
// Extend the HTMLElement class to create the web component
class IncludeHTML extends HTMLElement {
	// ...
}

// Define the new web component
if ('customElements' in window) {
	customElements.define('include-html', IncludeHTML);
}
```

In the `constructor()` for our class, we'll use the `Element.getAttribute()` method to get the `path` attribute value. Then, we'll pass it into [a private `#getHTML()` method](/private-class-features-in-vanilla-js-classes/) that will get and render the external content.

```js
// Extend the HTMLElement class to create the web component
class IncludeHTML extends HTMLElement {


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
		this.#getHTML(path);

	}

}
```

## Rendering external content

We'll make our `#getHTML()` method `async`, so that we can use the `await` operator.

In it, we'll use the `fetch()` method to `request` the HTML at the `path`. Then, we'll use the `Response.text()` method to get the HTML string from the response, and the `Element.innerHTML` property to render it into the UI.

```js
/**
 * Get and render external HTML
 * @param  {String} path The path to the external HTML
 */
async #getHTML (path) {

	// Get the page
	let request = await fetch(path);
	if (!request.ok) return;

	// Get the HTML
	this.innerHTML = await request.text();

}
```

Since this approach requires JavaScript to work, you might want to include a fallback link in the `include-html` element.

```html
<include-html path="about.html">
	<a href="about.html">Learn more about me.</a>
</include-html>
```

When the external content is loaded, it's automatically wiped out.

## What's next?

You can [download the source code on GitHub](https://gist.github.com/cferdinandi/5d3e1b49e8c70267e578b17ef4e2af83). 

You'll need to run a web server to make this work, which you can do [using the command line](https://gist.github.com/willurd/5720255) or running [a GUI tool like MAMP](https://www.mamp.info/).

Next week, we're going to look at how to combine this web component approach with [the iframe approach](/4-ways-to-include-external-content-in-your-html/). Then, we'll learn how to use includes using compilers.