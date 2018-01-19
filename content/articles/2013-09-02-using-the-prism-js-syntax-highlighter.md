---
categories:
- Code
- Design &amp; UX
date: '2013-09-02'
permalink: /using-the-prism-js-syntax-highlighter/
title: Using the Prism.js syntax highlighter
url: /2013/09/02/using-the-prism-js-syntax-highlighter
---

<a href="http://prismjs.com/">Prism.js</a> is a fantastic front-end syntax highlighter by <a href="http://lea.verou.me/">Lea Verou</a>.

Unlike many of the other options I've tried, Prism.js is incredibly lightweight and the highlighting is absolutely beautiful. I added it to the Go Make Things, <a href="http://cferdinandi.github.io/kraken/">Kraken</a>, and all of the add-ons last week. It's made the code a lot more readable.

<p>Here's how to incorporate Prism.js into your site.
<!--more--></p>

<h2>Select your options</h2>

Head over the <a href="http://prismjs.com/download.html">download page</a> and select your options:

<ul>
<li>Development version or minified production version.</li>
<li>Theme of choice (I use the default).</li>
<li>Coding languages to support (CSS, Markup, JS and PHP for me).</li>
<li>Plugins like line highlighting and numbering.</li>
</ul>

Your options are dynamically updated as you make selections, which is actually just a bit annoying as it adds some latency into the process. When you're ready, click the download buttons to grab you CSS and JS files.

<h2>Adding the files to your site</h2>

The JavaScript file can get added to your site as is, but I like to make a few updates to the default stylesheet.

First, I remove all of the styling related to the <code>code</code> and <code>pre</code> elements. I've already got my preferred styling for that (I use the defaults <a href="http://cferdinandi.github.io/kraken/code.html">included in Kraken</a>).

Next, I prefix all of the <code>.token*</code> related styles with <code>pre</code>, as I only want the syntax highlighting to apply to large blocks of code and not the inline stuff. (Yes, over-prefixing is bad for performance. Whatever.) Then, I wrap all of those styles in an <code>@media screen {}</code> media query. I don't want highlighting for print styles.

<pre><code class="language-css">@media screen {
    pre .token.comment,
    pre .token.prolog,
    pre .token.doctype,
    pre .token.cdata {
        color: slategray;
    }
    ...
}</code></pre>

<h2>Adding the markup</h2>

Lea works for the W3C, and has designed Prism.js to encourage good authoring practices. No special Prism.js specific classes are required, but you do need to adhere to W3C recommendations in order for it work.

You have to wrap code in a <code>code</code> element for highlighting to work, even for large blocks of preformatted text:

<pre><code class="language-markup">&lt;pre&gt;&lt;code&gt;Code goes here&lt;/code&gt;&lt;/pre&gt;</code></pre>

Additionally, Prism.js uses the HTML5 draft <code>class="language-*"</code> specification to apply to appropriate highlighting.

<pre><code class="language-markup">&lt;pre&gt;&lt;code class="language-css"&gt;
    .example {
        font-size: 2em;
    }
&lt;/code&gt;&lt;/pre&gt;</code></pre>

I don't use any of the plugins, so I can't comment on line numbering or highlighting, but the end result is fast, lightweight, beautiful syntax highlighting.