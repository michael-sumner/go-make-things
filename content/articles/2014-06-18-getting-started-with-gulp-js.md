---
categories:
- Code
date: '2014-06-18'
permalink: /getting-started-with-gulp-js/
title: Getting started with gulp.js
url: /2014/06/18/getting-started-with-gulp-js
---

Last week, I finally got setup with [gulp.js](http://gulpjs.com/), the JavaScript task runner for web developers. You can download the my [Gulp Boilerplate on GitHub](https://github.com/cferdinandi/gulp-boilerplate).

Today I wanted to talk about why I added Gulp to my workflow, and how I use it.

<!--more-->
## CodeKit

I've been a [CodeKit](https://incident57.com/codekit/) user for a while, and can't say enough great things about the product.

It compiles Sass, LESS, CoffeScript, and a bunch of other languages. It concatenates and minifies files. It even allows you to include HTML templates in other HTML documents using it's own `.kit` language. And it includes Live Reload and an easy way to serve local sites to all devices on your wifi network.

But for all of the great things that CodeKit does, there are a few key things it doesn't.

### The CodeKit Way

Kind of like Apple, CodeKit has some opinions on how things should work and to an extent limits what you can do.

For example, if I wanted to generate both expanded and minified versions of the same file, I can't do that. I *can* compile a minified and source mapped version, but that's not the same thing. It doesn't include unit testing or continuous integration.

For both my open source projects and client work, I needed something a bit more powerful.

## Enter Gulp.js

Gulp is a JavaScript task running powered by Node.js. You give it a series of instructions, and it runs them. That's it.

What makes Gulp shine is that it's extendable. There are so many plugins and scripts available to let you do pretty much anything you want to do. My current setup:

* Lints and concatenates JS files.
* Compiles Sass files and [automatically adds vendor prefixes](https://github.com/ai/autoprefixer).
* Exports both minified and expanded JS and CSS files.
* Cleans up file directories.
* Adds a header with copyright info to the top of all JS and CSS files.
* Runs [Jasmine unit tests](http://jasmine.github.io/2.0/introduction.html) and generates reports.
* Includes a .travis.yml file for continuous integration with [Travis CI](https://travis-ci.org/).

Of all the items on the list, the last two are the most important for me.

With every build, Gulp runs my unit tests and reports any broken or failing modules. It also issues a coverage report that let's me know how much of my script is actually covered by the test. (For example, a passing test with only one module tested isn't very useful.)

Travis CI runs with every push and pull request, and let's me know if anything I've done breaks the build. This is particularly useful for open source projects where others have contributed code.

## Why not Grunt?

A few folks have asked me why I chose Gulp over [Grunt](http://gruntjs.com/), the original JS task runner. A few reasons:

1. The Grunt syntax is a bit more verbose. Gulp tasks are simple and easy to write. Unlike Grunt, it didn't make me feel like an idiot.
2. Piping. Grunt runs each task independently (or so I'm told). Gulp let's you string together tasks and outputs a single file at the end, resulting in much faster build times.
3. I had a huge head start from Todd Motto, whose [Gulp OSS](https://github.com/toddmotto/gulp-oss) kickstarted my boilerplate. I added Sass support, concatenation, and unit testing coverage reports, and borrowed some structure from Mark Goodyear and [Big Bite Creative's boilerplate](https://github.com/bigbitecreative/base) as well.

## Getting Started

Want to try Gulp with one of your projects? (Fair warning, it will involve using Terminal.)

First, head over to GitHub and [download the boilerplate](https://github.com/cferdinandi/gulp-boilerplate). Next, make sure you have these three pieces of software installed:

* [PhantomJS](http://phantomjs.org/)
* [Node.js](http://nodejs.org/)
* [Gulp](http://gulpjs.com/) `sudo npm install -g gulp`

In terminal, switch over to the Gulp Boilerplate directory. On a Mac, type `cd`, add a space, and then drag-and-drop the folder into the terminal window and hit return. (No idea how that works on a PC, sorry!)

Next, type `npm install` and hit return to install all of the files. Finally, type `gulp` followed by enter to run Gulp for the first time. That's it!

Any time you make changes and want to update things, run `gulp` again.

### File structure, making changes, etc.

This is very much a work-in-progress for me, so the file structure will be changing and new tasks will get added as I get more comfortable using it. As of the time of writing, all of my work goes into the `src` directory, and Gulp outputs stuff into the `dist` directory.

If you decide to use [Travis CI](https://travis-ci.org/), be sure to sign up for an account, and update the links in the `README.md` file with your own info.