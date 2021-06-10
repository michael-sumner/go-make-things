---
title: "How to trim whitespace from the beginning and end of a string with vanilla JS"
date: 2021-06-10T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Let's imagine you have a string with some extra spaces at the beginning and end of it.

```js
let str = '   I love Cape Cod potato chips.   ';
```

How would you remove that unneeded whitespace? JavaScript provides three different methods, depending on what you're trying to do.

The `String.trim()` method removes leading and trailing whitespace from a string.

```js
// Returns "I love Cape Cod potato chips."
str.trim();
```

If you only want to remove the leading whitespace, you can instead use the `String.trimStart()` method.

```js
// Returns "I love Cape Cod potato chips.   "
str.trimStart();
```

And if you only want to remove the trailing whitespace, you can use the `String.trimEnd()` method.

```js
// Returns "   I love Cape Cod potato chips."
str.trimEnd();
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/PopdQJJ)