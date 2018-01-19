---
categories:
- Accessibility
- Code
- JavaScript
date: '2017-07-10'
title: Why I love polyfills
---

A polyfill is <a href="https://remysharp.com/2010/10/08/what-is-a-polyfill">a term coined by Remy Sharp</a> for a snippet of code that adds support for a feature to browsers that don't offer it natively.

Polyfills can be polarizing.

Many web developers who came up in the age of the web as an application platform (rather than  a document sharing platform) aren't fans of polyfills. They add weight to the code base, and can't people just update their browser anyways? It's free.

<h2>Here's the thing: the web is for everyone.</h2>

No, like, literally everyone.

Corporate users stuck on IE8 because of some shitty legacy homegrown software that won't run on anything newer. People with older versions of Windows that won't run anything past IE9 and who can't afford to upgrade. Mobile-only users on hand-me-down Blackberries.

This is a fundamental part of why I love the web. It's for everyone.

And so that means that if there's a polyfill that let's me extend support for a feature back to more users, I will.

<h2>Doesn't that add code bloat?</h2>

A little. But honestly, not that much.

Most polyfills are pretty small, especially after you minify and gzip them. Even a good handful of them are certainly smaller than today's most popular frameworks and libraries.

If you're writing vanilla JavaScript, they have no perceivable impact on performance. A few extra KBs of data for huge wins in compatibility.

<h2>The real beauty, though, is that polyfills are meant to be deleted.</h2>

By their very nature, they're temporary.

A helper function is permanent. It becomes part of the code base, deeply woven into various areas of your script.

A polyfill only extends native features. When support is better, you delete them, and your code base otherwise remains untouched.