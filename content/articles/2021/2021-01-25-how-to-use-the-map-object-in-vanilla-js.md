---
title: "How to use the Map() object in vanilla JS"
date: 2021-01-25T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to use the `Set()` object](/how-to-use-the-set-object-in-vanilla-js/). Today, we're going to look at its cousin, the `Map()` object.

Let's dig in.

## What is the `Map()` object

The `Map()` object is to plain objects (`{}`) what `Set()` is to arrays.

A `Map()` object is an iterable of key/value pairs that are stored and looped through in order. The big difference between a `Map()` and a plain object is that `Map()` items retain their order, while plain object values do not.

You can create a `Map()` object with the `new Map()` constructor. Pass in an iterable of key value pairs (also as an iterable such as an array) as an argument.

```js
// returns Map(2) {"name" => "Radagast", "color" => "brown"}
let radagast = new Map([
	['name', 'Radagast'],
	['color', 'brown']
]);
```

## How to iterate over a `Map()`

The `Map()` object has a `Map.forEach()` method that you can use to iterate over each item.

You pass in a callback function to run on each loop. The callback function receives the current item, its key, and the `Map()` itself as arguments.

It works a lot like [the `Array.forEach()` method](/how-array.foreach-works-under-the-hood-in-vanilla-js/).

```js
// logs "name", "Radagast", "color", "brown"
radagast.forEach(function (value, key) {
	console.log(key);
	console.log(value);
});
```

Because a `Map()` is an iterable, you can also [use a `for...of` loop](/the-for...of-loop-in-vanilla-js/) to iterate through its items. Each entry in the `Map()` is an array of its key/value pairs

```js
// logs ["name", "Radagast"], ["color", "brown"]
for (let entry of radagast) {
	console.log(entry);
}
```

You can [use array destructuring](/destructing-in-vanilla-js/#array-destructuring) to assign the `key` and `value` to their own variables within the `for...of` loop.

```js
// logs "name", "Radagast", "color", "brown"
for (let [key, value] of radagast) {
	console.log(key);
	console.log(value);
}
```

The `Map.entries()` method returns back an iterator of key/value pairs as an array, similar to `entry` in the `for...of` loop example above. The `Map.values()` methods return back iterators with the `Map()` object's values.

```js
// logs ["name", "Radagast"], ["color", "brown"]
for (let entry of radagast.entries()) {
	console.log(entry);
}

// logs "Radagast", "brown"
for (let value of radagast.values()) {
	console.log(value);
}
```

## Getting, setting, and deleting values from a `Map()` object

The `Map()` object has several methods you can use to manipulate its values.

Use the `Map.set()` method to add or updated an item in a `Map()`. Call it on the `Map()` object, and pass in the key and its value as arguments

```js
// Adds "Talks to animals" with a key of "skills" to the radagast Map()
radagast.set('skills', 'Talks to animals');
```

Use the `Map.get()` method to get the value of a specific key in a `Map()` object. Pass in the key as an argument.

```js
// returns "brown"
let color = radagast.get('color');
```

Use the `Map.has()` method to check if the `Map()` object contains a specific key. Call it on the `Map()` object, and pass in the key as an argument.

It returns `true` if the `Map()` has the key, and `false` if it does not.

```js
// returns true
radagast.has('color');

// returns false
radagast.has('humanFriends');
```

Use the `Map.delete()` method to delete an item from a `Map()`. Call it on the `Map()` object, and pass in the key to delete as an argument.

```js
// Delete the "color" key from the radagast Map()
radagast.delete('color');
```

You can remove all items from a `Map()` object with the `Map.clear()` method.

```js
// Remove all items from radagast
radagast.clear();
```

Liek plain objects, `Map()` objects do not have a `length` property. Unlike a plain object, you can check how many items are in them with the `size` property.

```js
// returns 0 (because we used the radagast.clear() method)
radagast.size;
```

## When should you use `Map()` instead of a plain object

To me, the `Map()` object has some nice benefits, and some minor shortcomings.

One personal pet peeve of mine is that you cannot access properties in a `Map()` object using bracket or dot notation, like you could with a plain object.

```js
// returns undefined
let color1 = radagast.color;

// returns "brown"
let color2 = radagast.get('color');
```

If you need to stringify your data, there's no easy way to do that, either.

With a plain object, you can use the `JSON.stringify()` method. Bit when used with a `Map()`, it returns a string representation of an empty object.

```js
// returns "{}"
let stringified = JSON.stringify(radagast);
```

When a `Map()` object wins over a plain object, in my opinion, is in two areas:

1. Maintaining iteration order for entries
2. Exposing a way to get the number of items in the object

Item #2 can be easily worked around for plain objects using the `Object.keys()` method, though.

```js
let obj = {
	name: 'Radagast',
	color: 'brown'
};

// returns 2
let length = obj.keys().length;
```

Which is a long winded way of saying: if you need to preserve order, use a `Map()`. Otherwise, a plain object is probably the better bet.