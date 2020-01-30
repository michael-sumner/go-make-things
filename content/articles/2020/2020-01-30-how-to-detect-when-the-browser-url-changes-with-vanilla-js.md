---
title: "How to detect when the browser URL changes with vanilla JS"
date: 2020-01-30T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to update the browser URL without refreshing the page using the `history.pushState()` method](/how-to-update-the-browser-url-without-refreshing-the-page-using-the-vanilla-js-history-api/).

Today, let's look how to detect when the URL changes and do things as a result.

## The `popstate` event

If you use `history.pushState()` to update the URL, when the user clicks the forward or backward buttons, the URL will change but the UI will not.

You can use the `popstate` method to detect those URL changes and make UI changes as needed.

```js
window.addEventListener('popstate', function (event) {
	// The URL changed...
});
```

Yesterday, we learned that the first property passed into the `history.pushState()` method is `state`. You can access that property on the `event` object.

```js
window.addEventListener('popstate', function (event) {
	// Log the state data to the console
	console.log(event.state);
});
```

## Moving forwards and backwards through History

You can also move forward and backward through the browser's history with a few other methods in the History API.

The `history.back()` method goes back one page, and the `history.forward()` method goes forward one page.

You can jump forward or backwards more than one page using the `history.go()` method. Pass in the number of pages to jump. Use a positive number to go forward, and negative number to go backwards.

```js
// go back 2 pages
history.go(-2);

// Go forward 3 pages
history.go(3);
```

## Browser compatibility

The `popstate` event, and the `back()`, `forward()`, and `go()` methods all work in all modern browsers, and back to IE 10.