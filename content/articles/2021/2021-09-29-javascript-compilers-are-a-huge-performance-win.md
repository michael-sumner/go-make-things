---
title: JavaScript compilers are a huge web performance win
date: 2021-09-29T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Over the summer, I wrote about [the rise of JavaScript compilers and micro-libraries](/the-rise-of-javascript-compilers-and-micro-libraries/).

> [Svelte](https://svelte.dev/), Rich’s creation, is a JavaScript compiler.
>
> It lets you create reactive, state-based components, just like you would with Vue or React. But instead of shipping them as-is to the browser, you run a compiler than spits out plain old HTML and some vanilla JS that does the same kind of manual DOM manipulation you would do if you weren’t using a framework.
>
> This gives you the best of both worlds, in a way. You can write state-based UI (if that’s your thing), but you can serve old-school DOM manipulation to the end-user for a faster experience.

Later in the article, I also mention [Astro](https://astro.build/), another compiler that also lets you pull in components from your favorite client-side libraries.

This week, [Jason Lengstorf from Netlify shared his experience working with Astro](https://twitter.com/jlengstorf/status/1442707241627385860).

> I just ported a Next.js site to @astrodotbuild, used 90% of the same component code, and ended up with HUGE improvements

Jason managed to reduce the amount of client-side JS by 90 percent, and increased page load time by 30 percent. Big wins all around, both in terms of resilience and performance.

These tools are looking more and more interesting.