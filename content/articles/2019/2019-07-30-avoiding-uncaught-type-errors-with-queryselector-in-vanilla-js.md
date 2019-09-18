---
title: "Avoiding Uncaught TypeErrors with the vanilla JS querySelector() method"
date: 2019-07-30T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The vanilla JS `querySelector()` method is amazing. It's not familiar with it, it returns the first element that matches any selector or combination of selectors that you pass in as an argument.

```js
// You can look for an element with a specific ID...
document.querySelector('#some-id');

// or by a class...
document.querySelector('.some-class');

// or data attribute.
document.querySelector('[data-thingy]');

// You can also combine selectors...
document.querySelector('#vegetable.purple');

// Or nested them.
document.querySelector('#vegetables .tomato');
```

It brings the selector ease that was once only possible with jQuery to vanilla JS.

But, if you pass in a selector for an element that doesn't exist and then try to do something with it, the browser with throw an `Uncaught TypeError`.

```js
var notReal = document.querySelector('#this-does-not-exist');

// Uncaught TypeError: Cannot read property 'classList' of null
notReal.classList.add('text-small');
```

When `querySelector()` doesn't find a match, it returns `null`. Because it's not an element, methods like `classList` don't exist on it, hence the error.

To prevent this from happening, make sure you check if the element exists first.

```js
var notReal = document.querySelector('#this-does-not-exist');

// No error
if (notReal) {
	notReal.classList.add('text-small');
}
```