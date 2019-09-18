---
title: "Javascript-free dropdown menus"
date: 2019-03-21T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

*__HEY!__ [This implementation is NOT recommended.](/i-was-wrong-about-javascript-free-dropdowns/) It has some accessibility issues I was not aware of when I wrote it.*

Last month, we looked at [how to build accordions without JavaScript](/javascript-free-accordions/) using the native `<details>` and `<summary>` elements.

Today, I wanted to show you how you can use those same elements to create JavaScript-free dropdown menus.

## A starting point

Let's start with a basic navigation navigation menu.

```html
<nav>
	<ul class="my-nav">
		<li><a href="#dropdown">This should have a dropdown</a></li>
		<li><a href="#hello">Hello</a></li>
		<li><a href="#world">World</a></li>
	</ul>
</nav>
```

We've made the list is an inline nav using this CSS.

```css
.my-nav {
	list-style: none;
	margin-left: -0.5em;
	margin-right: -0.5em;
	padding: 0;
}

.my-nav > li {
	display: block;
	margin-left: 0.5em;
	margin-right: 0.5em;
}

@media (min-width: 40em) {
	.my-nav > li {
		display: inline-block;
	}
}

/**
 * @bugfix Prevent webkit from removing list semantics
 * 1. Add a non-breaking space
 * 2. Make sure it doesn't mess up the DOM flow
 */
.my-nav > li:before {
	content: "\200B"; /* 1 */
	position: absolute; /* 2 */
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/bZQBEW)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="result" data-user="cferdinandi" data-slug-hash="bZQBEW" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Basic Nav Menu"></p>

## Adding a dropdown

To get started, let's replace the dropdown link:

```html
<a href="#dropdown">This should have a dropdown</a>
```

With a `<details>` and `<summary>` element. We'll also add a list of items under it.

For good measure, we'll add the `.dropdown` class to the `<details>` element.

```html
<nav>
	<ul class="my-nav">
		<li>
			<details class="dropdown">
				<summary>This has dropdown items</summary>
				<ul>
					<li><a href="#hi">Hi</a></li>
					<li><a href="#universe">Universe</a></li>
				</ul>
			</details>
		</li>
		<li><a href="#hello">Hello</a></li>
		<li><a href="#world">World</a></li>
	</ul>
</nav>
```

Now, we have basic show/hide functionality. [Here's an updated demo.](https://codepen.io/cferdinandi/pen/qvQqqe)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="result" data-user="cferdinandi" data-slug-hash="qvQqqe" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Dropdown Menu with &amp;lt;details&amp;gt;"></p>

As you can see, it works, but it doesn't look good and messes up the formatting of the other items.

## Styling the dropdown

To fix this, let's add a little bit of style.

First, we'll make sure the `<summary>` element looks like a clickable item by styling it blue like our links and displaying a pointer.

We'll make the `.dropdown` element itself `inline-block`, and give it relative positioning. This will allow us to position the content underneath it like a dropdown.

```css
/**
 * Style the clickable text
 * Add your own styles to match other navigation items
 */
.dropdown > summary {
	cursor: pointer;
	/* Customize from here down */
	color: blue;
}

/**
 * Position the dropdown content
 */
.dropdown {
	display: inline-block;
	position: relative;
}
```

Now we can style the dropdown list itself.

We'll give it a background and border so it looks like a box. We'll also add a `min-width` so it's not too small.

And most importantly, we'll give it absolute positioning, and tuck it just below the `.dropdown` so that it looks like a property dropdown menu. We'll also add a `z-index` of `999` so that it sits on top of other elements instead of getting covered up.

```css
/**
 * Style the dropdown list
 */
.dropdown > ul {
	background-color: #ffffff;
	border: 1px solid #cccccc;
	border-radius: 0.25em;
	min-width: 19em;
	position: absolute;
	top: 1.5em;
	z-index: 999;
}
```

This is great, but the list itself still has bullets. We should also add `list-style: none`. [This requires us to also add a bug fix for webkit browsers](https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html), that remove list semantics used by assistive technology.

```css
/**
 * Style the dropdown list
 */
.dropdown > ul {
	background-color: #ffffff;
	border: 1px solid #cccccc;
	border-radius: 0.25em;
	list-style: none;
	margin: 0;
	padding: 0;
	min-width: 19em;
	position: absolute;
	top: 1.5em;
	z-index: 999;
}

/**
 * @bugfix Prevent webkit from removing list semantics
 * 1. Add a non-breaking space
 * 2. Make sure it doesn't mess up the DOM flow
 */
.dropdown > ul > li:before {
	content: "\200B"; /* 1 */
	position: absolute; /* 2 */
}
```

[Here's a demo with the styling in place.](https://codepen.io/cferdinandi/pen/ywQVpx)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="result" data-user="cferdinandi" data-slug-hash="ywQVpx" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Dropdown Menu with &amp;lt;details&amp;gt; and styling"></p>

## Browser compatibility

The `<details>` element has no support in IE or Edge. In those browsers, the dropdown content will just always be visible.

Edge is moving to blink, and will therefore add support this in the future. [There’s also a polyfill.](https://github.com/javan/details-element-polyfill)