---
title: "Resources for building a JAMStack website or web app"
date: 2020-02-14T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Technology
- Web Performance
---

Yesterday, I wrote about [why the JAMStack is awesome (and a few ways it's not)](/why-the-jamstack-is-awesome-and-a-few-reasons-why-its-not/).

Today, I wanted to share some resources you can use to start building websites with the JAMStack.

## Hosting and Deployment

At it's heart, the JAMStack is about flat (or static) HTML files.

Back in the day, that meant pushing files up to a server using an FTP client. Today, there are some options that make this easier.

Many (most?) JAMStack deployments are built around Git.

- For something _really_ simple you can use [GitHub Pages](https://pages.github.com/). It features integrated SSL, automatically updates when you push new files, and even lets you use custom domains. Oh, and it's free!
- For something _almost_ as simple but far more powerful and feature rich, [Netlify](https://www.netlify.com/) is worth a look. Their service includes free SSL, free deployment to a CDN, and paid features for things like contact forms, serverless functions, and more.
- Roll your own. I use a $5 [DigitalOcean](https://www.digitalocean.com/) droplet, with [ServerPilot](https://serverpilot.io/) to manage stuff for me. [Here's an article on my full setup.](/automating-the-deployment-of-your-static-site-with-hugo-and-github/)

Using a Git-based workflow doesn't mean you need to learn command line, either.

If you use GitHub, they have [a fantastic desktop app](https://desktop.github.com/) that helped me understand how Git actually works behind the scenes.

## Static Site Generators

If you have a big site, the last thing you want to do is hand-code every single HTML file.

Static site generators let you store content in markdown files and mash them up with templates ahead of time. If you enjoy working closer to the actual HTML, they're a lot nicer to design with than something like WordPress is.

There are a lot of options here:

- I use [Hugo](https://gohugo.io/). It's built on Go, and mostly uses HTML files for templating. [Here's a starter project I put together](https://github.com/cferdinandi/hugo-starter) if you want something to play around with while you're learning.
- [Jekyll](https://jekyllrb.com/) has been around forever, and uses Ruby as its templating language. It's a bit slower to compile than newer options, but is very popular and feature rich.
- [11ty](https://www.11ty.dev/) is the new kid on the block. Built by my friend Zach Leatherman, it uses HTML and vanilla JS as its templating system. It's super flexible, and a lot of smart people I know swear by it. Definitely worth a look!
- Another popular option is [Gastby](https://www.gatsbyjs.org/). They use React as a templating engine (but not a client-side framework), so if you're already comfortable with it, that might be a good option, too.

You literally cannot go wrong here. They're all good for differing reasons.

## A CMS

One of the biggest things that's missing from the JAMStack by default is a CMS.

For me, that's a benefit. I very much prefer working in raw markdown and HTMl files. But for many people&mdash;especially people working on teams or folks who aren't as technical&mdash;this can be a barrier to entry though.

Fortunately, there are options here as well.

- On the really simple end of things, you can use GitHub itself as a CMS. You can use [their desktop app](https://desktop.github.com/) or their web interface (which I sometimes do if I need to make an update on my mobile device).
- If you use Netlify, they have [a configurable CMS](https://www.netlifycms.org/) that ties into GitHub's content API to let you manage your markdown files with a GUI. It's pretty neat!
- If you're self-hosting (or even if you use Netlify), [Forestry.io](https://forestry.io/) does the same thing as Netlify CMS, with less configuration needed on your end. I've used this with clients before, and it's pretty good.
- [WordPress as a headless CMS.](https://wordpress.org/) WordPress has [a built in content API](https://developer.wordpress.org/rest-api/). You can use it as a CMS to author content, and then use the API to pull content with your static site generator and pre-render HTML files.

## Making secure API calls

Another challenge with JAMStack is making secure API calls when keys and secrets are involved. You can't include them in your client-facing JavaScript, because someone can steal them.

So, what can you do? [The solution is to create a middleman API.](/keeping-credentials-secure-when-making-api-calls-with-javascript/)

In short, you store your secret credentials on a server. Your JS files call a server-based API, which uses those credentials to make the real API call, and passes that information back to you.

[I use a headless instance of WordPress for this.](/keeping-credentials-secure-when-making-api-calls-with-javascript/) If you're on Netlify, they offer [a feature called Functions](https://docs.netlify.com/functions/overview/) that acts a *server-as-a-service* (it's officially a *serverless* offering, which is dumb, because a server is actually involved).

Cloudflare also has an option for this called [Cloudflare Workers](https://blog.cloudflare.com/introducing-cloudflare-workers/), and it's super cool because it uses vanilla JS instead of Node.

## Scheduling posts ahead of time

I typically write my articles ahead of time and schedule them to go live on a certain day and time.

A publish date is built into all of the static site generators I recommended above. But how do you get JAMStack site to rebuild itself and render the new HTML files when it's time for that post to go live?

The trick here are *hooks* or *triggers* that tell your host to recompile your site at fixed intervals.

Since I host my own site, [I setup something called a *cronjob* to run every hour](/how-to-schedule-posts-with-a-static-website/). Any post whose publish date is before the current time gets built and becomes published.

If you're using Netlify, you can [use GitHub actions and a webhook to trigger a new build on Netlify](https://humanwhocodes.com/blog/2019/10/scheduling-jekyll-posts-netlify-github-actions/) as set intervals.

This is, unfortunately, one feature you'll miss out on if using GitHub Pages for your hosting.

## Anything I missed?

I *love* JAMStack, and want more people to make this switch.

If there's anything I missed, or if you have any questions about anything in this article, reach out and let me know!