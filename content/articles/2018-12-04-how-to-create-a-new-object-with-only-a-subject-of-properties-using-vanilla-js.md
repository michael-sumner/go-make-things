---
title: "How to create a new object with only a subject of properties using vanilla JS"
date: 2018-12-04T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

If that headline seems absurdly specific, it was spawned by [this tweet yesterday from Mark Lambe](https://twitter.com/MarkLambe_/status/1069557290565595136):

> My efforts to use vanilla JS rather than lodash are mostly harmed by `_.pick`, which is handy.

[The `_.pick` method](https://lodash.com/docs/#pick) creates a new object that contains only a subset of properties from the original.

```js
var lunch = {
	sandwich: 'turkey',
	drink: 'water',
	chips: 'salt and vinegar',
	desert: true
};

var healthier = _.pick(lunch, ['sandwich', 'drink']);

// logs {sandwich: 'turkey', drink: 'water'}
console.log(healthier);
```

I love helping people make the transition to vanilla JS, so I threw together [a quick helper function to replace `_.pick()`](https://vanillajstoolkit.com/helpers/pick/) for Mark.

You pass in an object, and an array of properties to pull from it.

The `pick()` helper function loops through each of those properties, grabs it's value from the original, and pushes it to a new object. Then, it returns the new object.

```js
var pick = function (obj, props) {

	'use strict';

	// Make sure object and properties are provided
	if (!obj || !props) return;

	// Create new object
	var picked = {};

	// Loop through props and push to new object
	props.forEach(function(prop) {
		picked[prop] = obj[prop];
	});

	// Return new object
	return picked;

};
```

And here's how you'd use it.

```js
var lunch = {
	sandwich: 'turkey',
	drink: 'water',
	chips: 'salt and vinegar',
	desert: true
};

var healthier = pick(lunch, ['sandwich', 'drink']);

// logs {sandwich: 'turkey', drink: 'water'}
console.log(healthier);
```

[You can see it in action here.](https://codepen.io/cferdinandi/pen/MzxMeE?editors=0012)

<p data-height="265" data-theme-id="0" data-slug-hash="MzxMeE" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="pick.js" class="codepen"></p>