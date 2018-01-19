---
categories:
- Code
date: '2013-07-03'
title: WordPress Next Page ID
---

WordPress makes it really easy to <a href="http://codex.wordpress.org/Next_and_Previous_Links">link to next and previous posts</a>, but not easy to work with neighboring pages.

<a href="https://gist.github.com/cferdinandi/9273447">WordPress Next Page ID</a> is a set of two simple functions that get the ID of the previous and next pages (or subpages).
<!--more-->
<h2>The Use Case</h2>

I recently built a scavenger hunt app using WordPress, and needed to get info about the pages before and after each current challenge. Since each clue builds on the one before, I needed to automate the process of validating that each challenge was completed and get a link to the next one.

Matt McInvale built <a href="http://wordpress.org/plugins/next-page-not-next-post/">Next Page, Not Next Post</a>, an plugin for linking to neighboring pages.

Matt's plugin was a bit more robust than what I needed, but I also needed more than just links. I need to get the IDs of neighboring pages so I could query metadata and dynamically serve content.

By breaking out Matt's plugin into two simple functions, I now have lightweight, DRY code that I'm sure I'll reuse on future projects.

<h2>How It Works</h2>

WordPress Next Page ID is just two simple functions: <code class="language-php">next_page_ID($id)</code> and <code class="language-php">previous_page_ID($id)</code>.

Include the two functions in the PHP file you're working in. Then call each function as needed. Replace <code class="language-php">$id</code> with the ID of the page you're trying to get the next or previous page ID for.

<h3>Examples</h3>

<pre><code class="language-php">$next_ID = next_page_ID('41);
$previous_ID = previous_page_ID('41);
$next_url = get_permalink($next_ID);

echo '&lt;a href="' . $next_url . '"&gt;Next Page&lt;/a&gt;';</code></pre>

<a href="https://gist.github.com/cferdinandi/9273447">Download WordPress Next Page ID on GitHub.</a>