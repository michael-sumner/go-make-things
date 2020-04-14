---
title: "How to create a clock with vanilla JS"
date: 2020-04-14T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
---

Back in February, Sean Welsh Brown wrote a really easy-to-follow article on [how to create a live updating clock with moment.js](https://levelup.gitconnected.com/how-to-use-moment-js-to-create-a-live-updating-clock-in-vanilla-javascript-20ae33ef2fd1).

Sean did a great job! But moment.js is almost 17kb *after* gzipping.

Today, I'm going to show you how to do the same thing with nothing but vanilla JS.

## Getting and formatting the current time

First, let's get the current time. We can do that with the native `Date()` object.

```js
var time = new Date();
```

In his tutorial, Sean used a format like this: _February 20, 2020, 8:31:24 am_.

Fortunately, there are some native methods you can use with the `Date()` object to get that same format.

### Getting a formatted date

The `toLocaleDateString()` lets you create a formatted date string. It accepts two arguments: the _locale_ (ex. `en-US`), and formatting options.

We'll use `en-US` for this example. We'll also pass in an object of options about how the date should be formatted.

```js
// returns "April 14, 2020"
time.toLocaleDateString(null, {year: 'numeric', month: 'long', day: 'numeric'});
```

### Getting a formatted time

Similarly, we can format the time using the `toLocaleTimeString()` method. It also accepts the _locale_ and formatting options as arguments.

We don't actually need any options for this one.

```js
// returns "10:16:15 AM"
time.toLocaleTimeString('en-US');
```

### Getting a formatted date and time with a single method

You can handle both the date and time in a single swoop with the `toLocalString()` method.

It accepts the same arguments as the other two methods, but for our use case, will require a few extra options to get the time right.

```js
// returns "April 14, 2020, 10:16:15 AM"
time.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
```

## Injecting the time into the DOM

Once we get our formatted string, we can add it to the DOM.

```html
<div id="clock"></div>
```

First, let's use the `querySelector()` method to get the `#clock` element and save it to a variable.

```js
var clock = document.querySelector('#clock');
```

Next, let's write a simple function to inject the current time into the `clock` element.

We need to create a `new Date()` object every time it runs, so that we're always getting the current time. Unlike Sean, I'm going to use `textContent` instead of `innerHTML`.

The `innerHTML` property triggers a reflow, but `textContent` does not, so it's better for performance. I'm also going to drop the the `h5` heading, as a heading should not be used for styling purposes.

```js
// Inject the time in the UI
var renderTime = function () {
	var time = new Date();
	clock.textContent = time.toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
};
```

Whenever I run my `renderTime()` function, the current time will get displayed in the `clock` element.

## Updating the time every second

Now, we can update the clock once a second.

To do that, we'll setup a `setInterval()` callback function. The `setInterval()` method triggers a function to run every specified number of milliseconds. In our case, we'll use `1000`, which is one second.

```js
// Update the time every second
setInterval(renderTime, 1000);
```

And with that, our clock is done.

[Here's a demo.](https://codepen.io/cferdinandi/pen/bGVVajz)

## Dynamically setting the locale

If you wanted to, you could use the `navigator.language` property to dynamically change the locale based on the current user's defined browser language.

Different locales will format the date string differently to adhere to local language norms. If you do this, you should use a fallback if no language is available.

```js
time.toLocaleString(navigator.language || 'en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
```

## Browser compatibility

The date formatting functions with user options work in all modern browsers, and back to IE11.