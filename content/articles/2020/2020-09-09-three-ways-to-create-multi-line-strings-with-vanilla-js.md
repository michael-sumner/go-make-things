---
title: "Three ways to create multiline strings with vanilla JS"
date: 2020-09-09T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at three ways to create strings that span multiple lines.

Let's say you want to inject some markup into the DOM using the `innerHTML` element. You want the final result to look like this.

```html
<article>
	<h1>Hi there, Chris!</h1>
	<p>How are you today?</p>
</article>
```

There are three ways to do this:

1. String concatenation
2. Escape newline breaks
3. Template literals

Let's dig in.

## String concatenation

With string concatenation, you use the *concatenation operator* (`+`), and treat each line as its own separate string.

```js
var html =
	'<article>' +
		'<h1>Hi there, Chris!</h1>' +
		'<p>How are you today?</p>' +
	'</article>';
```

Of the three methods we'll be looking at today, this is the most annoying to use with larger strings.

## Escape newline breaks

A simpler approach is to use the *escape operator* (`\`) to escape the line breaks in a string.

```js
var html =
	'<article>\
		<h1>Hi there, Chris!</h1>\
		<p>How are you today?</p>\
	</article>';
```

This one is a lot nicer to use for lengthier strings, but we can do even better.

## Template literals

Template literals allow you to write your string exactly as you want it to appear, line breaks and all.

Instead of traditional quotes, you use backticks to start and end your string.

```js
var html =
	`<article>
		<h1>Hi there, Chris!</h1>
		<p>How are you today?</p>
	</article>`;
```

This is by far the nicest developer experience.

The bad news? It works in all modern browsers, but not IE. And it unfortunately cannot be polyfilled, so if you need to support IE, you need to transpile your code with something like Babel.