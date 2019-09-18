---
title: "Data reactivity with vanilla JS"
date: 2019-08-22T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

I've been writing a bit about [Reef, my 2.5kb alternative to React and Vue](https://github.com/cferdinandi/reef). Today, I wanted to talk about data reactivity, and how Reef handles it under-the-hood.

## State-based UI

Reef (and React, and Vue, and Angular) use something called *state-based UI*.

Let's say you have a data object with some todo list items.

```js
var data = {
	listName: 'Starting at Hogwarts',
	todos: []
};
```

This is often referred to as *state* in the framework world, because it represents the *state of your data* at a particular *moment in time*.

With state-based UI, you specify how the UI should look based on the state, or data.

If there's no `data.todos` at all, you might display a message to create some. If there are todo items, you want to display them. Reef handles this by letting you specify a template function that accepts the data object as an argument.

```js
var template = function (data) {

	// Create the list heading
	var html = '<h1>' + data.listName + '</h1>';

	// If there are no list items, show a message
	// Otherwise, display the list items
	if (data.todos.length < 1) {
		html += '<p><em>You do not have any items to complete yet. Please add some.</em></p>';
	} else {
		html += '<ul>' + data.todos.map(function (todo) {
			return '<li>' + todo + '</li>';
		}).join('') + '</ul>';
	}

	// Return the template
	return html;

};
```

We can then inject the UI into the DOM. A simple approach might use `innerHTML`.

```js
app.innerHTML = template(data);
```

Reef using DOM diffing. As we learned in this week's two part series (if you missed it, here are [part 1](https://gomakethings.com/dom-diffing-with-vanilla-js-part-1/) and [part 2](https://gomakethings.com/dom-diffing-with-vanilla-js-part-2/)), it renders the UI like this.

```js
// Get DOM maps
var templateMap = createDOMMap(stringToHTML(template(data)));
var domMap = createDOMMap(app);

// Diff the DOM
diff(templateMap, domMap, app);
```

## So... what's data reactivity?

With a *state-based UI*, if the data object (or *state*) changes, we need to rerender the UI.

Let's say you added todo items. You'd then need to update the UI to show them.

```js
// Update the data
data.todos = [
	'Fix my wand',
	'Buy new robes',
	'Enroll in courses'
];

// Render a new UI
// (DOM diffing is better. I'm using this approach here for simplicity.)
app.innerHTML = template(data);
```

Ideally, though, you wouldn't have to do this manually. The UI should just *react* to updates to your data.

__That's *data reactivity*.__

(*As you've probably already guessed, that's also where React gets its name.*)

## Implementing data reactivity with vanilla JS

Data reactivity isn't particularly hard. There are a few ways to do it, but the simplest is the way React does it: with a helper function.

Reef using a method called `setData()` to update the `data` object.

You pass in an object with the properties you want to update (and their new values). It loops through each one, updates the data object, and then triggers a fresh render of the UI for you.

```js
/**
 * Reactivity update the data object
 * @param {Object} obj The data to update
 */
var setData = function (obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			data[key] = obj[key];
		}
	}
	app.innerHTML = template(data);
};
```

You don't need to pass in all properties&mdash;just the ones you're updating.

Using our todos from earlier, you would do something like this. It updates the data object *and* renders a fresh UI in one step.

```js
setData({todos: [
	'Fix my wand',
	'Buy new robes',
	'Enroll in courses'
]});
```

## Try it yourself

[Here's a demo on CodePen](https://codepen.io/cferdinandi/pen/ZEzBVvz) that you can play with.