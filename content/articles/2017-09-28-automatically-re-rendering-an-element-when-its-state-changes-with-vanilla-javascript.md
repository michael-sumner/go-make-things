---
categories:
- Code
- JavaScript
date: '2017-09-28'
title: Automatically re-rendering an element when it&#8217;s state changes with vanilla JavaScript
---

I've been sharing some behind the scenes content from [my latest pocket guide](/guides/), "Vanilla JS Web Apps," which launches in a couple of weeks.

Yesterday, we talked about [how React and other similar frameworks attach state](/components-state-and-vanilla-javascript/) (a fancy word for "data") to elements instead of global variables. We also looked at how to do the same thing with vanilla JavaScript.

Today, let's look at how to update an element when it's state changes.

*__Psst...__ If you're just tuning in, I'd recommend first reading my post on [rendering content](/rendering-dynamic-and-conditional-templates-with-vanilla-javascript/), and yesterday's post on [assigning state to an element](/components-state-and-vanilla-javascript/).*

## Triggering a render when state changes

In React, there are two ways to update state.

The first is the one we covered yesterday, where you assign values directly to the component's `state` property.

```js
// Our component
var todoList = function () {
    // ...
};

// Update our state
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
```

The second option is to call a method called `setState()`, passing in your new data as an object. `setState()` is a function React adds to components. It handles merging in your new data for you, *and* re-renders the component.

```js
todoList.setState({todos: [
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
]});
```

## Adding the `setState()` method

There's no native version of this out of the box, but we can add it pretty easily.

In order for this to work, `setState()` has to know what element to render our component into.

You *could* pass that in as an argument each time, but an easier way is to store the element as a property on our component. So let's do that first.

```js
todoList.elem = document.querySelector('#todo-list');
```

Now we can add our `setState()` method.

```js
todoList.setState = function (props) {

	// Shallow merge new properties into state object
	for (var key in props) {
		if (props.hasOwnProperty(key)) {
			todoList.state[key] = props[key];
		}
	}

	// Render the element
	render(todoList, todoList.elem);

	// Return the rendered element for use elsewhere
	return todoList.elem;

};
```

The example above also returns the rendered element back, so you can do things with it after re-rendering.

```js
// Update state
var elem = todoList.setState({todos: []});

// Animate the todolist
// Note: this won't really work. You'd need to add some animation function.
// It's for illustrative purposes only.
animate(elem);
```

## The problem with this approach

Today's example requires you to manually add the `setState()` method to each component, changing variable names throughout the function.

That's fine with a single component, but madness when building an app. Tomorrow, we'll look at a programmatic way to easily turn any template into a component.