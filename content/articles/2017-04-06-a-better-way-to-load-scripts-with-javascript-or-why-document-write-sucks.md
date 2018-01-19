---
categories:
- Code
- CSS
- JavaScript
- Web Performance
date: '2017-04-06'
permalink: /a-better-way-to-load-scripts-with-javascript-or-why-document-write-sucks/
title: A better way to load scripts with JavaScript (or, why document.write() sucks)
url: /2017/04/06/a-better-way-to-load-scripts-with-javascript-or-why-document-write-sucks
---

You may have heard that you shouldn't use <code>document.write()</code> to inject scripts into a page. But why?

<a href="https://developers.google.com/web/updates/2016/08/removing-document-write">From Google:</a>

<blockquote>
  For users on slow connections, such as 2G, external scripts dynamically injected via <code>document.write()</code> can delay the display of main page content for tens of seconds, or cause pages to either fail to load or take so long that the user just gives up. Based on instrumentation in Chrome, we've learned that pages featuring third-party scripts inserted via <code>document.write()</code> are typically twice as slow to load than other pages on 2G.

  We collected data from a 28 day field trial on 1% of Chrome stable users, restricted to users on 2G connections. We saw that 7.6% of all page loads on 2G included at least one cross-site, parser-blocking script that was inserted via <code>document.write()</code> in the top level document. As a result of blocking the load of these scripts, we saw the following improvements on those loads:

  <ul>
  <li>10% more page loads reaching first contentful paint (a visual confirmation for the user that the page is effectively loading), 25% more page loads reaching the fully parsed state, and 10% fewer reloads suggesting a decrease in user frustration.</li>
  <li>21% decrease of the mean time (over one second faster) until the first contentful paint</li>
  <li>38% reduction to the mean time it takes to parse a page, representing an improvement of nearly six seconds, dramatically reducing the time it takes to display what matters to the user.</li>
  </ul>
</blockquote>

10 seconds of extra delay on an already slow connection! That's a <strong>huge</strong> decrease in performance.

So... if not <code>document.write()</code>, how should you inject scripts via JavaScript?

<h2>A Better Way</h2>

Here's a technique you can use to asynchronously load JavaScript files:

<pre><code class="lang-javascript">// Get the first script element on the page
var ref = w.document.getElementsByTagName( 'script' )[ 0 ];

// Create a new script element
var script = w.document.createElement( 'script' );

// Set the script element `src`
script.src = 'path-to-your-javascript-file.js';

// Inject the script into the DOM
ref.parentNode.insertBefore( script, ref );
</code></pre>

If you find yourself doing this a fair bit, you might want to consider including <a href="https://github.com/filamentgroup/loadJS">loadJS</a>, an awesome helper method from Filament Group. They also have a CSS version, <a href="https://github.com/filamentgroup/loadCSS">loadCSS</a>.