---
title: "A simple alternative to React and Vue that weighs just 2.5kb"
date: 2019-08-12T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

Last week, I made some updates to [Reef, my lightweight library for creating reactive, state-based components and UI](https://github.com/cferdinandi/reef).

Reef is a simple, lightweight alternative to frameworks like React and Vue. You load it on the page with a `script` element, and it weighs just 2.5kb (gzipped and minified).

For contrast Vue weight 33.6kb (gzipped and minified). React is about the same size, too.

So how much functionality can you really bake into just 2.5kb. Turns out, quite a bit!

## Templating

One of the things people love about React is JSX, which makes templating with JavaScript a lot easier. Here's an example form the React website.

```jsx
// JSX
var name = 'Josh Perez';
var element = <h1>Hello, {name}</h1>;
```

The thing is, you can enjoy that same syntax natively with [template literals](/template-literals-in-vanilla-js/).

```js
// Vanilla JS
var name = 'Josh Perez';
var element = `<h1>Hello, ${name}</h1>`;
```

Can you spot the difference?

The vanilla JS version requires starting and ending backticks. It also prefixes variables with a `$`. Otherwise, it's pretty much the same thing&mdash;but native to JavaScript.

## Data Reactivity

Another nice feature of Vue and React is *data reactivity*. When your data changes, the UI automatically updates to match.

In React, you use the `setState()` method to update data.

```js
this.setState({comment: 'Hello'});
```

With Reef, you do the same thing.

```js
myApp.setState({comment: 'Hello'});
```

## DOM Diffing

Rather than updating the entire UI every time you change your data, modern frameworks compare how the UI *should* look to how it *actually* looks. Then, they change only the things that are needed to make current UI match the desired one.

This is better for performance, and helps prevent form fields from losing focus or any unsaved data.

Reef includes this, too. And in a future article, I'll share how I built a DOM diffing script with such a small footprint.

## Protecting you from XSS attacks

If you use third-party or user-supplied data in your UI, you could expose yourself to a [cross-site scripting (XSS) attack](/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/).

To protect yourself, you should encode any third-party first to make sure any HTML included in it doesn't run.

React and Vue handle this for by default. So does Reef.

```js
// The XSS included in this will NOT run
var app = new Reef('#app', {
	data: {
		img: '<img src=x onerror="alert(\'XSS Attack\')">'
	},
	template: function (props) {
		return props.img;
	}
});
```

## Nested Components

Sometimes your UI requires you to have a component inside a component.

React and Vue support that. Reef does, too.

```js
var app = new Reef('#app', {
	data: {
		title: 'Todo List',
		todos: []
	},
	template: function (props) {
		var html =
			`<h1>${props.title}</h1>
			<div id="todos"></div>`;
		return html;
	}
});

var todos = new Reef('#todos', {
	data: app.data,
	template: function (props) {
		var items = 'You have no todo items yet.';
		if (props.todos.length > 1) {
			items = '<ul>' + props.todos.map(function (todo) {
				return `<li>${todo}</li>`;
			}).join('') + '</ul>';
		}
		return items;
	},
	attachTo: app
});
```

Now, `todos` uses the data from `app` for it's rendering, and automatically updates whenever that data changes.

```js
// This causes todos to re-render
app.setData({todos: ['Buy cat food', 'Go for a bike ride']});
```

## Browser Support

Vue and React work all the way back to IE9 (React needs some polyfills). Reef does, too.

## What Reef doesn't do that React and Vue do

As you can see, Reef packs a lot of punch with a really small amount of code. So what *doesn't* it do?

Vue and React support server-side rendering. This let's you use them as templating engines on a NodeJS server. Reef can't do that.

They also have their own JavaScript routing plugins you can add to your project. Reef doesn't. But if you need that, [Navigo](https://unpkg.com/navigo@6.0.2/lib/navigo.min.js) is a great option and weighs just 3kb.

Larger frameworks like React and Vue also include a virtual DOM&mdash;a JavaScript mapping of the real DOM they use to handle DOM diffing. With *really* large data sets, this is better for performance. Reef diffs the real DOM, cutting down significantly on filesize and improving time to first render.

## Reef is not alone

There's a movement happening around smaller, more focused tools.

[Preact](https://preactjs.com/) features the same API as React in just 3kb of code. [hyperHTML](https://viperhtml.js.org/hyperhtml/documentation/) is 4.5kb. [Svelte](https://svelte.dev/blog/write-less-code) is a precompiler that compiles down into vanilla JS.

Powerful doesn't have to mean large. You can do a lot with what the browser gives you out-of-the-box and some lightweight helpers and libraries.

**[You can check out Reef on GitHub.](https://github.com/cferdinandi/reef)**