---
categories:
- Code
date: '2014-08-04'
permalink: /how-to-build-wicked-fast-rwd-sites/
title: How to build wicked fast RWD sites
url: /2014/08/04/how-to-build-wicked-fast-rwd-sites
---

This site is pretty fast already, but over the weekend, I made some adjustments to further improve it's performance.

This article was *supposed* to be about the changes I made and how they made my site even faster. Instead, they actually slowed my site down. Today, I want to share with you what I tried, how it impacted my performance, and how I ultimately set things up to keep this site high-performing.

<!--more-->

## The Adjustments

My site today is structured around the recommendations from my [Wicked Fast Websites series](/wicked-fast-websites/): CSS up top, JS at the bottom, icon fonts for my icons.

There are two emerging performance recommendations I wanted to try out:

1. Converting from an icon fonts, which many consider a hack, to [an SVG sprite](http://css-tricks.com/svg-sprites-use-better-icon-fonts/).
2. At the recommendation of [Google](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp), [Filament Group](http://filamentgroup.com/lab/performance-rwd.html) (whose site is absurdly fast, by the way), and a few others, inlining my critical path css for faster rendering.

## The Performance Tests

I used [WebPageTest.org](http://www.webpagetest.org/) to test my performance.

Since I've already go the overall size a typical page on my site down to a lean ~25kb, the number I really cared about was *Start Render*. That measures how quickly the site begins to render content in the browser.

I ran all tests with IE9 on a cable connection, and most of them a second time with Chrome on a fast 3G connection. When the results seemed too high to be accurate, I reran the test and used the better performing of the two results. I've omitted the results of the 3G test from the table below because I did not run them for all setups (more on that later).

### Definitions

**CSS**
*External CSS:* An external, linked file.
*Inline CSS:* The full contents for my CSS file inline (~5kb minified and gzipped).
*Critical CSS:* The above fold contents inline, and the full CSS async loaded with [Filament's LoadCSS script](https://github.com/filamentgroup/loadCSS).

**Icons**
*Icon Font:* A 7.8kb icon font built with [IcoMoon](https://icomoon.io/).
*Embedded SVG:* An SVG sprite hidden and included directly in the markup.
*External SVG:* An SVG sprite included by referencing an external (minified and gzipped) file.

**Feature Detection**
*Inline Detects:* An script to detect support for SVG or `@font-face`.
*External Detects:* An external JS file to detect support for SVG or `@font-face`.

### The Results

<table>
	<thead>
		<tr>
			<th></th>
			<th>First View</th>
			<th>Subsequent Views</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><strong>Baseline</strong><br><a href="http://www.webpagetest.org/result/140803_WF_NSQ/">External CSS<br>Icon Font<br>External Detects</a></td>
			<td>0.711s</td>
			<td>0.322s</td>
		</tr>
		<tr>
			<td><a href="http://www.webpagetest.org/result/140803_0V_NY6/">Inline CSS<br>Embedded SVG<br>Inline Detects</a></td>
			<td>0.682s</td>
			<td>0.621s</td>
		</tr>
		<tr>
			<td><a href="http://www.webpagetest.org/result/140803_DM_NMN/">External CSS<br>Embedded SVG<br>Inline Detects</a></td>
			<td>0.691s</td>
			<td>0.506s</td>
		</tr>
		<tr>
			<td><a href="http://www.webpagetest.org/result/140804_Z0_CW/">External CSS<br>External SVG<br>Inline Detects</a></td>
			<td>1.286s</td>
			<td>0.386s</td>
		</tr>
		<tr>
			<td><a href="http://www.webpagetest.org/result/140804_YR_PZ/">Inline CSS<br>External SVG<br>Inline Detects</a></td>
			<td>1.698s</td>
			<td>0.672s</td>
		</tr>
		<tr>
			<td><a href="http://www.webpagetest.org/result/140804_GY_VW/">Critical CSS<br>External SVG<br>Inline Detects</a></td>
			<td>0.838s</td>
			<td>0.690s</td>
		</tr>
		<tr>
			<td><a href="http://www.webpagetest.org/result/140804_0V_11X/">Critical CSS<br>Embedded SVG<br>Inline Detects</a></td>
			<td>0.575s</td>
			<td>0.543s</td>
		</tr>
		<tr>
			<td><a href="http://www.webpagetest.org/result/140804_WH_59K/">Critical CSS<br>Icon Font<br>External Detects</a></td>
			<td>0.807s</td>
			<td>0.424s</td>
		</tr>
		<tr>
			<td><a href="http://www.webpagetest.org/result/140804_TW_N5E/">External CSS<br>Icon Font<br>Inline Detects</a></td>
			<td>0.851s</td>
			<td>0.412s</td>
		</tr>
		<tr>
			<td><a href="http://www.webpagetest.org/result/140804_Z9_Q7H/">Critical CSS<br>External SVG<br>External Detects</a></td>
			<td>0.973s</td>
			<td>0.703s</td>
		</tr>
		<tr>
			<td><a href="http://www.webpagetest.org/result/140804_JM_PZ1/">External CSS<br>External SVG<br>External Detects</a></td>
			<td>0.752s</td>
			<td>0.355s</td>
		</tr>
	</tbody>
</table>

***Note:*** *In almost all cases, the 3G test performed about 750ms slower in both categories. The one exception: my current setup, which runs on average about 200ms slower.*

## Analyzing the results

While there was a lot of variation among different combinations, there were also a few high-level patterns that stood out.

1. While inlining my CSS (either entirely or just critical path) sometimes resulted in a moderately faster initial renders, it always resulted in notably slower subsequent views.
2. There was no consistent advantage to inlining just my critical path CSS over the entire file, or vice-versa.
3. All other factors being equal, SVG and icon fonts seem to be equally performant.

Personally, I'd rather add an extra 100ms to an initial render to gain 300ms on all subsequent views. With that in mind, I don't think I'll be inlining my CSS or feature detects.

## UPDATE: When to use critical path CSS

Filament Group is a big advocate of [using critical path CSS](http://filamentgroup.com/lab/performance-rwd.html), and their post on it is what prompted me to run my tests. Scott Jehl from Filament [commented on on this post](https://twitter.com/scottjehl/status/496330101257404416):

> We tend to see the biggest improvements in start render on sites with complex layouts, imagery.

That makes sense. This site is incredibly light weight, and inlining CSS and *then* also asynchronously downloading an external file may actually add more overhead than just linking to the CSS. On a site with a larger CSS file, I can imagine the critical path CSS approach being beneficial.

## My Setup

My setup today:

* External CSS file, in the `<head>`.
* External feature detects script, in the `<head>`.
* External JS file, in the footer.
* An icon font generated with [IcoMoon](https://icomoon.io/).
* JS and CSS files minified and concatenated.
* No jQuery. All scripts are 100% native JavaScript.
* WordPress, cached hourly with [Comet Cache](https://wordpress.org/plugins/comet-cache/).<sup><a href="#footnote-1">1</a></sup>
* Expires headers for static content and gzipping, both [configured](https://github.com/cferdinandi/htaccess) in my `.htaccess` file.
* All images smushed with [ImageOptim](https://imageoptim.com/).

Going forward, I do plan to convert to SVGs. It's a true image format that gets around some of the weird rendering issues that can happen with icon fonts<sup><a href="#footnote-2">2</a></sup> and has better native support for screen readers and fallbacks for non-supporting browsers<sup><a href="#footnote-3">3</a></sup>.

#### Footnotes

1. <span id="footnote-1">This site runs on a really cheap shared hosting. Comet Cache probably has a bigger impact on the site's performance than anything else I've done. It costs $15, but it's worth every single penny.</span>
2. <span id="footnote-2">Even if you assign an icon to the Private Use Area section of unicode, browser vendors sometimes assign their own icons to those characters, which can result in unintentional characters being displayed.</span>
3. <span id="footnote-3">Screen reader and non-supporting browser fallback text is possible ([and not all that difficult](/icon-fonts/#feature-test)) with icon fonts, but it does require you to be aware of it and add an extra class and a little markup. SVGs, by contrast, have screen reader support and fallbacks built right in.</span>