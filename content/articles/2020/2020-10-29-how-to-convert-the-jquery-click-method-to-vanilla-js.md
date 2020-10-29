---
title: "How to convert the jQuery click() method to vanilla JS"
date: 2020-10-29T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

As part of [my ongoing series on converting jQuery methods to vanilla JS](/series/converting-jquery-to-vanilla-js/), today, we're going to look at the jQuery `click()` method.

Let's dig in.

## What the jQuery `click()` method does

The jQuery `click()` method detects clicks on elements with a matching selector and runs a callback function in response. It's a convenience method that does the same thing as `on('click')`.

```js
// This will run whenever a .click-me element is clicked
$('.click-me').click(function (event) {
	// Do something...
});

// This does the same thing
$('.click-me').on('click', function (event) {
	// Do something...
});
```

Let's look at how to do this in vanilla JS.

## A vanilla JS equivalent to the jQuery `click()` method

Vanilla JS has [the `addEventListener()` method](https://vanillajstoolkit.com/reference/event-listeners/addeventlistener/), which listens for all events on a specific type on an element.

```js
// Get the .click-me element
var clickMe = document.querySelector('.click-me');

// This will run when the .click-me element is clicked
clickMe.addEventListener('click', function (event) {
	// Do something...
});
```

There's a catch with this approach, though: it will only run on the first matching `.click-me` element.

And unfortunately, you _can't_ call `addEventListener()` on a NodeList. This _will not_ work.

```js
// Get all matching .click-me elements
var clickMeAll = document.querySelectorAll('.click-me');

// This WILL NOT work
clickMeAll.addEventListener('click', function (event) {
	// Do something...
});
```

So what can you do instead?

## Vanilla JS event delegation

The [event delegation technique](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/) lets you listen for all events of a specific type on a parent element, and then ignore any event that happened on an element you don't care about.

In this case, let's listen for all `click` events on the `document` element, and then ignore any that don't happen on an element with the `.click-me` class. We can use `event.target` to get the clicked element, and [the `matches()` method](https://vanillajstoolkit.com/reference/selectors/element-matches/) to check if the clicked element matches our selector.

```js
// Listen to all click events on the document
document.addEventListener('click', function (event) {

	// If the clicked element does not have the .click-me class, ignore it
	if (!event.target.matches('.click-me')) return;

	// Otherwise, do something...

});
```

This works great, but what happens if the `.click-me` element also has elements inside it?

```html
<button class="click-me">
	Click Me Please
	<span>You won't regret it</span>
</button>
```

Here, if the `span` with the text `You won't regret it` is clicked, the rest of the event listener won't run. The clicked element, `span`, _does not_ have the `.click-me` class and will get filtered out.

So, what can you do?

The `closest()` method works like the `matches()` method. But instead of checking to see if the element matches a selector, it _also_ checks to see if any parent element does.

```js
// Listen to all click events on the document
document.addEventListener('click', function (event) {

	// If the clicked element does not have and is not contained by an element with the .click-me class, ignore it
	if (!event.target.closest('.click-me')) return;

	// Otherwise, do something...

});
```

Now, our event listener will run properly.

## Browser compatibility

The `addEventListener()` method works in all modern browsers, and back to IE9.

The `matches()` method works in all modern browsers, but was vendor prefixed in IE and [requires a polyfill](https://vanillajstoolkit.com/polyfills/matches/). The `closest()` method does not work in IE at all, and [also requires a polyfill](https://vanillajstoolkit.com/polyfills/closest/).