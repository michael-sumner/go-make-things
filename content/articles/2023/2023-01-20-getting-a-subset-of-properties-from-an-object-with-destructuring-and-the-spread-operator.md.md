---
title: Getting a subset of properties from an object with destructuring and the spread operator
date: 2023-01-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In response to [yesterday's article on object destructuring](/the-ins-and-outs-of-object-destructuring-with-vanilla-js/), someone asked how to get the rest of the properties that you _didn't_ destructure into variables as their own object.

For example, if you have an object like this...

```js
let movies = {
	disney: 'Moana',
	pixar: 'Up',
	dreamworks: 'How to Train Your Dragon',
	nickelodeon: 'Wonder Park'
};
```

How do you pull `disney` and `pixar` into their own variables, and create an object with `dreamworks` and `nickelodeon`?

For that, we can combine object destructuring with the spread operator. Prefix one last variable with three dots (`...`), and it will be assigned an object with the remaining properties of your object that weren't destructured.

```js
let {disney, pixar, ...everyoneElse} = movies;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/oNMpNZY?editors=0011)