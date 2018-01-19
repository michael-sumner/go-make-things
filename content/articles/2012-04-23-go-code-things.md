---
categories:
- Code
- Design &amp; UX
- Technology
date: '2012-04-23'
permalink: /go-code-things/
title: 'Go Code Things: A free WordPress theme for beginners'
url: /2012/04/23/go-code-things
---

<div class="callout"><p class="tall"><em>Go Code Things</em> is a free Wordpress theme designed to help beginners learn how to build websites.</p>

<strong>Discontinued:</strong> <em>Go Code Things</em> has been replaced by <a href="https://gomakethings.com/go-mobile-first/">Go Mobile First</a>, a mobile-first starter theme for WordPress.</div>

When I started learning how to build websites, I would spend hours changing lines of code and seeing what happened. I learned a lot, but it was slow and difficult.

I believe exploration is a critical part of how people learn new things, but I want to make the process easier and more intuitive for the next generation of web designers.

Today, I'm proud to announce the release of <em>Go Code Things</em>.
<!--more-->
<h2>What's Included?</h2>

<em>Go Code Things</em> was built with the beginner in mind. Almost every line of HTML and CSS is is documented, making it easier for you to make changes.

<pre><code class="language-css">/* The "master font" settings for the website. Unless otherwise specified, all text will pick up these settings. */

body {
     font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
     font-size: 15px;
     line-height: 22.5px;
     color: #333333;
     background-color: #ffffff;
}</code></pre>

It's worth noting that the documentation does add a little weight to the code. Think of it like training wheels. It's helpful to get you started, but at some point you'll want to take it away for better performance.

<h3>Responsive Web Design</h3>

<em>Go Code Things</em> comes responsive right out of the box, so it looks great whether you're on a desktop, smart phone, or anything in-between.

<img src="https://gomakethings.com/wp-content/uploads/2012/04/responsive.png" alt="" title="responsive" width="560" height="235" class="aligncenter size-full wp-image-2268" />

Responsive web design shouldn't be an after thought. Learn how to build responsive from the start.

<h3>Structure & Semantics</h3>

<em>Go Code Things</em> is built on the <del datetime="2012-08-30T17:44:52+00:00">same framework as this site</del> previous framework for this site, using HTML5 and CSS3 on 960 pixel grid for desktops. It uses a rough approximation of the rule of thirds. Here's the basic page structure...

[caption id="attachment_2248" align="aligncenter" width="262" caption="Click to view larger"]<a href="https://gomakethings.com/wp-content/uploads/2012/04/semantic-structure.png"><img src="https://gomakethings.com/wp-content/uploads/2012/04/semantic-structure-262x350.png" alt="" title="semantic-structure" width="262" height="350" class="size-medium wp-image-2248" /></a>[/caption]

<h3>Typography</h3>

The base font family for <em>Go Code Things</em> is Helvetica Neue, with Arial and sans-serif fallbacks for systems that don't have that font.

It includes styling for H1 through H6, and individual control over the body, header, footer and sidebar text. There's also unique styling for meta information (post dates, categories and such) and code (like the example above).

<h3>Icon Font</h3>

<em>Go Code Things</em> comes with twelve social sharing icons provided by <a href="http://keyamoon.com/icomoon/">IcoMoon</a>, a fantastic app for creating icon fonts.

Because the icons are a font instead of an image, they look great at any size, even on the new iPad retina display. They can also be styled using CSS, including gradients and shadows.

<img src="https://gomakethings.com/wp-content/uploads/2012/04/social-icons.png" alt="" title="social-icons" width="560" height="69" class="aligncenter size-full wp-image-2270" />

You can add icons to your HTML using the <code class="language-markup">&lt;i class="icon"&gt;&lt;/i&gt;</code> tag and the appropriate class name. For example, to insert a Facebook icon anywhere on your site, you would simply add <code class="language-markup">&lt;i class="icon facebook"&gt;&lt;/i&gt;</code> to your HTML.

Font embedding is supported all the way back to IE4. And because it's a single file weighing in at just 8kb (for most filetypes), it's fast and easy for browsers to download, and only requires one HTTP request.

<em>IcoMoon fonts are licensed under <a href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Sharealike</a>.</em>

<h3>Buttons anywhere!</h3>

Add buttons anywhere on your site by adding the class <code class="language-css">.btn</code> to links, divs and more. To make a button larger, also add the class <code class="language-css">.large-btn</code>.

For example, a large button like the one at the top of this page would be written as:

<pre><code class="language-markup">&lt;a href="#" class="btn btn-large"&gt;Button Text&lt;/a&gt;</code></pre>

<em>This technique was adapted from the <a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a> framework.</em>

<h3>Built-in social sharing</h3>

Social sharing buttons are built-in for Twitter and Facebook. They take advantage of the icon font set and button class, so they can be highly customized, placed anywhere, and look amazing on retina displays. Thanks to a snippet of javascript, social sharing links open in a pop-up window on desktops.

You can add additional links using the built-in icon set. To turn a link into a social sharing button, use the <code class="language-css">.btn-sm</code> class. <strong>Do not</strong> include <code class="language-css">.btn</code> or <code class="language-css">.btn-large</code>.

<h3>Forms & Tables</h3>

<em>Go Code Things</em> includes basic form styling for search boxes, comment forms, and "subscribe by email" buttons. If you're looking for more robust forms, you may want to check out <a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a>.

Also included is styling for simple, bordered, condensed and striped tables. This code was shamelessly borrowed from the Twitter Bootstrap framework. <a href="http://twitter.github.com/bootstrap/base-css.html#tables">Click here</a> to see it in action.

<h2>What's not included?</h2>

<em>Go Code Things</em> is intentionally simple. It does not include lots of components and cool javascript like a some frameworks do. That means it doesn't have things like drop-down menus, modals or tabs. If you're looking for something more robust, <a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a> is an amazing framework with pretty much everything you could ever want in a framework (except the built-in documentation).

This theme, like WordPress, is licensed under the GNU General Public License as published by the Free Software Foundation. <a href="http://www.gnu.org/licenses/">Click here to view a copy.</a>

This theme is distributed in the hope that it will be useful, but without any warranty, and without even the implied warranty of fitness for a particular purpose. And while I tried to be as robust as I could in the documentation, I unfortunately cannot promise any support should you find yourself stuck (though that's pretty typical of most free WordPress themes).

<h2>Build cool stuff</h2>

It's my hope that if you're new to web design, this theme will help you build some cool stuff. If you do, I'd love for you to let me know. <a href="https://gomakethings.com/contact/">Drop me a line</a> and show me your work.