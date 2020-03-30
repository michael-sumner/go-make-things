---
title: "Repeating a string with vanilla JavaScript"
date: 2020-03-30T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, we looked at how to check if a string [starts with](/how-to-check-if-a-string-starts-with-another-string-using-vanilla-js/) or [ends with](/how-to-check-if-a-string-ends-with-another-string-using-vanilla-js/) with a specific substring.

Today, we're going to look at how to repeat a string a certain number of times.

Let's dig in.

## The `String.repeat()` method

This method does exactly what it says on the label.

You call it on a string you want to repeat, and pass in the number of times to repeat as an argument. That's it. That's the whole method.

```js
var beetlejuice = 'Beetlejuice ';

// returns "Beetlejuice Beetlejuice Beetlejuice "
beetlejuice.repeat(3);
```

## Valid numbers

You *can't* pass in a negative number. If you pass in a float (a number with decimal points), it will get rounded down to the nearest whole number.

```js
// returns Uncaught RangeError: Invalid count value
beetlejuice.repeat(-1);

// returns "Beetlejuice Beetlejuice Beetlejuice "
beetlejuice.repeat(3.7);
```

## Browser compatibility

The `String.repeat()` method works in all modern browsers, including MS Edge, but has no IE support. [You can push support back to IE9 with a polyfill.](https://vanillajstoolkit.com/polyfills/stringrepeat/)