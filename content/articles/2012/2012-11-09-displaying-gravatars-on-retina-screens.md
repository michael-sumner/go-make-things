---
categories:
- Code
date: '2012-11-09'
excerpt: How to display high resolution avatars in WordPress.
url: /displaying-gravatars-on-retina-screens/
title: Displaying Gravatars on Retina Screens
---

One thing that's been bothering me for the last couple of months is how fuzzy and awful the avatars in the comments section of this site looked on my iPad.

Last week I fixed that. It's pretty easy.

In the WordPress comments.php file, use this snippet to display the avatar:

<pre><code class="language-php">&lt;?php echo get_avatar( $comment, $size = '120' ); ?&gt;</code></pre>

The number after <code>$size =</code> should be double the height/width in pixels that you'd like to use. On my site, avatars are 60 pixels. This code tells WordPress to display a 120 pixel by 120 pixel square image.

Then in my stylesheet, I add this bit of code:

<pre><code class="language-css">.avatar {
    height: 60px;
    width: 60px;
}</code></pre>

WordPress automatically adds the <code class="language-css">.avatar</code> class to the image it displays using <code class="language-php">get_avatar</code>. This snippet of CSS tells WordPress to display that 120 pixel by 120 pixel image at 60 pixels by 60 pixels.

When retina displays expand the image, it will be pixel dense enough to retain it's sharpness.