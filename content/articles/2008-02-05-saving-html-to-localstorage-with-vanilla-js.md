---
title: "Saving HTML to localStorage with vanilla JS"
date: 2018-02-05T10:06:24-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

On Friday, we looked at [how to update your user interface based on inputs from the user](/updating-your-ui-based-on-user-inputs-with-vanilla-javascript/).

Today, let's look at how to save that content in `localStorage` with vanilla JavaScript.

## What we'll be doing

As you may recall, on Friday we built [a simple "Birthday Wishlist" app](https://jsfiddle.net/cferdinandi/jhgqsm5g/4/). Users can add items they want for their birthday to a list.

However, if the list disappears every time you leave the app, it's not very useful.

We're going to save the user's wishlist using the `localStorage` browser API. When the page loads, if they have any data saved in `localStorage`, we'll load that into our wishlist instead of an empty list.

## Our existing code

Here's what our markup looks like right now.

```html
<form id="add-to-wishlist">
	<label>What do you want for your birthday?</label>
	<input type="text" name="wishlist-item" id="wishlist-item">
	<button type="submit">Add to Wishlist</button>
</form>

<ol id="wishlist"></ol>
```

And here's the JavaScript that makes it all work.

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

## Save the HTML to `localStorage`

The `localStorage` API [only accepts data as a string](/using-localstorage-to-save-user-data-with-vanilla-javascript/). So, how would we save our list, which is HTML?

The `innerHTML` property returns the HTML inside an element as a string, which makes it the perfect way for us to get and store our list.

Let's automatically save a users list every time they add an item to it.

You use the `localStorage.setItem()` method to save data to `localStorage`. It requires two arguments. The first is a unique ID for your `localStorage`, and the second is the data itself.

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

	// Save the list to localStorage
	localStorage.setItem('wishlistItems', wishlist.innerHTML);

}, false);
```

## Get data from `localStorage` on page load

When a user comes back to our app, we want to get any saved data from `localStorage` and automatically add it to their wishlist.

We'll use `localStorage.getItem()` to retrieve any saved data. Then we'll update the wishlist's `innerHTML` if any data is saved.

```js
// Check for saved wishlist items
var saved = localStorage.getItem('wishlistItems');

// If there are any saved items, update our list
if (saved) {
	wishlist.innerHTML = saved;
}
```

And with just those few lines of code, we can now save our app data.

## The full JavaScript

Here's the complete JavaScript to make this all work.

[Try it for yourself on JSFiddle.](https://jsfiddle.net/cferdinandi/jhgqsm5g/6/) Add some items to your wishlist, then leave and come back, or reload the page.

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

	// Save the list to localStorage
	localStorage.setItem('wishlistItems', wishlist.innerHTML);

}, false);

// Check for saved wishlist items
var saved = localStorage.getItem('wishlistItems');

// If there are any saved items, update our list
if (saved) {
	wishlist.innerHTML = saved;
}
```