---
title: Listening for events on multiple elements using JavaScript event delegation
date: 2022-01-20T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

In JavaScript, event listeners have to be attached to individual elements. You can't attach them to an array or node list of matching elements like you might in jQuery.

Today, we're going to look at a technique that you can use listen for the same even on multiple elements _without_ having to attach to each element individually: event delegation.

Let's dig in!

## The `EventTarget.addEventListener()` method

As a quick primer, you can use the `EventTarget.addEventListener()` method to listen for events on an element. [You can find a full list of available events on the Mozilla Developer Network.](https://developer.mozilla.org/en-US/docs/Web/Events)

Attached the `EventTarget.addEventListener()` method to the element you want to listen for events on. It accepts two arguments: the event to listen for, and a callback function to run when the event happens.

You can pass the `event` into the callback function as an argument. The `event.target` property is the element that triggered the event. The `event` object has other properties as well, many of them specific to the type of event that occurred.

```javascript
let btn = document.querySelector('#click-me');

btn.addEventListener('click', function (event) {
	console.log(event); // The event details
	console.log(event.target); // The clicked element
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/KKXjPdN?editors=0011)

## Listening for the same event on multiple elements

One trick to listen a specific event on bunch of elements at once is to attach your listener to a parent element that your elements are contained within, such as the `window` or `document`. 

Events that happens on elements inside that parent element *bubble up*. 

The `event.target` property is the element that triggered the event. We can use that property to check if the element that triggered the event has a matching selector.

```javascript
// Listen for clicks on the entire window
document.addEventListener('click', function (event) {

	// If the clicked element has the `.click-me` class, it's a match!
	if (event.target.matches('.click-me')) {
		// Do something...
	}

});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/poWXzNP?editors=1011)

## Why wouldn't you just loop through each element and attach an event listener?

You _can_ attach event listeners to individual elements by looping over each one, like this.

```javascript
/**
 * This works, but it's bad for performance
 * DON'T DO IT!
 */
let btns = document.querySelectorAll('.click-me');

for (let btn of btns) {
	btn.addEventListener('click', function (event) {
		console.log(event); // The event details
		console.log(event.target); // The clicked element
	});
}
```

But if you have a lot of elements, it can actually be worse for performance than event delegation.

Every event listener you create uses memory in the browser. It’s “cheaper” for the browser to track one event and fire it on every click that it is to manage multiple events.

If you’re only listening for events on a single element, feel free to attach directly to that element. But if you’re listening for events on multiple elements, I’d recommend using event delegation.

## Capturing events that don't bubble

Certain events, like `focus`, don't bubble. In order to use event delegation with events that don't bubble, you can set an optional third argument on the `EventTarget.addEventListener()` method, called `useCapture`, to `true`.

```javascript
// Listen for all focus events in the document
document.addEventListener('focus', function (event) {
	// Run functions whenever an element in the document comes into focus
}, true);
```

You can determine if `useCapture` should be set to `true` or `false` by looking at the event details page on the Mozilla Developer Network ([like this one for the `focus` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event)).

If *Bubbles* in the chart at the top of the page is "No," you need to set `useCapture` to `true` to use event delegation.

[Here's one last demo.](https://codepen.io/cferdinandi/pen/ExwBYZR?editors=1011)