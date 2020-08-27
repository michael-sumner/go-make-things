---
title: "Converting and formatting dates and times with the vanilla JS Intl.DateTimeFormat() constructor"
date: 2020-08-27T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

In a past article, we looked at [formatting dates and times using the `Date.toLocaleString()` method](/how-to-create-a-clock-with-vanilla-js/).

Today, we're going to look at the `Intl.DateTimeFormat()` method, and when and why you'd choose one over the other.

## How it works

The `Intl` object was designed to make *Internationalization* of location-specific data easier. The `DateTimeFormat()` is a method used to format dates and times.

First, you create a new `Intl.DateTimeFormat()` instance.

This accepts a *locale* (for example, `en-US` for US English, or `en-GB` for British English). This argument tells the method what language to format the date and time into.

```js
var formatter = new Intl.DateTimeFormat('en-US');
```

You can have more fine-grained control over how the output is formatted using a series of *options* as a second argument.

This example uses a `short` time formatting and a `long` date formatting. What that looks like varies from one locale to the next, and from one browser to another (which is totally fine, cede control on this).

```js
// This will use a short time formatting and a long date formatting
// What those look like varies from one locale to the next
var formatter = new Intl.DateTimeFormat('en-US', {
	timeStyle: 'short',
	dateStyle: 'full'
});
```

Next, you can use the instance to format one or more `Date` objects.

```js
// Get the current date and time
var date = new Date();

// Format it into a string
formatter.format(date);
```

You can chain these without creating a variable for your `Intl.DateTimeFormat()` instance if you'd like.

```js
// Get the current date and time
var date = new Date();

// Format it into a string
new Intl.DateTimeFormat('en-US', {
	timeStyle: 'short',
	dateStyle: 'full'
}).format(date);
```

You can view a full list of `options` arguments and what they do on [the Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#Syntax).

## What's the difference between `Intl.DateTimeFormat()` and `Date.toLocaleString()`

Not much.

Older implementations of the `Date.toLocalString()` method did not support `locale` or `options` arguments, and just used whatever the current user's locale was.

Once the `Intl.DateTimeFormat()` method rolled out, the `options` available to it were also rolled into `Date.toLocaleString()`.

If you're formatting multiple dates with the same options, the `Intl.DateTimeFormat()` method will give you better performance and should be preferred. Otherwise, they're identical in behavior.

## Browser compatibility

The `Intl.DateTimeFormat()` method works in all modern browsers, and back to IE 11.