---
title: "Javascript framework demos in vanilla JS"
date: 2018-06-01T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Vanilla Framework Demos
---

This week, I learned that [Joe Gregorio](https://bitworking.org/) has this cool project where [he re-implements popular framework sample apps in vanilla JavaScript](https://github.com/jcgregorio/vanillajs).

Inspired by his work, I decided to do something similar.

First up this week: Vue.js.

## Markdown Editor

The [Vue.js Examples page](https://vuejs.org/v2/examples/) includes a markdown editor powered [MarkedJS](https://github.com/markedjs/marked) and [Lodash](https://lodash.com/).

Here's the relevant HTML.

```html
<div id="editor">
	<textarea :value="input" @input="update"></textarea>
	<div v-html="compiledMarkdown"></div>
</div>
```

And here's the JavaScript to make it work.

```js
new Vue({
	el: '#editor',
	data: {
		input: '# hello'
	},
	computed: {
		compiledMarkdown: function () {
			return marked(this.input, { sanitize: true })
		}
	},
	methods: {
		update: _.debounce(function (e) {
			this.input = e.target.value
		}, 300)
	}
});
```

I find the Vue syntax a bit weird to read, but this is short and simple, which is a bit part of the appeal of frameworks like this.

So that's our target. We want to come in at around 15 lines of code (or less).

## Vanilla JS Marked Editor

We're still going to use MarkedJS, because converting markdown to HTML is not a trivial task. But, I think we can write something just as simple without Vue or Lodash.

First, I'm going to tweak the HTML just a touch for simplicity. I'll give both the text editor and compiled markdown container unique IDs. I'm also going to add autofocus to the `textarea`.

```html
<textarea id="editor" autofocus></textarea>
<div id="compiled-markdown"></div>
```

Since we're going to convert our text in real time as we type, let's get the `#compiled-markdown` container from the DOM and store it to a variable for faster reuse.

```js
// Get the compiled markdown container
var compiled = document.querySelector('#compiled-markdown');
```

Next, we want to listen to changes on our `#editor` so that we can update our compiled markdown.

Let's use [event delegation to listen to all `input` events](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/) (which fire when an `input` or `textarea` changes in value), and filter out events that aren't triggered by the `#editor`.

```js
// Get the compiled markdown container
var compiled = document.querySelector('#compiled-markdown');

// Listen for changes to inputs and textareas
document.addEventListener('input', function (event) {

	// Only run if the change happened in the #editor
	if (!event.target.matches('#editor')) return;

}, false);
```

Now, all that's left to do is used MarkedJS to convert our markdown to HTML and inject it into the DOM.

The `event.target` is the `textarea` that triggered the event. We'll pass it's `.value` property into MarkedJS, and use `innerHTML` to update the DOM with the result.

```js
// Get the compiled markdown container
var compiled = document.querySelector('#compiled-markdown');

// Listen for changes to inputs and textareas
document.addEventListener('input', function (event) {

	// Only run if the change happened in the #editor
	if (!event.target.matches('#editor')) return;

	compiled.innerHTML = marked(event.target.value, { sanitize: true });

}, false);
```

And just like that, we have a working markdown editor with two fewer dependencies and four fewer lines of code. And that's *with* white space and comments, which the Vue example doesn't have.

If you strip those out, the vanilla JS version is just five lines of code! Who says vanilla JS has to be more verbose than a framework?

You can [download this on GitHub](https://gist.github.com/cferdinandi/2218858af04d5306904fe57c184fc17a), or [play with it in a browser on JSFiddle](https://jsfiddle.net/cferdinandi/z8qk1fuu/).

<div class="fluid-vids"><iframe width="100%" height="300" src="//jsfiddle.net/cferdinandi/z8qk1fuu/embedded/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe></div>

## What's next?

Do you like this project? Want to see more like it?

If you have an example app built with a framework, and you want to see how it might work with vanilla JS, [send me an email](/about/) and let me know about it!