---
categories:
- Code
- JavaScript
date: '2017-12-01'
url: /slicing-a-string-with-vanilla-javascript/
title: Slicing a string with vanilla JavaScript
---

The vanilla JavaScript `String.slice()` method provides a way to get a subsection of a string starting (and optionally ending) at a particular character.

The first argument is where to start. Use `0` to include the first character. The second argument is where to end (and is optional). If either argument is a negative integer, it will start at the end of the string and work backwards.

Here are a few examples...

```javascript
var text = 'Cape Cod potato chips';
var startAtFive = text.slice(5);
var startAndEnd = text.slice(5, 8);
var sliceFromTheEnd = text.slice(0, -6);

// startAtFive: 'Cod potato chips'
// startAndEnd: 'Cod'
// sliceFromTheEnd: 'Cape Cod potato'
```

This works in all modern browsers, and back to at least IE6.