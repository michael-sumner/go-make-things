---
title: "Getting an array from a string with vanilla JS"
date: 2021-05-05T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Lets imagine that we have a comma-separated string of `shoppingList` items, and we want to convert it into an array.

```js
let shoppingList = 'soda, turkey sandwiches, potato chips, chocolate chip cookies';
```

Today, we're going to look at how to do that, and a few considerations. Let's dig in...

## The `String.split()` method

The `String.split()` method converts a string into an array by splitting it after a specific character (or characters). The first argument, the `delimiter`, the character or characters to split by.

We can use the `String.split()` method on it, passing in a comma (`,`) as the delimiter.

```js
// returns ["soda", " turkey sandwiches", " potato chips", " chocolate chip cookies"]
let menu = shoppingList.split(',');
```

## Removing leading white space

In `menu`, each item after `soda` in the list will have a leading space before it. To fix this, we can pass in a comma _with_ a space as the delimiter instead.

```js
// returns ["soda", "turkey sandwiches", "potato chips", "chocolate chip cookies"]
let menu2 = shoppingList.split(', ');
```

If you're not sure if there will always be a space after the comma, you can pair this method with `Array.map()` and `String.trim()` to normalize the results.

```js
// returns ["soda", "turkey sandwiches", "potato chips", "chocolate chip cookies"]
let menu3 = shoppingList.split(',').map(function (item) {
	return item.trim();
});
```

## Stopping after a certain number of items

As an optional second argument, you can stop splitting your string after a certain number of delimiter matches have been found. The rest of the items are discarded.

```js
// returns ["soda", "turkey sandwiches"]
let limitedMenu = shoppingList.split(', ', 2);
```

[Here's a demo with all of these examples.](https://codepen.io/cferdinandi/pen/PopooGz)