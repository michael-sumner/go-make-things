---
categories:
- Code
- JavaScript
date: '2017-09-26'
url: /how-to-update-a-url-without-reloading-the-page-using-vanilla-javascript/
title: How to update a URL without reloading the page using vanilla JavaScript
---

I'm in the middle of writing my next [pocket guide](/guides/), *Vanilla JS Web Apps*, with a focus on single page apps.

One of the things the book covers is how to route and display different URLs for different pages when you're really serving the same single HTML file each time.

This is made super easy with the browser History API.

## How the History API works

The History API exposes a few really useful methods, most notably the `pushState()` method and `onpopstate` event.

### `pushState()`

The `pushState()` method let's you update the URL *and* create a new item in the browser history without reloading the page. Because the history is updated, this new URL can be changed with the browser's forward and backward buttons as well.

Here's how it works.

```js
history.pushState(state, pageTitle, url);
```

`state` is an object containing some information about the new URL. It can be access via JavaScript using `history.state`. In an app, you might include something like the page ID or some other information you need to access easily.

```js
history.pushState({
    id: 'homepage'
}, pageTitle, url);
```

The `pageTitle` is the updated title the browser should display. Unfortunately, it's a pointless item as many browsers ignore it.


```js
history.pushState({
    id: 'homepage'
}, 'Home | My App', url);
```

Finally, the `url` is, of course, the new URL to update the page to.

```js
history.pushState({
    id: 'homepage'
}, 'Home | My App', 'http://my-app-url.com/?p=homepage');
```

### `onpopstate`

You can also listen for changes to the URL and update your page content according using the `onpopstate` event.

This fires any time someone clicks the forward or backward button.

```js
windown.onpopstate = function (event) {
    if (history.state && history.state.id === 'homepage') {
        // Render new content for the hompage
    }
};
```

You can also use this with `addEventListener`, which is my preferred approach.

```js
window.addEventListener('popstate', function (event) {
    if (history.state && history.state.id === 'homepage') {
        // Render new content for the hompage
    }
}, false);
```

### `replaceState()`

One additional, quite useful method is `replaceState()`. It works exactly the same way as `pushState()`, but replaces the existing history entry instead of creating a new one.

Why would you use or need this?

That initial page load won't have a `state` object associated with it and will not trigger an `onpopstate` event, creating a break in the forward and backward button browser functionality. Calling this when you first load your app creates a proper history listing you can hook into.

I'll be covering the specific implementation of these techniques in more detail in my upcoming [*Vanilla JS Web Apps* pocket guide](/guides/).

If you buy (or already own) [the complete set](/guides/complete-set/), you'll get the guide as a free update when it comes out (which is a great deal because the price of the set goes up with each new book).