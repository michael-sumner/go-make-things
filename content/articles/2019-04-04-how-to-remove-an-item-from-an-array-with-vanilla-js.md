---
title: "How to remove an item from an array with vanilla JS"
date: 2019-04-04T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The `Array.splice()` method takes an array and returns a new one with just the spliced elements.

For example, let's say I had an array of wizards.

```js
var wizards = ['Neville', 'Hermione', 'Harry Potter', 'Dumbledore'];
```

If I wanted to remove `Harry Potter` (obviously making the whole set stronger), I would call the `splice()` method on `wizards.` The first argument is the index of the item to remove, and the second is how many items to remove starting at that spot.

(*Remember, array indexes start at `0`, so `Harry Potter` has an index of `2`.*)

```js
var harry = wizards.splice(2, 1);
```

Now, `harry` is an array with just `Harry Potter` in it, while `wizards` contains `Neville`, `Hermione`, and `Dumbledore`.

[Here's a demo.](https://codepen.io/cferdinandi/pen/LvVqzM)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js" data-user="cferdinandi" data-slug-hash="LvVqzM" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Array.splice()"></p>

What if you don't know the index of the item?

You can use `indexOf()` to get it.

```js
// Find Harry Potter
var index = wizards.indexOf('Harry Potter');

// If he's in the array, remove him
if (index > -1) {
	wizards.splice(index, 1);
}
```

This works in all modern browsers and back to at least IE6.