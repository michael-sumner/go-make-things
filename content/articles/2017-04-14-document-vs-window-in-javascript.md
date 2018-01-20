---
categories:
- Code
- JavaScript
date: '2017-04-14'
url: /document-vs-window-in-javascript/
title: .document vs .window in JavaScript
---

One of the students in my <a href="https://gomakethings.com/guides/">Vanilla JS Slack room</a> asked me why I use <code>document</code> instead of <code>window</code> with <code>addEventListener()</code> click events. In otherwords, why this:

<pre><code class="lang-javascript">document.addEventListener('click', function (event) {
    // Do something..
}, false);
</code></pre>

Instead of this:

<pre><code class="lang-javascript">window.addEventListener('click', function (event) {
    // Do something..
}, false);
</code></pre>

The short answer: they do the same exact thing.

Functionally, there’s no difference. I prefer to call the DOM object lowest in the tree that satisfies our needs. <code>window</code> works just fine, but <code>document</code> does the same thing. It's all a matter of preference.

That said, some events, like <code>scroll</code> and <code>resize</code>, <em>must</em> be attached to the <code>window</code>. But otherwise, use whichever one fits your coding style best.