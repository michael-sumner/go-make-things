---
title: "How to use returned values in vanilla JS"
date: 2021-01-18T10:30:00-05:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

The other day, I got an email from a reader about my article, [WTF is a return in JavaScript](/wtf-is-return-in-javascript/).

In the article, I discuss what the `return` operator does and how you can use it _inside a function_, but I never actually get around to showing what you might _actually do_ with the returned data.

Today, let's talk about that.

## Use `return` to make your code more modular

There are a lot of different approaches to code, but I like using `return` to keep my code more modular.

Whenever I have logic that can't be handled with a simpler [ternary operator](/ternary-operators/) or that might be used in more than one place in my code, I like to pull it off into it's own function.

Also, if I'm generating a large HTML string, I often prefer to keep that in its own function for readability.

Let's look at some examples.

## Returning a string, number, or other value

For this example, let's imagine that I'm using some user-provided name to generate some HTML that gets rendered into the UI.

```js
function renderGreeeting (name) {

	// Get the element to render the greeting into
	let app = document.querySelector('#app');

	// Create the greeting
	let p = document.createElement('p');
	p.textContent = `Hi, ${name}! How are you today?`;

	// Inject the element into the UI
	app.appendChild(p);

}
```

For this example, I might prefer to pull those two lines that create the greeting into their own function, and return the `p` element back out so it can be used elsewhere.

```js
function getGreeting (name) {
	let p = document.createElement('p');
	p.textContent = `Hi, ${name}! How are you today?`;
	return p;
}

function renderGreeeting (name) {

	// Get the element to render the greeting into
	let app = document.querySelector('#app');

	// Inject the element into the UI
	app.appendChild(getGreeting(name));

}
```

This is kind of a silly example because it's just one paragraph. But as the size of what you're doing expands, so does the utility of this approach.

```js
function getGreeting (name) {

	// Create elements
	let wrap = document.createElement('div');
	let h1 = document.createElement('h1');
	let p = document.createElement('p');

	// Add content
	h1.textContent = `Hi, ${name}!`;
	p.textContent = 'How are you today?';
	wrap.appendChild(h1);
	wrap.appendChild(p);

	return wrap;

}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/ZEpwxXR)

## Returning a boolean

I often find `return` helpful when I need to do more complex checks that go beyond a simple `if...else`.

For example, in the web app that shows my their purchased ebooks and courses, I need to check if they've purchased a product that comes with access to my private Slack workspace. If they have, I show a button to get an invite link, and if not, I show a message instead.

The "purchase data" object (`data`) looks a bit like this.

```js
let data = {
	guides: [guide1Object, guide2Object, guide3Object, etc],
	academy: [],
	otherProducts: [product1, product2]
};
```

I need to check that one or more of the follow conditions are met...

- The `guides` key exists in `data`, has at least `4` items; or...
- The `academy` key exists in `data`, and has at least 	`1` item; or...
- The `otherProducts` keys exists, and one of the items in it (all objects) has the `slack` key with a value of `true`.

If any of those conditions are met, I can show the button.

```js
function renderSlack () {

	// Get the app element
	let app = document.querySelector('#app');

	// Do all the checks
	if ((data.guides && data.guides.length > 3) || (data.academy && data.academy.length > 0) || data.otherProducts && data.otherProducts.filter(function (product) {
		return product.slack;
	}).length > 0) {
		app.innerHTML = '<button data-slack>Join Slack</button>';
	} else {
		app.innerHTML = '<p>Sorry, you do not have access to Slack.</p>';
	}

}
```

That's... a lot of logic. It works, but it's hard to read and hard to maintain. It's _really_ easy to screw up one of the conditionals the way that's written.

Here's where pulling that out into a function that returns `true` if they have access or `false` if they don't can make it a _lot_ easier to maintain.

```js
function hasSlack () {

	// Does the customer own at least 4 pocket guides
	if (data.guides && data.guides.length > 3) return true;

	// Is the customer a member of the Vanilla JS Academy
	if (data.academy && data.academy.length > 0) return true;

	// Does the customer own another product that has Slack access
	let productsWithSlack = data.otherProducts ? data.otherProducts.filter(function (product) {
			return product.slack;
		}) : [];
	if (productsWithSlack) return true;

	// If none of these are true, no access
	return false;

}
```

Here, we run each condition to check for separately, and `return true` if it's a match. If none match, we `return false`.

Yes, this is longer. But it's also much more readable. It's easy to scan and see what's happening and what conditions are being checked. [Readability is more important than brevity.](/readability-is-more-important-than-brevity/)

Back in the `renderSlack()` function, we can now do this.

```js
function renderSlack () {

	// Get the app element
	let app = document.querySelector('#app');

	// Do all the checks
	if (hasSlack()) {
		app.innerHTML = '<button data-slack>Join Slack</button>';
	} else {
		app.innerHTML = '<p>Sorry, you do not have access to Slack.</p>';
	}

}
```

And if the conditions that grant Slack access ever change, we can update the `hasSlack()` function without touching any other code.

## An organization tool

Hopefully this helps give you an idea of how you can use `return` in your code.

It's an organizational tool that lets you structure your code in more readable ways. Use it as much or as little as you find helpful.