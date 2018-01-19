---
categories:
- Accessibility
- Code
date: '2014-11-17'
permalink: /keel-wordpress-theme-boilerplate-enhancements/
title: 'Keel: WordPress Theme Boilerplate Enhancements'
url: /2014/11/17/keel-wordpress-theme-boilerplate-enhancements
---

[Keel](https://github.com/cferdinandi/keel), my lightweight boilerplate for WordPress theme developers, got a handful of useful updates last week.

<!--more-->

## Including files

At the recommendation of [Dan Biel](https://twitter.com/add_action_dan), all scripts and styles are now included from the `functions.php` file. This makes managing your CSS and JavaScript easier because you can view it all in one spot. No more toggling between multiple files.

I also added hooks that let you inline snippets of CSS and JS. This is particularly useful for feature detection or if you're doing [critical rendering path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/) enhancements.

## Utility Methods

Keel also picked up a bunch of new utility methods:

* You can now customize the length of `the_excerpt()`, and adjust the "read more" text.
* There's a temporary fix for some [overzealous CSS injection by Jetpack](https://github.com/Automattic/jetpack/issues/1258).
* There's an option (off by default) to disable loop pagination and display all posts on a single page.
* There's an (also off by default) option to disable `wpautop`, which adds paragraphs and line breaks automatically to your content.
* The `wp_list_comments()` method in `comments.php` now let's you specify all comments types, just comments, just trackbacks, etc.

## Accessibility

This is specific to integration with [Kraken](http://cferdinandi.github.io/kraken/), but I added a `.screen-reader-focusable` class to the skip nav link for better accessibility.

[Get Keel on GitHub.](https://github.com/cferdinandi/keel)