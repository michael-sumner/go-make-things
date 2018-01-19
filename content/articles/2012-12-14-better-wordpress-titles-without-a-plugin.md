---
categories:
- Code
date: '2012-12-14'
title: Better WordPress titles without a plugin
---

I hate using plugins for things that I can easily do myself with a few lines of PHP.

I'd been using the <a href="http://wordpress.org/extend/plugins/all-in-one-seo-pack/installation/">All-In-One SEO Pack</a> plugin for years, but lately, I've only been using it to override the default page and post titles. This week, I dropped the plugin in favor of a few lines of code in my header.
<!--more-->
<h2>First, a word about SEO</h2>

Many years ago, I was told it's really important to include meta keywords in the header so that search engines know what's on the page. After years of slimy SEO specialists gaming the system by loading sites up with irrelevant keywords in the header, sites like Google <a href="http://www.mattcutts.com/blog/keywords-meta-tag-in-web-search/">no longer pay attention to them</a>. What about the description meta tag? That doesn't really matter much either, although search engines often use that to display a few lines about the site in their results.

There is a new tag you can now include: <code class="language-markup">link rel="canonical"</code>. This tells Google which URL for a site is the main one. This is particularly important on ecommerce sites that often have multiple URLs for one page, like www.buystuff.com/robot and www.buystuff.com/robots?sizes. Setting the canonical will tell Google which of those two is the main URL. Not as important for blogs, but still worth including.

So the only two things that I really care about customizing are the title and the canonical. I'm ok with Google using the first few lines of a post as the description in their search results, except on the landing page, where I want something a bit more explanatory.

<h2>Changing the Title</h2>

In the <code>header.php</code> file, I replaced the default <code class="language-markup">title</code> content with this snippet of code courtesy of <a href="http://html5blank.com/">Todd Motto's HTML5 Blank</a>...

<pre><code class="language-php">&lt;?php wp_title(''); ?&gt;&lt;?php if(wp_title('', false)) { echo ' |'; } ?&gt; &lt;?php bloginfo('name'); ?&gt;</code></pre>

<em>Updated on March 5, 2013 with Todd's snippet, which is way simpler than what I had been using before and achieves the same result.</em>

<h2>Adding a Description</h2>

Underneath the <code>title</code> tag, I added this bit of code...

<pre><code class="language-php">&lt;?php if (is_home ()) : // if homepage ?&gt;
    &lt;meta name="description" content="&lt;?php bloginfo( 'description' ); // Pulls site description ?&gt;"&gt;
&lt;?php endif; ?&gt;
</code></pre>

The <code class="language-php">if (is_home())</code> statement tells WordPress to only show this content on the landing page.

<h2>Adding a Canonical</h2>

This one's crazy simple. Underneath the description if statement, I added...

<pre><code class="language-php">&lt;link rel="canonical" href="&lt;?php the_permalink() ?&gt;"&gt;</code></pre>

That simply uses the main permalink for the page as the canonical link.

This took less than five minutes and just a few lines of code, and allowed me to stop using a pretty big plugin.