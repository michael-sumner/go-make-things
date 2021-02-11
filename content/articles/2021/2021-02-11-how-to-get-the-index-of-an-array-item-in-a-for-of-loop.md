---
title: "How to get the index of an array item in a vanilla JS for...of loop"
date: 2021-02-11T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Last month, [we looked at the `for...of` loop](/the-for...of-loop-in-vanilla-js/). Since then, I've been asked a few times when you should use a `for...of` loop, and when you should use `Array.forEach()`.

This is highly subjective, but I generally prefer a `for...of` loop in most situations. The only time I'd pick `Array.forEach()` instead are when I _need_ the index of the item.

But, [my friend Charles Roper](https://github.com/charlesroper) shared a cool technique with me that you can use to get the `index` inside a `for...of` loop. Let's take a look!

## The `Array.entries()` method

The `Array.entries()` method returns a new Array Iterator of index/value pairs.

```js
let wizards = ['Gandalf', 'Radagast', 'Merlin'];
let entries = wizards.entries();
```

The returned value is an iterable. You can't access its values directly, but you can use the `Iterator.next()` method and the `value` property.

```js
// returns [0, "Gandalf"]
entries.next().value;
```

## The `for...of` loop and array destructuring

A few weeks ago, we also learned about [the array destructuring syntax](/destructing-in-vanilla-js/#array-destructuring).

We can combine `Array.entries()` with array destructuring to get the index inside of the loop.

```js
for (let [index, wizard] of wizards.entries()) {
	console.log(wizard, index);
}
```

This is useful if, for example, you wanted to `break` a loop after a certain condition was met.