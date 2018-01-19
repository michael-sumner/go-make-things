---
categories:
- Code
date: '2012-08-27'
excerpt: How to make your WordPress blog run faster in less than 30 minutes.
title: How to trick out the performance of your WordPress site
---

In <a href="http://daverupert.com/2010/06/web-performant-wordpress/">Web Performant WordPress</a>, Dave Rupert talks about the steps he took to dramatically increase the performance of his WordPress site.

Inspired by Dave's work, I decided to make some updates the optimize the performance of Go Make Things. Total time investment: 30 minutes, and the site is noticeably snappier.

Here's what I did...
<!--more-->
<h2>Getting Started</h2>

First, there's a few things you'll need to do:
<ol>
<li>Download and install <a href="http://www.google.com/chrome">Google Chrome</a>, if you don't already have it.</li>
<li>Install the <a href="https://developers.google.com/speed/pagespeed/">Page Speed add-on</a>.</li>
<li>Backup all of your WordPress files, just in case something goes wrong.</li>
</ol>

<h2>Minify</h2>

Minifying is the process of removing spacing, line breaks and comments from your CSS, HTML, and javascript. Though it might not seem like a big deal, removing all those unused elements can decrease the size of your files by <del datetime="2012-10-16T17:37:44+00:00">20</del> 40 percent or more.

Unfortunately, it also leaves your code unreadable to humans, but that's ok. I write and modify my code in human readable format, and then use an app to minify it for me.

<h3>Minify your CSS</h3>

In Google Chrome, run the Developer Tools and click on the "Page Speed" tab. Then click "Analyze."

You'll be given an overall score, and a list of things you can do to improve your score.

One of the items on the list will be "Minify CSS." Click it. Under "Suggestions for this page" is a link to "see optimized content." Follow that to get a minified version of your CSS provided by Google.

<img src="https://gomakethings.com/wp-content/uploads/2012/08/minify-560x79.png" alt="" title="minify" width="560" height="79" class="aligncenter size-medium wp-image-2944" />

I created a copy of my stylesheet, removed the header information, and renamed it "style-unmin.css." This is the human readable file I'll now edit when I need to update my site. Without the header info, it just sits on the server.

Then I went to my active stylesheet, and pasted in the minified CSS provided by Google. When you do this, make sure you leave the header information (theme name, etc.) intact or Wordpress won't be able to access your theme.

Click "Update" and you're done. Easy, right?

<h3>Minify your javascript</h3>

In the Developer Tools Window, click on "Minify Javascript" and repeat the process above to access a minified version of your script from Google. If you're using jQuery, Google also provides a <a href="https://developers.google.com/speed/libraries/devguide">minified version of that</a> you can use.

I created a new file called "js-min.js" and dropped the minified code into that. Then I changed the link in my footer to point to the new javascript file. (<em>You do call your javascript in your footer for better performance, right?</em>)

And again, you're done.

<h3>Minify your HTML</h3>

Because your HTML is server up dynamically using PHP, minifying your HTML requires you to add a few lines of code to your functions file in Wordpress.

Between <code class="language-php">&lt;?php</code> and <code class="language-php">?&gt;</code> add <a href="https://gomakethings.com/free-downloads/html-minify.txt">this bit of code (txt file)</a>, courtesy of <a href="http://www.intert3chmedia.net/2011/12/minify-html-javascript-css-without.html">DVS</a>. (<em>If you'd prefer to use a plugin, I threw one together. <a href="https://gomakethings.com/free-downloads/gmt-html-minify.zip">Download it here.</a></em>)

This tells WordPress to remove the spaces and comments from your HTML and inline CSS and javascript. If you view source after making this update, you'll see a message at the bottom of the page telling you how much the file was compressed.

One issue I have discovered: If you use inline AJAX, this code may prevent it from working properly. If you find this to be the case, set <code class="language-php">protected $compress_js = true;</code> to false instead, and it will leave javascript uncompressed.

And you're done.

<h2>Compress</h2>

With a simple modification to your .htaccess file, you can tell the server your WordPress site sits on to send your files compressed as gzip files. This reduces file size by about 70 percent, which can make a huge difference, especially for people browsing on low bandwidth devices.

Underneath your WordPress stuff, add this bit of code <a href="http://daverupert.com/2010/06/web-performant-wordpress/">courtesy of Dave Rupert</a>:

<pre><code class="language-htaccess">#Specify Font Types
AddType font/ttf .ttf
AddType font/otf .otf
AddType application/x-woff .woff
AddType image/svg+xml .svg
AddType application/vnd.ms-fontobject .eot

# Enable GZIP
&lt;ifmodule mod_deflate.c&gt;
AddOutputFilterByType DEFLATE text/text text/html text/plain text/xml text/css font/ttf font/otf image/svg+xml application/vnd.ms-fontobject application/x-javascript application/javascript
BrowserMatch ^Mozilla/4 gzip-only-text/html
BrowserMatch ^Mozilla/4.0[678] no-gzip
BrowserMatch bMSIE !no-gzip !gzip-only-text/html
&lt;/ifmodule&gt;</code></pre>

For browsers that will support it, your files should now get gzipped by the server prior to being sent. If not supported, the server will just ignore it and send the regular files.

And you're done.

(<em>You may read some posts that tell you that shared hosting on GoDaddy does not support gzipping. That's no longer true. I'm on GoDaddy shared hosting, and this works fine for me.</em>)

<h2>Cache</h2>

Setting cache headers tells browsers to keep static assets stored locally so that a visitor's browser doesn't have to re-download them every time they visit your site.

Again in the .htaccess file, drop the following code underneath the gzipping code (again courtesy of Dave):

<pre><code class="language-htaccess"># Expires Headers - 2678400s = 31 days
&lt;ifmodule mod_expires.c&gt;
  ExpiresActive On
  ExpiresDefault "access plus 1 seconds"
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType image/gif "access plus 2678400 seconds"
  ExpiresByType image/jpeg "access plus 2678400 seconds"
  ExpiresByType image/png "access plus 2678400 seconds"
  ExpiresByType text/css "access plus 518400 seconds"
  ExpiresByType text/javascript "access plus 2678400 seconds"
  ExpiresByType application/x-javascript "access plus 2678400 seconds"
  ExpiresByType font/ttf "access plus 2678400 seconds"
  ExpiresByType font/otf "access plus 2678400 seconds"
  ExpiresByType application/vnd.ms-fontobject "access plus 2678400 seconds"
  ExpiresByType application/x-woff "access plus 2678400 seconds"
  ExpiresByType image/svg+xml "access plus 2678400 seconds"
&lt;/ifmodule&gt;

# Cache Headers
&lt;ifmodule mod_headers.c&gt;
  # Cache specified files for 31 days
  &lt;filesmatch ".(ico|flv|jpg|jpeg|png|gif|css|swf|eot|woff|otf|ttf|svg)$"&gt;
  Header set Cache-Control "max-age=2678400, public"
  &lt;/filesmatch&gt;
  # Don't cache HTML
  &lt;filesmatch ".(html|htm)$"&gt;
  Header set Cache-Control "max-age=0, private, must-revalidate"
  &lt;/filesmatch&gt;
  # Cache PDFs for a day
  &lt;filesmatch ".(pdf)$"&gt;
  Header set Cache-Control "max-age=86400, public"
  &lt;/filesmatch&gt;
  # Cache Javascripts for 31 days
  &lt;filesmatch ".(js)$"&gt;
  Header set Cache-Control "max-age=2678400, private"
  &lt;/filesmatch&gt;
&lt;/ifmodule&gt;</code></pre>

And you're done!

<h2>Smush Your Images</h2>

Images in their raw form often have a lot of extra but unneeded data in them. This makes the file sizes up to <del datetime="2012-10-22T16:01:41+00:00">30</del> 60 percent bigger than they need to be.

"Smushing" images is the process of removing that unneeded data and optimizing them for web viewing.

Dave recommends going back and smushing all of the old images on your site. I was far too lazy for that. Instead, I simply optimized the photo on my Info page, and will be smushing all photos I post on the site going forward.

<h3>Smushing Apps</h3>

So how exactly do you smush an image? There's an app for that!

I downloaded <a href="http://imageoptim.com/">ImageOptim</a>, which is unfortunately Mac only. It's a simple drag-and-drop application, and actually shows you how much smaller the file is after smushing.

<img src="https://gomakethings.com/wp-content/uploads/2012/08/image-optim.png" alt="" title="image-optim" width="560" height="366" class="aligncenter size-full wp-image-3187" />

If you're on a PC, you can also use <a href="http://www.smushit.com/ysmush.it/">Smush.it</a>, a web-based app from Yahoo.

<h3>Better file types</h3>

It's worth noting that I'm not just smushing my images, but also making smarter decisions about file types.

Historically, I would save all of my images as PNGs files. PNG is a lossless image format, so it keeps graphics sharp and crisp (as opposed to the lossy JPG format). However, PNGs are also substantially larger than JPGs.

For icons, PNGs make a lot of sense (or used to - more on that in a minute). But for something like a photo of people or places, which already have a lot of noise in them, a JPG is actually a better format because it's much smaller in size.

<h3>Fonts, not images</h3>

I had already done this a while ago, but rather than using PNGs for my icons, I actually use an embedded web font.

Using the <a href="http://keyamoon.com/icomoon/">IcoMoon app</a>, I was able to create a custom font set with just the icons I need. It weighs in at just 8 kb for most file types and results in just a single HTTP request, which drastically improves performance.

And because I'm loading a font and not images, my icons don't get distorted on retina displays. If you don't go the <a href="https://gomakethings.com/icon-fonts/">icon font</a> route, you should use <a href="http://css-tricks.com/css-sprites/">image sprites</a> instead.

<h2>What I didn't do</h2>

Dave recommends one additional thing that I haven't done: Install WP Super Cache.

In simple terms, when a user visits your site, WordPress compiles your content from the database with the content from your theme and serves up a webpage. WP Super Cache converts your pages into cached static HTML pages ahead of time, reducing load time by cutting the database out of the process.

I'll probably get around to adding this at some point down the road.

<h4>Referenced & Useful Resources</h4>

<ol>
<li><a href="http://daverupert.com/2010/06/web-performant-wordpress/">Web Performant Wordpress</a> by Dave Rupert.</li>
<li><a href="https://developers.google.com/speed/pagespeed/">The Page Speed add-on</a> for Google Chrome and Firefox.</li>
<li><a href="http://yslow.org/">YSlow</a>, another website performance tester from Yahoo.</li>
<li><a href="https://developers.google.com/speed/libraries/devguide">Pre-minified jQuery</a> and other code from Google</li>
<li><a href="http://www.intert3chmedia.net/2011/12/minify-html-javascript-css-without.html">Easy Trick to Minify HTML</a> by DVS.</li>
<li><a href="http://imageoptim.com/">ImageOptim</a>, a Mac app for smushing images.</li>
<li><a href="http://www.smushit.com/ysmush.it/">Smush.it</a>, a web-based app for smushing images from Yahoo.</li>
<li><a href="http://keyamoon.com/icomoon/">IcoMoon</a>, an amazing icon font app.</li>
<li>My tutorial on <a href="https://gomakethings.com/icon-fonts/">using icon fonts</a>.</li>
<li><a href="http://css-tricks.com/css-sprites/">Image Sprites: What They Are, Why They're Cool, and How to Use Them</a> by Chris Coyier.</li>
</ol>