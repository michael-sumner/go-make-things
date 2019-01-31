---
title: "State based UI vs. manual DOM manipulation"
date: 2019-01-31T10:30:00-05:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

In yesterday's video on [refactoring a vanilla JS app](/refactoring-a-vanilla-js-app-with-state-based-ui/), I switched from using manual DOM manipulation to state-based UI.

Today, I wanted to walk through, at a high-level, how that all works.

## What is state?

If you’ve never heard that word *state* before in JavaScript—--or have but don’t know what it means—--you’re not alone!

**State is just data.**

So why do they call it state instead of data? Because there’s a time-bound aspect to it.

State is data at a particular moment in time. It’s the present “state” of your data. Get it?

## Manual DOM manipulation

Let's say you have a *really* simple list-making app. It lets you add items to a list and literally nothing else.

Here's the markup.

```html
<form id="add-to-list">
	<label for="list-item">What do you want to add to your list?</label>
	<input type="text" id="list-item">
	<button>Add to your list</button>
</form>

<ul id="list"></ul>
```

And here's what a manual DOM manipulation approach to that might look like.

```js
document.addEventListener('submit', function (event) {

	// Make sure our #add-to-list form was the one submitted
	if (!event.target.matches('#add-to-list')) return;

	// Prevent default
	event.preventDefault();

	// Get the list item
	var item = event.target.querySelector('#list-item');
	if (!item || item.length < 1) return;

	// Add it to the DOM
	var list = document.querySelector('#list');
	var li = document.createElement('li');
	li.textContent = item.value;
	list.appendChild(li);

	// Clear the input
	item.value = '';
	item.focus();

}, false);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/yZgQyY)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="cferdinandi" data-slug-hash="yZgQyY" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Aburdly limited list-making app"></p>

### What's wrong with manual DOM manipulation?

Nothing, actually.

For simple apps like this, manual DOM manipulation is a perfectly valid way to do things. I've built plenty of apps this way.

*But...* things get really complicated, really quickly once you start adding more features and functionality.

For example, imagine if your list-making app also...

1. Let users create multiple lists, and each list had its own form to add items to it.
2. Allowed list items to be deleted.
3. Supported list item editing.
4. Provided a way to clear the entire list.
5. Saved (and loaded) the data to local storage.

You could absolutely build this app with traditional DOM manipulation techniques. But managing all of those individual pieces of functionality would become increasingly challenging.

Every time a user clicks a button---to add a new item, delete an item, edit an item, and so on---you would need to target specific elements in the DOM an manipulate them. There's a lot of ways for things to go wrong.

 There's also a simpler way.

## State-Based UI

With a *state-based UI* approach, you store all of the data in a JavaScript object. For our list-making app, it might look like this.

```js
var data = {
	listItems: [
		'Veterinarian',
		'Beach Bum',
		'Web Developer'
	],
	editing: null
};
```

Then, you use JavaScript to build the DOM based on the current data state.

If the `data.listItems` property has no items, maybe you show a message inviting the user to create their first item. If the `editing` property has an item, you might display that item in the form field.

You don't bother trying to figure out what needs to change in the DOM. You instead say, "given our data, this is how the DOM should look." Then you render an updated layout.

This is how frameworks like React and Vue work. But you don't need a 30kb framework to do this.

Tomorrow, I'll show you some simple vanilla JS techniques to create state-based UI.