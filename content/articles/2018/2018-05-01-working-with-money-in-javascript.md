---
title: "Working with money in JavaScript"
date: 2018-05-01T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Working with money in JavaScript can be a real pain.

If you're doing math, you need to make sure your values are numbers and not strings to avoid any weird JS quirks. You may need to ensure your amounts have (or don't have) decimal places, and the right number of them (since `$5.505125` isn't a real amount).

Maybe you want to round up to the nearest five cents, or down to the nearest dollar, or whatever.

There are ways to do all of these things, but it's annoying complex if you're doing anything beyond some basic stuff.

## An easier way to work with money in JavaScript

[Sarah Dayan is a front-end developer based in France](https://frontstuff.io/) who's been doing some really interesting things lately.

Her latest open source project, [Dinero.js](https://sarahdayan.github.io/dinero.js/), makes working with money in JavaScript a bajillion times easier.

The highlights:

- It easily handles all that stuff I mentioned in the intro.
- It works in [any browser that supports the Internationalization API](https://caniuse.com/#feat=internationalization)&mdash;so all modern browsers and IE11 and up.
- It amazingly weighs in at just 2kb minified and gzipped.
- Sarah makes it super easy to get started, supporting ES6 modules, AMD, Common JS, NPM, and&mdash;my personal favorite&mdash;a `script` tag (which far too few projects seem to support these days).
- It's really, *really* well documented.

Sarah took the time to make this easier for people of all skill levels to get started with it.

You can [check out the docs and get started here](https://sarahdayan.github.io/dinero.js/).