---
title: "How fast is vanilla JS localStorage?"
date: 2019-06-03T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

Last week, I wrote about [persisting state across multiple pages with `localStorage`](/persisting-state-across-views-in-a-multi-page-app-with-vanilla-js/).

I met some resistance over the performance impact of using `localStorage` vs. keeping state assigned to a variable in memory and using a single page app. I ended up writing a follow-up about how [just because something is *slower* doesn't mean it's *objectively slow*](/persisting-state-across-views-in-a-multi-page-app-with-vanilla-js/).

So... how fast (or slow) is `localStorage`, actually? Let's find out!

## Setting up a test

This is something you can test relatively easily.

First, we'll create an object with a lot of data in it. I setup a `count` variable with the number of items I'd like to save. Let's start with `10000` (ten thousand). Then, I'll create a `data` object, with a key of `items` in it. That key will start with an empty array.

Finally, we'll setup a `for` loop to run as many times as we've set our `count`, and push a new item to the `data.items` array on each loop.

```js
var count = 10000;

// Setup data
var data = {
	items: []
};

// Create data array
for (var i = 0; i < count; i++) {
	data.items.push('item number ' + i);
}
```

We can test performance using the `performance.now()` method. This provides a millisecond timestamp whenever it's run.

We'll cache it's value to a variable, save and retrieve some data to `localStorage`, then cache it to another variable. Then we'll subtract the starting and ending times to find out how long the `localStorage` tasks took.

```js
// Timestamp before the test
var start = performance.now();

// Set/get data to localStorage
localStorage.setItem('perfTest', JSON.stringify(data));
var cache = localStorage.getItem('perfTest');
cache = cache ? JSON.parse(cache) : {};

// Timestamp after the test
var end = performance.now();

// Duration of the test
console.log('It took ' + (end - start) + 'ms.');
```

You can [download the test file](https://gist.github.com/cferdinandi/d99723a26316aa710e404fa9600ccc0b) to try this yourself.

## Test Results

These results are averages because durations varied by about 10ms one way or another each time the test is run.

| # of Entries | Duration |
|--------------|----------|
| 10,000       | 12ms     |
| 50,000       | 40ms     |
| 100,000      | 77ms     |

If you're not used to working with milliseconds, 1ms is one-thousandth (1/1,000) of a second.

Based on my tests, you can turn 100,000 items into a string, save it, get back out of storage, and convert it back into an object in less than 100ms.

I don't see how you can call `localStorage` slow.

## What do these numbers mean?

How slow is *too* slow? At what scale would using `localStorage` not be a good idea?

First, let's address the *apps at scale* undertone whenever someone asks this question. Most developers who argue in favor of over-engineered front-end techniques and tools talk about *scale* a lot.

Most developers also aren't building apps that the kind of scale that these tools were designed to address, nor will their apps ever get to that scale. If you are, or if they ever do, then, sure, using a framework. Build a single page app.

Generally speaking, durations over 300ms start to feel sluggish. [Durations of 100ms and higher are perceivable to humans](https://www.youtube.com/watch?v=vOvQCPLkPt4), but still feel fast. Durations below that feel instantaneous.

### Speed is not the real concern

The bigger concern with large scale objects with `localStorage` is not actually speed, but storage limits.

`localStorage` is not infinite. Browsers have limits on the amount of `localStorage` data, and the amount of space you have varies from browser-to-browser. It's also shared space for *all* sites, not just your app. Kind of like the hard drive in your computer or phone.

When you get above 20,000 entries or so, depending on how long each item is, you can fill up all of your available `localStorage` space pretty fast.

For apps at that scale, a single page app or paginated API calls on each page load might be better choices.