---
title: "Template literals and string interpolation in vanilla JS"
date: 2021-05-04T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Introduced in ES6, *template literals* provide a simpler way to create strings that span multiple lines or contain data.

Today, we're going to look at how they work.

## The basic syntax

Instead of quotes, template literals start and end with backticks (`` ` ``). You do _not_ need to concatenate new lines in template literals the way you would with quotes.

```js
let str1 =
	`<h1>Hello, world!</h1>
	<p>How are you today?</p>`;

// logs "<h1>Hello, world!</h1>	<p>How are you today?</p>"
console.log(str1);
```

The use of the word _literal_ is accurate.

Any spaces or tabs inside the literal are included. In this case, the tab before the `p` element is included in the string as well.

## String interpolation and variables in strings

In programming, _string interpolation_ is the process or replacing variables or placeholders in a string with some other value.

While many coding languages have this feature baked until, for years JavaScript did not.

Early on, people used tools like [handlebars.js](https://handlebarsjs.com/) or [mustache.js](https://github.com/janl/mustache.js), or even [chained `String.replace()` methods](https://vanillajstoolkit.com/reference/strings/string-replace/). Newer libraries like [Vue](https://vuejs.org/) and [React](https://reactjs.org/) and [Svelte](https://svelte.dev/) also provide this functionality.

But with modern JS, you can do this natively!

You can use variables in template literals (sometimes called *expressions*) by wrapping the name of the variable in curly brackets with a leading dollar sign (`${VARIABLE_NAME}`).

```js
let greeting = 'Hi, universe!';
let message = 'How is the weather today?';

let str2 =
	`<h1>${greeting}</h1>
	<p>${message}</p>`;

// logs "<h1>Hi, universe!</h1><p>How is the weather today?</p>"
console.log(str2);
```

## Conditionals and functions

You can also use conditionals and functions in template literals.

You _can't_ use `if` statements as-is, but [you can use *ternary operators*](https://gomakethings.com/ternary-operators/) or wrap your `if` statement in [an immediately invoked function expression (IIFE)](https://gomakethings.com/the-many-ways-to-write-an-immediately-invoked-function-expression-iife-in-javascript/) that returns a string.

```js
let wizards = ['Hermione', 'Neville', 'Gandalf', 'Radagast'];
let showHeading = true;

let str3 =
	`${showHeading ? '<h1>Awesome Wizards</h1>' : ''}
	${(function () {
		if (wizards.length > 3) {
			return '<p>There are at least three wizards.</p>';
		}
		return '<p>There are fewer than three wizards.</p>';
	})()}
	<ul>
		${wizards.map(function (wizard) {
			return `<li>${wizard}</li>`;
		}).join('')}
	</ul>`;

console.log(str3);
```

## Browser support

Template literals work in all modern browsers on desktop and mobile.

They don't work in IE, which I think is OK in 2021. But unlike many of the approaches I write about here, they can't be polyfilled if you do need to support outdated browsers.