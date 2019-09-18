---
title: "Event bubbling with lots of items"
date: 2018-07-05T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Reader Andrew asked (shared with permission):

> How to structure the `document.addEventListener('click', callbackFunction)` from becoming a long list of `if` statements if listening for lots of events? For a handful it is ok, but when you get upwards of 2 or 3 it often begins to look unwieldy.

*If you're unsure what this means, first [go read this primer on event bubbling](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/). Here's an example of what Andrew's talking about.*

```js
document.addEventListener('click', function (event) {

	if (event.target.closest('.scroll')) {
		// Do something...
	}

	if (event.target.matches('[data-some-attribute]')) {
		// Do something else...
	}

	if (event.target.matches('#my-form')) {
		// Do another t hing...
	}

}, false);
```

Honestly, sometimes that's what mine looks like, too!

I will often break it up by plugin, so I may have three or four event listeners, with each one scoped to just a specific plugin or script.

I've seen some sites that attach click events to every DOM element that's clickable, and you end up with 30-40 of them. **That's** when stuff gets really bogged down.