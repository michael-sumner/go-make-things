---
categories:
- Code
date: '2013-09-04'
permalink: /markdown-for-wordpress/
title: Markdown for WordPress
url: /2013/09/04/markdown-for-wordpress
---

There are numerous Markdown for WordPress plugins (over 200 at the time of writing), and I've always steered away from them for one reason: If I ever decide I don't want to use Markdown anymore, I'll be left with a bunch of jibberish in my posts.

<p>Last week, I discovered a plugin in that changed all that.
<!--more--></p>

<h2>Markdown on Save</h2>

<a href="https://github.com/markjaquith/markdown-on-save">Markdown on Save by Mark Jaquith</a> is amazingly simple. It uses the undocumented <code>post_content_filtered</code> database column to store your Markdown. On save, it converts your content to HTML and saves it in the regular <code>post_content</code> field.

If you ever remove the plugin, all of your content is already saved in regular HTML, right where it should be. And because it's converted ahead of time, there's no latency on the front-end like you might experience with some other plugins.

If you love writing in Markdown like I do, go <a href="https://github.com/markjaquith/markdown-on-save">grab this plugin</a> right now.