---
categories:
- Code
date: '2012-11-12'
excerpt: Part of a series of tutorials on the free Go Mobile First WordPress theme.
permalink: /the-go-mobile-first-style-guide/
title: The Go Mobile First Style Guide
url: /2012/11/12/the-go-mobile-first-style-guide
---

A few weeks ago, I released a free mobile-first starter theme for WordPress called <a href="http://cferdinandi.github.com/go-mobile-first/">Go Mobile First</a>. To help you use it, I'm writing a series of tutorials on how to make some common changes.

This article looks at the styles in the Go Mobile First stylesheet and how they're used.
<!--more-->
<h2>OOCSS</h2>

Go Mobile First loosely applies the principles of <a href="https://github.com/stubbornella/oocss/wiki/faq">Object Oriented CSS</a> (OOCSS):
<ol>
<li>Separate the structure from the content.</li>
<li>Don't repeat yourself (DRY).</li>
</ol>

Whenever possible, I use unnested, general purposes classes. This had led to fewer cross-browser issues and CSS that is more lightweight and easily maintainable.

For example, rather than writing:

<pre><code class="language-css">#footer {
    font-size: 15px;
}</code></pre>

I have a class for smaller fonts:

<pre><code class="language-css">.small {
    font-size: 15px;
}</code></pre>

This get's applied to both footer content and other pieces of text that I'd like to make smaller than the body copy. Simpler, more reusable code.

I'm more pragmatic than I am strict - for example, it's more practical for me to apply a <code class="language-css">top-padding</code> to my header elements than to use <code class="language-css">class="padding-top"</code> on every header in my HTML - but overall, OOCSS has made my life easier.

Now, let's look at the styles used in Go Mobile First.

<h2>The Reset</h2>

Right now the web design community is split between using a <a href="http://meyerweb.com/eric/tools/css/reset/">CSS reset</a> and <a href="http://necolas.github.com/normalize.css/">Normalize.css</a>, which both work towards the same goal from different angles.

I've found that Meyer's CSS Reset results in more consistent browser rendering for me, so that's what I use. But Normalize.css does have a few useful bits that result in better looking images, and fix issues with HTML5 audio and video rendering. I've incorporated some of that stuff, as well as a few of my own additions for responsive images and video, into my reset.

<h2>Structure</h2>

Content in Go Mobile First is wrapped in divs with the <code class="language-css">.container</code> class.

<pre><code class="language-css">/* Literally "contains" the content on the page  */
.container {
    /* Sets the maximum width of the content */
    max-width: 640px;
    /* Centers the container */
    margin-left: auto;
    margin-right: auto;
    /* Adds a padding to the top of the container */
	padding-top: 26px;
}</code></pre>

Divs with this class have a maximum width of 640 pixels, but are otherwise fluid. <code class="language-css">margin-left: auto;</code> and <code class="language-css">margin-right: auto;</code> tell browsers to automatically set the left and right margins, which centers the div on the page.

For white space, I've applied 26 pixels of padding to the top of each <code class="language-css">container</code>.

<h2>Typography</h2>

The Go Mobile First design is built around a <a href="https://gomakethings.com/typography-first-web-design/">typographic scale</a>: 14px, 15px, 17px (base), 20px, 23px, 26px, 30px, 34px, 51px, 68px, 85px, 102px.

You'll see these numbers repeated throughout the CSS. Deviating from them will break the scale and result in a less pleasant design (unless, of course, you change the entire scale).

Line height is set at 25 pixels for smaller screens, and 27 pixels for larger ones. These numbers were determined using Chris Pearson's <a href="http://www.pearsonified.com/typography/">Golden Ratio Typography Calculator</a>.

<h3>Typographic Elements</h3>

In addition to the usual stuff - typefaces, links, paragraph spacing, headers, lists - I've added some unique classes.

<code class="language-css">.small</code> is used for content that you want to be smaller than the body text. <code class="language-css">.tall</code> and  <code class="language-css">.grande</code> make content slightly bigger than the body copy, but unlike headers, their line spacing is more suited to longer lines of text.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/typography.png" alt="" title="A screenshot of the various typography classes" width="504" height="227" class="aligncenter size-full wp-image-3711" />

For text that you'd like to be lighter in color than the primary body copy, use <code class="language-css">.muted</code>. When <code class="language-css">.muted</code> sections of content contain links, they appear black instead of the default blue.

If you have content that is part of a list, but you don't want it to be styled as one, use <code class="language-css">.unstyled</code>. While this can be applied to both ordered and unordered lists, it only makes sense semantically to do so to unordered lists.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/unstyled-list.png" alt="" title="A screenshot of an unstyled list" width="321" height="153" class="aligncenter size-full wp-image-3712" />

Finally, each header element also has a matching class. If you wanted to use an <code class="language-css">h2</code> element for semantic purposes, but wanted it to look like an <code class="language-css">h4</code> element, you could write <code class="language-css">&lt;h2 class="h4"&gt;</code>.

<h2>Forms</h2>

The form styling borrows from <a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a>, which does an excellent job of creating beautiful forms.

Because Go Mobile First is so lightweight, I've removed most of the styling and kept the basic elements - things like text color, rounded corners, and active states. I also modified them to match the typographic scale of the theme.

The classes <code class="language-css">.input-small</code>, <code class="language-css">.input-medium</code>, and <code class="language-css">.input-wide</code> are used to set the widths of the input fields, and change slightly from small to large screens. All text areas are given a height of 200 pixels.

<h2>Buttons</h2>

Buttons in Go Mobile First are created using CSS. Simply apply the <code class="language-css">.btn</code> class to any link, input or form button. Also include <code class="language-css">.btn-large</code> to make any button bigger (<em><code class="language-css">.btn</code> must still be used</em>).

<h2>Icons</h2>

Icons are not included with Go Mobile First, but there is a section open in the stylesheet where you might want to add them. I recommend <a href="https://gomakethings.com/icon-fonts/">using an icon font</a>, and have put together a tutorial on how to do that.

<h2>Images</h2>

Go Mobile First includes some basic image styles, again borrowed from Twitter Bootstrap.

<code class="language-css">.img-rounded</code> adds rounded borders, <code class="language-css">.img-polaroid</code> adds white borders and a shadow effect, and <code class="language-css">.img-circle</code> turns square images into circles.

<img src="https://gomakethings.com/wp-content/uploads/2012/11/image-styling.png" alt="" title="A screenshot of the image styles" width="450" height="154" class="aligncenter size-full wp-image-3713" />

These can be used in combination. For example, you could have a polaroid-style image with rounded corners. <code class="language-css">.img-rounded</code> and <code class="language-css">.img-circle</code> are not supported by Internet Explorer 8 and lower.

<h2>Collapse & Fade</h2>

These styles are used to show and hide the navigation elements on smaller screens that support javascript.

<h2>Tables</h2>

Table styling is also borrowed from Twitter Bootstrap, but modified with the Go Mobile First typographic grid.

The reset at the beginning of the stylesheet removes all of the default styling browsers apply to tables. Add the <code class="language-css">.table</code> class to any table for light styling: some padding, horizontal lines between rows, and bold table headers.

For less padding between cells, also use <code class="language-css">.table-condensed</code>. For full borders, also include <code class="language-css">.table-bordered</code>. (<em>For both of these, <code class="language-css">.table</code> must also be used.</em>) These classes can be combined.

<em>A Basic Table</em>
<img src="https://gomakethings.com/wp-content/uploads/2012/11/table.png" alt="" title="A screenshot of the basic table styling" width="640" height="168" class="aligncenter size-full wp-image-3719" />

<em>A Condensed Table</em>
<img src="https://gomakethings.com/wp-content/uploads/2012/11/table-condensed.png" alt="" title="A screenshot of a condensed table" width="640" height="154" class="aligncenter size-full wp-image-3718" />

<em>A Bordered Table</em>
<img src="https://gomakethings.com/wp-content/uploads/2012/11/table-bordered.png" alt="" title="A screenshot of a bordered table" width="640" height="186" class="aligncenter size-full wp-image-3717" />

I've removed <code class="language-css">.table-striped</code> and <code class="language-css">.table-hover</code> from the Bootstrap code, as they disrupt the clean and simple layout of Go Mobile First.

<h2>Navigation</h2>

The <code class="language-css">.logo</code> class is (obviously) applied to the logo link, and overrides the default link behavior, keeping the logo link black at all times.

The <code class="language-css">.nav</code> class is applied to the navigation list. For the base styles, it displays the navigation links as an inline list. On smaller screens that support javascript, they're stacked as block elements.

The <code class="language-css">.responsive-nav</code> class is used for the "menu" link that toggles the navigation menu on javascript-enabled smaller screens. It's set to <code class="language-css">display: none;</code> in the base styles, and changed to <code class="language-css">display: block;</code> in the Media Queries section.

<h2>Floats & Hides</h2>

This is stuff is tucked at the bottom so that it overrides any other settings in the base CSS.

The default image alignment classes that WordPress uses - <code class="language-css">.alignleft</code>, <code class="language-css">.alignright</code>, <code class="language-css">.aligncenter</code>, and <code class="language-css">.alignnone</code> - are all set as centered in the base styles. On larger screens, they float to the left and right as appropriate.

<code class="language-css">.text-center</code>, <code class="language-css">.text-left</code>, and <code class="language-css">.text-right</code> align text in the center, to the left, and the right, respectively. <code class="language-css">.pull-right</code> floats objects to the right.

To remove margins and padding from an object, use the <code class="language-css">.no-space</code> class. <code class="language-css">.no-space-bottom</code> and <code class="language-css">.no-space-top</code> will remove margins and padding just from the bottom or top of an object. <code class="language-css">.small-space-bottom</code> leaves just a small amount of margin at the bottom of an object.

<code class="language-css">.padding-top</code> applies 14 pixels of padding to the top of an object, while <code class="language-css">.margin-bottom</code> applies a 34 pixel margin to the bottom.

Sometimes you want an element to appear in your HTML for people using screen readers, but don't want it to be displayed visually. In those cases, use the <code class="language-css">.screen-reader</code> class. This is currently applied to the skip-nav link, as well as the search form label.

The end of this section contains a few classes with a clearfix applied. This removes any floats contained in those sections, which prevents weird formatting issues. To apply a clearfix to an div not already covered here, use the <code class="language-css">.group</code> class.

<h2>Media Queries</h2>

This is where progressive enhancement occurs.

For smaller screens, formatting is added for javascript-enabled devices. On larger screens, the line-height is increased for more comfortable reading, a few elements gain bigger font-sizes or more padding, and images are aligned to the left or right as appropriate.

The <code class="language-css">.nav-mobile.collapse</code> class is really important. If someone has their browser set to a small size and toggles the navigation menu, and then later expands their browser window, the navigation bar could be hidden. This nested class forces it to always be displayed on larger screens.

<h4>Referenced & Useful Resources</h4>

<ol>
<li><a href="https://github.com/stubbornella/oocss/wiki/faq">Object Oriented CSS</a></li>
<li><a href="http://meyerweb.com/eric/tools/css/reset/">Meyer's CSS Reset</a></li>
<li><a href="http://necolas.github.com/normalize.css/">Normalize.css</a></li>
<li><a href="https://gomakethings.com/typography-first-web-design/">Typography First Web design</a></li>
<li><a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a></li>
<li><a href="https://gomakethings.com/icon-fonts/">Using an Icon Font</a></li>
</ol>