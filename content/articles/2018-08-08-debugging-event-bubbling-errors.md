---
title: "Debugging event bubbling errors with vanilla JS"
date: 2018-08-08T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

This week, [Kieran Barker](https://github.com/kieranbarker) messaged me about a console error he was getting on a project he was working on.

```js
Uncaught TypeError: event.target.matches is not a function at HTMLDocument.<anonymous>
```

He was [using event delegation](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/) with the `matches()` method to detect hover events. And here's an example of the type of code that was triggering that error.

```js
document.addEventListener('mouseenter', function (event) {
	if (event.target.matches('button')) {
		console.log('Found the button!');
	}
}, true);
```

Any idea what's going on here? Kieran was kind enough to let me do a live debugging session with him and record it. [Here's the walk-through.](https://www.youtube.com/watch?v=tQqe9eLppcw)

<iframe width="560" height="315" src="https://www.youtube.com/embed/tQqe9eLppcw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

**The short version:** the event was also detecting hover events on the parent `<!DOCTYPE html>` object, which has no `matches()` method.

To prevent the error, he added a check to make sure `matches()` is supported by the element before trying to use it.

```js
document.addEventListener('mouseenter', function (event) {

	// Make sure it's not the !DOCTYPE object
	if (!('matches') in event.target) return;

	// Do your thing...
	if (event.target.matches('button')) {
		console.log('Found the button!');
	}

}, true);
```