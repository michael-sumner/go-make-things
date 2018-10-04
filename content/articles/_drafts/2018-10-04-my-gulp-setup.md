---
title: "My gulp setup"
date: 2018-10-04T10:30:00-04:00
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

After yesterday's article on [how I setup my JavaScript projects](/how-i-setup-my-vanilla-javascript-projects/), I had a few folks ask me for more info about my Gulp.js setup.

So, that's what we're going to talk about today.

If you missed it in yesterday's article, here are [my `gulpfile.js` and `package.json` files](https://gist.github.com/cferdinandi/8ca81dcff6b0324f7335003cd9003e99).

## Gulp is JavaScript

One of the things I personally love about Gulp is that it's JavaScript powered by Node.

I'm not super comfortable with some of the nitty gritty aspets of Node itself, but if you know JS, a lot of the basics of Gulp can be a bit easier to pick up.

The biggest "different from regular JavaScript" thing about Gulp.js that I still kind of struggle with sometimes is the concept of *streams*.

[Florian Eckerstorfer does a nice job explaining it, though.](https://florian.ec/articles/gulp-js-streams/)

> Gulp did not invent streams, they are part of Node, but it standardizes them for build systems in a way that code from different authors can work together without knowing about each other.
>
> [Streams in Node.js](https://nodejs.org/api/stream.html) work a lot like streams work on YouTube. You can start consuming data while the data is not fully loaded, but every chunk of loaded data is given to you immediately after it is loaded and you are not currently processing the previous chunk. Loading does not necessarily mean downloading from the internet, it could also mean reading data from disk or from a database.

From what I understand, this is part of what makes Gulp renders so fast. You don't have to wait for all of the parts to finish to start on a task.

Alright, without out of the way, let's dig into my setup.

## Settings

One of the things I had someone specifically point out about my setup is the use of a `settings` variable.

```js
var settings = {
	scripts: true,		// Turn on/off script tasks
	polyfills: true,	// Turn on/off polyfill tasks
	styles: false,		// Turn on/off style tasks
	svgs: false,		// Turn on/off SVG tasks
	static: false,		// Turn on/off static file copying
	docs: true,			// Turn on/off documentation generation
	deploy: true,		// Turn on/off all deployment tasks
	cacheBust: false,	// Turn on/off cache busting (adds a version number to minified files)
};
```

This is a relatively new addition, born out of complete laziness.

I use the same `gulpfile.js` in all of my projects, but don't always need all of the features. Sometimes I just need to compile Sass. Sometimes I just need to compile and lint JS.

I used to have to find and delete unused stuff from the file. Now I can just toggle on or off the features I need.

## Gulp Packages

Next up in my file is where I include all of the packages needed for the project.

There are some general includes first. Then, I include the task-specific ones. For tasks that can be turned on or off with the `settings`, I only include them if the setting is turned on.

```js
// An example...

// Scripts
var jshint = settings.scripts ? require('gulp-jshint') : null;
var stylish = settings.scripts ? require('jshint-stylish') : null;
var concat = settings.scripts ? require('gulp-concat') : null;
var uglify = settings.scripts ? require('gulp-uglify') : null;
var optimizejs = settings.scripts ? require('gulp-optimize-js') : null;
```

## Paths

I use a variable to store the relative paths for all of the stuff in my project.

This let's me change the folder structure in one location instead of having to change a bunch of paths in a bunch of gulp tasks scattered throughout the file. Again... laziness.

```js
/**
 * Paths to project folders
 */

var paths = {
	input: 'src/**/*',
	output: 'dist/',
	scripts: {
		input: 'src/js/*',
		polyfills: '!src/js/*.polyfill.js',
		output: 'dist/'
	},
	styles: {
		input: 'src/sass/**/*.{scss,sass}',
		output: 'dist/css/'
	},
	svgs: {
		input: 'src/svg/*',
		output: 'dist/svg/'
	},
	static: {
		input: 'src/static/*',
		output: 'dist/'
	},
	docs: {
		input: 'src/docs/*.{html,md,markdown}',
		output: 'docs/',
		templates: 'src/docs/_templates/',
		assets: 'src/docs/assets/**'
	}
};
```

A few notable things here.

1. `polyfills: '!src/js/*.polyfill.js'` specifically finds files that do not have `.polyfill.js` in the file name. For my OSS projects, I'll often include a version with required polyfills, and one without.
2. `input: 'src/docs/*.{html,md,markdown}'` grabs all files in the `docs` directory that end in `.html`, `.md`, and `.markdown`. `input: 'src/sass/**/*.{scss,sass}'` grabs all files in the `sass` directory that end in `.scss` or `.sass`.

## Banners

I pull info from my `package.json` file to dynamically generate a header on my files with copyright and license info.

I use two different versions: a fat header for the full file, and a one-liner for the minified version. Both start with `/*!` so that if the user runs the script through their own minifier, it won't strip out the copyright info.

```js
// Up with the includes stuff near the top
var package = require('./package.json');


/**
 * Template for banner to add to file headers
 */

var banner = {
	full:
		'/*!\n' +
		' * <%= package.name %> v<%= package.version %>: <%= package.description %>\n' +
		' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
		' * <%= package.license %> License\n' +
		' * <%= package.repository.url %>\n' +
		' * Open Source Credits: <%= package.openSource.credits %>\n' +
		' */\n\n',
	min:
		'/*!' +
		' <%= package.name %> v<%= package.version %>' +
		' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
		' | <%= package.license %> License' +
		' | <%= package.repository.url %>' +
		' | Open Source Credits: <%= package.openSource.credits %>' +
		' */\n'
};
```

For bigger projects (entire sites vs. plugins and helper functions), I often my use of third-party scripts and modules.

I have a section in my `package.json` file where I can list those, and my `gulpfile.js` automatically adds links to the projects. I will delete this line if not needed.

## Cache busting

If `cacheBusting` is turned on in `settings`, I create a `fileVersion` string that gets appended to minified file names.

It pulls the version number from the `package.json` file and prefixes it with a dot (`.`). This results in filenames like `main.min.1.2.1.js`.

```
/**
 * File Version
 */

var fileVersion = settings.cacheBust ? '.' + package.version : '';
```

## JS Tasks

I use `lazypipe()` to setup some tasks that run multiple times for different streams. For my JavaScript tasks, this includes adding a banner and minifying the script.

```js
var jsTasks = lazypipe()
	.pipe(header, banner.full, { package : package })
	.pipe(optimizejs)
	.pipe(gulp.dest, paths.scripts.output)
	.pipe(rename, { suffix: '.min' + fileVersion })
	.pipe(uglify)
	.pipe(optimizejs)
	.pipe(header, banner.min, { package : package })
	.pipe(gulp.dest, paths.scripts.output);
```