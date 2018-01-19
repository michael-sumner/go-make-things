---
categories:
- Code
- JavaScript
date: '2017-11-13'
title: Can I use arrow functions in production code?
---

Last week we learned about [arrow functions](https://gomakethings.com/an-introduction-to-es6-arrow-functions/) and the [rest parameters](https://gomakethings.com/es6-arrow-function-rest-parameters/) feature.

**So... can you start using arrow functions in production code?** In my opinion, no.

Arrow functions work in all modern browsers, Safari 10 and up, and Mobile Chrome and Android 45 and up. They have no IE support.

Since support for them is pretty limited at this time, you would [need to use a compiler like Babel](https://babeljs.io/) to convert them to traditional functions for broader browser support. I'm not a fan of required precompilers for code.

Unfortunately, arrow functions cannot be polyfilled.

Babel does actually have an "in the browser" version you can load with a script tag, *but...* it requires you to inline your entire script, so it's not really a good solution for production sites.

**Psst...** This post was adapted from my latest vanilla JS pocket guide, ["Variables, Functions, and Scope."](https://gomakethings.com/guides/variables-functions-and-scope/)