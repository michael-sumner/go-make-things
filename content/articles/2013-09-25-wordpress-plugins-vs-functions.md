---
categories:
- Design &amp; UX
date: '2013-09-25'
permalink: /wordpress-plugins-vs-functions/
title: 'WordPress: Plugins vs. Functions'
url: /2013/09/25/wordpress-plugins-vs-functions
---

My goal in building toolkits like <a href="http://cferdinandi.github.io/kraken-for-wordpress/">Kraken for WordPress</a>, <a href="http://cferdinandi.github.io/web-app-starter-kit/index.html">WordPress for Web Apps</a>, and <a href="http://cferdinandi.github.io/petfinder-api-for-wordpress/">Petfinder for WordPress</a> is to create tools that developers can use to make awesome stuff with WordPress.

<p>Lately, I've been considering whether these tools are more appropriate as functions or as theme-specific plugins.
<!--more--></p>

<h2>Two Approaches to Development</h2>

There are two ways to add custom functionality to WordPress.

<ol>
<li>The <code>functions.php</code> file.</li>
<li>Plugins.</li>
</ol>

Both have their advantages and disadvantages.

<h3><code>functions.php</code></h3>

Up to this point, this has been my preferred approach.

To keep things modular, each function has it's own file. I activate the functions by requiring them in the <code>functions.php</code> file:

<pre><code class="language-php">require_once( get_template_directory() . 'file-name.php' );</code></pre>

I develop locally using <a href="http://www.mamp.info/">MAMP</a>. By including all of my custom functions in the <code>functions.php</code> file, all I need to do is upload the theme to the server when I'm ready to go live.

So why would I want to use plugins instead?

<h3>Plugins</h3>

Plugins provide portability. Because they're separate from the theme, the functionality remains even when the theme changes.

If you're building a web app, you want a front-end login screen and sign-up form not matter what theme you're using. If you're an animal rescue, you always want to display a list of your dogs.

Putting those in <code>functions.php</code> requires you add them to whatever theme you choose. Keeping the functionality in a plugin means you can swap themes freely.

So plugins are the obvious solution, right?

<h2>Functions or Plugins?</h2>

If you're including a lot of custom functionality (and develop locally), plugins can make the deployment process a fair bit more cumbersome.

They're also a potential breaking point for your client. What happens if they inadvertently deactivate or remove a plugin? And if you or your client do switch themes, the content will remain, but the styling may be very incompatible with your new theme.

<h2>Built for Developers</h2>

These aren't plug-and-play solutions. They're intended for people who want to dig into the code and build custom solutions for themselves and their clients.

If you're the type of person (or client) who's investing in custom development, you're probably not going to be switching out themes every year with something from the WordPress theme gallery. And any decent developer should know how to port over a few custom functions&mdash;especially ones that are in their own folder as modular, clearly documented files.

<h2>What do you think?</h2>

I was really on the fence with this one.

Plugins help ensure data portability, which I think is really important. But they're also more work for both us as developers and for our clients from a cognitive load perspective.

But when I consider how data is stored and managed, and how to be as future-friendly as possible, the answer is clear: plugins for any data or features that should exist beyond the current theme.

That's my perspective, anyways. What do you think?