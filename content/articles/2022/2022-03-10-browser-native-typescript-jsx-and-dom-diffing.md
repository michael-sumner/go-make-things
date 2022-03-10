---
title: Browser-native TypeScript? What about JSX or dom diffing?
date: 2022-03-10T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

Yesterday, the [Microsoft Dev Team announced they're introducing a proposal to bring TypeScript strict typing natively to the browser](https://devblogs.microsoft.com/typescript/a-proposal-for-type-syntax-in-javascript/).

A lot of devs chimed in with both excitement, and suggestions for other library-based innovations they'd like to see natively. I wanted to unpack that today.

Let's dig in!

## The proposal

In [their proposal](https://github.com/giltayar/proposal-types-as-comments/), they suggest something like this...

```ts
function equals(x: number, y: number): boolean {
    return x === y;
}
```

The team is quick to point that they're _not_ suggesting live runtime type checking, for both compatibility and performance reasons.

> Our team isn’t proposing putting TypeScript’s type-checking in every browser and JavaScript runtime – nor are we proposing any new type-checker to be put in the browser. We think doing that would cause problems for JavaScript and TypeScript users alike due to a range of issues, such as runtime performance, compatibility issues with existing TypeScript code, and the risk of halting innovation in the type-checking space.

The idea is to provide a native standard that could be used more broadly.

> Instead, we’re just proposing syntax that is compatible with and motivated by TypeScript, which could be used by any type-checker, but which would skipped over by JavaScript engines. We believe that this approach is the most promising for everyone, and would continue to allow TypeScript, Flow, and others to continue to innovate.

Honestly, this sounds great!

## What about JSX?

I saw a handful of folks saying they'd like JSX (popularized by React) natively in the browser.

Unless I'm missing something (and I almost certainly am), the best parts of JSX are essentially what [we already have today with template literals](/template-literals-and-string-interpolation-in-vanilla-js/).

For example, take this JSX copy/pasted [from the React website](https://reactjs.org/docs/introducing-jsx.html).

```jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```

Here's that same code as native JavaScript with template literals.

```js
const name = 'Josh Perez';
const element = `<h1>Hello, ${name}</h1>`;
```

I love template literals (probably for the same reason React folks love JSX)!

## What we really need: DOM diffing

With [state-based UI](/state-based-ui-vs.-manual-dom-manipulation/), you define how HTML should look based on the current _state_ of some data.

Here, I'm using an array of wizards and [the `Array.map()` and `Array.join()` trick](/two-different-ways-to-create-html-from-an-array-of-data-with-vanilla-js/#using-array-map-and-array-join) to create some HTML from it.

```js
// The "state"
let wizards = ['Merlin', 'Gandalf', 'Radagast'];

// The template
function html () {

	// If there are no wizards, show a message
	if (!wizards) {
		return '<p>There are no wizards. 🧙‍♂️</p>';
	}

	// Otherwise, create an unordered list
	return `
		<ul>
			${wizards.map(function (wizard) {
				return `<li>${wizard}</li>`;
			}).join('')}
		</ul>`;

}
```

State-based UI libraries will take the HTML that results from something like the `html()` function, compare it to the existing UI, and selectively update just the things that need updating.

This process is known as _diffing_. Any time the data updates, the UI is diffed and updated.

Without diffing (for example, just using `innerHTML`), you end up wiping out all of the elements and rendering them again. This is bad for performance, and will completely wipe out any user data from form fields and such.

```js
// This is not ideal in many situations
app.innerHTML = html();
```

The code to do diffing well (accounting for various properties and attributes, two elements that look similar but are different, and so on) can be pretty complex, and adds a lot of weight to a page.

More than JSX or even strict type, I would _love_ to see browser-native DOM diffing.

Imagine a native `Element.prototype.diff()` method that accepts an HTML string or collection of DOM nodes as an argument, and updates the existing UI to match it.

```js
// This isn't real but I want it to be
app.diff(html());
```

React and Vue would continue to exist if we had something like this, just like how jQuery is still used all over the web today.

But for a lot of new and smaller projects, you could just reach for some native methods and forgo that big library. That would be a huge win for the web!