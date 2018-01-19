---
categories:
- Code
- Design &amp; UX
date: '2016-02-01'
permalink: /reintroducing-keel-a-lightweight-boilerplate-for-wordpress-theme-developers/
title: Reintroducing Keel, a lightweight boilerplate for WordPress theme developers
url: /2016/02/01/reintroducing-keel-a-lightweight-boilerplate-for-wordpress-theme-developers
---

Late last week, I released version 6 of [Keel](http://keel.gomakethings.com/), a lightweight boilerplate for WordPress theme developers.

This is complete rewrite of the boilerplate, designed to speed up development time rapidly.

<!--more-->

## What's new

Previous versions of Keel were simply an empty shell&mdash;they contained no CSS, only template files and markup.

So what's new in version 6?

- [Kraken](http://cferdinandi.github.io/kraken/) is now used for a basic styling template that includes a responsive grid, forms, tables, and buttons.
- Accessible, mobile-friendly navigation and dropdown patterns are baked-in, powered by [Astro](https://github.com/cferdinandi/astro) and [Drop](https://github.com/cferdinandi/drop).
- Responsive video and Google Map support via [FluidVids.js](https://github.com/toddmotto/fluidvids).
- Faster mobile tap performance thanks to [FastClick](https://github.com/ftlabs/fastclick).
- [LoadJS](https://github.com/filamentgroup/loadJS) and [loadCSS](https://github.com/filamentgroup/loadCSS) for asynchronous loading of non-critical files for better performance.
- A ton of WordPress-specific features that can be turned on or off with a single line of code (see below).

And the whole thing is [powered by native JavaScript](https://gomakethings.com/ditching-jquery/)&mdash;no jQuery dependencies for anything.

## WordPress-specific features

To help accelerate theme development, Keel also includes some WordPress-specific features that you can toggle on or off with a single line of code.

- Beautiful mosaic image galleries.
- A GUI for creating image-driven hero headers.
- The ability to upload a custom logo.
- Shortcodes to create button links and embed inline SVGs.
- Custom page width and layout settings for greater design flexibility.
- An option to disable comments site-wide.
- A GUI for adding a message or call-to-action after every blog post.
- A “Theme Support” page in the Dashboard for your clients.

## Ugly on purpose

True to the original vision, Keel is a bit ugly on purpose. It

isn’t supposed to be a finished product. It’s a starting point that you can adapt to any project you’re working on. Add components. Remove components. Tweak the colors and font stack. Make Keel your own.

## Built for mobile. Built for performance.

Mobile-first. jQuery-free. Progressively-enhanced. Powered by [Object-Oriented CSS](http://www.slideshare.net/stubbornella/object-oriented-css).

Keel was built to be fast and lightweight, and provide a kickass mobile experience.

## Built for developers

Under the hood, Keel is powered by [Gulp.js](http://gulpjs.com/), a build system that minifies and concatenates your [Sass](http://sass-lang.com/) and JavaScript, auto-prefixes your CSS, [runs unit tests](http://jasmine.github.io/) on your scripts, optimizes your SVGs, and creates SVG sprites.

It also includes a style guide generator to help you quickly bring your team or clients up-to-speed.

## Where do you get it?

Check out the demo and download Keel at [http://keel.gomakethings.com](http://keel.gomakethings.com/).