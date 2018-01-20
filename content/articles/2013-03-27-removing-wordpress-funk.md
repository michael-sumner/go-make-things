---
categories:
- Code
date: '2013-03-27'
url: /removing-wordpress-funk/
title: Removing WordPress Funk
---

In "<a href="https://gomakethings.com/code-is-craft/">I Can Smell Your CMS</a>," Phil Hawksworth explains how well meaning CMS's can add all sorts of funk to the code we've worked so hard to craft.

Today, I want to share a few simple things you can do to remove CMS funk from WordPress sites.

<em>This post was updated on April 23, 2013 with additional funk-removing techniques.</em>
<!--more-->
<h2>WordPress Funk</h2>

I manage the <a href="http://www.pawsnewengland.com">PAWS New England website</a>, but volunteers manage the blog.

The WordPress visual editor makes it really easy for them to share news about the organization on the site. It also adds lots of inline styling that overrides default design choices, and empty paragraphs and spans that clutter up the HTML. These things don't just look ugly. They hurt site performance and impact Google search rankings.

It's not the volunteers' fault. It's the CMS's.

<h2>The Funk Fix</h2>

Fortunately, there's a few simple things you can do to remove CMS funk from WordPress.

The following snippet of PHP will remove inline styling, <code class="language-markup">font</code> tags, and empty <code class="language-markup">p</code> and <code class="language-markup">span</code> elements from the CMS content. Add it to your <code>functions.php</code>.

<pre><code class="language-php">/* ======================================================================
 * Disable-Inline-Styles.php
 * Removes inline styles and other coding junk added by the WYSIWYG editor.
 * Script by Chris Ferdinandi - https://gomakethings.com
 * ====================================================================== */

add_filter( 'the_content', 'clean_post_content' );
function clean_post_content($content) {

    // Remove inline styling
    $content = preg_replace('/(&lt;[^&gt;]+) style=".*?"/i', '$1', $content);

    // Remove font tag
    $content = preg_replace('/&lt;font[^&gt;]+&gt;/', '', $content);

    // Remove empty tags
    $post_cleaners = array('&lt;p&gt;&lt;/p&gt;' =&gt; '', '&lt;p&gt; &lt;/p&gt;' =&gt; '', '&lt;p&gt;&amp;nbsp;&lt;/p&gt;' =&gt; '', '&lt;span&gt;&lt;/span&gt;' =&gt; '', '&lt;span&gt; &lt;/span&gt;' =&gt; '', '&lt;span&gt;&amp;nbsp;&lt;/span&gt;' =&gt; '', '&lt;span&gt;' =&gt; '', '&lt;/span&gt;' =&gt; '', '&lt;font&gt;' =&gt; '', '&lt;/font&gt;' =&gt; '');
    $content = strtr($content, $post_cleaners);

    return $content;
}</code></pre>

This script doesn't actually remove those elements from the content in the database. Instead, it filters them out as it renders the content into an HTML page.

<h3>Only Removing Post Funk</h3>

For the PAWS site, I use use inline <code class="language-markup">span</code> elements to apply classes on other pages (things like <code class="language-css">.text-tall</code> or <code class="language-css">.text-small</code>). The code above would remove those tags on pages, too.

Here's the code I use instead to only remove funk from blog posts:

<pre><code class="language-php">/* ======================================================================
 * Disable-Inline-Styles.php
 * Removes inline styles and other coding junk added by the WYSIWYG editor.
 * Script by Chris Ferdinandi - https://gomakethings.com
 * ====================================================================== */

add_filter( 'the_content', 'clean_post_content' );
function clean_post_content($content) {

    // For individual posts and the index page
    if ( is_single() || is_home() ) {

        // Remove inline styling
        $content = preg_replace('/(&lt;[^&gt;]+) style=".*?"/i', '$1', $content);

        // Remove font tag
        $content = preg_replace('/&lt;font[^&gt;]+&gt;/', '', $content);

        // Remove empty tags
        $post_cleaners = array('&lt;p&gt;&lt;/p&gt;' =&gt; '', '&lt;p&gt; &lt;/p&gt;' =&gt; '', '&lt;p&gt;&amp;nbsp;&lt;/p&gt;' =&gt; '', '&lt;span&gt;&lt;/span&gt;' =&gt; '', '&lt;span&gt; &lt;/span&gt;' =&gt; '', '&lt;span&gt;&amp;nbsp;&lt;/span&gt;' =&gt; '', '&lt;span&gt;' =&gt; '', '&lt;/span&gt;' =&gt; '', '&lt;font&gt;' =&gt; '', '&lt;/font&gt;' =&gt; '');
        $content = strtr($content, $post_cleaners);

    }

    return $content;
}</code></pre>


<h2>Auto-Linking Image Funk</h2>

By default, WordPress wraps images added with the editor in a link to the image source. If someone accidentally clicks on the image, it can be a jarring user experience.

You can disable this pretty easily in the editor itself, but people using the visual editor don't always know to do so. You can teach them how, but having to do that for everyone who uses the site can be a bit annoying.

Add this snippet to your <code>functions.php</code> file to change the default. It doesn't disable linking entirely - users can still add links manually later if they want to.

<pre><code class="language-php">/* ======================================================================
 * Image-URL-Default.php
 * Overrides default image-URL behavior
 * http://wordpress.org/support/topic/insert-image-default-to-no-link
 * ====================================================================== */

update_option('image_default_link_type','none');</code></pre>

Funk fixed!

<h4>Bonus Funk Fixes</h4>

<ol>
<li><a href="https://gomakethings.com/remove-junk-from-the-wordpress-header/">Remove WordPress header junk</a></li>
<li><a href="https://gomakethings.com/how-to-remove-trackbacks-from-your-wordpress-comments/">Remove trackbacks from WordPress comments</a></li>
</ol>