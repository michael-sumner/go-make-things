---
title: "How to shuffle an array with vanilla JS"
date: 2018-06-13T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

While languages like PHP and Ruby have built in methods for shuffling arrays, JavaScript does not.

The most commonly recommended solution for this is to use the [Fisher-Yates (or Knuth) Shuffle algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle):

> The Fisher–Yates shuffle is an algorithm for generating a random permutation of a finite sequence—in plain terms, the algorithm shuffles the sequence. The algorithm effectively puts all the elements into a hat; it continually determines the next element by randomly drawing an element from the hat until no elements remain. The algorithm produces an unbiased permutation: every permutation is equally likely. The modern version of the algorithm is efficient: it takes time proportional to the number of items being shuffled and shuffles them in place.
>
> The Fisher–Yates shuffle is named after Ronald Fisher and Frank Yates, who first described it, and is also known as the Knuth shuffle after Donald Knuth.

Here's a [helper function that uses the Fisher-Yates algorithm](https://stackoverflow.com/a/2450976/1293256).

```js
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};
```

This will shuffle the original array. It does not return a copy.

If you want to keep the original unshuffled, use `Array.slice()` to pass in a copy.

```js
var lunch = ['sandwich', 'soda', 'chips', 'cookie'];

// Shuffle lunch
shuffle(lunch);

// Create a new, shuffled array from lunch
var shuffledLunch = shuffle(lunch.slice());
```