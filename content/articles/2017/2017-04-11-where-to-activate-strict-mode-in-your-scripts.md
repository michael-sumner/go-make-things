---
categories:
- Code
- JavaScript
date: '2017-04-11'
url: /where-to-activate-strict-mode-in-your-scripts/
title: Where to activate strict mode in your scripts
---

[Andrew Borstein](http://andrewborstein.com) asked a few follow-up questions to [yesterday's article about strict mode](/javascript-strict-mode-and-why-you-should-always-use-it/) over in my [Vanilla JS Slack Room](/vanilla-js-guidebook/).

I'm going to answer each of them separately. First up, where to enable strict mode:

> Where in a script file or project directory should you include `use strict`?

1. Not globally. You want to include it inside some sort of parent scoping function or wrapper for your script. So that could be inside an IIFE, for example. Or if you’re writing a little helper function, inside that.
2. Right up at the top.

For example...

```javascript
;(function (window, document, undefined) {
    'use strict';
    // Code goes here...
})(window, document);

// Or...

var someFunction = function () {
    'use strict';
    // Do stuff...
};
```

And as a follow-up to that:

> I’m curious why you wouldn’t want to include it more globally. Is there some reason you wouldn’t want every function to `use strict`?

Simply, third-party scripts can cause you problems. If you use third-party scripts that don’t adhere to strict mode rules you’ll throw a bunch of errors on your site that you have no control over.

Next, learn [the types of errors strict mode catches](/types-of-errors-that-strict-mode-catches-that-would-otherwise-be-ignored/) that would otherwise be ignored.