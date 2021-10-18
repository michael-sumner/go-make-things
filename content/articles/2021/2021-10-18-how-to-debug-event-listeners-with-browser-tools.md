---
title: How to debug event listeners with your browser's developer tools
date: 2021-10-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

When you're working with a UI, you may sometimes need to figure out what event (and subsequent callback function) is being triggered by an interaction with an element.

For example, on [the homepage for my site](https://gomakethings.com), there's a newsletter signup form. When you click the _Get Daily Developer Tips_ button, what happens?

Today, I'm going to show you how to use your browser's developer tools to debug event listeners. Let's dig in!

## Right click > inspect element

On the page, right-click the element you want to debug event listeners for, then click _Inspect Element_.

<img alt="A screenshot of the Go Make Things homepage, with MS Edge's developer tools open to the event listener tab for the newsletter submit button" src="/img/articles/debug-events.png">

**In chromium-based browsers like MS Edge and Google Chrome,** click the _Event Listeners_ tab in Developer Tools. There, you'll see a list of all of the events being listened to on that element. 

If you expand the event, you can see what element they're attached to ([because of event delegation](/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/)), and click a link to open up the actual event listener itself in the JavaScript.

<img alt="A screenshot of the Go Make Things homepage, with Firefox's developer tools open to elements tab for the newsletter form, with the event details showing" src="/img/articles/debug-events-ff.png">

**In Firefox,** events are only surfaced on the element they're attached to. It doesn't account for event delegation.

Using my newsletter form as an example, the `button` element has no events attached to it, but the parent `form` has a `submit` event listener. Clicking on the `event` chicklet next to the form element in the _Inspect Element_ tab reveals the event details, including the callback function that's run in response.

## Other practical uses

In chromium's developer tools, you can also remove attached events. 

This is particularly useful when forms prevent you from pasting in you passwords, account numbers, and such, which makes using a password manager much more difficult.