---
categories:
- Code
- JavaScript
date: '2017-12-18'
permalink: /converting-an-array-to-a-string-with-vanilla-javascript/
title: Converting an array to a string with vanilla JavaScript
url: /2017/12/18/converting-an-array-to-a-string-with-vanilla-javascript
---

You can use the `Array.join()` method to convert an array of items into a string.

By default, it will separate each item with a comma, but you can pass in any assortment of characters you'd like&mdash;dashes, spaces, or even an empty string to smush everything together into one long word.

```js
var shoppingList = [
	'apples',
	'pears',
	'cookies',
	'bread'
];

// Returns "apples,pears,cookies,bread"
var shoppingListString = shoppingList.join();

// Returns "apples pears cookies bread"
var shoppingListWithSpaces = shoppingList.join(' ');

// Returns "apples - pears - cookies - bread"
var shoppingListWithDashes = shoppingList.join(' - ');

// Returns "applespearscookiesbread"
var shoppingListSmushed = shoppingList.join('');
```

This works in all modern browsers, and back to at least IE6.