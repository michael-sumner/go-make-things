---
title: "What's wrong with CSS-in-JS?"
date: 2018-04-26T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Yesterday, the wonderful [Remy Sharp tweeted](https://twitter.com/rem/status/989069638553231360):

> I *keep* looking at CSS in JS (styled components et al), and the one thing they keep seeming to lack is: *why*. (and no, "CSS is hard/stressful/etc" isn't a why, because those all apply to JS too).

I weighed in on the discussion, and unleashed a torrent of replies in my mentions. The three common threads that kept coming up:

1. Global namespacing in CSS sucks.
2. It's hard to remove unused stuff later.
3. But components!

Today, I want to talk about why I think CSS-in-JS is bad for the web, and how to address some of the legitimate problems it tries to solve.

## Why use CSS-in-JS?

[Christopher Chedeau](http://blog.vjeux.com/), aka Vjeux, is a front-end developer at Facebook.

He's part of the React team and helped bring the amazing [Prettier](https://prettier.io/) JavaScript formatter into the mainstream. He's *really* good at JavaScript.

He's also [the creator of the CSS-in-JS movement](https://speakerdeck.com/vjeux/react-css-in-js), and someone shared his presentation on why you'd want to use it with me.

<script async class="speakerdeck-embed" data-id="2e15908049bb013230960224c1b4b8bd" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

> Problems with CSS at scale:
>
> 1. Global Namespace
> 2. Dependencies
> 3. Dead Code Elimination
> 4. Minification
> 5. Sharing Constants
> 6. Non-Deterministic Resolution
> 7. Isolation

I don't want this to be a mudslinging thing, but I am going to pick apart Vjeux's arguments a bit in today's post. I won't tackle all seven of his problems, but will focus on the ones I hear talked about most often.

I'd love to hear from folks who think I'm wrong or missed something.

## tl;dr

The general vibe I get from both Vjeux's presentation and people I've talked with this about on Twitter is: JavaScript is awesome and CSS sucks, so let's make CSS more like JS.

While I have no doubt that these people know how to write CSS, I don't think they really *get* CSS as a language.

The things that many JS developers hate about CSS are the same things that make it so powerful. Let's explore.

## 1. The Global Namespace

> It is really crazy to me that the best practices in CSS is still to use global variables. We learned in JS for a long time that globals are bad. Yet, we still use global variables everywhere in CSS. <cite>Vjeux</cite>

CSS is not a programming language, and you can't think about it the same way you'd think about JavaScript variables and the possible collisions that can happen there.

**The global namespace is a feature, not a bug.** The cascade is a feature, not a bug.

These two features allow you to write less code and create files that are a lot smaller and more performance&mdash;if you know how to take advantage of it.

My favorite way to handle this is using [Nicole Sullivan's Object Oriented CSS technique](https://github.com/stubbornella/oocss/wiki).

Let's say I have a some styles for headings.

```css
h1, h2, h3, h4, h5, h6 {
	font-weight: bold;
}

h1 {
	font-size: 2em;
}

h2 {
	font-size: 1.5em;
}

h3 {
	font-size: 1.2em;
}

h4, h5, h6 {
	font-size: 1em;
}
```

I occasionally have hero sections and other callouts, and I want to use a bigger, bolder heading in those sections. You *could* do something like this:

```css
.callout h1,
.hero h1 {
	font-size: 3em;
}
```

But what happens if the callout happens further down on a page and shouldn't be an `h1`? Now I need styles for various use cases.

```css
.callout h1,
.callout h2,
.callout h3,
.callout h4,
.callout h5,
.callout h6,
.hero h1,
.hero h2,
.hero h3,
.hero h4,
.hero h5,
.hero h6 {
	font-size: 3em;
}
```

*Or...* I could use a simple utility class.

```css
.hero-text {
	font-size: 3em;
}
```

Classes have more specificity than elements, so the `.hero-text` class takes priority and the `font-size` will be `3em`.

When I switched over from a component-based styling approach to a utility-class first approach, I reduced my stylesheet size by more than half.

> For example Bootstrap introduces a whooping 600 global variables :( <cite>Vjeux</cite>

Bootstrap abuses specificity in its approach to selectors, but this stat in-and-of-itself is not inherently bad or good. 600 small utility classes for little nudges and tweaks could result in a super lean, super performant stylesheet if done right!

## 2. Dependencies

> We're past the way where we can bundle our CSS into a single file and have to split it into many files and therefore deal with dependencies. <cite>Vjeux</cite>

Why?

**I'm going to speculate here: the stylesheet is huge and it's a performance issue to load it all at once.**

If you understand the cascade and embrace global namespacing, you can dramatically reduce your stylesheet size. Sometimes, larger stylesheets are unavoidable.

For that, you can [inline your critical path CSS and asyncronously load the rest](/inlining-critical-css-for-better-web-performance/). You can also automate what goes into the critical CSS file using some build tool plugins, if you want.

And with one stylesheet to load, you no longer have to worry about dependency management.

Of course, working with modular files can be more convenient for developers. And Sass makes that super easy. You don't even have to use any of it's feature. I started using Sass myself *just* for the modularity and some light variable support.

Smaller, modular files can be a performance boost on new browsers and devices that support HTTP2. But for older browsers and devices&mdash;the ones that need every performance boost they can get&mdash;it's actually worse for performance to do this.

## 3. Dead Code Elimination

What happens when you have code that's no longer used?

This is a real problem, and comes up on Twitter as a defense for CSS-in-JS a lot.

But using CSS-in-JS for this is throwing technology at what is fundamentally a people problem. Remove a component from JS or your markup? Remove the CSS, too.

If you're working with utility classes, that may not even be necessary. And if you're using an approach like BEM, you remove that component from your styles, just like you would in the JS.

Working with modular Sass files makes this even easier. Just comment out that `@import`.

## 4. Minification

> One side benefit is that we can minify all the class names and send both the JS and CSS a bit faster to users. This also ensures that all the developers are using cx [Facebook's tool for this] since they cannot guess that name. :) <cite>Vjeux</cite>

The approach Vjeux advocates results in class names like `._f8z`.

I know he views this is a good thing, because it forces people to use a build tool. But from my perspective, it creates a higher bar for beginner's to get started and makes debugging a hell of a lot harder. Now you have to hunt for obscure class names that don't match what you wrote.

The amount of file size savings&mdash;particularly after gzipping&mdash;is trivial. You should still minify your CSS, but that doesn't mean reducing class names to absurd, random strings that mean nothing.

Yes, we do that in JavaScript. But CSS doesn't have the same parse and render weight that JavaScript does. The performance implications are different.

## To be continued...

Today I focused on exploring some of the key points in Vjeux's presentation and where he and I differ in our thinking about front end engineering.

He's an amazing developer with some really clever approaches to things, and I hope this is viewed as "two passionate professionals disagreeing" than as a personal attack or anything. I think it's clear he and I both have a deep love for the web.

Tomorrow, I'm going to share some additional thoughts around CSS-in-JS more generally, and more clearly summarize my preferred approach to building for the web.

And if you think I missed the mark in any way, I'd love to hear from you.