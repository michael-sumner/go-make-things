---
categories:
- Code
- JavaScript
date: '2017-12-19'
title: Converting a string to an array with vanilla JavaScript
---

Yesterday, we looked at [how to convert an array to a string](/converting-an-array-to-a-string-with-vanilla-javascript/). Today, let's look at how to do the exact opposite: convert a string to an array.

The `String.split()` method converts a string into an array of strings, splitting the string every time it matches against a set of characters you provide as an argument. You can also optionally tell it to stop after a certain number of matches by passing in a number as a second argument.

## Examples

If you had a comma-separated list, you could split it into an array like this.

```js
var shoppingList = 'apples,pears,cookies,bread';

// Returns ["apples", "pears", "cookies", "bread"]
var shoppingListArray = shoppingList.split(',');
```

If you had spaces after your commas, though, you'd want to include that in your `delimiter` argument (the characters to split on).

```js
var shoppingList = 'apples, pears, cookies, bread';

// Returns ["apples", "pears", "cookies", "bread"]
var shoppingListArray = shoppingList.split(', ');
```

You can split by almost anything. Dashes, for example...

```js
var shoppingList = 'apples - pears - cookies - bread';

// Returns ["apples", "pears", "cookies", "bread"]
var shoppingListArray = shoppingList.split(' - ');
```

Or even spaces...

```js
var shoppingList = 'apples pears cookies bread';

// Returns ["apples", "pears", "cookies", "bread"]
var shoppingListArray = shoppingList.split(' ');
```

## Limiting the number of results

To limit the number of items in your array, pass in a second argument with the maximum number of items to add to the array.

For example, let's limit our shopping list to just two items.

```js
var shoppingList = 'apples, pears, cookies, bread';

// Returns ["apples", "pears"]
var shoppingListArray = shoppingList.split(', ', 2);
```

## Browser Compatibility

This works in all modern browsers, and back to at least IE 6.