---
categories:
- Code
- JavaScript
date: '2017-04-05'
url: /removing-an-element-from-the-dom-with-vanilla-js/
title: Removing an element from the DOM with vanilla JS
---

Yesterday, [I showed you how to inject elements into the DOM](/adding-a-new-element-to-the-dom-with-vanilla-js/). Today, let's look at how to remove them.

There are two ways to remove an element from the DOM with vanilla JS, and both are really easy. If you just want to hide the element with CSS (useful if you may bring it back at some point), you can use the `style` property.

```javascript
var elem = document.querySelector('#some-element');
elem.style.display = 'none';
```

If you want to remove the element from the DOM entirely, you can use the `removeChild()` method.

```javascript
var elem = document.querySelector('#some-element');
elem.parentNode.removeChild(elem);
```

Not bad, right?