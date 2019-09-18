---
title: "Cross-browser compatibility with vanilla JS"
date: 2018-07-09T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
---

Whenever someone signs up for [my daily newsletter](https://gomakethings.com), I ask them a simple question:

> What’s the biggest challenge you face as a web developer?

I get back a lot of interesting answers, but the one that's been coming up a lot lately is *cross-browser compatibility*. Specifically, people struggle with:

1. How to make their JavaScript works across  all of the major browsers.
2. How to make their modern code work in older browsers.
3. How far back they should provide support.

Today, let's tackle all three of these.

## 1. How to make your JavaScript work across all major browsers.

Cross-browser compatibility *can* be hard, but it doesn't have to be. In fact, there's a secret weapon that makes it really easy: polyfills.

A polyfill is [a term coined by Remy Sharp](https://remysharp.com/2010/10/08/what-is-a-polyfill) for a snippet of code that adds support for a feature to browsers that don’t offer it natively.

Add polyfills globally to your code base, and then you can use modern JavaScript methods and browser APIs without having to transpile your code into older code or do anything special.

There are polyfill's scattered all around the web, but I'm obsessed with [polyfill.io](https://polyfill.io), a free service that detects your visitor's browser and automatically sends back only the polyfills they need for their browser.

On the latest version of Chrome they get nothing, while IE 7 get's about 15kb of minified and gzipped code (still far smaller than the latest version of jQuery, React, or Vue).

If you'd rather just manually add what you need, I maintain [a growing list of polyfills on the Vanill JS Toolkit](https://vanillajstoolkit.com/polyfills/).

## 2. How to make their modern code work in older browsers.

See above. Polyfills.

I used to take great care to avoid ES6 methods and only use ES5, which works back to IE 9. Today, I just use polyfills and forget about it.

It's worth nothing that not everything is polyfillable.

Fat arrow functions, and `let` and `const`, for example, cannot be polyfilled. As a result, I avoid them in favor of traditional functions and old-fashioned `var`. It works fine!

## 3. How far back they should provide support.

This is a moving target, and varies depending on project.

Let's say you're *not* building a single page app or anything. JavaScript just adds flavor for animations, expand-and-collapse menus and such.

Today, I would aim for IE11 and up, and ensure that content behind things like expand-and-collapse menus is only hidden when the JavaScript loads and runs.

If the entire content of the site depends on JavaScript, I'd try to go as far back as humanly possible. This is, of course, made much easier thanks to polyfills.

I truly believe the web is for everyone&mdash;even people stuck using older browsers.