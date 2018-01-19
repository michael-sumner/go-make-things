---
categories:
- Code
date: '2013-01-23'
permalink: /how-to-highlight-the-current-page-in-your-navigation-on-wordpress/
title: How to highlight the current page in your navigation on WordPress
url: /2013/01/23/how-to-highlight-the-current-page-in-your-navigation-on-wordpress
---

You may have noticed that some websites will highlight the page you're currently on in the site navigation. This is a nice usability technique so that people always know where on a site they are.

This is actually really easy to do in WordPress using a simple trick I picked up from Chris Coyier a few years ago. Here's the technique: We'll assign each page and each navigation link a unique ID, and when they match, we'll add styling.

<em><strong>Update:</strong> There's actually a simpler and more elegant way to do this than what I describe here. <a href="http://www.toddmotto.com/highlight-your-current-page-with-wordpress-conditionals">Check out this great tutorial from Todd Motto.</a></em>

Let's look at how it works...
<!--more-->
<h2>Create an ID for the page</h2>

The first thing we'll do is add a snippet of PHP to the <code class="language-php">header.php</code> file that will create a unique ID for each page.

<pre><code class="language-php">&lt;?php
    $page = $_SERVER['REQUEST_URI'];
    $page = str_replace("/","",$page);
    $page = str_replace(".php","",$page);
    $page = $page ? $page : 'default'
?&gt;</code></pre>

This creates a variable and assigns it a value equal to the page slug. So if the page your on is www.my-site.com/about, then the value of $page will be "about." It assigns the home page a value of "default."

<h2>Add an ID to your page</h2>

Next, we need to add an ID to each page. We'll use this snippet to do that...

<pre><code class="language-markup">id="&lt;?php echo $page ?&gt;"</code></pre>

I add this to my <code class="language-markup">&lt;header&gt;</code> element, but you can also add it to the <code class="language-markup">&lt;body&gt;</code> element instead. The ID will match the page URL.

<h2>Add an ID to your navigation links</h2>

Next, we need to add an ID to each navigation link.

For ease, I use the prefix "nav-" and match the rest of the ID to the URL. For example, the About page navigation link has an ID of <code class="language-markup">id="nav-about"</code>.

Here's what a simple navigation menu using this technique might look like...

<pre><code class="language-markup">&lt;ul&gt;
	&lt;li&gt;&lt;a id="nav-home" href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
	&lt;li&gt;&lt;a id="nav-about" href="/about/"&gt;About&lt;/a&gt;&lt;/li&gt;
	&lt;li&gt;&lt;a id="nav-search" href="/search/"&gt;Search&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>

<h2>Add styling to your CSS</h2>

The last step is to adding styling to the CSS file. In this example, we'll simply underline the navigation element that matches the current page, though you can do a lot more here. Since I have a dedicated search page, I also want search results to highlight the search navigation link as well.

<pre><code class="language-css">#default #nav-home,
#about #nav-about,
#search #nav-search,
[id^="?s"] #nav-search {
    text-decoration: underline;
}</code></pre>

This tells browsers that if the ID "nav-home" is a sub-element of a section with the ID "default," or "nav-about" is a sub-element of a section with the ID "about," and so on, that it should apply an underline to the element.

Searches in WordPress generate a URL that starts with "?s." <code class="language-css">[id^="?s"] #nav-search</code> says that if "#nav-search" is a sub-element of a section with an ID that starts with "?s" (it can contain any text after it), then apply the styling.

You could take a similar approach for category pages, individual blog posts, and more. If you're not sure what the ID or ID prefix is, publish your site with the page ID code, and then view source.

<h2>Combined Code</h2>

Here's a very simplified version of the code altogether on a single page...

<pre><code class="language-markup">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Page Title&lt;/title&gt;

    &lt;style&gt;
        #default #nav-home,
        #about #nav-about,
        #search #nav-search,
        [id^="?s"] #nav-search {
            text-decoration: underline;
        }
    &lt;/style&gt;
&lt;/head&gt;

&lt;?php
    if (is_single()) {
        $prefix = 'page';
    }
    $page = $_SERVER['REQUEST_URI'];
    $page = str_replace("/","",$page);
    $page = str_replace(".php","",$page);
    $page = $page ? $page : 'default'
?&gt;

&lt;body id="&lt;?php echo $page ?&gt;"&gt;

    &lt;h1&gt;Blog Title&lt;/h1&gt;
    &lt;ul&gt;
        &lt;li&gt;&lt;a id="nav-home" href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a id="nav-about" href="/about/"&gt;About&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a id="nav-search" href="/search/"&gt;Search&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;

    Page Content

&lt;/body&gt;
&lt;/html&gt;</code></pre>

Obviously in WordPress the header, footer and body content would be in their respective templates, and the CSS would be in it's own file. But hopefully this makes it a bit easier to see how it all works.