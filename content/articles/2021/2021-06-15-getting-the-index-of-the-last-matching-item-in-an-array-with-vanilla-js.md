---
title: "Getting the index of the last matching item in an array with vanilla JS"
date: 2021-06-15T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Let's say you have an an array with a list of awesome wizards.

```js
let wizards = ['Gandalf', 'Merlin', 'Radagast', 'Merlin'];
```

You'll notice that `Merlin` appears in the list twice. You can get the index of the first instance of `Merlin` using the `Array.indexOf()` method.

```js
// returns 1
let index = wizards.indexOf('Merlin');
```

But what if you wanted to get the index of the _last_ instance of `Merlin` in the `wizards` array instead? For that, we can use the `Array.lastIndexOf()` method.

Just like with `Array.indexOf()`, pass in the item to get as an argument. It returns the index of the last instance of that item, or `-1` if it doesn't exist.

```js
// returns 3
let lastIndex = wizards.lastIndexOf('Merlin');
```

If there's only one instance of an item, it still works.

```js
// returns 0
let gandalf = wizards.lastIndexOf('Gandalf');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/gOmZoBy)