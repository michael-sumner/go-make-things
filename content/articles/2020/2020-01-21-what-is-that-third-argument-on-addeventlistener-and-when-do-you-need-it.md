---
title: "What is that third argument on the vanilla JS addEventListener() method and when do you need it?"
date: 2020-01-21T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

You may sometimes see a third argument on the `addEventListener()` method.

```js
document.addEventListener('focus', function (event) {
	console.log('something came into focus: ' + event.target);
}, true);
```

That third argument, `true`? That's called `useCapture`.

[I'm a big fan of event delegation.](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/) But certain events, like `focus`, don't bubble.

If you wrote your event listener like this, the event would never fire.

```js
document.addEventListener('focus', function (event) {
	console.log('something came into focus: ' + event.target);
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/jOEXMWK) Try to click on or tab through the buttons with the console open.

## So, what exactly does `useCapture` do?

The `useCapture` argument, when set to `true`, tells the `addEventListener()` method to *capture* events that happen in the parent.

Instead of the event bubbling from the originating element up to each parent, the event listener starts at the parent and works its way down. This allows you to use event delegation on non-bubbling events.

[Here's another demo with `useCapture` enabled.](https://codepen.io/cferdinandi/pen/xxbmEOx)

## When do you need `useCapture`?

While newer browsers use `false` as a default if no value is provided, older browsers would fail without the third argument.

However, `useCapture` has been optional since IE9, so I think you can safely omit it unless the event you're using doesn't bubble and you're trying to use event delegation.

*__Note:__ this is a deviation from [what I used to recommend a few years ago](/when-do-you-need-to-use-usecapture-with-addeventlistener/).*

You can tell if you need to set `useCapture` to `true` by checking [the MDN Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events).

Click into your event, and then look at the event details table at the top of the page. One of the properties is *Bubbles*. If the answer is "No," set `useCapture` to `true`. Otherwise, leave it off.