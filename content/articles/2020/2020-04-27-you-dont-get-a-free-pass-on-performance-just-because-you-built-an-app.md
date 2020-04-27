---
title: "You don't get a free pass on web performance just because you built an app"
date: 2020-04-27T10:30:00-04:00
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

Last week, I shared [Tim Kadlec's awesome analysis of the impact of JavaScript frameworks on performance](https://timkadlec.com/remembers/2020-04-21-the-cost-of-javascript-frameworks/).

In it, Tim clearly shows with data from [the HTTP Archive](https://httparchive.org/) that sites that use frameworks generally include a lot more JavaScript than sites that don't, and are also slower on key web performance metrics.

He concludes with some simple, reasonable things to consider when building for the web:

> - Do a sanity check: do you really need to use it? Vanilla JavaScript can do a lot today.
> - Is there a lighter alternative (Preact, Svelte, etc.) that gets you 90% of the way there?
> - If you’re going with a framework, does anything exist that provides better, more opinionated defaults (ex: Nuxt.js instead of Vue.js, Next.js instead of React, etc.)?

There was a lot of praise for Tim's article. But unsurprisingly, there was some pushback from the "we build apps, not websites" crowd.

## Apps aren't held to a different standard

The main point of contention:

> Apps are different. Performance is still important, but web performance metrics need to be different/slower/worse for web apps than a "static website."

I get it.

Making complex web apps performant is hard. Making them _as performant_ as a static website is even harder (some might say impossible, but like most things, it depends).

But a user's frustration and annoyance and tendency to just leave and never come back doesn't suddenly lessen because you've built an "app" and not a "website."

Your convenience as a developer isn't more important than your users' ability to access your app on low bandwidth internet connections and older, underpowered devices.

## Time to interactive > fully loaded

Your app should be interactive in three seconds or less on a broadband connection, and five seconds or less on 3g.

**That _doesn't mean_ it has to be fully featured.**

It just means that people need to be able to start moving around and interacting with content. Perceived performance is more important than "this thing is fully loaded."

It's a bit like being stuck in bumper-to-bumper traffic versus moving slowly on side roads. Even if it takes you longer to get there with side roads, it's _less frustrating_ to be moving than at a total stop.

## How can you make web apps faster?

There are a lot of different approaches you can take, depending on your app and what it's supposed to do.

- You could load the never-changing stuff like your logo and navigation menu immediately, and asynchronously pull in dynamic or API-driven content once it arrives (for example, dashboard content).
- You cache API data in `localStorage` to minimize API calls (and the latency they introduce).
- You can push your API data out through a CDN network so that responses take less time (because they originate from closer to where the visitor is).
- You create a progressive web app that loads some content from a cache, even if the user is offline. You could, for example, load data from their last visit on initial load, and refresh it with fresh data as soon as an API call returns the new stuff.
- You can follow Tim's recommendations, and use vanilla JS instead of frameworks, or lighter weight alternatives like [Reef](https://reefjs.com) or Preact.
- You can [use a CSS strategy that results in smaller stylesheets](https://maintainablecss.com/).
- You can [inline your CSS and JavaScript](/inlining-literally-everything-for-better-performance/) (if your files are small enough) to reduce the number of HTTP requests required to start rendering the app.
- You can break your JavaScript up into more modular chunks and only load what's needed on any given page.

I'm not saying its always easy. But that's not the point. Building a complex web app isn't easy either.

I'm saying _it's your job as a web professional_ to build fast, accessible things that work for as many people as possible.

Just because you built "an app" doesn't mean you get a free pass on web performance.