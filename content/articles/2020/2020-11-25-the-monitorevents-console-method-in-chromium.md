---
title: "The monitorEvents() console method in webkit/blink browsers"
date: 2020-11-25T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

My friend Steve Griffith has started [an excellent series on dev tools and the browser developer console](https://www.youtube.com/playlist?list=PLyuRouwmQCjnHNhhR2SMFuHwUn5emy1IZ).

Last week, he released [a video on a webkit/blink-only feature](https://www.youtube.com/watch?v=DuIytlI63po) (so, MS Edge, Chrome, and Safari, but not Firefox) called `monitorEvents()`.

<iframe width="560" height="315" src="https://www.youtube.com/embed/DuIytlI63po" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## How it works

The `monitorEvents()` method lets you watch for events on an element, and will log the event (and details about it) to the console.

You pass in the element to monitor as an argument. You can optionally specific a specific event to listen for as a second argument.

```js
// This will log all events on the body
monitorEvents(document.body);

// This will log only click events on the #main element
var main = document.querySelector('#main');
monitorEvents(main, 'click');
```

At any point, you can stop monitoring events with the `unmonitorEvents()` method.

Pass in just the element to stop watching all events, or add a second optional argument with the specific event you want to stop monitoring.

```js
// This will stop monitoring all events on the body
unmonitorEvents(document.body);

// This will stop watching only click events
unmonitorEvents(document.body, 'click');
```

This seems super handy, and I wish I knew about it sooner!