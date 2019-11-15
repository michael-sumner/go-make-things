---
title: "Why I don't use let, const, or fat arrow functions (and you shouldn't either)"
date: 2018-07-17T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
---

One question I get asked a lot by my students, particularly those who've taken courses through some of the big vendors or worked with frameworks before, is:

> Why don't you use fat arrow functions or `let` and `const`?

That's right: I only use `var` and [old-school function expressions](/function-expressions-vs-function-declarations/).

Let's unpack why I don't use them, and you maybe shouldn't either.

## Why use them?

Introduced with ES6, [`let` and `const` let you declare variables](/let-var-and-const/) that cannot be redefined within certain contexts or scopes.

```js
// The value of `chips` is "Cape Cod"
let chips = 'Cape Cod';

// Throws an error: "Uncaught SyntaxError: Identifier 'chips' has already been declared"
let chips = 'Lays';
```

Fat arrow functions were also introduced in ES6, with the intent of providing a shorter syntax for writing functions and eliminating some of the confusion that exists around `this`.

A basic arrow function isn’t all that different from a traditional function. The word `function` gets dropped, an a fat arrow (`=>`) is added between the parentheses and brackets (`()` and `{}`, respectively).

```js
// A traditional function
var add = function (num1, num2) {
	return num1 + num2;
};

// The arrow function version
var add = (num1, num2) => {
	return num1 + num2;
};
```

## Why I don't use them

Simply put, they don't work in older browsers and can't be polyfilled. And I don't think the value you gain from them makes that tradeoff worth it.

You can work around this in two ways:

1. Take the position that people with older browsers should just upgrade.
2. Run everything through Babel to convert it into ES5.

I'll tackle the first point in a second, but as for Babel... why introduce *another* tool to the development process when you don't have to?

Fat arrow functions and `let` and `const` fix things I don't think were broken. The mental overhead of deciding which variable declaration to choose isn't worth it, and I think fat arrow functions are more confusing to read, if anything.

### "Just upgrade your browser"

There's a problem with this line of thinking: you’re making an assumption that people *choose* to use shitty browsers, and I think that’s false.

Some people are on computers with old OSs that can’t run modern browsers and the memory they required, and can’t afford to update. Some people are “mobile only” users who can’t afford a computer at all, stuck on an old feature phone.

Some people are in developing areas with slow bandwidth and shitty devices that are the only option.

Some people are stuck behind corporate firewalls that over-aggressively block JS, or companies that force people to use IE8 because of some stupid internal custom software that doesn’t work on anything else.

The web is literally for everyone, and not everyone who uses a terrible browser chooses to do so.

## Will I ever change my mind about this?

Probably! [I felt the same way about ES6 a couple of years.](https://shoptalkshow.com/episodes/274-vanilla-js-chris-ferdinandi/)

Thinking about it more, if it had the same support as, say, modern browsers plus IE11+ does today, I’d consider using it for things where the JavaScript is secondary and non-essential.

That said, I don’t see enough utility from them to warrant the mental bloat of having to decide if I should use `let`, `const`, or `var` for any particular variable. `var` just does it all.