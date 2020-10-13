---
title: "An alternative to single page apps: multi-page apps with service workers"
date: 2020-10-13T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- HTML
- JavaScript
- Web Performance
---

Yesterday, I [ranted a bit about modern JS, including my disdain for single page apps](/modern-js-is-amazing.-modern-js-is-trash./). I also mentioned that service workers can turn multi-page apps into fully offline web apps.

I had a few folks ask me how that works, so today, I wanted to walk you through it.

## Why single page apps (or SPAs) suck so much

Browsers are an amazing piece of technology. They give you *so much* for free, just baked right in.

Single page apps break all that, and force you to recreate it with JavaScript.

**When you use JavaScript routing, you need to recreate with JS the follow features that browsers give you for free:**

- Detecting clicks on link elements
- Determining if a clicked link points to a page at the same domain or an external link
- Suppress the default link behavior *if* the link does point to an in-app page
- Separating a left-click from a right-click, shift-click, control-click, or command-click that opens the link in a new tab instead of the current window
- Update the URL without triggering a page refresh
- Match the URL to the right content
- Render the new content on the page
- Shift focus to the correct place on the page
- Make sure the change in content/focus is announced correctly to screen readers and other assistive technologies
- Detect when someone clicks the browser’s back button/forward button, and update the URL and UI
- Update the `title` element

That's a *lot* of app-critical stuff to offload to JavaScript, the most fragile part of the front end stack.

It's also a lot of reinventing the wheel. Browsers *already do this stuff*. We break it with JS, and then recreate it with more JS. It's pretty absurd.

Let's look at what I think is a simpler, better way to handle all of this.

_**Quick aside:** I'm specifically referring to single page apps that have more than one view, and not simple apps that truly only have or need one page._

## Multi-page apps and service workers

For the last few years, I've been building *multi-page apps* instead of single page apps.

Any content that will always be there&mdash;the logo, navigation items, page headings&mdash;gets hard-coded directly into the HTML. Conditional content&mdash;stuff that varies by user or is only visible if you're logged in&mdash;gets created after the page loads with JavaScript.

For my conditional content, I include an empty `div` with a `[data-app]` attribute on it. The value of the attribute identifies what content should get loaded there.

```html
<div data-app="account"></div>
```

Sometimes, I have two different navigation menus: one for logged in users and one for logged out visitors. In those cases, I include both in the markup, hide one with CSS, and add a class to the HTML element to toggle which one is visible.

When a user clicks on a link, the browser does what it always does:

- Checks where the URL points to
- Requests the HTML file for that location from the server
- Loads the page
- Renders the content

All of the stuff you would need JS for in a single page app? The browser just handles it.

### This is great for smaller apps, but what about bigger ones?

For bigger apps, [I use a static site generator (or SSG), Hugo](/series/hugo-and-static-site-generators/), to automate creating all of HTML pages.

As a bonus, I write my content for that view in markdown, and have Hugo generate a JSON file of my content that it saves to a folder that can't be accessed in the browser.

For my courses portal that students use to access their content, I created a tiny little API with some PHP that I can call with client side JavaScript. It gets the JSON file, filters out what the user doesn't have access to, and sends it back so that I can render it into the UI.

### Aren't single page apps faster because they don't need to reload the whole page?

I use pre-rendered, static HTML files served from a good but cheap $5 DigitalOcean server. On a good internet connection, the page loads are nearly instant, just like with a single page app.

But I still have to request my JSON every time the page reloads, right? Server reloads are expensive, aren't they?

**Here's where caching and [service workers](/series/service-workers/) come in.**

For a while, I was using the `sessionStorage` API to store my JSON payloads locally between views. On page reloads, the cached data would be used instead of making a new API request.

This works great for smaller JSON objects (and no, `sessionStorage` is *not* slow, don't be silly), but for students who have purchased a lot of my products, the data is too big to store in `sessionStorage`.

Fortunately, service worker caches have much larger storage limits.

Now, I cache the request with a service worker. On every subsequent page view for the session, a local version of the visitors data is used instead.

You can also use service workers to cache an entire app (all of the data and all of the pages) locally for offline use. Service workers are awesome!

### That sounds complicated

It is, a little big. There are definitely a handful of smaller components bolted together to make this work.

But you know what, so is JS routing. This is more resilient, more performant, and simpler to manage in the long run.