---
title: "The Array.shift() method in vanilla JS"
date: 2021-03-02T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to talk about the `Array.shift()` method. This is a quick one.

The `Array.shift()` method removes the first item from an array and returns it. The array _is_ modified.

```js
let wizards = ['Gandalf', 'Radagast', 'Merlin'];
let first = wizards.shift();

// logs "Gandalf"
console.log(first);

// logs ["Radagast", "Merlin"]
console.log(wizards);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/VwmxqbM)

If you only need to get the first item in the array, you're probably better off using bracket notation, like this.

```js
let first = wizards[0];
```

The `Array.shift()` method is most useful when you want to actually remove the first item from the original array and modify its length.