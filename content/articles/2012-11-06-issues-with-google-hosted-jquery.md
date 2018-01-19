---
categories:
- Code
date: '2012-11-06'
excerpt: Google-hosted jQuery wasn't loading on certain devices. Here's how I fixed it.
permalink: /issues-with-google-hosted-jquery/
title: Issues with Google-hosted jQuery
url: /2012/11/06/issues-with-google-hosted-jquery
---

<em><strong>Note:</strong> I eventually figured out that there was a firewall setting causing the issues, and have since switched back to the Google CDN of jQuery.</em>

I've stopped using <a href="https://developers.google.com/speed/libraries/devguide">Google's hosted version</a> of jQuery, and have instead switched the the <a href="http://jquery.com/download/">one provided by jQuery.com</a>.

In testing <a href="https://gomakethings.com/work/jetpack/">JetPack</a>, I noticed that jQuery wasn't loading on my iPad or iPod Touch when connected to the corporate network. On 3G, it worked fine. I thought it might have something to do with the network's firewall, so I tested at home, too.

jQuery worked fine on my iPad, but not on the iPod, which is about 4 years old at this point. Peculiar.

I loaded the page in Chrome on iOS and discovered that the Google version was, ironically, causing a browser security error. I switched to the version hosted directly at jQuery.com and the issue went away.

I'm not sure why that would be the case, but I've updated this site, <a href="http://cferdinandi.github.com/go-mobile-first/">Go Mobile First</a>, and the <a href="http://cferdinandi.github.com/web-app-starter-kit/">Web App Starter Kit</a> to use the jQuery hosted version anyways.

[snippet id="8397"]