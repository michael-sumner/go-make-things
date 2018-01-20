---
categories:
- Design &amp; UX
date: '2012-07-16'
url: /typography-first-web-design/
title: Typography First Web Design
---

Last week, I launched a redesign of Go Make Things with a single objective: to create a design that was really enjoyable to read.

Today, I want to walk you through the process, the decisions I made, and why I made them.
<!--more-->
<h2>The Why</h2>

In a word, <a href="http://www.instapaper.com/">Instapaper</a>.

Once you get used to reading articles in Instapaper, you gain a much deeper appreciation for good typography - large font sizes, well spaced and measured lines, and beautiful typefaces. And you start to realize how much reading on a typical webpage actually sucks.

I'd like to think Go Make Things was actually a pretty good reading experience already, but typography was not something I'd spent much time thinking about.

For this experiment, I wanted to start with typography first, and build a web experience around that.

<h2>The How</h2>

As far as typefaces go, Georgia holds a special place in my heart.

Even when Instapaper released their recent update with a variety of new and beautiful fonts, I stuck with Georgia. It's the font I use in iBooks and my mobile RSS reader, too. It's incredible readable, even at smaller sizes.

So when I went to choose a primary typeface, Georgia was my first choice.

<h3>Setting the Size</h3>

I spent a few weeks experimenting with Georgia in various font sizes on my laptop, my iPhone and my iPad.

I wanted to a size that would be highly readable on both a standard resolution computer screen and high resolution Retina displays. A 16 pixel font size looks normal on a computer but too small on a Retina display. At 18 pixels, Georgia is beautiful on Retina but too big for the desktop.

While I'm not wild about odd numbers, 17 pixels turned out to be just right for both.

<h3>Setting the Width & Line Height</h3>

After experimenting with a variety of line-lengths, somewhere around 85 characters-per-line turned out to be the most comfortable for long-form reading. That works out to 640 pixels wide for a 17 pixel font size.

I used Chris Pearson's <a href="http://www.pearsonified.com/typography/">Golden Ratio Typography calculator</a> to determine my line height, which came out to 26 pixels.

(<em>Chris's calculator is a great tool - I'll definitely be using this on all of my projects going forward!</em>)

<h3>Creating a Typographic Scale</h3>

In the past, I've always just arbitrarily picked sizes for my headers and meta information, experimenting until I found something that "looked right."

However, typographers have literally spent hundreds of years perfecting the art of the typographic scale. This time, I wanted to use their methods to great a more visually pleasing scale.

Fortunately, Ian Lamb's <a href="http://lamb.cc/typograph/">Typograph app</a> did all the heavy lifting. You enter your font size and line height, and select your desired scale (in this case, Traditional). The app provides you with a scale in pixels, ems and points.

This scale became the basis for every header, margin, list, and piece of text on the site. The one exception: headers are set with a line-height of 1.2 ems.

<h2>Adding the Details</h2>

At this point, I had a layout that was very readable but not terribly distinctive.

(Ok, if I'm being honest, the process was far less linear, with lots of experimenting. I would add some branding details, tweak the typography, and repeat iteratively.)

I repurposed the branding from my previous layout, using the same colors for the header, links and footer. And while I made some minor tweaks to quote formatting and the comments section, the branding is largely the same.

<h3>Dropping the Sidebar</h3>

I decided at the very beginning of this experiment to remove the sidebar.

I've gotten used to reading on my phone and iPad, where sites are often displayed as single column. I like the experience so much, I wanted to use it as the default for the redesigned Go Make Things.

Let's be honest: there's usually nothing all that important in the sidebar, anyways.

<h3>Adding Responsive Web Design</h3>

Normally, responsive design is something I build in from the very start. However, because this is a single column layout, there weren't many considerations in the way of reflowing a grid.

This is, in fact, the easiest responsive site I've ever built. I made just a handful of small adjustments:

<ul>
<li>I changed the main container div from <code>width: 640px;</code> to <code>max-width: 640px;</code>. This causes the site to fluidly resize itself on smaller screens. (<em>Max-width isn't supported by IE6, but the browser is now more than ten years old, and I'm not longer supporting it for this site.</em>)</li>
<li>I decreased the line height to 25 pixels for screens below 640 pixels (<em>again, using the Golden Ratio Typography calculator to determine the right line height for smaller site widths</em>).</li>
<li>I decreased the left margin on lists on quotes for improved readability on smaller screens.</li>
<li>I decreased the font size of H1 and H2 headers on smaller screens, keeping them within the typographic scale.</li>
<li>I set form inputs to span the full width of the screen on smaller devices.</li>
</ul>

And that's pretty much it.

<h4>Learn More</h4>

<ol>
<li><a href="http://www.pearsonified.com/2011/12/golden-ratio-typography.php">The Ultimate Guide to Readable Web Typography</a> by Chris Pearson.</li>
<li><a href="http://informationarchitects.net/blog/the-web-is-all-about-typography-period/">Web Design is 95% Typography</a> and <a href="http://informationarchitects.net/blog/responsive-typography-the-basics/">Responsive Web Typography: The Basics</a> by Oliver Reichenstein.</li>
<li><a href="http://www.markboulton.co.uk/journal/comments/five-simple-steps-to-better-typography">Five Simple Steps to Better Typography</a> by Mark Boulton.</li>
<li>Chris Pearson's <a href="http://www.pearsonified.com/typography/">Golden Ratio Typography Calculator</a>.</li>
<li>Ian Lamb's <a href="http://lamb.cc/typograph/">Typograph app</a>.</li>
</ol>