---
categories:
- Code
date: '2012-11-19'
excerpt: Part of a series of tutorials on the free Go Mobile First WordPress theme.
title: Adding a header background to Go Mobile First
---

A few weeks ago, I released a free mobile-first starter theme for WordPress called <a href="http://cferdinandi.github.com/go-mobile-first/">Go Mobile First</a>. To help you use it, I'm writing a series of tutorials on how to make some common changes.

Today, we'll be adding a background color to the header.
<!--more-->
<h2>Getting Setup</h2>

Before we get started, there's a few things you'll need to do:
<ol>
<li>Download a good text editor. <a href="http://projects.gnome.org/gedit/">Gedit</a> is free, cross-platform, and works really well.</li>
<li>Install <a href="http://www.mamp.info/">MAMP</a> (or <a href="http://www.wampserver.com/">WAMP</a> if you use Windows). This will let us work locally so we don't mess up a live site. You can find really good instructions on <a href="http://wp.smashingmagazine.com/2011/09/28/developing-wordpress-locally-with-mamp/">setting up MAMP</a> on Smashing Magazine.</li>
<li>If you didn't install <a href="http://wordpress.org/">WordPress</a> as part of your MAMP setup, do that now.</li>
</ol>

<h3>Creating a Backup</h3>

Before we start working, save a copy of Go Mobile First and rename the folder "go-mobile-first-with-header-background." Then open up the style.css file and change the theme name to Go Mobile First with Header Background. If we mess anything up, you want it to be a copy, not the only version of your site.

Launch the WordPress admin panel and activate our "new" theme. Then, pull up the site.

Now, let's get to it!

<em><strong>Note:</strong> This tutorial is based on version 1.4 of Go Mobile First, which was the most recent version at time of writing.</em>

<h2>Adding a Background Color</h2>

For this tutorial, we'll be using the basic colors that come with the site:
<ul class="unstyled">
<li>Black: #272727</li>
<li>White: #ffffff</li>
</ul>

As you start to customize the theme over time, you can of course use whatever colors you'd like.

<h3>Adding a Wrapper Div</h3>

Open header.php. A little ways down, you'll see this bit of code:

<pre><code class="language-markup">&lt;!-- Start Header content. Sets max width for content and centers text. --&gt;
&lt;header class="container text-center"&gt;</code></pre>

This starts the header. The class container limits the content width to 640 pixels or less and centers it. We want to wrap this section in a background color.

Right before the <code class="language-markup">&lt;header&gt;</code> element, add this:

<pre><code class="language-markup">&lt;!-- Adds background color to navigation area --&gt;
&lt;div class="nav-wrap"&gt;</code></pre>

Right after the <code class="language-markup">&lt;/header&gt;</code> element, add:

<pre><code class="language-markup">&lt;/div&gt;&lt;!-- End Nav Wrap --&gt;</code></pre>

This creates a wrapper around the header that we will style with the background color. Click save and refresh your browser.

Nothing should happen. That's because we haven't added any styling to <code class="language-markup">nav-wrapper</code> yet.

<h3>Styling the Nav-Wrapper</h3>

Open style.css and scroll down to navigation section.

Before <code class="language-css">.logo:hover</code>, add this:

<pre><code class="language-css">/* Adds background color to navigation area */
.nav-wrap {
    background-color: #272727;
}</code></pre>

That sets the <code class="language-markup">nav-wrapper</code> background color to black.

Save and refresh your browser. The site should now look like this.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/header-background-color-1.jpeg" alt="" title="Screenshot of the header. It doesn't fill the whole width and the navigation and logo are not visible." width="560" height="258" class="aligncenter img-border size-full wp-image-3663" />

As you can see, there are a few issues:
<ol>
<li>It doesn't fill the whole width. Go Mobile First applies a 20 pixel padding to the left and right of the body. That's what's causing this.</li>
<li>The logo and navigation aren't visible.</li>
<li>The borders on the navigation, which add needed division on an all white design, look weird with the background.</li>
</ol>

Let's fix these.

<h2>Going Full Width</h2>

In style.css, under <code class="language-css">.nav-wrap</code>, add:
<pre><code class="language-css">margin-left: -20px;
margin-right: -20px;</code></pre>

The negative margin pulls the nav-wrap all the way to the edge and balances out the 20 pixel body padding. We also want to add 20 pixels of left and right padding inside the .nav-wrap, since the negative margins negate the body padding.

The final version of the code should look like this:

<pre><code class="language-css">/*
  Adds background color to navigation area.
  Negative margin pull background color to the edge.
  Padding balances out the negative margin.
*/
.nav-wrap {
    background-color: #272727;
    margin-left: -20px;
    margin-right: -20px;
    padding-left: 20px;
    padding-right: 20px;
}</code></pre>

Save and refresh your browser. The site should now look like this:

<img src="https://gomakethings.com/wp-content/uploads/2012/11/header-background-color-2.jpeg" alt="" title="A screenshot of the header with the background color spanning the full width" width="560" height="253" class="aligncenter img-border size-full wp-image-3668" />

Now we're getting somewhere! Next, let's tackle the invisible navigation.

<h2>Changing the Navigation Color</h2>

In the out-of-the-box version of Go Mobile First, navigation element colors are controlled by the muted class. Open header.php and remove <code class="language-css">muted</code> from all <code class="language-markup">nav</code> elements.

<code class="language-markup">&lt;ul class="nav muted responsive-nav"&gt;</code> becomes <code class="language-markup">&lt;ul class="nav responsive-nav"&gt;</code>. <code class="language-markup">&lt;ul class="nav muted"&gt;</code> becomes <code class="language-markup">&lt;ul class="nav"&gt;</code>.

Save and refresh your browser.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/header-background-color-3.jpeg" alt="" title="A screenshot of navigation links, which are default blue when inactive and black on hover." width="560" height="262" class="aligncenter img-border size-full wp-image-3671" />

As you can see, the <code class="language-markup">nav</code> elements are now the default link blue, and black on hover. We're getting there, but it's still not quite right.

<h3>Making Navigation Links White</h3>

We want the navigation links to be white, both when inactive and on hover. In style.css, after:

<pre><code class="language-css">/* Styling for nav elements that are links */
.nav > li > a {
 	float: none;
	/* Add padding between elements */
	padding: 10px 10px 11px;
}</code></pre>

Add:

<pre><code class="language-css">/* Overrides default link color for nav elements */
.nav > li > a,
.nav > li > a:hover {
    color: #ffffff;
}</code></pre>

Save and refresh your browser.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/header-background-color-4.jpeg" alt="" title="A screenshot of the header with white navigation links" width="560" height="253" class="aligncenter img-border size-full wp-image-3672" />

You can see they're now white, with the default underline on hover. Now let's remove the navigation border.

<h2>Removing the Navigation Border</h2>

Back in style.css, find <code class="language-css">.nav</code> and delete:

<pre><code class="language-css">/* Add gray lines above and below list */
border-top: 1px solid #e5e5e5;
border-bottom: 1px solid #e5e5e5;</code></pre>

In the default Go Mobile First themes, we remove the border from the collapsed navigation on smaller screens. Since that border no longer exists, we don't need to remove it for smaller screens.

Scroll down to the media queries section, and under <code class="language-css">@media (max-width: 680px)</code> delete:

<pre><code class="language-css">/* Remove the border elements from the nav menu */
.js .nav-mobile > .nav {
    border: none;
}</code></pre>

Save and refresh your browser.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/header-background-color-5.jpeg" alt="" title="A screenshot of the header on a small screen, with the nav expanded and no borders" width="560" height="360" class="aligncenter img-border size-full wp-image-3674" />

Looking much better. Of course, the logo is still invisible. Let's fix that next.

<h2>Changing the Logo Color</h2>

In style.css, find <code class="language-css">.logo:hover</code>. This controls the behavior for the logo link. Right now it's just adjusting the logo on hover state, so we need to add <code class="language-css">.logo</code>, before it. Your code should look like this:

<pre><code class="language-css">/* Overrides default link behavior for logo text. */
.logo,
.logo:hover {
	color: #272727;
	text-decoration: none;
}</code></pre>

We don't actually want the color to be black. We want it to be white. Replace <code class="language-css">#272727</code> with <code class="language-css">#ffffff</code>. Your code should now look like this:

<pre><code class="language-css">/* Overrides default link behavior for logo text. */
.logo,
.logo:hover {
	color: #ffffff;
	text-decoration: none;
}</code></pre>

Save and refresh your browser.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/header-background-color-6.jpeg" alt="" title="A screenshot of the header with a white logo" width="560" height="286" class="aligncenter img-border size-full wp-image-3676" />

Much better! One thing I noticed, though. The gap between the site description and the navigation seems a bit big. Let's decrease it.

<h2>Closing the Gap</h2>

In header.php, find this bit of code:

<pre><code class="language-markup">&lt;!-- Description of site with lightened text and bottom margin. --&gt;
&lt;p class="muted"&gt;
    &lt;?php bloginfo( 'description' ); // Insert site description ?&gt;
&lt;/p&gt;</code></pre>

We want to add the <code class="language-css">no-space-bottom</code> class to the paragraph element. As its name implies, this class sets the bottom margin and bottom padding of an HTML element to zero.

Your new code should look like this:

<pre><code class="language-markup">&lt;!-- Description of site with lightened text and bottom margin. --&gt;
&lt;p class="muted no-space-bottom"&gt;
    &lt;?php bloginfo( 'description' ); // Insert site description ?&gt;
&lt;/p&gt;</code></pre>

Save and refresh your browser. The site should now look like this.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/header-background-color-7.jpeg" alt="" title="A screenshot of the header with less space between the site description and the site navigation" width="560" height="265" class="aligncenter img-border size-full wp-image-3677" />

One last thing. The spacing below the navigation looks a bit tight now that there's a background color. Let's add a little breathing room.

<h2>Adding a Little Padding</h2>

In style.css, go to <code class="language-css">.nav-wrap</code>, and add <code class="language-css">padding-bottom: 14px;</code>.

Why 14 pixels? That's one of the numbers in our typographic scale, and it's used for spacing throughout this theme's design.

Your final code should look like this:

<pre><code class="language-css">/*
  Adds background color to navigation area.
  Negative margin pull background color to the edge.
  Padding balances out the negative margin.
*/
.nav-wrap {
    background-color: #272727;
    margin-left: -20px;
    margin-right: -20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 14px;
}</code></pre>

Save and refresh your browser. This is the finished product.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/header-background-color-8.jpeg" alt="" title="The header with a little extra space below the navigation" width="560" height="283" class="aligncenter img-border size-full wp-image-3678" />

<h2>Wrapping Up</h2>

You've just added a colored background to the Go Mobile First theme. Nice work!

To move these updates to your live site, upload the modified theme to your web server (if you use WordPress's built-in theme uploader, you'll need to zip the file first) and activate it.

If you got stuck anywhere along the way, you can <a href="https://github.com/cferdinandi/go-mobile-first/tree/gmf-with-header-bg">download the files from this tutorial on GitHub</a>.