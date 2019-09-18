---
title: "How performant are data attributes as selectors"
date: 2019-07-24T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Whenever I write about [using data attributes as selectors](/how-to-approach-javascript-selectors-with-vanilla-js/), someone asks me how performant it is compared so using classes.

Let's find out!

## How to test performance

The `performance.now()` method returns a timestamp in milliseconds.

We can use this to measure how long different approaches take by capturing it’s value just before and just after we inject a bunch of DOM elements. By subtracting the two values, we get the elapsed time in milliseconds that it took to complete our tasks.

```js
var start = performance.now();
// Do some stuff...
var end = performance.now();

// The time it took to complete our tasks
console.log('It took ' + (end - start) + 'ms to complete this task');
```

## Setting up a test

To set up my test, I'm going to create an HTML document with ten thousand list items in it. I'll give each item both a class and data attribute, and use both as selectors.

Creating ten thousand items by hand would take forever, so let's use JavaScript to do it for us.

I created an empty element with an ID of `#app` on it. Then, I ran a `for` loop ten thousand times, creating an element and injecting it into the DOM on each loop.

```js
// Variables
var app = document.querySelector('#app');
var count = 10000;
var elem;

// Create elements
for (var i = 0; i < count; i++) {

	// Create element
	elem = document.createElement('li');
	elem.textContent = 'List Item ' + i;

	// Add ID, class, and data attribute
	elem.id = 'list-item-' + i;
	elem.className = 'list-item';
	elem.setAttribute('data-item', i);

	// Inject into the DOM
	app.appendChild(elem);

}
```

## Running the tests

To run our tests, we'll cache the value of `performance.now()`, selector our items by class or data attribute, and then cache the value of `performance.now()` again.

Then, we'll subtract the difference between the two to measure how long it took.

```js
/**
 * Start Performance Tests
 */

var start, end;


//
// By Class
//

start = performance.now();
var byClass = document.querySelectorAll('.list-item');
end = performance.now();
console.log('By class took ' + (end - start) + 'ms.');


//
// By Data Attribute
//

start = performance.now();
var byClass = document.querySelectorAll('[data-item]');
end = performance.now();
console.log('By data attribute took ' + (end - start) + 'ms.');
```

## The results

The results varied quite a bit each time I ran the test.

Sometimes classes were faster. Sometimes data attributes were faster. Sometimes both took a long time, and sometimes both ran really quickly.

On average, they both took about half a millisecond to run each. In other words: no difference whatsoever.

| Selector       | Time  |
|----------------|-------|
| Class          | 0.5ms |
| Data Attribute | 0.5ms |

[Download the test files from GitHub](https://gist.github.com/cferdinandi/0d52bd0f4416bfe6a99108bd5c173e38) to run the tests yourself.