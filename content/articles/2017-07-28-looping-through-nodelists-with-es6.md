---
categories:
- Code
- JavaScript
date: '2017-07-28'
url: /looping-through-nodelists-with-es6/
title: Looping through NodeLists with ES6
---

Yesterday, we looked at [how to loop through arrays with ES6](/looping-through-arrays-the-es6-way/). Today, we're going to look at how to do the same thing with NodeLists.

NodeLists, if you're not familiar, are array-like lists of nodes. This is what you get back when you use `querySelectorAll()`.

Even though they look *just* like arrays, they're not, so you can't use array-specific methods on them (which is absurd and confusing).

## The Old Way

The traditional way of looping through NodeLists is the same as looping through arrays: with a `for` loop.

```javascript
var elems = document.querySelectorAll('.some-selector');

for (var i = 0; i < elems.length; i++) {
    console.log(i); // index
    console.log(elems[i]); // value
}
```

## The ES6 Way

Fortunately, just like with arrays, there's a `forEach()` method for NodeLists.

```javascript
var elems = document.querySelectorAll('.some-selector');

elems.forEach(function (elem, index) {
    console.log(index); // index
    console.log(elem); // value
});
```

Unlike `Array.forEach()`, `NodeList.forEach()` has [pretty terrible browser support](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Browser_Compatibility).

A [simple polyfill](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill) adds support back to IE9. Unfortunately, this one isn't (yet) supported by [polyfill.io](https://polyfill.io), so even if you use the service you'll need to add it manually to your code.

On Monday, we'll look at [how to loop through objects](/looping-through-objects-with-es6/).