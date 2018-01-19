---
categories:
- Code
date: '2013-07-01'
permalink: /petfinder-api-for-wordpress-2/
title: Petfinder API for WordPress 2
url: /2013/07/01/petfinder-api-for-wordpress-2
---

<a href="http://cferdinandi.github.io/petfinder-api-for-wordpress/">Petfinder API for WordPress</a> got a major overhaul.

This toolkit was previously a complete plug-and-play solution modeled after <a href="https://gomakethings.com/projects/petfinder-api/">my work with PAWS New England</a>. Great for folks who just wanted to something up and running, but really difficult for developers who wanted to create custom solutions for their clients.

Since there's already <a href="http://wordpress.org/extend/plugins/petfinder-listings/">a great plugin</a> for folks who need something that just works, I redesigned Petfinder API for WordPress as a toolkit for developers.
<!--more-->
<h2>What's Included?</h2>

Petfinder for WordPress contains a handful of functions to help you quickly integrate Petfinder into your site:

<ul>
<li class="space-bottom-small"><strong>An API feed</strong> to pull in your Petfinder data.</li>
<li class="space-bottom-small"><strong>Conversions.</strong> Change the default Petfinder values into descriptive, human-readable text (ex. "Small" instead of "S").</li>
<li class="space-bottom-small"><strong>A photo fetcher.</strong> Control the number and size of the photos, and display them easily with a simple function call.</li>
<li class="space-bottom-small"><strong>Pet name cleanup.</strong> Remove weird characters from pet names.</li>
<li class="space-bottom-small"><strong>Pet description cleanup.</strong> Remove the formatting and empty tags that get added by WYSIWYG editors.</li>
<li><strong>A value condensor.</strong> Convert multi-word strings into single-word values that can be used as classes (useful for filtering pets with JavaScript).</li>
<li class="space-bottom-small"><strong>Lists.</strong> Dynamically generate lists of all available animal types, breeds, sizes, ages, genders, and options.</li>
<li class="space-bottom-small"><strong>Pet info.</strong> Grab key info, photos, descriptions and a link to their Petfinder profile for each pet in your shelter.</li>
<li class="space-bottom-small"><strong>A shortcode.</strong> Display all of the info you want to share with a simple shortcode.</li>
</ul>

If you need to integrate the Petfinder API into WordPress, go <a href="http://cferdinandi.github.io/petfinder-api-for-wordpress/">grab the toolkit on GitHub</a>.