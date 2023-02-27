---
title: Alternatives to build tools
date: 2023-02-27T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

Last week, one of my newsletter readers wrote me to ask...

> What would be nice to see on the blog is alternatives to JS build tools, for example JS modules and import maps.

A few years ago, I wrote about how [build tools aren't required to be a good developer, but they can be nice to have](/do-you-need-build-tools/).

A lot can change on the web in two years, though. Are build tools still useful? Let's dig in!

## Alternatives to build tools

Today, the native web can do a lot of things that we used to have to hack around and use build tools for.

- You can create modular JavaScript files, and `import` just the parts you need [using ES modules](/an-intro-to-import-and-export-with-es-modules/).
- [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) let you define properties once and reuse them throughout your CSS, something you used to need Sass for.
- [CSS Nesting](https://webkit.org/blog/13813/try-css-nesting-today-in-safari-technology-preview/) is in the works, and when its implemented, will provide native support for something else you used to need Sass for.
- With HTTP/2, you can download a bunch of smaller CSS and JS files simultaneously (you used to be limited to two at a time), removing some of the benefits of concatenating everything into one file.
- [Gzipping](/wtf-is-gzipping-and-how-is-it-different-from-minification/) is done on the server, and has a much bigger impact on JavaScript performance than minification.

It's possible to build in a modern way and never touch a build tool... but you still may want to.

## Why you might still want to use build tools

While modern web development is awesome, there are some limitations that affect performance and user experience...

- If you have ES modules nested a few times, the browser has to download the file, compile it, parse it, and download the nested import again before it can run. This can create notable delays in running your JavaScript.
- Native ES modules don't do any sort of [tree shaking](/what-is-tree-shaking/). If you `import` one function from a file with a dozen functions in it, the browser is still downloading all dozen of those functions.
- While minification isn't as impactful as gzipping, the two together is better than just one or the other, especially on larger sites or apps.
- There's no native process for reducing the size of images or SVG files. You still need a build tool for that.

## Build tools don't require the command line

Build tools don't have to be big and complicated, or dramatically change how you develop.

[My favorite tools](/do-you-need-build-tools/) let me develop the way I always have, and spit out a slightly enhanced version of my code at the end. That means I don't use things like Babel or Typescript.

And while [I use a command line tool](https://github.com/cferdinandi/build-tool-boilerplate), you don't need CLI at all!

GUI tools like [CodeKit](https://codekitapp.com/) (macOS) and [Prepros](https://prepros.io/) (macOS, Windows, and Linux) do most of the same things, with a visual interface instead of a Terminal window.