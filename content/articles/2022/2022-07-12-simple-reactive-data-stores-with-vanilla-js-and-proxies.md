---
title: Simple reactive data stores with vanilla JavaScript and Proxies
date: 2022-07-12T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to share a simple way to store data and make it reactive with vanilla JS and Proxies. 

Let's dig in!

## Why I'm thinking about this

I've started working on a new workshop: _Building Web Apps_.

One of the big decisions I'm making is whether to use [traditional state-based UI](/state-based-ui-with-vanilla-js/) (in the style of React and Vue) or [native web components](/how-to-create-a-web-component-with-vanilla-js/).

One feature that's built into even the smallest of state-based UI libraries is _reactive data_. 

With data reactivity, when a piece of data is updated, the UI automatically updates to match. In this Vue example, updating the `app.greeting` property from `World` to `Universe` automatically updates the UI to say `Hello Universe!`.

```js
// By default, the UI says, "Hello World!"
let app = new Vue({
	el: '#app',
	data: {
		greeting: 'World'
	},
	template: `<p>Hello {{ greeting }}!</p>`
});

// Now it says "Hello Universe!"
app.greeting = 'Universe';
```

Let's look a small reactive data store we can build using JavaScript Proxies that does something similar.

## Creating a data store

A _data store_ holds your data object (or array), and reacts when any of the values in it change.

[Redux](https://redux.js.org/) is a data store often used with React. [Vuex](https://vuex.vuejs.org/) is Vue JS's version.

For ours, we're going to create a `store()` helper function that we can pass `data` and a unique `name` (optional) into. It will return a [Proxy version](/how-vanilla-js-proxies-work/) of that data. Whenever the data is updated, it will emit an event we can _react_ to.

Let's start by creating our function.

If no `data` is provided, we'll use an empty object (`{}`). If no `name` is provided, we'll use `store`.

```js
function store (data = {}, name = 'store') {
	// ...
}
```

Proxies require a `handler` object that includes different types of data changes to listen to and how to respond to them.

To start, let's add `get()`, `set()`, and `deleteProperty()` callbacks, which will run when data is retrieved, added/updated, or deleted from our object, respectively.

For now, we'll just do the default behaviors.

```js
function store (data = {}, name = 'store') {
	return new Proxy(data, {
		get: function (obj, prop) {
			return obj[prop];
		},
		set: function (obj, prop, value) {
			if (obj[prop] === value) return true;
			obj[prop] = value;
			return true;
		},
		deleteProperty: function (obj, prop) {
			delete obj[prop];
			return true;
		}
	});
}
```

Whenever data is added, updated, or deleted, we want to [emit a custom event](/custom-events-in-vanilla-js/) we can listen for with the `Element.addEventListener()` method.

Let's add an `emit()` helper function that accepts the event `type` and any `detail` to share about it as arguments. Inside the function, we'll create a `new CustomEvent()`, then dispatch it on the `document`.

```js
function store (data = {}, name = 'store') {

	/**
	 * Emit a custom event
	 * @param  {String} type   The event type
	 * @param  {*}      detail Any details to pass along with the event
	 */
	function emit (type, detail) {

		// Create a new event
		let event = new CustomEvent(type, {
			bubbles: true,
			cancelable: true,
			detail: detail
		});

		// Dispatch the event
		return document.dispatchEvent(event);

	}

	return new Proxy(data, {
		// ...
	});
}
```

Back inside the Proxy `handler`, we'll run the event with the `name` variable and the current `data` state as the `type` and `detail`.

```js
return new Proxy(data, {
	get: function (obj, prop) {
		return obj[prop];
	},
	set: function (obj, prop, value) {
		if (obj[prop] === value) return true;
		obj[prop] = value;
		emit(name, data);
		return true;
	},
	deleteProperty: function (obj, prop) {
		delete obj[prop];
		emit(name, data);
		return true;
	}
});
```

## Reacting to changes

Let's imagine we have some simple vanilla JS state-based UI, like this.

```js
// The element to inject our UI into
let app = document.querySelector('#app');

// The data
let wizards = ['Gandalf', 'Merlin'];

// The template
function template (props) {
	return `
		<ul>
			${props.map(function (wizard) {
				return `<li>${wizard}</li>`;
			}).join('')}
		</ul>`;
}

// Render the UI
app.innerHTML = template(wizards);
```

Now, we can do something like this.

```js
// Create reactive data store
let wizards = store(['Gandalf', 'Merlin'], 'wizards');

// Reactively update the UI
document.addEventListener('wizards', function (event) {
	app.innerHTML = template(event.detail);
});

// This will automatically update the UI
wizards.push('Ursula');
```

## Nested arrays and objects

One area where Proxies fall a bit short is with nested arrays and objects. An array or object nested inside a Proxified array or object will _not_ itself be a Proxy, and will not run our custom event.

We can get around that by creating a `handler()` function that returns the handler object.

In it, we'll [check if the requested property is an array or object](/true-type-checking-with-vanilla-js/). If so, we'll return a Proxy instead of the raw data value. [You can learn more about this techique here.](/how-to-detect-changes-to-nested-arrays-and-objects-inside-a-proxy/)

```js
function store (data = {}, name = 'store') {

	// ...

	/**
	 * Create the Proxy handler object
	 * @param  {String} name The namespace
	 * @param  {Object} data The data object
	 * @return {Object}      The Proxy handler
	 */
	function handler (name, data) {
		return {
			get: function (obj, prop) {
				if (prop === '_isProxy') return true;
				if (['object', 'array'].includes(Object.prototype.toString.call(obj[prop]).slice(8, -1).toLowerCase()) && !obj[prop]._isProxy) {
					obj[prop] = new Proxy(obj[prop], handler(name, data));
				}
				return obj[prop];
			},
			set: function (obj, prop, value) {
				if (obj[prop] === value) return true;
				obj[prop] = value;
				emit(name, data);
				return true;
			},
			deleteProperty: function (obj, prop) {
				delete obj[prop];
				emit(name, data);
				return true;
			}
		};
	}

	return new Proxy(data, handler(name, data));

}
```

Now, we can handle nested data, too.

## See it in action

[Here's a demo for you to play around with.](https://codepen.io/cferdinandi/pen/BarLQya?editors=1010)