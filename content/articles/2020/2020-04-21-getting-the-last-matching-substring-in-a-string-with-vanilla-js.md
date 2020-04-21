---
title: "Getting the last matching substring in a string with vanilla JS"
date: 2020-04-21T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to get the last matching item in an array using the `Array.lastIndexOf()` method](/getting-the-last-matching-item-in-an-array-with-vanilla-js/).

Today, we're going to look at how to do the same thing with substrings inside a string.

## The `String.lastIndexOf()` method

One weird little quirk of JavaScript is that many array methods have string equivalents (and vice-versa). This is so common that [the amazing Steve Griffith even made a video about it](https://www.youtube.com/watch?v=Itb-Go0Pp1A).

Just like the `Array.lastIndexOf()` method, the `String.lastIndexOf()` method returns the index of the last matching substring in string, or `-1` if a match is not found.

```js
var pirateCreed = 'I am a cunning pirate. A cunning pirate am I.';

// Find "pirate"
// returns 33
pirateCreed.lastIndexOf('pirate');

// Find "swashbuckler"
// returns -1
pirateCreed.lastIndexOf('swashbuckler');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/MWabwPM)

## Starting at a specific index

The `String.lastIndexOf()` method accepts a second argument: `fromIndex`.

It defaults to the index of last character in the string (`string.length - 1`). If you pass in a positive integer, it will start that many items from the beginning of the string.

Unlike the `Array.lastIndexOf()` method, if you pass in a negative integer, the `String.lastIndexOf()` method treats it as `0`.

```js
// This skips the substring at index 33 because it starts at index 32
// returns 12
pirateCreed.lastIndexOf('pirate', 32);

// This starts at 0, and works backwards to 0, so it finds nothing
// returns -1
pirateCreed.lastIndexOf('pirate', -12);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/MWabaWg)

## Browser compatibility

The `String.lastIndexOf()` method works in all modern browsers, and back to at least IE6.