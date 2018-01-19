---
categories:
- Code
date: '2013-06-03'
permalink: /javascript-resize-performance/
title: JavaScript Resize Performance
url: /2013/06/03/javascript-resize-performance
---

On a recent project, I used the jQuery <code class="language-javascript">.resize()</code> method to detect when a user resized their browser and run certain code.

There are performance concerns with doing so, though. <a href="http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/">Paul Irish explains...</a>

<blockquote>If you’ve ever attached an event handler to the window’s resize event, you have probably noticed that while Firefox fires the event slow and sensibly, IE and Webkit go totally spastic.</blockquote>

Fortunately, there's an easy fix: throttling.

[snippet id="8395"]

<h2>Throttling Your JavaScript</h2>

JS resize throttling is a two-part approach:

<ol>
<li>You create a function that does whatever you need to have happen on resize.</li>
<li>Within the <code class="language-javascript">.resize()</code> method, you run the function and set a timeout on it so it won't run again for a predefined amount of time.</li>
</ol>

Here's what it looks like:

<pre><code class="language-javascript">(function($) {

    var resizeTimer; // Set resizeTimer to empty so it resets on page load

    function resizeFunction() {
        // Stuff that should happen on resize
    };

    // On resize, run the function and reset the timeout
    // 250 is the delay in milliseconds. Change as you see fit.
    $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeFunction, 250);
    });

})(jQuery);</code></pre>

You can adjust the delay based on how much of a lag you're comfortable with. Even 100 milliseconds makes a big difference in performance. Check out this <a href="http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/">demo Ben Alman put together</a>.

<h2>Running on Page Load</h2>

If you have stuff that you want to run on resize <em>and</em> page load, you can also call the function outside of <code class="language-javascript">.resize()</code>:

<pre><code class="language-javascript">(function($) {

    var resizeTimer; // Set resizeTimer to empty so it resets on page load

    function resizeFunction() {
        // Stuff that should happen on resize
    };

    // On resize, run the function and reset the timeout
    // 250 is the delay in milliseconds. Change as you see fit.
    $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeFunction, 250);
    });

    resizeFunction();

})(jQuery);</code></pre>

Now, <code class="language-javascript">resizeFunction()</code> will run when the page loads, and again whenever the browser window is resized.

[snippet id="8397"]