---
categories:
- Design &amp; UX
date: '2014-04-09'
url: /better-markdown-for-wordpress/
title: Better Markdown for WordPress
---

Back in September I wrote about the <a href="https://gomakethings.com/markdown-for-wordpress/">Markdown on Save plugin by Mark Jaquith</a>. The plugin is still awesome, but there's a few things about that I wish were done differently.

Last week I switched to <a href="http://jetpack.me/support/markdown/">Markdown through Jetpack</a>, and I highly recommend it.

<!--more-->

<h2>About Markdown on Save</h2>

What makes Markdown on Save so awesome is that it uses the undocumented <code>post_content_filtered</code> database column to store your markdown. On save, it converts your content to HTML and saves it in the regular <code>post_content field</code>.

If you ever remove the plugin, all of your content is already saved in regular HTML, right where it should be. And because it’s converted ahead of time, there’s no latency on the front-end like you might experience with some other plugins.

What always bugged me was that it required you to choose markdown as your writing format every single time. There was no way to make that the default, which is silly, because you can use markup in markdown. There's no downside to making it the default.

Markdown on Save also hides the editor shortcuts, and only applies to posts, not comments.

<h2>Markdown in Jetpack</h2>

<a href="http://jetpack.me">Jetpack</a>, the uber-plugin from Automattic, includes an optional markdown extension. It works exactly the same way as Markdown on Save, so if you ever remove it, your left with valid HTML. You can also apply it to comments, which makes it a lot easier for visitors to share links, code and more.

The one downside for me is Jetpack itself. Jetpack does a <em>lot</em> of stuff, and most of it is turned on by default. Many of the default features are, from my perspective, site bloat&mdash;stuff like social sharing buttons and script heavy graphic treatments.

I would prefer to see those off by default, or even better, as standalone plugins that you can install and uninstall via Jetpack.

Jetpack also forces you to connect your site with WordPress.com, even if you're not going to use any features that make that require that to function. Why not make that a requirement only when needed?

All that said, the plugin is worth it for markdown support alone. <a href="http://jetpack.me/support/markdown/">Check it out.</a>