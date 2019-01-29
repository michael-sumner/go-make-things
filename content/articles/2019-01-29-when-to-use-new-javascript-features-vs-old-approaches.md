---
title: "When do you use new JavaScript features vs. old approaches?"
date: 2019-01-29T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

I often advocate for older approaches over newer ones.

I still use concatenated strings over template literals. I use XHR instead of Fetch. I always use `var`, never `const` or `let`.

But also uses newer methods and APIs, too. I love `Array.map()` and `Array.filter()`. I'm a big fan of the CustomEvent API. I use `matches()` and `closest()` is almost every script I write.

I'm often asked:

> How do you decide when to use new JavaScript features vs. old approaches?

## Two questions

For me, there are two questions I always ask myself:

1. Does the new method provide a meaningful advantage over the old approach?
2. [Can it be polyfilled for older browsers?](https://vanillajstoolkit.com/polyfills/)

If the answer to number two is "no," it's a non-starter for me.

## Painless backwards compatibility

Historically, I've liked to see browser support back to IE9. These days, I'm leaning towards at least IE11 (after polyfilling). If a method or API can't provide that, I don't use.

This is why I don't use template literals even though they're awesome and amazing.

## Adding value

The first question is a bit more fuzzy.

For example, this is how you used to append an element to the DOM:

```js
parentNode.appendChild(newNode);
```

And here's the new ES6 way:

```js
parentNode.append(newNode);
```

The two methods use an identical syntax. The `appendChild()` method works back to IE6. The `append()` method has no IE or Edge support and requires a polyfill. I never use it. Why would I?

They work exactly the same, but one doesn't need a polyfill.

Fetch has a simpler syntax (on the surface), but [XHR provides some real advantages and works in more browsers](/why-i-still-use-xhr-instead-of-the-fetch-api/). I prefer XHR.

Newer ways to define variables, like `const` and `let`, not only can't be polyfilled but provide more cognitive overhead. Same goes for fat arrow functions, which, for me, provide no added value over traditional functions. I use none of these.

On the other hand, `Array.map()` and `Array.filter()` make doing things that use to take a combination of several approaches much easier. The `Object.assign()` method makes it really easy to [merge plugin defaults with user-provided options](https://vanillajstoolkit.com/boilerplates/settings-and-options/).

The CustomEvent API provides an easier way to hook into other scripts and extend their functionality.

## How do *you* decide?

Maybe that means you prefer to use all of the newest features, and run your code through [Babel](https://babeljs.io/) to transpile it back into code that runs in more places.

Maybe you [use polyfills](https://vanillajstoolkit.com/polyfills/) to patch holes (like I do). Or maybe you only write older ES5 code.

Where this value/effort line falls will vary from project-to-project and person-to-person. What's useless to me may be invaluable to you, and that's OK.

I'm just delighted to see that native web APIs are capable of doing so much today, and want to make sure our code works for as many people as possible.