---
title: "2018 02 01 Migrating From Wordpress to Hugo"
date: 2018-02-01T09:21:31-05:00
draft: false
categories:
- Code
- CSS
- Design &amp; UX
- HTML
- Web Performance
- WordPress
---

A couple of weeks ago, I moved this site over from [WordPress](https://wordpress.org/) to [Hugo](https://gohugo.io/), a static site generator.

I've written a little bit about [why I made the switch](/static-websites/), [how I automated deployment of my site](/automating-the-deployment-of-your-static-site-with-hugo-and-github/), and [how I'm able to automatically publish prescheduled posts](/how-to-schedule-posts-with-a-static-website/) at the right time.

Today, I wanted to talk about something a bunch of people have asked me about: how to actually migrate content from WordPress into Hugo.

## The Overview

Migrating things involved a few steps, some simpler than others.

1. Porting my theme over.
2. Exporting content out of WordPress.
3. Importing content into Hugo.
4. Cleaning up the content to remove "legacy" WordPress cruft.

Let's dig in!

## 1. Porting my theme

The Go Make Things theme was one I hand-coded on top of [Elliot Jay Stocks](http://www.elliotjaystocks.com/) now unmaintained [Starkers theme boilerplate](https://github.com/cliftonc0613/Starkers).

As the name implies, it's a relatively bare theme (no CSS at all) designed to provide a starting point for projects.

I wanted to start fresh with a cleaned up code base on Hugo, so I dug through the [minimal themes](https://themes.gohugo.io/tags/minimal/) from their repository and tried a few, but kept hitting roadblocks.

I instead ended up using the [Ananke theme](https://themes.gohugo.io/gohugo-theme-ananke/) that's used in the Quick Start guide. I ripped out all of the markup, stylesheets, and graphics, and instead used it as a foundation for how to structure templates.

I grabbed the latest version of [Kraken, my front end boilerplate](https://cferdinandi.github.io/kraken/), and recoded my theme. I borrowed some code from the old site along the way as needed, but generally worked off the new code base instead.

## 2. Exporting content out of WordPress

There's a WordPress to [Hugo exporter plugin](https://gohugo.io/tools/migrations/#wordpress), but it doesn't work (others have reported issues as well).

Fortunately, the formatting for Jekyll content is nearly identical, so I used the [Jekyll Exporter plugin](https://wordpress.org/plugins/jekyll-exporter/), which creates a zip file of all of your posts, pages, and custom post types, as well as the contents of your `wp-content/uploads` directory with all of your images and such.

This is the easiest part of the whole process.

## 3. Importing content into Hugo

Some of my content, like my [About page](/about) and the sales pages for my [pocket guides](/guides) and [mini courses](/courses), I manually copy-pasted into new files and cleaned up a bit.

With my blog posts, I just drag-and-dropped the whole set of files into my `/posts` directory in Hugo.

The *front matter* at the top of each post is more or less ready to use in Hugo. I wrote most of my WordPress posts in markdown thanks to the Jetpack plugin, but even if your content uses HTML, that's valid for markdown files, too, so no need to convert anything over.

## 4. Cleaning up the content

This step is optional, but I'm nuts about my content, so...

*__Note:__ This is way easier with a full-featured text editor like Sublime Text or VS Code. If you can, I'd recommend Sublime, which has multiline regex (Code does not).*

The front matter from the Jekyll export includes some stuff that's just not needed in Hugo.

```yml
---
id: 15112
title: Making it easier to select elements with vanilla JavaScript
date: 2017-08-07T09:00:00+00:00
author: Chris Ferdinandi
layout: post
guid: /?p=15112
permalink: /making-it-easier-to-select-elements-with-vanilla-javascript/
categories:
  - Code
  - JavaScript
---
```

Specifically, `id`, `layout`, `guid`, and, in my case, `author` can all go.

In Sublime, you can do a find-and-replace across all files in a directory (command+shift+f on MacOS). I used regex matching, like this: `id: .*`, and included the line break in my search to remove the line entirely from all of my posts.

Under `File` in Sublime, there's also a `Save All` feature that will save you a *ton* of headaches saving all of your changes (I have hundreds of posts from 6 years of regular writing on this site).

While `permalink` is a valid front matter variable, I prefer `url`, so I did a find-and-replace on `permalink: `, replacing it with `url: `.

Other issues: shortcodes in my content. I didn't have a ton, but I had created [a plugin for reusing content](https://github.com/cferdinandi/gmt-reusable-content) across articles (calls to action and things like that). I did a find-and-replace on that as well.

One other issue was WordPress's `[caption]` shortcode. I hadn't used that much and didn't want to both with regex pattern matching on it, so I searched for files using it and manually fixed them.

## How to preserve links to your old images

Rather than *migrating* images into a new structure, I drag-and-dropped the entire `wp-content` directory from my Jekyll Exporter plugin file into the `static` directory in Hugo.

It gets copied as-is into my website root, preserving links to all of my old images. Going forward, I use a new directory structure, but this was the easiest way to keep the old stuff without breaking anything.

I did, however, go through and delete a bunch of duplicate images, PDFs, and other large files. I also ran the entire directory through [ImageOptim](/a-web-based-image-optimizer/) to reduce the overall footprint.

## And that's it!

Theming the new site probably took longer than anything, because I'm not terribly familiar with [GoLang](https://golang.org/) (which powers Hugo's templating features) and had to Google a bunch of stuff.

The actual migration took me about a day, in large part due to some trial and error. Doing it again today, it would take a couple of hours.

In future articles, I'm going to look at how to customize your RSS feed, add search to static websites, and how to generate dynamic content on a static site.

If there's anything else you'd like to learn about, [get in touch](/about) and let me know!