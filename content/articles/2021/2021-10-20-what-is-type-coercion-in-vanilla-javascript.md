---
title: What is type coercion in vanilla JavaScript (and how does it work)?
date: 2021-10-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

One of the projects in the [Vanilla JS Academy](https://vanillajsacademy.com) uses the [Ron Swanson Quotes API](https://github.com/jamesseanwright/ron-swanson-quotes) to get a random Ron Swanson quote and inject it into the UI.

One of the more common ways I see students get tripped up by this project is with _type coercion_.

Today, I wanted to explain what it is and how it works. Let's dig in!

## What is type coercion?

JavaScript will sometimes _coerce_ an item of one type (for example, a string) into another (for example, a number). In situations where this occurs, it happens automatically and without you having to explicitly do something.

For example, in JavaScript, a plus sign (`+`) can be used to add two numbers _or_ to concatenate strings. So what happens if you use it with a number _and_ a string?

```js
let mystery = 4 + '2';
```

Here, `mystery` would be a string with a value of `"42"`. JavaScript _coerces_ the number `4` into a string, and then concatenates them.

[Here's a demo.](https://codepen.io/cferdinandi/pen/LYjRZbR)

## This gets weird

What if you had several numbers and a string?

```js
let mystery = 4 + 2 + '4';
```

Here, `mystery` would be a string again, this time with a value of `"64"`.

First, `4` and `2` are added together using the addition operator (`+`), for a value of `6`. Then, `6` is coerced into a string, and combined with `"4"` using the concatentation operator (again `+`).

[Here's another demo.](https://codepen.io/cferdinandi/pen/oNezLwB)

JavaScript also has [two different equality operators](/how-to-check-if-two-items-are-equal-in-vanilla-js/): _equals_ (`==`) and _strict equals_ (`===`).

If comparing a string to a number, the _equals_ operator will _coerce_ the string into a number before comparing them. The _strict equals_ operator will not.

```js
// This logs "equal"
if (4 == '4') {
	console.log('equal');
} else {
	console.log('not equal');
}

// This logs "not equal"
if (2 === '2') {
	console.log('equal');
} else {
	console.log('not equal');
}
```

[Here's yet another demo.](https://codepen.io/cferdinandi/pen/MWvjeEN)

## Text properties and arrays

If you have an array of items, and you inject it into the DOM using a text-property like `Node.textContent` or `Element.innerHTML`, JavaScript will coerce the array into a string, delimited by a comma (`,`), just like if you explicityly used the `Array.join()` method.

In this example, `wizards` get coerced into `"Merlin,Radgast"`, and that gets injected into the UI.

```js
let wizards = ['Merlin', 'Radagast'];
app.textContent = wizards;
```

[Here's one last demo.](https://codepen.io/cferdinandi/pen/xxLEOjE)

This is the type coercion gotcha that trips up most of my students on the Ron Swanson quote project. The API returns an array with a single quote in it.

Students often use the `Node.textContent` property to show that in the UI, but inject the whole array.

```js
let quotes = ["Give a man a fish and feed him for a day. Don't teach a man to fish… and feed yourself. He's a grown man. And fishing's not that hard."];
blockquote.textContent = quotes;
```

Because there's only one item in `quotes`, it _seems_ like the API has returned a string, which creates some unexpected side-effects later in the project.

## Why is this a thing?

Type coercion can be used as a shortcut for certain types of tasks.

It can be convenient to not have to convert a number into a string before concentating it, or an array into a string before injecting it.

But as a general best practice, I think it's better _not_ to rely on type coercion, and to instead explicitly convert items into the types you want. This makes your code easier to read (the intent is more explicit), and reduces unwanted side-effects.

```js
// Combine as a string
let combine = (4).toString() + '2';

// Add two numbers
let add = 4 + parseFloat('2');

// Inject an array
let arr = ['Hello', 'world'];
app.textContent = arr.join(' ');
```

[Here's a final demo.](https://codepen.io/cferdinandi/pen/abymZMp?editors=1111)