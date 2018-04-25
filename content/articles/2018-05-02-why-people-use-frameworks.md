---
title: "Why people use JavaScript and CSS frameworks (and how we can fix that)"
date: 2018-05-02T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- Design and UX
- JavaScript
---

[Nicole Sullivan](http://www.stubbornella.org/) is an amazing developer who has had a huge influence on how I build for the web.

She invented [Object Oriented CSS](https://github.com/stubbornella/oocss/wiki), upon which BEM, SMACSS, Atomic Design, Utility-Class First, and all of your other favorite CSS design systems are built on.

Last week she tweeted:

> vanilla js vs framework (yeah, I’m going there): y’all make good points on both sides but I see you missing one in particular.
>
> Frameworks like @reactjs provide patterns and conventions that are desperately needed so every decision doesn’t start from, wheee! We could do anything! They lower cognitive overhead.

And she's 100% right.

## The problem with loosely-structured languages

The lack of strict conventions and patterns is one of the biggest hurdles to many languages, not just JS.

PHP has this problem, and WordPress's well-documented standards and conventions make it easier to get going and work consistently.

CSS has this problem. That's in part why Bootstrap and Foundation are so popular. They provide much needed structure to an endless set of options.

Nicole goes on to say,

> Sure, you could write all your own conventions, and document them (have there ever been truly good internal docs?), and teach them to all new devs who won’t have any context. But, you’d probably have written something as big as a framework at that point.

And this is where I humbly disagree with her.

## The choice isn't between a framework and nothing at all

The two options here are not "use a JavaScript framework" or "write something bespoke", just like the two options in CSS aren't "use a CSS framework" or "write something bespoke."

This is why OOCSS (and BEM, and Atomic Design, and so on) are also so popular.

They provide a much needed structure to our CSS. There's no one approach used on every project, but there are a set of conventions you can apply to a project to enforce that consistency.

We have some semblances of that in JavaScript (functional programming, for example, or OO Programming), but nothing quite as well structured or specific as what's available for CSS.

And maybe that's what we really need more than another over-engineered framework.