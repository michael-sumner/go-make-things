---
title: "The amazing power of service workers"
date: 2020-07-30T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- JavaScript
---

Today, I want to talk about service workers: what they are, and when and why you'd use them

I *won't* be digging into code specifics today. This one is going to be a lot more high level that looks more at strategies and approaches. I will be sharing code details in some future articles.

Let's dig in.

## What is a service worker?

A service worker is a special type of JavaScript file that browsers *install* and store locally.

The service worker then acts as *middleware*, intercepting HTTP requests (for files, API calls, and so on). It also provides a mechanism for saving copies of assets (JS and CSS files, images, JSON payloads, and even HTML files) locally in a cache.

You can save assets as they're requested, but you can also "pre-request" and save files asynchronously in the background, too. And you can choose what to save and what to ignore.

On the surface, service workers seem pretty boring. But they allow for really interesting and powerful things.

## Ways to use a service worker

So, why would you want to use a service worker? Here are some cool things you can do with it.

1. Serve frequently accessed files from a local cache instead of the network to reduce bandwidth usage.
2. Pre-cache an "offline" page to display if a user loses their network connection. This could just be a friendly message, or for something like a conference or restaurant, it could be important information like hours, location, and contact info.
3. Automatically save pages on your site to cache as the user browses. If they go offline, serve the cached versions.
4. Add a "save for offline" feature to your site or app, providing a native Instapaper kind of feature.
5. Pre-cache your entire app, and serve all subsequent page views from the cache, providing a *single page app (SPA)* like experience without the fragility and complexity of JS-based routing.

There are tons of other creative things you do, too.

## A practical example

The learning portal for people who buy my courses uses an API to get back all of a user's course material.

To improve performance, I had been storing the returned data in `sessionStorage` between page loads. The API is called once when the user logs in, and then it uses the `sessionStorage` data on every page after the first.

*But*... if you have a lot of courses, the data object can exceed the limits of `sessionStorage` on some devices, so I ended up having to break it up into separate API calls for each product. Changing to another product means another API call.

Then I discovered service workers.

Service workers have much larger cache limits than `localStorage` and `sessionStorage` do. It varies from browser-to-browser, but everything I've read online indicates you get at least 50mb (versus a max of 5mb with `localStorage`).

Now, I cache the API response with a service worker.

On every subsequent page load, I still call the API, but I intercept the response with a service worker and send the cached version instead, so the response is instant.

## Learning more

If you want to dig into service workers, the two best resources I've found both come from the amazing [Jeremy Keith](https://adactio.com/).

First, [Jeremy's "Going Offline" talk](https://www.youtube.com/watch?v=RVdW-P_oAJ0) helped me finally wrap my head around what service workers are, and how they actually work.

<iframe width="560" height="315" src="https://www.youtube.com/embed/RVdW-P_oAJ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

When I was ready to really dig in, I bought [a copy of his book, also title "Going Offline," from *A Book Apart*](https://abookapart.com/products/going-offline).

I highly recommend both.