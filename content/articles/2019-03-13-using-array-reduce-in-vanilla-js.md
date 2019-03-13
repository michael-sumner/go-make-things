---
title: "Using Array.reduce() in vanilla JS"
date: 2019-03-13T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Of all the modern array methods, `Array.reduce()` has always been the most confusing to me. Every demo or tutorial I've seen has been focused on a pretty limited use-case: adding numbers together.

I just couldn't wrap my head around what else you would use it for.

Then yesterday, reader [Dillon Headley](https://www.instagram.com/build.script.log/) helped me out a ton by taking the time to share some more concrete examples and explain it to me better.

Today, with his permission, I wanted to share what Dillon taught me.

## How `Array.reduce()` works

Most of the modern array methods return a new array. The `Array.reduce()` method is a bit more flexible. It can return anything.

It's purpose is to take an array and condense it's content into a single value.

That value can be a number, a string, or even an object or new array. That's the part that's always tripped me up. I didn't realize just how flexible it is!

### An example

The `Array.reduce()` accepts two arguments: a callback method to run against each item in the array, and a starting value.

The callback also accepts two arguments: the `accumulator`, which is the current combined value, and the `current` item in the loop. Whatever you return is used as the `accumulator` for the next item in the loop. On the very first loop, that starting value is used instead.

Here's a cliche example of adding a bunch of numbers together. I find the word `accumulator` confusing, so in this example, I'm calling it `sum`, because that's what it is.

```js
var total = [1, 2, 3].reduce(function (sum, current) {
	return sum + current;
}, 0);
```

Here, we pass in `0` as our starting value.

In the callback, we add the current value to the `sum`, which has our starting value of `0` on the first loop, then `1` (the starting value of `0` plus the item value of `1`), then `3` (the `sum` value of `1` plus the item value of `2`), and so on.

[Here's a demo.](https://codepen.io/cferdinandi/pen/drJOOB)

Here's what this would look like with `Array.forEach()`.

```js
var total = 0;

[1, 2, 3].forEach(function (num) {
	total += num;
});
```

## Creating a new array

Remember [my article on chaining methods last week](/chaining-array-methods-in-vanilla-js/)?

We used `Array.filter()` and `Array.map()` to create a new array containing only the names of wizards in the Hufflepuff house.

```js
var wizards = [
	{
		name: 'Harry Potter',
		house: 'Gryfindor'
	},
	{
		name: 'Cedric Diggory',
		house: 'Hufflepuff'
	},
	{
		name: 'Tonks',
		house: 'Hufflepuff'
	},
	{
		name: 'Ronald Weasley',
		house: 'Gryfindor'
	},
	{
		name: 'Hermione Granger',
		house: 'Gryfindor'
	}
];

var hufflepuff = wizards.filter(function (wizard) {
	return wizard.house === 'Hufflepuff';
}).map(function (wizard) {
	return wizard.name;
});
```

Dillon showed me how you can use `Array.reduce()` to achieve the same output in a single pass.

You pass in an empty array as the starting value. On each pass, you check to see if the `wizard.house` is `Hufflepuff`. If so, you push it to the `newArr`. If not, you do nothing.

Either way, you return the `newArr` to become the `accumulator` on the next pass.

```js
var hufflepuff = wizards.reduce(function (newArr, wizard) {
	if (wizard.house === 'Hufflepuff') {
		newArr.push(wizard.name);
	}
	return newArr;
}, []);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/jJYVyL)

## Creating markup from an array

Last week, I also showed you [this trick for creating markup from an array using the `Array.map()` and `join()` methods](/using-array.map-to-create-markup-from-an-array-with-vanilla-js/).

```js
var wizards = ['Hermione', 'Neville', 'Gandalf'];

var markup = wizards.map(function (wizard) {
	return '<li>' + wizard + '</li>';
}).join('');
```

Here's how you would do that with `Array.reduce()`.

```js
var markup = wizards.reduce(function (html, wizard) {
	return html + '<li>' + wizard + '</li>';
}, '');
```

[Here's yet another demo.](https://codepen.io/cferdinandi/pen/LaebqE)

Personally, I think I still prefer `map()` and `join()`, but it's could to know that you can use either.

## `Array.reduce()` is fuzzy

The `Array.reduce()` method is flexible and can do a lot of things, which makes identify clear use cases for it a bit harder.

Treat this one as another tool in your kit. It's there when you need it, though that probably won't be as often as some of the other methods.

## Browser compatibility

The `Array.reduce()` method works in all modern browsers, and back to IE9.