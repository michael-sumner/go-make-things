---
title: "Detecting click events on SVGs with vanilla JS event delegation"
date: 2019-08-05T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
---

[I'm a big fan of event delegation.](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/)

Let’s say wanted to listen to clicks on every element with the `.sandwich` class. Instead of attaching event listeners to every element with that class, you can listen for all clicks on the document, and ignore ones that are made on elements without the class.

```js
document.addEventListener('click', function (event) {
	if (!event.target.matches('.sandwich')) return;
	console.log(event.target);
}, false);
```

This approach is actually more performant even though it feels like it shouldn't be.

Each event listener that you attach to an element takes up space in the browser's memory. This approach reduces the number of listeners, even though you're catching more events.

## The problem with SVGs

Let's say you had a user menu toggle represented by a button.

```html
<button class="click-me">
	User Menu
</button>
```

You could listen for clicks to that button and surface the menu like this.

```js
document.addEventListener('click', function (event) {
	if (!event.target.matches('.click-me')) return;
	console.log(event.target);
}, false);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/gVXEXb)

But what if you wanted to use an SVG icon instead of text?

```html
<button class="click-me">
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 800 800" aria-describedby="menu-title">
		<title id="menu-title">User Menu</title>
		<path fill="currentColor" d="M725 0H75C33.75 0 0 33.75 0 75v450c0 41.25 33.75 75 75 75h125v200l240-200h285c41.25 0 75-33.75 75-75V75c0-41.25-33.75-75-75-75zM400 100.258c55.086 0 99.742 44.656 99.742 99.742S455.086 299.742 400 299.742 300.258 255.086 300.258 200s44.656-99.742 99.742-99.742zM550 500H250v-50c0-55.231 44.772-100 100-100h100c55.231 0 100 44.769 100 100v50z"/>
	</svg>
</button>
```

Our event listener stops working. [Here's another demo.](https://codepen.io/cferdinandi/pen/oKoVoV)

## What's happening here?

An SVG is an HTML object, with nested items inside it.

When you click on the SVG, the `event.target` is no longer the `button.click-me` element, but the `path` inside the SVG or the `svg` element itself. As a result, `event.target.matches('.click-me')` fails and the function stops running.

[You can see that in action here.](https://codepen.io/cferdinandi/pen/WVXmKp)

## How to fix it

Fortunately, there are two easy ways to fix this.

1. Instead of checking if the clicked event matches a specific selector (with the `matches()` method), you can check if it occurred *within* a selector using the `closest()` method.
2. You can disable clicking on SVGs so that the event fires on the parent button instead of the SVG and it's child elements.

You don't need both of these techniques. Either one will work.

### 1. Listening for clicks *inside* an element

With this technique, you change `matches()` to `closest()` in your event listener.

This will fire if the clicked element matches the selector *or* has a parent that does.

```js
document.addEventListener('click', function (event) {
	if (!event.target.closest('.click-me')) return;
	console.log(event.target);
}, false);
```

This is my preferred approach. [You can see it in action here.](https://codepen.io/cferdinandi/pen/pMdYqp)

### 2. Disabling clicks on SVGs

Alternatively, you can disable click events on SVGs with some CSS. This ensures that the event will always fire on the parent `button.click-me` rather than the SVG.

```css
svg {
    pointer-events: none;
}
```

[Here's a demo of that technique.](https://codepen.io/cferdinandi/pen/oKoVoV)

## Browser Compatibility

The `closest()` method works in all modern browsers but not IE. Like `matches()`, it [requires a polyfill](https://vanillajstoolkit.com/polyfills/closest/).

The CSS technique works in all modern browsers and back to IE11.

While the CSS solution may seem simpler, I prefer `closest()`. It can be polyfilled further back, whereas the CSS solution cannot.