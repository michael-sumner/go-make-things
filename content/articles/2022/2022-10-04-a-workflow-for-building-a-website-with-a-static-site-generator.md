---
title: A workflow for building a website with a static site generator (or SSG)
date: 2022-10-04T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
- Technology
---

A few months ago, I shared some [tips and tricks for working with static site generators](/tips-and-tricks-for-working-with-static-site-generators/) (or SSGs). It was primarily focused on creating and publishing content, and the mechanics of day-to-day use.

One of the most common questions I've gotten in response to that article is how I actually _build_ a website with an SSG. Specifically, how do I compile and bundle my CSS and JavaScript, and reload the site to test how it looks.

Today, let's talk about that!

## Build tools

I use my [Build Tool Boilerplate](https://github.com/cferdinandi/build-tool-boilerplate) to compile Sass files into CSS and bundle JavaScript modules into a single file. It also handle minification for me.

(_**Aside:** if you want to learn [how to create your own build tools setup](https://vanillajsguides.com/build-tools/), I've got a course all about that._)

When I'm actively doing development, I use that.

Sometimes, I set it up to watch for changes to my Sass and JS files and automatically run a build. But more often, I make a bunch of updates and then manually run `npm run build`. I don't know why I prefer to manually run it, but I just do.

Hugo, my SSG of choice, now includes tools that will [process Sass](https://gohugo.io/hugo-pipes/scss-sass/) and [compile JS files](https://gohugo.io/hugo-pipes/js/), but I run an older version that doesn't do those things. And even if I had a newer version, I prefer the flexibility of running my own system.

[Eleventy](https://www.11ty.dev/), another popular choice, does not currently have any compiling tools baked in.

## Watching for updates

With a static site generator, you will have a folder that you can put _static assets_. These are files that should be copied over as-is.

I tell my build tool to compile all of my files into that directory.

Hugo and Eleventy both have a built-in server you can use to view a local version of your project. They also both have commands you can run to watch for changes in your project and recompile the site.

In Hugo, I run `hugo --watch`. 

Eleventy has a similar `--watch` command, but [requires a bit of configuration](https://www.11ty.dev/docs/watch-serve/) about which files to watch. You might also want to add a delay to Eleventy's build to make sure your CSS and JS finish compiling before it runs.

## That's it, really

Just to recap, I use my own build tool to compile my CSS, JavaScript, and more. 

Then I use my SSG's `--watch` command to detect when the build tool generates new files, and load them into a local server.

There are probably more sophisticated systems, but in my opinion, simpler is better, even if it involves just a touch more manual work on my end.