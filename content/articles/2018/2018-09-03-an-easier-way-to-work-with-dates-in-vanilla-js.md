---
title: "An easier way to work with dates in vanilla JS"
date: 2018-09-03T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Earlier this year, I wrote [a little JS app called Timezones](https://cferdinandi.github.io/timezones/) to help me easily calculate times across timezones. It's super handy for planning meetings and such.

One thing that was particularly hard was working with times and dates.

The `Date()` method is awesome, and formatting dates isn't *that* hard. The real challenge was adding things like hours, minutes, and seconds to a date.

A lot of people use the [Moment.js library](https://momentjs.com/) for this, but I [recently discovered Day.js](https://github.com/iamkun/dayjs), a 2kb alternative to uses the same API.

It's well documented, can be installed using a humble `script` element, and works all the way back to IE9.

If you need to work with dates and times on a project, I highly recommend [checking out the project on GitHub](https://github.com/iamkun/dayjs).