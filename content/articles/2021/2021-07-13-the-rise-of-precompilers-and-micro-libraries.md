---
title: "The rise of JavaScript compilers and micro-libraries"
date: 2021-07-13T10:30:00-04:00
draft: false
categories:
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
---

For the last few years, big client-side libraries (often called _frameworks_ even though technically they're not) have completely dominated the modern web.

And as [I've spoken about](/talks) and [written about](https://leanweb.dev) countless times, all of this client side JS is creating a web that's slow and fragile and broken and shitty. I hate it.

Which is why I'm utterly delighted by a recent and growing trend I'm started to see: the rise of JS compilers and micro-libraries. Let's dig in.

## What are micro-libraries?

The trend, as far as I can tell, started with [Preact](https://preactjs.com/).

Preact is a 3kb alternative to React that uses the same API with way less code (and a few less features). Preact isn't just smaller than React. [It's about 4x faster to render on a state update than React is, too.](/just-how-much-faster-is-vanilla-js-than-frameworks/)

And Jason Miller, the guy who built it, claims [a render-engine update he's working on results in optimizations that are up to 3x faster than Preact's current renderer](https://twitter.com/_developit/status/1412451442946981890), and even faster than the way people would generally hand-write vanilla JS. That's awesome!

There's also [AlpineJS](https://alpinejs.dev/), inspired by VueJS. It's gotten a big heavier in the last year, weighing in at 12kb. But it inspired Evan You, the guy who made Vue, to recently create [Petite Vue](https://www.npmjs.com/package/petite-vue), a "5.5kb subset of Vue optimized for progressive enhancement."

And most recently, there's [SolidJS](https://www.solidjs.com/), another reactive state-based micro-library that claims to be nearly as fast as vanilla JS in render performance, with a similar API to libraries like React and Preact.

If you need state-based UI, it's _really_ hard to argue that React would be a better choice than Preact (or another micro-library). They're smaller, load faster, and actually render faster, too.

But there's another trend that I think is even more exciting.

## JavaScript Compilers

A few years ago, [Rich Harris realized that while state-based reactivity can be a good thing, handling it all with a mountain of client-side JavaScript is not](https://www.youtube.com/watch?v=AdNJ3fydeao).

[Svelte](https://svelte.dev/), Rich's creation, is a JavaScript compiler.

It lets you create reactive, state-based components, just like you would with Vue or React. But instead of shipping them as-is to the browser, you run a compiler than spits out plain old HTML and some vanilla JS that does the same kind of manual DOM manipulation you would do if you _weren't_ using a framework.

This gives you the best of both worlds, in a way. You can write state-based UI (if that's your thing), but you can serve old-school DOM manipulation to the end-user for a faster experience.

(_Rich recently started working on [SvelteKit](https://kit.svelte.dev/), an extension of Svelte that adds routing._)

Building on Rich's idea, [Astro](https://astro.build/) is a new compiler that works the same way, but lets you pull in components from all of your favorite JS libraries.

Let's say you have a drop-down menu component you want to use from React, and a card component from Vue that you like. You also have a Svelte file you started working on. You're not going to ship two libraries to the browser. That's absurd!

Astro lets you take all of those, as well as plain old JavaScript and HTML, mash them together, and spit out pre-rendered HTML, CSS, and vanilla JavaScript.

Of all of these, Astro is probably the one I'm most excited about. It's definitely "standing on the shoulders of giants," and I think it has the most potential to reduce the fragility and performance issues modern web development has brought to the web.

If you want to learn more about Astro, [Cassie Evans has a fantastic intro on the Netlify blog](https://www.netlify.com/blog/2021/07/08/build-wicked-fast-sites-with-astro-an-introduction/).

## Do you need to learn any of these?

Honestly, no. I still build web apps the old fashioned way, with HTML, CSS, and browser-native JavaScript.

But if you're working on a team or in a corporate environment, they're likely going to want to use a state-based library for some stuff. Having some familiarity with these newer options can help you nudge your team towards a more user-friendly choice while still allowing them to use the tools they're already comfortable with.