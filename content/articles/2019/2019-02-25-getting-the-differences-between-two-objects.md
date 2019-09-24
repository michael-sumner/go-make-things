---
title: "Getting the differences between two objects with vanilla JS"
date: 2019-02-25T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

On Friday, [I mentioned](/how-to-check-if-two-arrays-are-equal-with-vanilla-js/) that I was working with a student of mine, [Jascha Brinkmann](https://growtheme.com/), to create a helper function that finds the differences between two objects.

Today, let's look at how to do that.

## The challenge

Let's say you had two lunch orders as JavaScript objects.

```js
var order1 = {
	sandwich: 'tuna',
	chips: true,
	drink: 'soda',
	order: 1,
	toppings: ['pickles', 'mayo', 'lettuce'],
	details: {
		name: 'Chris',
		phone: '555-555-5555',
		email: 'no@thankyou.com'
	},
	otherVal1: '1'
};

var order2 = {
	sandwich: 'turkey',
	chips: true,
	drink: 'soda',
	order: 2,
	toppings: ['pickles', 'lettuce'],
	details: {
		name: 'Jon',
		phone: '(555) 555-5555',
		email: 'yes@please.com'
	},
	otherVal2: '2'
};
```

They're similar, but have a few differences.

Now let's imagine that you wanted to create an object with just the things that are different in `order2`. It would look something like this.

```js
var differences = {
	details: {
		name: 'Jon',
		phone: '(555) 555-5555',
		email: 'yes@please.com'
	},
	order: 2,
	otherVal1: null,
	otherVal2: '2',
	sandwich: 'turkey',
	toppings: ['pickles', 'lettuce']
};
```

Let's create a helper function, `diff()`, to figure that out for us.

## Creating a helper function

First, we'll setup our function, passing in our original object and the object to compare it to as arguments. If the second object doesn't exist or isn't actually an object, we'll return the first object in its entirety.

```js
var diff = function (obj1, obj2) {

    // Make sure an object to compare is provided
    if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
        return obj1;
    }

};
```

Next, let's setup a new `diffs` object that we'll push all of the things that are different into. We'll also setup a `key` placeholder value, since we'll be looping through both objects.

```js
var diff = function (obj1, obj2) {

    // Make sure an object to compare is provided
    if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
        return obj1;
    }


    //
    // Variables
    //

    var diffs = {};
    var key;

};
```

Next, we need to loop through our first object, and compare each value in it to the matching value in our second object.

We'll create a helper function, `compare()`, to handle that for us.

```js
var diff = function (obj1, obj2) {

    // Make sure an object to compare is provided
    if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
        return obj1;
    }


    //
    // Variables
    //

    var diffs = {};
    var key;


    //
    // Compare our objects
    //

    // Loop through the first object
    for (key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            compare(obj1[key], obj2[key], key);
        }
    }

};
```

## Comparing our objects

The `compare()` method is where all of the magic is going to happen. We'll do a few different things to see if the two items match. If they don't, we'll push the item from the second object into our `diffs` object.

First, let's accept the values from the first and second object as arguments.

We'll also accept the `key` for the current item as a third argument. We'll need this to push it into the `diffs` object.

```js
/**
 * Compare two items and push non-matches to object
 * @param  {*}      item1 The first item
 * @param  {*}      item2 The second item
 * @param  {String} key   The key in our object
 */
var compare = function (item1, item2, key) {
	// Code goes here...
};
```

Next, we'll get the object type for each item. Using `typeof` can be a bit inaccurate, so we'll [use `Object.prototype.toString.call()` to more accurately check the type of our item](/true-type-checking-with-vanilla-js/).

```js
/**
 * Compare two items and push non-matches to object
 * @param  {*}      item1 The first item
 * @param  {*}      item2 The second item
 * @param  {String} key   The key in our object
 */
var compare = function (item1, item2, key) {

    // Get the object type
    var type1 = Object.prototype.toString.call(item1);
    var type2 = Object.prototype.toString.call(item2);

};
```

If the second item is `undefined`, we'll push it with a value of `null` to the `diffs` object. If the two items are different types, we'll push the second one to `diffs`.


```js
/**
 * Compare two items and push non-matches to object
 * @param  {*}      item1 The first item
 * @param  {*}      item2 The second item
 * @param  {String} key   The key in our object
 */
var compare = function (item1, item2, key) {

    // Get the object type
    var type1 = Object.prototype.toString.call(item1);
    var type2 = Object.prototype.toString.call(item2);

    // If type2 is undefined it has been removed
    if (type2 === '[object Undefined]') {
        diffs[key] = null;
        return;
    }

    // If items are different types
    if (type1 !== type2) {
        diffs[key] = item2;
        return;
    }

};
```

If the items are objects, we'll recursively pass them back into the `diff()` helper function to get the differences between the two. If their are any, we'll push the object of differences to the `diffs` object.

If the objects are arrays, we'll use [the `arraysMatch()` method we built on Friday](/how-to-check-if-two-arrays-are-equal-with-vanilla-js/) to see if they match. If not, we'll push the second array to the `diffs` object.

```js
/**
 * Compare two items and push non-matches to object
 * @param  {*}      item1 The first item
 * @param  {*}      item2 The second item
 * @param  {String} key   The key in our object
 */
var compare = function (item1, item2, key) {

    // Get the object type
    var type1 = Object.prototype.toString.call(item1);
    var type2 = Object.prototype.toString.call(item2);

    // If type2 is undefined it has been removed
    if (type2 === '[object Undefined]') {
        diffs[key] = null;
        return;
    }

    // If items are different types
    if (type1 !== type2) {
        diffs[key] = item2;
        return;
    }

    // If an object, compare recursively
    if (type1 === '[object Object]') {
        var objDiff = diff(item1, item2);
        if (Object.keys(objDiff).length > 0) {
            diffs[key] = objDiff;
        }
        return;
    }

    // If an array, compare
    if (type1 === '[object Array]') {
        if (!arraysMatch(item1, item2)) {
            diffs[key] = item2;
        }
        return;
    }

};
```

Functions are hard to compare. If the items are functions, we'll convert them to strings with the `toString()` method and do a strict comparison (`!==`). For any other type, we'll just do a strict comparison.

If the items don't match, we'll push the second item to `diffs`.


```js
/**
 * Compare two items and push non-matches to object
 * @param  {*}      item1 The first item
 * @param  {*}      item2 The second item
 * @param  {String} key   The key in our object
 */
var compare = function (item1, item2, key) {

    // Get the object type
    var type1 = Object.prototype.toString.call(item1);
    var type2 = Object.prototype.toString.call(item2);

    // If type2 is undefined it has been removed
    if (type2 === '[object Undefined]') {
        diffs[key] = null;
        return;
    }

    // If items are different types
    if (type1 !== type2) {
        diffs[key] = item2;
        return;
    }

    // If an object, compare recursively
    if (type1 === '[object Object]') {
        var objDiff = diff(item1, item2);
        if (Object.keys(objDiff).length > 0) {
            diffs[key] = objDiff;
        }
        return;
    }

    // If an array, compare
    if (type1 === '[object Array]') {
        if (!arraysMatch(item1, item2)) {
            diffs[key] = item2;
        }
        return;
    }

    // Else if it's a function, convert to a string and compare
    // Otherwise, just compare
    if (type1 === '[object Function]') {
        if (item1.toString() !== item2.toString()) {
            diffs[key] = item2;
        }
    } else {
        if (item1 !== item2 ) {
            diffs[key] = item2;
        }
    }

};
```

## Checking for new items in the second object

We're almost done!

We looped through the first object and compared its values to the second object. *But...* if the second object has values that aren't in the first, they won't show up.

We need to loop through the second object and, for any key that's not in the first object, push it to `diffs`.

```js
// Loop through the second object and find missing items
for (key in obj2) {
    if (obj2.hasOwnProperty(key)) {
        if (!obj1[key] && obj1[key] !== obj2[key] ) {
            diffs[key] = obj2[key];
        }
    }
}
```

## Returning our object of differences

Now we can return `diffs`.

```js
// Return the object of differences
return diffs;
```

[Here's a working demo.](https://codepen.io/cferdinandi/pen/oVvKoe) You can also [find this on the Vanilla JS Toolkit](https://vanillajstoolkit.com).

## Browser compatibility

The `diff()` helper works in all modern browsers, and IE9 and above.