---
title: 'Why "plugin" is technically inaccurate (but still the right word for vanilla JS components)'
date: 2018-08-30T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I'm not sure if jQuery invented the concept of a JavaScript plugin, but [they sure as hell popularized it](https://plugins.jquery.com/).

A JavaScript plugin is a bit of code that extends functionality, usually of a library or framework.

As jQuery's popularity soared, so did the rise of jQuery plugins. Today, you can find plugins for [Vue](https://vuejs.org/v2/guide/plugins.html) and [React](https://hackernoon.com/23-best-react-ui-component-libraries-and-frameworks-250a81b2ac42) (where they're called *component libraries*)

But there's also [a ton of vanilla JS plugins](https://github.com/search?q=vanilla+js+plugin). And calling them that upsets technical purists.

## What's wrong with calling them *plugins*?

Last week, [Twitter user .gz tweeted](https://twitter.com/gzpunkt/status/1033688692257423360):

> Lately I've found too many people using the expressions "Pure JavaScript Plugin" or "VanillaJS Plugin". It makes me architecturally sad.
>
> It makes no sense. 100% of the times it refers to a "library", "component", "widget", or similar thing. It doesn't plug into anything, it doesn't extend or customize any existing program. It is a thing _on_its_own_.

And in the literal sense, he's right.

A jQuery plugin is a plugin because it *extends* jQuery. A Vue plugin is a plugin because it *plugs into* Vue to add more functionality.

Vanilla JS plugins aren't hooking into anything, right? I'm not so sure.

## Vanilla JS plugins *are* really plugins.

Sure, they're not extending a library or framework.

But they are *plugging into* native JS methods and browser APIs and adding new functionality to an existing platform.

I don't think the underlying architecture matters. What's the difference? A jQuery plugin has one extra layer of abstraction between the plugin and the browser. Is that semantically important?

And even if you ignore all that, calling it a vanilla JS component a *plugin* provides a clear, established mental model about what the thing is for many developers.

A widget? Not so much. A component? Sounds like a UI thing. A library? Sounds like a big thing you build an entire site on top of, not a little feature enhancer.

Like it or not, *plugin* is the most easily understood term for what these things are.