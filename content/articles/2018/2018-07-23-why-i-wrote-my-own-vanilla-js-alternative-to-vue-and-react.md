---
title: "Why I wrote my own vanilla JS alternative to Vue and React"
date: 2018-07-23T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Last week, I hacked together [Reef.js](https://github.com/cferdinandi/reef), a simple, lightweight alternative to React, Vue, and other bloated frameworks.

Today, I wanted to talk about why I created it and how to use it. Tomorrow, I'll dig into how it actually works under the hood.

## I like simplicity.

I find React confusing. It has a lot of moving parts and custom methods.

I like Vue's simplicity&mdash;create a template, attach some data, and render&mdash;but don't like how it mixes JS into the DOM with custom `v-` attributes that do things like loop through items and run conditionals. I'd rather that stuff happen in my JavaScript.

Both React and Vue are pretty large at around 30kb minified and gzipped, and lock you in with a maze of proprietary methods.

I don't want to mess around command line. I don't want to transpile my code. I don't want to use weird custom DOM attributes.

I just want to write clean markup, simple JavaScript, and build cool stuff.

## Reef does less. That's a good thing.

Reef is an anti-framework. It does a lot less than the big guys like React and Vue.

1. It doesn't have a Virtual DOM.
2. It doesn't automagically update the UI when state changes.
3. It doesn't provide a bunch of custom methods.

Reef does just one thing: render UI.

And as a result, it's just 2kb minified and gzipped. You get a lot of punch in those 2kb, though!

- Simple templating with JavaScript strings or template literals.
- Load it with a humble `script` tag&mdash;no command line or transpiling required.
- It updates only the parts of the DOM that have changed. Keep those form fields in focus!
- You can work with native JavaScript methods and browser APIs instead of flavor-of-the-month framework methods.

Couldn't you just use some template strings and `innerHTML`? Sure. But Reef sanitizes your data before rendering to [minimize the risk of XSS scripting attacks](/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/). It also only updates things that have changed instead clobbering the DOM and removing focus from your form fields.

If you're craving a more simple, back-to-basics web development experience, Reef is for you.

(*And if not, that's cool too! Carry on.*)

## How Reef.js works

Reef.js is used to create templates, attach data to them, and then use that data to render them into the DOM. You can update the data (or state), and update the template in the DOM to match.

For example, [here's a clock that updates once a second](http://jsfiddle.net/cferdinandi/7o5zydvL/5/).

```html
<div id="app"></div>
```

```js
// Setup the component
var app = new Reef('#app', {
	data: {
		time: new Date().toLocaleTimeString()
	},
	template: function (props) {
		return '<strong>The time is:</strong> ' + props.time;
	}
});

// Render the component
app.render();

// Update the clock once a second
window.setInterval(function () {
	app.data.time = new Date().toLocaleTimeString();
	app.render();
}, 1000);
```

## Using Reef.js

If Reef.js sounds interesting, [check out the docs on GitHub](https://github.com/cferdinandi/reef).

I added a quick start guide, some demos you can play around with, and a liberal MIT license so that you can use it on your projects. Let me know if you have any questions!