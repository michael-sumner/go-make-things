---
categories:
- Design and UX
- WordPress
date: '2017-07-19'
url: /adding-a-download-all-link-to-easy-digital-downloads-receipts/
title: Adding a &#8220;download all&#8221; link to Easy Digital Downloads receipts
---

One of the most frequent requests I get for my <a href="https://gomakethings.com/guides/">vanilla JS pocket guides</a> is to add a "Download All" link so that buyers can easily download all of the guides in all of the formats.

As of today, you can now do that.

One of the reasons I held off on doing this is because I want people to be able to just click a link to their guide of choice on their mobile device and start reading. iOS doesn't provide a native way to unzip compressed files and do this, and I didn't want to upload the same files in both zipped and unzipped formats.

Then I discovered the <a href="https://github.com/easydigitaldownloads/EDD-Download-All">EDD Download All</a> plugin.

It has no documentation, but works ok and does what its called. Unfortunately, though, it doesn't provide a way to add a "Download All" link to the confirmation emails Easy Digital Downloads sends out.

I created a <a href="https://github.com/cferdinandi/gmt-edd-download-all">forked version</a> that...

<ol>
<li>Adds the missing documentation.</li>
<li>Supports "Download All" links in the confirmation emails.</li>
<li>Excludes external pages/products that aren't downloadable files.</li>
<li>Supports automatic updates via the GitHub Updater plugin.</li>
</ol>

If you're using Easy Digital Downloads and want to add this functionality to your site, <a href="https://github.com/cferdinandi/gmt-edd-download-all">grab it on GitHub</a>.