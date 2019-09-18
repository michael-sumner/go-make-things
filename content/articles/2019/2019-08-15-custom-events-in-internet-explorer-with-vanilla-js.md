---
title: "Custom events in Internet Explorer with vanilla JS"
date: 2019-08-15T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I was supposed to write about DOM diffing with vanilla JS. But the article was going to be *really* long, and yesterday's article was really long, too.

I wanted to take a day off in between to cover something a bit more simple.

## Custom Events

Two years ago, I wrote about [creating custom events with vanilla JS](/custom-events-with-vanilla-javascript/).

Let's say you wanted to dispatch a custom event every time you rendered a new UI into the DOM ([Reef](https://github.com/cferdinandi/reef) does this).

First you would use the `new CustomEvent()` constructor to create your custom event, passing in the event type as an argument. Then, you would call the `dispatchEvent()` method on the element you want to attach the event to, and pass the CustomEvent in as an argument.

```js
// Create a new event
var event = new CustomEvent('render', {
	bubbles: true
});

// Dispatch the event on an element
var app = document.querySelector('#app');
app.dispatchEvent(event);
```

You could [listen for the event with `addEventListener()`](https://vanillajstoolkit.com/reference/event-listeners/addeventlistener/) like this:

```js
document.addEventListener('render', function (event) {
	console.log('An element had new UI rendered into it: ' + event.target);
}, false);
```

This is really handy!

But, the `new CustomEvent()` constructor does not work in IE. Let's look at two possible fixes.

## A polyfill

What I think is the easiest approach is to drop in a polyfill and forget about it. Here's the [polyfill for the `CustomEvent()` constructor](https://vanillajstoolkit.com/polyfills/customevent/):

```js
/**
 * CustomEvent() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */
(function () {

	if (typeof window.CustomEvent === 'function') return false;

	function CustomEvent(event, params) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
})();
```

You can learn more about [why I love polyfills here](/why-i-love-polyfills/).

## A fallback method

If you want to save a few bytes or are only using a single Custom Event, it might make more sense to use a fallback method instead. This borrows elements from the polyfill, but applies them to your specific event.

First, we setup an `event` variable.

```js
// Create a render event
var event;
```

Next, we check to see if `window.CustomEvent` is a function. If it is, we can use the `CustomEvent()` constructor like in the example above.

```js
// Create a render event
var event;
if (typeof window.CustomEvent === 'function') {
	event = new CustomEvent('render', {
		bubbles: true
	});
}
```

If not, we'll fallback to an older, now deprecated approach: `createEvent()` and `initCustomEvent()`.

We'll use `document.createEvent()` to create a new `CustomEvent`, and set it to our `event` variable. Then we'll use the `initCustomEvent()` method to create the actual custom event type with our options.

```js
// Create a render event
var event;
if (trueTypeOf(window.CustomEvent) === 'function') {
	event = new CustomEvent('render', {
		bubbles: true
	});
} else {
	event = document.createEvent('CustomEvent');
	event.initCustomEvent('render', true, false, null);
}
```

Regardless of the method we choose, we'll use `dispatchEvent()` to actually dispatch the Custom Event.

```js
// Create a render event
var event;
if (trueTypeOf(window.CustomEvent) === 'function') {
	event = new CustomEvent('render', {
		bubbles: true
	});
} else {
	event = document.createEvent('CustomEvent');
	event.initCustomEvent('render', true, false, null);
}

// Dispatch the render event
app.dispatchEvent(event);
```

## Which approach should you use?

I generally use the polyfill approach. I think it's simpler and nicer to have just one approach in the code base.

The beauty of polyfills is that they get you away from the old-school `if...else` style coding you used to need to support a bunch of different browsers. That shit was exhausting!

In Reef, though, I use the fallback approach because there's only one event type and I wanted to keep the code base as lean as possible.

