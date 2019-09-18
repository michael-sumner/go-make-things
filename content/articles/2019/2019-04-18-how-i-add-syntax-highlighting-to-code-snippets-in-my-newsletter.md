---
title: "How I add syntax highlighting to code snippets in my newsletter"
date: 2019-04-18T10:30:00-04:00
draft: false
categories:
- Business and Leadership
- Code
- CSS
- HTML
- JavaScript
- Technology
---

One question I'm asked a fair bit is how I add syntax highlighting to code snippets in my newsletter.

I'll let you in on a little secret: I cheat.

## Static Site Generators FTW!

Because I write a new article every weekday, I've optimized my workflow for laziness. Any friction in the process would prevent me from doing this on a regular basis.

Fortunately, [Hugo](https://gohugo.io/), my static site generator of choice, makes all of this really easy.

I used to use [PrismJS](https://prismjs.com/), the fantastic JavaScript-based syntax highlighter from Lea Verou. But Hugo comes with a syntax highlighter baked in, and adds the required wrapping markup directly into the HTML that's sent from the server.

I added [CSS to match the default Prism theme](https://gist.github.com/cferdinandi/f0782200a9c33ce1d0a433da55252b71) as closely as possible.

That's step one.

## RSS => Email

All of my newsletter articles start out as blog posts on my website.

I use [Mailchimp](https://mailchimp.com/)'s RSS-to-Email feature to grab that day's blog post markup and send it as a newsletter.

Instead of using one of their default themes, I use [my own barebones theme](https://gist.github.com/cferdinandi/f7ddcb845ac0e35453e6416b2f074cdb). It's *almost* entirely plain text, but adds that same CSS from above for syntax highlighting. Since the required markup is baked straight into the HTML, the code snippets come over highlighted.

Almost everything else falls back to the email client defaults.