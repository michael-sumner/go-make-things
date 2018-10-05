---
title: "My Gulp Setup"
date: 2018-10-05T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

After Wednesday's article on [how I setup my JavaScript projects](/how-i-setup-my-vanilla-javascript-projects/), I had a few folks ask me for more info about my Gulp.js setup.

So, that's what we're going to talk about today.

If you missed it in yesterday's article, here are [my `gulpfile.js` and `package.json` files](https://gist.github.com/cferdinandi/8ca81dcff6b0324f7335003cd9003e99).

*__Note:__ I'm not going to get too detailed about each package in each task and what it does. This article is a bit on the long side already. I learned by reverse-engineering a lot of this stuff. Hopefully you can, too!*

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
	}
};
```

A few notable things here.

1. `polyfills: '!src/js/*.polyfill.js'` specifically finds files that do not have `.polyfill.js` in the file name. For my OSS projects, I'll often include a version with required polyfills, and one without.
2. `input: 'src/sass/**/*.{scss,sass}'` grabs all files in the `sass` directory that end in `.scss` or `.sass`.

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

## The Tasks

Gulp is a task runner, so naturally a core part of any `gulpfile.js` will be the actual tasks you want to run.

By default, Gulp tasks run asynchronously/concurrently. One task will not wait for the next to complete before running. This is a good thing. It makes builds run much faster.

Of course, sometimes you *need* to wait for one task to complete before another runs (for example, copying a directory that's created by another task). Fortunately, Gulp provides you with a way to handle that, too.

A gulp task has three parts:

1. The name
2. An array of dependencies (tasks that should complete before it runs)
3. A callback function to run

```js
// Copy static files into output folder
gulp.task('taskName', ['dependencyTask'], function() {
	// Thing to run...
});
```

### A naming strategy

I found that my tasks are much easier to keep organized with a solid naming strategy.

Any task that's part of a build step is prefixed with `build:`: `build:scripts`, `build:styles`, etc. Any task that cleans up a directory is prefixed with `clean:`. Linting tasks start with `lint:`, and so on.

### Only running tasks that are set to `true` in the `settings`

For each task that is configurable in the settings, I run a check beforehand to make sure that it's activated. If not, I `return` before running the task.

Here's an example for copying static files over to the distribution folder.

```js
// Copy static files into output folder
gulp.task('build:static', ['clean:dist'], function() {
	if (!settings.static) return;

	return gulp.src(paths.static.input)
		.pipe(plumber())
		.pipe(gulp.dest(paths.static.output));
});
```

### JS Tasks

On Wednesday I mentioned that I often create two versions of my scripts: one with the required polyfills, and one without (for people who roll their own).

This requires two separate Gulp tasks, but I want to keep my code DRY and avoid writing the same tasks twice.

I use `lazypipe()` to setup some tasks that run multiple times for different streams. This includes adding a banner and minifying the script.

```js
var jsTasks = lazypipe()
	.pipe(header, banner.full, {package : package})
	.pipe(optimizejs)
	.pipe(gulp.dest, paths.scripts.output)
	.pipe(rename, {suffix: '.min' + fileVersion})
	.pipe(uglify)
	.pipe(optimizejs)
	.pipe(header, banner.min, {package : package})
	.pipe(gulp.dest, paths.scripts.output);
```

First, I build the no-polyfills versions of my scripts. By including `paths.scripts.polyfills`---which maps to `!src/js/*.polyfill.js`---I tell Gulp to specifically *not* grab files that `.polyfill.js` in their filename (I make sure all polyfills I include use that format).

I also use `gulp-tap` to, as the name implies, *tap* into the stream and get some information about it.

If the file is a directory (`file.isDirectory()`) instead of a JavaScript file, I grab all of the files inside it, concatenate them (renaming them after the directory they're in), and run them through my `jsTasks()`.

Otherwise, I just pass the file as-is into `jsTasks()`.

```js
// Lint, minify, and concatenate scripts
gulp.task('build:scripts', ['clean:dist'], function() {
	if (!settings.scripts) return;

	return gulp.src([paths.scripts.input, paths.scripts.polyfills])
		.pipe(plumber())
		.pipe(tap(function (file, t) {
			if (file.isDirectory()) {
				var name = file.relative + '.js';
				return gulp.src(file.path + '/*.js')
					.pipe(concat(name))
					.pipe(jsTasks());
			}
		}))
		.pipe(jsTasks());
});
```

For the polyfilled versions of my files, I run the same set of tasks, but append the suffix `.polyfills` to the filename.

```js
// Create scripts with polyfills
gulp.task('build:polyfills', ['clean:dist'], function() {
	if (!settings.polyfills) return;

	return gulp.src(paths.scripts.input)
		.pipe(plumber())
		.pipe(concat(package.name + '.js'))
		.pipe(rename({
			suffix: ".polyfills"
		}))
		.pipe(jsTasks());
});
```

I also have [a linting step](/javascript-linters/) that uses JSHint to lint my JavaScript files for any bugs or quirks I may have missed while coding. It displays errors (with line numbers) right in the terminal window for me.

```js
// Lint scripts
gulp.task('lint:scripts', function () {
	if (!settings.scripts) return;

	return gulp.src(paths.scripts.input)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});
```

### Sass/CSS Tasks

I do a handful of things to my Sass files.

First, I convert them over to CSS. I also run them through an autoprefixer to add any necessary vendor prefixes. I also create a minified version and inject my headers.

```js
// Process, lint, and minify Sass files
gulp.task('build:styles', ['clean:dist'], function() {
	if (!settings.styles) return;

	return gulp.src(paths.styles.input)
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: true
		}))
		.pipe(flatten())
		.pipe(prefix({
			browsers: ['last 2 version', '> 1%'],
			cascade: true,
			remove: true
		}))
		.pipe(header(banner.full, {package : package}))
		.pipe(gulp.dest(paths.styles.output))
		.pipe(rename({suffix: '.min' + fileVersion}))
		.pipe(minify({
			discardComments: {
				removeAll: true
			}
		}))
		.pipe(header(banner.min, {package : package}))
		.pipe(gulp.dest(paths.styles.output));
});
```

### SVG Tasks

For my SVGs, I'm again using `gulp-tap`. If the item in the stream is a folder, I grab all of the SVGs in it and use `gulp-svgstore` to create an SVG sprite.

Otherwise, I just run it through `gulp-svgmin` to remove some of the junk that often gets added by the software used to create them.

```js
// Generate SVG sprites
gulp.task('build:svgs', ['clean:dist'], function () {
	if (!settings.svgs) return;

	return gulp.src(paths.svgs.input)
		.pipe(plumber())
		.pipe(tap(function (file, t) {
			if (file.isDirectory()) {
				var name = file.relative + '.svg';
				return gulp.src(file.path + '/*.svg')
					.pipe(svgmin())
					.pipe(svgstore({
						fileName: name,
						prefix: 'icon-',
						inlineSvg: true
					}))
					.pipe(gulp.dest(paths.svgs.output));
			}
		}))
		.pipe(svgmin())
		.pipe(gulp.dest(paths.svgs.output));
});
```

### Static Files

This one is pretty no-frills: I grab the item---whether it's an individual file or an entire directory---and copy it as-is into my distribution folder.

```js
// Copy static files into output folder
gulp.task('build:static', ['clean:dist'], function() {
	if (!settings.static) return;

	return gulp.src(paths.static.input)
		.pipe(plumber())
		.pipe(gulp.dest(paths.static.output));
});
```

### Cleaning before each build

When a fresh build runs, I wipe out the distribution directory entirely and start fresh to make sure there are no orphaned files left in there.

```js
// Remove pre-existing content from output folders
gulp.task('clean:dist', function () {
	del.sync([
		paths.output
	]);
});
```

### Watching for changes

I don't really use the Live Reload feature baked in here anymore (and I think it may be broken?).

But the `listen` task detects changes to the source directory and runs my default Gulp task whenever that happens. It also triggers a Live Reload refresh (in theory, anyways).

```js
// Spin up livereload server and listen for file changes
gulp.task('listen', function () {
	livereload.listen();
	gulp.watch(paths.input).on('change', function(file) {
		gulp.start('default');
		gulp.start('refresh');
	});
});

// Run livereload after file change
gulp.task('refresh', ['compile'], function () {
	livereload.changed();
});
```

## Actually running the tasks

You *could* run any of these tasks individually, but Gulp provides a system for running them in sets.

I setup some task runners: `compile`, `default`, and `watch`.

For some projects, I also have another tasks for generating documentation, and that gets included with `default`. But that's beyond the scope of this article.

```js
/**
 * Task Runners
 */

// Compile files
gulp.task('compile', [
	'lint:scripts',
	'clean:dist',
	'build:scripts',
	'build:polyfills',
	'build:styles',
	'build:static',
	'build:svgs'
]);

// Compile files (default)
gulp.task('default', [
	'compile'
]);

// Compile files when something changes
gulp.task('watch', [
	'listen',
	'default'
]);
```

Running `gulp` in terminal runs the `default` task. Running `gulp *` runs any other task. To run `watch`, for example, I'd type `gulp watch`.