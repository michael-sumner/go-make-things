---
categories:
- Code
date: '2012-12-21'
permalink: /remove-junk-from-the-wordpress-header/
title: Remove junk from the WordPress header
url: /2012/12/21/remove-junk-from-the-wordpress-header
---

If you ever view the source of your WordPress blog, you'll notice that WordPress adds a bunch of unnecessary junk into the header.

It includes:
<ul>
<li>A Really Simply Discovery link so other services - Flickr, for example - can easily publish to your blog.</li>
<li>A Windows Live Writer link, which is only useful if you use Windows Live Writer.</li>
<li>The version of WordPress you're using, which matters to no one.</li>
<li>Links to the next and previous posts, as well as a random older post, all uselessly hidden in the header.</li>
</ul>

Removing this junk is as simple as adding a few lines of code to your <code>functions.php</code> file. Here's the code, <a href="http://www.themelab.com/2010/07/11/remove-code-wordpress-header/">courtesy of Theme Lab...</a>

<pre><code class="language-php">remove_action('wp_head', 'rsd_link'); // Removes the Really Simple Discovery link
remove_action('wp_head', 'wlwmanifest_link'); // Removes the Windows Live Writer link
remove_action('wp_head', 'wp_generator'); // Removes the WordPress version
remove_action('wp_head', 'start_post_rel_link'); // Removes the random post link
remove_action('wp_head', 'index_rel_link'); // Removes the index page link
remove_action('wp_head', 'adjacent_posts_rel_link'); // Removes the next and previous post links</code></pre>