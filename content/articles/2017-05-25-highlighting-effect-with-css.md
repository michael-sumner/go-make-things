---
categories:
- Code
- CSS
date: '2017-05-25'
permalink: /highlighting-effect-with-css/
title: Highlighting effect with CSS
url: /2017/05/25/highlighting-effect-with-css
---

I've always loved the look of text that looks like it's highlighted.

Not sure what I'm talking about? <span style="background-color: #fff2ac; background-image: linear-gradient(to right, #ffe359 0%, #fff2ac 100%);">Here's an example of a highlighted sentence.</span>

This is super easy to do with CSS. Add this to your CSS file, and add the <code>.highlight</code> class to a <code>&lt;span&gt;</code> around your text.

<pre><code class="lang-css">.highlight {
    background-color: #fff2ac;
    background-image: linear-gradient(to right, #ffe359 0%, #fff2ac 100%);
}
</code></pre>

<pre><code class="lang-markup">&lt;span class="highlight"&gt;My highlighted text.&lt;/span&gt;
</code></pre>

You could also add this effect to selected text using the <code>::selection</code> pseudo-selector.

<pre><code class="lang-css">::-moz-selection,
::selection {
    background-color: #fff2ac;
    background-image: linear-gradient(to right, #ffe359 0%, #fff2ac 100%);
}
</code></pre>