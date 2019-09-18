---
title: "How to add a new item to an object at a specific position with vanilla JS"
date: 2018-10-25T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This morning, [Kieran Barker](https://github.com/kieranbarker) asked me:

> Anyone know whether it’s possible to add an item to a specific position inside an object?

So here's the thing: unlike arrays, objects don’t have an index.

_Technically_ the browser can order them however it wants. If you need a specific order, you’re supposed to use an array

In practical terms, the object order is almost always maintained. If you add a new item to an object, it typically gets added to the end of the object.

```js
var lunch = {
  sandwich: 'turkey',
  drink: 'soda',
  chips: true
};

// This gets added after "lunch.chips" in the object
lunch.dessert = 'cookie';
```

To add an item to a specific index in the object, we need to:

1. Create a new object.
2. Setup a variable to count the number of loops (since objects don’t have a native index).
3. Loop through the original object.
4. If the index variable equals the position you want to insert the new key/value pair into, push that to the new object.
5. Push the old key/value pairs into the new object.
6. Increase the index at the end of each loop.

I wrote [a small helper function](https://vanillajstoolkit.com/helpers/addtoobject/) to handle this.

```js
var addToObject = function (obj, key, value, index) {

	// Create a temp object and index variable
	var temp = {};
	var i = 0;

	// Loop through the original object
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {

			// If the indexes match, add the new item
			if (i === index && key && value) {
				temp[key] = value;
			}

			// Add the current item in the loop to the temp obj
			temp[prop] = obj[prop];

			// Increase the count
			i++;

		}
	}

	// If no index, add to the end
	if (!index && key && value) {
		temp[key] = value;
	}

	return temp;

};
```

Here's how you would use it.

```js
// Original object
var lunch = {
  sandwich: 'turkey',
  drink: 'soda',
  chips: true
};

// Add to the end of the object
var lunchWithDessert = addToObject(lunch, 'dessert', 'cookie');

// Add between sandwich and drink
var lunchWithTopping = addToObject(lunch, 'topping', 'tomato', 1);

// Immutable copy of lunch
var lunchClone = addToObject(lunch);
```

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/mzaWeE)