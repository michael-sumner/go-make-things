---
title: "Static sites and CMS's"
date: 2019-04-22T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Technology
- Web Performance
---

On Friday, I wrote about [the JAM stack, and why I love static websites](/welcome-to-jam-stack/) so much.

One question I get a lot when I bring up static sites is what I use for a CMS. Let's dig into that quick today.

## The no-CMS option

For my own person sites, I don't use a CMS at all.

I write articles in markdown in my sites git repository, push to GitHub, and a web hook triggers [a build script I wrote that creates a fresh copy of the site](/automating-the-deployment-of-your-static-site-with-hugo-and-github/) and moves it to my live directory on the server.

If you use [Netlify](https://www.netlify.com/), they actually automate this for you so you don't even have to think about a build script.

I also have [a cron job that handles scheduled posts](/how-to-schedule-posts-with-a-static-website/) for me.

I'm a developer, so this process works great for me. But if you like GUIs, or if you're building a site for a client, that's not always an option.

## Static Site GUIs

Fortunately, you can still provide a GUI/CMS interface with static websites.

Instead of talking to a database like a traditional CMS might, they use APIs to get and save content directly to your Git repository, *without* the user having to know how to commit and push files and all that messiness.

For self-hosted sites, I'm a big fan of [Forestry](https://forestry.io/). If you're using Netlify, they offer [a pretty nice CMS](https://www.netlifycms.org/), too.

Both can be configured with the types of content allowed, custom "metadata" to gets added to the front matter of your files, and so on.