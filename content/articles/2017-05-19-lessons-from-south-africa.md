---
categories:
- Code
- Design and UX
- JavaScript
- Web Performance
date: '2017-05-19'
url: /lessons-from-south-africa/
title: Lessons from South Africa
---

Last week <a href="https://una.im/">Una Kravets</a> was at the <a href="https://pixelup.co.za/">Pixel Up! UX conference</a> in South Africa. She shared <a href="https://twitter.com/una/status/861512242101186561">some insights from folks who live there</a> about building sites for an international audience.

The two that stood out for me:

<ol>
<li>If it doesn't work offline, it just won't catch on.</li>
<li>Accessing the web is really expensive, especially with all of the taxes applied to data charges.</li>
</ol>

So what can you do about it?

For offline, it's worth digging into Progressive Web Apps. <a href="https://cloudfour.com">Jason Grigsby from Cloud Four</a> gave an awesome presentation on this at An Event Apart Boston this week, and shared <a href="https://developers.google.com/web/ilt/pwa/">this course from Google</a> and <a href="https://aneventapart.com/news/post/resources-from-boston-2017">this massive collection of resources</a> (scroll down to Jason's name) with me as good places to start.

That second item&mdash;data being really expensive&mdash;is where <a href="https://gomakethings.com/vanilla-javascript-and-performance/">performance best practices</a> come in. Keep image files as small as you can (responsive image techniques are great for this). Progressively enhance your sites. <a href="https://gomakethings.com/how-to-only-load-your-javascript-file-if-the-browser-supports-your-code/">Don't even load JavaScript files on browsers that don't support your code.</a>