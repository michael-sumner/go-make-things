---
title: How to get Date values with vanilla JavaScript
date: 2023-04-13T10:30:00-04:00
draft: false
---

_Today’s article is adapted from my new [Vanilla JS Short’s](https://vanillajsshorts.com) on [working with Dates & Times](https://vanillajsshorts.com/dates/)._

Yesterday, we looked at [how to work with dates and times in vanilla JS](/how-to-work-with-dates-and-times-in-vanilla-javascript/). Today, we're going to learn how to get values from a `Date` object.

Let's dig in!

## `Date` object instance methods

The `Date` object provides methods for getting details about the moment in time. 

These methods follow a `Date.prototype.get*()` naming convention, where `*` is the property to get. All of the returned values are local to the user's timezone.

The `Date.prototype.getMonth()` method returns an integer for the month, starting with `0` for January. The `Date.prototype.getDay()` method returns an integer for the day of the week, starting with `0` for Sunday.

```javascript
// Halloween at 10pm
let halloween = new Date('2023-10-31T22:00:00');

// Get the year
// returns 2023
let year = halloween.getFullYear();

// Get the month
// returns 9
let month = halloween.getMonth();

// Get the day of the month
// returns 31
let date = halloween.getDate();

// Get the day of the week
// returns 2
let day = halloween.getDay();

// Get the hour of the day (in 24-hour format)
// returns 22
let hour = halloween.getHours();

// Get the minutes
// returns 0
let minutes = halloween.getMinutes();

// Get the seconds
// returns 0
let seconds = halloween.getSeconds();

// Get the milliseconds
// returns 0
let milliseconds = halloween.getMilliseconds();
```

## Getting the `Date` as a string

The `Date` object also has a handful of methods for converting a date and time into a string.

Oddly, the `toISOString()` and `toJSON()` methods both return an ISO string. The `toJSON()` method does _not_ return JSON.

```javascript
// Halloween at 10pm
let halloween = new Date('2023-10-31T22:00:00');

// Get the full date object as a string
// returns "Tue Oct 31 2023 22:00:00 GMT-0400 (Eastern Daylight Time)"
let str = halloween.toString();

// Get the date portion of the date object as a string
// returns "Tue Oct 31 2023"
let dateStr = halloween.toDateString();

// Get the ISO 8601 string for a date in UTC/GMT
// returns "2023-11-01T02:00:00.000Z"
let isoStr = halloween.toISOString();

// Also returns the ISO 8601 string for a date
// NOT JSON!
// returns "2023-11-01T02:00:00.000Z"
let jsonStr = halloween.toJSON();
```

## Formatting Date strings

Tomorrow, we're going to look at how you can pair the `Date` object with [the Internationalization API](https://vanillajsshorts.com/intl/) to create formatted date and time strings.