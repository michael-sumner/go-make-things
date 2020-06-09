---
title: "Revisiting Array.reduce()"
date: 2020-06-09T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Back in December, I wrote [an article for 24 Ways about the `Array.reduce()` method](https://24ways.org/2019/five-interesting-ways-to-use-array-reduce/). At the time, I was still referring to `Array.reduce()` as my favorite JavaScript method.

(*Yes, I have a favorite. What, you don't?*)

In the last few months, I've started to come around to something [Jake and Surma from the HTTP 203 Podcast said back in January](/is-array.reduce-bad/): almost anything you do with `Array.reduce()` would be easier to read using a combination of other methods.

Today, I want to revisit the examples from my 24 Ways article, and show you how I would approach those same tasks today.

(*If you don't already know how `Array.reduce()` works, [go read this article first](/using-array.reduce-in-vanilla-js/). Otherwise, this article will get really confusing.*)

## Adding an array of numbers together

This is the *classic* example for the `reduce()` method.

```js
var total = [1, 2, 3].reduce(function (sum, current) {
	return sum + current;
}, 0);
```

And here's what it looks like using an `Array.forEach()` method instead.

```js
var total = 0;

[1, 2, 3].forEach(function (num) {
	total += num;
});
```

I think I like this version better.

It's an extra line, but it's *way* more obvious what's happening at a glance. Code should be as obvious as possible.

## Transforming and filtering an array

Let's say you have an array of wizards at Hogwarts.

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
```

You want to get a new array containing just the names of wizards in the `Hufflepuff` house.

Here's how you'd do it with `Array.reduce()`.

```js
var hufflepuff = wizards.reduce(function (newArr, wizard) {
	if (wizard.house === 'Hufflepuff') {
		newArr.push(wizard.name);
	}
	return newArr;
}, []);
```

You can do the same thing by combining `Array.map()` and `Array.filter()`.

```js
var hufflepuff = wizards.filter(function (wizard) {
	return wizard.house === 'Hufflepuff';
}).map(function (wizard) {
	return wizard.name;
});
```

This one is both much easier to read *and* fewer lines of code!

## Creating markup from an array

Looking at that same array of wizards again, let's say you wanted to create a list of wizards, with each one wrapped in a list item.

Here's how you could do it with `Array.reduce()`.

```js
var wizardList = '<ul>' + wizards.reduce(function (html, wizard) {
	html += '<li>' + wizard.name + '</li>';
	return html;
}, '') + '</ul>';
```

And here's [how you could do the same thing with the `Array.map()` and `Array.join()` methods](/using-array.map-to-create-markup-from-an-array-with-vanilla-js/).

```js
var wizardList = '<ul>' + wizards.map(function (wizard) {
	return '<li>' + wizard.name + '</li>';
}).join('') + '</ul>';
```

Once again, fewer lines and easier to read.

## Recreating the lodash `groupBy()` method with vanilla JS

lodash has a `groupBy()` method that groups items in an array together based on some criteria.

```js
/**
 * Group by integer value
 */
var numbers = [6.1, 4.2, 6.3];

// returns {'4': [4.2], '6': [6.1, 6.3]}
_.groupBy(numbers, Math.floor);


/**
 * Group by string length
 */

var words = ['one', 'two', 'three'];

// returns {'3': ['one', 'two'], '5': ['three']}
_.groupBy(words, 'length');
```

Here's how I recommended recreating this with `Array.reduce()` in the 24 Ways article ([Tom Bremer](https://tbremer.com/) provided some improvements to this one.)

```js
var groupBy = function (arr, criteria) {
	return arr.reduce(function (obj, item) {

		// Check if the criteria is a function to run on the item or a property of it
		var key = typeof criteria === 'function' ? criteria(item) : item[criteria];

		// If the key doesn't exist yet, create it
		if (!obj.hasOwnProperty(key)) {
			obj[key] = [];
		}

		// Push the value to the object
		obj[key].push(item);

		// Return the object to the next item in the loop
		return obj;

	}, {});
};
```

And here's what it would look like using the `Array.forEach()` method instead.

```js
var groupBy = function (arr, criteria) {

	var obj = {};

	arr.forEach(function (item) {

		// Check if the criteria is a function to run on the item or a property of it
		var key = typeof criteria === 'function' ? criteria(item) : item[criteria];

		// If the key doesn't exist yet, create it
		if (!obj.hasOwnProperty(key)) {
			obj[key] = [];
		}

		// Push the value to the object
		obj[key].push(item);

		// Return the object to the next item in the loop
		return obj;

	});

	return obj;
};
```

This is one of the rare instances where I think the `Array.reduce()` method and `Array.forEach()` approach are about equally as easy to read.

I'd probably be inclined to keep using the `Array.reduce()` approach for this one.

## Combining data from two sources into an array

Going back to our array of wizards again, let's imagine we have another data set, an object of house points each wizard has earned.

```js
var points = {
	HarryPotter: 500,
	CedricDiggory: 750,
	RonaldWeasley: 100,
	HermioneGranger: 1270
};
```

We want to combine both sets of data into a single array, with the number of points added to each wizard’s data in the wizards array.

In 24 Ways, I suggested using `Array.reduce()`, like this.

```js
var wizardsWithPoints = wizards.reduce(function (arr, wizard) {

	// Get the key for the points object by removing spaces from the wizard's name
	var key = wizard.name.replace(' ', '');

	// If the wizard has points, add them
	// Otherwise, set them to 0
	if (points[key]) {
		wizard.points = points[key];
	} else {
		wizard.points = 0;
	}

	// Push the wizard object to the new array
	arr.push(wizard);

	// Return the array
	return arr;

}, []);
```

Here's how you could do the same thing with `Array.map()`.

```js
var wizardsWithPoints = wizards.map(function (wizard) {

	// Get the key for the points object by removing spaces from the wizard's name
	var key = wizard.name.replace(' ', '');

	// If the wizard has points, add them
	// Otherwise, set them to 0
	if (points[key]) {
		wizard.points = points[key];
	} else {
		wizard.points = 0;
	}

	// Return the modified item
	return wizard;

});
```

This version is again both fewer lines of code and easier to read. Seems like a no-brainer to me.

## What about performance?

In a few of these examples, the `Array.reduce()` approach replaces multiple loops or methods even though it's slighter more code.

How does that impact performance? Does that outweigh the benefits of readability?

1. Unless you're looping over tens of thousands of items, the performance gains are usually negligible/imperceivable. We're talking a few milliseconds total here.
2. Optimize for readability and ease-of-maintenance. Let a capable minifier optimize for performance.

These days, I'm using `Array.reduce()` less and less, and other methods more and more.