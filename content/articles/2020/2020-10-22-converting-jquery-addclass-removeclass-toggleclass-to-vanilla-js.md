---
title: "Converting jQuery's addClass(), removeClass(), toggleClass(), and hasClass() methods to vanilla JS"
date: 2020-10-22T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

As part of my ongoing series in [how to convert jQuery methods and plugins to vanilla JS](/series/converting-jquery-to-vanilla-js/), today, we're going to be looking at a handful of methods for working with classes.

Let's dig in.

## The jQuery methods

The jQuery `addClass()`, `removeClass()`, `toggleClass()`, and `hasClass()` methods let you add a class, remove a class, toggle a class, and check for a class on an element, respectively.

```js
var $elem = $('.some-element');

// Adds the .blue class
$elem.addClass('blue');

// Removes the .red class
$elem.removeClass('red');

// Toggles the .purple class
// This adds the class if it's not there, and removes it if it is
$elem.toggleClass('purple');

// This checks if the .green class exists on an element
// It returns true if it does, and false if it does not
$elem.hasClass('green');
```

If you want to add or remove more than one class, you can pass them in as additional arguments.

```js
// Adds the .blue and .purple classes
$elem.addClass('blue purple');

// Removes the .red and .green classes
$elem.removeClass('red green');
```

Let's look at how to do this with vanilla JS

## Vanilla JS class methods

Converting jQuery's class manipulation methods to vanilla JS is really easy thanks to the `classList` API, a collection of methods inspired directly by jQuery.

The `Element.classList` API provides `add()`, `remove()`, `toggle()`, and `contains()` methods that add a class, remove a class, toggle a class, and check if a class exists on an element, respectively.

```js
var elem = document.querySelector('.some-element');

// Adds the .blue class
elem.classList.add('blue');

// Removes the .red class
elem.classList.remove('red');

// Toggles the .purple class
// This adds the class if it's not there, and removes it if it is
elem.classList.toggle('purple');

// This checks if the .green class exists on an element
// It returns true if it does, and false if it does not
elem.classList.contains('green');
```

Just like with jQuery, if you want to add or remove more than one class, you can pass them in as additional arguments. Unlike jQuery, you separate them with commas, and pass each in as its own argument.

```js
// Adds the .blue and .purple classes
elem.classList.add('blue', 'purple');

// Removes the .red and .green classes
elem.classList.remove('red', 'green');
```

## Browser compatibility

The `classList` API works in all modern browsers, and IE11 and up. It technically works back to IE10, but does not support SVGs in that browser.

Adding and removing multiple classes *does not work* in any version of IE.

[You can push support (including multiple classes) back to IE8 with a polyfill.](https://vanillajstoolkit.com/polyfills/classlist/)