---
title: "How to add and remove classes with vanilla JS"
date: 2021-04-19T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The `Element.classList` API provides methods that you can use to `add()`, `remove()`, `toggle()` and check if an element `contains()` a class or classes.

```js
let elem = document.querySelector('#sandwich');

// Add the .turkey class
elem.classList.add('turkey');

// Remove the .tuna class
elem.classList.remove('tuna');

// Toggle the .tomato class on or off
// (Add the class if it's not already on the element, remove it if it is.)
elem.classList.toggle('tomato');

// Check if an element has the .mayo class
if (elem.classList.contains('mayo')) {
	console.log('add mayo!');
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/PoWdeKx)

One lesser known feature of the `Element.classList` API is that you can also use it to add or remove _multiple classes_ from element. Pass the classes to add or remove into the respective method as a comma separated list.

```js
// Add the .turkey and .mayo classes
elem.classList.add('turkey', 'mayo');

// Remove the .tuna and .tomato classes
elem.classList.remove('tuna', 'tomato');
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/MWJqGOa)

If you have an array of classes, you can use [array destructuring](/destructuring-in-javascript/) to pass in all of the classes as individual items.

```js
let classNames = ['turkey', 'mayo'];
elem.classList.add(...classNames);
```

[Here's one last demo.](https://codepen.io/cferdinandi/pen/abpaGqW)