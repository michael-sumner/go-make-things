---
title: "An intro to import and export with ES modules"
date: 2020-11-30T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

As a project gets bigger, managing all of your code can get tricky.

Scripts get really long. There's a lot of scrolling and jumping around within a file. You're more likely to try to use a name for a variable or function that you've already use elsewhere. It's just... a lot.

ES modules provide you with a native way to break your code into smaller, modular parts, and keep variables and functions scoped to just where they're needed.

Let's dig in.

## How ES modules works

Conceptually, ES modules work like this:

1. In a file, you declare certain functions and variables as exportable, which means that they can be used outside of that file.
2. In another file, you import the functions and variables you need from the first file.

In practice, there's a bit more to it, of course. But that's the gist of how ES modules work.

Let's dig into the nitty-gritty details.


## Creating a helper library

To make this all stick, let's create a project that uses some helper functions.

Inside a `helpers.js` file, I have two functions: one to `add()` two numbers together, and another to `subtract()` them from each other.

```js
var add = function (num1, num2) {
	return num1 + num2;
};

var subtract = function (num1, num2) {
	return num1 - num2;
};
```

I want to keep all of my helper functions in one place, and use them somewhere else.

## The ES module `export` operator

Inside my `helpers.js` file, I can mark functions and variables that can be used outside the file with the `export` operator.

One way to do that is by adding the `export` operator before the variable or function expression.

```js
export var add = function (num1, num2) {
	return num1 + num2;
};

export var subtract = function (num1, num2) {
	return num1 - num2;
};
```

However, I prefer to add my export at the end as a single line. With this approach, you write `export`, then provide an object of exported variables and functions.

```js
var add = function (num1, num2) {
	return num1 + num2;
};

var subtract = function (num1, num2) {
	return num1 - num2;
};

export {add, subtract};
```

I personally find it helpful to be able to see all of the exported "stuff" at a glance, but use whichever approach you prefer. They do the same thing.

## Using the ES module `import` operator

Once you have exported variables and functions, you can import them into other files for use.

For this example, let's imagine that I have an `index.js` file. In it, I want to `prompt()` the user for two numbers, add them together, and tell the user the result.

```js
// Get two numbers from the user
var num1 = parseFloat(prompt('Enter a number', 0));
var num2 = parseFloat(prompt('Enter another number', 0));

// Get the total
var total = add(num1, num2);

// Tell them the total
alert('The total is ' + total);
```

To do this, I need to get the `add()` function from my `helpers.js` file.

At the top of my `index.js` file, before any other code, I can use the `import` operator to pull that function in. Put the functions or variables you want to import in an object, and specify the file `from` which you want to import them.

File paths _must_ start with a leading dot (`.`, or two dots if you're climbing up the directory tree).

```js
import {add} from './modules/helpers.js';
```

Now, I can use the `add()` function in my `index.js` file.

### Importing multiple functions

In the example above, I have access to `add()` but not `subtract()`, because I haven't imported it.

If I also wanted to use that function in my script, I can add it to the `import` object, separated with a comma.

```js
import {add, subtract} from './modules/helpers.js';
```

Now, I can also use the `subtract()` function.

### Importing all the things

Imagine if your `helpers.js` file had a lot of exports in it, and you wanted to import all of them.

Instead of naming every function you want to import, you can alternatively import _everything_, and assign all of the imported items to a variable.

Instead of using an object, `import *`. Then, assign it to a variable using the `as` opertor. In our case, let's use an underscore (`_`), common with helper libraries.

```js
import * as _ from './modules/helpers.js';
```

Now, I can use the `add()` and `subtract()` methods by calling them on the `_` object.

```js
// Get the total
var total = _.add(num1, num2);
```

## Using `import` and `export` in the browser

To use a script that uses ES modules, you need to tell the browser that the file is a module and not a normal script. Add to the `type="module"` attribute to your `script` element.

```html
<script type="module" src="index.js"></script>
```

_**Note:** using ES modules natively in the browser results in multiple HTTP requests, and creates the same performance issues that the CSS `@import` property does. In a future article, we'll look at how to address this. It's great for rapid development, though._

ES modules also won't run if you try to just open an HTML file in the browser using the `file://` origin. You need to run a local server for local development.

[William Bowers has a great list of one-liners for starting up a web server here.](https://gist.github.com/willurd/5720255) Alternatively, you can [run MAMP if you prefer a GUI](https://www.mamp.info/en/windows/).

## Demo

[You can download a demo of everything we looked at today on GitHub.](https://github.com/cferdinandi/es-modules-demo)

## Browser compatibility

ES modules work natively in all modern browsers, but not IE.

However, you shouldn't use them as-is in production anyways, because of the performance issues mentioned above. In a future article, we'll look at how to combine all of your files into a single file that runs in the browser, addressing both of these issues.