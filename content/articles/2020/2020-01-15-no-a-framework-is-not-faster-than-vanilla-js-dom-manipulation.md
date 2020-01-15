---
title: "No, a framework is not faster than vanilla JS DOM manipulation (but it can be)"
date: 2020-01-15T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Web Performance
---

Yesterday on Twitter, I had a discussion with someone about whether or not using a framework was more performant than using vanilla JS DOM manipulation.

**The short answer: no, it's absolutely not.**

But, it can be in certain situations. Let's dig in!

## Traditional DOM Manipulation

Let's say you have a simple form for adding items to a list. Below it is an empty unordered list (`ul`) where you'll add your todo items.

```html
<form id="add-todos">
	<label for="new-todo">What do you want to do?</label>
	<input type="text" name="new-todo" id="new-todo">
	<button>Add Todo</button>
</form>

<ul id="todos"></ul>
```

When someone submits the form, you want to add a list item (`li`) with the todo. Maybe you also want to wrap it in a `button` so that they can mark it as complete by clicking or tapping it.

We also want to prevent the form from trying to submit to the server with `event.preventDefault()`.

```js
// Get the #new-todo field
var todo = document.querySelector('#new-todo');

// Get the #todos container
var items = document.querySelector('#todos');

document.addEventListener('submit', function (event) {

	// Only run when the submitted form is #add-todos
	if (event.target.id !== 'add-todos') return;

	// Prevent the form from submitting to the server
	event.preventDefault();

	// Add a new todo item
	var li = document.createElement('li');
	li.innerHTML = '<button>' + todo.value + '</button>';
	items.appendChild(li);

	// Clear the field so the user can add another todo
	todo.value = '';

});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/abzjXMg)

### Marking as complete

Now, if someone clicks on a button, we want to mark the todo as complete by adding a strikethrough. We should also style our buttons so that they don't look like buttons.

First, let's add a class to our `button` elements.

```js
document.addEventListener('submit', function (event) {

	// Only run when the submitted form is #add-todos
	if (event.target.id !== 'add-todos') return;

	// Prevent the form from submitting to the server
	event.preventDefault();

	// Add a new todo item
	var li = document.createElement('li');
	li.innerHTML = '<button class="todo">' + todo.value + '</button>';
	items.appendChild(li);

	// Clear the field so the user can add another todo
	todo.value = '';

});
```

Now, we can add a `click` event listener that toggles a `.completed` class on our buttons when someone clicks or taps them.

```js
document.addEventListener('click', function (event) {

	// Only run on .todo buttons
	if (!event.target.classList.contains('todo')) return;

	// Toggle the .completed class
	event.target.classList.toggle('completed');

});
```

And finally, let's add some CSS to style everything.

```css
.todo {
	background: transparent;
	border: 0;
	color: inherit;
	font-size: 1em;
	margin: 0;
	padding: 0;
}

.todo.completed {
	text-decoration: line-through;
}
```

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/dyPjryG)

### This is very performant, but also kind of a pain in the ass

This approach to DOM manipulation is very performant. We're only updating the things that have changed, minimizing how much work the browser has to do to repaint and reflow the UI.

However, as your app gets bigger and more complex, this approach is also kind of a pain in the ass.

For example, what if you wanted to...

1. Let people delete todos?
2. Show a message when no todo items exist yet?
3. Save todos to `localStorage` and load them into the UI on page load?
4. Support multiple lists?

Suddenly, you need to have a lot more awareness of what the UI currently looks like and what needs to change to get to your desired end state.

And this is where frameworks come in.

## State-based UI

The reason frameworks came to be was *not* to improve DOM manipulation performance. It was to make UI easier to manage in larger JavaScript apps.

Frameworks use something called *state-based UI*.

With state-based UI, you define your *state* (which is just a fancy word for your *data* at a particular point in time) as an object with properties. For our todo app, it might look like this.

```js
var state = {
	todos: [
		{
			item: 'Buy a new wand',
			completed: false
		},
		{
			item: 'Get money from Gringotts',
			completed: true
		}
	]
};
```

You define a `template` that says what the UI should look like based on different properties in your `state`.

```js
var template = function () {

	// If there are no todos, show a message
	if (state.todos.length < 1) {
		return 'You do not have any todo items yet. Create one using the form above.';
	}

	// Create a list of todos
	// https://gomakethings.com/using-array.map-to-create-markup-from-an-array-with-vanilla-js/
	return '<ul>' + state.todos.map(function (todo, index) {
		var completed = todo.completed ? 'completed' : '';
		var html =
			'<li>' +
				'<button class="todo ' + completed + '" data-todo="' + index + '">' +
					todo.item +
				'</button>' +
			'</li>';
		return html;
	}).join('') + '</ul>';

};
```

When someone submits a new item, or taps on an item, you update your `state` object, and then tell the framework to render an updated version of the UI.

Here's a simple vanilla JS version.

```js
document.addEventListener('submit', function (event) {

	// Only run when the submitted form is #add-todos
	if (event.target.id !== 'add-todos') return;

	// Prevent the form from submitting to the server
	event.preventDefault();

	// Add a new todo item
	state.todos.push({
		item: todo.value,
		completed: false
	});

	// Render the UI
	items.innerHTML = template();

	// Clear the field so the user can add another todo
	todo.value = '';

});

document.addEventListener('click', function (event) {

	// Only run on .todo buttons
	if (!event.target.classList.contains('todo')) return;

	// Get the todo item index
	var index = event.target.getAttribute('data-todo');

	// Update the item in the state
	var completed = event.target.classList.contains('completed') ? false : true;
	state.todos[index].completed = completed;

	// Update the UI
	items.innerHTML = template();

});
```

[And here's a demo of this technique.](https://codepen.io/cferdinandi/pen/qBEyvPN)

## DOM Diffing

The state-based UI approach shown above is terrible for performance.

Every time the state is updated, you're rebuilding the entire UI. That results in a lot of unneeded repaints and reflows. And that's where frameworks come in.

Frameworks like React and Vue do something called *DOM Diffing*.

Instead of updating the entire UI, they compare the current DOM to how it *should* look based on your state changes. Then, they update just the things that need updating&mdash;adding and removing classes, injecting or removing elements, and so on.

In other words, frameworks do the same exact thing you do with manual, vanilla JS DOM manipulation, using the same underlying JS methods and browser APIs.

## So... are frameworks more performant than vanilla JS DOM manipulation or not?

No, they're objectively not. Under-the-hood, they're using vanilla JS DOM manipulation, too.

*But...* if you want to use state-based UI, then a library or framework *can be* more performant if the alternative is re-rendering the entire UI every time.

Frameworks don't have some super power performance secret that "regular JS" does not. They just add a layer of abstraction to make building your UI and making updates easier (arguably) as the app gets more complex. And that abstraction comes with a cost: larger JS files that take longer to download and are costly for browsers to parse and run.

With our simple todo list, I actually think manual DOM manipulation is easier. As an app like that gets more complex, using a tool might make sense.

If you *do* want to use state-based UI, instead of 30kb of React or Vue, you can use smaller alternatives like [Preact](https://preactjs.com/), or [Svelte](https://svelte.dev/), or [my own Reef library](https://github.com/cferdinandi/reef).