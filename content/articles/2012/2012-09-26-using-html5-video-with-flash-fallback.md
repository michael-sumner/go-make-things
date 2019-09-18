---
categories:
- Code
date: '2012-09-26'
url: /using-html5-video-with-flash-fallback/
title: Using HTML5 Video with Flash Fallback
---

I decided to use HTML5 video for a recent web project at work. With the <code class="language-markup">&lt;video&gt;</code> tag, it's really easy to embed video content on a webpage.

But because it's a corporate environment, I still need to support older versions of Internet Explorer that don't recognize the HTML5 video tag. Fortunately, it's really easy to include Flash fallback for older browsers. You don't even need to create a new video format - Flash can play mp4 files.

Here's how to make it work.
<!--more-->
<h2>The Code</h2>

Embedding video with HTML5 is a lot like adding images. You simply use the <code class="language-markup">&lt;video&gt;</code> tag and add the source. To add Flash fallback, you simply include a Flash object inside the video element.

After experimenting with a bunch of plugins and tools on the web, I've found the open source <a href="http://flowplayer.org/">Flowplayer</a> to be the easiest way to go. You can even use a hosted version on their servers.

Here's the code...

<pre><code class="language-markup">&lt;video width="VIDEO-WIDTH" height="VIDEO-HEIGHT" controls preload="auto"&gt;
	&lt;source src="VIDEO-PATH.m4v"  type="video/mp4"&gt;
	&lt;source src="VIDEO-PATH.ogv" type="video/ogg"&gt;
	&lt;object class="aligncenter" type="application/x-shockwave-flash" data="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf" width="560" height="315"&gt;
		&lt;param name="movie" value="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf"&gt;
		&lt;param name="allowFullScreen" value="true"&gt;
		&lt;param name="wmode" value="transparent"&gt;
		&lt;param name="flashvars" value="config={'clip': {'url':'VIDEO-PATH.m4v','autoPlay':false, 'autoBuffering':true }}"&gt;
		&lt;p&gt;Your browswer does not support video...&lt;/p&gt;
	&lt;/object&gt;
&lt;/video&gt;
</code></pre>

Replace "VIDEO-WIDTH" and "VIDEO-HEIGHT" with the video dimensions, and replace "VIDEO-PATH" with the full URL of the video, and you're good to go.

<strong>One important note:</strong> mp4/m4v video files will not play in Firefox. And if you use the HTML5 video tag, Firefox also won't fallback to Flash, either. It will just show a blank box. You need to include an ogv file format in addition to mp4.

(<em>If you're on a Mac, <a href="http://thelittleappfactory.com/evom/">Evom</a> is a handy (and free) little app that converts video into many formats and has a handy HTML5 setting.</em>)

<h2>If the video won't work...</h2>

If you used the snippet of code above and the videos won't play, there's a pretty good chance your server isn't serving the correct MIME types for the video files. If you're on an Apache server, you can fix this easily by updating your .htaccess file.

Just add the following bits of code at the end (if you're on WordPress, add this after the WordPress stuff)...

<pre><code class="language-htaccess">
#ADD MIME TYPES
AddType video/mp4 .mp4 .m4v
AddType video/ogg .ogv
AddType video/webm .webm
</code></pre>

And that's it!