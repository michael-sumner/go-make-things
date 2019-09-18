---
title: "Formatting dates with vanilla JS"
date: 2019-08-02T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Today, I want to teach you how to take a timestamp and convert it into a formatted date.

## Valid timestamps

Before we get started, there are two valid timestamp formats we can use for this

First, we can use a **unix timestamp**, which is the time in milliseconds that has elapsed since January 1, 1970. For example here's July 4, 2018 represented as a unix timestamp: `1530680400000`.

We can also use a date in `YYYY-MM-DD HH:MM` or `YYYY-MM-DD HH:MM:SS` format. For that, July 4, 2018 at 5am would be `2018-07-04 05:00` or `2018-07-04 05:00:00`. The first version is minutes and hours. The second includes seconds as well.

## Formatting the timestamp

To get started, let's create a `formatDate()` helper function, and accept our timestamp as an argument.

```js
var formatDate = function (timestamp) {
	// Code goes here...
};
```

Next, let's convert our timestamp into a native JavaScript `Date()` object.

The `Date()` object has [a handful of helper methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) we can use to get the month, day, year, and more for a particular date.

Chrome is very forgiving with the timestamps `Date()` will accept, but Firefox is not. If your timestamp is in `YYYY-MM-DD` format and does not include `HH:MM`, it will throw an error in Chrome.

```js
var formatDate = function (timestamp) {

	// Create a date object from the timestamp
	var date = new Date(timestamp);

};
```

Now we're ready to format our date.

We can get the month for our timestamp with the `getMonth()` method. It returns an integer for the month. But confusingly, it starts at `0` instead of `1`. January is `0`, February is `1`, and so on.

While this seems weird, it has a hidden benefit: we can create an array of names for our months, and them based on the index that `getMonth()` returns.

For this example, I'll use full month names (`January`, `February`, and so on). You might prefer to use three-character names or something like that (`Jan`, `Feb`, etc.).

```js
var formatDate = function (timestamp) {

	// Create a date object from the timestamp
	var date = new Date(timestamp);

	// Create a list of names for the months
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',	'November', 'December'];

	// return a formatted date
	return months[date.getMonth()];

};
```

We can use the `getDate()` method to return the day, and the `getFullYear()` method to return the year.

We can use string concatenation to join them to our month, separating them with spaces and commas as needed.

```js
var formatDate = function (timestamp) {

	// Create a date object from the timestamp
	var date = new Date(timestamp);

	// Create a list of names for the months
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',	'November', 'December'];

	// return a formatted date
	return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

};
```

If you wanted, you could also add hours with the `getHours()` method, minutes with the `getMinutes()`, and seconds with the `getSeconds()` method.

Depending on how you're displaying them, you might want to [use the `padStart()` method](https://vanillajstoolkit.com/reference/strings/string-padstart/) with those to make make sure they always have a leading zero.

## What timezone are these in?

The cool thing about the `Date()` object is that it uses the local timezone for the current user. So if you're in New York and someone else is Sydney, you'll both see that timestamp represented in your local time.

## A demo and stuff

[Here's a demo for you to play with.](https://codepen.io/cferdinandi/pen/ZgJZpg)

You can also [download this helper function on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/formatdate/).

## Browser Compatibility

This technique works in all modern browsers, and back to at least IE6.