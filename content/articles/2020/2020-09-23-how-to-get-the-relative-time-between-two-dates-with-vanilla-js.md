---
title: "How to get the relative time between two dates with vanilla JS"
date: 2020-09-23T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to find a date a certain amount of time in the past or future](/how-to-get-the-date-n-seconds-minutes-hours-or-days-in-the-past-or-future-with-vanilla-js/). Today, we're going to flip that on its head, and find the relative time between two dates.

Let's dig in.

## An example

Let's imagine you have some user created content, and a timestamp for when it was created.

```js
// This is July 4, 2020 at 3:15pm
var created = 1593890100000;
```

You want to figure out how long ago that was, and display that in the UI. How would we do that?

## Getting the time between two dates

The first step is to get the number of milliseconds between two dates. And to do that, we need both dates to be timestamps.

We already have a timestamp for when the content was created. Let's get one for right now, too.

```js
var now = new Date().getTime();
```

Now, we can subtract `now`, the current date and time, from `created`, when the content was created.

```js
var howLongAgo = created - now;
```

This gives us the number of milliseconds between now and the date for the content. A negative number means the `created` date was in the past. A positive number means it happens in the future (for scheduled-but-not-published content, for example).

## Converting milliseconds into human-readable time

We have the amount of time between two dates, but milliseconds are not very usable for most people.

Let's convert that into a more human-readable time. Something like, "15 minutes ago" or "21 days ago."

To get started, let's create a helper function: `getHumanTime()`.

```js
var getHumanTime = function (timestamp) {
	// We'll convert stuff here...
};
```

First, we want to convert our number into a positive number, which we can do with [the `Math.abs()` method](https://vanillajstoolkit.com/reference/numbers/math-abs/).

```js
var getHumanTime = function (timestamp) {

	// Convert to a positive integer
	var time = Math.abs(timestamp);

};
```

Next, we want to calculate the years, months, weeks, days, hours, and minutes for the `time`.

To do that, we're going to do some basic division with [the timestamp math we learned yesterday](/how-to-get-the-date-n-seconds-minutes-hours-or-days-in-the-past-or-future-with-vanilla-js/#timestamp-math). We'll [use the `parseInt()` method to convert the number to an integer](https://vanillajstoolkit.com/reference/numbers/parseint/), and define the biggest unit of time.

```js
var getHumanTime = function (timestamp) {

	// Convert to a positive integer
	var time = Math.abs(timestamp);

	// Define humanTime and units
	var humanTime, units;

	// If there are years
	if (time > (1000 * 60 * 60 * 24 * 365)) {
		humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 365), 10);
		units = 'years';
	}

	// If there are months
	else if (time > (1000 * 60 * 60 * 24 * 30)) {
		humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 30), 10);
		units = 'months';
	}

	// If there are weeks
	else if (time > (1000 * 60 * 60 * 24 * 7)) {
		humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 7), 10);
		units = 'weeks';
	}

	// If there are days
	else if (time > (1000 * 60 * 60 * 24)) {
		humanTime = parseInt(time / (1000 * 60 * 60 * 24), 10);
		units = 'days';
	}

	// If there are hours
	else if (time > (1000 * 60 * 60)) {
		humanTime = parseInt(time / (1000 * 60 * 60), 10);
		units = 'hours';
	}

	// If there are minutes
	else if (time > (1000 * 60)) {
		humanTime = parseInt(time / (1000 * 60), 10);
		units = 'minutes';
	}

	// Otherwise, use seconds
	else {
		humanTime = parseInt(time / (1000), 10);
		units = 'seconds';
	}

	return humanTime + ' ' + units;

};
```

Now, we can get a human-readable time format like this.

```js
getHumanTime(howLongAgo);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/RwaEEOz)

## Specifying the future versus the past

One last thing missing from our code is whether the date is in the past or the future.

We can check if the `timestamp` is positive or negative, and update what we return accordingly.

```js
var getHumanTime = function (timestamp) {

	// Convert to a positive integer
	var time = Math.abs(timestamp);

	// Define humanTime and units
	var humanTime, units;

	// ...

	// Get the time and units
	var timeUnits = humanTime + ' ' + units;

	// If in the future
	if (timestamp > 0) {
		return 'in ' + timeUnits;
	}

	// If in the past
	return timeUnits + ' ago';

};
```

[Here's a updated demo.](https://codepen.io/cferdinandi/pen/MWyZZNE)