---
title: A vanilla JavaScript range() method
date: 2022-11-04T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Lots of languages have some sort of _range_ function, a method for creating an array with a range of numbers. JavaScript does not.

```js
// This is a range
let range = [1, 2, 3, 4, 5];
```

[I've written about this before](/how-to-create-a-range-of-numbers-with-vanilla-js/), but [my friend Kieran found a helper function in the in the MDN docs](https://barker.codes/blog/create-a-range-of-numbers-using-the-array-from-method/) that provides an interesting lesson in how JS works under-the-hood.

```js
/**
 * Create a range of numbers.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
 * @param {number} start The first number in the range.
 * @param {number} stop The last number in the range.
 * @param {number} step The step between each number in the range.
 * @returns {number[]} A range of numbers.
 */
function range(start, stop, step) {
	return Array.from(
		{ length: (stop - start) / step + 1 },
		(_, i) => start + i * step
	);
}
```

To create a range of numbers from `1` to `5`, you would do this...

```js
let sequence = range(1, 5, 1);
```

Personally, I would reverse the `start` and `stop` parameters, and use default values of `1` for `stop` and `step`. That would allow you to create a range starting with `1` and incrementing by `1` using only one parameter.

```js
function range(stop, start = 1, step = 1) {
	return Array.from(
		{ length: (stop - start) / step + 1 },
		(_, i) => start + i * step
	);
}

let sequence = range(5);
```

What makes this function interesting, though, isn't just what it _does_, but what it teaches us about arrays and objects.

[Kieran writes...](https://barker.codes/blog/create-a-range-of-numbers-using-the-array-from-method/)

> Arrays are just a type of object and their indices are just properties... For a quick summary, consider the following code:
> 
> ```js
> const colors = ["red", "green", "blue"];
> Object.getOwnPropertyDescriptors(colors);
> ```
> 
> In this case, the return value of the `Object.getOwnPropertyDescriptors()` method is an object with the following structure:
> 
> ```js
> {
>  "0": {
>    configurable: true,
>    enumerable: true,
>    value: "red",
>    writable: true
>  },
>  // ...
> }
> ```
> 
> This tells us that the value of the colors constant (an array) is actually an object with four of its own properties...

[I'd recommend you go read the whole thing.](https://barker.codes/blog/create-a-range-of-numbers-using-the-array-from-method/) It's really interesting!