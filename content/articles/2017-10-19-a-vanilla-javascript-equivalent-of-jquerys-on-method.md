---
categories:
- Code
- JavaScript
date: '2017-10-19'
url: /a-vanilla-javascript-equivalent-of-jquerys-on-method/
title: A vanilla JavaScript equivalent of jQuery&#8217;s on() method
---

In vanilla JavaScript, you can listen to browser events with the `addEventListener()` method.

```js
var link = document.querySelector('#some-link');
link.addEventListener('click', function (event) {

    // Prevent the link from updating the URL
    event.preventDefault();

    // Do something...

}, false);
```

If you're used to the jQuery way, it can feel pretty verbose. Today, I want to share a vanilla JavaScript version of the `on()` method.

## The `on()` method

First, I'll show you how to use it. Then, I'll share the method itself. And finally, I'll break down how it works.

### How to use it

The first argument is always the event to listen to. The second argument is an optional filter, if you only want to listen to events on a certain selector.

You can omit it and jump straight to argument three, the callback. This is the function to run on the event. There's a final, optional argument: `use capture`. Set it to true for [non-bubbling events](/when-to-use-use-capture-in-your-event-listeners/) (like `focus`) that you [need to force to bubble](/attaching-multiple-elements-to-a-single-event-listener-in-vanilla-js/).

```js
// Listen to all click events
on('click', function(event) {
    // The thing that was clicked
    var clicked = event.target;
});

// Listen to all clicks on links with the .click-me class
on('click', '.click-me', function(event) {
    // Prevent the link from working
    event.preventDefault();
});

// Listen to focus on any element in the document with `use capture`
on('focus', function (event) {
    // The element that came into focus
    var focused = event.target;
}, true);
```

You can also [pass in named functions](/named-vs-anonymous-event-listener-functions/) if you need to be able to remove the event listener later (more on that tomorrow) or want to use the same function for multiple events.

```js
// Do stuff on scroll
var onScrollHandler = function (event) {
    // Do something on scroll...
};

// Setup the event listener
on('scroll', onScrollHandler);
```

### The helper method

```js
/*!
 * Add an event listener
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String}   event    The event type
 * @param  {Node}     elem     The element to attach the event to (optional, defaults to window)
 * @param  {Function} callback The callback to run on the event
 * @param  {Boolean}  capture  If true, forces bubbling on non-bubbling events
 */
var on = function (event, elem, callback, capture) {
	if (typeof (elem) === 'function') {
		capture = callback;
		callback = elem;
		elem = window;
	}
	capture = capture ? true : false;
	elem.addEventListener(event, callback, capture);
};
```

### How it works

First, we check to see if the second argument is an element selector or a callback function. If it's our callback, we'll shift all of the arguments over one.

```js
if (typeof (elem) === 'function') {
	capture = callback;
	callback = elem;
	elem = window;
}
```

Next, we check to see if the `capture` argument is set. If not, we'll use `false` instead of `null`.

```js
capture = capture ? true : false;
```

Finally, we'll add our event listener.

```js
elem.addEventListener(event, callback, capture);
```