---
title: "How to bundle ES modules with rollup.js"
date: 2020-12-03T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

This week, we've been [learning about ES modules](/series/es-modules/).

In my [article on `import` and `export`](/an-intro-to-import-and-export-with-es-modules/), I mentioned that native ES modules can create performance issues:

> Using ES modules natively in the browser results in multiple HTTP requests, and creates the same performance issues that the CSS `@import` property does. In a future article, we’ll look at how to address this.

Well, friends, this is that future article!

## Module bundlers

Rollup.js is a module bundler. It takes input files, and combines them into a single output file in one or more formats.

For example, [in yesterday's article on scoping with ES modules](/scoping-with-vanilla-js-es-modules/), we looked at a simple project with two files in it.

One of them, `helpers.js`, looked like this.

```js
var answer = 42;

var getTheAnswer = function () {
	return answer;
};

export default getTheAnswer;
```

The other, `index.js`, imports content from `helper.js` and looked like this.

```js
import getTheAnswer from './modules/helpers.js';

var name = 'Radagast';

alert('The answer is ' + getTheAnswer());
```

We can use a rollup.js to output a `scripts.js` file that imports all of the required files and functions and scopes them inside an IIFE, like this.

```js
(function () {
	'use strict';

	var answer = 42;

	var getTheAnswer = function () {
		return answer;
	};

	alert('The answer is ' + getTheAnswer());

}());
```

This avoids the performance issues that multiple HTTP requests cause with native ES modules, and also lets you run your script in older browsers that don't support ES modules.

Let's look at how it works.

## Installing rollup.js

Just a quick heads up: this will require the command line. I'll try to make it as painless as possible.

[Here's some source code you can download to follow along with me.](https://github.com/cferdinandi/es-module-bundler)

To get started, you need to to have [NodeJS](https://nodejs.org/) installed on your computer. If you don't yet, head over to the Node website and follow the instructions there.

Next, we need to add a `package.json` file to the project. I've got some dummy information in it. The most important part is the `devDependencies` object, with `rollup` as a dependency.

```json
{
	"name": "rollup",
	"description": "a barebones module bundler boilerplate",
	"version": "1.0.0",
	"license": "MIT",
	"repository": {
		"type": "git",
		"url": "https://github.com/rollup/rollup"
	},
	"devDependencies": {
		"rollup": "^2.34.0"
	}
}
```

Next, open up your command line tool. On MacOS, it's the terminal app.

Type `cd `, then the path to your project. On MacOS, you can drag-and-drop the folder into terminal to get the path, which is super handy. Hit `enter`.

```bash
cd ~/path/to/my/project
```

Now, we can install rollup.js itself. Type `npm install`, then hit the `enter` key. When it's done, you should see a message like this.

```bash
added 2 packages from 6 contributors and audited 2 packages in 1.123s
found 0 vulnerabilities
```

With rollup.js installed, lets learn how to actually use it.

## How to use rollup.js

If you wanted to you, you could run rollup.js entirely from command line. But, I personally find it a lot easier to create a configuration file.

Create a file named `rollup.config.js`. This is where we'll tell rollup.js what files to bundle, and how to output them.

In our case, we'll `input` the `index.js` file, and output it as a file named `scripts.js`. Any imports in `index.js` will also get pulled in automatically. We want to output our file as an `iife`.

```js
export default {
	input: 'index.js',
	output: [
		{
			file: 'scripts.js',
			format: 'iife'
		}
	]
};
```

To run rollup.js, we can type `rollup --config` in the command line, then hit the `enter` key. The `rollup` keyword runs rollup.js, and the `--config` tells it to use our config file for all of the options and settings.

On bigger development projects, it's helpful to create NPM commands to run common tasks.

Inside your `package.json` file, you can add a `scripts` object, with `js` (or `build`, or whatever other name you prefer). For its value, we'll add our `rollup --config` command.

```json
{
	"name": "rollup",
	"description": "a barebones module bundler boilerplate",
	"version": "1.0.0",
	"license": "MIT",
	"repository": {
		"type": "git",
		"url": "https://github.com/rollup/rollup"
	},
	"scripts": {
		"js": "rollup --config"
	},
	"devDependencies": {
		"rollup": "^2.34.0"
	}
}
```

Now, instead of typing `rollup --config`, you can type `npm run js`.

## Using the output file

When you go to use the new `scripts.js` file, you can skip the `type="module"` property on your `script` element.

The bundled file _isn't_ a module. It's a plain old traditional script _build from_ ES modules using a module bundler.

You can [download all of the code from today's lesson on GitHub](https://github.com/cferdinandi/es-module-bundler). For more advanced projects, you can [checkout my full build tool boilerplate](https://github.com/cferdinandi/build-tool-boilerplate).