---
title: What framework should I use?
date: 2023-02-22T10:30:00-04:00
draft: false
categories:
- Accessibility
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Yesterday, I wrote about how awful React is for web performance. One of my readers wrote to ask me...

> You don't recommend React as an front end framework? What do you recommend?

The answer is just a little nuanced (but not very), based on your goals and priorities.

I'm privileged enough to choose the stack I use. I'm an experienced developer with a social safety net. I fully recognize that not everyone has those same options.

**If you're top priority is paid employment,** right now, React is a great choice for that. I _really_ hope the industry starts moving in another direction, and [I see early signs that it's starting to](/the-transitional-web/). But there are so many jobs looking for React experience, it's the obvious choice if you need to get hired, and quickly.

**If your priority is long-term resilience and maintainability,** vanilla JS (probably with a light build process on top of it) is the ideal choice.

It will never become obsolete, or suffer from a breaking version change. It's fast and performant, results in less code sent over the wire, and generally has a smaller footprint of things to break.

It _does_ sometimes require a bit more wiring of things together for the developer, but often it's actually less work (and less work in the long term) than using a library.

**If you need a client-side UI library,** [Preact](https://preactjs.com/) is orders-of-magnitude faster than React with the same API, and an obvious choice. I think [Vue](https://vuejs.org/) has a nicer syntax, and while it's a lot bigger, version 3 is much more performant than React.

**If you want the benefits of a UI library with the performance of vanilla JS,** a compiled framework like [Hugo](https://gohugo.io/), [11ty](https://www.11ty.dev/), [Svelte](https://svelte.dev/), or [Astro](https://astro.js.org/) give you a JS library authoring experience with the performance wins of mostly HTML and a little JS.