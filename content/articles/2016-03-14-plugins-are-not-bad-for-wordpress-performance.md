---
categories:
- Code
- Web Performance
- WordPress
date: '2016-03-14'
permalink: /plugins-are-not-bad-for-wordpress-performance/
title: Plugins are not bad for WordPress performance
url: /2016/03/14/plugins-are-not-bad-for-wordpress-performance
---

One often repeated piece of advice I see for improving web performance is to minimize the number of plugins you use.

Plugins, conventional wisdom says, increase the load on your server and database and slow down your site. Hell, it's [even in the WordPress Codex](https://codex.wordpress.org/WordPress_Optimization/WordPress_Performance).

It's also 100% wrong.

<!--more-->

## Plugins are not the problem

Plugins are not bad for performance. Badly written plugins are.

[The Harvard Business School's Digital Initiatives website](https://digital.hbs.edu) runs more than 20 plugins. So does this site. [PAWS New England](http://pawsnewengland.com) has almost 30 plugins.

They all start rendering content in around 1 second (slightly more on initial load and under that on subsequent page views).

**Properly written plugins should have a minimal or nonexistent impact on your site's performance.**

## What makes a plugin good (or bad)?

Bad plugins...

- Load multiple JavaScript and CSS files instead of a single, concatenated file for each.
- Use unminified JavaScript and CSS (partially WordPress' fault since the Codex requires you to include them).
- Load JavaScript in the header where it blocks rendering.
- Load JavaScript and CSS files on pages where it's not needed or used.
- Run a new database query and recreate "The Loop" instead of modifying the original query (to, for example, display every single post on one page or only display events that haven't happened yet for a custom post type like "Events").

Good plugins...

- Load exactly one JavaScript file and one CSS file, and only load them on the pages where they're needed or used.
- Load JavaScript in the footer.
- Modify the query before it happens to avoid multiple database calls.

## How do you know if a plugin is good or not?

Honestly, it's **really** hard to figure this out. I've found the process so frustrating that I end up writing a lot of my own instead of using third-party stuff.