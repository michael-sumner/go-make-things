---
categories:
- Code
date: '2012-11-26'
excerpt: Part of a series of tutorials on the free Go Mobile First WordPress theme.
permalink: /adding-a-sidebar-to-go-mobile-first/
title: Adding a sidebar to Go Mobile First
url: /2012/11/26/adding-a-sidebar-to-go-mobile-first
---

About a month ago, I released a free mobile-first starter theme for WordPress called <a href="http://cferdinandi.github.com/go-mobile-first/">Go Mobile First</a>. To help you use it, I'm writing a series of tutorials on how to make some common changes.

Today, we'll be adding a sidebar to Go Mobile First.
<!--more-->
<h2>Getting Setup</h2>

Before we get started, there's a few things you'll need to do:
<ol>
<li>Download a good text editor. <a href="http://projects.gnome.org/gedit/">Gedit</a> is free, cross-platform, and works really well.</li>
<li>Install <a href="http://www.mamp.info/">MAMP</a> (or <a href="http://www.wampserver.com/">WAMP</a> if you use Windows). This will let us work locally so we don't mess up a live site. You can find really good instructions on <a href="http://wp.smashingmagazine.com/2011/09/28/developing-wordpress-locally-with-mamp/">setting up MAMP</a> on Smashing Magazine.</li>
<li>If you didn't install <a href="http://wordpress.org/">WordPress</a> as part of your MAMP setup, do that now.</li>
</ol>

<h3>Creating a Backup</h3>

Before we start working, save a copy of Go Mobile First and rename the folder "go-mobile-first-with-sidebar." Then open up the style.css file and change the theme name to Go Mobile First with Sidebar. If we mess anything up, you want it to be a copy, not the only version of your site.

Launch the WordPress admin panel and activate our "new" theme. Then, pull up the site.

Now, let's get to it!

<em><strong>Note:</strong> This tutorial is based on version 1.4 of Go Mobile First, which was the most recent version at time of writing.</em>

<h2>Starting with Mobile First</h2>

First, let's sketch out how we want the site to look on small screens, and then how we'll enhance it for bigger screens.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/mockup.jpg" alt="" title="A sketch of the layout on small and big screens" width="640" height="519" class="aligncenter size-full wp-image-3773" />

On small screens, we'll keep our single column layout. The sidebar will appear below the body content but above the footer.

On bigger screens, the content will float to the left, and the sidebar will float to the right.

<h2>Adding a Sidebar to the HTML</h2>

Create a new file in your text editor and save it to the Go Mobile First with Sidebar folder under the name sidebar.php. This is the name WordPress uses to for the sidebar template.

For now, write <code class="language-markup">&lt;p&gt;This is the sidebar&lt;/p&gt;</code> and save the file. We'll come back and add real content later.

We need to refer to the sidebar template in all of the locations where we want it to appear. Those include:
<ul>
<li>The archive of posts by category, tag, etc. (archive.php)</li>
<li>The landing page (index.php)</li>
<li>Individual pages (page.php)</li>
<li>Individual posts (single.php)</li>
</ul>

Open up each of those files in your text-editor and locate <code class="language-php">&lt;?php get_footer(); // Pulls in the footer.php template ?&gt;</code>. Just above that bit of code, add:

<pre><code class="language-php">&lt;?php get_sidebar(); // Pulls in the sidebar.php template ?&gt;</code></pre>

As the comment says, this pulls in the sidebar template. Save each of the files, and refresh your browser. Down at the bottom of your site, you should see this:

<img src="https://gomakethings.com/wp-content/uploads/2012/11/sidebar1.jpg" alt="" title="A screenshot of the sidebar" width="640" height="178" class="aligncenter img-border size-full wp-image-3765" />

It's not much to look at just yet, but that's ok. We just need to add some styling.

<h2>Defining the Structure</h2>

On small screen, we want the sidebar to appear down at the footer, but on bigger screens, we want it to float to the right.

We'll need to make some updates to our stylesheet. Open up style.css.

We don't need to change our mobile-first base styles, so scroll down to the Media Queries section and locate:

<pre><code class="language-css">/* For screens greater than 680 pixels in width */
@media (min-width: 681px) {</code></pre>

On bigger screens, we're going to reset the <code class="language-css">.container</code> width to 960 pixels. Since our articles and pages aren't the only content on the page anymore, we'll need to add a new structure calls to set the width for the main content section, as well as a new class to set the width for the sidebar.

At the top of this section, add the following code:

<pre><code class="language-css">/*
    A fixed width on bigger screens.
    Set the container width to 960 pixels.
    We need to reset max-width to match.
*/
.container {
    width: 960px;
    max-width: 960px;
}

/* Set width of main content area and float to the left */
.main {
    width: 640px;
    float: left;
}

/* Set width of sidebar and float to the right */
.aside {
    width: 260px;
    float: right;
}</code></pre>

Save and refresh your browser.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/sidebar2.jpg" alt="" title="A screenshot of the site with a really wide section of content" width="640" height="256" class="aligncenter img-border size-full wp-image-3766" />

You should notice that your site content is now really wide. That's because we haven't added these new classes to the HTML yet.

<h2>Adding Structure to the HTML</h2>

Let's start with the sidebar.

Open up sidebar.php. We're going to wrap the content in <code class="language-markup">&lt;aside class="aside"&gt;</code> and <code class="language-markup">&lt;/aside&gt;</code>. Aside is one of the new semantic divs in HTML5. While you can style these elements directly, we use this div for several other things in Go Mobile First, so we'll use the <code class="language-markup">aside</code> class to style it.

Your sidebar.php file should look like this:

<pre><code class="language-markup">&lt;aside class="aside"&gt;

    &lt;p&gt;This is the sidebar&lt;/p&gt;

&lt;/aside&gt;</code></pre>

Next, open up index.php. Below <code class="language-php">&lt;?php get_header(); // Pulls in the header.php template ?&gt;</code>, add <code class="language-markup">&lt;div class="main"&gt;</code>. At the bottom of the page above <code class="language-php">&lt;?php get_sidebar(); // Pulls in the sidebar.php template ?&gt;</code>, add <code class="language-markup">&lt;/div&gt;</code>.

Your code should look like this:

<pre><code class="language-php">&lt;?php get_header(); // Pulls in the header.php template ?&gt;

&lt;!-- This is the template for the page that displays all of your blog posts --&gt;

&lt;div class="main"&gt;

    &lt;!-- A BUNCH OF PAGE CONTENT --&gt;

&lt;/div&gt;

&lt;?php get_sidebar(); // Pulls in the sidebar.php template ?&gt;

&lt;?php get_footer(); // Pulls in the footer.php template ?&gt;</code></pre>

Save and refresh your browser. Your site should now look like this:

<img src="https://gomakethings.com/wp-content/uploads/2012/11/sidebar3.jpg" alt="" title="A screenshot of the site with the sidebar floating to the right and the content floating to the left" width="640" height="257" class="aligncenter img-border size-full wp-image-3767" />

Now repeat the process you used with index.php on archive.php, single.php, and page.php.

<h2>Clearing Floats</h2>

You may notice there's a random line next to the sidebar. That's an issue cause by the <code class="language-css">float: left</code> and <code class="language-css">float: right</code> properties on the <code class="language-css">.main</code> and <code class="language-css">.aside</code> sections. The border on the footer is wrapping around the main content section.

The <code class="language-css">.container</code> section clears floats, but it's called after the footer. Let's fix that.

In footer.php, there's this snippet of code:

<pre><code class="language-markup">&lt;/section&gt;&lt;!-- End the main section (started in the header) --&gt;</code></pre>

This ends the <code class="language-markup">&lt;section class="container"&gt;</code> div that's started in the header. Cut-and-paste to the top of the footer.php template. This will end that section and clear floats before the footer starts.

However, this also means there's no container around the footer content anymore so let's add one. You code should now look like this:

<pre><code class="language-markup">&lt;/section&gt;&lt;!-- End the main section (started in the header) --&gt;

    &lt;!-- Start the footer section. Class tags center and lighten text, and reduce font size. --&gt;
    &lt;footer class="container small muted text-center"&gt;</code></pre>

Save and refresh your browser. This is what you should see:

<img src="https://gomakethings.com/wp-content/uploads/2012/11/sidebar4.jpg" alt="" title="A screenshot of the sidebar with the floating border issue fixed" width="640" height="209" class="aligncenter img-border size-full wp-image-3768" />

Viola! No more line.

<h2>Adjusting the Break Point</h2>

If you decrease the size of your browser, you'll notice that a lot of content moves offscreen before the site shifts to the fluid base layout. That's because the <code class="language-css">min-width</code> parameter on the media query is based on a 640 pixel wide site, not a 960 pixel one.

Accounting for 20 pixels of padding on each side, the new breakpoint should be 1001 pixels - 960 pixels plus 40 pixels plus 1 pixel more than the largest size for base styles.

Update the media query so that it looks like this:

<pre><code class="language-css">/* For screens greater than 1,000 pixels in width */
@media (min-width: 1001px) {</code></pre>

Save and refresh your browser. If you decrease the size of your browser window, the site should now resize itself correctly.

<h2>Finishing Touches</h2>

On smaller screens, the sidebar content blends in to the main content section. Let's add a top-border that only appears on small screens.

First, open up style.css. Under <code class="language-css">@media (min-width: 1001px)</code>, let's add a new class we can use to hide items on big screens:

<pre><code class="language-css">.hide-big-screens {
    display: none;
}</code></pre>

Add that snippet after the <code class="language-css">.alignright</code> styling, and then open up sidebar.php. Just after <code class="language-markup">&lt;aside class="aside"&gt;</code>, add:

<pre><code class="language-markup">&lt;hr class="hide-big-screens"&gt;</code></pre>

This inserts a line that's hidden on screens that are bigger than 1,000 pixels. Save and refresh your browser.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/sidebar5.jpg" alt="" title="A screenshot of the sidebar with a top-border on small screens" width="640" height="201" class="aligncenter img-border size-full wp-image-3769" />

You may notice that on bigger screens the sidebar text appears to be a bit higher than the main content. That's because <code class="language-markup">h1</code> tags have a top-padding of 14 pixels. To line things up nicely, add the <code class="language-css">.padding-top</code> class, which adds 14 pixels of top padding, to the <code class="language-markup">aside</code> div:

<pre><code class="language-markup">&lt;aside class="aside padding-top"&gt;</code></pre>

Save and refresh your browser. The sidebar content should now be lined up with the content in the main section.

<h2>Switching Sides</h2>

Rather have your sidebar on the left? That's easy.

We still want it to appear below the main section on smaller screens, so we don't even need to touch the HTML. We'll just switch the floats on bigger screens.

Open up style.css and locate this bit of code:

<pre><code class="language-css">/* Set width of main content area and float to the left */
.main {
    width: 640px;
    float: left;
}

/* Set width of sidebar and float to the right */
.aside {
    width: 260px;
    float: right;
}</code></pre>

We're simply going to switch <code class="language-css">.main</code> to <code class="language-css">float: right</code> and <code class="language-css">.aside</code> to <code class="language-css">float: left</code>, like this:

<pre><code class="language-css">/* Set width of main content area and float to the right */
.main {
    width: 640px;
    float: right;
}

/* Set width of sidebar and float to the left */
.aside {
    width: 260px;
    float: left;
}</code></pre>

Save and refresh your browser. And that's that.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/sidebar6.jpg" alt="" title="A screenshot fo the site with the content floating to the right and the sidebar floating to the left" width="640" height="204" class="aligncenter img-border size-full wp-image-3770" />

<h2>Wrapping Up</h2>

You've now added a sidebar to the Go Mobile First theme. Nice work!

To move these updates to your live site, upload the modified theme to your web server (if you use WordPress's built-in theme uploader, you'll need to zip the file first) and activate it.

If you got stuck anywhere along the way, you can <a href="https://github.com/cferdinandi/go-mobile-first/tree/gmf-with-sidebar">download the files from this tutorial on GitHub</a>.