---
title: "Listening for click events with vanilla JavaScript"
date: 2018-02-13T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

jQuery makes listening for click events really easy.

If you want to, for example, detect any time an element with the class `.click-me` is clicked, you would do this.

```js
$('.click-me').click(function (event) {

	// Don't follow the link
	event.preventDefault();

	// Log the clicked element in the console
	console.log(event.target);

});
```

Luckily, vanilla JavaScript makes it just as easy thanks to the `addEventListener()` method.

## The vanilla JS way to listen for click events

While you *can* listen for clicks on specific elements, my recommended approach is to listen for all clicks on the document, and then check if the clicked element has the selector you care about.

```js
document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.click-me')) return;

	// Don't follow the link
	event.preventDefault();

	// Log the clicked element in the console
	console.log(event.target);

}, false);
```

This approach is called *event delegation*, and it works by taking advantage of something called event bubbling.

When an element in the DOM is clicked, the event *bubbles* all the way up to the parent element (the `document` and then the `window`). This allows you to listen for events on the parent item and still detect clicks that happen inside it.

The `event.target` is always the element that was clicked (or for other event types, the element that triggered the event).

## Browser Compatibility

The `addEventListener()` works in IE9 and up. You can [push support back to IE6 with a polyfill](https://vanillajstoolkit.com/polyfills/addeventlistener/).

This event delegation approach used above also uses the `matches()` method, with was implemented inconsistently across browsers. You should [include a small polyfill to support IE9 and up](https://vanillajstoolkit.com/polyfills/matches/). For deeper backwards compatibility, you can [push support back to IE8 with a more robust polyfill](https://vanillajstoolkit.com/polyfills/matches-ie8/).