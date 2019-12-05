---
title: "You probably don't need a DOMContentLoaded event in your JavaScript"
date: 2019-12-05T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

I often see developers who come from a jQuery background use a vanilla JS equivalent of the `jQuery.ready()` event before running their code.

```js
document.addEventListener('DOMContentLoaded', function () {
	// This code won't run until the DOM content is loaded...
	console.log('loaded!');
}, false);
```

You need something like this when your JavaScript is in the `head`, but references stuff in the `body`. If you don't wait until the content is loaded, those elements won't exist yet and your script will throw an error.

The thing is... if you're going to wait until the DOM is loaded before running the script, why not just put it in the `footer` in the first place?

```js
// This code will run right away, but if it's in the footer, the DOM content is already loaded
console.log('loaded!');
```

JavaScript in the header can also cause massive bottlenecks and rendering delays, so moving your script to the footer is better for performance, too!