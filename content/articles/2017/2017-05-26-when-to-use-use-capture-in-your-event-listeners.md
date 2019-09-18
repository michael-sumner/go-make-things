---
categories:
- Code
- JavaScript
date: '2017-05-26'
url: /when-to-use-use-capture-in-your-event-listeners/
title: When to use &#8220;use capture&#8221; in your event listeners
---

Earlier this month, I wrote about [the `use capture` argument](/wtf-is-use-capture-in-vanilla-js-event-listeners/) in `addEventListener`and  what it does.

As [my buddy Terry Sutton pointed out](https://twitter.com/saltcod/status/860482539345104896), though, I didn't explain when you actually *use* it.

> ie: set it to `false` and hope for the best!

## So, here's how you figure it out.

1. Visit the [Event Reference page on MDN](https://developer.mozilla.org/en-US/docs/Web/Events).
2. Click on the event you want to use.
3. Under "General info" at the top, look for whether `bubbles` is set to "yes" or "no."l

If the event doesn't bubble *and* you'll be listening for events on an element other than the one that will trigger the event, set `use capture` to `true`.

## An Example

For example, [the `blur` event](https://developer.mozilla.org/en-US/docs/Web/Events/blur) happens whenever a link or input loses focus.

If I'm listening for blur on a specific input, I can leave `use capture` as `false`.

```javascript
var someInput = document.querySelector('#my-input');
someInput.addEventListener('blur', function (event) {
    // Do stuff...
}, false);
```

BUT... if I wanted to listen to all `blur` events in the `document`, I would set it to `true`.

```javascript
document.addEventListener('blur', function (event) {
    // Do stuff...
}, true);
```