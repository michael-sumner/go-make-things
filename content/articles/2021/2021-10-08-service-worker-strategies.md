---
title: Service worker strategies
date: 2021-10-08T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
- Web Performance
---

I just launched [a brand new pocket guide on Service Workers](https://vanillajsguides.com/service-workers/). Today, I wanted to take a look at the different types of strategies you can use with service workers.

Let's dig in!

## What is a service worker?

A service worker is a special type of JavaScript file that acts like _middleware_ for your site.

Any request that comes from the site and any response it gets back first goes through the service worker file. Service workers also have access to a special cache where they can save responses and assets locally.

Together, these features allow you to...

- Serve frequently accessed assets from your local cache instead of the network, reducing data usage and improving performance.
- Provide access to critical information (or even your entire site or app) when the visitor goes offline.
- Prefetch important assets and API responses so they're ready when the user needs them.
- Provide fallback assets in response to HTTP errors.

In short, service workers allow you to build faster and more resilient web experiences.

Unlike regular JavaScript files, service workers do _not_ have access to the DOM. They also run on their own thread, and as a result don't block other JavaScript from running. Service workers are designed to be fully asynchronous.

## The two main approaches

There are two main approaches you can use with service workers:

- **Network-First.** With a network-first approach, you pass along requests to the network. If the request isn't found, or there's no network connectivity, you then look for the request in the service worker cache.
- **Offline-First.** With an offline-first approach, you check for a requested asset in the service worker cache first. If it's not found, you send the request to the network.

_Network-first_ and _offline-first_ approaches work in tandem. You will likely mix-and-match approaches depending on the type of asset being requested.

_Offline-first_ is great for large assets that don't change very often: CSS, JavaScript, images, and fonts. _Network-first_ is great for frequently updated assets like HTML and API requests.

_**Important!** If you use an offline-first approach with HTML files, and later update your HTML or your service worker, visitors who already have a cached version of the site will not receive the updated files. Because the cached HTML references the out-of-date service worker, it will never update, either. Use with caution._

## Augmenting approaches

You can augment _network-first_ and _offline-first_ strategies with some additional approaches to make them even more useful.

- **Pre-Cache Core Assets.** Every site and web app has a set of core assets that are used on almost every page: CSS, JS, a logo and favicon, fonts. You can pre-cache these when your service worker is installed, and serve them using an offline-first approach whenever they're requested. This can have a dramatic impact on the performance of your site or web app.
- **Cache As You Browse.** Your site or app likely has assets that won't be accessed on every visit or by every visitor: things like blog posts and images that go with articles. For these assets, you may want to cache them in real-time as the visitor accesses them. On subsequent visits, you can load them directly from cache (with an _offline-first_ approach) or serve them as a fallback if the network fails (using a _network-first_ approach).
- **Fallback Content.** If an item can't be found on the network _and_ doesn't exist in cache, you can use your service worker to respond with fallback content instead. For example, you can show a default image whenever a matching file can't be found, or an "offline page" when the user loses their network connection.

## An "offline" page

Showing an offline page when a visitor loses network connectivity can provide a much better user experience than the browser's default "lost connection" page.

Depending on what your site or web app does, there are some ways that you can make an offline page even more useful.

For sites about a specific location or event, like a restaurant, hair salon, hotel, or conference, you might display critical information that a visitor might need.

- A phone number, directions, or other key contact information
- Important dates or a schedule of events
- A menu or list of services and prices

For a news site, social network, or utility app, you can display a list of previously viewed pages that the user already has access to.

## Learning more

If you'd like to learn how to implement service workers on your sites and apps, check out [the Service Workers pocket guide](https://vanillajsguides.com/service-workers/).

It's available as a video course, ebook, or both, depending on how you learn best. It includes a ton of source code, and a boilerplate for quick starting your projects.