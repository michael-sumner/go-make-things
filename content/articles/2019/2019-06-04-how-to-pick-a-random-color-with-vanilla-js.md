---
title: "How to pick a random color with vanilla JS"
date: 2019-06-04T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at how to pick a random color from a set of options.

## Getting started

For this to work, you need to...

1. Create an array of colors.
2. Shuffle the array.
3. Grab the first item from the now-shuffled array and set your elements background-color to it.

Let's get started by creating a `randomColor()` function.

```js
var randomColor = function () {
	// Pick a random color...
};
```

## Picking the color

First, let's create an array of color options.

```js
var randomColor = function () {

	// The available colors
	var colors = ['blue', 'red', 'yellow', 'orange', 'green', 'rebeccapurple'];

};
```

Next, we need to shuffle the array of colors. There's no native JavaScript method for that, but [I wrote a helper function for that](https://vanillajstoolkit.com/helpers/shuffle/). And [here's my article explaining how it works](https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/).

Once we add that to the code, we can shuffle our array.

```js
var shuffle = function (arr) {
	// The helper function code...
	// Condensed for space
};

var randomColor = function () {

	// The available colors
	var colors = ['blue', 'red', 'yellow', 'orange', 'green', 'rebeccapurple'];

	// Shuffle the colors
	shuffle(colors);

};
```

Finally, we can return the first color from the now shuffled list.

```js
var randomColor = function () {

	// The available colors
	var colors = ['blue', 'red', 'yellow', 'orange', 'green', 'rebeccapurple'];

	// Shuffle the colors
	shuffle(colors);

	// Grab the first one
	return colors[0];

};
```

[Here's a demo of it in action.](https://codepen.io/cferdinandi/pen/RmEwRr)