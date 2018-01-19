---
categories:
- Code
- JavaScript
date: '2017-09-29'
title: Creating web app components with vanilla JavaScript
---

I'm getting ready to launch my latest [pocket guide](/guides/), "Vanilla JS Web Apps."

This week, we've looked at how to [render elements](/rendering-dynamic-and-conditional-templates-with-vanilla-javascript/), [add state to an object (and what "state" even is)](/components-state-and-vanilla-javascript/), and how to [automatically re-render elements when state changes](/automatically-re-rendering-an-element-when-its-state-changes-with-vanilla-javascript/)&mdash;all without using a framework or library.

Today, we're going to talk about the final piece of the puzzle: how to programmatically turn any template into a component.

*__Quick heads up:__ if you haven't yet, you should definitely read the rest of the articles in this series or some of this won't make sense.*

## A `component()` method

We're going to use a `component()` method to handle all off the stuff we did manually in the previous articles.

Let me show you the whole thing, then we'll talk through it.

```js
var component = function (template, props, elem) {

	// Add properties to our template
	Object.defineProperties(template, {

		// Set the element to render into
		elem: {
			value: elem,
			writable: true
		},

		// Add state
		state: {
			value: props,
			writable: true
		},

		// Add the `setState()` method
		setState: {
			value: function (props) {

				// Shallow merge new properties into state object
				for (var key in props) {
					if (props.hasOwnProperty(key)) {
						template.state[key] = props[key];
					}
				}

				// Render the element
				render(template, template.elem);

				// Return the elem for use elsewhere
				return template.elem;

			}
		}

	});

	// Return the template so you can assign it to a variable if desired
	return template;

};
```

There are two ways to use our `component()` method. In each case, we'll pass in the `props` argument to access our template's state.

### Example 1: Pass in an existing template

To use it, you can pass in an existing template and assign your initial state.

```js
var todoList = function (props) {

    // Setup our template
    var template = '';

    // Loop through the todos
    for (var i = 0; i < props.todos.length; i++) {
        var todo = props.todos[i];

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

component(todoList, {
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
}, document.querySelector('#todo-list'));
```

Our `todoList()` template is now a component with state, and calling `todoList.setState()` will cause the associated element to re-render.

### Example 2: Create the template with the `component()` method

You can alternatively set up a template for the first time with the `component()` method.

```js
var todoList = component(function (props) {

    // Setup our template
    var template = '';

    // Loop through the todos
    for (var i = 0; i < props.todos.length; i++) {
        var todo = props.todos[i];

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

}, {
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
}, document.querySelector('#todo-list'));
```

And just like the previous example, calling `todoList.setState()` will cause a re-render.

## How this works

The `Object.defineProperties()` method is used to assign properties to a JavaScript object (and in JavaScript, confusingly, everything is an object, not just actual objects like `{}`).

What makes it nicer than just doing `object.property = 'something'` is that you can also set whether or not people should be able to modify it, if it should show up in loops, and so on.

With our `component()` method, we're defining the template's `elem` and `state` properties. We're also assigning a function to `setState()`, and automatically passing in in the template's `state` property.