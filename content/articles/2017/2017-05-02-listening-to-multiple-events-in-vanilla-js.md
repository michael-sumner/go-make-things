---
categories:
- Code
- JavaScript
date: '2017-05-02'
url: /listening-to-multiple-events-in-vanilla-js/
title: Listening to multiple events in vanilla JS
---

A few weeks back, we looked at <a href="https://gomakethings.com/attaching-multiple-elements-to-a-single-event-listener-in-vanilla-js/">how to attach multiple elements to a single event listener in vanilla JavaScript</a>.

Today, let's look at how to run the same code for multiple types of events without having to duplicate your code.

<h2>Each event needs its own listener</h2>

In vanilla JavaScript, each event type requires its own event listener. Unfortunately, you <em>can't</em> pass in multiple events to a single listener like you might in jQuery and other frameworks.

For example, you <em>cannot</em> do this:

```js
document.addEventListener('click mouseover', function (event) {
    // do something...
}, false);
```

<strong>But...</strong> by using a named function and passing that into your event listener, you can avoid having to write the same code over and over again.

```js
// Setup our function to run on various events
var someFunction = function (event) {
    // Do something...
};

// Add our event listeners
window.addEventListener('click', someFunction, false);
window.addEventListener('mouseover', someFunction, false);
```

<code>addEventListener</code> automatically passes the <code>event</code> object into your function as an argument.