---
categories:
- Code
- JavaScript
date: '2017-12-07'
permalink: /adding-items-to-an-array-with-vanilla-javascript/
title: Adding items to an array with vanilla JavaScript
url: /2017/12/07/adding-items-to-an-array-with-vanilla-javascript
---

You can use the `push()` method to add items to an array.

```javascript
var sandwiches = ['turkey', 'tuna', 'blt'];
sandwiches.push('chicken', 'pb&j');

// returns ['turkey', 'tuna', 'blt', 'chicken', 'pb&j']
console.log(sandwiches);
```

## Merging two arrays together

What if you want to add an array of values rather than a single value? You can use `Array.prototype.push.apply()` to merge two or more arrays together. It merges all subsequent arrays into the first.

```javascript
var sandwiches1 = ['turkey', 'tuna', 'blt'];
var sandwiches2 = ['chicken', 'pb&j'];
Array.prototype.push.apply(sandwiches1, sandwiches2);

// returns ['turkey', 'tuna', 'blt', 'chicken', 'pb&j']
console.log(sandwiches1);

// returns ['chicken', 'pb&j']
console.log(sandwiches2);
```

## Browser Compatibility

These techniques work in all modern browsers, and back to at least IE6.