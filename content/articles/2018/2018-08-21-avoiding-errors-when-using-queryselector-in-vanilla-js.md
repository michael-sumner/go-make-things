---
title: "Avoiding errors when using querySelector() in vanilla JS"
date: 2018-08-21T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

One feature people like about jQuery is that it often fails silently.

You can, for example, try to get an element in the DOM and add a class to it, and if that element doesn't exist, nothing happens.

```js
// No errors
$('#this-element-does-not-exists').addClass('expelliarmus');
```

If you try to do that with vanilla JS, you'll get an error.

```js
// Uncaught TypeError: Cannot read property 'classList' of null
document.querySelector('#this-element-does-not-exists').classList.add('expelliarmus');
```

This may seem like a bug, and in a production site, it can be.

*But...* with jQuery's silent errors, you could be trying to manipulate a critical element on your page and not realize it doesn't exist. Debugging becomes harder.

**I think explicit errors are a feature of vanilla JS, not a bug.**

To prevent the `Uncaught TypeError` above, set your element to a variable, check that it exists, and *then* manipulate it.

```js
// No errors
var elem = document.querySelector('#this-element-does-not-exists');
if (elem) {
	elem.classList.add('expelliarmus');
}
```