---
title: "When do you need to use useCapture with addEventListener?"
date: 2018-07-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Student [Kieran Barker](https://github.com/kieranbarker) asked (shared with permission):

> Do you personally always specify `useCapture` as a third argument [for `addEventListener()`]? I’ve never done it before seeing your courses.

Kieran is referring to the last argument in the `addEventListener()` method.

It specifies whether or not you want to “capture” the event. For most event types, this should be set to `false`. But certain events, like `focus`, don’t bubble.

Setting `useCapture` to `true` allows you to take advantage of event bubbling for events that otherwise don’t support it.

```js
// Listen for all focus events in the document
document.addEventListener('focus', function (event) {
    // Run functions whenever an element in the document comes into focus
}, true);
```

**So, to answer Kieran's question:** yes, you should absolutely always use it.

It's optional in most modern browsers, but in some earlier implementations, the listener doesn't run if it's excluded. Err on the side of caution and always include it.

If you're not sure how to figure out whether to set it to `true` or `false`, [here's how to figure it out](/when-to-use-use-capture-in-your-event-listeners/).