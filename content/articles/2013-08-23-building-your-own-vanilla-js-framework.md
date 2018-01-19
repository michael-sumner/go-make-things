---
categories:
- Code
- Design &amp; UX
date: '2013-08-23'
permalink: /building-your-own-vanilla-js-framework/
title: Building your own vanilla JS framework
url: /2013/08/23/building-your-own-vanilla-js-framework
---

I've started <a href="https://gomakethings.com/ditching-jquery-for-vanilla-js/">dropping jQuery in favor of vanilla JavaScript</a>. It's resulted in some pretty dramatic performance improvements.

There are two things I've done to make writing scripts easier:
<ol>
<li class="space-bottom-small">I use progressive enhancement. Modern browsers and IE 9 and up get the enhanced, interactive features. Older, less capable browsers get a simpler, content-only experience. This allows me to take advantage of modern API's.</li>
<li class="space-bottom-small">I include my own vanilla JS micro-framework to handle some of the repetitive, boring stuff.</li>
</ol>

Today, I want to show you how to create your own micro-framework for your vanilla JavaScript projects.

[snippet id="8395"]

<h2>JavaScript Micro-Frameworks</h2>

So what exactly is a micro-framework?

jQuery is a framework that makes a whole bunch of common tasks easier. Because it does a lot of things, it's pretty big (the minified version weighs in at 93kb). And because of all the abstraction it does, it's also a lot slower.

Micro-frameworks are like super tiny versions of jQuery. They're lightweight, focused and fast. By writing your own, you can include only what you need and nothing that you don't.

<h2>What goes in a micro-framework?</h2>

What you include in your micro-framework will vary by project.

Every project I've done so far has include some <a href="https://gist.github.com/cferdinandi/6203234">simple class handlers</a> - functions to add, remove and toggle classes, as well as check to see if an object has a class in the first place. For <a href="http://cferdinandi.github.io/drop/">Drop</a>, my simple dropdown menu script, I used a function to <a href="https://gist.github.com/cferdinandi/6203237">get all siblings of an object</a>.

You can find an assortment of mini helper functions on <a href="http://microjs.com/">Microjs</a>, <a href="http://stackoverflow.com/">StackOverflow</a>, and <a href="http://github.com/">GitHub</a>.

<em><strong>Update on August 26, 2013</strong> - Check out <a href="http://cferdinandi.github.io/buoy/">Buoy</a>, the simple micro-library I'm now using with all my projects.</em>

<h2>A micro-framework in action</h2>

Let's say I wanted to check to see if an element has the <code class="language-css">.sandwich</code> class. If it does, we'll remove it. If it doesn't, we'll add.

In my JavaScript file, I'll put my micro-framework helper functions up at the top:

<pre><code class="language-javascript">// Check if an element has a class
var hasClass = function (elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

// Add a class to an element
var addClass = function (elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}

// Remove a class from an element
var removeClass = function (elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

// Toggle a class on an element
var toggleClass = function (elem, className) {
    if ( hasClass(elem, className) ) {
        removeClass(elem, className);
    }
    else {
        addClass(elem, className);
    }
}</code></pre>

Then use them in my code:

<pre><code class="language-javascript">var turkeySandwich = document.querySelector('#turkey');
toggleClass(turkeySandwich, 'sandwich');</code></pre>

Total file size? About 1kb.

<h2>Getting Started</h2>

Ready to get started? Here's where to find useful scripts and functions:
<ul>
<li><a href="http://microjs.com/">Microjs</a></li>
<li><a href="http://stackoverflow.com/">StackOverflow</a></li>
<li><a href="https://gist.github.com/paulirish/">Paul Irish on GitHub</a></li>
<li><a href="http://toddmotto.com/">Todd Motto's blog</a></li>
</ul>

Slightly less useful than the others, but I've started adding <a href="https://gist.github.com/cferdinandi">the scripts and helper functions I use on GitHub</a> as well.

[snippet id="8397"]