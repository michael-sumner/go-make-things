---
categories:
- Code
- JavaScript
date: '2017-07-11'
title: Where can you find JavaScript polyfills?
---

Yesterday, I gushed about <a href="https://gomakethings.com/why-i-love-polyfills">why I love polyfills</a>.

So, where do you find them?

<ol>
<li>The <a href="https://developer.mozilla.org/">Mozilla Developer Network</a> is a great place to learn about JavaScript APIs. They'll often include links to polyfills if they exist or are needed.</li>
<li><a href="https://github.com/search?utf8=%E2%9C%93&amp;q=polyfill&amp;type=">GitHub is filled with polyfills</a> of varying quality. I typically look at any existing issues and the number of stars in evaluating whether or not they're any good.</li>
<li>Remy Sharp, who coined the term, <a href="https://github.com/remy/polyfills">maintains a list of his own polyfills</a>. Literally anything he writes is awesome.</li>
<li>After a while, you may start to feel comfortable writing your own. I recently did that for the <a href="https://github.com/cferdinandi/validate/blob/master/dist/js/validityState-polyfill.js">Validity State API</a> after I was unable to find a polyfill elsewhere.</li>
</ol>