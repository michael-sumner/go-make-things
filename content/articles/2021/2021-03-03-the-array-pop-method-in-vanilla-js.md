---
title: "The Array.pop() method in vanilla JS"
date: 2021-03-03T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [the `Array.shift()` method](/the-array.shift-method-in-vanilla-js/). Today, I wanted to talk about the `Array.pop()` method. This is another quick one.

The `Array.pop()` method removes the last item from an array and returns it. The array _is_ modified.

```js
let wizards = ['Gandalf', 'Radagast', 'Merlin'];
let last = wizards.pop();

// logs "Merlin"
console.log(last);

// logs ["Gandalf", "Radagast"]
console.log(wizards);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/dyOewJZ)

If you only need to get the last item in the array, you're probably better off using bracket notation, like this.

```js
let last = wizards[wizards.length - 1];
```

The `Array.pop()` method is most useful when you want to actually remove the last item from the original array and modify its length.