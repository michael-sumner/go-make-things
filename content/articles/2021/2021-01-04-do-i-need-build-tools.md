---
title: "Do you need build tools?"
date: 2021-01-04T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
---

**tl;dr:** no, you don't.

But, you may want to use them anyways. Let's dig in.

## Keeping things simple... until they're not

There's something incredibly refreshing about being able to open a text editor, an HTML file, and a browser, and just start building.

There's no `npm install` process to wait for. No command line prompts to run. No friction between you and what you're trying to build. Until there is.

As projects get bigger, the files associated with the project grow... in size, in number, or in both. And managing that growth becomes its own kind of friction.

This is, for me, usually when I turn to build tools.

## Build tools I love

I used be a big fan of [GulpJS](https://gulpjs.com/) (and if you want to explore it, [here's the old boilerplate I used to use](https://github.com/cferdinandi/gulp-boilerplate/)).

These days, I favor a more lightweight, barebones setup using NPM scripts. [Here's the boilerplate I use now.](https://github.com/cferdinandi/build-tool-boilerplate)

I like to keep my files modular while working on them, then combine them and minify them before deploying them to production. Most of my tooling is centered around that.

While these vary from project to project, here are the build tools I often reach for.

- **[Hugo](https://gohugo.io/).** For sites that are more than a few pages, hand-coding shared elements like navigation menus, footers, and so on (and then maintaining them) becomes unmanageable. Hugo lets you author content in markdown, templates in HTML, and smushes it altogether for you.
- **[rollup.js](http://rollupjs.org/guide/en/).** rollup.js takes modular JS files, combines them, and spits them out in one or more formats. For websites, I create simple IIFEs. For plugins and open-source work, I can use it to output my code into revealing module patterns, common JS, and more.
- **[terser](https://terser.org/).** terser is a JavaScript minification tool (available as a plugin for rollup.js) that reduces the size of my JS files for use in production.
- **[Sass](https://sass-lang.com/).** Sass is a CSS pre-compiler, and it does _a lot_. Honestly, the only things I really use it for are variables and concatenating modular CSS files. The rest is just noise to me.
- **[SVGO](https://github.com/svg/svgo).** Tools that create SVGs usually add a bunch of junk that makes the files a lot larger than they have to be. SVGO strips all of that out.

## Build tools I don't like

There are two very popular tools that I just don't like working with.

- **[Babel](https://babeljs.io/).** Babel takes modern JS and transpiles it back into JavaScript that's friendly for older browsers. I'm in awe at what it does, but I don't like shipping JS that's different from the JS I actually authored. It feels weird, and it's harder to debug.
- **[Typescript](https://www.typescriptlang.org/).** Typescript adds type validation to your JS (as in, "hey, this should be a string but it's a number"). That's pretty neat, but the value compared to the effort of setting it up just isn't there for me. It solves a problem I just don't really have.

If either of these are valuable tools for you, by all means use them! They're not my cup of tea, but they're not bad tools.

## Do you need to use command line tools at all?

Nope! You can get a lot of these same benefits with GUI-based tools.

On macOS, [CodeKit](https://codekitapp.com/) is a solid choice. For Windows, macOS, _and_ Linux, there's also [Prepros](https://prepros.io/).
