---
title: "State-based components with vanilla JS"
date: 2018-07-11T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

If you’ve never heard that word "state" before in JavaScript&mdash;or have but don’t know what it means&mdash;you’re not alone!

**State is just data.**

So why do they call it state instead of data? Because there’s a time-bound aspect to it.

State is data at a particular moment in time. It’s the present “state” of your data. Get it?

## State and Components

If you've done simple DOM manipulation before, you've probably gone through the task of:

1. Getting an element from the DOM (using `querySelector()` or something similar), and then...
2. Adding content with `innerHTML`, or...
3. Using `classList` to add or remove classses, or...
4. Using `style` to update some styles.

This works, but as your apps grow, it can be tedious to manage.

Today's more popular JavaScript frameworks, including React and Vue, use *state* and *components* to make managing the UI easier.

With this approach, instead of targeting specific elements in the DOM and adjusting a class here or a style there, you treat your data, or state, as *the single source of truth*.

Updated your state, render a fresh copy of the UI based on the new data, and move on. You never have to think about which element in the DOM to target or how it needs to change.

In this example below, you can update your state, `data`, to change what the greeting is.

```js
// This is the state
var data = {
	greeting: 'Hello',
	name: 'there'
};

// This is a simple Component
var greeting = function () {
	return '<p>' + data.greeting + ', ' + data.name + '!</p>';
};

// We can render it like this
var app = document.querySelector('#app');
app.innerHTML = greeting();
```

[Here's a demo.](http://jsfiddle.net/cferdinandi/fwmLjq8n/2/)

<iframe width="100%" height="300" src="//jsfiddle.net/cferdinandi/fwmLjq8n/2/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### State-based components

In the previous example, the state was a global object that any function can access.

To give your code more structure, you might instead scope state to your component. This is how React, Vue, and other popular frameworks do things.

Here's an updated example.

```js
// This is a simple Component
var greeting = function () {
	return '<p>' + greeting.data.greeting + ', ' + greeting.data.name + '!</p>';
};

// This is the state
greeting.data = {
	greeting: 'Hello',
	name: 'there'
}

// We can render it like this
var app = document.querySelector('#app');
app.innerHTML = greeting();
```

In this example, the data or state is a property of the component itself. The state is only accessible within (or is scoped to) the component.

[Here's an updated demo for you.](http://jsfiddle.net/cferdinandi/fwmLjq8n/12/)

<iframe width="100%" height="300" src="//jsfiddle.net/cferdinandi/fwmLjq8n/12/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## Why this approach is nice

The nice thing about scoping state to a component like this is that you get out of the business of targeting individual elements and manipulating specific things within them.

With a scoped component, you update your state and then render your template. You don't need to hunt for individual items.

Your data is the single source of truth, and it makes updating the UI easier and more consistent.

Tomorrow, I'll show you [a helper function you can use to make this whole process super easy](/a-stateful-component-helper-function-for-vanilla-js/). Then on Friday, we'll build a simple stopwatch app together using this approach.