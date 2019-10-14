---
title: "How to convert seconds to minutes and hours with vanilla JS"
date: 2019-10-13T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Working with time in JavaScript can be tricky. Today, I'm going to show you how to convert seconds in minutes and hours with vanilla JS.

Fair warning: we're going to need to do some math.

## Converting hours

Let's say you had a timestamp in seconds that you wanted to display in `HH:MM:SS` format.

```js
var timestamp = 9462;
```

First, let's get hours.

There are 60 seconds in a minute, and 60 minutes in an hour. We'll divide our `timestamp` by `60`, and then by `60` again. That leaves us with `2.6283` repeating.

```js
var timestamp = 9462;

// 2.628333333
var hours = timestamp / 60 / 60;
```

We want just hours, though. We can use `Math.floor()` to round down to the nearest whole number.

```js
var timestamp = 9462;

// 2
var hours = Math.floor(timestamp / 60 / 60);
```

## Converting minutes

Next, let's get minutes.

There are 60 seconds in a minute. Let's divide our `timestamp` by `60`, and use `Math.floor()` to round down to the nearest whole number. That leaves us with `157`, because it also includes all of the minutes that in our `hours`.

```js
var timestamp = 9462;

// 2
var hours = Math.floor(timestamp / 60 / 60);

// 157
var minutes = Math.floor(timestamp / 60);
```

We'll multiply our `hours` by `60` to get its value in minutes, then subtract to it from our `minutes` to get the correct value.

```js
var timestamp = 9462;

// 2
var hours = Math.floor(timestamp / 60 / 60);

// 37
var minutes = Math.floor(timestamp / 60) - (hours * 60);
```

## Calculating seconds

Finally, let's calculate seconds.

For this one, we can use [the *remainder operator*](https://vanillajstoolkit.com/reference/numbers/basic-math/). It returns the amount leftover after dividing by a number.

We'll use it to divide our `timestamp` by `60` (the number of seconds in a minute). The number we get back is the seconds after we remove all of the minutes.

```js
var timestamp = 9462;

// 2
var hours = Math.floor(timestamp / 60 / 60);

// 37
var minutes = Math.floor(timestamp / 60) - (hours * 60);

// 42
var seconds = timestamp % 60;
```

## Formatting time

Now that we have our `hours`, `minutes`, and `seconds`, we're ready to format them into our `HH:MM:SS` format.

We can use simple string concatenation for this. JavaScript will *type cooerce* our integers into strings.

```js
// 2:37:42
var formatted = hours + ':' + minutes + ':' + seconds;
```

This might be good enough, but what if you wanted a leading `0` on the `hours`? What if our `minutes` or `seconds` were single digit numbers?

We can [convert our numbers to strings](https://vanillajstoolkit.com/reference/numbers/number-tostring/) and [use the `padStart()` method](https://vanillajstoolkit.com/reference/strings/string-padstart/) to enforce a minimum number of digits.

```js
// 02:37:42
var formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
```

And with that, we're done. [Here's a demo on CodePen.](https://codepen.io/cferdinandi/pen/YzzwMYW)

*__Special thanks to Steve Griffith__, [whose video on this topic](https://www.youtube.com/watch?v=ZB7cMq-iYSI&list=PLyuRouwmQCjkYdv4VjuIbvcMZVWSdOm58) helped me work through one of the areas I was stuck on with this one.*