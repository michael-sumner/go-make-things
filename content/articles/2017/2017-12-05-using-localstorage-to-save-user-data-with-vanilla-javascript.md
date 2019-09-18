---
categories:
- Code
- JavaScript
date: '2017-12-05'
url: /using-localstorage-to-save-user-data-with-vanilla-javascript/
title: Using localStorage to save user data with vanilla JavaScript
---

The `localStorage` API lets you store data locally (as the name implies) that the browser can access later.

Data is stored indefinitely, and must be a string.

Use `setItem()` to store your data, passing in a key as the first argument, and your data value as the second. You can call `getItem()` to retrieve your data, and `removeItem()` to delete it.

```javascript
// Store data
var someData = 'The data that I want to store for later.';
localStorage.setItem('myDataKey', someData);

// Get data
var data = localStorage.getItem('myDataKey');

// Remove data
localStorage.removeItem('myDatakey');
```

`localStorage` works in all modern browsers, and back to IE8.

## Storage Limits

[Browsers provide differing levels of storage space](https://www.html5rocks.com/en/tutorials/offline/quota-research/) for `localStorage` ranging from as little as 2mb up to unlimited.

For browsers with a maximum storage limit, this amount is a total allowable amount of data, not *just* a max for your specific site or web app. Accordingly, you should try to reduce the overall footprint of your data as much as possible.