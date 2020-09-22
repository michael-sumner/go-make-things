---
title: "How to create and work with timestamps in vanilla JS"
date: 2020-09-21T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

A timestamp is a number used to represent a fixed point in a time.

Unlike date strings, which are *relative* to a specific timezone or location, a timestamp is *absolute*, and represents the same moment regardless of where a person lives.

Today, we're going to look at how to work with timestamps in vanilla JS.

## Unix time

*Unix time* is the amount of time that have elapsed since midnight on January 1, 1970, UTC.

It's a commonly used measure of time in operating systems and programming, and provides a handy way to create timestamps.

## Creating a timestamp with vanilla JS

Let's say you want to record *right now* as the moment when something happened (like fetching data from an API).

First, you would create a `new Date()` instance. Then, you would call the `Date.getTime()` method, which returns a unix timestamp (sort of) for the date.

Most languages use seconds for their unix timestamps. JavaScript uses milliseconds.

```js
var now = new Date();
var timestamp = now.getTime();
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/JjXerMo)

**Update:** My buddy [David Guttman](https://davidguttman.com/) let me know about the `Date.now()` method, which does the same thing as the approach above.

```js
var timestamp = Date.now();
```

It works in all modern browsers, and IE9 and up.

Alternatively, you can reduce the original code to one line like this.

```js
var timestamp = new Date().getTime();
```

## Getting the date from a timestamp

Let's say some time later you wanted to get the date that something happened based on a timestamp.

You can pass the timestamp into a `new Date()` constructor.

```js
var date = new Date(timestamp);
```

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/BaKGwJm)

## Working with timestamps with other languages

JavaScript uses milliseconds for its timestamps. Most server-side languages&mdash;PHP, python, and so on&mdash;use seconds.

If you get a timestamp from the server, or need to send one back, you'll first need to convert it.

To use a server-side timestamp with JS, you'll want to multiply it by `1000` to convert it to milliseconds. Otherwise the date will be completely off.

```js
// Using a server-side timestamp with JS
var date = new Date(serverTimestamp * 1000);
```

When sending timestamps back to a server, it's a good idea to convert them to seconds for consistency. To do that, divide by `1000`.

```js
// Before sending a timestamp to a server
var now = new Date();
var timestamp = now.getTime();
var timestampInSeconds = timestamp / 1000;
```