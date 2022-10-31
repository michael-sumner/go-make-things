---
title: When should you use event delegation?
date: 2022-10-31T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

[I'm a big fan of event delegation.](/listening-for-events-on-multiple-elements-using-javascript-event-delegation/)

If you're not familiar with the technique, _event delegation_ is an approach where you attach your event listener to a parent element instead of directly on the element you're listening to. Then, in your callback function, you filter out any events that happen on elements you don't care about.

Here, I'm listening for all `click` events in the `document`. If the element that triggered the click, the `event.target`, doesn't have the `.click-me` class, I `return` early to end the function.

```js
// Listen for clicks on the entire window
document.addEventListener('click', function (event) {

	// Ignore elements without the .click-me class
	if (!event.target.matches('.click-me')) return;
	
	// Run your code...

});
```

Recently, a student asked me why you'd do this instead of just attaching event listeners directly to the elements you care about. _Event delegation_ has two big benefits.

**1. Every event listener uses memory in the browser.** 

The more of them you have, the more memory is used. For large apps with lots of interactive elements, this can create a lot of lag.

Counter-intuitively, one event listener that picks up all clicks in the DOM can be better for performance than hundreds of listeners on specific elements.

For one or two elements, it doesn't make any difference at all. For big apps (think about all of the clickable elements in the Twitter UI), it can be a huge performance inw.

**2. You don't need to attach and detach listeners whenever you update the UI.**

If you attach your listener to a parent element that's always in the DOM, you don't need to do anything special whenever you add or remove interactive elements from your UI.

The listener will still pick up the event, and filter out the elements that you don't care about.