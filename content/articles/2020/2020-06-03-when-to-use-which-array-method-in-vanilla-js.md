---
title: "When to use which array method in vanilla JS"
date: 2020-06-03T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

One of the things that trips up a lot of my students who are new to JavaScript is when to use each of the different array methods.

Today, we're going to take a look at each of them, and when you would use one versus the other.

Let's dig in.

## `Array.forEach()`

The `Array.forEach()` method let's you loop through an array and do something with each item in it.

You pass in a callback function. That callback function automatically receives the current item and the index of the current item as arguments.

You can call those arguments anything you want. I used `wizard` and `index` here, but you could call them `wiz` and `i` or anything else you want.

```js
var wizards = ['Harry', 'Hermione', 'Neville'];

// Loop through each wizard and log to the console
wizards.forEach(function (wizard, index) {
	if (wizard === 'Hermione') {
		console.log('The best!', index);
	} else {
		console.log(wizard, index);
	}
});
```

This is a good general, all-purpose method. You can use it instead of all the other methods we're going to talk about, but it works best when you want to do something with an array, but don't need to get any content back out.

## `Array.map()`

The `Array.map()` method creates a new array from an existing one by modifying each item.

For example, let's say I wanted to take my array of wizards, and make an unordered list from it. I could use `Array.forEach()` and string concatenation.

```js
var items = '';
wizards.forEach(function (wizard, index) {
	items += wizard;
});
list.innerHTML = '<ul>' + items + '</ul>';
```

And here's how you would do it with `Array.map()` instead. Inside the callback function, `return` the new value.

In this example, we're [using the `Array.join()` method](https://vanillajstoolkit.com/reference/arrays/array-join/) to combine all of the items in our new array into a single string.

```js
var items = wizards.map(function (wizard, index) {
	return '<li>' + wizard + '</li>';
});
list.innerHTML = '<ul>' + items.join('') + '</ul>';
```

The `Array.map()` method is the best choice when you need to modify every item in an array.

## `Array.filter()`

The `Array.filter()` method creates a new array that contains a subset of items that match some criteria you specify.

Let's say you wanted to get array of just wizards whose names have more than five characters in them. Here's how you would do that with `Array.forEach()`.

```js
var moreThanFive = [];
wizards.forEach(function (wizard) {
	if (wizard.length > 5) {
		moreThanFive.push(wizard);
	}
});
```

And here's how you would do it with `Array.filter()`. Inside the callback function, `return true` if the item should be added to the new array.

```js
var moreThanFive = wizards.filter(function (wizard) {
	if (wizard.length > 5) {
		return true;
	}
});
```

The `Array.filter()` method is the best choice when you need a new array that contains just a subset of the original.

## `Array.reduce()`

The `Array.reduce()` method takes all of the items in an array, and outputs a new, single value. That value could be a string or number, but it could also be an object or an array.

Let's say you want to get an array of first letters in your wizards name, without duplicates. With the wizards we have in the array, the output should be `['H', 'N']`.

Here's how you would do that with `Array.forEach()`.

```js
var firstLetter = [];
wizards.forEach(function (wizard) {

	// Get the first letter
	var letter = wizard.slice(0, 1);

	// Check if the letter is already in the array
	// If it is, do nothing
	if (firstLetter.indexOf(letter) > -1) return;

	// Otherwise, add it to the array
	firstLetter.push(letter);

});
```

You can also use the `Array.map()` and `Array.filter()` methods together to do this.

The callbacks for all of the methods we've looked at so far accept a third argument for the array being looped over. It's useful when chaining methods like this.

```js
var firstLetter = wizards.map(function (wizard) {
	return wizard.slice(0, 1);
}).filter(function (letter, index, arr) {
	// Make sure the index in the array is the same as the current index
	// If not, this is a duplicate
	if (arr.indexOf(letter) === index) return true;
});
```

And here's how you can do it with `Array.reduce()`.

With this method, there's a second argument after the callback: the starting value. The first argument in the callback function is the current state of that value. In the callback, the last thing you do is `return` that value for use on the next loop.

```js
var firstLetter = wizards.reduce(function (arr, wizard) {

	// Get the first letter
	var letter = wizard.slice(0, 1);

	// If the letter isn't in the array yet, add it
	if (arr.indexOf(letter) < 0) {
		arr.push(letter);
	}

	return arr;

}, []);
```

Honestly, I'm increasingly feeling like anything you can do with `Array.reduce()` is simpler and easier to read using one or more of the other array methods.

I find myself using it less and less.