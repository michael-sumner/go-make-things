---
title: How to scale a JavaScript project over time (part 3)
date: 2023-04-21T10:30:00-04:00
draft: false
---

On Wednesday, we looked at [how to scale a project from a simple one-off script to a more robust library](/how-to-scale-a-javascript-project-over-time-part-1/). Yesterday, we learned [how to add more flexibility to our libraries](/how-to-scale-a-javascript-project-over-time-part-2/).

Today, we’re going to look at how document code, and how to organize it for easier maintainability.

Let's dig in!

## File Structure

The structure of my code base varies a bit from project to project, but I do have some general guidelines I follow.

I lean heavily on [ES modules](https://vanillajsguides.com/es-modules/) to keep my code organized. They allow me to break what would be bigger files into smaller, more manageable parts. They also allow me to reuse functions in different parts of my code base without having to copy/paste them all over the place.

For _JavaScript libraries_, I usually have my main library file, and a `/components` directory with all of the files that go into it.

```
/components
my-awesome-library.js
```

Inside the main library file, I'll import my main library Class or initialization function (or all of the utility classes if it's a utility library) then export it back out.

Here's what a Class-based library might look like...

```js
import TOC from './components/main.js';
export default TOC;
```

And here's what a utility library might look like...

```js
import render from './components/render.js';
import store from './components/store.js';
import component from './components/component.js';

export {render, store, component};
```

If I'm building an app, I'll typically have dedicated files for each unique view or page, with a `/components` directory that has all of the various parts.

Some are shared across views, while some are not.

```
/components
home.js
about.js
contact.js
```

And here's what one of the page-specific files might look like.

```js
// contact page view
import {callAPI} from './components/api.js';
import TOC from './components/table-of-contents.js';
import './components/events.js';

// Initialize Table of contents
let toc = new TOC('[data-toc]');

// Listen for content form submissions
// Send data to the API
let form = document.querySelector('#contact');
form.addEventListener('submit', function () {
	callAPI('contact', new FormData(form));
});
```

## Code Structure

Within any given file, I generally follow a pattern:

- If an ES module, imports at the very top of the page
- Variable declarations at the top of the page (after any imports)
- Functions and methods in the middle
- Inits and event listeners at the end

```js
import {callAPI} from './api.js';

// Get DOM elements
let form = document.querySelector('form');

// Handle submit events
function handleSubmit (event) {
	let data = new FormData(event.target);
	callAPI('contact', data);
}

// Listen for submit events
form.addEventListener('submit', submitHandler);
```

Within functions, I follow a similar pattern, with variable declarations at the top, followed by any tasks the function does.

```js
// Handle submit events
function handleSubmit (event) {
	let data = new FormData(event.target);
	callAPI('contact', data);
}
```

## Documenting code

Documenting code is critical for long term maintainability.

While I tend to write short functions with _very_ obvious names, self-documenting code is largely a myth. I like to follow [this guidance from Dr. Kate Compton](/how-to-write-good-comments/)...

> Programming pro tip: In your comments, write what you did and why, record your level of petulance (REALLY) and the StackOverflow link that made you realize something

I use [the JSDoc format for my documentation comments](/documenting-javascript/). I detail what the function does, as well as the various parameters and expected formats.

[JSDoc has a pattern for documenting object properties](/how-to-document-object-properties-with-jsdoc/) as well, which is very useful.

```js
/**
 * Get the details about a wizard to render into the UI
 * @param  {Object}  wizard         The wizard data
 * @param  {String}  wizard.name    The wizard's name
 * @param  {Array}   wizard.spells  A list of spells the wizard knows
 * @param  {Integer} wizard.age     The wizards age
 * @return {String}                 The message about the wizard
 */
function getWizardMessage (wizard) {
	let {name, spells, age} = wizard;
	return `${name} is ${age} years old, and knows the following spells: ${spells.join(', ')}`;
}
```

## Any tips of tricks?

That's how I structure and document my code. 

Do you do anything different? Any tips, tricks, or best practices you'd like to share? [Send me an email](/about) and let me know!