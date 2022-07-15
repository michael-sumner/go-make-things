---
title: Mostly vanilla JS state-based UI
date: 2022-07-15T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

Today, I wanted to share [a tiny new library I released for creating state-based UI](https://reefjs.com) with mostly vanilla JS. Let's dig in!

## What's state-based UI?

State-based UI is an approach to building dynamic websites. 

With state-based UI, you have a data object, and you specify how the UI should look based on different conditions in your data.

```js
let data = {
	wizards: ['Gandalf', 'Radagast', 'Merlin']
};

/**
 * Create an HTML string from the data
 * @param  {Object} props The data object
 * @return {String}       The HTML string
 */
function template (props) {

	// If there are no wizards, show a message
	if (!props.wizards.length) {
		return `<p>There aren't any wizards yet.</p>`;
	}

	// Otherwise, show a list
	return `
		<ul>
			${props.wizards.map(function (wizard) {
				return `<li>${wizard}</li>`;
			}).join('')}
		</ul>`;

}

// Render the UI
let app = document.querySelector('#app');
app.innerHTML = template(data);
```

If the state of your data changes, you re-render the UI.

```js
// Add a new wizard
wizards.push('Ursula');

// Re-render the UI
let app = document.querySelector('#app');
app.innerHTML = template(data);

```

Unlike traditional DOM manipulation, with state-based UI you never worry about what the DOM currently looks like you. 

You update your data, then render the HTML for that UI.

## Challenges with vanilla JS and state-based UI

There are three challenges with creating state-based UI with vanilla JS.

Most state-based UI libraries (like React and Vue) are _reactive_. When your data updates, the UI is automatically re-rendered. You don't need to do anything. It just happens.

Earlier this week I looked at [how to create reactive data with Proxies](/simple-reactive-data-stores-with-vanilla-javascript-and-proxies/), so this one is relatively easy to solve.

Generating HTML from third-party data is also dangerous. You can expose yourself to cross-site scripting (XSS) attacks. Most state-based UI libraries have HTML sanitization built in (though a few do not 😱).

There's [an HTML Sanitizer API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API) in development, but it's still experimental and not globally supported in any browser. For now, you're on the hook for doing it yourself, and it's difficult and annoying.

But the biggest challenge, in my opinion, is DOM diffing.

When you use the `Element.innerHTML` property to update the DOM, you wipe out and repaint every node inside your parent element. 

This is bad for performance, can break any attached event listeners, and wipes out any information entered into forms and editable elements. It also removes focus from any elements inside the rendered content, creating an accessibility issue.

State-based UI libraries use a process called _DOM diffing_ to determine what's different between the desired UI and the current UI, and then selectively update just the things that have changed. The library does the manual DOM manipulation stuff for you.

Unfortunately, there's no browser-native `diff()` method that can do this for you, and it's really complicated.

## Introducing Reef

[I created Reef](https://reefjs.com) a few years ago to better understand how tools like React and Vue work under-the-hood. 

It's now on version 12. For much of its existence, it provided a simpler syntax than bigger libraries but followed a lot of the same conventions that they used.

But I've always wanted something that was mostly just vanilla JS, with a few helpers for the hard stuff.

Reef v12 finally hits that goal, I think. It includes just three helper functions:

- `store()` creates a reactive data store
- `render()` sanitizes HTML strings and diffs them into DOM
- `component()` listens for `store()` changes and automatically runs `render()` when that happens

Here's an example of a simple component written with it.

```js
// Create a reactive data store
let data = store({
	greeting: 'Hello',
	name: 'World'
});

// Create a template function
function template () {
	let {greeting, name} = data;
	return `<p>${greeting}, ${name}!</p>`;
}

// Create a component
// Renders into the UI, and updates whenever the data changes
component('#app', template);

// The UI will automatically update
data.greeting = 'Hi';
data.name = 'Universe';
```

Reef also batches multiple changes into a single render for performance.

You can load it with a `script` element or import it as an ES module. It also supports tree-shaking, so if you only need one or two functions, you can import just what you need and keep your script tiny.

The whole library is just 1.6kb gzipped and minified.

[Learn more at ReefJS.com.](https://reefjs.com)