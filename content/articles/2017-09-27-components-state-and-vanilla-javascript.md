---
categories:
- Code
- JavaScript
date: '2017-09-27'
title: Components, state, and vanilla JavaScript
---

A few weeks ago, we looked at [how to render content with vanilla JavaScript](/rendering-dynamic-and-conditional-templates-with-vanilla-javascript/).

One of the nice features of frameworks like React is that content renders again automatically when the data behind it updates. For example, imagine you had a list of todo list items. When an item is added or completed, you probably want to regenerate that list.

Over the next few days, we're going to look at how to do the same thing with vanilla JavaScript.

*__Quick heads up:__ If you haven't read the post on [rendering content](/rendering-dynamic-and-conditional-templates-with-vanilla-javascript/), you should go read that first or some of this might not make sense.*

## Adding state

The driving engine behind functionality like this is "state."

If you've never heard that word before&mdash;or have but don't know what it means&mdash;you're not alone!

State is just data. So why do they call it *state* instead of *data*? Because there's a time-bound aspect to it. State is data at a particular moment in time. It's the present "state" of your data.

Get it? Yea, I think it's weird, too!

### State tied to a component

Historically, you might have a set of a data that sits globally within your application. You'd reference it within your templates.

```js
// The data
var data = {
	todos: [
		{
			item: 'Eat',
			completed: false
		},
		{
			item: 'Take a nap',
			completed: true
		},
		{
			item: 'Eat again',
			completed: false
		}
	]
};

// The template
var todoList = function () {

	// Setup our template
	var template = '';

	// Loop through the todos
	for (var i = 0; i < data.todos.length; i++) {
		var todo = data.todos[i];

		// Check if it's completed
		var checked = todo.completed ? 'checked' : '';

		// Create the todo item
		template +=
			'<label>' +
				'<input type="checkbox" value="' + todo.item + '" ' + checked + '>' +
				todo.item +
			'</label>';
	}

	// Return completed template
	return template;

};

// Render our template
render(todoList, document.querySelector('#todo-list'));
```

In frameworks like React, the data (ie, the *state*) is associated with the template, or *component*.

```js
// The template
var todoList = function () {

	// Setup our template
	var template = '';

	// Loop through the todos
	for (var i = 0; i < todoList.state.todos.length; i++) {
		var todo = todoList.state.todos[i];

		// Check if it's completed
		var checked = todo.completed ? 'checked' : '';

		// Create the todo item
		template +=
			'<label>' +
				'<input type="checkbox" value="' + todo.item + '" ' + checked + '>' +
				todo.item +
			'</label>';
	}

	// Return completed template
	return template;

};

// Add our data
todoList.state = {
	todos: [
		{
			item: 'Eat',
			completed: false
		},
		{
			item: 'Take a nap',
			completed: true
		},
		{
			item: 'Eat again',
			completed: false
		}
	]
};

// Render our todo list
render(todoList, document.querySelector('#todo-list'));
```

*__Note:__ React components work a little bit differently than this, but it's the same basic idea.*

## Updating your state

Now when you update your todo data, you'll update the `todoList()` state instead a global data set.

```js
// The `Eat` item is marked as complete
todoList.state.todos = [
	{
		item: 'Eat',
		completed: true
	},
	{
		item: 'Take a nap',
		completed: true
	},
	{
		item: 'Eat again',
		completed: false
	}
];

// Render our todo list again
render(todoList, document.querySelector('#todo-list'));
```

Tomorrow, we'll look at how to trigger a render automatically when you update your state.