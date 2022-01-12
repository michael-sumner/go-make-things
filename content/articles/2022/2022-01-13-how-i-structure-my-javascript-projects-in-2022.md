---
title: How I structure my JavaScript projects in 2022
date: 2022-01-13T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Technology
---

One of the things I get the most questions about from my students is about what the "best way" to structure code is. 

The truth is, there is no _best way_. But I do have a series of conventions and rough guidelines that I follow. Today, I thought I'd share them with you.

Let's dig in!

## The JavaScript patterns I use

I have a small handful of JavaScript patterns I use, depending on the needs of the project.

- For libraries, I typically use [a Constructor pattern](/an-introduction-to-the-javascript-constructor-pattern/).
- For simple scripts on personal projects, I typically use a small function as a wrapper. I generally want to explicitly invoke it rather than using [an Immediately Invoked Function Expression (or IIFE)](/the-many-ways-to-write-an-immediately-invoked-function-expression-iife-in-javascript/).

I used to use [revealing module patterns](https://vanillajstoolkit.com/boilerplates/revealing-module-pattern/) a lot more often, but these days, I tend to [use ES modules](https://vanillajsguides.com/es-modules/) instead (more on that in a bit).

## The build tools I use

I used to use [Gulp.js](https://gulpjs.com/), and [CodeKit](https://codekitapp.com/) before that. 

Now, I'm a big fan of running NPM scripts directly. It gives me more control than CodeKit, but a much smaller set of dependencies (and less things breaking all the time) than Gulp.

**Every single one of my projects now uses my [Build Tool Boilerplate](https://github.com/cferdinandi/build-tool-boilerplate).**

It's setup to let me easily drop out the stuff I don't need, and customize the stuff I do through a configurations object. It includes [rollup.js](https://www.rollupjs.org/guide/en/) for JavaScript, [Sass](https://sass-lang.com/) for CSS, and a handful of SVG and image optimization tools.

I _don't_ use webpack, because it's confusing and complicated. I also don't use TypeScript, because it's an added layer of dependencies, and solves problems I don't personally have.

## How I organize code within a file

I tend to maintain a specific structure to my files...

- Variables at the top of the page
- Functions and methods in the middle
- Initializations and event listeners at the end

This makes it really easy for me to open any particular file and have a rough idea of how it's organized and how to find what I'm looking for relatively easily.

```js
// 
// Variables
// 

let name = 'Merlin';
let spells = {
	teapots: 'Dancing teapots', 
	fish: 'Turn into a fish'
};


//
// Methods
// 

/**
 * Cast the spell
 * @param  {String} spell The spell to cast
 */
function castSpell (spell) {
	alert(spell);
}


// 
// Inits & Event Listeners
// 

document.addEventListener('click', function (event) {
	castSpell(spells.fish);
});
```

I use [JSDoc](https://jsdoc.app/) to document my code. Some text editors will use this to pull out information about functions when used in other places in your code, which is quite nice!

I maintain a similar structure _within functions_ as well.

## How I modularize and organize files

I'm [a big fan of ES modules](https://vanillajsguides.com/es-modules/). They help me keep my code more structured and organized.

But I've also seen people go _too_ modular for my liking, creating deeply nested file trees with each function in its own little file. This creates, in my opinion, a different kind of organizational challenge (that I've been guilty of myself).

To avoid doing this, I tend to start all of my projects as a single JavaScript file.

At some point, it may start to feel too big. I'm doing a lot of scrolling up-and-down, or I open the file a second time in another tab to easily reference different parts of it.

That's usually my sign that it's time to break things up a bit.

- **For JavaScript libraries,** I organize my functions and files by what they do: `event-listeners.js`, `dom.js`, `constructor.js`, and so on.
- **For websites and apps,** I tend to keep each library or discrete piece of functionality in its own file, and `import` them into files specific to the pages they're needed on: `search.js`, `table-of-contents.js`, and so on.

I keep all of my build files in a `src` directory, and compile them with rollup.js and my [Build Tools Boilerplate](https://github.com/cferdinandi/build-tool-boilerplate) into a `dist` directory.

## What did I miss?

That's a rough overview of how I work, but I'm sure I missed some details.

Is there anything you'd like me to dig into more about my work setup that I didn't cover in this article? Send me an email and let me know!