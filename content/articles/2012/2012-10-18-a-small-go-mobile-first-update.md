---
categories:
- Code
date: '2012-10-18'
excerpt: Go Mobile First is a free, mobile-first WordPress theme.
url: /a-small-go-mobile-first-update/
title: A small Go Mobile First update
---

Last night I had to push out a small update to <em><a href="https://gomakethings.com/go-mobile-first/">Go Mobile First</a></em> after I caught a bug in the search form function that didn't show up in testing.

<a href="https://gomakethings.com/go-mobile-first/">Go grab the update</a>, or if you'd prefer, manually update an existing installation using the instructions below.

<h2>Manually Update</h2>

<ol>
<li>Open functions.php.</li>
<li>Locate <code class="language-php">function gmf_wpsearch($form)</code>.</li>
<li>Replace it with <code class="language-php">function gmf_wpsearch()</code> (ie. remove <code class="language-php">$form</code>).</li>
<li>Save the file. That's it - you're done!</li>
</ol>