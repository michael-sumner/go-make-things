---
categories:
- Code
date: '2014-02-11'
url: /checking-for-pagination-and-the-last-post-in-wordpress/
title: Checking for pagination and the last post in WordPress
---

Today, I want to share two simple functions you can use to check if pagination exists on a particular page, and also check if a particular post is the last one on the page.

<!--more-->

<h2>Creating your helper functions</h2>

Add these functions to your <code>functions.php</code> file:

<pre><code class="language-php">/**
 * If more than one page exists, return TRUE.
 */
function is_paginated() {
    global $wp_query;
    if ( $wp_query-&gt;max_num_pages > 1 ) {
        return true;
    } else {
        return false;
    }
}

/**
 * If last post in query, return TRUE.
 */
function is_last_post($wp_query) {
    $post_current = $wp_query-&gt;current_post + 1;
    $post_count = $wp_query-&gt;post_count;
    if ( $post_current == $post_count ) {
        return true;
    } else {
        return false;
    }
}</code></pre>

<h2>In your template files</h2>

To check if a page is paginated, use this conditional script:

<pre><code class="language-php">&lt;?php if ( is_paginated() ) : ?&gt;
    // Do stuff...
&lt;?php endif; ?&gt;</code></pre>

To check if a post is the last one on the page, include this snippet in the Loop:

<pre><code class="language-php">&lt;?php if ( is_last_post($wp_query) ) : ?&gt;
    // Do stuff...
&lt;?php endif; ?&gt;</code></pre>

<h2>Why would you need this?</h2>

On the design of this site at time of writing, I add an <code>&lt;hr&gt;</code> element between all posts except the last one, like this:

<pre><code class="language-php">&lt;?php if ( !is_last_post($wp_query) ) : ?&gt;
    &lt;hr&gt;
&lt;?php endif; ?&gt;</code></pre>

Similarly, I'll add page navigation on paginated sections only:

<pre><code class="language-php">&lt;?php if ( is_paginated() ) : ?&gt;
    &lt;nav&gt;
        &lt;hr&gt;
        &lt;p class="text-center"&gt;&lt;?php posts_nav_link( '&nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;', '&larr; Newer', 'Older &rarr;' ); ?&gt;&lt;/p&gt;
    &lt;/nav&gt;
&lt;?php endif; ?&gt;</code></pre>

Hope that helps!