---
categories:
- Code
- JavaScript
date: '2018-01-15'
permalink: /sorting-an-array-by-multiple-criteria-with-vanilla-javascript/
title: Sorting an array by multiple criteria with vanilla JavaScript
url: /2018/01/15/sorting-an-array-by-multiple-criteria-with-vanilla-javascript
---

Last week, my friend [Andrew Borstein](http://andrewborstein.github.io/portfolio/) was playing around with a JavaScript upvoting system, and asked:

> I want to sort an array based on two properties. First sort by an integer, next sort by a string. So an array of objects might look like this:

```js
[
	{ title: 'Apple', votes: 1 },
	{ title: 'Milk', votes: 2 },
	{ title: 'Carrot', votes: 3 },
	{ title: 'Banana', votes: 2 }
]
```

> and then be sorted into this

```js
[
	{ title: 'Carrot', votes: 3 },
	{ title: 'Banana', votes: 2 },
	{ title: 'Milk', votes: 2 },
	{ title: 'Apple', votes: 1 }
]
```

In other words, show the item with the most votes first, and then for items with the same number of votes, sort alphabetically.

## Using `Array.sort()`

The `Array.sort()` method let's you compare items in an array and sort them.

To use it, you pass in a callback function that accepts two arguments. The first is the first item of the two it should compare, and the second is the second. You can name them anything you want.

```js
var votes = [
	{ title: 'Apple', votes: 1 },
	{ title: 'Milk', votes: 2 },
	{ title: 'Carrot', votes: 3 },
	{ title: 'Banana', votes: 2 }
];

votes.sort(function (vote1, vote2) {
	console.log(vote1);
	console.log(vote2);
});

// Logs this to the console...
// {title: "Apple", votes: 1}
// {title: "Milk", votes: 2}
// {title: "Milk", votes: 2}
// {title: "Carrot", votes: 3}
// {title: "Carrot", votes: 3}
// {title: "Banana", votes: 2}
```

`Array.sort()` works by looping through each item in the array and comparing it to the one after it based on some criteria you specify in your comparison function.

If you return `-1`, it will place the first item before the second. If you return `1`, it will place the second item before the first. If you return `0`, it will leave them unchanged.

## Sorting our votes

Let's put `Array.sort()` into action.

First, we want to sort by the number of votes. We'll compare each items number of votes (the `vote` property), and put the one with the most votes first.

```js
votes.sort(function (vote1, vote2) {

	// Sort by votes
	// If the first item has a higher number, move it down
	// If the first item has a lower number, move it up
	if (vote1.votes > vote2.votes) return -1;
	if (vote1.votes < vote2.votes) return 1;

});
```

The `votes` array looks like this now.

```js
[
	{title: "Carrot", votes: 3},
	{title: "Milk", votes: 2},
	{title: "Banana", votes: 2},
	{title: "Apple", votes: 1}
]
```

The items are sorted by votes, but not alphabetically yet. For example, `Banana` comes after `Milk`.

Right now, if `vote1` and `vote2` are the same, we do nothing and the order doesn't change. Let's instead then compare the `title` property, and move items that come first in the alphabet up.

With `Array.sort()`, if the letter comes later in the alphabet, it has a higher value than if it comes earlier.

```js
votes.sort(function (vote1, vote2) {

	// Sort by votes
	// If the first item has a higher number, move it down
	// If the first item has a lower number, move it up
	if (vote1.votes > vote2.votes) return -1;
	if (vote1.votes < vote2.votes) return 1;

	// If the votes number is the same between both items, sort alphabetically
	// If the first item comes first in the alphabet, move it up
	// Otherwise move it down
	if (vote1.title > vote2.title) return 1;
	if (vote1.title < vote2.title) return -1;

});
```

If you refresh your browser and try sorting again, the `votes` array will now look like this.

```js
[

	{title: "Carrot", votes: 3},
	{title: "Banana", votes: 2},
	{title: "Milk", votes: 2},
	{title: "Apple", votes: 1}
]
```

## Extending this for your own needs

You can change the criteria your sorting against to match the properties of whatever array you're working with. You can also change what value you return to switch the sorting order.

For example, if you wanted to return items with the fewest votes first, you'd switch which returns `1` and which returns `-1`.

```js
votes.sort(function (vote1, vote2) {

	// Sort by votes
	// If the first item has a higher number, move it down
	// If the first item has a lower number, move it up
	if (vote1.votes > vote2.votes) return 1;
	if (vote1.votes < vote2.votes) return -1;

	// If the votes number is the same between both items, sort alphabetically
	// If the first item comes first in the alphabet, move it up
	// Otherwise move it down
	if (vote1.title > vote2.title) return 1;
	if (vote1.title < vote2.title) return -1;

});
```

You can also sort by additional criteria. If you had an array of objects with more than two properties, you could, for example, sort by a third criteria if the `title` property was the same between two items (maybe `location` or `year`).