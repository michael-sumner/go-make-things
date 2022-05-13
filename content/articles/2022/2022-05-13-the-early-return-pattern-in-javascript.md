---
title: The early return pattern in JavaScript
date: 2022-05-13T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to talk about one of my favorite tricks for making code a bit more readable: the early `return` pattern. 

Let's dig in!

## The challenge with `if` checks

When coding, you often want to check if a condition exists before continuing. 

For example, let's say you have a function that runs whenever the user clicks a button with the `.save-data` class. It gets the value of the `[data-id]` attribute from the button, gets a saved `token` from `localStorage`, and then combines the two and saves it as a new entry in `localStorage`.

Along the way, you'll want to make various checks to make sure that each piece of information you need exists before moving on.

```js
function handleClick (event) {

	// Make sure clicked element has the .save-data class
	if (event.target.matches('.save-data')) {

		// Get the value of the [data-id] attribute
		let id = event.target.getAttribute('data-id');

		// Make sure there's an ID
		if (id) {

			// Get the user token from localStorage
			let token = localStorage.getItem('token');

			// Make sure there's a token
			if (token) {

				// Save the ID to localStorage
				localStorage.setItem(`${token}_${id}`, true);

			}

		}

	}

}
```

As you can see, this results in a nested mess of `if` checks. You could combine a few of these steps, but it's not uncommon to see code like this "in the wild."

The early `return` pattern solves this issue.

## What is the early `return` pattern?

With the early return pattern, you check for the opposite of the thing you want, and `return` early to end the function when that's the case.

This reduces nested `if` statements, and makes your code a bit easier to read.

Want to make sure the `event.target` has the `.save-data` class? Check if it _doesn't_ instead, and `return` when that's the case. Same with the `[data-id]` attribute, or a `token` key in `localStorage`.

```js
function handleClick (event) {

	// Make sure clicked element has the .save-data class
	if (!event.target.matches('.save-data')) return;

	// Get the value of the [data-id] attribute
	let id = event.target.getAttribute('data-id');

	// Make sure there's an ID
	if (!id) return;

	// Get the user token from localStorage
	let token = localStorage.getItem('token');

	// Make sure there's a token
	if (!token) return;

	// Save the ID to localStorage
	localStorage.setItem(`${token}_${id}`, true);

}
```

You can make this a bit more compact and readable by removing the "make sure there's..." comments, too.

```js
function handleClick (event) {

	// Make sure clicked element has the .save-data class
	if (!event.target.matches('.save-data')) return;

	// Get the value of the [data-id] attribute
	let id = event.target.getAttribute('data-id');
	if (!id) return;

	// Get the user token from localStorage
	let token = localStorage.getItem('token');
	if (!token) return;

	// Save the ID to localStorage
	localStorage.setItem(`${token}_${id}`, true);

}
```

That's the early `return` pattern, my favorite pattern in JavaScript.