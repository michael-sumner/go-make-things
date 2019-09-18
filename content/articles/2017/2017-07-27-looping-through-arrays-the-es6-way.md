---
categories:
- Code
- JavaScript
date: '2017-07-27'
url: /looping-through-arrays-the-es6-way/
title: Looping through arrays the ES6 way
---

The traditional way of looping through arrays in vanilla JavaScript is with a `for` loop:

```javascript
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

// returns 0, tuna, 1, ham, 2, turkey, 3, pb&j
```

- In the first part of the loop, before the first semicolon, we set a counter variable (typically `i`, but it can be anything) to `0`.
- The second part, between the two semicolons, is the test we check against after each iteration of the loop. In this case, we want to make sure the counter value is less than the total number of items in our array. We do this by checking the `.length` of our array.
- Finally, after the second semicolon, we specify what to run after each loop. In this case, we're adding `1` to the value of `i` with `i++`.

We can then use `i` to grab the current item in the loop from our array.

It works, but it's kind of a pain to work with. If you you use loops often, I generally recommended using something like [Todd Motto's forEach.js helper method](https://github.com/toddmotto/foreach/).

## ES6 offers a simple, native solution

Just like jQuery, we now have a native `forEach()` method.

```javascript
var sandwiches = [
	'tuna',
	'ham',
	'turkey',
	'pb&j'
];

sandwiches.forEach(function (sandwich, index) {
	console.log(index); // index
	console.log(sandwich); // value
});
```

This works back to IE9, and if you need further backwards compatibility, there's [also a polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill) available. I've started using [polyfill.io](https://polyfill.io/) on my projects to handle this automatically for me, and it's awesome.

Tomorrow, we'll look at [how to loop through NodeLists](/looping-through-nodelists-with-es6/).