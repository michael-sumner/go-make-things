---
title: The transitional web
date: 2022-10-21T10:30:00-04:00
draft: false
categories:
- Accessibility
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

I believe the web is a state of transition.

The web is always changing, of course. It's a core part of how the platform works.

What I mean is that we're at the start of another _wave of change_ in our industry, where old trends and best practices give way to something new.

Let's explore that today.

## The Bloated Web

About four years ago, I started [giving a talk on the Lean Web](https://leanweb.dev/), a set of principles for building a faster, simpler world-wide web.

In it, I discussed the fragile house of cards that modern best practices promote: JS frameworks, lots of third-party dependencies, and using JavaScript for everything (even CSS).

We moved the fastest and most resilient parts of the stack (HTML and CSS) into the most fragile (JavaScript), and made building and maintaining things exponentially more complicated as well.

## The Rise and Fall of JS Frameworks

Large UI frameworks like Vue and React have dominated front-end development for years. But over the last few years, we've seen a crop of smaller libraries that do the same thing... faster and better with less code. 

[Preact](https://preactjs.com/) is one-tenth the size of React, with the same API and better rendering performance. [SolidJS](https://www.solidjs.com/) uses similar patterns, again with faster performance than React. Last year, Vue creator Evan You made [petite-vue](https://github.com/vuejs/petite-vue), a 6kb spinoff of Vue with a more narrowly focused use case.

Then, people started remembering/rediscovering that server rendered HTML was good, actually.

Big libraries like React and Vue got meta-libraries that let them run server-side. People started combining static site generators with progressively enhanced JS interactivity instead of doing everything in JS. Tools like [11ty](https://www.11ty.dev/) helped make that easier.

Last year at Jamstack Conf, [Rich Harris gave a talk on _transitional apps_](https://www.youtube.com/watch?v=860d8usGC0o) built using _compilers_.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/860d8usGC0o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Using tools like [Svelte](https://svelte.dev/) (which Rich built and maintains) and [Astro](https://astro.js.org/), developers can build sites using state-based UI, and _compile_ that code into mostly static HTML, with some vanilla JS sprinkled on top as needed.

## Transitional tools

These newer tools help move us from large, over-engineered JS code-bases to something faster, more resilient, and more user friendly.

But I don't see these tools as _the next big thing_.

Instead, I think they represent transitional tools that will help us bridge the gap from where we are today to what comes next.

For years, jQuery was _the_ way to write JavaScript for the web. Native browser methods were clunky, cross-browser support was bad, and a lot of things that are really simple now were absurdly hard to do (like adding or removing classes). jQuery made that easier.

**And then the browser started catching up.**

We got `querySelector()` and `querySelectorAll()`. We got the `classList` API. We got methods like `append()` and `before()` and `after()` and `remove()`.

Suddenly, a lot of the things we used to need jQuery for were baked into the platform. That extra 30kb didn't seem like it was worth it anymore. 

But the platform still didn't do _everything_ that jQuery did. And so, we started seeing small libraries that covered the gaps, like [UmbrellaJS](https://umbrellajs.com/) and [Shoestring](https://github.com/filamentgroup/shoestring).

They weren't designed to last forever. They were built to get us from here to there.

## The rise of the platform

I believe that a lot of the tools we're seeing today are transitional tools, like UmbrellaJS and Shoestring were, that will help transition us from big JS libraries to platform native features.

There's already an API in the works for [adding animations between page transitions](https://css-tricks.com/shared-element-transitions/), a common SPA use-case. There's another one in the works for [sanitizing HTML before rendering it](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API).

I'd love to see native APIs for diffing the DOM, and more easily maintaining state between pages.

I'm not entirely sure what the future of the platform looks like, but I feel pretty confident that the tools we're using today are paving the cow paths for what comes next.