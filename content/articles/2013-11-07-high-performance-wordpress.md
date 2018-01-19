---
categories:
- Code
- Design &amp; UX
date: '2013-11-07'
permalink: /high-performance-wordpress/
title: High performance WordPress
url: /2013/11/07/high-performance-wordpress
---

<em>This is part 3 of <a href="https://gomakethings.com/wicked-fast-websites/">Wicked Fast Websites</a>, a three-part series that explores why web performance matters and what you can do about it.</em>

WordPress is a powerful tool, and it brings with some unique performance challenges. In part 2, we looked at <a href="https://gomakethings.com/how-to-build-a-high-performance-website/">how to build high performance websites</a>. This article will explore some WordPress-specific techniques and plugins.

<!--more-->

<h2>Markup Order Matters</h2>

Where you place styles and scripts in your markup can make your site render faster. WordPress provides two functions for loading styles and scripts: <code>wp_enqueue_style()</code> and <code>wp_enqueue_script()</code>.

<code>wp_enqueue_style()</code> loads your stylesheets in the header by default&mdash;which is where we want them&mdash;so you don't need to modify anything here. <code>wp_enqueue_script()</code> also loads scripts in the header, and we want them in the footer. Here's the full function:

<pre><code class="language-php">wp_enqueue_script( $handle, $src, $deps, $ver, $in_footer );</code></pre>

That last argument tells WordPress whether or not to load the script in the footer. It's <code>false</code> by default. Set it to <code>true</code>.

<h2>Minify &amp; Concatenate</h2>

Every HTTP request adds additional load time, so you should combine like files. Whitespace in your code can double (or more) the size of your files, so you should remove it.

In WordPress, plugins make this a bit more challenging. Plugins can load multiple, unminified scripts and stylesheets. You can't go and manually concatenate and minify them, because every time you update your plugins, your changes will get wiped out.

Fortunately, plugins also make this easier.

<a href="http://wordpress.org/plugins/minqueue/">MinQueue</a> is a fantastic plugin that will minify and concatenate scripts and styles that are loaded using the <code>wp_enqueue_*</code> functions. There are several other plugins that do this as well, but I've found MinQueue is the best balance of features, control, and ease-of-use. It even includes cache busting by changing the concatenated file name when you update one of the included scripts or styles.

<h3>Minifying your HTML</h3>

Minfying your markup would be an absurd task if you had to do it manually. Fortunately, there's a plugin that handles that for you. It even drops a handy little comment at the bottom of the markup telling you how much weight you've saved. Check out <a href="http://github.com/cferdinandi/html-minify/">HTML Minify on GitHub</a>.

<h3>Google-Hosted jQuery</h3>

<a href="http://html5boilerplate.com/">HTML5 Boilerplate</a> uses a smart implementation of Google's hosted version of jQuery that provides a local fallback if the Google CDN is unavailable:

<pre><code class="language-markup">&lt;script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;window.jQuery || document.write('&lt;script src="js/vendor/jquery-1.10.2.min.js"&gt;&lt;\/script&gt;')&lt;/script&gt;</code></pre>

In WordPress, though, you should be using <code>wp_enqueue_script()</code> to deregister the built-in version of jQuery and register and load Google's version.

I created a plugin (forked from <a href="https://gist.github.com/wpsmith/4083811">some great code on GitHub</a>) that replicates HTML5 Boilerplate's implementation the WordPress way: <a href="http://github.com/cferdinandi/google-hosted-jquery/">Google-Hosted jQuery</a>.

<h2>Better JPGs</h2>

A JPG compression level of 70 is considered high-quality for the web. WordPress uses a 90 compression rate, which results in substantially bigger files. It also creates baseline JPGs instead of progressive ones.

<a href="https://github.com/cferdinandi/image-compress-and-sharpen">Image Compress &amp; Sharpen</a> is a plugin that let's you set your own compression rate, convert baseline JPGs to progressive ones, and if you need to, sharpen your compressed images so that they stay sharp.

If you have a bunch of images you've already uploaded and want to recompress them with your new settings, try using the <a href="http://wordpress.org/plugins/regenerate-thumbnails/">Regenerate Thumbnails</a> plugin.

<h2>Adaptive Images</h2>

Adaptive images hold a lot of promise, but the solution needs to be future compatible and not require you overly complex markup. <a href="http://jetpack.me/support/photon/">Photon</a> is an extension for Automattic's <a href="http://jetpack.me">JetPack plugin</a> that intercepts image requests and serves resized versions adjusted to fit the user's screen.

If you're comfortable with your images being hosted and served from WordPress.com, it's a great tool.

<h2>Gzipping &amp; Expire Headers</h2>

Enabling gzipping and setting expire headers requires you to modify your <code>.htaccess</code> file. If you've never done it before, it can be a bit intimidating.

This is what a typical WordPress <code>.htaccess</code> file looks like:

<pre><code># BEGIN WordPress
&lt;IfModule mod_rewrite.c&gt;
RewriteEngine On
RewriteBase /your-site/
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /your-site/index.php [L]
&lt;/IfModule&gt;

# END WordPress
</code></pre>

Add your changes after <code>#END WordPress</code>.

<h2>Prebuild Your Site</h2>

Every time someone visits your site, WordPress needs to create an HTML document by compiling your templates and database content into markup. On inexpensive shared hosting, this can add a lot of latency. Third-party API's can slow things down even more.

One of the easiest ways to fix this is by telling WordPress to prebuild the HTML documents ahead of time, a process known as <em>cacheing</em>.

There are a handful of plugins that do this, but my favorite is <a href="https://wordpress.org/plugins/comet-cache/">Comet Cache</a>. Most cacheing plugins have a ton of confusing settings. Just install QuickCache, switch it to "on," and you're good to go. It prebuilds your entire site once <del datetime="2014-09-29T03:34:15+00:00">an hour</del> every seven days, but you can adjust it to happen more or less frequently.

**Update:** And it automatically updates the prebuilt files whenever you make changes or someone leaves a comment.

<del datetime="2014-09-29T03:34:15+00:00">The one downside to this is that new comments won't be seen by others until the next rebuild. <a href="http://wordpress.org/plugins/quick-cache-comment-garbagecollector/">The Quick Cache Comment Garbage Collector plugin</a> fixes that by rebuilding just that post or page when a comment is submitted</del>.

<h2>In Summary</h2>

<ol>
<li>Use the <code>wp_enqueue_style()</code> and <code>wp_enqueue_script()</code> functions to control your markup order.</li>
<li>Use <a href="http://wordpress.org/plugins/minqueue/">MinQueue</a> to minify and concatenate your scripts and styles across multiple plugins.</li>
<li>Use <a href="http://github.com/cferdinandi/html-minify/">Minify HTML</a> to easily minify your markup.</li>
<li>Use <a href="http://github.com/cferdinandi/google-hosted-jquery/">Google-Hosted jQuery</a> to include Google's CDN of jQuery on your site the WordPress way.</li>
<li><a href="https://github.com/cferdinandi/image-compress-and-sharpen">Image Compress &amp; Sharpen</a> will create smaller, faster JPGs, and <a href="http://wordpress.org/plugins/regenerate-thumbnails/">Regenerate Thumbnails</a> will let you recompress images you've already uploaded.</li>
<li><a href="http://jetpack.me/support/photon/">Photon</a> makes it easy to serve adaptive images.</li>
<li>Enable gzipping and set expire headers after the WordPress-specific code in your <code>.htaccess</code> file.</li>
<li>Use <a href="https://wordpress.org/plugins/quick-cache/">WordPress Quick Cache</a> <del datetime="2014-09-29T03:37:18+00:00">and <a href="http://wordpress.org/plugins/quick-cache-comment-garbagecollector/">The Quick Cache Comment Garbage Collector plugin</a></del> to dramatically improve server response times.</li>
</ol>

Working with WordPress can make performance a bit more challenging, but some great plugins and functions also make it easier to build high performance websites.