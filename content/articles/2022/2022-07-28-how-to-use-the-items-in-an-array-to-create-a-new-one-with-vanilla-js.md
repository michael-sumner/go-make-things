---
title: How to use the items in an array to create a new one with vanilla JavaScript
date: 2022-07-28T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at the `Array.map()` method, and how you can use it to create new arrays from existing ones. Let's dig in!

## An example

Imagine you have an array of `numbers`.

```js
let numbers = [1, 4, 9];
``` 

You want to create a new array with the values `doubled`.

Traditionally, you might use a `for...of` loop and the `Array.push()` method to handle this for you.

```js
// Create a new array
let doubled = [];

// Double each value and push it into the new array
for (let num of numbers) {
	doubled.push(num * 2);
}
```

The `Array.map()` method simplifies this.

[Here's a demo.](https://codepen.io/cferdinandi/pen/mdxqryj?editors=1011)

## How the `Array.map()` method works

You call the `Array.map()` method on an array, and pass in a callback function that accepts three arguments: the current item in the loop, its index, and the array itself. All three are optional.

Whatever you `return` inside the callback function becomes the new value at that index in the new array.

Here's how we could use it to create our `doubled` array.

```js
let doubled = numbers.map(function(num) {
	return num * 2;
});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/NWYwRPV?editors=1011)

As you can see, this is a lot more short and concise.

## A more complex example

Here, we have an array of `data` about some employees. 

```js
/**
 * Get an array of just names
 */
let data = [
	{
		name: 'Kyle',
		occupation: 'Fashion Designer'
	},
	{
		name: 'Liza',
		occupation: 'Web Developer'
	},
	{
		name: 'Emily',
		occupation: 'Web Designer'
	},
	{
		name: 'Melissa',
		occupation: 'Fashion Designer'
	},
	{
		name: 'Tom',
		occupation: 'Web Developer'
	}
];
```

We want to create an array of just their names. With `Array.map()`, we would do this.

```js
let names = data.map(function (item) {
	return item.name;
});
```

### When would you ever use the third `array` parameter?

The third parameter in the `Array.map()` callback function is the `array` that the `Array.map()` method was called on. If you're calling it on an array, when would you ever actually need that?

The argument is useful if you have an array that's not assigned to a variable.

You might create an array and then immediately run `Array.map()` on it. Or you might be chaining `Array.map()` with another array method.

```js
let wizardIDs = ['Merlin', 'Gandalf', 'Ursula'].map(function (wizard, index, allWizards) {
	if (allWizards.length > 2) {
		console.log(`Wow, that's a lot of wizards!`);
	} else {
		console.log(`Not that many wizards?`);
	}
	return `${index}_${wizard}`;
});
```