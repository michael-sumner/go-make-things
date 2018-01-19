---
categories:
- Code
- JavaScript
date: '2017-12-06'
title: Storing data just for the browsing session with vanilla JavaScript
---

Yesterday, we looked at [how to use `localStorage` to save user data locally in the browser](https://gomakethings.com/using-localstorage-to-save-user-data-with-vanilla-javascript/). Today, you'll learn how to save data just for the current browsing session.

All you need is the `sessionStorage` API, which works just like `localStorage` API.

```javascript
// Store data
var someTempData = 'The data that I want to store temporarily.';
sessionStorage.setItem('myTempDataKey', someTempData);

// Get data
var tempData = sessionStorage.getItem('myTempDataKey');

// Remove data
sessionStorage.removeItem('myTempDatakey');
```

Like `localStorage`, `sessionStorage` works in all modern browsers and back to IE8. It's also subject to the same storage limits.