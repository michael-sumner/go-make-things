---
title: "Alternatives to CSS-in-JS"
date: 2018-04-27T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Yesterday, I talked about [what I think is wrong with CSS-in-JS](/whats-wrong-with-css-in-js/). Today, I wanted to offer up an alternative.

## The Lean Web and the Boring Web

The Lean Web and the Boring Web are not the same thing, but they often work in tandem.

The Lean Web means building sites and apps that are lightweight, fast, and focused on the user experience and user needs over bloated technology that prioritizes developers.

The Boring Web is about using simple, resilient technologies over the fancy new hotness just because it's trendy.

Most of my recommendations fall squarely within both of these realms.

## A single CSS file, loaded in the header

I love *writing* modular CSS using Sass files and `@import`, but I load just a single file in the header.

My CSS files tend to be quite small (more on that in a minute), but if they're on the bigger side, I'll [inline my critical path CSS and asynchronously load the rest](/inlining-critical-css-for-better-web-performance/).

About 14kb of data is sent in a single HTTP request. I use that as the cutoff for my minified and gzipped CSS file when deciding whether or not to inline the critical path CSS.

I don't conditionally load CSS based on which components are used on the page. I keep my stylesheet as lean as possible, use far future headers to benefit from browser caching, and enjoy *time-to-first-usable-content* times that are below 1 second.

### OOCSS

I'm a big fan of [Nicole Sullivan's Object Oriented CSS approach](https://github.com/stubbornella/oocss/wiki).

I make heavy user of utility classes to nudge and tweak the DOM and keep my stylesheet small. For example, my headings elements typically have a top padding and bottom margin.

```css
h1, h2, h3, h4, h5, h6 {
	margin-bottom: 1em;
	padding-top: 1em;
}

h1 {
	padding-top: 0.5em;
}
```

But on my individual articles, I don't want my headings to have top padding so that the date can site closer to the heading. I *could* write a component for that.

```css
.articles h1 {
	padding-top: 0;
}
```

But there's a good chance there are other areas in my site I'll want to remove the `padding-top`, too. So instead, I use a utility class.

```css
.no-padding-top {
	padding-top: 0;
}
```

And I can write my markup like this.

```html
<span>July 4, 2018</span>
<h1 class="no-padding-top">Happy Independence Day!</h1>
```

I have utilities for font sizes, colors, margin and padding... all sorts of things. They let me nudge and tweak my UI in consistent and predictable ways while keeping my code more DRY.

### BEM-light

Sometimes you *do* need a component, though, and for that, I'll use a simplified version of [BEM](http://getbem.com/).

```css
.btn {
	/* Primary button styles */
}

.btn-secondary {
	/* Modifies primary button styles */
}

.btn-large {
	/* Adjusts button size */
}
```

And my HTML looks like this.

```html
<button class="btn">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-large">Large Primary Button</button>
<button class="btn btn-secondary btn-large">Large Secondary Button</button>
```

## Handling JavaScript Components

I don't use modules or imports. I don't use package bundlers. I don't install a ton of scripts from NPM.

I'm not saying you should reinvent the wheel or not benefit from the work of others, but our obsession with libraries, tools, and NPM packages is a bit part of why the web is so bloated and slow today.

So here's how I work:

1. I write most of my own code in [vanilla JS](/resources/).
2. I download [some third party plugins](https://vanillajstoolkit.com/plugins/) as compiled JS files.
3. I put them all in a directory, and use [Gulp](https://gulpjs.com/) (though [Prepos](https://prepros.io/) or [CodeKit](https://codekitapp.com/) would work, too) to combine them into one file and minify them.
4. I load that file in my site or app.

Nothing fancy. Just a JavaScript file.

## What about dependency management?

I work pretty much exclusively with vanilla JavaScript.

I'm not using frameworks, and I choose plugins and helpers that don't depend on other libraries or frameworks, too. I never need to install something like jQuery or lodash for my code to work.

**Generally, the only dependency I have is browser support for some native JS methods and browser APIs.**

How I handle those depends on the site or app and the role JavaScript plays in how it works.

### If JavaScript enhances server-rendered HTML

Most of my sites and apps work without JavaScript.

Server side rendering and old-fashioned submits handle all of the heavy lifting. JavaScript adds some nice interactivity that *enhances* the site, but it's not required for the app to work.

In these type of setup, I'll use something called ["cutting the mustard," a technique pioneered by the BBC](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard).

I check to see if the most cutting edge of the JS methods and browser APIs I use are supported, and if and only if they are, I load my script using [`loadJS()` from the Filament Group](https://github.com/filamentgroup/loadJS).

```html
<script>
	function loadJS () {
		// The loadJS contents are inlined here...
	}
	if ('querySelector' in document && 'localStorage' in window) {
		loadJS('path/to/my/main.js');
	}
</script>
```

If I have some particularly large and rarely used JavaScript, I might conditionally load that separately. For example, if I had a checkout script that I only needed when the `#checkout` form was present, I would do this...

```html
<script>
	function loadJS () {
		// The loadJS contents are inlined here...
	}
	if ('querySelector' in document && 'localStorage' in window) {
		loadJS('path/to/my/main.js');
		if (document.querySelector('#checkout')) {
			loadJS('path/to/checkout.js');
		}
	}
</script>
```

If I'm using a couple of methods or browser APIs that have limited browser support, I'll [include polyfills for them](https://vanillajstoolkit.com/polyfills/) right in my main JavaScript.

### If the site or app requires JavaScript to work

I do sometimes build sites or apps that need JavaScript for their core functionality.

In those cases, I do three things:

1. Use [placeholder content](/adding-placeholder-content-to-your-javascript-web-app/) to make the perceived loading time faster.
2. Include [polyfill.io](https://polyfill.io) to push browser compatibility back as far as possible.
3. Load my JavaScript in an old fashioned `script` element.

```html
<!-- Placeholder Content -->
<div class="placeholder placeholder-hero"></div>
<div class="placeholder placeholder-sentence"></div>
<div class="placeholder placeholder-sentence"></div>

<!-- Scripts -->
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
<script src="path/to/my/main.js"></script>
```

Polyfill.io is my only dependency, and it's technically not even a dependency because it's only polyfilling browsers without native support. The code runs without it on modern browsers.

## This approach makes me a ~~dinosaur~~ rebel

My approach to front end engineering (I use "engineering" here because we're talking about the structure and loading strategy, not just the code) is, to some, old fashioned.

I use `link` and `script` elements to load my CSS and JavaScript. I'm not using frameworks or large libraries. I have no dependencies. I'm not doing any complicated bundling or package management.

It's 100% Boring Web.

**But... it also makes my websites fast as hell and way more fault-tolerant.**

I don't have to worry about a failed or missed dependency breaking my code. I worry less about browser timeouts on my files, because they're small and cached. I don't have to mess around with complicated build and load processes.

I can open a text editor and build an app.

A lean, boring web is better for users. And, I'd argue, it's better for you as a developer.