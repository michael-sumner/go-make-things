---
title: "Converting the Vue.js markdown editor demo to vanilla JS"
date: 2020-11-03T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Vanilla Framework Demos
---

A few weeks ago, I created a few videos of me converting jQuery plugins to vanilla JS. I thought it would be fun to do the same thing with the demo projects from a few popular frameworks.

Today, I'm converting [the Vue.js markdown editor demo](https://vuejs.org/v2/examples/index.html) into vanilla JS. Let's dig in.

## Watch me code

If you want, you can [watch me code this project](https://vimeo.com/475073143).

<iframe src="https://player.vimeo.com/video/475073143?color=0088cc&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

You can also [download the source code on GitHub](https://gist.github.com/cferdinandi/81e666a602f6b5fe2aa0cffd6e31b6ab).

## How I approached this project

The first thing I did was rip out Vue and lodash from the source code. We're not going to need either of them. I left in the marked.js library, however, because converting markdown to HTML is something I'm happy to let a library handle for me.

I also stripped out all of the Vue syntax and properties from the elements in the HTML.

```html
<div id="editor">
	<textarea></textarea>
	<div></div>
</div>
```

Next, I used the `querySelector()` method to get the `textarea` element, and the `div` that the compiled HTML is getting rendered into.

```js
// Variables
var text = document.querySelector('#editor textarea');
var compiled = document.querySelector('#editor div');
```

### Converting markdown to HTML

Whenever the value of the `textarea` changes, we want to parse it into markdown and render it into the UI.

The Vue demo uses lodash to [debounce this event](/debouncing-vs.-throttling-with-vanilla-js/) so that it only runs after the user has stopped typing for 300 milliseconds. The thing is, we don't need a whole 30kb library for that!

First, I attached an `input` event handler to the `text` element with the `addEventListener()` method. I passed in a named function, `changeHandler()`, as my callback.

```js
text.addEventListener('input', changeHandler);
```

In the `changeHandler()` function, I pass the `text.value`, the text in the `textarea` element, into the global `marked()` function that marked.js creates. I also kept the `{sanitize:true}` option that was in the Vue.js demo.

Then, I use the `innerHTML` property to inject the resulting HTML into the `compiled` element.

```js
// On change event, process text into markdown and render
var changeHandler = function () {
	compiled.innerHTML = marked(text.value, {sanitize: true});
};
```

You typically want to [sanitize third-party content](/how-to-sanitize-third-party-content-with-vanilla-js-to-prevent-cross-site-scripting-xss-attacks/) like user-generated inputs, but the older version of marked.js that the demo uses appears to do this for you.

### Debouncing without lodash

Now, let's debounce this so that it only runs after the user stops typing. First, I created a `debounce` variable that will store the current _pending_ callback.

```js
// Variables
var text = document.querySelector('#editor textarea');
var compiled = document.querySelector('#editor div');
var debounce;
```

Inside the `changeHandler()` function, I use the `setTimeout()` method to run the "convert to markdown" code after a 300 millisecond delay, and assign it to the `debounce` variable.

Whenever the `changeHandler()` function is called, I first use the `clearTimeout()` method to cancel any existing `setTimeout()` assigned to `debounce` so that it doesn't run. As a result, only the last instance of the function will run.

```js
// On change event, process text into markdown and render
var changeHandler = function () {
	clearTimeout(debounce);
	debounce = setTimeout(function () {
		compiled.innerHTML = marked(text.value, {sanitize: true});
	}, 300);
};
```

Four lines of code negated the need for a 30kb JS library.

### Adding default text

The Vue demo starts with some code in the `textarea`. Because it uses [state-based UI](/how-to-create-a-state-based-ui-component-with-vanilla-js/), that value is part of a JS object.

But we can get the same effect by just adding the text we want directly to the `textarea` element.

```html
<textarea># Hello, world</textarea>
```

We also want to render this initial text to HTML when the page loads.

I moved the code to convert the `text.value` to HTML and inject into the UI into a new function: `render()`. I call this function in my `setTimeout()`.

```js
var render = function () {
	compiled.innerHTML = marked(text.value, {sanitize: true});
};

// On change event, process text into markdown and render
var changeHandler = function () {
	clearTimeout(debounce);
	debounce = setTimeout(render, 300);
};
```

Then, in addition to setting up an event listener, I call my `render()` function when the page loads to convert any initial text to HTML.

```js
// Listen for changes to textarea
render();
text.addEventListener('input', changeHandler);
```

And with that, the project is done.

## Wrapping up

The finished project is 18 lines of code, with white space and in-code documentation. The Vue demo is 16 lines of code with no space, no documentation, and an extra 60kb of frameworks and libraries.

Obviously this was a very simple project, but hopefully you can see that for a lot of tasks, the vanilla JS versions are just as simple, with far fewer dependencies.