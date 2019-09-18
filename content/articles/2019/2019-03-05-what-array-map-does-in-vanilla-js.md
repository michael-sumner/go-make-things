---
title: "What Array.map() does in vanilla JS"
date: 2019-03-05T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

I find that my students often find `Array.forEach()` easier to understand than some of the other array methods (like `map()`, `filter()`, and so on).

Over the next few days, I wanted to take a look at a few array methods and break down how they work by comparing them to their `Array.forEach()` equivalents.

We'll start today with `Array.map()`.

## Syntactic Sugar

You may have heard the term *syntactic sugar* before.

It's a term that describes *syntax* (ways of writing code) that provide shortcuts, and make the code easier to write or read. Array methods like `map()`, `filter()`, `find()`, and `reduce()` are considered *syntactic sugar*.

Ironically, they often make things *harder* to read for beginners, because they hide what's really happening behind the scenes.

My hope for the next few days is that by examining what these methods actually do, you'll find them more enjoyable to use than the `forEach()` equivalents. Or at the very least, you'll be able to read and understand them better.

Let's dig in.

## `Array.map()`

The `Array.map()` method creates a new array from an existing one.

It loops through each item in the original array, transforms it in some way, and then pushes it into a new array. All of this happens behind-the-scenes.

For example, let's say you had an array of numbers, and you wanted to create a new array with the numbers doubled.

```js
var numbers = [3, 11, 42];
```

Using `Array.forEach()`, you would do this.

```js
// Create a new array
var doubled = [];

// Loop through each item in `numbers`
numbers.forEach(function (number) {
	// Double the number and push it to the `doubled` array
	doubled.push(number * 2);
});
```

With `Array.map()`, you don't have to create the `doubled` array beforehand. You can define the variable as the output of `Array.map()`.

Inside the `Array.map()` callback function, return the value you want added to the array. Under-the-hood, `Array.map()` loops through each item in the original array, runs your callback method on each item, creates a new array, and pushes whatever you return to it.

```js
// Create a new array of doubled numbers
var doubled = numbers.map(function (number) {
	return number * 2;
});
```

In both of these examples, `doubled` is `[6, 22, 84]`.

[Here's a demo.](https://codepen.io/cferdinandi/pen/eXBJjg)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="cferdinandi" data-slug-hash="eXBJjg" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="forEach() vs. map()"></p>