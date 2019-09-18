---
title: "Template literals in vanilla JS"
date: 2019-07-11T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Introduced in ES6, *template literals* provide a simpler way to create strings that span multiple lines or contain data.

Today, let's look at how they work.

## The old-school way of creating multi-line strings

Historically, multi-line strings needed to be concatenated with an addition operator&nbsp;(`+`).

```js
var chips =
	'I love Cape Cod potato chips. ' +
	'What about you?';
```

If you wanted to use variables in your string, you would need to break the string up with quote marks.

```js
var brand = 'Cape Cod';
var chips =
	'I love ' + brand + ' potato chips. ' +
	'What about you?';
```

## The ES6 way: template literals

Instead of a quote, template literals start and end with backticks (`` ` ``). You do *not* need to concatenate new lines in template literals.

```js
var str1 =
	`<h1>Hello, world!</h1>
	<p>How are you today?</p>`;

// logs "<h1>Hello, world!</h1><p>How are you today?</p>"
console.log(str1);
```

### Using variables in strings

You can use variables in template literals (sometimes called *expressions*) by wrapping the name of the variable in curly brackets with a leading dollar sign (`${VARIABLE_NAME}`).

```js
var greeting = 'Hi, universe!';
var message = 'How is the weather today?';

var str2 =
	`<h1>${greeting}</h1>
	<p>${message}</p>`;

// logs "<h1>Hi, universe!</h1><p>How is the weather today?</p>"
console.log(str2);
```

### Using functions and conditionals in strings

You can also use conditionals and methods in template literals. You *cannot* use `if` statements, but you can [use *ternary operators*](https://gomakethings.com/ternary-operators/).

```js
var wizards = ['Hermione', 'Neville', 'Gandalf', 'Radagast'];
var showHeading = true;

var str3 =
	`${showHeading ? '<h1>Awesome Wizards</h1>' : ''}
	<ul>
		${wizards.map(function (wizard) {
			return `<li>${wizard}</li>`;
		}).join('')}
	</ul>`;

console.log(str3);
```

## Browser Compatibility

Template literals work in all modern browsers, including MS Edge, but have no IE support. They *cannot* be polyfilled, and would require a transpiler like [Babel](https://babeljs.io/) to provide backwards compatibility.

Template literals are *awesome*, but [I personally tend *not* to use them](/when-do-you-use-new-javascript-features-vs.-old-approaches/) because of their lack of deep backwards compatibility. If you don't mind using something like Babel, though, they're amazing.