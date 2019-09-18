---
categories:
- Code
- Design and UX
date: '2013-11-06'
url: /how-to-build-a-high-performance-website/
title: How to build a high performance website
---

<em>This is part 2 of <a href="https://gomakethings.com/wicked-fast-websites/">Wicked Fast Websites</a>, a three-part series that explores why web performance matters and what you can do about it.</em>

We’re in the middle of a perfect storm. Websites are larger, devices are more varied and less predictable, and performance expectations are higher than ever. Today, you'll learn some simple tools and techniques you can use to build high performance websites.

<!--more-->

<em><strong>An aside:</strong> Today's websites are <a href="http://httparchive.org/">five times bigger than in 2009</a>. In fact, they've gotten 20-percent bigger this year alone. One of the easiest ways to improve the performance of your websites is to put them on a diet.</em>

<h2>Markup Order Matters</h2>

When a browser accesses a webpage, it immediately begins reading and rendering the content. When it comes across external files likes images and videos, it begins downloading them, two at a time. This is really useful, because if you have a really large file, it doesn't hold up the other files from being downloaded.

There are two exceptions to this process:

<ol>
<li>CSS stops a browser from rendering content. Repaints are bad for performance, so the browser waits until it's finished downloading the styles before rendering any additional content.</li>
<li>JavaScript stops all other downloads. Because JS often manipulates objects on the page, the browser doesn't want to download them until it knows exactly what the JS is going to do.</li>
</ol>

Put your CSS at the top of your page, up in the <code>&lt;head&gt;</code> element, to avoid repaints. Similarly, put your JavaScript files down in the footer of your site to maximize concurrent downloads. The exception to this is feature detection and polyfill scripts (like Modernizr or an HTML shim), which should go in the <code>&lt;head&gt;</code> because your stylesheet often relies on them.

The order of styles and scripts in your markup doesn't make the page download content any faster, but it does help browsers start displaying it more quickly, and therefore <em>appear</em> faster.

<h2>Combine Similar Files</h2>

One of the biggest bottlenecks in page load time is in downloading the actual files for your site. Each HTTP request adds additional load time. How much time? <a href="https://developers.google.com/speed/docs/best-practices/request">According to Google</a>:

<blockquote>
  Every time a client sends an HTTP request, it has to send all associated cookies that have been set for that domain and path along with it. Most users have asymmetric Internet connections: upload-to-download bandwidth ratios are commonly in the range of 1:4 to 1:20. This means that a 500-byte HTTP header request could take the equivalent time to upload as 10 KB of HTTP response data takes to download. The factor is actually even higher because HTTP request headers are sent uncompressed. In other words, for requests for small objects (say, less than 10 KB, the typical size of a compressed image), the data sent in a request header can account for the majority of the response time.
</blockquote>

It's actually faster for a browser to download one 300kb file than it is to download three 100kb files. By combining similar file types together&mdash;a process known as <em>concatenation</em>&mdash;you can improve page performance.

When you can, combine all of your JavaScript into a single <code>scripts.js</code> file. Rather than loading separate CSS files for your base styles, small screens, bigger screens and so on, combine them all into a single stylesheet with media queries.

And don't think you can cheat by using the <code>@import</code> rule. That still requires additional HTTP requests.

<h2>Remove the Whitespace</h2>

<em>Minification</em> is the process of removing spaces, line breaks and comments from your CSS, HTML, and JavaScript. Though it might not seem like a big deal, removing all those unused elements can decrease the size of your files by 40-percent or more.

One useful minification tool is <a href="https://developers.google.com/speed/pagespeed/">Google PageSpeed Insights</a>, a browser extension for Chrome and Firefox.

<h3>Minify Your CSS, JavaScript, &amp; HTML</h3>

In your browser, open up Developer Tools and click on the “Page Speed” tab. Then click “Analyze.” You'll be given a list of things you can do to improve your site performance.

One of the items on the list will be “Minify CSS.” Click it. Under “Suggestions for this page” is a link to “see optimized content.” Follow that to get a minified version of your CSS provided by Google.

<img src="https://gomakethings.com/wp-content/uploads/2012/08/minify-560x79.png" width="560" height="79" class="aligncenter" title="screenshot of minify css link" />

The result is a tiny but rather unreadable stylesheet. Rather than overwriting your human-readable CSS, paste the minified code into a new file called <code>style.min.css</code> and reference that in the header of your HTML. If you ever want to make updates, is as simple as removing the <code>.min</code> and reminifying when you're done.

PageSpeed Insights provides similar links for your JavaScript and markup as well. Like with my CSS, I'll keep a human-readable <code>scripts.js</code> file, and put my minified code in <code>scripts.min.js</code>. Minifying your markup gets a bit trickier, and results in less reduction in file weight, so you may choose not to follow that step.

<h3>Minify jQuery</h3>

If you're using jQuery on your site, Google provides a hosted and minified version that's 34-percent of the original size. An additional benefit of using the Google-hosted version of that a lot of developers use this technique, so there's a good chance your visitor has jQuery cached in the browser already and doesn't need to download it at all.

<a href="http://html5boilerplate.com/">HTML5 Boilerplate</a> uses a smart implementation of this that provides a local fallback if the Google CDN is unavailable:

<pre><code class="language-markup">&lt;script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"&gt;&lt;/script&gt;
&lt;script&gt;window.jQuery || document.write('&lt;script src="js/vendor/jquery-1.10.2.min.js"&gt;&lt;\/script&gt;')&lt;/script&gt;</code></pre>

<em>You'll notice that the <code>http:</code> is missing from the the URL. That helps avoid errors associated with encrypted domains.</em>

<h2>Smarter Image Formats</h2>

Different image formats work better for different types of graphics.

PNG is a lossless image format, so it keeps graphics sharp and crisp (as opposed to the lossy JPG format). For icons and simple images with clean lines, they can actually be more lightweight than JPGs. But for photos and images with lots of visual noise, JPGs will be much smaller in size with comparable quality.

<h3>JPG Formats</h3>

The JPG actually has multiple formats. The most common on the web is the baseline JPG. Baseline JPGs start rendering at the top, and build down as they go.

<img src="https://gomakethings.com/wp-content/uploads/2013/11/jpg-formats.jpg" alt="An example of baseline versus progressive JPG rendering" width="832" height="468" />

<p class="wp-caption-text"><a href="http://www.tonyluong.com/">Photo by Tony Luong</a></p>

An alternative format that was popular a decade ago and is seeing a bit of a comeback is the progressive JPG. Progressive JPGs build in layers. Initially, the full image in low resolution is displayed, and as the image renders, it becomes increasingly crisp and clear.

While progressive JPGs are typically a little smaller than baseline, their real advantage is that they <em>appear</em> faster to the user because they display more content faster. And on smaller screens, the lack of clarity on initial renders may not even be as noticeable.

<img src="https://gomakethings.com/wp-content/uploads/2013/11/progressive-jpg-browser-support.jpg" alt="A chart showing progressive JPG support" width="832" height="468" />

<p class="wp-caption-text"><a href="http://calendar.perfplanet.com/2012/progressive-jpegs-a-new-best-practice/">Source: Performance Calendar</a></p>

While all browsers display progressive JPGs, some browsers do a better job than others. For "non-supporting" browsers, the entire progressive JPG needs to download before it can be displayed, resulting in a <em>worse</em> experience than a baseline JPG.

<h2>Compress Your JPGs</h2>

Photos can add a lot of weight. A high-quality photo can weigh as much as 700kb or more. By compressing photos, you can reduce them down to less 100kb while maintaining image quality.

A JPG compression rate of 70 is considered high-quality for the web.

<h2>Smush Your Images</h2>

The metadata that photographs include&mdash;timestamps, color profiles, and such&mdash;can add quite a bit of weight. <em>Smushing</em> is the process of removing that metadata, and it can reduce the size of an image by more than 25-percent.

<img src="https://gomakethings.com/wp-content/uploads/2012/08/image-optim.png" width="560" height="366" class="aligncenter" title="screenshot of imageoptim app" />

If you're a Mac user, <a href="http://imageoptim.com/">ImageOptim</a> will smush your images without degrading the quality. It works for PNGs, JPGs, and GIFs. <del>Windows lacks a clear one-for-one counterpart, though their are a <a href="http://www.creativebloq.com/design/image-compression-tools-1132865">handful of products</a> that work well for different image types.</del> If you're a Windows user, check out <a href="http://b64.io/">b64.io</a>, a web-based, drag-and-drop optimizer that seems to work just as well as ImageOptim (hat tip to <a href="https://twitter.com/chriscoyier/status/422806037163298816">Chris Coyier</a>).

<h2>Icon Fonts</h2>

<a href="https://gomakethings.com/icon-fonts/">Icon fonts</a> take advantage of the CSS3 <code>@font-face</code> rule, and allow you to embed a font (kind of like webdings) on your site that contains all of your icons.

They offer a few advantages over image-based icons:

<ul>
<li>They're lightweight.</li>
<li>All of your icons are in a single file.</li>
<li>They're styleable with CSS.</li>
<li>Because they're a font, they're infinitely scalable, and look crisp on both regular and high-density displays.</li>
<li>They're compatible all the way back to IE 5 (seriously).</li>
</ul>

There are two small considerations:

<ol>
<li>Windows Phone 7 (running IE 9) lacks true <code>@font-face</code> support.</li>
<li>Icons can only be one color.</li>
</ol>

The free <a href="http://icomoon.io/app/">IcoMoon app</a> allows you to pick just the icons you need and even upload your own. There's a lot to learn about icon fonts, so if you're interested, check out my <a href="https://gomakethings.com/icon-fonts/">start-to-finish tutorial</a> on using them.

<h3>Image Sprites</h3>

If you still need to serve up small sets of images, you should consider using <a href="http://css-tricks.com/css-sprites/">image sprites</a>. Rather than using multiple image files, you can combine all of your images into a single file and embed it using the <code>background-image</code> property, resulting in fewer HTTP requests.

Image sprites are useful if you need multi-color icons or Windows Phone 7 support, though their are some challenges in using them with high-density displays. They're also a bit harder to maintain should you decide to add or remove an icon. If you'd like to use image sprites, the <a href="http://spritegen.website-performance.org/">CSS Sprite Generator</a> makes things a bit easier.

<h2>Adaptive Images</h2>

<img src="https://gomakethings.com/wp-content/uploads/2013/11/adaptive-images.jpg" alt="The same image rendered on multiple devices of varying sizes" width="832" height="468" />

Web images need to look good on everything from low-powered phones and watches to big-screen TVs and high-density displays. But why should a smartphone get the same image as a big, high-density monitor?

Adaptive images are an approach to this challenge. By detecting the size of the display (and ideally bandwidth constraints), you can serve the right image size for the device. Unfortunately, there's no great way to do this today, though there are a lot of people who are working on it.

Many of today's workarounds use JavaScript image-replacement. These scripts often load after images have already been downloaded, however, so the image gets downloaded twice, which is worse for performance than not doing anything at all. <a href="http://adaptive-images.com/">Matt Wilcox</a> has created a PHP-based solution that intercepts the image request on the server. It works really well, but is a bit complicated to set up.

I believe the most promising solution lies with a standards-based solution (the W3C has several in the works) that let's the web developer offer the same images in multiple sizes, and let's the browser decide which one best fits the user's current needs.

<h2>Compress Your Site</h2>

Your server can actually compress your website files&mdash;a process known as <em>gzipping</em>&mdash;before sending them to the browser. This results in about a <a href="developer.yahoo.com/performance/rules.html">70-percent reduction in website size</a>.

On Apache servers, you can enable gzipping with a simple modification to your <code>.htaccess file</code>. Learn how in this <a href="https://github.com/cferdinandi/htaccess#gzip-compression">tutorial on GitHub</a>.

Some web hosts use a slightly different method to implement gzipping. You can check if it's working on your site using <a href="http://gzipwtf.com/">gzipWTF</a>.

<h2>Set Expire Headers</h2>

Expire headers tell browsers to keep static assets stored locally so that a visitor’s browser doesn’t have to re-download them every time they visit your site.

This is also something that's done using the <code>.htaccess</code> file. To set expire headers, <a href="https://github.com/cferdinandi/htaccess#expires-headers">follow these instructions on GitHub</a>.

<h2>In Summary</h2>

<ol>
<li>Markup order matters.</li>
<li>Combine similar files.</li>
<li>Remove the whitespace.</li>
<li>Use smarter image formats.</li>
<li>Compress your JPGs.</li>
<li>Smush your images.</li>
<li>Use icon fonts and image sprites.</li>
<li>Consider adding adaptive images.</li>
<li>Compress your site.</li>
<li>Set expire headers.</li>
</ol>

These techniques can be implemented in about an hour, and make a big difference on site performance. You can test your site performance using the <a href="http://tools.pingdom.com/fpt/">Pingdom Website Speed Test</a>.