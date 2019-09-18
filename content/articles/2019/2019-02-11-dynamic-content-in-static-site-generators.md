---
title: "Dynamic content in static site generators"
date: 2019-02-11T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

I've written a few times about [my love of static site generators](/static-websites/), and [my move away from WordPress to Hugo](/migrating-from-wordpress-to-hugo/).

Static site generators are powered by something called the *JAM Stack*, an acronym for JavaScript, APIs, and Markup.

The static site generator is the *markup* part of the JAM Stack. You feed it templates and markdown files, and it spits out flat HTML files that result in a super fast experience for your users.

Dynamic content is often powered by JavaScript and APIs. For example, I've written about [how you can use a little vanilla JS to add search to your static site](/how-to-create-a-vanilla-js-search-page-for-a-static-website/).

*But...* there's also a way to add dynamic, API-driven features to a static website *without* JavaScript.

## Why is that a good thing?

In a word: resilience ([shout out to Jeremy Keith](https://resilientwebdesign.com/)).

Client-side JavaScript has a lot of ways to fail. Server-side code can still fail, but the environment is a lot more predictable, controlled, and stable.

It also removes the "flash of content" that happens after a JS file loads and generates content client-side after the page itself has already been rendered. And, because you're baking that content directly into the HTML, it reduces API calls and overall server load.

## How it works

Today's major static site generators all include the ability to generate content from *JSON data files*. They also provide functions you can use to fetch content from an API and use with this feature.

Hugo (my static site generator of choice) provides [the `getJSON` function](https://gohugo.io/templates/data-templates/#data-driven-content). Jekyll has [a third-party plugin, `jekyll_get`](https://github.com/18F/jekyll-get).

And because 11ty is Node-based, you can [use GraphQL](https://www.11ty.io/docs/data-js/) or [fetch](https://www.11ty.io/docs/quicktips/eliminate-js/).

## See it in action

I use this approach on my sites. I have an API that serves up my calls-to-action and testimonials so that I can update them in a single place. Hugo fetches the data and bakes the content directly into the HTML.