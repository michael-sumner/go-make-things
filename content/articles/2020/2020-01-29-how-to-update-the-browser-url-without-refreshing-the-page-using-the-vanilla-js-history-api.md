---
title: "How to update the browser URL without refreshing the page using the vanilla JS History API"
date: 2020-01-29T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

You can use the `window.location.href` property to update the browser URL.

```js
window.location.href = 'http://my-new-url.com';
```

But using this approach causes the page to reload. What if you want to update the URL _without_ refreshing the page?

Today, let's take a look at the History API.

## The History API

The History API is a set of methods on the `history` object that can be used to manipulate the _history_&mdash;the thing that's accessed by the forward and backward buttons&mdash;of the browser.

It works in all modern browsers, and back to IE 10.

## The `history.pushState()` method

The `history.pushState()` method can be used to push a new entry into the browser's history&mdash;and as a result, update the displayed URL&mdash;without refreshing the page.

It accepts three arguments:

- `state`, an object with some details about the URL or entry in the browser's history.
- `title`, which is _supoposed_ to be what the `document.title` property should be (more on this shortly).
- `url`, the URL to add to the browser's history.

## An example

This method is mostly useful with single page apps, where you load content with JavaScript but want to update the URL to match.

(*I use it in [my Smooth Scroll plugin](https://github.com/cferdinandi/smooth-scroll/) to update the URL without triggering a hard page jump down to anchored elements.*)

For example, let's say you were on the homepage, and wanted to change the URL to reflect the about page. You might do something like this:

```js
history.pushState({pageID: 'about'}, 'About', '/about');
```

If you want, you can jump over to [the homepage of my site](https://gomakethings.com), copy/paste that into the console tab in developer tools, and run it.

## Some gotchas

Like many JavaScript methods, the `history.pushState()` method has a few gotchas.

Some browsers impose a 640,000 character limit on the `state` object. If you need to pass data along from one view to the next, and that data is large, you should us an empty object here and [save that data with `localStorage` or `sessionStorage` instead](/using-localstorage-to-save-user-data-with-vanilla-javascript/).

The `title` attribute is required, but ignored by all browsers. It probably shouldn't exist at all, but it shipped with the API originally and can't be removed without breaking sites that use it.

Based on both of these things, the most important argument, `url`, should probably be first, since it's the only one you _really_ need to do what you want to do. But for some reason, it's last.

Regardless, the `history.pushState()` method is incredibly useful for certain situations.

## Other things you can do with the History API

Tomorrow, we'll take a look at some other things you can do with the History API.

Most importantly, we'll learn how to detect URL updates and access the browser history (super important if you're trying to do routing with JavaScript).