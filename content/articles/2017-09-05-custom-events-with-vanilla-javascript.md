---
categories:
- Code
- JavaScript
date: '2017-09-05'
permalink: /custom-events-with-vanilla-javascript/
title: Custom Events with Vanilla JavaScript
url: /2017/09/05/custom-events-with-vanilla-javascript
---

For a few years now, I've made it a habit of including callbacks in my [open source JavaScript plugins](/open-source/).

If you're unfamiliar with a callback, it's a piece of code that runs before or (more typically) after your core code. Unlike the core code in a plugin or script, it's user-customizable, allowing them a way to hook into certain parts of your code and extend it with their own code.

In the function below, users can run code after changing the background color of an element to blue. And in the example, it's being used to also add the `.color-changed` class to the element.

```lang-javascript
var makeBlue = function (elem, callback) {
    elem.classList.add('blue');
    if (callback and typeof callback === 'function') {
        callback(elem);
    }
};

// example
var elem = document.querySelector('.not-blue');
makeBlue(elem, function (elem) {
    elem.classList.add('color-changed');
});
```

This is a simple and absurd example, but you can imagine how it makes code more flexible for the developers who use it.

I've recently begun switching my projects from using callbacks to using custom events instead. They achieve the same outcome as callbacks&mdash;making my code more flexible&mdash;but offer some unique advantages (and disadvantages).

## How to emit a custom event

Custom events are actually really easy to create.

First, use `new CustomEvent()` to create the event, passing in the name of the event. Then, use call `dispatchEvent()` on the element you want to attach the event to, passing in your new custom event.

```lang-javascript
var makeBlue = function (elem) {

    elem.classList.add('blue');

    // Create a new event
    var event = new CustomEvent('madeBlue');

    // Dispatch the event
    elem.dispatchEvent(event);

};
```

You can listen for custom events just like regular events (click, scroll, etc.) using `addEventListener()`.

```lang-javascript
var elem = document.querySelector('.not-blue');
makeBlue(elem);

// Run function on `madeBlue` event
elem.addEventListener('madeBlue', function (elem) {
    elem.classList.add('color-changed');
}, false);
```

## The benefits of using custom events

Why use this approach?

Custom events let you pull the function you want to run afterwards out of the script itself. You can include an event listener in a different script or file, and attach multiple event listeners to the same event.

Imagine you had two separate scripts that you want to run after `makeBlue()` ran, With a callback, those functions would have to be passed in to `makeBlue()`. With custom events, they can reside in any file or script.

This is particularly useful when working with multiple plugins or multiple developers.

## The downside

Callbacks are synchronous. When called, your function holds all other processes until the callback function is run.

Custom events stop the rest of a script from running while they dispatch, but any functions that listen for them run asynchronously.

Often not a big deal, but if you *need* to stop other code from running until the callback is complete, custom events aren't the right call.

## Browser support

`CustomEvent` doesn't show up until IE 11 and Safari 10. Fortunately [a simple polyfill](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill) pushes support back to any IE 9.

```lang-javascript
(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();
```