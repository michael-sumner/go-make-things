---
title: "Testing DOM injection performance with vanilla JS"
date: 2019-05-21T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

Over the last few days, we looked at [several techniques](/two-different-ways-to-create-html-from-an-array-of-data-with-vanilla-js/) for [injecting elements into the DOM](/two-more-ways-to-create-html-from-an-array-of-data-with-vanilla-js/) from array data, and [one performance issue you should avoid](/loops-dom-injection-and-performance-with-vanilla-js/).

Today, I wanted to show you how to run some tests to figure out which method of vanilla JS DOM injection is the most performant.

*Quick shoutout to [Tommy Hodgins](https://tomhodgins.com/) for debating this topic with me last week and helping me setup some tests.*

## How to test performance

The `performance.now()` method returns a timestamp in milliseconds.

We can use this to measure how long different approaches take by capturing it's value just before and just after we inject a bunch of DOM elements. By subtracting the two values, we get the ellapsed time in milliseconds that it took to complete our tasks.

```js
var start = performance.now();
// Do some stuff...
var end = performance.now();

// The time it took to complete our tasks
console.log('It took ' + (end - start) + 'ms to complete this task');
```

## Setting up our tests

*__Note:__ you can [download the tests from GitHub](https://gist.github.com/cferdinandi/0cf73dd08dcbb5976b560eb22c02d5f4) and follow along if you want.*

For our tests, I want to loop through 1,000 entries in an array and generate list items using each of the four approaches we explored recently (and the one I said you should never do).

First, I created five empty containers for our content and gave them IDs. One of them is an unordered list (for the "bad for performance" version), but the rest are empty `div`'s.

```html
<div id="app1"></div>
<ul id="app2"></ul>
<div id="app3"></div>
<div id="app4"></div>
<div id="app5"></div>
```

Then, I cached the elements to variables.

```js
// Cache variables
var app1 = document.querySelector('#app1');
var app2 = document.querySelector('#app2');
var app3 = document.querySelector('#app3');
var app4 = document.querySelector('#app4');
var app5 = document.querySelector('#app5');
```

We also need an array with 1,000 items to loop over. I didn't want to create that by hand, so I wrote a little snippet to do it for me.

```js
// Create an array to iterate over
var items = [];
for (var i = 0; i < 1000; i++) {
	items.push(i);
}
```

## The test boilerplate

I created a little copy/paste boilerplate for each test.

```js
;(function () {
	var start = performance.now();

	// Run the test

	var end = performance.now();
	console.log('forEach() took ' + (end - start) + 'ms');
})();
```

Then, I setup five different tests, using...

1. `forEach()` and `innerHTML`
2. `forEach()` and `innerHTML` again, but injecting on each loop
3. `map()` and `join()` with `innerHTML`
4. `createElement()` and `appendChild()`
5. `createDocumentFragment()` and `appendChild()`

For example, here's the `forEach()` and `innerHTML()` test.

```js
// forEach() and innerHTML
;(function () {
	var start = performance.now();

	var html = '';
	items.forEach(function (item) {
		html += '<li>' + item + '</li>';
	});
	app1.innerHTML = '<ul>' + html + '</ul>';

	var end = performance.now();
	console.log('forEach() took ' + (end - start) + 'ms');
})();
```

And here's the `createElement()` and `appendChild()` version.

```js
// createElement()
;(function () {
	var start = performance.now();

	var list = document.createElement('ul');
	items.forEach(function (item) {
		var li = document.createElement('li');
		li.textContent = item;
		list.appendChild(li);
	});
	app4.appendChild(list);

	var end = performance.now();
	console.log('createElement() took ' + (end - start) + 'ms');
})();
```

## The Results

I strongly encourage you to [download the tests from GitHub](https://gist.github.com/cferdinandi/0cf73dd08dcbb5976b560eb22c02d5f4) and run them in your own browsers on your own machines.

Reloading the page multiple times will give you varying results, as well opening it in different browsers. That said, here are the rough averages I found from running these a few times.

| Technique                   | Time        |
|-----------------------------|-------------|
| `forEach()`                 | 2.1ms       |
| Inject on each loop         | 920ms       |
| `map()` + `join()`          | 1.5ms       |
| `createElement()`           | 1.7ms       |
| `createDocumentFragement()` | 1.7 - 2.5ms |

A few key things that jump out at me:

- Using `innerHTML` was almost always faster than creating elements and appending them.
- `createDocumentFragment()` is supposed to be more performant, but in my tests, it rarely performed better than `createElement()`. In most cases, it was slower.
- I'm *really* impressed with how optimized the newer array methods like `map()` are in modern browsers. It consistently performed best out of the bunch.
- I knew injecting on each loop would be slower, but I'm astounded at just *how* much slower it is. All the other methods were done in just 2ms. Injecting on each loop took almost a full second (sometimes more) to render! That's the difference between "it feels instant" and "wow, this is really slow."

**What should you take away from this?**

Personally, I find creating markup with strings and injecting with `innerHTML` easier to do, and it happens to be the most performance approach, too, so that's a no-brainer for me in most cases.

Just be aware of [the risks of cross-site script attacks with it](/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/), and take precautions to protect yourself. Depending on your data source, that *may* mean using `createElement()` instead.