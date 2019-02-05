---
title: "Handling missing images with vanilla JS"
date: 2019-02-05T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today, I want to show you a quick little vanilla JS trick for replacing that default missing image icon your browser shows with a fallback image of your choice.

**The secret:** the `error` event and [event delegation](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/).

First, let's setup an event listener on the `document` for `error` events.

```js
document.addEventListener('error', function (event) {
	// Do something when there's an error...
}, true);
```

Next, we want to check if the element that triggered the event is an image. We'll check the `tagName` property of the `event.target`.

```js
document.addEventListener('error', function (event) {
	if (event.target.tagName.toLowerCase() !== 'img') return;
}, true);
```

Finally, if the element *is* an image, we can replace it's `src` property with our fallback image. We should probably also update the `alt` attribute.

```js
document.addEventListener('error', function (event) {
	if (event.target.tagName.toLowerCase() !== 'img') return;
	event.target.src = 'https://media.giphy.com/media/JAAot6yVvkHni/giphy.gif';
	event.target.alt = 'The real image is missing! This is a gif of WALL-E sitting on a bench.';
}, true);
```

[Here's a demo of this trick in action.](https://codepen.io/cferdinandi/pen/roWrzO)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="cferdinandi" data-slug-hash="roWrzO" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="roWrzO"></p>