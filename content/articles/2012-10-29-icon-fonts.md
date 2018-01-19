---
categories:
- Accessibility
- Code
- Design &amp; UX
date: '2012-10-29'
permalink: /icon-fonts/
title: Using Icon Fonts
url: /2012/10/29/icon-fonts
---

***Note:*** *This article is a bit stale. It contains outdated screenshots from the IcoMoon interface, and is not how I build sites today. I've since [switched to using SVGs](https://gomakethings.com/using-svgs/), and I'm not looking back. That said, if you're looking to get started with icon fonts, it's still a worthwhile read.*

<em>This article was updated on August 19, 2013 to reflect the current way I implement icon fonts on my projects, which now includes the use of a feature test.</em>

Icon fonts are awesome, and if you're not already using them on your projects, you should be.

Icon fonts are incredibly light weight. The one for this site is just 5kb in size. Because it's a single font file instead of multiple images, it requires just one HTTP request, which is great for site performance. They can be scaled smoothly to any size, and styled easily using CSS.

Here's how I implement icon fonts on my projects...
<!--more-->
<h2>Creating the font</h2>

There are a lot of icon fonts available, but I use <a href="http://icomoon.io/">IcoMoon</a>. The free version contains more than 300 icons, with paid versions offering over 900.

More importantly, though, IcoMoon also offers a free app that lets you build your own custom font. This means you're only using the icons you need, which keeps the file size down.

<em><strong>Full Disclosure:</strong> Because I talk about this app so much on Twitter, the guy behind IcoMoon offered me a free upgrade to their Ultimate Pack. I love the app so much that I paid for it anyways, and I had purchased the Essential Pack months ago.</em>

To get started, head over to the <a href="http://icomoon.io/app/">IcoMoon app</a> and select the icons you want. When you're done, click the "Font" button at the bottom of the screen to open the font generator.

Before you download your font, you'll want to reset the encoding to Private Use Area. This is section of unicode that has not been assigned any characters. Using the private use area for your icons helps ensure that screen readers don't read them aloud.

<img src="https://gomakethings.com/wp-content/uploads/2012/10/icomoon.png" alt="" title="icomoon" width="361" height="219" class="aligncenter size-full wp-image-3460" />

The alternative would be to use standard characters (a to z, numbers, etc.). This can cause screen readers to say things like, "z Twitter," which isn't good for accessibility.

Once you've reset the encoding, click "Download."

<h2>Adding the Icons to Your Site</h2>

When you unzip the download file, you'll find a few items. The ones we really care about:

<ol>
<li>The <code class="language-none">font</code> folder.</li>
<li>The <code class="language-css">style.css</code> file.</li>
</ol>

<h3>Upload the files to your site</h3>

Open up your favorite FTP client, and copy the "fonts" folder into the same directory as your CSS file. If you need to put it somewhere else, that's ok. You'll just have to change a few lines of code in your CSS file.

Now, open up your stylesheet and add a new section for icons.

<h3>Embedding the font</h3>

Open up "style.css." At the top, you'll see this code:

<pre><code class="language-css">@font-face {
font-family: 'icomoon';
    src:url('fonts/icomoon.eot');
    src:url('fonts/icomoon.eot?#iefix') format('embedded-opentype'),
        url('fonts/icomoon.svg#icomoon') format('svg'),
        url('fonts/icomoon.woff') format('woff'),
        url('fonts/icomoon.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}</code></pre>

This tells browsers where to find the files for the font-family IcoMoon, and what the default style and weight are.

You'll notice there are four different file types listed. Unfortunately (but not surprisingly), not all browsers support the same file type, so it's necessary to include a few. You'll also notice that eot is listed twice. This is to fix an issue with older versions of IE (again, big surprise).

I prefer to see SVG listed last, as it's typically a bit bigger than the other filetypes and often not as well hinted. It's used for iOS, which cannot load any of the other types.

After moving SVG to the end, your code should like this:

<pre><code class="language-css">@font-face {
    font-family: 'icomoon';
    src:url('fonts/icomoon.eot');
    src:url('fonts/icomoon.eot?#iefix') format('embedded-opentype'),
        url('fonts/icomoon.woff') format('woff'),
        url('fonts/icomoon.ttf') format('truetype'),
        url('fonts/icomoon.svg#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
}</code></pre>

Add it to your CSS file.

<em><strong>Note:</strong> If you copied the "font" folder to a location other than where your CSS file is located, you'll need to change the URLs in the <code class="language-css">@font-face</code> declaration accordingly.</em>

<em><strong>Update on 5/31/2013:</strong> In the comments, Nigel Anderson asked how many of these files are downloaded by the browser (and how that could impact performance). The answer: Browsers only download the first supported file in the list, even if they support more than one file type.</em>

<h3>Creating a class</h3>

There are two ways to include an icon font in your HTML. One involves adding <code class="language-markup">data-icon=</code> and then the character for your icon to an HTML object.

The second method, which I prefer, is to assign a class to the icon font. Rather than remembering character values, you can add a Twitter icon, for example, by adding <code class="language-markup">class="icon-twitter"</code> to an HTML object.

IcoMoon gives you the option to use either method, but since the second is easier, let's use that.

You'll see the following code in the "style.css" file:

<pre><code class="language-css">/* Use the following CSS code if you want to have a class per icon */
[class^="icon-"]:before,
[class*=" icon-"]:before {
    font-family: 'icomoon';
    font-style: normal;
    speak: none;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
}</code></pre>

This says that any class that begins with <code class="language-markup">icon-</code> should use the IcoMoon font family, has a style and weight of normal, and should not be read aloud by screen readers.

You'll notice that it also includes the webkit prefixed <code class="language-css">font-smoothing</code> property. This improves the clarity of the font. For good measure, I also include a non-prefixed version and <code class="language-css">text-rendering: optimizeLegibility;</code>, which improves kerning on Firefox and newer version of Internet Explorer.

The final version of your code should look something like this:

<pre><code class="language-css">/* Use the following CSS code if you want to have a class per icon */
[class^="icon-"]:before,
[class*=" icon-"]:before {
    font-family: 'icomoon';
    font-style: normal;
    speak: none;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
}</code></pre>

Copy that into your CSS file below your <code class="language-css">@font-face</code> declaration.

<h3>Naming the icons</h3>

Next, we need to associate the individual icons with their unicode characters. IcoMoon does all of the heavy lifting here, creating human-readable classes for the icons.

In this example, I created a simple font with three icons: Twitter, Facebook, and Dribbble.

The "style.css" file contained this code:

<pre><code class="language-css">.icon-twitter:before {
    content: "\e000";
}
.icon-facebook:before {
    content: "\e001";
}
.icon-dribbble:before {
    content: "\e002";
}</code></pre>

You'll notice that we're using the CSS3 <code class="language-css">:before</code> selector. This inserts the specified content before whatever HTML object the class is applied to. The <code class="language-css">content</code> property is used to define the unicode character.

You can copy this code directly from "style.css" (without any modifications) into your CSS file.

<h2>Using icons in your HTML</h2>

Now that you've done all that, including icons in your HTML is insanely easy.

Using my example font above, if I wanted to include a Twitter icon on my site, I would just add <code class="language-markup">&lt;i class="icon-twitter"&gt;&lt;/i&gt;</code> to my HTML.

I use the <code class="language-markup">&lt;i&gt;&lt;/i&gt;</code> tags because they're small, <del datetime="2013-05-24T12:34:01+00:00">no longer used for italics,</del> and there's something logical about "i is for icon." Also, it's what they do in <a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a>.

<em><strong>Update on 5/24/2013:</strong> In the comments, Michael Barrish correctly points out that <code class="language-markup">&lt;i&gt;</code> is still a perfectly valid HTML element. What I meant to say was that the newer <code class="language-markup">&lt;em&gt;</code> element is the preferred way to italicize, because it carries not just stylistic but semantic meaning. Accordingly, I use <code class="language-markup">&lt;i&gt;</code> for my icons.</em>

Don't forget to leave a space between the tag and the supporting text. For example, use:

<pre><code class="language-markup">&lt;i class="icon-twitter"&gt;&lt;/i&gt; Twitter</code></pre>

Not:

<pre><code class="language-markup">&lt;i class="icon-twitter"&gt;&lt;/i&gt;Twitter</code></pre>

<h2>Styling icons</h2>

Because the icons are a font, they will inherit the styling of their parent container by default. However, you can apply additional styling using CSS.

For example, if you wanted all icons to have a shadow, you could add the <code class="language-css">text-shadow</code> property to <code class="language-css">[class^="icon-"]:before, [class*=" icon-"]:before</code>. You can also add gradients, hover effects, CSS3 transitions and more. One limitation: the icons can only be a single color.

I like my social media icons to have branded colors, but still display the default hover behaviors. Here's the code I would use to achieve that with the Twitter icon:

<pre><code class="language-css">a .icon-twitter {
    color: #41b7d8;
}</code></pre>

This code says that when a Twitter icon is used in a link, it's color should be <code class="language-css">#41b7d8</code>, which is Twitter blue.

In my base CSS, links on hover <del datetime="2013-05-24T13:03:14+00:00">turn black</del> darken and are underlined. With the code above, the icon would still be underlined, but would be Twitter blue. We can fix this by adding a hover color:

<pre><code class="language-css">a .icon-twitter {
    color: #41b7d8;
}
a:hover .icon-twitter{
    color: #005580;
}</code></pre>

<h3>Branded colors</h3>

While by no means comprehensive, here's a list of popular social site colors to get you started.

<ul>
<li>Twitter: <span style="color: #41b7d8;">#41b7d8</span></li>
<li>Facebook: <span style="color: #3b5997;">#3b5997</span></li>
<li>Google: <span style="color: #d64937;">#d64937</span></li>
<li>LinkedIn: <span style="color: #0073b2;">#0073b2</span></li>
<li>Vimeo: <span style="color: #388fc5;">#388fc5</span></li>
<li>Flickr: <span style="color: #ff0084;">#ff0084</span></li>
<li>Pinterest: <span style="color: #cb2027;">#cb2027</span></li>
<li>Skype: <span style="color: #00aff0;">#00aff0</span></li>
<li>RSS: <span style="color: #e0812a;">#e0812a</span></li>
</ul>

<h2>Accessibility considerations</h2>

Icon fonts are typically not read by screen readers. For accessibility reasons, you should not rely on the icon alone to convey meaning.

There's a simple CSS class you can use to include supporting text in your HTML but position it off screen. If you wanted to display a Twitter icon, for example, you would use this code:

<em>HTML</em>
<pre><code class="language-markup">&lt;i class="icon-twitter"&gt;&lt;/i&gt; &lt;span class="screen-reader"&gt;Twitter&lt;/span&gt;</code></pre>

***Note:*** *the `.screen-reader` class was updated on December 12, 2016 to a different technique that works better.*

<em>CSS</em>
```lang-css
/**
 * Visually hide an element, but leave it available for screen readers
 * @link https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/main.css
 * @link http://snook.ca/archives/html_and_css/hiding-content-for-accessibility
 */
.screen-reader {
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
}
```

Because the text wrapped in the <code class="language-css">.screen-reader</code> class is still displayed, screen readers will detect it in the HTML and read it out loud. But because it's positioned off screen, sighted users will not see it.

<h2>Browser support</h2>

Icon fonts work in Firefox, Chrome, Opera, Safari and the latest versions of Internet Explorer back. They work in iOS and Android, but not Opera Mini. Strangely, they don't work in IE9 on Windows Phone 7. This has been fixed in Windows Phone 8</a>.

While <code class="language-css">@font-face</code> embedding has been supported since IE 5, the approach detailed in this article uses pseudo selectors to include icons in the HTML, and that's only supported back to IE 8. IcoMoon includes a JavaScript file named <code class="language-javascript">lte-ie7.js</code> that's supposed to provide support for older browsers, but I've never gotten it to work, and several others have mentioned running into issues with it in the comments section.

I treat icons as a progressive enhancement, and use a simple feature test to check for support.

<h2>Feature test</h2>

Browsers that don't support <code class="language-css">@font-face</code> will sometimes display empty boxes where the icons should go. This looks ugly and can sometimes overlap with text, making it difficult to read. I use a simple JavaScript feature test to check for <code class="language-css">@font-face</code> and pseudo selector support.

<a href="https://gist.github.com/cferdinandi/6269067">Download the script from GitHub</a> and include it in your <code class="language-markup">&lt;head&gt;</code> element:

<pre><code class="language-javascript">&lt;script src="font-face-feature-test.js"&gt;&lt;/script&gt;</code></pre>

This adds a <code class="language-css">.font-face</code> class to the <code class="language-markup">&lt;html&gt;</code> element when both <code class="language-css">@font-face</code> and the <code class="language-css">:before</code> pseudo selector are supported. In my CSS file, I prefix the icon names with that class, so that they're only activated when a browser has the proper support:

<pre><code class="language-css">.font-face .icon-twitter:before {
    content: "\e000";
}
.font-face .icon-facebook:before {
    content: "\e001";
}
.font-face .icon-dribbble:before {
    content: "\e002";
}</code></pre>

You can also use this class to change what content is displayed based on whether or not the browser supports icon fonts. For example, you might show an icon for supporting browsers, and plain text for older browsers. Here's an example:

<p class="space-bottom-small"><strong>HTML:</strong></p>
<pre><code class="language-markup">&lt;span class="if-font-face"&gt;&lt;i class="icon-twitter"&gt;&lt;/i&gt; &lt;span class="screen-reader"&gt;Tweet This&lt;/span&gt;&lt;/span&gt;
&lt;span class="no-font-face"&gt;Tweet This&lt;/span&gt;</code></pre>

<p class="space-bottom-small"><strong>CSS:</strong></p>
<pre><code class="language-css">.if-font-face,
.font-face no-font-face {
    display: none;
    visiblity: hidden;
}

.font-face .if-font-face {
    display: inline;
    visibility: visible;
}</code></pre>

<h2>Using icons today</h2>

Despite these considerations, icon fonts are very well supported, highly-flexible, and ready to be used on web projects today. Their small size and crisp resolution make them a versatile addition to responsive web development.

<h4>Referenced & Useful Resources</h4>

<ol>
<li><a href="http://icomoon.io/">IcoMoon</a></li>
<li><a href="http://css-tricks.com/examples/IconFont/">Icon Fonts are Awesome</a> by CSS-Tricks</li>
<li>Trent Walton on <a href="http://trentwalton.com/2012/05/04/icon-fonts/">why he switched to icon fonts</a></li>
<li>Typekit on <a href="http://blog.typekit.com/2012/11/01/announcing-windows-phone-8-support/">Windows Phone 8 Support</a></li>
</ol>