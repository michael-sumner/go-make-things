---
title: "Creating a state-based UI component"
date: 2020-05-01T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today kicks off a multi-part series on building reactive, state-based components with vanilla JS.

In today's post, we'll look at what *state* mean, what a *state-based UI* is, and how to create a simple state-based component function.

## What is state-based UI?

If you’ve never heard that word state before in JavaScript&mdash;or have but don’t know what it means&mdash;you’re not alone!

**State is just data.**

So why do they call it state instead of data? Because there’s a time-bound aspect to it. State is data at a particular moment in time. It’s the present “state” of your data.

With *state-based UI*, you store all of the data in a JavaScript object. Then, you use JavaScript to build the DOM based on the current data state.

You don’t bother trying to figure out what needs to change in the DOM. You instead say, “given our data, this is how the DOM should look.” Then you render an updated layout.

## Creating a state-based component

Let's say we have an `#app` element that we want to create a todo list in.

```html
<div id="app"></div>
```

Let's create a constructor for our state-based component.

We'll use this to pass in an element to render our UI into, data to base the UI on, and a template to use to generate the HTML. We'll save each of these items as a property in the constructor Component.

```js
/**
 * A component constructor
 * @param {String} selector The selector for the element to target
 * @param {Object} options  The data and template details
 */
var Component = function (selector, options) {
	this.elem = document.querySelector(selector);
	this.data = options.data;
	this.template = options.template;
};
```

Then, we can create a new component like this.

```js
var app = new Component('#app', {
	data: {
		heading: 'My todos:',
		todos: ['Go shopping', 'Eat cake', 'Take a nap']
	},
	template: function (props) {
		return `
			<p>${props.heading}</p>
			<ul>
				${props.todos.map(function (todo) {
					return `<li>${todo}</li>`;
				}).join('')}
			</ul>`;
	}
});
```

## Rendering the component

Next, we need to render the component into the UI.

We can attach `render()` method to the `Component.prototype`. When we run the method, we'll set the `innerHTML` of the target element using the `template()` function for the `Component`.

We'll also pass the current `data` object in to use for rendering.

```js
/**
 * Render the template into the UI
 */
Component.prototype.render = function () {
	this.elem.innerHTML = this.template(this.data);
};
```

You would render a new UI like this.

```js
app.render();
```

There's no *reactivity* yet.

Let's say you wanted to add a new todo item. You would push it into the `app.data.todos` array, then run `app.render()` again to refresh the UI.

```js
// Update the data
app.data.todo.push('Wake up and dance!');

// Re-render the UI
app.render();
```

That's it for today. On Monday, we'll start digging into data reactivity.