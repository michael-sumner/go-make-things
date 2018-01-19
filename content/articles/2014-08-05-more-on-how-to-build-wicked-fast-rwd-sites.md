---
categories:
- Code
date: '2014-08-05'
title: Differences in mobile and desktop performance
---

Yesterday, I wrote a post on [how to build wicked fast RWD sites](/how-to-build-wicked-fast-rwd-sites/). In it, I documented about a dozen performance tests using various combinations of CSS, JS, and icon implementations.

There's one thing I didn't discuss in yesterday's post that I want to explore in more detail: Performance variations between desktop and mobile devices.

<!--more-->

## Performance variations between desktop and mobile

The big takeaway from yesterday's post was that icon fonts and SVG sprites perform equally well, all other things being equal.

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
			<td><a href="http://www.webpagetest.org/result/140803_WF_NSQ/">Icon Font</a></td>
			<td>0.711s</td>
			<td>0.322s</td>
		</tr>
		<tr>
			<td><a href="http://www.webpagetest.org/result/140804_JM_PZ1/">External SVG</a></td>
			<td>0.752s</td>
			<td>0.355s</td>
		</tr>
	</tbody>
</table>

That's true on desktop devices, but on mobile devices, icon fonts actually perform far better than SVGs.

<table>
	<thead>
		<tr>
			<th></th>
			<th>Desktop First View</th>
			<th>Desktop Subsequent Views</th>
			<th>Mobile First View</th>
			<th>Mobile Subsequent Views</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Icon Font</td>
			<td><a href="http://www.webpagetest.org/result/140803_WF_NSQ/">0.711s</a></td>
			<td><a href="http://www.webpagetest.org/result/140803_WF_NSQ/">0.322s</a></td>
			<td><a href="http://www.webpagetest.org/result/140804_24_TYF/">1.490s</a></td>
			<td><a href="http://www.webpagetest.org/result/140804_24_TYF/">0.692s</a></td>
		</tr>
		<tr>
			<td>External SVG</td>
			<td><a href="http://www.webpagetest.org/result/140804_JM_PZ1/">0.752s</a></td>
			<td><a href="http://www.webpagetest.org/result/140804_JM_PZ1/">0.355s</a></td>
			<td><a href="http://www.webpagetest.org/result/140804_R2_T0V/">2.388s</a></td>
			<td><a href="http://www.webpagetest.org/result/140804_R2_T0V/">0.894s</a></td>
		</tr>
	</tbody>
</table>

As you can see, SVGs on mobile devices take almost a full second longer to initially render than icon fonts. I ran a few tests and kept getting [similar results](http://www.webpagetest.org/result/140804_EY_SVJ/). The SVG file was minified and gzipped, and was roughly the same size as it's icon font equivalent.

While subsequent views perform much better, that initial view is a big deal, and a full second is a very meaningful amount of time. Based on this data, I'll be sticking with my current icon font setup, despite some of the advantages of using SVGs.