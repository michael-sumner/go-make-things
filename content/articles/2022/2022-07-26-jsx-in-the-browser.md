---
title: JSX in the browser
date: 2022-07-26T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

One often-repeated refrain from the React crowd is "build JSX into the browser, you cowards!"

And I've never quite understood that, because JSX already _is_ built into the browser... as template literals.

Let's dig in!

## What is JSX?

[JSX is a syntax extension to JavaScript](https://reactjs.org/docs/introducing-jsx.html) that's used to create elements in React.

Consider the traditional way of generating a multiline HTML string.

```js
let greeting =
	'<h1>Hello, world!</h1>' +
	'<p>How are you today?</p>';
```

In JSX, you can do this.

```jsx
let greeting = (
	<h1>Hello, world!</h1>
	<p>How are you today?</p>
);
```

JSX also makes it easier to add variables and functions. You just wrap them in curly brackets.

Instead of this...

```js
let name = 'Merlin';
let greeting =
	'<h1>Hello, ' + name + '!</h1>' +
	'<p>How are you today?</p>';
```

You can do this...

```jsx
let name = 'Merlin';
let greeting = (
	<h1>Hello, {name}!</h1>
	<p>How are you today?</p>
);
```

Cool, ok. I see the benefit of this.

## What are template literals?

Template literals provide developers with an easier way to create HTML strings in JavaScript.

Instead of using double or single quotes, you use backticks. Unlike a traditional string, the stings you create with template literals can span multiple lines. without any special characters or escaping.

```js
let greeting = 
	`<h1>Hello, world!</h1>
	<p>How are you today?</p>`;
```

Look familiar?

Template literals also allow for _string interpolation_. That's a fancy way of saying that you can include variables and functions as part of the string. You wrap the variable or function in curly brackets with a leading `$`.

```js
let name = 'Merlin';
let greeting = 
	`<h1>Hello, ${name}!</h1>
	<p>How are you today?</p>`;
```

And here's where I get stuck.

Because when React evangelists say that template literals are a bad implementation of JSX, I have no idea what they're talking about. They do pretty much the same thing, and they're awesome!

## What can JSX do that template literals can't?

[Sanitization.](/how-to-sanitize-html-strings-with-vanilla-js-to-reduce-your-risk-of-xss-attacks/)

> By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.

There's no browser-native feature for this... yet. 

But the [HTML Sanitizer API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API) (currently an experimental feature) will fix that once it's finally released.

So next time you see someone ranting about putting JSX in the browser, tell them it already is.