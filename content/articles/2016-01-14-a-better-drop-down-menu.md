---
categories:
- Code
- Design &amp; UX
- JavaScript
date: '2016-01-14'
title: A better drop-down menu
---

A month or so ago, the delightful [Sara Soueidan tweeted](https://twitter.com/SaraSoueidan/status/676694221424840704):

> Designers/Developers should _seriously_ stop making JavaScript-dependent drop-down navigation. Stop making us wait so long to use it! #UX

I like JavaScript-powered drop-down menus for one big reason: they stay open after you click/tap them. No issues with a menu closing on you if your mouse drifts ever so slightly out of the dropdown menu.

**But...** Sara's right. Until the JavaScript file loads, the drop-down menu doesn't work. And worse yet, if it fails to load or the browser isn't supported, it's never usable.

[Drop, my mobile-friendly drop-down menus](https://github.com/cferdinandi/drop), were guilty of this. I recommended people using a fallback link, but that's lame.

So I decided to fix it. In version 10, the default is to display the drop-down content on hover. Once the JavaScript file loads, the progressively enhanced click-to-display-content method is used instead.

Thanks for the push, Sara!