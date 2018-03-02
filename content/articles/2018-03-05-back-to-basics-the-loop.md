---
title: "Back to basics: the vanilla JavaScript loop"
date: 2018-03-05T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

This week, we're going to back to basics. We'll be digging into how to loop over things with vanilla JavaScript

Frameworks and libraries like jQuery make this really easy, but in vanilla JS, there are a bunch of different ways to do it, and knowing which approach to use and when to use it can be a bit confusing. Let's clear that up.

And to kick things off, we're looking at the humble `for` loop.

## How the `for` loop works

The `for` loop is used to loop over arrays and NodeLists.

```js
for (initialization; condition; finalExpression) {
	// Thing to do in the loop
}
```

- The first part of the loop before the first semicolon, the `initialization`, is where you put anything that should happen before the loop runs.
- The second part between the two semicolons, the `condition`, is a test that gets checked after each iteration of loop. As long as it's `true`, the loop keeps going. If it returns `false`, the loop ends.
- Finally, after the second semicolon, the `finalExpression`, we specify what to run after each loop.

Let's look at an example.

```js
var sandwiches = [
	'tuna',
	'ham',
	'turkey',
	'pb&j'
];

for (var i = 0; i < sandwiches.length; i++) {
	console.log(i); // index
	console.log(sandwiches[i]); // value
}

// returns 0, "tuna", 1, "ham", 2, "turkey", 3, "pb&j"
```

For our `initialization`, we're setting up a counter variable. After each loop, we'll increase this by one, and use it to know which item in our array we're currently looking at in the loop.

In the `condition`, we'll make sure that our counter variable is smaller than the total number of items in our array. If it's not, we've looped through the whole array and can end the loop.

Finally, in our `finalExpression`, which runs after each iteration of the loop, we'll add `1` to our counter variable (`i`).

Inside the loop, we can use the `i` variable to get the current item in the loop from our array, like this.

```js
sandwiches[i];
```

*__Quick aside:__ Ever wonder what the difference between a NodeList and an array is? One is a JavaScript object. The other is actually part of the Browser API. [Learn more about the difference between the two here.](https://gomakethings.com/nodelists-vs-arrays/)*

## `for` loop performance

In the `condition`, we check the length of array or NodeList against `i`.

As an old best practice, people recommended caching that length into a variable so that the loop wouldn't have to recalculate it on each iteration.

```js
// This isn't necessary
for (var i = 0, len = sandwiches.length; i < len; i++) {
	console.log(i); // index
	console.log(sandwiches[i]); // value
}
```

For similar reasons, you'll also see people sometimes write loops that run backwards, setting `i` to the last item and working to `0`.

```js
// This isn't necessary either
for (var i = sandwiches.length - 1; i >= 0; i--) {
	console.log(i); // index
	console.log(sandwiches[i]); // value
}
```

Browser eventually figured this out, and started caching the length of loops for you behind the scenes, whether you do it or not.

Cache the length or don't cache the length. It doesn't really matter.

## Browser Compatibility

The `for` loop works in all modern browsers, and at least back to IE6.

Tomorrow, we'll look at a variation of the `for` loop: the `for...in` loop.