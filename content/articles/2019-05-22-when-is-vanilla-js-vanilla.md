---
title: "When is vanilla JS vanilla?"
date: 2019-05-22T10:30:00-04:00
draft: false
categories:g
- Code
- JavaScript
---

A common misconception about vanilla JS is that it means always writing your code 100% from scratch. That it shuns tools for "doing things the hard way." That it avoids abstractions at all costs.

This is not true.

I regularly use third-party code and abstractions in my projects. I still consider them vanilla JS.

So, what makes JS vanilla or not? The line is fuzzy, and, honestly, varies from project-to-project. It's a bit of an "I know it when I see it" kind of situation.

I think there are some things that are obviously *not* vanilla:

- Frameworks like Angular, React, and Vue
- Big libraries like Lodash, Underscore, and jQuery

And there are some things that squarely *are* vanilla:

- [Native browser methods and APIs](https://vanillajstoolkit.com/reference/)
- [Polyfills](https://vanillajstoolkit.com/polyfills/)

But there's also a whole ocean of things that *somewhere in the middle*.

- Micro-frameworks like [Reef](https://github.com/cferdinandi/reef), [hyperHTML](https://viperhtml.js.org/hyperhtml/documentation/), and [Svelte](http://svelte.dev/)
- [Dependency-free plugins](https://vanillajstoolkit.com/plugins/) like [Dinero](https://sarahdayan.github.io/dinero.js/)
- [Helper functions](https://vanillajstoolkit.com/helpers/)
- Single-purpose libraries like [Day.js](https://github.com/xx45/dayjs)

Whether any of things are *vanilla* or not is very subjective. I typically think they are. Some people disagree.

**To me, vanilla JS is an approach and a mindset more than a technical specification.** It means...

- Using what the browser gives you for as much as possible
- Abstracting with small, dependency-free, purpose-built tools instead of boil-the-ocean frameworks and libraries
- Picking tools that are as tiny and lightweight as possible

 I hate advocating for something with such a fuzzy definition, but I don't think it's realistic or pragmatic to say "never use any tools ever."

 I don't do that, and I wouldn't expect you to, either.