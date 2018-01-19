---
categories:
- Code
date: '2013-03-18'
permalink: /using-fluidvids-js/
title: Using FluidVids.js
url: /2013/03/18/using-fluidvids-js
---

Today, I'm going to show to use FluidVids.js to make your YouTube and Vimeo videos (and more) responsive.
<!--more-->
<h2>Wait... huh?</h2>

I know what you're thinking: isn't that easy to do already? You can use this bit of code to make HTML5 videos responsive:

<pre><code class="language-css">video {
    max-width: 100%;
    height: auto;
}</code></pre>

When you try that with iframes, though, the sizing gets all messed up. Check out this short video from Dave Rupert <a href="http://vimeo.com/28523422">showing the problem in action...</a>

<iframe src="https://player.vimeo.com/video/28523422" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

For a while, I was using the <a href="http://fitvidsjs.com/">FitVids.js</a>, the awesome jQuery plugin Dave mentions in the video. FitVids.js is really, really awesome.

And the Todd Motto released <a href="http://toddmotto.com/fluid-and-responsive-youtube-and-vimeo-videos-with-fluidvids-js/">FluidVids.js</a>, which is even awesomer (yes, awesomer is a word).

<h2>Why FluidVids Rocks</h2>

FluidVids is written in vanilla JavaScript. It works with any JavaScript framework you want to use (or none at all). The minified version is less 1kb in size. You don't need to target or activate anything. Just add the script to your site and you're good to go.

What I like most about FluidVids, though, is that it's really easy to customize. Want to add SlideShare or Hulu or whatever? Super easy to do!

<h2>Getting Started</h2>

Getting started with FluidVids is really easy:

<ol>
<li><a href="http://toddmotto.com/fluid-and-responsive-youtube-and-vimeo-videos-with-fluidvids-js/">Download it.</a></li>
<li>Add the script to your site.</li>
<li>That's it!</li>
</ol>

<h3>Adding a Fallback</h3>

You don't <em>need</em> to do this, but I liked to add a fallback in case JavaScript isn't enabled or working.

If someone accesses your site from a small-screen device without JavaScript support, videos will extend beyond the page wrapper and mess up your layout. Here's the code I use:

<pre><code class="language-css">iframe {
    max-width: 100%;
}</code></pre>

Yes, that does look a lot like the code for fluid HTML5 video. The only difference is that I've left out <code class="language-css">height: auto;</code>.

If JavaScript isn't working, the iframe will be a normal width on bigger screens, and fluid on smaller ones, but the height won't change. Video containers will look a bit disproportionately tall, but the videos themselves will be normal proportioned and work just fine.

<h2>Adding Other Services</h2>

<em><strong>Note:</strong> FluidVids has been rewritten, and no longer requires you to hack the core code to add additional vendors.</em>

To add other services to FluidVids, open up the JavaScript file and find this line:

<pre><code class="language-javascript">var players = /www.youtube.com|player.vimeo.com/;</code></pre>

That's where you'll add URLs for other iframe services. The URL structure will vary by service, and the easiest way to find it is to get the embed URL for a service you'd like to add and look at the iframe <code class="language-markup">src</code>.

<h3>An Example</h3>

As an example, here's the embed code for a SlideShare presentation:

<pre><code class="language-markup">&lt;iframe src="http://www.slideshare.net/slideshow/embed_code/8049732?rel=0" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen webkitallowfullscreen mozallowfullscreen&gt;&lt;/iframe&gt;</code></pre>

The part we care about is <code class="language-markup">src="..."</code>. The "base" for the SlideShare embed code is <code class="language-markup">www.slideshare.net</code>. That's what we'll add to <code class="language-none">fluidvids.js</code>.

In <code class="language-none">fluidvids.js</code>, we'll add <code class="language-none">www.slideshare.net</code> to <code class="language-javascript">var players</code>, separated by a <code class="language-javascript">|</code>. Make sure that all of the player URLs are between the beginning and ending <code class="language-javascript">/</code> symbols. Here's the new code:

<pre><code class="language-javascript">var players = /www.youtube.com|player.vimeo.com|www.slideshare.net/;</code></pre>

Following this pattern, you can add any iframe embedding service you want to FluidVids.