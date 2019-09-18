---
title: "Why you shouldn't just always set useCapture to true with vanilla JS event listeners"
date: 2018-12-13T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, I wrote about [the difference between JavaScript event delegation, bubbling, and capturing](/whats-the-difference-between-javascript-event-delegation-bubbling-and-capturing/).

In it, I talked about *event capturing*:

> There’s a trick you can use to capture the event, though. The last argument in `addEventListener()` is called `useCapture`. We almost always set it to `false`.
>
> For events that don’t bubble, set it to `true` to capture the event anyways.

So why not just always set it to `true` so that you don't have to think about it?

**Because capturing an event changes the event delegation order.**

With event bubbling, the event starts on the element that triggered it and then "bubbles up" the DOM tree. Listeners directly on the element fire first, followed by listeners on the direct parent node, and then that element's parent, and so on.

With event capturing, event listeners at the top of the DOM tree happen first, and then "trickle down" until they reach the element that triggered the event.

Here are demos of [event bubbling](https://codepen.io/cferdinandi/pen/VqeYgz) and [event capturing](https://codepen.io/cferdinandi/pen/ZVQYPE).

The only difference between the two is that the event capturing demo has `useCapture` set to `true`. Notice how the order of the numbers in the console is reversed between the two?

What happens if you use both together?

Capturing fires first, then bubbling happens. [Here's a demo with both techniques at once.](https://codepen.io/cferdinandi/pen/YdwXZL) Notice how the numbers log into the console first (for capturing), followed by the letters (for bubbling).

You may notice one exception to this: the bubbling listener attached to the button itself fires before the capturing listener on it.