---
categories:
- Uncategorized
date: '2012-08-29'
title: CSS Sprite Apps
---

After <a href="https://gomakethings.com/how-to-trick-out-the-performance-of-your-wordpress-site/">making some performance updates</a> to this site last week, I decided to apply what I learned to the website I manage for <a href="http://www.pawsnewengland.com">PAWS New England</a>, an all-breed dog rescue.

Because of what they do, there's a lot of powerful imagery they would like to share with their visitors. One issue I didn't have to deal with on this site but did for PAWS New England was the creation of <a href="http://css-tricks.com/css-sprites/">image sprites</a>.

If you're not familiar with the concept, an image sprite is a single file containing all the graphics you need for a site. These graphics are then placed on the site using the <code>background</code> tag rather than the <code>img</code> tag. Even though the resulting file is one large one, it's actually easier and faster for browsers to download than multiple smaller files, because it requires fewer HTTP requests.

So CSS sprites are good for performance. They're also a pain to create. Fortunately, there's an app that makes it a lot easier.
<!--more-->

<a href="http://spritegen.website-performance.org/">CSS Sprite Generator</a> is awesome. You simply upload your images in a single ZIP file and it does the rest. It combines them into a single PNG file and provides you with the css to use them on your site.

You can specify a prefix, background colors and more.

The one downside to sprites that I've encountered is that they don't resize themselves in fluid layouts. For small icons, this isn't an issue. But for large full-width graphics, it's a real problem.

For the few big graphics we've used, I've had to forgo sprites. If you know a workaround, I'd love to hear about it!