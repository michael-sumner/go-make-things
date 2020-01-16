---
title: "JavaScript gotcha: object.assign() merges into the first object"
date: 2020-01-16T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The `object.assign()` method performs a shallow merge of two or more objects.

You pass in each object you want to merge as an argument, and `object.assign()` will spit out a single object with all of their properties combined.

*__Note:__ in a shallow merge, nested objects are overwritten completely rather than having their values merged together.*

```js
var object1 = {
	apple: 0,
	banana: {
		weight: 52,
		price: 100
	},
	cherry: 97
};

var object2 = {
	banana: {
		price: 200
	},
	durian: 100
};

var object3 = {
	apple: 'yum',
	pie: 3.214,
	applePie: true
};

// In this example, "banana" will only contain {price: 200}
// In a deep merge, it would contain {price: 200, weight: 52}
var merged = Object.assign(object1, object2, object3);
```

Where people sometimes get tripped is that `Object.assign()` merges all of the objects *into* the first one that's passed in.

In the example above, `merged` and `object1` are identical. [Here's a demo.](https://codepen.io/cferdinandi/pen/gObdXvX)

To create a completely new object, pass in an empty object as the first argument.

```js
var merged = Object.assign({}, object1, object2, object3);
```

Now, `merged` is the combined object, while `object1` retains its original properties. [Here's another demo for you.](https://codepen.io/cferdinandi/pen/NWPLwYB)