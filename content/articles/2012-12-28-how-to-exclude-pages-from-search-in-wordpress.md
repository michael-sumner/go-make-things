---
categories:
- Code
date: '2012-12-28'
permalink: /how-to-exclude-pages-from-search-in-wordpress/
title: How to exclude pages from Search in WordPress
url: /2012/12/28/how-to-exclude-pages-from-search-in-wordpress
---

Up until a few weeks ago, if you searched for common terms like "mobile," "jquery," or "design" on this site, my about page would show up in the results. It was weird and not really relevant to what a person would typically be looking for when using search.

Fortunately, there's a pretty easy way to configure your search results so that only posts (not pages) show up. Just add this snippet of code, <a href="http://bavotasan.com/2010/excluding-pages-from-wordpress-search/">courtesy of C. Bavota</a>, to your <code>functions.php</code> file...

<pre><code class="language-php">function SearchFilter($query) {
    if ($query-&gt;is_search) {
        $query-&gt;set('post_type', 'post');
    }
    return $query;
}
add_filter('pre_get_posts','SearchFilter');</code></pre>