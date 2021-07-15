---
title: "What is tree shaking?"
date: 2021-07-15T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Have you heard someone use the phrase "tree shaking" while talking about JavaScript, and wondered what the hell they were talking about? This article's for you!

## Browser-native ES modules and performance issues

ES modules provide you with [a native way to break your code into smaller, modular parts](), and keep variables and functions scoped to just where they’re needed.

_**Note:** this article will make a lot more sense if you're [familiar with ES modules](/an-intro-to-import-and-export-with-es-modules/) already._

In [my pocket guide on ES modules](https://vanillajsguides.com/es-modules/), I note:

> When you `import` a function or variable, the entire file for that module has to be downloaded. If you're importing just a single function from a file that contains hundreds of them, you end up downloading far more JavaScript than you actually need.

For example, let's imagine we have a helper library that exports three utility functions.

```js
// All of the library code...

export {shuffle, debounce, dedupe};
```

In another file, we want to use the `shuffle()` function, so we `import` it.

```js
import {shuffle} from './path/to/my-library.js';

// Shuffle an array of wizards
let wizards = ['Gandalf', 'Radagast', 'Merlin'];
shuffle(wizards);
```

If you're using browser-native ES modules, loading your script with `[type="module"]`, the _entire_ `my-library.js` file is downloaded, compiled, and parsed by the browser.

You only needed `shuffle()`, but the browser has to grab the entire file to get that function for you. As you can imagine, this is a performance issue, especially with larger libraries.

This is where tree shaking comes in.

## What is tree shaking, and how does it work?

Module bundlers are tools that take JavaScript files and combine or _concatenate_ all of the `import` functions and variables into a single file.

To make files as performant as possible, modern module bundlers like [rollup.js](https://www.rollupjs.org) and [esbuild](https://esbuild.github.io/) use a process called _tree shaking_.

When they come across an `import` operator in a file, they only import the functions and variables you specified (and any internal variables or functions they use). Using our example above, the _bundled_ file would contain only the `shuffle()` function and the `wizards` array.

```js
function shuffle (arr) {
	// The code for this function...
}

// Shuffle an array of wizards
let wizards = ['Gandalf', 'Radagast', 'Merlin'];
shuffle(wizards);
```

[Browser-native ES modules have other performance challenges as well](/how-to-bundle-es-modules-with-rollup.js/), so I strongly recommend using a module bundler if you're working with them.