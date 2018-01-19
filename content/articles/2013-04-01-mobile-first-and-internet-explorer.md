---
categories:
- Code
date: '2013-04-01'
permalink: /mobile-first-and-internet-explorer/
title: Mobile First and Internet Explorer
url: /2013/04/01/mobile-first-and-internet-explorer
---

Mobile first web design extends progressive enhancement to site layout. But because Internet Explorer 8 and lower do not recognize media queries, they get the small screen layout instead of the bigger screen version on mobile-first designs.

Fortunately, there's a pretty simple fix that allows you to code mobile first <em>and</em> provide a bigger screen experience for older IE browsers.
<!--more-->
<h2>What is mobile first?</h2>

Mobile first, from a coding perspective, means that your base style is typically a single-column, fully-fluid layout. You use <code class="language-css">@media (min-width: whatever)</code> to add a grid-based layout on top of that.

The alternative - desktop first - involves starting with a wide, grid-based layout, and using <code class="language-css">@media (max-width: whatever)</code> to scale down to a single-column layout.

<h2>Why mobile first?</h2>

iPhone and Android browsers are quite capable, but older smart phones, feature phones and other small-screen devices like gaming consoles may not support media queries.

Imagine trying to read tiny text in a big screen layout on an old, underpowered feature phone.

Mobile first web design extends progressive enhancement to site layout, allowing you to serve simple, readable content to all devices, and layer on structure and presentation for more capable devices.

<h2>Mobile first and Internet Explorer</h2>

Unfortunately, Internet Explorer 8 and older don't recognize media queries. That means, they get the base, small screen version of a mobile first website instead of the bigger screen version.

That may work well for simple, content-based sites, but it may not always be acceptable for certain designs.

Fortunately, there's a pretty simple fix that allows you to code mobile first <em>and</em> provide a bigger screen experience for older IE browsers.

<h3>A Conditional IE Class</h3>

We're going to add a conditional <code class="language-css">.ie</code> class to our <code class="language-markup">html</code> element just for older Internet Explorer browsers. This will let us add some conditional styling later that only applies to those browsers.

Replace the <code class="language-markup">html</code> element with this code:

<pre><code class="language-markup">&lt;!-- Conditional class for older versions of IE --&gt;
&lt;!--[if lt IE 9 & !IEMobile]&gt;&lt;html class="ie" lang="en"&gt;&lt;![endif]--&gt;
&lt;!--[if gt IE 8 | IEMobile]&gt;&lt;!--&gt;&lt;html lang="en"&gt;&lt;!--&lt;![endif]--&gt;</code></pre>

Why the <code class="language-markup">html</code> and not the <code class="language-markup">body</code>? A lot of JavaScript functions target the <code class="language-markup">body</code> element. This helps avoid any conflicts.

You'll also notice that we're not adding the <code class="language-css">.ie</code> class to IE Mobile browsers. Those are typically on small screen devices, so we want them to receive the small screen layout.

<h3>Adding Conditional CSS</h3>

Rather than serving a conditional IE stylesheet, we'll be adding a few IE specific modifications to our main stylesheet. It makes it easier (for me, anyways) to keep track of things when I make changes and updates.

Let's say I'm using a simple three-column grid (adapted from the <a href="http://cferdinandi.github.com/kraken/">Kraken boilerplate</a>) like this:

<pre><code class="language-css">@media (min-width: 40em) {

    .row {
        margin-left: -1.515151515152%;
        margin-right: -1.515151515152%;
    }

    [class^="grid-"],
    [class*=" grid-"] {
        float: left;
        width:96.969696969697%;
        margin-left: 1.515151515152%;
        margin-right: 1.515151515152%;
    }

    .grid-third {
        width: 30.30303030303%;
    }

    .grid-half {
        width: 46.969696969697%;
    }

    .grid-two-thirds {
        width: 63.636363636364%;
    }

}</code></pre>

To make that work in Internet Explorer 8 and lower but still serve a mobile first layout, I would copy-and-paste the content outside of the media query, and prefix each class with <code class="language-css">.ie</code>.

Here's what the example above would look like:

<pre><code class="language-css">@media (min-width: 40em) {

    .row {
        margin-left: -1.515151515152%;
        margin-right: -1.515151515152%;
    }

    [class^="grid-"],
    [class*=" grid-"] {
        float: left;
        width:96.969696969697%;
        margin-left: 1.515151515152%;
        margin-right: 1.515151515152%;
    }

    .grid-third {
        width: 30.30303030303%;
    }

    .grid-half {
        width: 46.969696969697%;
    }

    .grid-two-thirds {
        width: 63.636363636364%;
    }

}

.ie .row {
    margin-left: -1.515151515152%;
    margin-right: -1.515151515152%;
}

.ie [class^="grid-"],
.ie [class*=" grid-"] {
    float: left;
    width:96.969696969697%;
    margin-left: 1.515151515152%;
    margin-right: 1.515151515152%;
}

.ie .grid-third {
    width: 30.30303030303%;
}

.ie .grid-half {
    width: 46.969696969697%;
}

.ie .grid-two-thirds {
    width: 63.636363636364%;
}</code></pre>

Now all devices will be served the mobile first layout, and older Internet Explorer browsers will get the bigger screen styling.

Follow this format for any bigger screen content that you want to work on IE8 and lower.

<h2>What about Respond.js?</h2>

A few folks, both in the comments and on Twitter, have pointed out that <a href="https://github.com/scottjehl/Respond">Respond.js</a>, a cool little script from Scott Jehl, takes care of all this without you having to write a single extra line of code. Why don't I just that?

In a word: control. As Scott notes in the documentation:

<blockquote>As you might guess, this implementation is quite dumb in regards to CSS parsing rules. This is a good thing, because that allows it to run really fast, but its looseness may also cause unexpected behavior.</blockquote>

There are enough things that go wrong when dealing with older browsers. Adding another dependency that have little control over just doesn't sit well with me. But a lot of people like and use <a href="https://github.com/scottjehl/Respond">Respond.js</a>, so I thought it was at least worth mentioning.

<em>This section was added on December 14, 2013.</em>

<h2>Things to consider</h2>

Does it add bloat to your code? A little. Is it a pain? Yep.

It's worth considering whether or not providing the small screen layout is "good enough" for older Internet Explorer browsers before going down this path.