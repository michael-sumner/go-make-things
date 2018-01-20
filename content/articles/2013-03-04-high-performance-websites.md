---
categories:
- Code
date: '2013-03-04'
url: /high-performance-websites/
title: High Performance Websites
---

<em>This article has been replaced by <a href="https://gomakethings.com/wicked-fast-websites/">Wicked Fast Websites</a>, a three-part series with more tips, tricks, and tools for building high performance websites.</em>

In the age of mobile, web performance is a design feature. If your site isn't fast, people will just leave.

Today, I want to share a few simple things you can do to dramatically improve the performance of your site. Using these techniques, I've gotten Go Make Things to load in less than a second, running WordPress on inexpensive shared hosting.
<!--more-->
<h2>The Steps</h2>

We'll be doing a few things:

<ol>
<li>Concatenate. Combining like files together.</li>
<li>Minify. Removing the spacing, line breaks and comments from files.</li>
<li>Smush. Removing unneeded data from image files.</li>
<li>Icon Fonts. Icon fonts are a lighter, faster alternative to image-based icons.</li>
<li>Compress. Reduce file size by up to 70 percent.</li>
<li>Cache. Telling browsers to keep static assets stored locally so that they doesn’t have to be re-downloaded every time they visit your site.</li>
<li>Page Structure. Adjusting the location of CSS and JavaScript files for faster rendering.</li>
</ol>

Let's get started...

<h2>Concatenate</h2>

One of the biggest bottlenecks in page load time is in downloading the actual files for your site.

Each HTTP request adds additional load time. It's actually faster for a browser to download one 100kb file than it is to download two 50kb files. By combining similar file types together, you can improve page performance.

When you can, combine all of your javascript into a single <code>.js</code> file. Rather than loading separate <code>.css</code> files for your base styles, small screens, bigger screens and so on, combine them all into a single stylesheet with media queries.

And don't think you can cheat by using the <code>@import</code> rule. That still requires additional HTTP requests.

<h2>Minify</h2>

Minifying is the process of removing spacing, line breaks and comments from your CSS, HTML, and javascript. Though it might not seem like a big deal, removing all those unused elements can decrease the size of your files by 40 percent or more.

For this, you'll need <a href="https://www.google.com/intl/en/chrome/browser/">Google Chrome</a> and the <a href="https://developers.google.com/speed/pagespeed/">Page Speed Add-On</a>.

<h3>Minify Your CSS</h3>

In Google Chrome, run the Developer Tools and click on the “Page Speed” tab. Then click “Analyze.”

You’ll be given an overall score, and a list of things you can do to improve your score.

One of the items on the list will be “Minify CSS.” Click it. Under “Suggestions for this page” is a link to “see optimized content.” Follow that to get a minified version of your CSS provided by Google.

<img src="https://gomakethings.com/wp-content/uploads/2012/08/minify-560x79.png" width="560" height="79" class="aligncenter" title="screenshot of minify css link" />

Rather than overwrite my human-readable CSS, I paste the minified code into a new file called <code>style-min.css</code>. Reference that in the header of your HTML.

<h3>Minify Your JavaScript</h3>

In the Developer Tools Window, click on “Minify Javascript” and repeat the process above to access a minified version of your script from Google. If you’re using jQuery, Google also provides <a href="https://developers.google.com/speed/libraries/devguide">a minified version of that</a> you can use.

Paste the minified code into a new file called <code>js-min.js</code>, and change the link in your HTML to that file.

<h3>Minify Your HTML</h3>

There are a few ways to minify your HTML.

If you're building static webpages, the Developer Tools Window in Google Chrome will contain a “Minify HTML” recommendation. You can follow the same process as with the CSS and JavaScript.

If you're using WordPress, there's actually code you can add to your <code>functions.php</code> file to dynamically serve minified HTML.

Between <code class="language-php">&lt;?php</code> and <code class="language-php">?&gt;</code> add <a href="https://gomakethings.com/free-downloads/html-minify.txt">this bit of code (.txt file)</a>, courtesy of <a href="http://www.intert3chmedia.net/2011/12/minify-html-javascript-css-without.html">DVS</a>. If you view source after making this update, you’ll see a message at the bottom of the page telling you how much the file was compressed.

<em><strong>One issue I have discovered:</strong> If you use inline AJAX, this code may prevent it from working properly. If you find this to be the case, set <code class="language-php">protected $compress_js = true;</code> to "false" instead, and it will leave javascript uncompressed.</em>

<h2>Smush</h2>

Images in their raw form often have a lot of extra but unneeded data in them. This makes the file sizes up to 60 percent bigger than they need to be.

“Smushing” images is the process of removing that unneeded data and optimizing them for web viewing.

<h3>Smushing Apps</h3>

So how exactly do you smush an image? There’s an app for that!

I downloaded <a href="http://imageoptim.com/">ImageOptim</a>, which is unfortunately Mac only. It’s a simple drag-and-drop application, and actually shows you how much smaller the file is after smushing.

<img src="https://gomakethings.com/wp-content/uploads/2012/08/image-optim.png" width="560" height="366" class="aligncenter" title="screenshot of imageoptim app" />

If you’re on a PC, you can also use <a href="http://www.smushit.com/ysmush.it/">Smush.it</a>, a web-based app from Yahoo.

<h3>Better file types</h3>

It’s worth noting that I’m not just smushing my images, but also making smarter decisions about file types.

Historically, I would save all of my images as PNGs files. PNG is a lossless image format, so it keeps graphics sharp and crisp (as opposed to the lossy JPG format). However, PNGs are also substantially larger than JPGs.

For icons, PNGs make a lot of sense (or used to – more on that in a minute). But for something like a photo of people or places, which already have a lot of noise in them, a JPG is actually a better format because it’s much smaller in size.

<h2>Icon Fonts</h2>

Rather than using PNGs for my icons, I actually use an embedded web font.

Using the <a href="https://gomakethings.com/icon-fonts/">IcoMoon app</a>, I was able to create a custom font set with just the icons I need. It weighs in at just 4kb and results in just a single HTTP request, which drastically improves performance.

And because I’m loading a font and not images, they can be scaled smoothly to any size, styled easily using CSS, and don’t get distorted on retina displays. If you don’t go the icon font route, you should use <a href="http://css-tricks.com/css-sprites/">image sprites</a> instead.

<h2>Compress</h2>

In Apache HTTP servers, <code>.htaccess</code> (hypertext access) is the configuration file that allows for web server configuration.

With a simple modification to your <code>.htaccess</code> file, you can tell the server to send your files compressed as gzip files. This reduces file size by about 70 percent.

Learn how with <a href="https://github.com/cferdinandi/htaccess#gzip-compression">this tutorial on GitHub</a>.

<h2>Cache</h2>

Setting cache headers tells browsers to keep static assets stored locally so that a visitor’s browser doesn’t have to re-download them every time they visit your site.

This is also something that's done using the <code>.htaccess</code> file. Follow these <a href="https://github.com/cferdinandi/htaccess#expires-headers">instructions on GitHub</a>.

<h3>Caching for WordPress</h3>

If your site is powered by WordPress, there's an additional step you can take that will dramatically improve performance.

Each time someone accesses your site, WordPress dynamically generates an HTML page for them using server-side processing. Caching your WordPress files will create static HTML pages ahead of time that get stored on the server and sent to visitors. This is a lot faster than WordPress creating a fresh page each time someone visits your site.

There are a few plugins that do this for you, most notably <a href="http://wordpress.org/extend/plugins/wp-super-cache/">WP Super Cache</a> and <a href="http://wordpress.org/extend/plugins/w3-total-cache/">W3 Total Cache</a>. Both require a bit of tweaking and tailoring, though, and can be a bit confusing to set up.

I prefer <a href="https://wordpress.org/plugins/comet-cache/">Comet Cache</a>. There's only one thing you really need to do: switch it to on.

Comet Cache automatically updates pages every hour (in case content has changed), and for people who are logged in or who have left comments, it serves them the dynamically generated pages instead of cached ones.

This reduced my page load times by about 30 percent.

<h2>Page Structure</h2>

There are two last changes you should make: Make sure you load your stylesheet at the top of the page and your JavaScript at the bottom (when possible).

This doesn't make the page download content any faster, but it does help browsers start displaying it more quickly.

In order to avoid having to redraw elements, browsers will wait until the stylesheet is loaded before displaying content. If the CSS file is one of the last things to download, people who visit your site will stare a blank page for longer.

Browsers typically download multiple files at once. However, some browsers block other files from downloading while a javascript file is being loaded. Putting your scripts at the bottom of the page ensures that more of your content is downloaded and displayed as quickly as possible.

<h2>Your High Performance Website</h2>

These techniques took me about 30 minutes to get set up. This site now loads in under a second, running WordPress on inexpensive shared hosting.

Your performance may vary a bit (I also have an extremely small CSS file and don't use jQuery on this site), but these tips should still make a big difference.

<h4>Referenced & Useful Resources</h4>

<ol>
<li><a href="http://daverupert.com/2010/06/web-performant-wordpress/">Web Performant Wordpress</a> by Dave Rupert.</li>
<li><a href="http://csswizardry.com/2013/01/front-end-performance-for-web-designers-and-front-end-developers/">Front-end performance for web designers and front-end developers</a> by Harry Roberts.</li>
<li><a href="https://developers.google.com/speed/pagespeed/">The Page Speed add-on</a> for Google Chrome and Firefox.</li>
<li><a href="http://yslow.org/">YSlow</a>, another website performance tester from Yahoo.</li>
<li><a href="http://tools.pingdom.com/fpt/">Pingdom</a>, another tool to test page speeds.</li>
<li><a href="https://developers.google.com/speed/libraries/devguide">Pre-minified jQuery</a> and other code from Google.</li>
<li><a href="http://www.intert3chmedia.net/2011/12/minify-html-javascript-css-without.html">Easy Trick to Minify HTML</a> by DVS.</li>
<li><a href="http://imageoptim.com/">ImageOptim</a>, a Mac app for smushing images.</li>
<li><a href="http://www.smushit.com/ysmush.it/">Smush.it</a>, a web-based app for smushing images from Yahoo.</li>
<li><a href="http://keyamoon.com/icomoon/">IcoMoon</a>, an amazing icon font app.</li>
<li>My tutorial on <a href="https://gomakethings.com/icon-fonts/">using icon fonts</a>.</li>
<li><a href="http://css-tricks.com/css-sprites/">Image Sprites: What They Are, Why They're Cool, and How to Use Them</a> by Chris Coyier.</li>
<li><a href="http://developer.yahoo.com/performance/rules.html">Best practice for speeding up your website</a> from Yahoo!</li>
</ol>