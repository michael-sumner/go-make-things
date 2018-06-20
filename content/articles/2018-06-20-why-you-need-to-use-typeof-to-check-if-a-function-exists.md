---
title: "Why you need to use typeof to check if a function exists with vanilla JS"
date: 2018-06-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

A couple of days ago I shared [a technique for checking if a function exists before trying to run it](/how-to-check-if-a-function-already-exists-with-vanilla-js/).

```js
if (typeof getPurchases === 'function') {
	getPurchases(123);
}
```

One astute reader asked why we can't just do this:

```js
if (getPurchases) {
	getPurchases(123);
}
```

Great question!

That works in some cases, but... if the variable was assigned to something other than a function&mdash;a string, number, or object, for example&mdash;you'd the if statement would validate as true and then you'd try to run something that wasn't a function and get an error.

```js
var myFunction = 'Some string';
// or...
var myFunction = 123;

// This validates as true
if (myFunction) {
    // Since myFunction isn't a function, this would throw an error
    myFunction();
}
```