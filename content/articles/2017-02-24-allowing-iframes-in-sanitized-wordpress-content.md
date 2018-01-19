---
categories:
- Code
- WordPress
date: '2017-02-24'
permalink: /allowing-iframes-in-sanitized-wordpress-content/
title: Allowing iFrames in sanitized WordPress content
url: /2017/02/24/allowing-iframes-in-sanitized-wordpress-content
---

I recently discovered that `wp_kses`&mdash;a function that keeps malicious code out of the database&mdash;was stripping out my YouTube and Vimeo embeds in a [custom metabox](https://gomakethings.com/how-to-add-custom-fields-to-posts-and-pages-in-wordpress/) I had created.

Fortunately, WordPress provides [a filter you can use to add additional allowed tags](https://codex.wordpress.org/Function_Reference/wp_kses_allowed_html).

For something like videos that are likely to end up in your content, it's better to include this sort of thing in a plugin so that you don't lose your content if you change themes.

So, I created one. You can [grab Allow iFrames on GitHub](https://github.com/cferdinandi/gmt-allow-iframes).