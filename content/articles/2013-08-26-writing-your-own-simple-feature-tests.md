---
categories:
- Code
- Design and UX
date: '2013-08-26'
url: /writing-your-own-simple-feature-tests/
title: Writing your own simple feature tests
---

Progressive enhancement is an approach to web development in which your provide universal access to content to all devices, and layer in additional features and functionality for browsers that support them.

For this approach, you need to run a simple feature test to check what the browser is and isn't capable of. <a href="http://modernizr.com/">Modernizr</a> is a great tool for this, but today, I want to show you how you can write your own simple feature tests.


<h2>What a feature test looks like</h2>

At it's core, a feature test is a simple if statement:

<pre><code class="language-javascript">if ( support for feature exists ) {
    // Do something
}</code></pre>

I use feature tests in two ways:

<ol>
<li>I'll add classes to the document to activate certain styles in my CSS file.</li>
<li>I'll wrap them around my JavaScript to ensure the browser can handle the API's used.</li>
</ol>

Let's look at some examples.

<h2>Checking for modern JavaScript support</h2>

I use modern JavaScript API's in my scripts that don't work in older and less capable browsers. These API's include query selectors, event listeners, and foreach loops. Here's the if statement I use:

<pre><code class="language-javascript">if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {
    // Do stuff...
}</code></pre>

Some of my scripts use CSS to hide and show elements. By default, I want all elements visible. They should only be hidden if the browser has the appropriate JavaScript support to make them visible. To do that, I include this script:

<pre><code class="language-javascript">if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {
    document.documentElement.className += 'js';
}</code></pre>

That adds a </code>.js</code> class to the <code class="language-markup">&lt;html&gt;</code> element. In my CSS, I'll include something like this:

<pre><code class="language-css">.js .example {
    display: none;
    visibility: hidden;
}</code></pre>

Now, elements with the <code class="language-css">.example</code> class are only hidden when the appropriate API's are supported.

I also don't want to run scripts that use unsupported API's, as that can result in errors and weird layout quirks. I'll wrap a feature test around my script like this:

<pre><code class="language-javascript">if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {
    // My scripts go here...
}</code></pre>

<h2>Checking for <code class="language-css">@font-face</code> support</h2>

I love <a href="https://gomakethings.com/icon-fonts/">using icon fonts</a>, but certain browsers (notably Opera Mini and IE 9 on Windows Phone 7) don't support font embedding. I also use the <code class="language-css">:before</code> pseudo selector to include icons in my HTML.

For browsers that don't support either of those, users will see empty squares where the icons should be. I'd rather they see nothing at all, or in some cases, see text instead. Paul Irish and Diego Perini shared <a href="https://gist.github.com/cferdinandi/6269067">two little functions that check for support of these features</a>.

I include these functions in my JS file, and then use this if statement:

<pre><code class="language-javascript">if (isFontFaceSupported && selectorSupported(':before')) {
    document.documentElement.className += 'font-face';
}</code></pre>

Then in my stylesheet, I make sure that I prefix my <code class="language-css">@font-face</code> styles with <code class="language-css">.font-face</code>.

<h2>Including a feature test on your site</h2>

So you've written your feature test. Now where do you put it?

Tests that I wrap around scripts go in my main JavaScript file. Feature tests that add a class to the document go in their own file that I usually name <code class="language-none">feature-test.js</code>. While most of my JS files go in the footer for better performance, I want the test to run as quickly as possible to avoid "flashes of unstyled content" (or FOUC, as it's sometimes called).

I include the <code class="language-none">feature-test.js</code> in the <code class="language-markup">&lt;head&gt;</code> element:

<pre><code class="language-markup">&lt;script src="feature-test.js"&gt;&lt;/script&gt;</code></pre>

<h2>How do you know what to check for?</h2>

Google is a great place to start. A lot of the conditional statements can be found on the <a href="https://developer.mozilla.org/en-US/">Mozilla Developer Network</a>, where they're included as part of the polyfill recommendations. And Paul Irish, who's a jQuery team member and lead developer at Modernizr, shares a lot of the code they use <a href="https://gist.github.com/paulirish/">on GitHub</a>.
