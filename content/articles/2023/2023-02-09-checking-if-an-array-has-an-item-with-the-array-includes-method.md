---
title: Checking if an array has an item with the vanilla JS Array.protype.includes() method
date: 2023-02-09T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In [yesterday's article](/checking-if-at-least-one-item-in-an-array-matches-some-criteria-with-the-vanilla-js-array.prototype.some-method/), I mentioned the `Array.prototype.includes()` method. Today, I wanted to look at how it works.

The `Array.prototype.includes()` method accepts the value to search for in an array as an argument, and returns a boolean, `true` if it's in the array, and `false` if it's not.

```js
let wizards = ['Merlin', 'Ursula', 'Gandalf', 'Radagast'];

// returns true
let hasUrsula = wizards.includes('Ursula');

// returns false
let hasMorgana = wizards.includes('Morgana');
```

If you want to start searching at a specific index, you can pass that in as an optional second argument.

```js
// check if 'Radagast' is in the array anywhere from index 2 on
wizards.includes('Radagast', 2);
```

The `Array.prototype.includes()` method can only be used with shallow arrays containing primitive values. Arrays with nested arrays or objects won't work, because they fail the internal equality that the method runs.