---
title: "How to replace a section of a string with another one with vanilla JS"
date: 2020-09-04T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Let's say you have a string, like this.

```js
var chips = 'Lays potato chips are the best potato chips in the world.';
```

And you want to replace `Lays` with `Cape Cod` (because *Cape Cod* potato chips are clearly superior). How would you do it?

## The `String.replace()` method

The `String.replace()` method lets you replace a section of a string with another string.

Call it on the string you want to modify. Pass in the string to replace as the first argument, and the string to replace it with as the second.

It returns a new string.

```js
// returns "Cape Cod potato chips are the best potato chips in the world."
var betterChips = chips.replace('Lays', 'Cape Cod');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/poydZgm)

## Replacing multiple strings

By default, the `String.replace()` method only replaces the first matching substring.

```js
// Awkwardly worded, but roll with it
var wizards = 'Of all the wizards in Lord of the Rings, Radagast is my favorite of the wizards.';

// returns "Of all the sorcerers in Lord of the Rings, Radagast is my favorite of the wizards."
var sorcerers = wizards.replace('wizards', 'sorcerers');
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/ZEWajOE)

As a workaround, the first argument in the `String.replace()` method can be a regex pattern. The second can (optionally) be a function that returns a string.

```js
// This will match all instances
var sorcerers = wizards.replace(new RegExp('wizards', 'g'), 'sorcerers');
```

*But...* there's a new method that makes this a lot easier. We'll be looking at it on Monday.

## Browser compatibility

The `String.replace()` method works in all modern browsers, and back to at least IE6.