---
categories:
- Design &amp; UX
date: '2012-04-16'
title: Go Make Things gets a refresh
---

Over the weekend I updated the underlying code that powers this site, and made a few small cosmetic changes. Most notably:

<ul>
<li>I switched from a universal reset (<code>* { margin: 0; padding: 0; }</code>) to a modified version of <a href="http://meyerweb.com/eric/tools/css/reset/">Meyer's CSS Reset</a>.</li>
<li>I've switched from ems to pixels for font sizes. Back in the day, if a visitor wanted to make the text on a website bigger, they increased the font size in their browser. Page zooming is now the accepted standard, and ems were creating some weird issues in the comments section, so this is a welcome change.</li>
<li>My icons looked absolutely awful on the new iPad retina display, so I'm now using an icon font set <del datetime="2012-04-19T00:59:42+00:00">powered by <a href="http://pictos.cc/">Pictos</a></del> by <a href="http://keyamoon.com/icomoon/">IcoMoon</a>. They look stunning at any size.</li>
<li>I'm now using hand-coded share buttons instead of the ones Twitter and Facebook provide. In conjunction with the Pictos icons, they look crisp and consistent on any screen.</li>
<li>I optimized for <a href="http://www.instapaper.com/">Instapaper</a>. The app does a great job of pulling content from articles, but often grabs extra stuff too, like titles, share buttons and so on. Two little tags in HTML and my articles now pull flawlessly into the app. I'm a huge fan of Instapaper, and highly recommend it.</li>
</ul>

<h2>Coming Soon: Go Code Things</h2>

The biggest news from this refresh: I'll be releasing a slightly modified version of my theme as a free Wordpress theme sometime in the next few weeks.

I learned to design websites because so many people who are much better at it than I am took the time to share their knowledge and tools on the web. I'd like to give back to the community, and help others learn from my experience.

I'll be stripping out the branding elements, and releasing this theme with copious in-line comments. I learned by experimenting - modifying lines of code and seeing what happened. I'd like to make that a bit easier for people.