---
title: "A vanilla JS alternative to the moment.js timeFromNow() method"
date: 2019-10-24T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

My friend [Andrew Borstein](https://andrewborstein.com/) challenged me to come up with a vanilla JS alternative to [the moment.js `timeFromNow()` method](https://momentjs.com/docs/#/displaying/fromnow/).

Challenged accepted!

## What the `moment().timeFromNow()` method does

The `moment().timeFromNow()` method returns a formatted string with how long ago something happened.

You pass in a date from the past, and it returns things like `a few seconds ago` or `2 years ago`.

```js
// 4 years ago
moment([2007, 0, 29]).fromNow();
```

It only gives you dates in the past. There's [another function, `moment.timeToNow()`](https://momentjs.com/docs/#/displaying/tonow/), for future dates.

## What our `timeFromNow()` helper function will do

Our helper function is going to work a *little* bit differently.

One of the things I like about vanilla JS is the increased control you have. Rather than getting a preformatted string, I'd rather have the difference in time and the time units (years, months, etc.) that I can work with however I want.

I'd also prefer a function that works for both past *and* future events.

Instead of returning a string, our helper function will return an object with the difference in time, the time units, and whether the time is in the past or future.

## Building a `timeFromNow()` helper function

First, let's set up a helper function that accepts `time` as an argument.

```js
var timeFromNow = function (time) {
	// Code goes here...
};
```

The `time` value can be a string, a `Date()` object, or a unix timestamp in milliseconds.

```js
// These are all valid
timeFromNow('December 31, 1999');
timeFromNow('1999/12/31');
timeFromNow(new Date('1999-12-31T10:30:00-04:00'));
timeFromNow(946650600000);
```

## Calculating the difference in time

To find the difference between the `time` and now, we first need to get a timestamp value for our `time`.

We'll pass it into a `new Date()` object, and then call the `getTime()` method on it. We'll also create another `new Date()` object to get the time right now, and get a timestamp for that, too.

If there's no valid `unixTime` (if the user passed in a bad date, for example), we'll return `null`.

```js
var timeFromNow = function (time) {

	// Get timestamps
	var unixTime = new Date(time).getTime();
	if (!unixTime) return;
	var now = new Date().getTime();

};
```

Next, we'll subtract the time `now` from our `unixTime` to get the difference between the `time` and now.

Both timestamps are in milliseconds, and the smallest unit we want to work with is seconds, so we'll divide both numbers by `1000` first to convert them to seconds.

```js
var timeFromNow = function (time) {

	// Get timestamps
	var unixTime = new Date(time).getTime();
	if (!unixTime) return;
	var now = new Date().getTime();

	// Calculate difference
	var difference = (unixTime / 1000) - (now / 1000);

};
```

## Creating our time from now data

Next, let's setup an object called `tfn` that will hold our *time from now* data.

The first piece of data we'll add is `when` the `time` happens: in the past, right now, or in the future. If the `difference` is greater than `0`, it happened in the `future`. If it's less than `-1`, it happens in the `past`. Otherwise, it's happening right `now`.

(*We use `-1` instead of `0` to account for slight fractions that can happen with timestamps.*)

```js
var timeFromNow = function (time) {

	// Get timestamps
	var unixTime = new Date(time).getTime();
	if (!unixTime) return;
	var now = new Date().getTime();

	// Calculate difference
	var difference = (unixTime / 1000) - (now / 1000);

	// Setup return object
	var tfn = {};

	// Check if time is in the past, present, or future
	tfn.when = 'now';
	if (difference > 0) {
		tfn.when = 'future';
	} else if (difference < -1) {
		tfn.when = 'past';
	}

};
```

## Calculating time units

Next, we need to figure out if our `difference` is `years`, `months`, `days`, `hours`, or `seconds` long.

First, we'll use [the `Math.abs()` method](https://vanillajstoolkit.com/reference/numbers/math-abs/) to convert any negative numbers into positive ones. Then, we can check out `unitOfTime`.

For this, we'll divide the `difference` by the number of seconds in a year, month, day, and hour. If that value is greater than `1`, that's our unit. Otherwise, we keep going. Because the length of months can vary, we'll use `45` for the number of days there.

We'll also set the `tfn.time`, and use [the `Math.floor()` method](https://vanillajstoolkit.com/reference/numbers/math-floor/) to round down to nearest whole integer.

```js
var timeFromNow = function (time) {

	// ...

	// Convert difference to absolute
	difference = Math.abs(difference);

	// Calculate time unit
	if (difference / (60 * 60 * 24 * 365) > 1) {
		// Years
		tfn.unitOfTime = 'years';
		tfn.time = Math.floor(difference / (60 * 60 * 24 * 365));
	} else if (difference / (60 * 60 * 24 * 45) > 1) {
		// Months
		tfn.unitOfTime = 'months';
		tfn.time = Math.floor(difference / (60 * 60 * 24 * 45));
	} else if (difference / (60 * 60 * 24) > 1) {
		// Days
		tfn.unitOfTime = 'days';
		tfn.time = Math.floor(difference / (60 * 60 * 24));
	} else if (difference / (60 * 60) > 1) {
		// Hours
		tfn.unitOfTime = 'hours';
		tfn.time = Math.floor(difference / (60 * 60));
	} else {
		// Seconds
		tfn.unitOfTime = 'seconds';
		tfn.time = Math.floor(difference);
	}

};
```

If those numbers are confusing, let's break it down a bit.

There are 60 seconds in a minute, 60 minutes in an hour, and 24 hours in a day. There are 365 days in a year. To calculate the number of seconds in a year, we multiply all of those numbers together.

```js
// The number of seconds in a year
var year = 60 * 60 * 24 * 365;
```

For days, we would multiply 60 seconds by 60 minutes to get an hour of seconds, then multiply by 24 (the number of hours in a day).

```js
// The number of seconds in a day
var day = 60 * 60 * 24;
```

## Returning our `tfn` object

Now that we've done all of our calculations, the last thing to do is return our `tfn` object.

```js
var timeFromNow = function (time) {

	// ...

	// Return time from now data
	return tfn;

};
```

## Putting it all together

[Here's a demo you can play with on CodePen.](https://codepen.io/cferdinandi/pen/Vwwbpyr) You can grab the completed helper function over on the [Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/timefromnow/).

This will work in all modern browsers, and at least back to IE 9.