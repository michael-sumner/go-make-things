---
categories:
- Code
- JavaScript
date: '2017-11-27'
permalink: /converting-strings-to-uppercase-and-lowercase-with-vanilla-javascript/
title: Converting strings to uppercase and lowercase with vanilla JavaScript
url: /2017/11/27/converting-strings-to-uppercase-and-lowercase-with-vanilla-javascript
---

JavaScript provides two helpful functions for converting text to uppercase and lowercase.

`String.toLowerCase()` converts a string to lowercase, and `String.toUpperCase()` converts a string to uppercase.

```lang-js
var text = 'This sentence has some MIXED CASE LeTTeRs in it.';

// returns 'this sentence has some mixed case letters in it.'
var lower = text.toLowerCase();

// returns 'THIS SENTENCE HAS SOME MIXED CASE LETTERS IN IT.'
var upper = text.toUpperCase();
```

Both methods work in all modern browsers, and are supported back to at least IE6.

Tomorrow, we'll look at how to convert text to title case (the first letter of every word capitalized).