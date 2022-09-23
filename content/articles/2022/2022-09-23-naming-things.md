---
title: Naming things in JavaScript
date: 2022-09-23T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- Design and UX
- JavaScript
---

There's an oft repeated quote in programming...

> There are only two hard things in Computer Science: cache invalidation and naming things.
> <cite>- Phil Karlton</cite>

Sometimes naming things is hard, but it doesn't have to be!

Often, when a function is hard to name, it's trying to do too much. Yesterday, my friend [Christopher Buecheler shared one of the best tech tweets I've ever read](https://twitter.com/cwbuecheler/status/1573004884223447041)...

> Doing code review and doling out a simple thing I wish someone had told me when I was a junior dev, so in case anyone needs to hear it:
>
> Variables that start with “is” should be booleans and function names should usually start with verbs (get, handle, check, render, etc).

Today, I wanted to expand just a little bit on what Christopher wrote. Let's dig in!

## Example code

For this article, let's imagine you have a `cart` object. Each property is a product ID, and its value is the quantity of that item in the cart.

```js
let cart = {
	anchor: 1,
	buoy: 4,
	rope: 2
};
```

We're building a nautical ecommerce site, and are writing some variables and functions to help us out.

## Starting with `is*`

Functions and variables that start with `is*` should be (or `return`) a boolean: `true` or `false`.

The `isInCart()` function checks if an item is in your `cart`.

```js
/**
 * Check if an item is in the cart
 * @param  {String}  id The product ID
 * @return {Boolean}    If true, item is in the cart
 */
function isInCart (id) {
	return !!cart[id];
}
```

A similar alternative to this is `has*`. The `hasItemsInCart()` function checks if the `cart` has any items in it.

```js
/**
 * Check if items are in the cart
 * @return {Boolean} If true, cart has at least 1 item
 */
function hasItemsInCart () {
	return Object.keys(cart).length > 0;
}
```

## Start most function names with a verb

Functions _do things_, and starting their name with a verb makes it a lot more clear what they actual do.

Here, the `getCartQuantity()` function returns the number of items in the cart

```js
/**
 * Get the number of items in the cart
 * @return {Integer} The number of items in the cart
 */
function getCartQuantity () {
	return Object.keys(cart).length;
}
```

The `addItemToCart()` and `removeItemFromCart()` functions add or remove items from the cart, respectively.

```js
/**
 * Add an item to the cart
 * @param {String} id The product ID
 */
function addItemToCart (id) {

	// If the item is already in the cart, increase its quantity
	// Otherwise, add it
	if (cart[id]) {
		cart[id]++;
	} else {
		cart[id] = 1;
	}

}

/**
 * Remove an item from the cart
 * @param {String} id The product ID
 */
function removeItemFromCart (id) {
	
	// If the item quantity is more than 1, reduce its quantity
	// Otherwise, remove it
	if (cart[id] > 1) {
		cart[id]--;
	} else {
		delete cart[id];
	}

}
```

As you can see, the function names clearly describe what the function does.

## Clarity over brevity

As an industry, we tend to make a big deal out of terse and clever names for things, and that's probably where a lot of the challenge in naming things comes from.

Be verbose!

It's much better to have a slightly longer name that's clear and easy to reason about than something short and clever that you can remember what it does.