---
categories:
- Code
- WordPress
date: '2015-04-13'
permalink: /automating-css-and-js-cache-busting-with-gulp-and-wordpress/
title: Automating CSS and JS cache-busting with Gulp and WordPress
url: /2015/04/13/automating-css-and-js-cache-busting-with-gulp-and-wordpress
---

I serve my CSS and JavaScript files with far-future expires headers. This tells browsers to hold on to them for a really long time (in my case, a year), so that there's a few less assets to download on all visits and pages loads after the first.

The only snag with this is approach is that if I make an update to one of my files, someone who has an older version of my files in their cache won't get the updated code.

The easiest way to handle this is to add some sort of version number to the file name. Since the file has a different name, the browser will download it as a new file.

For a while, I had been manually renaming my files and changing their references in markup, but over the last month, I started automating the whole thing with [Gulp](http://gulpjs.com/) and [WordPress](https://wordpress.org/). This is what I do.

<!--more-->

## My Process

Here's the overview of my workflow:

1. All of my working files live in a `src` directory and are compiled into a `dist` directory. The `dist` files are the ones I link to in WordPress.
2. When compiling my CSS and JS files, Gulp adds the current version number from my `package.json` file to the end of the file name. So `main.css` becomes `main.v1.2.3.css`.
3. I keep an empty file in my `src` directory named `style.css`. Gulp adds all of the WordPress [theme stylesheet header](https://codex.wordpress.org/Theme_Development#Theme_Stylesheet), including dynamically assigning the theme version from my `package.json` file. This file goes into the main theme directory rather than `dist`.
4. When loading my external CSS and JavaScript files, I use WordPress to get the version number from my theme, so that it's always pulling the right file based on the current theme.

## The Code

In my Gulp file:

```javascript
var gulp = require('gulp');
var rename = require('gulp-rename');
var package = require('./package.json');

/**
 * Template for banner to add to file headers
 */

var banner = {
	full : '/* Used in my CSS and JS files */',
	min : '/* Used in my minified CSS and JS files */',
	theme :
		'/**n' +
		' * Theme Name: <%= package.name %> v<%= package.version %>n' +
		' * Theme URI: <%= package.repository.url %>n' +
		' * Description: <%= package.description %>n' +
		' * Version: <%= package.version %>n' +
		' * Author: <%= package.author.name %>n' +
		' * Author URI: <%= package.author.url %>n' +
		' * License: <%= package.license %>n' +
		' * License URI: <%= package.author.url %>/mit/n' +
		' */'
};

// Lint, minify, and concatenate scripts
gulp.task('build:scripts', ['clean:dist'], function() {
	return gulp.src('src/js/**/*.js')
		.pipe(rename({ suffix: '.' + package.version }))
		.pipe(gulp.dest('dist/js'));
});

// Process, lint, and minify Sass files
gulp.task('build:styles', ['clean:dist'], function() {
	return gulp.src('src/css/**/*.css')
		.pipe(rename({ suffix: '.' + package.version }))
		.pipe(gulp.dest('dist/css'));
});

// Create style.css with theme header
gulp.task('build:theme', function () {
	return gulp.src('dist/style.css')
		.pipe(header(banner.theme, { package : package }))
		.pipe(gulp.dest(''));
});
```

And in my `functions.php` file, where I load my external files using WordPress's enqueue functions:

```php
/**
 * Load theme styles and scripts
 */
function load_theme_files() {
	$theme = wp_get_theme();
	wp_enqueue_style( 'theme-styles', get_template_directory_uri() . '/dist/css/main.' . $theme->get( 'Version' ) . '.css', null, null, 'all' );
	wp_enqueue_script( 'theme-scripts', get_template_directory_uri() . '/dist/js/main.' . $theme->get( 'Version' ) . '.js', null, null, true );
}
add_action('wp_enqueue_scripts', 'oad_theme_files');
```

## Putting it all together

My setup is a bit more complicated than this, but hopefully this gets you started in the right direction. You can dig through [my entire theme on GitHub](https://github.com/cferdinandi/gomakethings) if you want to see it all together.