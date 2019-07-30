---
title: "Either/or selectors with the vanilla JS querySelector() and querySelectorAll() methods"
date: 2019-07-31T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This is kind of an edge case, but... what if you wanted to get the first element in the DOM that had one of two or more selectors? What if you wanted to get all elements that had one of several selectors?

You can&mdash;quite easily&mdash;with the vanilla JS `querySelector()` and `querySelectorAll()` methods!

To make it work, pass in your desired selectors separated with a comma, all within quotes as a single argument.

```js
// Gets the first element in the DOM that has either
// the #vegetable ID or .fruit class
document.querySelector('#vegetable, .fruit');

// Gets all elements that have the [data-vegetable] attribute
// or the .fruit class
document.querySelector('[data-vegetable], .fruit');
```

I don't use this often, but it's super cool that I can!