---
title: "Renaming imports and exports with ES modules in vanilla JS"
date: 2021-03-10T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Late last year, I wrote about ES modules: [how to `import` and `export` them](/an-intro-to-import-and-export-with-es-modules/), and [how to define a default export](/how-to-define-a-default-export-with-vanilla-js-es-modules/).

One thing I _didn't_ mention is that ES modules provide a simple way to rename variables and functions when importing and exporting them. You might want to do this to avoid naming conflicts, or simple for convenience.

Today, let's dig into how that works.

_**Worth mentioning:** I'm working on [a new Pocket Guide to ES Modules](https://vanillajsguides.com). Today's article is an excerpt from it._

## Renaming an import

Let's say you have a `helpers.js` module that exports a `getTheAnswer()` function.

```js
function getTheAnswer () {
	return 42;
}

export {getTheAnswer};
```

But in your `index.js` where you're going to import it, you already have a function with that name.

```js
// This is a problem because getTheAnswer() is already in this module
import {getTheAnswer} from './helpers.js';

// Tell them the total
function getTheAnswer () {
	alert(`The answer is ${getTheAnswer()}`);
}

getTheAnswer();
```

Fortunately, you can rename function when you `import` it using the `as` operator: `import {importedFunction as newFunctionName}`.

```js
// Rename the import
import {getTheAnswer as answer} from './helpers.js';

// Tell them the total
function getTheAnswer () {
	alert(`The answer is ${answer()}`);
}

getTheAnswer();
```

Now, the `getTheAnswer()` function from `helpers.js` is assigned to the `answer` variable, and will not conflict with the existing function.

## Renaming an export

ES modules also allow you to rename a function or variable while exporting it, again use the `as` syntax: `export {exportedFunction as newFunctionName}`.

In our `helpers.js` file, for example, we can rename `getTheAnswer` to `answer` on `export`.

```js
function getTheAnswer () {
	return 42;
}

export {getTheAnswer as answer};
```

Then, in the `index.js` file, we can `import` the function as `answer`.

```js
import {answer} from './helpers.js';

// Tell them the total
function getTheAnswer () {
	alert(`The answer is ${answer()}`);
}

getTheAnswer();
```