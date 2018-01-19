---
categories:
- Code
date: '2013-07-08'
title: Houdini Updates
---

<a href="http://cferdinandi.github.io/houdini/">Houdini</a>, my simple collapse-and-expand widget, got an update last week.

You can now show different toggle text based on whether or not the content is active. Simply wrap your labels in <code class="language-markup">&lt;span&gt;</code> elements with the <code class="language-css">.collapse-text-show</code> and <code class="language-css">.collapse-text-hide</code> classes:

<pre><code class="language-markup">&lt;a class="collapse-toggle" data-target="#show-me" href="#"&gt;
    &lt;span class="collapse-text-show"&gt;Show +&lt;/span&gt;
    &lt;span class="collapse-text-hide"&gt;Hide -&lt;/span&gt;
&lt;/a&gt;

&lt;div class="collapse" id="show-me"&gt;
    &lt;p&gt;Now you see me, now you don't.&lt;/p&gt;
&lt;/div&gt;</code></pre>
