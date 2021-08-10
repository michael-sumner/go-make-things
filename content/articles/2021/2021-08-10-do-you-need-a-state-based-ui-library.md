---
title: "When should you use a state-based UI library?"
date: 2021-08-10T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Today, we're going to talk about state, state-based UI, and when and why you might want to use a third-party library.

This article is an excerpt from my new [State-Based UI Pocket Guide](https://vanillajsguides.com/state-based-ui/). Let's dig in!

## What is state?

One of the primary concepts behind JavaScript web apps is _state_.

If you’ve never heard that word _state_ before in JavaScript&mdash;or have but don’t know what it means&mdash;you’re not alone!

**State is just data.** So why do they call it state instead of data? Because there’s a time-bound aspect to it.

**State is data at a particular moment in time.** It’s the present “state” of your data. Get it?

Today, many web apps use state to generate their UI. With a _state-based UI_ approach, you store all of the data for your user interface in a JavaScript object. Then, you use JavaScript to build the DOM based on the current state of the data.

Here's a really over-simplified version.

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

How do you decide when you should use state-based UI and when to use traditional DOM manipulation instead? And if you do choose state-based UI, should roll-your-own or use an existing third-party library like React or Vue?

## When to use state-based UI

I personally don't think every project (or even most projects) need state-based UI. It's an over-used approach to building UIs that definitely has its place but isn't the right tool for every project.

State-based UI is a good choice when you have a UI that's updated dynamically and changes based on different conditions.

For example, a list of items that are shown or hidden based on some filters is a good candidate for state-based UI. An ecommerce store, where the text on an add to cart button changes if the item is already in your cart, and a checkout link contains the number of items in your cart, if another.

Interfaces that are rendered once and never get updated are probably better suited to more traditional approaches. Similarly, dynamic UIs without many moving parts, such a show-and-hide component, are often simpler to implement with vanilla DOM manipulation.

## Third-party libraries have a few benefits

Despite advocating heavily for vanilla JS, if you need state-based UI on a project, I think that using an established third-party tool brings a few benefits that make it a better choice than creating your own.

1. They've been used and tested by a wide range of developers, and have addressed many of the bugs and edge cases you're likely to encounter.
2. They provide access to plugins, existing components, and design patterns that you can take advantage of.
3. If you're working with a team, third-party libraries provide access to an existing pool of developers and generally pretty good documentation.

Now that you understand how state-based UI works under-the-hood, you may find third-party libraries easier to learn, and feel like you can make more informed choices about which one to use.

While I don't think state-based UI is the right tool for every project, when it _is_, a third-party library is often a good choice.

## Micro-libraries and compilers are often better than full-fledged libraries

There are a handful of state-based UI library options that I think are better choices than large client-side libraries like React or Vue.

- If you like the syntax of the library we created in this guide, than you might enjoy [Reef](https://reefjs.com), my 3kb state-based UI library that uses the same conventions but has some additional features.
- If your or your team like React, [Preact](https://preactjs.com/) is a 3kb alternative that has the same API but is orders-of-magnitude more performance.
- If you like Vue, Evan You, the guy who created it, also built [Petite Vue](https://www.npmjs.com/package/petite-vue), a small alternative distribution designed for progressively enhanced UIs.
- [Svelte](https://svelte.dev/) is a compiler that lets you author state-based UI, but compiles it into vanilla JS and old-school DOM manipulation for better performance and really small JS files.
- [Astro](https://astro.build/) builds on the approach used by Svelte, and allows you to mix-and-match Svelte, React, Vue, and more, compiling it all into vanilla JS.

These alternatives provide you with the benefits of using an established library, but result in less JavaScript shipped to users and better performance for the things you build.