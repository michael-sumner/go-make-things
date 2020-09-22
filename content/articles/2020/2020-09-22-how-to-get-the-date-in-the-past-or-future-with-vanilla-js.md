---
title: "How to get the date N seconds, minutes, hours, or days in the past or future with vanilla JS"
date: 2020-09-22T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to create timestamps with vanilla JS](/how-to-create-and-work-with-timestamps-in-vanilla-js/). Today, we're going to learn how to use timestamps to get dates a certain amount of time in the past or future.

Let's dig in.

## Getting a date in the future

Let's say someone visits your website, and you want to show them the date five days from right now. How would you do it?

The trick is timestamps.

First, let's get the timestamp for *right now*.

```js
var now = new Date().getTime();
```

Next, we'll add the amount of time we want to jump ahead in the future, in milliseconds, to our timestamp.

There are 1000 milliseconds in a second, 60 seconds in a minute, 60 minutes in an hour, and 24 hours in a day. Time to do some math.

```js
// Our numbers from above, times 5 for 5 days
var fiveDaysFromNow = now + (1000 * 60 * 60 * 24 * 5);
```

Now we have a timestamp for our future date. We can pass that into a `new Date()` constructor to get our date string, and show that in our UI.

```js
var dateFiveDaysFromNow = new Date(fiveDaysFromNow);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/vYGvNBm)

## Jumping back into the past

You can use this same trick to get a date in the past, too. Instead of adding to your timestamp, you subtract.

```js
var fiveDaysAgo = now - (1000 * 60 * 60 * 24 * 5);
var dateFiveDaysAgo = new Date(fiveDaysAgo);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/oNxJjNz)

## Getting the date before or after a specific date

What if you wanted to get the date before or after a specific date that *isn't* right now?

First, you can create a `new Date()` with the date you want to use as your starting point.

```js
// Oh no! Y2K!!
var date = new Date('December 31, 1999').getTime();
```

Then, you use the same approach as above.

```js
var fiveDaysAfter = date + (1000 * 60 * 60 * 24 * 5);
var dateFiveDaysAfter = new Date(fiveDaysAfter);
```

[Here's a demo of this approach.](https://codepen.io/cferdinandi/pen/rNeoOLN)

## Timestamp Math

Timestamp math can get a little confusing. Here are some common ones for you.

```js
var second = 1000;
var minute = 1000 * 60;
var hour = 1000 * 60 * 60;
var day = 1000 * 60 * 60 * 24;
var week = 1000 * 60 * 60 * 24 * 7;
var year = 1000 * 60 * 60 * 24 * 365;
```

Multiply the number of time units you want by the formula above.

For example, to jump 11 hours in the future or past, you would multiply the `hour` numbers above by `11`.

Things get a little messier with months, because they don't have a fixed number of days. I usually use *about 30 days* to get a rough estimate.