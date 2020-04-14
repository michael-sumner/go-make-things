---
title: "The delay on setTimeout() and setInterval() is just a suggestion"
date: 2020-04-15T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

The `setTimeout()` and `setInterval()` methods allow you to run a function after a certain number of milliseconds (repeatedly, in the case of `setInterval()`).

One thing a lot of people don't realize is that the delay&mdash;how long the methods should wait before running the function&mdash;is a _minimum delay_, not an exact time when it will run.

It's a _suggestion_.

## Why don't `setTimeout()` and `setInterval()` run exactly when the delay ends?

There are a few reasons, and they all boil down to _performance_.

<div class="list-spaced">
{{%md%}}
- JavaScript is synchronous, so if another task is happening when the delay ends, the browser will wait until that task is completed before running the callback.
- Successful timeouts or intervals are throttled with a delay of at least 4ms. When this kicks in and how long the forced delay is for varies by browser.
- Timeouts and intervals in inactive background tabs are throttled to not run more than once every 1,000ms.
{{%/md%}}
</div>

## Maximum timeouts

In researching this article, I learned an interesting tidbit: [the delay on a timeout or interval can't be longer than 24-ish days](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Reasons_for_delays_longer_than_specified).

> Browsers including Internet Explorer, Chrome, Safari, and Firefox store the delay as a 32-bit signed integer internally. This causes an integer overflow when using delays larger than 2,147,483,647 ms (about 24.8 days), resulting in the timeout being executed immediately.

What's most interesting about this to me is not the limit itself, but that anyone would ever use a delay of even a few hours, let alone _days_.