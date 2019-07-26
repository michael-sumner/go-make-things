---
title: "How to test vanilla JS performance"
date: 2019-07-26T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

I've written a few articles lately on the performance of various vanilla JS approaches. I've also gotten some interesting responses from folks asking about the performance of *other* approaches.

Today, I wanted to teach you how to write your own performance tests.

This can be an invaluable skill, especially if you're trying to persuade people to use one approach over another.

## The basic approach

Testing performance is surprisingly straightforward.

1. Start a timer.
2. Run your tasks.
3. Stop the timer and note how much time has elapsed.

Do this for each of the things you want to compare, and then see how one technique does versus the other.

Let's look at the specifics of how you do this.

## Starting and ending timers

There are two ways to time the duration of your tasks.

1. The `performance.now()` method
2. The `console.time()` and `console.timeEnd()` methods

### Using the `performance.now()` method

The `performance.now()` method creates a timestamp in milliseconds of how long it's been since you loaded the page.

You can store it's value to a variable before you run your task, run the task, then cache it's current value again to another variable. This will give you timestamps for when your tasks started and ended.

```js
var start = performance.now();
// Do some JS stuff...
var end = performance.now();
```

Then, you can subtract `start` from `end` to get how long it took. You can log this value to the console, render it into the DOM, and so on.

```js
var start = performance.now();
// Do some JS stuff...
var end = performance.now();

console.log('This took ' + (end - start) + 'ms to complete');
```

### Using the `console.time()` and `console.timeEnd()` methods

After reading one of my previous articles on performance, [Thomas Gratier reached out to me on Twitter](https://twitter.com/ThomasG77/status/1154379181611978753) to ask me why I use `performance.now()` instead of `console.time()` and `console.timeEnd()`.

Honestly, I had never heard of them. They're pretty awesome!

Right before your task, run `console.time()`, and pass in a unique name for your test. Run your tasks, then run `console.timeEnd()`, again passing in the unique name.

It will log the timer name and elapsed time in milliseconds into the console for you. No math required!

```js
console.time('My awesome performance test!');
// Do some JS stuff...
console.timeEnd('My awesome performance test!');
// This will log "My awesome performance test!: 1234.567ms" (with the actual time, of course)
```

### Which one should you use?

Personally, I'll probably be using `console.time()` and `console.timeEnd()` a lot more now that I know about them (thanks Thomas!).

If you want to do anything other than log times to the console, though, `performance.now()` is probably your better bet. For example, if you're working with a company and want to generate a performance chart or table for them, use `performance.now()`.

From my testing, the produced the same results (they differed by fractions of a millisecond) 100% of the time. They also both have very good modern browser support.

## Rounding errors

In my original tests, I had been running a single instance of the tasks I was trying to complete. I noted in a previous article that times tended to vary each time I ran the test.

> These results are averages because durations varied by about 10ms one way or another each time the test is run.

A friendly developer at [Lifeblue](https://www.lifeblue.com/) (shared with permission) tipped me off to why this was happening.

> It seems there may be a flaw in your test - the precision for time functions in browsers is intentionally low as a security measure, and the rounding imposed can introduce flaws to individual results

[The Mozilla Developer Network article on `performance.now()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now#Browser_compatibility) elaborates:

> The timestamp is not actually high-resolution. To mitigate security threats such as [Spectre](https://spectreattack.com/), browsers currently round the results to varying degrees. (Firefox started rounding to 1 millisecond in Firefox 60.) Some browsers may also slightly randomize the timestamp. The precision may improve again in future releases; browser developers are still investigating these timing attacks and how best to mitigate them.

My buddy at Lifeblue recommended running the tests a bunch of times (maybe 10,000 times, for example) in succession instead of just once. Over a large sample size, the rounding errors in either direction balance each other out and produce more accurate results.

With this approach, your tests look like this.

```js
console.time('My awesome performance test!');
for (var i = 0; i < 10000; i++) {
	// Do some JS stuff...
}
console.timeEnd('My awesome performance test!');
```

## An example

Let's revisit [Wednesday's article on data attribute selector performance](/how-performant-are-data-attributes-as-selectors/). My performance tests looked like this.

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

Afterwards, I concluded that there was no difference in performance between the two.

But that may not be accurate! This test has the rounding error issue, so it's single-test results cannot be trusted.

Let's rewrite the test to be more accurate. (You may want to [go read the original article](/how-performant-are-data-attributes-as-selectors/) for some background if you haven't already.)

### Rewriting the test to account for rounding

First, I'm going to adjust the HTML to include a unique class for each item.

```js
// Create elements
for (var i = 0; i < count; i++) {

	// Create element
	elem = document.createElement('li');
	elem.textContent = 'List Item ' + i;

	// Add ID, class, and data attribute
	elem.id = 'list-item-' + i;
	elem.className = 'list-item list-item-' + i;
	elem.setAttribute('data-item', i);

	// Inject into the DOM
	app.appendChild(elem);

}
```

Now, let's rewrite our actual tests.

I'm going to add a test for IDs. I'm also going to switch to using `console.time()`/`console.timeEnd()`. And, because we're running this a bunch of times, I'm going to switch to `querySelector()` instead of `querySelectorAll()`.

```js
/**
 * Start Performance Tests
 */

var i;

// ID
console.time('ID');
for (i = 0; i < count; i++) {
	document.querySelector('#list-item-' + i);
}
console.timeEnd('ID');

// By Class
console.time('Class');
for (i = 0; i < count; i++) {
	document.querySelector('.list-item-' + i);
}
console.timeEnd('Class');

// By Data Attribute
console.time('Data Attribute');
for (i = 0; i < count; i++) {
	document.querySelector('[data-item="' + i + '"]');
}
console.timeEnd('Data Attribute');
```

### The Results

There are still some slight variations each time I run the test, but the relative results from one selector to the other vary far less than previously.

In other words, the class selectors may be about 100ms slower from one running of the test to another, but the data attribute selectors were, too. It balances out


| Selector       | Time   |
|----------------|--------|
| ID             | 23ms   |
| Class          | 1045ms |
| Data Attribute | 2162ms |

You can [download the tests from GitHub](https://gist.github.com/cferdinandi/f9bbdd43a264e7201abd07a5c4a9dcaf) and run them yourself if you want.

### Interpreting the results

In this test, data attributes are clearly, objectively slower than classes. In fact, classes are *twice as fast* as data attributes.

**Despite that, I still think data attributes make better JavaScript selectors.** Wait... what?

Relative performance isn't the only metric that matters. Just because one selector is slower than another doesn't mean it's *slow* in the absolute sense.

Doing some quick back-of-the-napkin math, data attribute selectors can still run 4.62 operations a millisecond (10,000 operations / 2162ms to complete).

Computer operations that take one-tenth of a second&mdash;100ms&mdash;feels instantaneous to humans. A data attribute selector could run 462 times in that time.

In practical, real world applications, the performance differences between classes and data attributes are insignificant.