---
title: "Checking of completed items with vanilla JavaScript"
date: 2018-02-07T10:30:57-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Over the last couple of days, we [built a birthday wishlist](/updating-your-ui-based-on-user-inputs-with-vanilla-javascript/) and learned [how to save wishlist items to `localStorage`](/saving-html-to-localstorage-with-vanilla-js/).

Today, let's learn how to check off completed items.

## A quick recap

Here's our HTML.

```html
<form id="add-to-wishlist">
	<label>What do you want for your birthday?</label>
	<input type="text" name="wishlist-item" id="wishlist-item">
	<button type="submit">Add to Wishlist</button>
</form>

<ol id="wishlist"></ol>
```

And here's the JavaScript.

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

## Clearing the list

First, let's give users a way to remove all items from a list (after the party, for example).

To start, we'll add a "Remove All" button to the HTML, after the list.

```html
<form id="add-to-wishlist">
	<label>What do you want for your birthday?</label>
	<input type="text" name="wishlist-item" id="wishlist-item">
	<button type="submit">Add to Wishlist</button>
</form>

<ol id="wishlist"></ol>

<button id="wishlist-remove-all">Remove All Items</button>
```

Then, we'll listen for when it's clicked and empty our wishlist.

You *can* listen for clicks on just the button, but we're going to need to detect other clicks later. Instead, we'll use a technique known as [event delegation](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/).

> Instead of adding event listeners to specific elements, you listen to all events on a parent element (often the `document` or `window`). Events within that element “bubble up,” and you can check to see if the element that triggered the event (the `event.target`) matches the selector you really care about.

```js
// listen for all clicks on the document
document.addEventListener('click', function (event) {

	// If the clicked item is our button
	if (event.target.id === 'wishlist-remove-all') {
		// Do stuff...
	}

}, false);
```

When the button is clicked, we want to wipe out our list.

We'll set the `#wishlist` element's `innerHTML` to an empty string, and remove our data from `localStorage`.

```js
// listen for all clicks on the document
document.addEventListener('click', function (event) {

	// If the clicked item is our button
	if (event.target.id === 'wishlist-remove-all') {
		wishlist.innerHTML = '';
		localStorage.removeItem('wishlistItems');
	}

}, false);
```

[You can try it yourself here.](https://jsfiddle.net/jhgqsm5g/7/)

## Checking off wishlist items

Now, let's add the ability to check off items as they're completed.

### Update our HTML

To do this, we'll need to change the markup a little bit for items in our list. Instead of just displaying them on their own, let's add a checkbox before each one. We'll also wrap each one in a label so you can click the text *or* the checkbox to complete it.

We'll add all of this to our `submit` event listener where we set the `innerHTML`.

```js
addToWishList.addEventListener('submit', function (event) {

	// Don't submit the form
	event.preventDefault();

	// Ignore it if the wishlist item is empty
	if (wishlistItem.value.length < 1) return;

	// Add item to wishlist
	wishlist.innerHTML += '<li><label><input type="checkbox"> ' + wishlistItem.value + '</label></li>';

	// Clear input
	wishlistItem.value = '';

	// Save the list to localStorage
	localStorage.setItem('wishlistItems', wishlist.innerHTML);

}, false);
```

With the checkbox there, having number items with it looks weird. Let's change our ordered list (`<ol>`) to an unordered one (`<ul>`).

```html
<ul id="wishlist"></ul>
```

And let's add some CSS to remove the bullet points and left margin and padding from our list items.

```css
#wishlist {
	list-style: none;
	margin-left: 0;
	padding-left: 0;
}
```

### Listen for completed items

Our checklist items automatically get checked off when a user clicks of taps them, but let's also strikethrough them to make it more visually obvious.

We also need to save the updated state to `localStorage` so that completed items will be stored.

In our `click` event listener, we'll use the `closest()` method to determine if the clicked item is a list item in our `#wishlist` element. You should [polyfill this method for broader browser support](https://vanillajstoolkit.com/polyfills/closest/).

```js
// listen for all clicks on the document
document.addEventListener('click', function (event) {

	// If the clicked item is our button
	if (event.target.id === 'wishlist-remove-all') {
		wishlist.innerHTML = '';
		localStorage.removeItem('wishlistItems');
	}

	// If the clicked event is a list item
	var item = event.target.closest('#wishlist input');
	if (item) {
		// Do stuff...
	}

}, false);
```

If it's a match, we'll check to see if the item is completed or not by checking the `checked` property.

If it is, we'll add the `.completed` class to the parent list item and give the input a `checked` attribute. If not, we'll remove the class and attribute. Either way, we'll then update our `localStorage` item.

```js
// listen for all clicks on the document
document.addEventListener('click', function (event) {

	// If the clicked item is our button
	if (event.target.id === 'wishlist-remove-all') {
		wishlist.innerHTML = '';
		localStorage.removeItem('wishlistItems');
	}

	// If the clicked event is a list item
	var item = event.target.closest('#wishlist input');
	if (item) {
		if (item.checked) {
			item.closest('li').className = 'completed';
			item.setAttribute('checked', 'checked');
		} else {
			item.closest('li').className = '';
			item.removeAttribute('checked');
		}
		localStorage.setItem('wishlistItems', wishlist.innerHTML);
	}

}, false);
```

Finally, let's add some CSS to create a strikethrough on our completed items.

```css
#wishlist .completed {
	text-decoration: line-through;
}
```

And with that, we're done!

## A quick recap

[Here's a live demo of the working app.](https://jsfiddle.net/jhgqsm5g/11/)

**HTML**

```html
<form id="add-to-wishlist">
	<label>What do you want for your birthday?</label>
	<input type="text" name="wishlist-item" id="wishlist-item">
	<button type="submit">Add to Wishlist</button>
</form>

<ol id="wishlist"></ol>

<button id="wishlist-remove-all">Remove All Items</button>
```

**CSS**

```css
#wishlist {
	list-style: none;
	margin-left: 0;
	padding-left: 0;
}

#wishlist .completed {
	text-decoration: line-through;
}
```

**JavaScript**

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
	wishlist.innerHTML += '<li><label><input type="checkbox"> ' + wishlistItem.value + '</label></li>';

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

// listen for all clicks on the document
document.addEventListener('click', function (event) {

	// If the clicked item is our button
	if (event.target.id === 'wishlist-remove-all') {
		wishlist.innerHTML = '';
		localStorage.removeItem('wishlistItems');
	}

	// If the clicked event is a list item
	var item = event.target.closest('#wishlist input');
	if (item) {
		if (item.checked) {
			item.parentNode.className = 'completed';
			item.setAttribute('checked', 'checked');
		} else {
			item.parentNode.className = '';
			item.removeAttribute('checked');
		}
		localStorage.setItem('wishlistItems', wishlist.innerHTML);
	}

}, false);
```