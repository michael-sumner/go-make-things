---
categories:
- Code
date: '2013-01-16'
url: /jquery-wordpress/
title: jQuery &#038; WordPress
---

Using jQuery in WordPress can be a tad tricky. WordPress actually comes with a version of jQuery built-in, though it's not necessarily the most recent version and it doesn't automatically get loaded for people who visit your site.

Today, I want to show you how to replace the built-in version of jQuery with a CDN hosted version. I'll also show you an easy way to load your own javascript files in the footer for better performance.

<em><strong>Note:</strong> This article was updated on March 3, 2013 to include HTTPS support.</em>

<em><strong>Updated on August 15, 2013:</strong> I've since switched to using <a href="https://gist.github.com/wpsmith/4083811">this snippet of code</a> from Travis Smith instead. It uses the Google CDN version of jQuery, but falls back to the local version built into WordPress if it fails.</em>


<h2>Using a CDN hosted version of jQuery</h2>

Here's the snippet of code you need to add to your <code>functions.php</code> file...

<pre><code class="language-php">// Create the my_scripts_method function
function my_scripts_method() {
    // Deregister the built-in version of jQuery
    wp_deregister_script('jquery');
    // Register a CDN hosted version. If browsing on a secure connection, use HTTPS.
    wp_register_script('jquery', 'http' . ($_SERVER['SERVER_PORT'] == 443 ? 's' : '') . '://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js', false, null, true);
    // Activate the jQuery script
    wp_enqueue_script('jquery');
}
// Tell WordPress to run the my_scripts_method function
add_action('wp_enqueue_scripts', 'my_scripts_method');</code></pre>

You're doing a few things in the above code. First, you're creating a function named <code class="language-php">my_scripts_method</code>. In that function, you're deregistering the built-in version of jQuery, and then registering the version Google hosts in its place.

Finally, you're telling WordPress to activate that version. The <code class="language-php">add_action</code> script tells WordPress to run the function you've created.

<h2>Adding your personal javascript file</h2>

If you're loading jQuery on your site, chances are you're running your own javascript plugins. If those are going to be used throughout the site, it's a good idea to put them in an external file that can be cached by browsers for faster loading.

You can use the <code class="language-php">my_scripts_method</code> function above to do that, too. We'll be adding the following pieces of code to the function above:

<pre><code class="language-php">wp_register_script('my-js', get_template_directory_uri() . '/YOUR-JS-PATH.js', false, null, true);
wp_enqueue_script('my-js');</code></pre>

I host my javascript files in a subfolder of my theme files. <code class="language-php">get_template_directory_uri()</code> references my theme URL. If you include your javascript file elsewhere, change the URL accordingly. The remainder of the path is the subfolder and file name. On my site, that section is written as <code class="language-php">get_template_directory_uri() . '/js/gmt.js'</code>.

You'll notice that at the end of the registration snippet, it says "true." This variable determines whether or not the file will be included in the footer. I have mine set to true, because footer loading is better for performance. If your file needs to be loaded in the header, change it to "false" or remove it altogether (false is the default).

Here's what the final version of the function should look like.

<pre><code class="language-php">// Create the my_scripts_method function
function my_scripts_method() {
    // Deregister the built-in version of jQuery
    wp_deregister_script('jquery');
    // Register a CDN hosted version. If browsing on a secure connection, use HTTPS.
    wp_register_script('jquery', 'http' . ($_SERVER['SERVER_PORT'] == 443 ? 's' : '') . '://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js', false, null, true);
    // Activate the jQuery script
    wp_enqueue_script('jquery');
    // Register your javascript file
    wp_register_script('my-js', get_template_directory_uri() . '/YOUR-JS-PATH.js', false, null, true);
    // Activate your javascript file
    wp_enqueue_script('my-js');
}
// Tell WordPress to run the my_scripts_method function
add_action('wp_enqueue_scripts', 'my_scripts_method');</code></pre>
