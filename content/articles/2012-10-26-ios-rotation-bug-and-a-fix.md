---
categories:
- Accessibility
- Code
date: '2012-10-26'
excerpt: A jQuery fix for the rotation auto-scaling bug in iOS.
url: /ios-rotation-bug-and-a-fix/
title: iOS rotation bug (and a fix)
---

One of the quirks of the Safari browser on iOS is that when rotating from portrait to landscape, the browser will zoom in, even when the content has been optimized for smaller screens.

<em><strong>Update:</strong> This bug has been fixed in iOS 5, so this script is no longer necessary.</em>

To get around this quirk, people sometimes add <code class="language-markup">maximum-scale=1</code> and/or <code class="language-markup">user-scalable=no</code> to their meta viewport tag in the header. While this stops the zoom bug, it also prevents users from manually zooming, too. That's an accessibility faux pas.

Fortunately, there's <a href="https://github.com/scottjehl/iOS-Orientationchange-Fix">a javascript snippet</a> from <a href="https://twitter.com/scottjehl">Scott Jehl</a> and <a href="https://twitter.com/wilto">Mat Marquis</a> that fixes the issue.

<blockquote>How it works: This fix works by listening to the device's accelerometer to predict when an orientation change is about to occur. When it deems an orientation change imminent, the script disables user zooming, allowing the orientation change to occur properly, with zooming disabled. The script restores zoom again once the device is either oriented close to upright, or after its orientation has changed. This way, user zooming is never disabled while the page is in use.</blockquote>

<a href="https://github.com/scottjehl/iOS-Orientationchange-Fix">Grab the code from GitHub</a>, and then remove <code class="language-markup">maximum-scale=1</code> and/or <code class="language-markup">user-scalable=no</code> from your header if you use them.