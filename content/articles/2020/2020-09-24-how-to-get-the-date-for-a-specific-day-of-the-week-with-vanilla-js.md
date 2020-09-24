---
title: "How to get the date for a specific day of the week with vanilla JS"
date: 2020-09-24T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This morning, one of my students asked me how I would get the date for the next occurrence of a specific day of the week. For example: "What's the day next Wednesday?"

This is a good one! Let's dig in.

## The approach

For this one, we need to get the day of the week for today, then figure out how many days away the day we're looking for is.

For example, if today is Thursday, then Saturday is two days away.

Once we know that, we can get a timestamp for today, add two days worth of milliseconds to it ([using the timestamp math we learned earlier this week](/how-to-get-the-date-n-seconds-minutes-hours-or-days-in-the-past-or-future-with-vanilla-js/#timestamp-math)), and get a new date object for the day we want.

```js
var nextDay = new Date(todayTimestamp + (1000 * 60 * 60 * 24 * 2));
```

## Creating a helper function

To get started, let's create a helper function, `getNextDay()`.

It accepts one argument: `dayName`. This is the specific day of the week you're looking for.

```js
var getNextDay = function (dayName) {
	// Codes goes here...
};
```

We know we're going to need today's date, so let's go ahead and get that.

```js
var getNextDay = function (dayName) {

	// The current day
	var date = new Date();

};
```

## Getting the day of the week

The `Date` object has a `getDate()` method that returns an integer representing the day of the week.

It starts with Sunday, which has a value of `0`. Monday has a value of `1`, Tuesday has a value of `2`, and so on.

Let's get the day for our current date.

```js
var getNextDay = function (dayName) {

	// The current day
	var date = new Date();
	var now = date.getDay();

};
```

We also need to get this integer for the day of the week want. We can create an array with days of the week, and use the `Array.indexOf()` method to find the desired day's index.

For maximum flexibility, let's make the days of the week case-insensitive.

```js
var getNextDay = function (dayName) {

	// The current day
	var date = new Date();
	var now = date.getDay();

	// Days of the week
	var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	// The index for the day you want
	var day = days.indexOf(dayName.toLowerCase());

};
```

## Doing math

Now that we have the integers for the current day of the week *and* the day we want, we can do some math.

Let's subtract `now` from our `day`. If today is Thursday, and we pass in `Saturday` as our `dayName` argument, this would give us a value of `2`.

```js
var getNextDay = function (dayName) {

	// The current day
	var date = new Date();
	var now = date.getDay();

	// Days of the week
	var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	// The index for the day you want
	var day = days.indexOf(dayName.toLowerCase());

	// Find the difference between the current day and the one you want
	var diff = day - now;

};
```

But what happens if, for example, we passed in a value of `Sunday`? That would give us a value of `-4`. What if we used `Thursday`? We'd get a value of `0`.

To fix this, we'll check to see if `diff` is less than `1`. If it is, we'll add `7` to it to "loop around" to the beginning of the week (or the next week).

In the code below, I'm [using a ternary operator](/ternary-operators/) for this.

```js
var getNextDay = function (dayName) {

	// The current day
	var date = new Date();
	var now = date.getDay();

	// Days of the week
	var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	// The index for the day you want
	var day = days.indexOf(dayName.toLowerCase());

	// Find the difference between the current day and the one you want
	// If it's the same day as today (or a negative number), jump to the next week
	var diff = day - now;
	diff = diff < 1 ? 7 + diff : diff;

};
```

## Getting the next date

Now that we know how many days in the future our next day of the week is, we can get the actual date.

We'll use the `getTime()` method to a timestamp for today's date. Then, we'll multiply our `diff` by one day's worth of milliseconds (`1000 * 60 * 60 * 24`), and add it to the timestamp. This gives us a timestamp for the day we want.

Finally, we'll pass this new timestamp into a `new Date()` constructor, and return the new date object.

```js
var getNextDay = function (dayName) {

	// The current day
	var date = new Date();
	var now = date.getDay();

	// Days of the week
	var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	// The index for the day you want
	var day = days.indexOf(dayName.toLowerCase());

	// Find the difference between the current day and the one you want
	// If it's the same day as today (or a negative number), jump to the next week
	var diff = day - now;
	diff = diff < 1 ? 7 + diff : diff;

	// Get the timestamp for the desired day
	var nextDayTimestamp = date.getTime() + (1000 * 60 * 60 * 24 * diff);

	// Get the next day
	return new Date(nextDayTimestamp);

};
```

## Putting it all together

Now, you can do something like this.

```js
var nextMonday = getNextDay('Monday');

// You can use lowercase, too
var nextSaturday = getNextDay('saturday');

// You can even do weird mixed case
var nextFriday = getNextDay('friDay');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/wvGNrOe) I also put this helper function up on [the Vanilla JS Toolkit](https://vanillajstoolkit.com).

## Browser compatibility

This approaches work in all modern browsers, and back to IE9.