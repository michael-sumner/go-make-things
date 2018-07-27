---
title: "console.dir()"
date: 2018-07-27T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The wonderful [Remy Sharp shared an awesome browser console trick](https://twitter.com/rem/status/1021741840234688513) this week.

> You know that console.log(<el>) in devtools lets you see the element. Did you know console.dir(<el>) lets you inspect the element DOM properties?

To see it in action, open up any website, open up developer tools, and click over to the "Console" tab. Then copy/past this in and hit enter.

```js
console.dir(document.body);
```

Instead of seeing the element, like you would with `console.log()`, you'll get back a list of all of the properties on that element. Cool!