---
categories:
- Code
- Design &amp; UX
date: '2013-08-12'
url: /ditching-jquery-for-vanilla-js/
title: Ditching jQuery for Vanilla JS
---

***Note:*** *I've written a new version of this article that reflects [how I work with native JavaScript today](/ditching-jquery).*

On the recent launch of a <a href="https://gomakethings.com/projects/tony-luong/">new site for professional photographer Tony Luong</a>, we dropped jQuery in favor of 100% vanilla JavaScript.

It had a dramatic impact on website performance. Today, I want to share the process for going framework-free.

[snippet id="8395"]

<h2>Different browsers. Different features.</h2>

One of the benefits of a framework like jQuery is that it smooths out all of the weird browser inconsistencies you might run into. But, all that abstraction and extra code adds a lot of weight and <a href="http://jsperf.com/vanilla-js-ftw-jquery-vs-js">performance latency</a> to a site.

Rather than trying to provide the same level of functionality for older browsers, I took a progressive enhancement approach to development. Older and less capable browsers get a basic experience. Newer browsers that support modern APIs get an enhanced one.

To be clear, I'm not advocating dropping support for older and less capable browsers. They still have access to all of the content. They just don't always get the same layout or extra features.

<h2>Cutting the Mustard</h2>

I used a simple feature detection technique coined by the BBC as "<a href="http://responsivenews.co.uk/post/18948466399/cutting-the-mustard">cutting the mustard</a>." This one "if statement" tests support for modern JavaScript APIs:

<pre><code class="language-javascript">if ( 'querySelector' in document && 'addEventListener' in window ) {
    // Scripts go here
}</code></pre>

The BBC explains why these were chosen:

<blockquote>document.querySelector - A large part of any JS library is its DOM selector. If the browser has native CSS selecting then it removes the need for a DOM selector. QuerySelector has been available in Firefox since 3.5 at least and has been working in webkit for ages. It also works in IE9.
...
window.addEventListener - Another large part of any JS library is event support. Every browser made in the last 6 years (except IE8) supports DOM level 2 events. If the browser supports this then we know it has better standards support than IE8.</blockquote>

The BBC also tests for local storage support, but since none of my scripts use that at this time, I left it out. <del datetime="2014-08-20T17:52:57+00:00">I did, however, add a check for forEach loops, which are a newer API that I use often.</del>

<em><strong>Note:</strong> This section was updated on August 16, 2013 to include forEach loops as part of the "cut the mustard" test, and again on August 20, 2014 to include a better approach.</em>

<h3>So what browsers does that support?</h3>

The "cut the mustard" test splits browsers into two categories: HTML5 browsers, and not-HTML5 browsers. From the BBC, here's how common browsers get split up:

<blockquote>HTML5 browsers:

<ul>
<li>IE9+</li>
<li>Firefox 3.5+</li>
<li>Opera 9+ (and probably further back)</li>
<li>Safari 4+</li>
<li>Chrome 1+ (I think)</li>
<li>iPhone and iPad iOS1+</li>
<li>Android phone and tablets 2.1+</li>
<li>Blackberry OS6+</li>
<li>Windows 7.5+ (new Mango version)</li>
<li>Mobile Firefox (all the versions we tested)</li>
<li>Opera Mobile (all the versions we tested)</li>
</ul>

HTML4 browsers:
<ul>
<li>IE8</li>
<li>Blackberry OS5</li>
<li>Nokia S60 v6</li>
<li>Nokia S40 (all versions)</li>
<li>All other Symbian variants</li>
<li>Windows 7 phone (pre-Mango)</li>
<li>…and many more that are too numerous to mention</li>
</ul></blockquote>

<h2>Bootstrapping in your code</h2>

Up in the document <code class="language-markup">&lt;head&gt;</code>, I include this little snippet of code:

<pre><code class="language-javascript">if ( 'querySelector' in document && 'addEventListener' in window ) {
    document.documentElement.className += 'js';
}</code></pre>

This does the mustard test, and if the browser passes, adds a <code class="language-css">.js</code> class to the <code class="language-markup">&lt;html&gt;</code> element.

If any of my scripts also rely on CSS, I make them <a href="https://gomakethings.com/accessible-javascript/">conditional on the presence of that class</a>. That way, nothing is ever hidden or inaccessible for someone whose browser doesn't pass the test.

By putting that script in the head, before the content has even loaded, you ensure that users with modern browsers don't see any weird style changes after the page loads.

In my JavaScript file (yes, <a href="https://gomakethings.com/high-performance-websites/">just one</a>), I use the same mustard test as a wrapper for my scripts:

<pre><code class="language-javascript">if ( 'querySelector' in document && 'addEventListener' in window ) {
    // Scripts go here
}</code></pre>

<h2>Working with selectors</h2>

Modern JavaScript APIs make working with selectors a lot easier.

For getting objects by ID, I use <code class="language-javascript">querySelector</code>. For example, if I wanted to get a <code class="language-markup">div</code> with the ID of <code class="language-markup">#turkey</code>, I'd do this:

<pre><code class="language-javascript">var sandwichTurkey = document.querySelector('#turkey');</code></pre>

If you've never used <code class="language-javascript">querySelector</code> before, it returns the first element on a page that matches the selector. For IDs, there should only be one match per page. For classes, it would return the first element with that class.

To get all objects with a particular class, I use <code class="language-javascript">querySelectorAll</code>. For example, to get all elements with the <code class="language-css">.sandwich</code> class, I'd do this:

<pre><code class="language-javascript">var sandwiches = document.querySelectorAll('.sandwich');</code></pre>

It returns <del datetime="2014-01-24T22:19:07+00:00">an array of elements</del> a node list that I can loop through and work with.

<h2>Looping through elements</h2>

If you get all elements with a particular class, you most likely want to do something with them. Doing so is easy with a <code>for</code> loop:

<pre><code class="language-javascript">var sandwiches = document.querySelectorAll('.sandwich');

for (var i = 0, len = sandwiches.length; i < len; i++) {
	console.log(i) // index
	console.log(sandwiches[i]) // element
}</code></pre>

<h2>Event listeners</h2>

Taking action when someone clicks, uses their keyboard, and more is pretty easy thanks to the <code class="language-javascript">addEventListener</code> method.

If I wanted to do something whenever anyone clicked a link with the <code class="language-markup">#turkey</code> ID, I'd use this script:

<pre><code class="language-javascript">var sandwichTurkey = querySelector('#turkey');

sandwichTurkey.addEventListener('click', function(e) {
    // Do stuff
}, false);</code></pre>

<h2>Working with classes</h2>

One of awesome new JavaScript methods is <code class="language-javascript">classList</code>, that let's you easily add, remove and toggle classes just like you would in jQuery. Unfortunately, it still lacks the browser support it needs for every day use.

<em><strong>Update on June 9, 2014:</strong> I'm now including <a href="https://github.com/eligrey/classList.js">Eli Grey's classList.js</a> polyfill in my projects. It extends support back to IE 8, and when <code>classList</code> support is good enough, I can just remove the polyfill from my projects without updating any of my code.</em>

In the interim, Todd Motto has created some <a href="http://toddmotto.com/creating-jquery-style-functions-in-javascript-hasclass-addclass-removeclass-toggleclass/">awesome class handler functions</a> that I include in every project:

<pre><code class="language-javascript">var hasClass = function (elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

var addClass = function (elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}

var removeClass = function (elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}</code></pre>

These three simple functions let you test for the presence of a class, add a class, and remove a class. In conjunction, they make basic DOM manipulation really easy.

<del datetime="2014-06-09T17:19:30+00:00"><em><strong>Update on August 27, 2013:</strong> I've combined these class handlers, along with a few other useful functions, into a <a href="https://github.com/cferdinandi/buoy">vanilla JS micro-library called Buoy</a> that I now use on all of my projects.</em></del>

<del datetime="2014-06-09T17:19:30+00:00"><em><strong>Update on April 20, 2014:</strong> Buoy no longer uses these class handlers, and has been converted to a <code>classList</code> polyfill forked from <a href="https://github.com/eligrey/classList.js">classList.js by Eli Grey</a>.</em></del>

<em><strong>Update on June 9, 2014:</strong> Since I'm using <a href="https://github.com/eligrey/classList.js">Eli Grey's classList.js</a> polyfill, Buoy is no longer needed and has been removed from GitHub. If you'd prefer to use class handlers, though, check out <a href="https://github.com/toddmotto/apollo">Apollo from Todd Motto</a>.</em>

<h2>Putting it all together</h2>

Let's say I have a set of links with the <code class="language-css">.sandwich</code> class. Whenever one of them is clicked, I want to see if it has the <code class="language-css">.mustard</code> class well. If it does, I'd like to remove it, and if it doesn't, I want to add it.

Here's what that would look like:

<pre><code class="language-javascript">// Class Handlers
var hasClass = function (elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

var addClass = function (elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}

var removeClass = function (elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

// Sandwich Functions
if ( 'querySelector' in document && 'addEventListener' in window ) {

    var sandwiches = document.querySelectorAll('.sandwich');

    for (var i = 0, len = sandwiches.length; i < len; i++) {
    	var sandwich = sandwiches[i];
    	sandwich.addEventListener('click', function(e) {

    	    if ( hasClass(sandwich, 'mustard') ) {
    	        removeClass(sandwich, 'mustard');
    	    }

    	    else {
    	        addClass(sandwich, 'mustard');
    	    }

    	}
    }

}</code></pre>

<h2>Less jQuery. More vanilla JS.</h2>

My experience implementing a 100% vanilla JS experience for Tony's new site was a lot of fun. Modern JavaScript API's are powerful and easy to work with, and the performance results are extraordinary.

I'm sure I'll still use jQuery for projects that require more backwards compatibility or involve more complexity, but I'll be using it a lot less, and vanilla JS a lot more.

<h4>Referenced Links &amp; Other Resources</h4>

<ol>
<li><a href="http://tonyluong.com/">Tony Luong's new site</a></li>
<li><a href="http://responsivenews.co.uk/post/18948466399/cutting-the-mustard">BBC on "cutting the mustard"</a></li>
<li><a href="http://toddmotto.com/is-it-time-to-drop-jquery-essentials-to-learning-javascript-from-a-jquery-background/">Todd Motto on moving from jQuery to vanilla JS</a></li>
<li><a href="http://toddmotto.com/creating-jquery-style-functions-in-javascript-hasclass-addclass-removeclass-toggleclass/">Todd Motto on working with classes in vanilla JS</a></li>
<li><a href="https://gomakethings.com/accessible-javascript/">Accessible JavaScript</a></li>
<li><a href="https://gomakethings.com/high-performance-websites/">High-performance websites</a></li>
<li><a href="http://www.unicodegirl.com/function-statement-versus-function-expression.html">Function statements vs function expressions</a> (or, why functions are variables)</li>
<li><a href="https://github.com/toddmotto/foreach">Todd Motto's forEach method</a></li>
</ol>

[snippet id="8397"]