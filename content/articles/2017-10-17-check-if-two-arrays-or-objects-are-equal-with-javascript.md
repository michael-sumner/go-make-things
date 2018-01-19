---
categories:
- Code
- JavaScript
date: '2017-10-17'
permalink: /check-if-two-arrays-or-objects-are-equal-with-javascript/
title: Check if two arrays or objects are equal with JavaScript
url: /2017/10/17/check-if-two-arrays-or-objects-are-equal-with-javascript
---

Yesterday, we looked at a way to [tell if two arrays are equal with JavaScript](/checking-if-two-arrays-are-equal/). The approach is fast and simple, but falls apart pretty quickly for all but the most basic of arrays.

Today, we're going to look at a much more robust way to compare two arrays (or objects) and check if they're equal to each other.

## What we need to compare

You could have a simple array, like this one.

```lang-js
var arr = [1, 2, 3, 4, 5];
```

Or, you could have a complex, multidimensional array with various types of inputs.

```lang-js
var arr = [1, 'something', 3, {
	item1: 42,
	item2: 'another thing',
	item3: function () {
		console.log('running!');
	}
}, 5];
```

To properly compare two arrays or objects, we need to check:

1. That they're the same object type (array vs. object).
2. That they have the same number of items.
3. That each item is equal to its counterpart in the other array or object.
	- That they're the same object type (array vs. object vs. string vs. number vs. function).
	- That they have the same value.

And if the item is itself an array or object, we need to compare all of its values against that same items values in the other array or object.

To make this all work, we're going to create a helper function to test all of these things. Let's get started...

## Setting up our helper function

Let's create a helper function called `isEqual()` (the same name used by libraries like Underscores and lodash, for the sake of keeping with convention).

We'll accept two arguments: the `value` is one array or object, and `other` is the other array or object to compare it against.

```lang-js
var isEqual = function (value, other) {
	// Code will go here...
};
```

We're going to run a series of tests in our helper function. If at any point one of them fails, we'll immediately `return false` to indicate they're not equal.

If at the end the function is still running, it means all of our tests and comparisons passed and we can `return true`. They're a match.

```lang-js
var isEqual = function (value, other) {

	// Tests will go here...

	// If nothing failed, return true
	return true;

};
```

## Some basic tests

There are a few basic tests we can run right away to quickly eliminate any arrays or objects that obviously aren't equal.

First, if `value` is an object and `other` is an array (or vice-versa), they're not equal. We'll use `Object.prototype.toString.call()` to get the true object type (`typeof` returns `object` for both objects and arrays) and compare them. We're going to need the object type later in our function, so for `value`, we'll save it to a variable.

```lang-js
var isEqual = function (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// More tests will go here...

	// If nothing failed, return true
	return true;

};
```

Next, we want to make sure our two items are either an object or an array. Our function won't really be setup to compare strings, functions, and so on.

We'll use `Arry.typeOf()` against our `type` variable for this.

```lang-js
var isEqual = function (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// More tests will go here...

	// If nothing failed, return true
	return true;

};
```

Finally, if our two arrays or objects have a different number of items in them, they're not equal.

You can easily get the value of an array using `array.length`. For objects, we can use `Object.keys()` to get an array of the object's keys, and then get the length of that.

<hr class="margin-top margin-bottom">
*`Object.keys()` works in all modern browsers, and IE9 and up, but there's [a polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys#Polyfill) if you need more backwards compatibility.*
<hr class="margin-top margin-bottom">

We'll create variables for the length of both `value` and `other`, and use a [ternary operator](/ternary-operators/) to set it based on our `type`. Then, we'll compare our two lengths. If they're not equal, we'll `return false`.

```lang-js
var isEqual = function (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// More tests will go here...

	// If nothing failed, return true
	return true;

};
```

## Comparing item values

Now that we've got some basic checks out of the way, we can start comparing the values of the items in our array or object.

To start, we want to loop through each item in our `value` array or object. The way you look through objects and arrays, is different, so let's setup an `if...else` statement to check out `type`, and create the appropriate loop.

```lang-js
var isEqual = function (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			// Compare the item
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				// Compare the item
			}
		}
	}

	// If nothing failed, return true
	return true;

};
```

We're going to compare the items the same way whether it's an object or an array, and we don't want to write the same code twice. Let's set up a `compare()` function that we can pass our `value` and `other` items into.

We'll pass in either the `value[i]` or `value[key]` as the first argument, and `other[i]` or `other[key]`&mdash;the comparable item in the `other` object or array&mdash; as the second argument.

```lang-js
var isEqual = function (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare two items
	var compare = function (item1, item2) {
		// Code will go here...
	};

	// Compare properties
	var match;
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			compare(value[i], other[i]);
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				compare(value[key], other[key]);
			}
		}
	}

	// If nothing failed, return true
	return true;

};
```

## Comparing two items

First, let's get the type for our item. We'll need this information more than once, so let's set it to the `itemType` variable.

If it's an array or object, we'll pass it back into the `isEqual()` method. When a function calls itself like this, it's known as a *rescursive* function. If the test fails, we'll `return false`.

```lang-js
// Compare two items
var compare = function (item1, item2) {

	// Get the object type
	var itemType = Object.prototype.toString.call(item1);

	// If an object or array, compare recursively
	if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
		if (!isEqual(item1, item2)) return false;
	}
};
```

If it's not an array or object, we'll do a simple comparison to check our two item values. First, we'll make sure that `item1` and `item2` are the same type.

```lang-js
// Compare two items
var compare = function (item1, item2) {

	// Get the object type
	var itemType = Object.prototype.toString.call(item1);

	// If an object or array, compare recursively
	if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
		if (!isEqual(item1, item2)) return false;
	}

	// Otherwise, do a simple comparison
	else {

		// If the two items are not the same type, return false
		if (itemType !== Object.prototype.toString.call(item2)) return false;

	}
};
```

Now, we can compare are two values using a simple `===` comparison operator.

We need to account for one last edge case, though. If the item is a function, we need to convert it to a string using the `toString()` method so that we can compare it. Otherwise (if it's a string or number), we can just compare it as-is.

```lang-js
// Compare two items
var compare = function (item1, item2) {

	// Get the object type
	var itemType = Object.prototype.toString.call(item1);

	// If an object or array, compare recursively
	if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
		if (!isEqual(item1, item2)) return false;
	}

	// Otherwise, do a simple comparison
	else {

		// If the two items are not the same type, return false
		if (itemType !== Object.prototype.toString.call(item2)) return false;

		// If it's a function, convert to a string and compare
		// Otherwise, just compare
		if (itemType === '[object Function]') {
			if (item1.toString() !== item2.toString()) return false;
		} else {
			if (item1 !== item2) return false;
		}

	}
};
```

## Getting the value of our `compare()` function

As we loop through each item and compare it, we need to check if our `compare()` function returns `false`. If it does, we need to `return false`, too, since the two items are not a match.

(The `return false` in `compare()` is scoped to that function and doesn't affect the `isEqual()` function.)

```lang-js
var isEqual = function (value, other) {

	// ...

	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};
```

## Putting it all together

We can now test two objects or arrays to see if they're equal by passing them in to our `isEqual()` function.

```lang-js
var arr1 = [1, 2, 3, 4, 5];
var arr2 = [1, 2, 3, 4, 5];
isEqual(arr1, arr2); // returns true

var arrObj1 = [1, 2, {
	a: 1,
	b: 2,
	c: 3
}, 4, 5];
var arrObj2 = [1, 2, {
	c: 3,
	b: 2,
	a: 1
}, 4, 5];
isEqual(arrObj1, arrObj2); // returns true

var arr1 = [1, 2, 3, 4, 5];
var arr3 = [5, 4, 3, 2, 1];
isEqual(arr1, arr3); // returns false
```

Here's the complete helper function.

```lang-js
var isEqual = function (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare two items
	var compare = function (item1, item2) {

		// Get the object type
		var itemType = Object.prototype.toString.call(item1);

		// If an object or array, compare recursively
		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(item1, item2)) return false;
		}

		// Otherwise, do a simple comparison
		else {

			// If the two items are not the same type, return false
			if (itemType !== Object.prototype.toString.call(item2)) return false;

			// Else if it's a function, convert to a string and compare
			// Otherwise, just compare
			if (itemType === '[object Function]') {
				if (item1.toString() !== item2.toString()) return false;
			} else {
				if (item1 !== item2) return false;
			}

		}
	};

	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};
```