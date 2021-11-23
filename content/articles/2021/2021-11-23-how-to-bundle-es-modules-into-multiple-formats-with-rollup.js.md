---
title: How to bundle ES modules into multiple formats with rollup.js
date: 2021-11-23T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

About a year ago, I wrote about [how to bundle ES modules with rollup.js](/how-to-bundle-es-modules-with-rollup.js/). One thing I didn't talk about was how to create multiple file formats from your bundle.

For example, let's say you have a JS library that you want to distribute in a browser-ready format (an IIFE or revealing module pattern), as well as a single file with ES module exports, and another for use with Node.js. 

Rollup.js makes it really easy for you to write once code base and deliver it in multiple formats for a variety of users. Let's dig in!

(_If you haven't yet, [go read the original article first](/how-to-bundle-es-modules-with-rollup.js/) or this one won't make much sense._)

## Exporting an array in the `rollup.config.js` file

In the `rollup.config.js` file from the original article, we exported an object of settings, like this.

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

But rollup.js also lets you export an array of options, and will loop through each one and generate a file based on it.

Inside the `rollup.config.js` file, let's create an array of `formats` that we want to export to. In this case, let's create an IIFE (`iife`), an ES module (`es`) with all of the components bundled into one file, and a Common JS file for NodeJS users (`cjs`).

```js
let formats = ['iife', 'es', 'cjs'];
```

Next, we'll use the `Array.map()` method to loop through each `format`, create a config for it, and generate a new array of configurations.

```js
let formats = ['iife', 'es', 'cjs'];

export default formats.map(function (format) {
	return {
		input: 'index.js',
		output: {
			file: `scripts.js`,
			format: format
		}
	};
});
```

With this setup, we'll create three different exports, one for each format. But, because they all export to `scripts.js`, each one will overwrite the one before it.

## Creating unique file names

We can use the `format` as part of the `file` name.

One thing I like to do is use a ternary operator to check if the `format` is `iife`. If so, I make that the main file, and add the `format` name to the rest of the files.

```js
export default formats.map(function (format) {
	return {
		input: 'index.js',
		output: {
			file: `scripts${format === 'iife' ? '' : `.${format}`}.js`,
			format: format,
		}
	};
});
```

Now, when you run `npm run js`, you'll get three files with three different output formats: `scripts.js`, `scripts.es.js`, and `scripts.cjs.js`.

You can [download all of the code from today’s lesson on GitHub](https://github.com/cferdinandi/es-module-bundler-multi). This article was adapted from [my ES Modules pocket guide and video course](https://vanillajsguides.com/es-modules/).