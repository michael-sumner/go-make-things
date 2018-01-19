---
categories:
- Code
- JavaScript
date: '2017-06-06'
permalink: /javascript-and-dates-revisited/
title: JavaScript and dates revisited
url: /2017/06/06/javascript-and-dates-revisited
---

Two quick things...

## 1. A correction

In last week's post on [checking if a date is valid with JavaScript](https://gomakethings.com/how-to-check-if-a-date-is-valid-with-vanilla-javascript/), I incorrectly said you needed to pass in the month as a `0` - `11` integer (example, March is `2`).

This is incorrect. The function automatically adjusts the date for you. I updated the original post accordingly.

## 2. A helper library

If you need to do extensive work with dates, reader <a href="https://stoic.software/effective-suitescript/">Erik Grubaugh</a> recommended <a href="https://momentjs.com/">Moment.js</a>.

It's a library that makes it easier to get, set, manipulate, and display dates with JavaScript. It looks awesome, but at 126kb, it's rather large (almost as big as jQuery), so I'd only recommend using it if you're doing a lot of date work.