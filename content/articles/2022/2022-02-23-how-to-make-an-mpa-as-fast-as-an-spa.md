---
title: How to make MPAs that are as fast as SPAs
date: 2022-02-23T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Web Performance
---

Yesterday, I wrote about how [SPAs were a mistake](/spas-were-a-mistake/). Today, I want to talk about how you can build multi-page apps (or, you know, regular websites) that are as fast as SPAs.

Let's dig in!

## A quick summary

The sites and apps I build are absurdly fast. They load nearly instantly. 

Even on spotty 3G connections on the other side of the world, where many of my students live, things still load really quickly (like, 3 seconds or less fast). And I do it from cheap, shared, $5 a month hosting.

Here's a quick high-level summary of what I do...

1. Serve pre-rendered, mostly static HTML.
2. Inline everything, including CSS and JavaScript.
3. Use mostly platform-native JavaScript, and as little of it as possible.
4. Minify and gzip all the things.
5. Lean heavily on service workers.

Lets take a closer look at each of these.

## Serve pre-rendered, mostly static HTML

All of my sites are powered by [Hugo, a static-site generator](/series/hugo-and-static-site-generators/).

When you request any page from any of my sites, or from the courses portal that students have access to, my cheap, shared, $5-a-month server grabs an already-rendered HTML file and immediately sends it back.

With the exception of the course portal, all of the content is already there, hard-coded into the page and ready to get displayed by your browser. It reduces the server response time dramatically, because the server barely has to do any work.

With dynamically generated sites (powered by WordPress, PHP, Node, and so on), content from a database gets mashed together with template files in real time. 

Caching can help a lot with this, but flat HTML files are just so absurdly fast.

## Inline everything, including CSS and JavaScript

Severs respond to HTTP requests in 14kb chunks. 

If you have, for example, a 250kb image, 18 small packets of data will be sent one-at-a-time for it: 17 packets 14kb in size, plus one not-quite-12kb one.

Each HTTP request adds a bit of latency to the rendering process, as browsers and servers do a little handshake dance with each other.

Because my HTML, CSS, and JavaScript are all so small (more on that shortly), their combined weight is often under 14kb. Inlining everything into a single HTML file instead of using external CSS and JavaScript files means that everything the browser needs to start rendering gets sent in a single HTTP request.

This dramatically reduces the _time to first render_ for my sites.

You request a page, you get back a single HTTP request, and the browser goes off and does its thing. [Here's a bit more detail about how I implement this.](/inlining-literally-everything-for-better-performance/)

## Use mostly platform-native JavaScript, and as little of it as possible

One of the ways I keep my combined HTML + CSS + JavaScript size so damn small is by using mostly platform-native JavaScript.

The lack of dependencies means less code to ship and load in the browser. Over time, as modern JS and CSS have gotten more powerful, that footprint has gotten even smaller.

I used to use a JS plugin for animating scrolling to anchor links. [CSS handles that with one line of code now.](/smooth-scrolling-links-with-only-css/) I used to use a library for responsive iframe embeds. [Modern CSS does the same thing in just three lines of code.](/responsive-iframes-with-the-css-aspect-ratio-property/)

[I use ES modules to create tiny bundles of JS](https://vanillajsguides.com/es-modules/) that I can load only on the pages that need them. Modules let me reuse shared snippets across pages _without_ having to copy/paste/repeat, which would be an unmaintainable nightmare.

## Minify and gzip all the things

I tend to be very generous with [inline documentation in my code](/documenting-javascript/).

It's really helpful when I go back and look at some code I wrote a while ago to have a bunch of comments explaining what it does and why it does it. But all of those comments add a bunch of weight.

I [minify all of the code](/do-you-need-build-tools/) that gets shipped in production. A third-party tools removes all of the comments and white space, and converts my verbose, easy-to-understand variable names into short one-letter versions that only robots understand.

This reduces file size by 30 percent or more!

I also [have my server configured to gzip all-the-things](/wtf-is-gzipping-and-how-is-it-different-from-minification/). The `.gzip` format is a compressed file format, a lot like `.zip`. It reduces the size of your files by, on average, 70 percent.

The combination of minification and gzipping is what results in all of my HTML files being under 14kb.

## Lean heavily on service workers

[Service workers are like magic pixie dust](https://vanillajsguides.com/service-workers/) on the sites I build.

For my static websites, they add resilience. I cache HTML pages as the user browses. If they ever lose their connection, the cached pages are sent from the service worker instead of the network, so they can still use and access the site.

I also cache my custom fonts, and any images, and always load those from the service worker cache, removing a bunch of network calls in the process. These assets load instantly after they're cached.

The student portal, where learners access their [courses](https://vanillajsguides.com) and [workshops](https://vanillajsacademy.com), is dynamically rendered with JavaScript. I make an API call to get their purchases, and render the content they have access to into the UI.

Service workers cache those API calls for a short period of time, and load API responses from cache instead of the network.

After that initial API call, all subsequent page loads are instant, just like a SPA would be! No, seriously. [Here's a video I took of me navigating through the portal.](https://vimeo.com/680472206/85dab4e10d)

<iframe src="https://player.vimeo.com/video/680472206?h=85dab4e10d" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

And, if the user loses their connection, the API call is cached and they can continue to use the site while offline!

## MPAs FTW!

Using a traditional "just load separate HTML files" approach to web development instead of using SPAs has allowed me to dramatically reduce the complexity of my development process, and provide a better and more resilient experience to my users.

It's a no-brainer win-win solution. I'd love to see a shift back to MPAs become the norm in our industry again!