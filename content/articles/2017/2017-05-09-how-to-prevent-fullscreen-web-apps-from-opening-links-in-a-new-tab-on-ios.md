---
categories:
- Code
- JavaScript
date: '2017-05-09'
url: /how-to-prevent-fullscreen-web-apps-from-opening-links-in-a-new-tab-on-ios/
title: How to prevent fullscreen web apps from opening links in a new tab on iOS
---

The other week, someone opened a bug on my <a href="https://github.com/cferdinandi/tabby">toggle tabs plugin</a> because when used in a web app on iOS, the tab links were opening in a new window (breaking the app experience).

This behavior has always struck me as a bug in Apple's design model. I get why you'd want that for external links, but for internal ones, they should open in-app.

Here's a really simple way to fix the issue:

<pre><code class="lang-javascript">var eventHandler = function (event) {
    // Only run for iOS full screen apps
    if (('standalone' in window.navigator) &amp;&amp; window.navigator.standalone) {
        // Only run if link is an anchor and points to the current page
        if ( event.target.tagName.toLowerCase() !== 'a' || event.target.hostname !== window.location.hostname || event.target.pathname !== window.location.pathname || !/#/.test(event.target.href) ) return;

        // Open link in same tab
        event.preventDefault();
        window.location = event.target.href;
    }
}
window.addEventListener('click', eventHandler, false);
</code></pre>