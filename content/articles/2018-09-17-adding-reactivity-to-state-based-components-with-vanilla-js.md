---
title: "Adding reactivity to state based components with vanilla JS"
date: 2018-09-17T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Back in July, I wrote about [how I wrote my own lightweight alternative to Vue and React](/how-i-built-my-own-vanilla-js-alternative-to-vue-and-react/).

[Reef](https://github.com/cferdinandi/reef) weighs under 2kb (minified and gzipped), with zero dependencies. It features simple templating with JavaScript strings or template literals, and uses native JavaScript methods and browser APIs instead of custom methods and pseudo-languages.

It was missing some key features, though. Most notably, it wasn't reactive.

After updating the data (or state), you needed to explicitly call the `render()` method again. To me, this is often time a feature. I like having more control over what my code does and when it does it. However, it can be tedious.

Last week, I added reactivity to Reef (while keeping an option to have more manual control). Today, I wanted to show you how.

## Different approaches to reactivity

Vue and React handle reactivity differently.

When you create a Vue instance, it loops through your data object and attaches watchers to each item. Any time you make changes, it detects them and updates the DOM.

This is cool because you don't need to do anything differently to update your data. Want to add an item to an array in your state? Just use `push()` and it updates automatically.

```js
var app = new Vue({
	el: '#app',
	data: {
		todos: [
			'Pack for Hogwarts',
			'Feed Hedwig',
			'Pick up candy at Wizard Weezes'
		]
	}
});

// This causes the DOM to re-render
app.todos.push('Buy a new wand');
```

React, on the other hand, has a reactive helper method.

You pass in the keys and data you want to change into the `setState()` method, and it loops through and shallow merges them into your existing data. Then it runs a DOM updates if required. The state object isn't watched. You need to use `setState()` for it to "react" to an update.

```js
var todos = app.todos;
todos.push('Buy a new wand');
this.setState({todos: todos});
```

## Adding reactivity to Reef

As you might imagine, adding watchers to every item in the data object adds a bit of code.

It also means that your data is *always* reactive. There's no option to set it and manually update the DOM later. I wanted to give developers that choice.

I went with an explicit reactivity helper method.

In Reef, I added a `setData()` helper method to the `Component.prototype`. It uses [the `trueTypeOf()` helper method](/true-type-checking-with-vanilla-js/) to make sure the item passed in an object. Then, I loop through each item and update the matching key in the state to the new value.

Once all the data is merged, I call the `render()` method on the component.

```js
/**
 * Update the data property and re-render
 * @param {Object} obj The data to merge into the existing state
 */
Component.prototype.setData = function (obj) {
	if (trueTypeOf(obj) !== 'object') throw new Error('ReefJS: The provided data is not an object.');
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			this.data[key] = obj[key];
		}
	}
	this.render();
};
```

And you can use it like this.

```js
var app = new Reef('#app', {
	data: {
		todos: [
			'Pack for Hogwarts',
			'Feed Hedwig',
			'Pick up candy at Wizard Weezes'
		]
	}
});

// Update the state
var todos = app.data.todos;
todos.push('Buy a new wand');
todos.setData({todos: todos});
```

## Adding a way to get an immutable copy of the state

With this change, I figured people may want to access the original state and manipulate it first. I wanted a way for them to do that without manipulating the actual live state of the component.

Remember this?

```js
// Update the state
var todos = app.data.todos;
todos.push('Buy a new wand');
todos.setData({todos: todos});
```

That's actually updating the *real data* in `app.data.todos`. Assigning it to the `todos` variable doesn't make a copy. It references the original data.

I wanted to add a way to get [immutable data](/immutability-in-javascript/).

Accordingly, I also added a `getData()` method to the `Component.prototype`. It makes a copy of original data by converting it to a string with `JSON.stringify()` and then turning it back into an object with `JSON.parse()`.

I could have used `Object.assign()` instead, but my approach has better backwards compatibility.

```js
/**
 * Return a clone of an object or array
 * @param  {Object|Array} obj The object or array to clone
 * @return {Object|Array}     An exact copy of the object or array
 */
var clone = function (obj) {
	if (!obj) return;
	return JSON.parse(JSON.stringify(obj));
};

/**
 * Get a clone of the Component.data property
 * @return {Object} A clone of the Component.data property
 */
Component.prototype.getData = function () {
	return clone(this.data);
};
```

Now, you can do this, without affecting the original data until you call `setData()`.

```js
// Get an immutable copy of the state and update it
var todos = app.getData().todos;
todos.push('Buy a new wand');

// Update the component state
app.setData({todos: todos});
```