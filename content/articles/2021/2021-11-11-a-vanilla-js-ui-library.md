---
title: A vanilla JS state-based UI library?
date: 2021-11-11T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today, I wanted to share some high-level thoughts I have about what a state-based UI library that takes a more "vanilla JS" approach might look like.

Let's dig in!

## What is state-based UI?

In the past, I've [written about state-based UI: what it is, when it's useful, and when it's not](/when-should-you-use-a-state-based-ui-library/).

> State is data at a particular moment in time. It’s the present “state” of your data. Get it?
> 
> Today, many web apps use state to generate their UI. With a state-based UI approach, you store all of the data for your user interface in a JavaScript object. Then, you use JavaScript to build the DOM based on the current state of the data.

In most state-based UI libraries, state is coupled directly with a component.

Here's how React and Preact handle state with hooks.

```jsx
function Counter() {
	const [value, setValue] = useState(0);
	const increment = useCallback(() => {
		setValue(value + 1);
	}, [value]);

	return (
		<div>
			Counter: {value}
			<button onClick={increment}>Increment</button>
		</div>
	);
}
```

In this example, `value` only exists withing the `Counter()` component. As a result, you can't do things like event delegation. You have to attach `on*` events to the elements inside the component.

Vue takes a slightly different approach, but with similar conventions.

Traditional Vue uses "declarative rendering." You embed placeholders directly in HTML. Then, you associate that HTML element with some state, and Vue handles the rest.

```html
<div id="app">
	<p>{{ message }}</p>
	<input v-model="message">
</div>
```

```js
let app = new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue!'
	}
});
```

Vue also supports a more modern "component" syntax.

```js
Vue.component('todo-item', {
	// The todo-item component now accepts a
	// "prop", which is like a custom attribute.
	// This prop is called todo.
	props: ['todo'],
	template: '<li>{{ todo.text }}</li>'
});
```

In all cases, though, there's a component, and there's some data associated with it.

## A more vanilla JS library

A state-based UI library is, but its very nature, _not_ really vanilla JS. But I can imagine a library that embodies more of the traditional DOM manipulation approach to rendering and updating UI with JavaScript.

That includes things like:

- Global or local state, not directly coupled to components, and stored in plain old variables.
- Event listeners decoupled from components. This might mean `addEventListener()` methods attached after render, or an approach like [event delegation](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/).
- Targeted UI updates based on the needs of the content. Sometimes that's a simple `textContent` update, no complex DOM diffing needed. Sometimes it _is_ more complex. You should have choice.
- Reactive UI updates. This is something libraries do really well. When data relevant to a UI component updates, the content should, too.
- Tree shakeable, so you can pull in just the pieces you need.

Technically, I just described Svelte. But Svelte is a framework that compiles into plain old HTML and vanilla JS, and the syntax just doesn't quite work with my mental model.

I'm imagining something like this.

```js
// Setup some data
let cart = new Store([]);

// Create a component
let btn = html('#add-to-cart', function () {

	// If the item is already in cart
	if (cart.includes('shirt')) {
		return '<em>Already in your cart</em>';
	}

	// Otherwise, show add to cart button
	return '<button data-add-to-cart="shirt">Add to Cart</button>';

});

// Associate the component with the data
cart.update(btn);

// Listen for clicks, and update your state
document.addEventListener('click', function (event) {

	// If not an add-to-cart button, bail
	let item = event.target.getAttribute('data-add-to-cart');
	if (!item) return;

	// Otherwise, add item to cart
	// This should automatically update the button
	cart.push(item);

});
```

I'm going to play around with some ideas on how this could work and share them here when they're a bit more developed. But for now, I just wanted to put some ideas out there to see what you think.