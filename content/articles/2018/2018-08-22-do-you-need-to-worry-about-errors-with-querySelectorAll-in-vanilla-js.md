---
title: "Do you need to worry about errors with querySelectorAll() in vanilla JS?"
date: 2018-08-22T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [a technique for avoid errors when using `querySelector()`](/avoiding-errors-when-using-queryselector-in-vanilla-js/) in vanilla JS.

Reader [Kieran Barker](https://github.com/kieranbarker) asked:

> We’re supposed to check if an element exists after using `querySelector()`. Do we need to check if the NodeList’s length is greater than zero when using `querySelectorAll()`, or is it not necessary since this will just return an empty NodeList rather than throw an exception?

When `querySelector()` doesn't find a matching element, it returns `null`. This is why you'll get an error if you try to run a method on it.

```js
var noElem = document.querySelector('#this-element-does-not-exists')

// Logs "null"
console.log(elem);

// Uncaught TypeError: Cannot read property 'classList' of null
noElem.classList.add('expelliarmus');
```

When `querySelectorAll()` doesn't find any matches, though, it returns an empty NodeList. Because of this, you can safely use any of the `NodeList` properties and methods and not get any errors.

```js
var noElems = document.querySelectorAll('.these-elements-do-not-exist');

// Logs []
console.log(noElems);

// No errors
noElems.forEach(function (elem) {
	elem.classList.add('expelliarmus');
});
```

This (or a version of it) is actually how jQuery is able to do this and fail silently.

```js
// No errors
$('#this-element-does-not-exists').addClass('expelliarmus');
```

The jQuery selector method (`$()`) is more akin to `querySelectorAll()` than `querySelector()`. When you call the `jQuery.addClass()` method on it, it's looping over all matching elements. If none exist, it loops over an empty NodeList and nothing happens.