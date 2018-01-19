---
categories:
- Code
- JavaScript
date: '2017-04-03'
title: Adding markup to an element with vanilla JS
---

The other day one of the students in my [Vanilla JS Slack channel](/guides/) asked me how to add an element inside another element with JavaScript.

This is actually really easy to do with the `innerHTML` property.

```javascript
// <div id="some-element">...</div>
var elem = document.querySelector('#some-element');

// Get the current markup
var html = elem.innerHTML;

// Replace the current markup
elem.innerHTML = '<p>Some new content.</p>';

// Add content before the current markup
elem.innerHTML = '<p>Some new content.</p>' + elem.innerHTML;

// Add content after the current markup
elem.innerHTML += '<p>Some new content.</p>';
```

The content you add can be any valid HTML, including just plain old string of text (no paragraph tags required).

Next, learn [how to add a new element to the DOM with vanilla JS](/adding-a-new-element-to-the-dom-with-vanilla-js/).