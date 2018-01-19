---
categories:
- Code
- JavaScript
date: '2017-10-20'
title: Removing an event listener with vanilla JavaScript
---

Yesterday, we looked at a vanilla JavaScript equivalent of jQuery's `on()` method. Today, let's look at the vanilla JS version of `off()`, which removes an event listener.

## The completely native way

With vanilla JavaScript, you can remove any named event listener with `removeEventListener()`. It accepts all of the same arguments as `addEventListener()`, and those arguments must match the ones you used to add the event.

So, for example, if you added this click event:

```js
var clickHandler = function (event) {

    // Prevent the link from updating the URL
    event.preventDefault();

    // Do something...

};

var link = document.querySelector('#some-link');
link.addEventListener('click', clickHandler, false);
```

You can remove it like this:

```js
link.removeEventListener('click', clickHandler, false);
```

## The `off()` method

First, I’ll show you how to use it. Then, I’ll share the method itself. And finally, I’ll break down how it works.

### How to use it

The `off()` method works just like [the `on()` method we discussed yesterday](https://gomakethings.com/a-vanilla-javascript-equivalent-of-jquerys-on-method/).

The first argument is always the event to listen to. The second argument is an optional filter, if you're removing events on a certain selector.

You can omit it and jump straight to argument three, the callback. This is the function that runs on the event, and for this to work, it must be named. The final optional argument is `use capture`.

All of the arguments must match the ones you used in `on()`. So, if you did this:

```js
// Listen to all clicks on links with the .click-me class
on('click', '.click-me', function clickHandler (event) {
    // Prevent the link from working
    event.preventDefault();
});
```

You'd remove it like this:

```js
off('click', '.click-me', clickHandler);
```

If you used event bubbling like this:

```js
// Listen to all click events
on('click', function allClicks (event) {
    // The thing that was clicked
    var clicked = event.target;
});
```

You'd remove it like this:

```js
off('click', allClicks);
```

### The Helper Method

```js
/*!
 * Remove an event listener
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String}   event    The event type
 * @param  {Node}     elem     The element to remove the event to (optional, defaults to window)
 * @param  {Function} callback The callback that ran on the event
 * @param  {Boolean}  capture  If true, forces bubbling on non-bubbling events
 */
var off = function (event, elem, callback, capture) {
	if (typeof (elem) === 'function') {
		capture = callback;
		callback = elem;
		elem = window;
	}
	capture = capture ? true : false;
	elem.removeEventListener(event, callback, capture);
};
```

### How it works

We're essentially doing the same thing we did in our `on()` method, and then calling `removeEventListener()` instead.

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

Finally, we remove our event listener.

```js
elem.removeEventListener(event, callback, capture);
```