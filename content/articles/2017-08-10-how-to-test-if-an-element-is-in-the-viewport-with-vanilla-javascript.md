---
categories:
- Code
- JavaScript
date: '2017-08-10'
url: /how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
title: How to test if an element is in the viewport with vanilla JavaScript
---

Today, I want to show you how to write a small vanilla JS helper function to check if an element is in the viewport.

"In the viewport" means in the visible part of the screen, as opposed to above or below the visible area. This is useful when doing things like creating lazy loading scripts.

## Getting the bounding coordinates

At the heart of our function is `Element.getBoundingClientRect()`, which provides an element's position within the viewport. It returns an object with an element's height and width, as well as it's distance from the top, bottom, left, and right of the viewport.

```javascript
// Get the H1 heading
var h1 = document.querySelector('h1');

// Get it's position in the viewport
var bounding = h1.getBoundingClientRect();

// Log the results
console.log(bounding);
// {
// 	height: 118,
// 	width: 591.359375,
// 	top: 137,
// 	bottom: 255,
// 	left: 40.3125,
// 	right: 631.671875
// }
```

## Determining if the element is in the viewport

If an element is in the viewport, it's position from the `top` and `left` will always be greater than or equal to `0`. It's distance from the `right` will be less than or equal to the total width of the viewport, and it's distance from the `bottom` will be less than or equal to the height of the viewport.

There are two ways to check the viewport's width. Some browsers support `window.innerWidth`, other's support `document.documentElement.clientWidth`, and some support both. We can try one and fallback to the other by doing something like this:

```javascript
(window.innerWidth || document.documentElement.clientWidth)
```

Similarly, to get the viewport height, we can use `window.innerHeight` in some browsers and `document.documentElement.clientHeight` in others. Like with width, we can try one and fallback to the other:

```javascript
(window.innerHeight || document.documentElement.clientHeight)
```

## Putting it all together

Let's use that heading from earlier as an example.

```javascript
// Get the H1 heading
var h1 = document.querySelector('h1');

// Get it's position in the viewport
var bounding = h1.getBoundingClientRect();

// Log the results
console.log(bounding);
// {
// 	height: 118,
// 	width: 591.359375,
// 	top: 137,
// 	bottom: 255,
// 	left: 40.3125,
// 	right: 631.671875
// }
```

We can check if the element is in the viewport like this.

```javascript
if (
	bounding.top >= 0 &&
	bounding.left >= 0 &&
	bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
	bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
) {
	console.log('In the viewport!');
} else {
	console.log('Not in the viewport... whomp whomp');
}
```

That's super clunky to have to write out each time though, so this kind of thing deserves it's own helper function.

```javascript
var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
```

We can pass in our element, and `isInViewport()` will get the bounding coordinates and run our check. It returns `true` if it's in the viewport, and `false` if it's not.

```javascript
var h1 = document.querySelector('h1');
if (isInViewport(h1)) {
    // Do something...
}
```

## Using the helper method

So how would you use it?

One way I've put this to use is in a lazy loading script. I listen for scroll events, and check if my image is in the viewport on scroll. If it is, I load it.

Here's a really simplified version...

```markup
<figure data-image="url/to/my/image.jpg">My image will go here...</figure>
```

```javascript
var image = document.querySelector('[data-image]');
window.addEventListener('scroll', function (event) {
	if (isInViewport(image)) {
		image.innerHTML = '<img src="' + image.getAttribute('data-image') + '">';
	}
}, false);
```

You can [grab a copy of this helper function on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/isinviewport/).