---
categories:
- Code
date: '2013-01-09'
permalink: /how-to-remove-trackbacks-from-your-wordpress-comments/
title: How to remove trackbacks from your WordPress comments
url: /2013/01/09/how-to-remove-trackbacks-from-your-wordpress-comments
---

<em><strong>Update:</strong> I've converted this snippet into a lightweight plugin called <a href="http://cferdinandi.github.io/remove-trackbacks/">Remove&nbsp;Trackbacks</a>.</em>

For the last few years, I've been using some simple PHP magic to separate real comments from trackbacks in my comments section. A few weeks ago, I realized that trackbacks are by-and-large useless for the typical reader.

So, I decided to remove them. It's as easy as adding this snippet of code, <a href="http://weblogtoolscollection.com/archives/2008/03/08/managing-trackbacks-and-pingbacks-in-your-wordpress-theme/">courtesy of Weblog Tools Collection</a>, to your <code class="language-none">functions.php</code> file...

<pre><code class="language-php">add_filter('comments_array', 'filterTrackbacks', 0);
add_filter('the_posts', 'filterPostComments', 0);
//Updates the comment number for posts with trackbacks
function filterPostComments($posts) {
    foreach ($posts as $key =&gt; $p) {
        if ($p-&gt;comment_count ID);
        $comments = array_filter($comments, "stripTrackback");
        $posts[$key]-&gt;comment_count = sizeof($comments);
    }
    return $posts;
}
//Updates the count for comments and trackbacks
function filterTrackbacks($comms) {
global $comments, $trackbacks;
    $comments = array_filter($comms,"stripTrackback");
    return $comments;
}
//Strips out trackbacks/pingbacks
function stripTrackback($var) {
    if ($var-&gt;comment_type == 'trackback' || $var-&gt;comment_type == 'pingback') { return false; }
    return true;
}</code></pre>

There are other ways you could do this, but here's why this approach rocks:
<ol>
<li>You will still receive notifications if people link to your site on the web.</li>
<li>It doesn't just prevent new trackbacks. It also removes existing ones.</li>
<li>Trackbacks aren't just hidden, they're removed from your comment count altogether.</li>
</ol>