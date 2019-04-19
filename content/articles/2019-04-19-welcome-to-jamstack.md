---
title: "Welcome to JAM stack"
date: 2019-04-19T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Technology
- Web Performance
---

In web development, a "tech stack" is the underlying technologies you use to build your websites or apps.

The most ubiquitous is the LAMP stack, which stands for Linux-Apache-MySQL-PHP. More recently, the MEAN stack has risen in popularity, particularly among JS devs looking to do backend development. It stands for MongoDB-Express-Angular-Node.

But I think a slightly less well known tech stack, the JAM stack, is one of the strongest choices for modern front-end applications and websites.

## What's a JAM stack?

JAM stands for JavaScript-APIs-Markup. The [JAM stack website](https://jamstack.org/) explains...

> Modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.

Practically speaking, that means...

1. You serve static HTML files that are rendered before the user requests them rather than dynamically.
2. You rely on APIs for content instead of databases and dynamic server-rendered markup.
3. When necessary, JavaScript fills the gap, adding interactivity and user-specific dynamic content.

It's worth noting that the order does not reflect importance. JavaScript is the least important part of the stack.

## Is this just a fancy term for Single Page Applications?

Not exactly.

Single page apps are built on the JAM stack, but not all JAM stack sites are single page apps.

Static site generators like [Hugo](https://gohugo.io/) (my tool of choice), [11ty](https://www.11ty.io/), and [Jekyll](https://jekyllrb.com/) can be used to create most of the markup.

They all also have the ability to call APIs and use the content they get back to generate HTML at build time.

For many JAM stack websites, JavaScript adds light weight interactivity and handles content specific to a particular user or that can be added any other way.

## Why should you consider building a site with the JAM stack?

A few reasons...

First, sites built this way are often insanely fast. Since the markup is pre-generated, you're not waiting around for database calls and server rendering. The markup is already there, and gets sent back to the visitor as soon as they visit your URL.

And because there's no need to generate files dynamically on each visit, you can easily distribute your entire site or app on CDN if you want to further improve performance.

Second, they're far less vulnerable than a database-driven site. They can still be compromised, of course, but the surface area that can be attacked is a lot smaller.

There's no database to hack. Someone would need direct access to your markup or one of the services providing your API data.

Also, it's *fun* to build websites this way! Templating is easier. Setting up a local test environment is easier. It's a delight to work with versus some of the other stacks.

## How do I get started?

If this is something you find interesting, I've written [a handful of articles about my migration from WordPress to Hugo](https://gomakethings.com/search/?s=hugo).

Feel free to reach out with any questions.