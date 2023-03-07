---
title: HTML over the wire
date: 2023-03-07T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Recently, reader [Andrew Chan](https://www.linkedin.com/in/ajchan/) wrote to me to say (shared with permission)...

> I'd love to hear your thoughts on the future of html over the wire and SSR apps

**The tl;dr:** I think sending more HTML and less JavaScript is always a good thing. It's really at the core of what I teach.

I also think SSR (Static Site Rendering) apps are amazing! I run my entire business with [Hugo](/series/hugo-and-static-site-generators/). If I were starting today, I'd likely do the same thing with [11ty](https://www.11ty.dev/).

My love stops with "HTML over the wire," though.

"HTML over the wire" is some silly branding nonsense from the right wing chuds at ~~37signals~~ ~~Basecamp~~ 37signals for a series of JS libraries they built that help them with progressive enhancement.

They hype it up as some revolutionary new approach to building for the web, when really it's just doing what HTTP does by default, and what performance evangelists have been advocating for for years.

Like so many tools, what they've built trades one set of complexity for another. It's not easier or less prone to breaking. It's just _different_ than using React and NextJS.

I'm more more inclined to grab an SSR and sprinkle in some simple DOM manipulation, or reach for [a tool like Astro or Svelte](/javascript-compilers-are-a-huge-web-performance-win/).