---
title: Unit testing with vanilla JS
date: 2022-09-09T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Yesterday, we looked at [the different types of tests you can run on your JavaScript](/a-quick-primer-on-testing-javascript/). Today, we're going to deep-dive into one: unit testing.

This article was adapted from [my brand new course and ebook on testing vanilla JS](https://vanillajsguides.com/testing/). Let's dig in.

_**Quick note:** all of [the testing tools that I look at in my new pocket guide and video course](https://vanillajsguides.com/testing/) require the use of the command line interface (or CLI), as well as Node and NPM. I cover how to get started with them in detail, so if you're not comfortable with command line yet, I've got you covered!_

## What is unit testing?

**Unit tests** look at small chunks of code, and verify that they do what they're supposed to do. They can be used to test individual functions in a library or component, or smaller parts of a bigger application.

For example, let's say you have a function, `sayHi()`, that accepts a `name` and returns a greeting.

A unit test might verify that the function returns a string, that the `name` is included in that string, and that if no `name` is provided, it still returns a usable value.

```js
/**
 * Get a greeting
 * @param  {String} name The name of the person to greet
 * @return {String}      The greeting
 */
function sayHi (name = 'there') {
	return `Hi ${name}!`;
}
```

There are many, _many_ unit testing frameworks, including [Mocha](https://mochajs.org/), [Jasmine](https://jasmine.github.io/), [Chai](https://www.chaijs.com/), and [Qunit](https://qunitjs.com/).

For this guide, we'll be using a newer and very popular framework: [Jest](https://jestjs.io/).

It's easier to setup than many of the other options, provides a nice syntax that makes writing tests easier, and has pretty good documentation.

## Installing Jest

Before we can use Jest, we need to install it.

Open up the Terminal app on macOS or the Command Prompt app on Windows, `cd` into your project directory, and run `npm install --save-dev jest`.

```bash
npm install --save-dev jest
```

## Writing a unit test

To test vanilla JS with Jest, your code has to use ES modules.

```js
/**
 * Get a greeting
 * @param  {String} name The name of the person to greet
 * @return {String}      The greeting
 */
function sayHi (name = 'there') {
	return `Hi ${name}!`;
}

export {sayHi};
```

Jest works by importing the specific functions that you want to test, running them, and then evaluating that what you would expect to happen actually did.

First, let's create a test for our `sayHi()` function. We'll place our tests in the `/tests` directory, and use `{function}.test.js` as the naming convention.

```
/tests/sayHi.test.js
```

Inside our `sayHi.test.js` file, we'll `import` the `{sayHi}` function. Make sure the path to your JavaScript file is relative to the `/tests` directory.

```js
// Import the function
import {sayHi} from '../index.js';
```

Then, we'll run the Jest `test()` method.

This accepts two arguments. The first is a string that describes what we're testing. The second is a function that actually runs our test.

```js
// Import the function
import {sayHi} from '../index.js';

// Run the test
test('Returns a greeting as a string', function () {
	// Test some stuff...
});
```

Like most unit testing libraries, Jest uses a natural language syntax.

Inside the callback function, we'll use the Jest `expect()` method with [a _matcher_ method](https://jestjs.io/docs/expect) to test if the thing we're testing gives us the result we want.

The most common _matcher_ method is `expect.toBe()`, which functions like a _strict equals_ (`===`) check.

Pass the thing you're testing into `expect()`, and the expected result into `toBe()`. If they match, the test passes. If they don't, it fails.

For example, to test that `sayHi()` returns a string, we would pass `typeof sayHi()` into `expect()`, and `string` into the `toBe()` method.

```js
// Run the test
test('Returns a greeting as a string', function () {

	// should return a string
	expect(typeof sayHi()).toBe('string');

});
```

To test that the `name` variable is being used, we could pass in a name, and use the `String.includes()` method to check if its included. Since the `String.includes()` method returns a boolean, we would pass `true` into the `toBe()` method.

```js
// Run the test
test('Returns a greeting as a string', function () {

	// should return a string
	expect(typeof sayHi()).toBe('string');

	// should include the provided name
	expect(sayHi('Merlin').includes('Merlin')).toBe(true);

});
```

## Running a unit test

Jest was built to be used with Node and common JS. To use it with native ES modules, we need to add `"type": "module"` to our `package.json` file.

```json
{
	"name": "testing-vanilla-js",
	"description": "Learn how to test your JavaScript.",
	"version": "1.0.0",
	"license": "MIT",
	"type": "module",
	"devDependencies": {
		"jest": "^28.1.3"
	}
}
```

In your CLI tool, `cd` into the project directory, and run the following command.

```bash
node --experimental-vm-modules node_modules/.bin/jest
```

This will run your test, and print a report in the CLI window.

```bash
 PASS  tests/sayHi.test.js
  ✓ Returns a greeting as a string (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.16 s, estimated 1 s
Ran all test suites.
```

Typing the Jest command would be pretty tedious, so let's create an NPM script, `test:unit`, to run it for us.

```json
{
	"name": "testing-vanilla-js",
	"description": "Learn how to test your JavaScript.",
	"version": "1.0.0",
	"license": "MIT",
	"type": "module",
	"scripts": {
		"test:unit": "node --experimental-vm-modules node_modules/.bin/jest"
	},
	"devDependencies": {
		"jest": "^28.1.3"
	}
}
```

Now, you can run your tests like this.

```bash
npm run test:unit
```

## Diving deeper

On Monday, we'll look at some advanced matcher methods you can use, ways to structure and organize your code, how to deal with failing tests, and whether or not code coverage matters.

If you want to dig into these topics before then, as well as additional JS testing topics like how to test DOM manipulation, how to test APIs, and how to test your entire app in a real browser, you might enjoy my course and ebook: [Testing Vanilla JS](https://vanillajsguides.com/testings/).