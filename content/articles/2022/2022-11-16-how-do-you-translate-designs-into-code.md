---
title: How do you translate designs into code?
date: 2022-11-16T10:30:00-04:00
draft: false
categories:
- Accessibility
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Whether you're a designer learning to code, or a developer working with a designer, at some point, you'll need to translate a design into working code.

Today, we're going to look at how to do that. Let's dig in!

## This is just, like, my opinion

This is my personal approach to converting designs into functional sites and web apps.

It may be different from yours or other devs you've worked with, and that's OK. One of my favorite things about programming is that you can approach the same problem multiple ways.

If something I do makes your life easier, use it. If not, do whatever works for you.

## Start with HTML

The first thing I do on any site or web app I'm building is create unstyled, unscripted HTML.

This will change iteratively as I work. Certain layouts might require wrapper elements around them. Certain interactive patterns might require special elements or attributes.

The idea is to get the content&mdash;the most important part of the site&mdash;into an HTML file so that I can start layering in [or _progressively enhancing_ it](/progressive-enhancement-the-new-hotness/) with style and interactivity.

```html
<nav>
	<a href="/">Merlin's Magic Shop</a>

	<ul>
		<li><a href="/potions">Potions</a></li>
		<li><a href="/spells">Spells</a></li>
		<li><a href="/wands">Wands</a></li>
	</ul>
</nav>

<h1>Merlin's Magic Shop</h1>
<p>Your one-stop shop for all of your magical needs.</p>
```

At this point, my focus is on semantic HTML that makes sense for the kind of content that's within it.

My navigation menu is wrapped in a `nav` element. The individual navigation items are part of an unordered list (`ul`). I have a single `h1` heading on the page. That sort of thing.

[Estelle Wehl has a free foundational course on HTML](https://web.dev/learn/html/) that's fantastic.

## Add style with CSS

Once I have my content in place, I start nudging and pushing things around to make them look the way I want.

I personally find it helpful to start with my _layout_ or grid. I [mix-and-match CSS Grid and flexbox](/css-grid-vs.-flexbox-for-layout/) in my designs.

Grid is great when I want content to conform to a specific layout. Flexbox is a better choice when I want the layout to _flex_ to accommodate the content.

[Every Layout](https://every-layout.dev/) from Andy Bell and Heydon Pickering is a great resource to learn about different layouts. I also use [Sarah Drasner's CSS Grid Generator](https://cssgrid-generator.netlify.app/) as a starting point for many of my designs, or copy/paste some snippets from [Stephanie Eckle's Smol CSS toolkit](https://smolcss.dev/).

Once the grid is in place, I focus on all the other things: typography, color, alignment, and so on. 

My approach to CSS is similar to [Andy Bell's CUBE CSS](https://cube.fyi/), though a bit more informal. If you need a good foundational course, [the Web.dev team has a really good one available for free](https://web.dev/learn/css/).

This part of my process often requires me to go back into my HTML and add some wrapper elements (for layout purposes, for example), or add classes and data attributes to things that I can hook into for styling.

## Add interactivity with JavaScript

Not every design needs this, but for sites or web apps that need some client-side interactivity, the last thing I do is layer in my JavaScript.

I'm a big fan of [data attributes as JavaScript selectors](/javascript-selector-strategy/), so I often have to add those to my HTML.

For example, imagine a `form` that users can submit to join an email list.

```html
<h2>Merlin's Magical Newsletter</h2>
<p>Get the latest updates on my magical products. Enter your email below.</p>

<form action="/api/subscribe" method="post">
	<label for="email">Your email address</label>
	<input type="email" name="email" id="email">

	<button>Join the List</button>
</form>
```

The form can submit with a server request, but I've been asked to add some JavaScript to make it work without leaving the page.

The first thing I'd do is add a `[data-form]` attribute. I'll often include a unique form identifier as the value.

```html
<form action="/api/subscribe" method="post" data-form="subscribe">
	<!-- ... -->
</form>
```

In my JavaScript, I can now use the `[data-form]` attribute to hook into the form.

```js
// I could grab the specific form like this
let subscribe = document.querySelector('[data-form="subscribe"]');

// Or I could use event delegation, like this
document.addEventListener('submit', function (event) {

	// Get the form type
	let type = event.target.getAttribute('data-form');

	// ...

});
```

## It's an iterative process

While I like to work in steps, you've probably noticed that the process is iterative.

Once I start styling with CSS, I still need to tweak and adjust my HTML. When I add JavaScript, I modify my HTML again.