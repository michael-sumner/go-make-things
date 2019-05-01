---
title: "Building a dependency-free site in 2019"
date: 2019-05-01T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Last month, Michelle Barker wrote about [redoing her website, and trying to build it without dependencies](https://css-irl.info/building-a-dependency-free-site/), using just HTML and CSS (with JS as a progressive enhancement to be added later).

> I didn’t want to spend a whole lot of time configuring a new set of tools for what I intended to be a very simple single-page site. I didn’t plan on using Javascript, although I wouldn’t rule this out down the road (as progressive enhancement). I wanted to get my site built and published as quickly as possible, so that I’d have something to point people to if they want to know what I do. But I also wanted to be able to maintain it relatively easy – add extra speaking engagements, articles and bio updates when the need arises. It was important to me that re-visiting the site a little way down the road wouldn’t require a whole new re-configuration of a complex set of tools – I didn’t want to spend an hour updating dependencies before I could do any actual work. I want my tools to get out of the way so I can concentrate on the things I love: HTML and CSS.

👏👏👏. Hell yes. I can 100% get behind this.

Michelle came to a few of the same conclusion I have whenever I've tried an experiment like this: native CSS is really powerful today, but lacks two awesome features that Sass has&mdash;modular files, and nesting.

I also can't give up my build process, that handles minifying and concatenating my files, optimizing SVGs, and so on. Michelle discovered something really cool that hadn't occurred me: modern text editors can replace all that.

> I use VS Code, and one Twitter user recommended an extension that allows you to [compile Sass to CSS in your editor](https://github.com/wojciechsura/easysass), without a build pipeline. This was a revelation, as I hadn’t really considered it as something my code editor could do before. It reminds me of Codekit, a GUI tool I used a few years ago for compiling Sass, and is certainly something I’ll try out at some point, although I don’t plan on adding Sass to my personal site at this point in time. It’s pretty impressive just how powerful VS Code is becoming. There are some other areas it could help with my development process too...

A lot of people think that vanilla JS&mdash;and the whole "vanilla" philosophy&mdash;is about hand-coding all the things.

But as Michelle's post demonstrates, it's really about simplifying your toolset. I don't want to not use tools. I just want my tools to get out of the way so I can focus on the things I actually care about.

[Go checkout Michelle's whole post.](https://css-irl.info/building-a-dependency-free-site/) There's a lot of good stuff in there.