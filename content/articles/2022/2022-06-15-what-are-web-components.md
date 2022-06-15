---
title: What are browser-native web components?
date: 2022-06-15T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

I just released [a new course and ebook on Web Components with Vanilla JS](https://vanillajsguides.com/web-components/).

(_If you already own my [complete set of courses](https://vanillajsguides.com/complete-set/) or [the expert bundle](https://vanillajsguides.com/expert-bundle/), this is a free upgrade you'll already see in your account._)

This week, I wanted to share an excerpt from the guide. Today, we'll be looking at what web components actually are, and why you might want to use them.

Let's dig in!

## What is a web component?

Web components are a set of browser APIs that you can use to create your own custom HTML elements.

Web components can include their own built-in styles and interactivity, and are protected from naming collisions or unintended interactions with other code.

For example, let's say you wanted to include a loading icon component in your web app.

You could create a `loading-icon` web component, and include it in your HTML as a custom element. You would also load a JavaScript file that defines your custom web component, its styles, and its functionality.

```html
<loading-icon></loading-icon>
<script src="loading-icon.js"></script>
```

Behind-the-scenes, the `loading-icon` element gets rendered into the UI as a set of styled `div` elements, an ARIA live region that displays the current status, and some built-in styles to make the loading icon spin.

```html
<style>
	/**
	 * Spinner Styles
	 */
	.loading-ring {...}
	.loading-ring div {...}
	.loading-ring div:nth-child(1) {...}
	.loading-ring div:nth-child(2) {...}
	.loading-ring div:nth-child(3) {...}
	@keyframes spin {...}

	/**
	* Visually hide an element, but leave it available for screen readers
	*/
	.visually-hidden {...}
</style>
<div class="visually-hidden" role="status">
	Waiting to load...
</div>
<div class="loading-ring">
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</div>
```

When the content is loaded, you can add a `loaded` attribute to the `loading-icon` element. The component will automatically remove the spinner and make an announcement for screen readers.

```javascript
let loading = document.querySelector('loading-icon');
loading.setAttribute('loaded', '');
```

The above would result in a UI that looks like this....

```html
<div class="visually-hidden" role="status">
	Content loaded
</div>
```

## Why use web components?

You don't _need_ web components to create a loading icon component... or any component, for that matter. So why use them?

First, they make it a lot more obvious what a component in your UI actually is. An element called `loading-icon` is a lot more obvious than a set of empty nested `div` elements with a `.loading-ring` class on it.

Depending on how your HTML is structured, it might not even be obvious at all that that ARIA live region goes with the spinner icon.

```html
<!-- This is clear -->
<loading-icon></loading-icon>

<!-- This is clunky -->
<div class="visually-hidden" role="status">
	Waiting to load...
</div>
<div class="loading-ring">
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</div>
```

If you're working with a team of developers or creating a design system, web components provide a handful of additional benefits, too.

First, because the web component generates all of the behind-the-scenes HTML, you don't need to worry about developers forgetting something important.

```html
<!-- This is the wrong class -->
<div class="loading-rings">
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</div>

<!-- This one is missing a div -->
<div class="loading-ring">
	<div></div>
	<div></div>
	<div></div>
</div>
```

If you fix a bug or update your component, you don't have to manually update a bunch of HTML everywhere the component is used. You only need to update the JavaScript.

For example, imagine that the original version of your loading icon component did _not_ include an ARIA live region to announce when the content was loaded to screen readers. You realize the mistake and update the component.

With a traditional HTML component, any developer who uses it will need to update their HTML, JavaScript, and CSS files to include the fix. With web components, they only have to update the JavaScript file.

```html
<!-- 
	No changes needed
	The component handles the HTML for you
-->
<loading-icon></loading-icon>

<!-- This is the only change needed -->
<script src="loading-icon.v2.js"></script>
```

With web components, the CSS, JavaScript, and behind-the-scenes HTML are all scoped and _encapsulated_.

This avoids one of the most common problems in team environments: naming collisions and unintended interactions.

If, for example, a developer already had a component with the `.loading-ring` class on it (and styles go along with it), it would break your loading icon component if it was implemented using plain old HTML, CSS, and JavaScript.

```css
.loading-ring {
	/* Some conflicting styles */
}
```

With web components, the styles in your component only apply to your component's HTML, and those elements aren't affected by outside styles. We'll learn more about how that all works in another section.

But to summarize quickly, the benefits of web components include...

- Clarity and readability
- A simpler and less error prone developer experience
- Ease of updating components
- Scoping and encapsulation

## What's next?

Tomorrow, we'll look at how to create a simple web component.

If you don't want to wait, or you want to dig even deeper into web components, [you can buy my new course here](https://vanillajsguides.com/web-components/).