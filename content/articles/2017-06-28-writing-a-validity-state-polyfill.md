---
categories:
- Code
- JavaScript
date: '2017-06-28'
permalink: /writing-a-validity-state-polyfill/
title: Writing a Validity State Polyfill
url: /2017/06/28/writing-a-validity-state-polyfill
---

In [the last article in this series](https://gomakethings.com/vanilla-javascript-form-validation-and-the-constraint-validation-api/), we built a lightweight script (6kb, 2.7kb minified) using the Validity State API to enhance the native form validation experience. It works in all modern browsers and provides support IE support back to IE10. But, there are some browser gotchas.

[Not every browser supports every Validity State property.](https://quirksmode.org/dom/forms/index.html#link2) Internet Explorer is the main violator, though Edge does lack support for tooLong even though IE10+ support it. And Chrome, Firefox, and Safari got full support only recently.

In [today's post on CSS Tricks](https://css-tricks.com/form-validation-part-3-validity-state-api-polyfill/), we'll write a lightweight polyfill that extends our browser support all the way back to IE9, and adds missing properties to partially supporting browsers, without modifying any of the core code in our script.

[Read it here.](https://css-tricks.com/form-validation-part-3-validity-state-api-polyfill/)