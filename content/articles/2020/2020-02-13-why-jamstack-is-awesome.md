---
title: "Why the JAMStack is awesome (and a few reasons why its not)"
date: 2020-02-13T10:30:00-05:00
draft: false
categories:
- Careers
- Code
- HTML
- JavaScript
- Technology
- Web Performance
---

Last week, [Nicole Sullivan replied](https://twitter.com/stubbornella/status/1226365361722773508) to a "what's your contrarian opinion" tweet with:

> JAMStack is 99.9% branding and .1% substance. 😳😆

So... Nicole is awesome! [She created OOCSS.](https://www.slideshare.net/stubbornella/object-oriented-css) She's an amazing developer.

But I think she's wrong about the JAMStack.

## What's the JAMStack?

In web development, your *stack* is the combination of technologies you use to build and deliver files to browsers.

*LAMP* stands for *Linux, Apache, MySQL, and PHP*. *MEAN* stands for *Mongo, Express, Angular, and Node*.

And *JAMStack* stands for *JavaScript, APIs, and Markup*.

## Order doesn't indicate importance

One common misconception about JAMStack is that, because it leads with JavaScript, it's all about frameworks and single-page apps. While SPAs are JAMStack sites, not all JAMStack sites are SPAs.

**JavaScript is not the most important part of the JAMSStack. Markup is.**

What makes a JAMStack site JAMStack is that there's no database involved. You're not serving dynamically rendered HTML. You're serving static, flat HTML files that existed on the server before your browser ever made a request for them.

## What about the rest of the stack?

APIs can be used to add content to your JAMStack site.

Sometimes that content is loaded with JavaScript. Sometimes, it's pulled ahead of time, when the HTML file is created.

Some people use *Static Site Generators* (or SSGs) to give them a templating system that pulls content from markdown files. SSGs can often pull API data and render it directly into the HTML, cutting JavaScript out of the process entirely.

JavaScript bridges the gap when dynamic or user-specific content is needed.

## Why JAMStack is awesome

Because there's no database to query and no files to generate, JAMStack sites are *fast*.

Your browser requests an HTML file from the server, and gets one back almost instantly. Flat HTML files are also much easier to cache on a CDN, making them even faster.

Removing the database also means there's no database to hack, so JAMStack sites can be much easier to keep secure.

And without expensive database queries to run every time someone requests an HTML file, the overall computational needs for your site go way down as well. Huge spikes in traffic don't break your site.

I run about a dozen sites, some of them relatively high-traffic, from a single $5 DigitalOcean droplet.

(*This also dramatically reduces the environmental impact of the things we build.*)

## JAMStack *is* a little bit marketing hype

JAMStack is really just a fancy way of describing "the way we all used to build websites." Nicole's not wrong about the marketing hype aspect of it.

But that doesn't mean there's no substance there.

The rise of static site generators, serverless (another empty buzzword), and services like GitHub and Netlify mean that building and managing sites built like this is way easier than it was a decade ago.

Database-driven sites made doing things that were hard with flat HTML a lot easier. And modern JAMStack tools make doing with flat HTML files the things that database-driven sites do easier.

## Some things that suck about JAMStack

It's not all roses. A few things that kind of suck about JAMStack:

- The lack of a database and server-rendered content means API calls that require secure credentials are a challenge.
- Static-site generators don't include a CMS, presenting a barrier to entry for some people.
- Deploying updates, scheduling posts ahead of time, and triggering periodic rebuilds of your content, requires a comfort working with server configurations.

Those issues are real, and make JAMStack a bad choice for some people.

But for me, JAMStack is *way* more than hype. It's dramatically transformed how I build for the web for the better.

Tomorrow, I'm going to share some resources to help you get started if the JAMStack is somethings you're interested in exploring.