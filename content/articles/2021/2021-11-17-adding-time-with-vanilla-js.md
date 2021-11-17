---
title: Adding time with vanilla JavaScript
date: 2021-11-17T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at how to add and subtract time with vanilla JS. Let's dig in!

## The trouble with time

The current way to manage dates and times in JavaScript is with the `Date()` object. It's pretty ok, but it's not great.

It has methods for creating a `Date()` object from a string, formatting dates and times, and getting back specific values. But it lacks native methods to add or subtract time from a date. Timezone support is terrible, too.

[There's a new API in the works: `Temporal()`.](https://tc39.es/proposal-temporal/docs/) It will allow you to do things like this:

```js
// This is NOT currently supported in browsers
// Do NOT try to use this in production today
Temporal.Now.instant().add({ hours: 5, seconds: 20 });
````

It's currently a stage 3 proposal, which means it's pretty far along the standards process. But there's no official "this is coming to browsers on {DATE}" for it, so for now, we're stuck with `Date()`.

So, let's look how to add time "the old fashioned way."

## Creating a `Date()` object

You can create a `Date()` object using the `new Date()` constructor.

If you pass in no arguments at all, it will create a `Date()` object for the current instant that it's run. You can alternatively pass in a date string as an argument.

The resulting `Date()` object is relative to your current timezone.

```js
// A date object for right now
let now = new Date();

// A date object for Halloween
let halloween = new Date('October 31, 2021');
```

You can also create a date by passing in a series of arguments: `year`, `monthIndex`, `day`, `hours`, `minutes`, `seconds`, and `milliseconds`. Only `year` and `monthIndex` are required.

The `monthIndex` argument is confusing AF, because it starts with January at `0` instead of `1`.

```js
// Notice the month index is 9 even though October is the 10th month
let halloween = new Date(2021, 9, 31);

// Christmas morning at 10:30 am, local time
let christmas = new Date(2021, 11, 25, 10, 30);
```

It's clunky, but functional.

## Modifying dates

The `Date()` object provides a handful of instance methods that you can use to get and modify the date and time. They follow a `get*()` and `set*()` naming convention, where `*` is the property to get or set.

For example, to get the `hours` and `month` properties for `christmas`, you would do this.

```js
// returns 10
christmas.getHours();

// returns 11, because it starts with January at 0
// This is seriously really annoying!
christmas.getMonth();
```

To set the `hours` and `month` properties, you would do this, passing in the `hours` or `month` to set the `Date()` to, respectively. It uses a 24-hour clock for `hours`.

```js
// Set the hour to 2pm, 14 hours
christmas.setHours(14);

// Set the month to July
// (that index thing again)
christmas.setMonth(6);
```

## Adding and removing time

Now, to add and remove time, we can use the `get*()` and `set*()` methods in conjunction.

For example, to add `4` hours to a time, you would get the current number of hours with the `getHours()` method, add `4` to it, and pass the resulting number into the `setHours()` method.

```js
// Set the hours to 6pm (2pm + 4 hours)
christmas.setHours(christmas.getHours() + 4);
```

If the resulting adjustments would roll you into the next day, month, year, and so on, the `Date()` object automatically accounts for that and adjusts itself correctly.

```js
// Set the date to December 26 at 2am (December 25 at 6pm + 8 hours)
// (Pretend I never modified the month)
christmas.setHours(christmas.getHours() + 8);
```

## Formatting dates

Once you've modified your date and time, you can format it into a string.

There are two ways to do that: [the `Date.toLocaleString()` method](/formatting-dates-and-times-with-vanilla-js/) and [the `Intl.dateTimeFormat()` method](/converting-and-formatting-dates-and-times-with-the-vanilla-js-intl.datetimeformat-constructor/).

They both support the same formatting options. The `Date.toLocaleString()` method is older, and, in my opinion, a bit easier to work with. The `Intl.dateTimeFormat()` method is better for performance if you're formatting lots of dates with the same settings.