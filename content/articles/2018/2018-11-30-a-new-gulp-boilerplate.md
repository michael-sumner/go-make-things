---
title: "A new Gulp boilerplate"
date: 2018-11-30T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- JavaScript
---

I've been using Gulp for a few years now, but my build setup had gotten wildly out-of-date.

This week, I released [a fresh new version of my Gulp Boilerplate](https://github.com/cferdinandi/gulp-boilerplate), now built on top of Gulp 4.x. Some noteworthy features...

- Concatenate, minify, and lint JavaScript.
- Compile, minify, autoprefix, and lint Sass.
- Optimize SVGs.
- Copy static files and folders into your `dist` directory.
- Automatically add headers and project details to JS and CSS files.
- Create polyfilled and non-polyfilled versions of JS files.
- Watch for file changes, and automatically recompile build and reload webpages.

My favorite thing about it, though, is that the Gulp Boilerplate makes it easy to turn features on and off, so you can reuse it for all of your projects without having to delete or modify tasks.

If you've been wanting to try out Gulp but haven't know where to start, [head over to GitHub and take it for a spin](https://github.com/cferdinandi/gulp-boilerplate).

Feel free to use it as-is, or rip it apart and reverse engineer it to build your own thing.

And if you're not comfortable with command line, but still want to benefit from a build system, [CodeKit](https://codekitapp.com/) and [Prepos](https://prepros.io/) are two great GUI-based options.