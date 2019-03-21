---
title: "Only allowing one open dropdown at a time with the details element"
date: 2019-03-22T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
---

Yesterday, we looked at [how to use the `<details>` element to create JavaScript-free dropdown menus](/javascript-free-dropdown-menus/).

With that setup, each dropdown acts independently of the other. There's a good chance that when one dropdown opens, you want any open dropdowns to close so that they don't overlap with each other.

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
		<li>
			<details class="dropdown">
				<summary>Another dropdown</summary>
				<ul>
					<li><a href="#goodbye">Goodbye</a></li>
					<li><a href="#universe">Universe</a></li>
				</ul>
			</details>
		</li>
	</ul>
</nav>
```

[See how these two dropdowns overlap each other?](https://codepen.io/cferdinandi/pen/Oqabqz)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="result" data-user="cferdinandi" data-slug-hash="Oqabqz" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Conflicting dropdowns"></p>

Today, let's look at a super tiny bit of JavaScript you can use to close any open dropdowns when opening a new one.

## Quick Aside

If you're going to write JavaScript anyways, why not write your own custom dropdown menu instead?

A few reasons:

1. If our JavaScript fails, this native dropdown menu will still work, just with reduced functionality.
2. In browsers that don't support the `<details>` element, users can still access the content.
3. The native element handles accessibility concerns like keyboard interactions and focus management for you.
4. It's a *lot* less JavaScript than you'd have to write otherwise. Take the win!

## Listing for `toggle` events

First, we'll listen for a special event called `toggle` on the `.my-nav` navigation. This event fires on a `<details>` element when it's opened or closed.

This event doesn't bubble, so you'll need to set `useCapture` to `true`.

```js
var nav = document.querySelector('.my-nav');
nav.addEventListener('toggle', function (event) {
	// Do stuff...
}, true);
```

If the clicked element isn't `open`, we'll do nothing.

Otherwise, we'll get all of the open dropdowns in our `nav` element, and close them by removing the `[open]` attribute. We'll check that the item isn't the one we just opened first, though.

```js
var nav = document.querySelector('.my-nav');
nav.addEventListener('toggle', function (event) {

	// Only run if the dropdown is open
	if (!event.target.open) return;

	// Get all other open dropdowns and close them
	var dropdowns = nav.querySelectorAll('.dropdown[open]');
	Array.prototype.forEach.call(dropdowns, function (dropdown) {
		if (dropdown === event.target) return;
		dropdown.removeAttribute('open');
	});

}, true);
```

And that's it! [Here's the code in action.](https://codepen.io/cferdinandi/pen/RdqKaj)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="result" data-user="cferdinandi" data-slug-hash="RdqKaj" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Closing open dropdowns when opening a new one"></p>