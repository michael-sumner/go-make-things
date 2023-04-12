---
title: How to work with dates and times in vanilla JavaScript
date: 2023-04-12T10:30:00-04:00
draft: false
---

_Today's article is adapted from my [new Vanilla JS Short's](https://vanillajsshorts.com) on [working with Dates & Times](https://vanillajsshorts.com/dates/)._

The `Date` object in JavaScript represents a moment in time. While it has some useful features, it's also notoriously hard to work with.

Today, we're going to look at how to create a new `Date` object, and hopefully make it a bit easier to use. Let's dig in!

## The `new Date()` constructor

You can use the `new Date()` constructor to create a `Date` object.

You can pass in a specific date (and optionally time) in a variety of formats. If you pass in no arguments at all, it will create a `Date` object for the current instant that it's run. 

You can alternatively pass in a date string as an argument. You don't need to provide a specific time, but if you do, it needs to use 24-hour format.

The resulting `Date` object is relative to your current timezone.

```javascript
// Create a date object for right now
let now = new Date();

// Create a date object for Halloween
let halloween = new Date('October 31, 2022');

// Create a date object for March 21 at 2pm
let springLuncheon = new Date('March 21, 2023 14:00');
```

For better accuracy across browsers and operating systems, it's recommended that you use the [ISO 8601 date and time format](https://www.iso.org/iso-8601-date-and-time-format.html): `YYYY-MM-DDTHH:MM:SS`.

The first part (`YYYY-MM-DD`) is the year, month, and date. The `T` stands for _time_. The part after it (`HH:MM:SS`) is the hours, minutes, and seconds (in 24-hour format), and they _must_ be included, or the `Date` object you get back will not be accurate. Use `00:00:00` for midnight.

```javascript
// New Year's at midnight
let newYears = new Date('2024-01-01T00:00:00');

// July 4 at noon
let summerParty = new Date('2023-07-04T12:00:00');
```

You can also create a `Date` object by passing in a series of arguments: `year`, `monthIndex`, `day`, `hours`, `minutes`, `seconds`, and `milliseconds`. Only `year` and `monthIndex` are required.

The `monthIndex` argument is a bit confusing, because it starts with January at `0` instead of `1`.

```javascript
// Notice the month index is 9 even though October is the 10th month
let halloween = new Date(2021, 9, 31);

// Christmas morning at 10:30 am, local time
let christmas = new Date(2021, 11, 25, 10, 30);
```

## Unix Timestamps

Under-the-hood, the `Date` object stores a moment in time as a _Unix Timestamp_, the number of milliseconds that have elapsed since January 1, 1970.

You can get the _Unix Timestamp_ from a `Date` object using the `Date.getTime()` method.

```javascript
let halloween = new Date('October 31, 2023');

// returns 1698724800000
let timestamp = halloween.getTime();
```

You can pass a _Unix Timestamp_ into the `new Date()` constructor to create a `Date` object.

```javascript
let earthDay = new Date(1682136000000);
```

In many programming languages, _Unix Timestamps_ are tracked in seconds rather than milliseconds.

If you're create a `Date` object from a timestamp provided by a server or API, it's important to know if it's in seconds or milliseconds. If it's seconds, you'll need to multiply it by `1000` to convert it to milliseconds.

```javascript
let timestamp = 1682136000;
let someDate = new Date(timestamp * 1000);
```

## Next: getting values from a `Date` object

Tomorrow, we're going to look at how to get values from a `Date` object. Then, we'll look at how to format them using [the Internationalization API](https://vanillajsshorts.com/intl/).