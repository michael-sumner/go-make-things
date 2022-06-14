---
title: The Object.entries() method in vanilla JS
date: 2022-06-14T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to take a look at the `Object.entries()` method: what it does, and when and why you might use it.

Let's dig in!

## Converting an array into an object with the `Object.entries()` method

The `Object.entries()` method accepts an object as an argument, and returns an array. 

Each item in the returned array is itself an array, where the first item is a key from the object, and the second item is its matching value.

Let's say you have an object of wizards, and the spells they can cast.

```js
let wizards = {
	merlin: 'Dancing teacups',
	gandalf: 'You shall not pass!',
	radagast: 'Talks to animals',
	ursula: 'Steal your voice'
};
```

If you pass `wizards` into the `Object.entries()` method, you'll get back an array of key/value pairs.

```js
// [['merlin', 'Dancing teacups'], ['gandalf', 'You shall not pass!'], ...]
let wizardsArr = Object.entries(wizards);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/eYVxzvW?editors=1111)

## When would you ever need something like this?

This method seems weird. 

If you needed to get all of the keys in an object, you could use the `Object.keys()` method. If you wanted the values, you could use `Object.values()`. If you need both, the object already has that, right?

JavaScript has some useful methods that only apply to arrays, and every now and then, you want to use one of them and still have access to both the keys _and_ their values.

For example, imagine if you had an object of lunch orders, and the number of each item that was ordered.

```js
let lunch = {
	soup: 2,
	bread: 1,
	sandwich: 3,
	lemonade: 7,
	tea: 2,
	pastaSalad: 4
};
```

You want to order these from most ordered to least ordered.

Array's have the `Array.sort()` method, but objects don't have anything similar. You could use `Object.values()` and sort that, but you'd lose the keys.

This is a good use of `Array.entries()`.

We can convert the object to an array, preserve the key/value relationship, and sort it with the `Array.sort()` method.

```js
let sorted = Object.entries(lunch).sort(function (item1, item2) {
	if (item1[1] > item2[1]) return -1;
	return 1;
});
```

Here, the returned `sorted` array looks like this.

```js
let sorted = [
	["lemonade", 7],
	["pastaSalad", 4],
	["sandwich", 3],
	["soup", 2],
	["tea", 2],
	["bread", 1]
];
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/OJQdXzJ?editors=1111)

The `Object.entries()` method isn't an every day method in my toolkit, but when I need it, I'm glad its there!