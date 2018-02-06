---
title: "Crossing items off a checklist with vanilla JavaScript"
date: 2018-02-06T08:04:05-05:00
draft: true
categories:
- Code
- HTML
- JavaScript
---

Over the last few days, we created a birthday wishlist app that [adds items to a list](/updating-your-ui-based-on-user-inputs-with-vanilla-javascript/) and [saves them to `localStorage`](/saving-html-to-localstorage-with-vanilla-js/) so they can be accessed later.

But what happens after someone purchases an item on the list? What if they change their mind?

Today, we'll look at how to remove items from the list.

## The code so far

As a quick review, here's our HTML.

```html
<form id="add-to-wishlist">
	<label>What do you want for your birthday?</label>
	<input type="text" name="wishlist-item" id="wishlist-item">
	<button type="submit">Add to Wishlist</button>
</form>

<ol id="wishlist"></ol>
```

And here's our JavaScript.

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

## Add a "remove all" link

First, let's provide a way to empty out the wishlist.

We'll add a "Remove All Items" button to our markup, after the list itself.

```html
<form id="add-to-wishlist">
	<label>What do you want for your birthday?</label>
	<input type="text" name="wishlist-item" id="wishlist-item">
	<button type="submit">Add to Wishlist</button>
</form>

<ol id="wishlist"></ol>

<button id="clear-wishlist">Remove All Items</button>
```

We need to detect when it's clicked. When that happens, we'll set the `innerHTML` of the `#wishlist` element to an empty string, and wipe our `localStorage`.