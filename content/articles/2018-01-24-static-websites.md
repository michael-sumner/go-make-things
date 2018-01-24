---
title: "Static Websites"
date: 2018-01-24T09:49:04-05:00
draft: false
categories:
- Accessibility
- Art &amp; Science
- Business &amp; Leadership
- Careers
- Code
- CSS
- Design &amp; UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
---

My site has been powered by WordPress for almost a decade. Over the weekend, I moved my site over to static HTML files powered by [Hugo](https://gohugo.io/).

My site was instantly 2-3 times faster. Writing is fun again. Web development is fun again.

Today, I want to talk a little bit about why I made the move. I'll be covering some of the details in separate posts.

## Your CMS is bloated.

I've been [a WordPress ~~apologist~~ supporter](https://gomakethings.com/the-new-hotness/) for a long time.

A lot of the bad performance of WordPress sites is caused by poorly written plugins and some default behaviors of the CMS. These can be worked around.

I made a habit of disabling JS files that plugins were loading on pages where they weren't used, and forcing JavaScript to get loaded in the footer so it wouldn't block rendering.

I installed a plugin that pre-compiled HTML from my database and templates so that visitors wouldn't have to wait for them to get created on fly with each visit. I ended up writing a lot of my own plugins to avoid the cruft of what was available already.

**And then I hit a breaking point.**

Writing was taking forever. The WordPress dashboard had become unbearably slow. Every new plugin required another hack to remove unneeded files and maintain front end web performance.

**I got tired of fighting the CMS defaults.**

## The beauty of HTML

Static site generators like [Hugo](https://gohugo.io/), [Jekyll](https://jekyllrb.com/), and new kid on the block [Eleventy](https://11ty.io/) take a collection of content (usually in markdown files) and mash them up with template files, just like a traditional CMS would.

But, unlike your traditional CMS, they do it ahead of time. You upload your simple HTML files to the server, and that's what gets loaded.

You get the benefits of using a traditional CMS, with the simplicity and speed of static HTML.

## Things that are difficult in WordPress as so easy in Hugo

I used a lot of [custom post types in WordPress](https://codex.wordpress.org/Post_Types).

Setting them up involves passing in a bunch of options through multiple PHP functions, ideally added via a plugin. Then I'd need to create a PHP template for the post type layout, and make sure that any content was routed through the right template in my theme (it doesn't happen automatically).

In Hugo, I create a folder named after the content type (for example, `/talks`), and add my content to it. If I want a custom template for it, I add one to the `/layouts/talks` folder. That's it! Hugo just figures it out.

In WordPress, adding additional metadata and options to a post or page involved, again, multiple functions, calls to the database, sanitization to keep malicious code out, and so on.

In Hugo, I add a key/value pair to the head of my content file, like this: `talkLocation: "Boston, MA"`. I can then access that in my template by using `.Params.talkLocation`. So simple!

I'm no longer fighting the conventions of the CMS, or bad decisions made by plugin developers. If I want to load a JS file, I just add a `<script>` element.

It's web development in its purest form.

## Challengs and things I was worried about

With WordPress, I made heavy use of scheduled posts. I'd write them ahead of time and WP would post them automatically at a set time. I was worried about losing that.

Then [Zach Leatherman](https://www.zachleat.com/web/) taught me that you can actually let the server handle that for you with a static site generator, too.

I didn't want to have to push files up via FTP all the time. You can automate that, too.

I had a bunch of custom PHP stuff I was doing. I now have the option of still doing that, just outside of the WordPress environment (and thus faster), or using some simple third-party APIs and services instead.

I'll cover all of this in detail in future articles, but so far, it's been all upside. I'm not looking back.