---
title: "The challenge with immutable objects and arrays in vanilla JS"
date: 2019-06-10T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last year, I wrote [a bit about *immutability*](https://gomakethings.com/immutability-in-javascript/).

## What is immutability?

In JavaScript, when you assign an existing array or object to a new variable, it does *not* create a new array or object with the same properties. Instead, it creates a reference to the original.

```javascript
var sandwiches = ['turkey', 'tuna', 'ham', 'pb&j'];
var moreSandwiches = sandwiches;

// logs ['turkey', 'tuna', 'ham', 'pb&j']
console.log(moreSandwiches);

// Remove "tuna" from sandwiches
sandwiches.splice(1, 1);

// logs ['turkey', 'ham', 'pb&j']
console.log(moreSandwiches);
```

When working with array and object data, it's important to create *immutable* copies before manipulating them. An *immutable* array or object is a unique copy of the original that, when manipulated, does not affect the original.

## A few common but incomplete options

I also shared [a few approaches for creating immutable copies with vanilla JS](/how-to-handle-immutability-in-javascript/).

You can use `Object.assign()` to create a new object, and `Array.slice()` or `Array.from()` to create a copy of an array.

```js
// Copy an object
var clonedObj = Object.assign({}, originalObj);

// Copy an array
var clonedArr1 = originalArr.slice();
var clonedArr2 = Array.from(originalArr);
```

You can also stringify and then parse and object or array as a catchall for both types.

```js
var clone = JSON.parse(JSON.stringify(orig));
```

My buddy [Andrew Borstein](https://andrewborstein.com/) found problems with all of these methods.

The `Object.assign()`, `Array.slice()`, and `Array.from()` methods all create *shallow* copies. If an object has arrays in it, or an array has objects in it, those are not immutable copies.

```js
// Copy an object
var clonedObj = Object.assign({}, originalObj);

// Update the copy
// This will also update the value in the original
clonedObj.arr[3] = 'new value';
```

The `stringify()` and `parse()` trick avoids this issue, but only works for valid JSON values. Functions and certain other values are not copied over.

Tomorrow, we'll look at a strategy for creating deep immutable copies with vanilla JS.