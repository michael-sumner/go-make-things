---
title: "The problem with single page apps"
date: 2019-05-28T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

Recently, I've had a few folks ask me how I typically handle routing with vanilla JS and single-page apps.

If you build a JavaScript app with more than one page or view, you'll probably need a way to determine which UI or layout to show based on the URL. That's *routing*.

## We over-complicate this

Single-page apps (or SPAs as they're sometimes called) serve all of the code for an entire multi-UI app from a single `index.html` file.

They use JavaScript to handle URL routing with real URLs. For this to work, you need to:

1. Configure the server to point all paths on a domain back to the root `index.html` file. For example, `todolist.com` and `todolist.com/lists` should both point to the same file.
2. Suppress the default behavior when someone clicks a link that points to another page in the app.
3. Use more JavaScript---`history.pushState()`---to update the URL without triggering a page reload.
4. Match the URL against a map of *routes*, and serve the right content based on it.
5. If your URL has variable information in it (like a todolist ID, for example), parse that data out of the URL.
6. Detect when someone clicks the browser's back button/forward button, and update the URL and UI.
7. Use JavaScript to update the `title` attribute on the page.
8. Use *even more JavaScript* to dynamically focus the content area when the content changes (for screen-reader users).

(*Shoutout to [Ashley Bischoff for those last two](https://twitter.com/handcoding/status/1133394105655017473)!*)

**You end up recreating with JavaScript a lot of the features the browser gives you out-of-the-box.**

This becomes more code to maintain, more complexity to manage, and more things to break. It makes the whole app more fragile and bug-prone than it has to be.

I'm going to share some alternatives that I prefer.

That said, if using JavaScript to handle routing is something you're interested in, [Krasimir Tsonev has written an excellent article on how that works](http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url), and open sourced a routing plugin, [Navigo](https://github.com/krasimir/navigo), based on the article.

## A simpler approach

If you don't use JavaScript to handle routing, what else can you do?

**Let the browser load real HTML files located at the actual URLs.** Instead of a single-page app, you build a multi-page app.

Looking at our list-making app, let's say we wanted users to have a settings page where they can choose whether or show items as a bulleted or numbered list, and clear all of their list data.

Create a directory in your app called `settings`, and add an `index.html` file there (this lets you create pretty URLs like `list-maker.com/settings/` instead of having something like `list-maker.com/settings.html`).

To render the UI, you include a unique selector in the markup that describes the current view (such as `[data-app="lists"]` or `[data-app="settings"]`).

In your JavaScript file, you can do something like this to determine which template to use.

```js
// Get the app container
var app = document.querySelector('[data-app]');

// Determine the view/UI
var page = app.getAttribute('data-app');

// Render the correct UI
if (page === 'lists') {
	// Render the homepage...
}

if (page === 'settings') {
	// Render the settings page...
}
```

## Why is this better than using JavaScript routing?

A few reasons:

1. Support for the browser's forward and backward buttons are baked in. You don't need to do anything to make that work.
2. You don't need to intercept clicks and determine if the clicked link points to an internal link or an external one. You just let them all resolve.
3. You don't need to use complex regex patterns or another library to parse the URL and determine which view or UI to render. It's baked into the markup already.
4. It's simpler and easier to implement.

A counter argument might be that using JavaScript routing results in faster apps because you avoid a page reload.

That *can* be true, but if you use front end performance best practices and load static HTML files, I find that page loads using this approach feel nearly instantaneous.

For example, this course site is a JavaScript app built using real URLs with full page reloads. When you click from lesson to lesson, the content loads almost immediately. It *feels* like a single page app, but it's not.