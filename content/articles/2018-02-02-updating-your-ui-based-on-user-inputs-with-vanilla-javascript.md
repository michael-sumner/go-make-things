---
title: "Updating your UI based on user inputs with vanilla JavaScript"
date: 2018-02-02T10:30:21-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today, I wanted to show you how to update your UI based on inputs from the user. And, we're going to do it with just 20 lines of vanilla JavaScript, including spaces and comments.

To make this more practical, we're going to build a little web app to create a birthday wishlist.

Today, we'll learn how to update the UI whenever your user submits a wishlist item. Then on Monday, we'll look at how to save their wishlist for reuse later (otherwise the app is pretty pointless, right?).

## Create the HTML

This app has a simple HTML structure.

We'll create a form, and so that we can find it with our JS, we'll give it an ID of `#add-to-wishlist`. Inside the form, we'll add a label, a text input, and a submit button.

We'll also setup an empty ordered (or numbered) list with an ID of `#wishlist`. This is where our wishlist items will go after the user submits them.

```html
<form id="add-to-wishlist">
	<label>What do you want for your birthday?</label>
	<input type="text" name="wishlist-item" id="wishlist-item">
	<button type="submit">Add to Wishlist</button>
</form>

<ol id="wishlist"></ol>
```

## Listen for wishlist updates

We need to detect when a user adds an item to their wishlist. First, let's grab the form and the wishlist item input from the DOM.

```js
// Get form and wishlist item
var addToWishList = document.querySelector('#add-to-wishlist');
var wishlistItem = document.querySelector('#wishlist-item');
```

Next, we'll setup an event listener on our form, listening for any `submit` event that happens.

```js
// Get form and wishlist item
var addToWishList = document.querySelector('#add-to-wishlist');
var wishlistItem = document.querySelector('#wishlist-item');

addToWishList.addEventListener('submit', function (event) {
	// Do things...
}, false);
```

We want to prevent the form from actually submitting. We'll be using JavaScript to process it and update our UI.

```js
addToWishList.addEventListener('submit', function (event) {

	// Don't submit the form
	event.preventDefault();

}, false);
```

Next, we should also check if our wishlist item field has any text in it. If not, we can ignore it.

To do that, we'll get it's value using the `.value` property and check to see if it's `length` is less than `1`.

```js
addToWishList.addEventListener('submit', function (event) {

	// Don't submit the form
	event.preventDefault();

	// Ignore it if the wishlist item is empty
	if (wishlistItem.value.length < 1) return;

}, false);
```

## Update the UI

Now that we're listening to wishlist submissions and filtering out empty ones, we can update our UI.

To our list of variables, let's also get the wishlist itself.

```js
// Get form, item, and wishlist
var addToWishList = document.querySelector('#add-to-wishlist');
var wishlistItem = document.querySelector('#wishlist-item');
var wishlist = document.querySelector('#wishlist');
```

Now, in our event listener, we can update the `innerHTML` of our wishlist by adding a new list item with our wishlist item.

```js
addToWishList.addEventListener('submit', function (event) {

	// Don't submit the form
	event.preventDefault();

	// Ignore it if the wishlist item is empty
	if (wishlistItem.value.length < 1) return;

	// Add item to wishlist
	wishlist.innerHTML += '<li>' + wishlistItem.value + '</li>';

}, false);
```

We'll use `+=` to add our string after whatever `innerHTML` is already there. This is equivalent to, but shorter than, doing this.

```js
wishlist.innerHTML = wishlist.innerHTML + '<li>' + wishlistItem.value + '</li>';
```

Now, whenever a user submits a wishlist item, the list will update in the UI. 💥

There's just one last thing to do. After an item is added to the list, let's clear the wishlist item input so the user can easy add another item.

```js
addToWishList.addEventListener('submit', function (event) {

	// Don't submit the form
	event.preventDefault();

	// Ignore it if the wishlist item is empty
	if (wishlistItem.value.length < 1) return;

	// Add item to wishlist
	wishlist.innerHTML += '<li>' + wishlistItem.value + '</li>';

	// Clear input
	wishlistItem.value = '';

}, false);
```

## Putting it all together

You can view a [live demo of this on JSFiddle](https://jsfiddle.net/cferdinandi/jhgqsm5g/4/). Here's all of the code in one spot.

```js
// Get form, item, and wishlist
var addToWishList = document.querySelector('#add-to-wishlist');
var wishlistItem = document.querySelector('#wishlist-item');
var wishlist = document.querySelector('#wishlist');

addToWishList.addEventListener('submit', function (event) {

	// Don't submit the form
	event.preventDefault();

	// Ignore it if the wishlist item is empty
	if (wishlistItem.value.length < 1) return;

	// Add item to wishlist
	wishlist.innerHTML += '<li>' + wishlistItem.value + '</li>';

	// Clear input
	wishlistItem.value = '';

}, false);
```