---
title: "The tech behind my JavaScript education platform"
date: 2019-05-02T10:30:00-04:00
draft: false
categories:
- Business and Leadership
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
---

People who purchase my [pocket guides and video courses](https://vanillajsguides.com), join my [Academy training program](https://vanillajsacademy.com), and subscribe to my [JS projects video series](https://vanillajsprojects.com) access all of their content from a [learning platform](https://courses.gomakethings.com).

I'm periodically asked what technology I use for that, so today I wanted to walk you through how it all works.

## The Big Picture

I custom-built my platform using a handful of off-the-shelf tools that I connected together with APIs.

- I use [Hugo](https://gohugo.io/), the static-site generator, to power the front-end.
- A [headless instance of WordPress](/headless-wordpress-with-static-website-generators/) handles user management for me.
- I use [Easy Digital Downloads](https://easydigitaldownloads.com/) for my checkout process. Data from it controls who has access to what.
- My videos are hosted and served from [Vimeo](https://vimeo.com/).
- [GitHub](https://github.com) provides version control.

## Easy Digital Downloads

My favorite thing about Easy Digital Downloads (EDD) is that, as an open source product, I can dig into the source code and see how it works.

While EDD provides an API, it doesn't do quite what I need.

I extend the WP REST API with my own custom endpoint that sends back a list of IDs for the products a user has purchased. It's literally just an array of numbers, like this:

```js
[123, 8764_1, 555]
```

## Headless WordPress

I use WordPress to manage users.

It stores usernames and encrypted passwords, verifies users credentials, maintains session state, and can run some server-side functions for me to interact with private APIs using keys or secrets I don't want to expose in my client-side code.

I use the WP Ajax API to verify users and get back a JSON file of content that they have access to.

If you want to learn more about how this works, [I wrote a detailed article about it](/headless-wordpress-with-static-website-generators/).

## Hugo

Hugo is the real work-horse behind the platform, in large part because of it's flexibility.

It let's me write all of my content in markdown, and add metadata through simple front matter properties. Things like links to source code, the videos, and so on are just key/value pairs at the top of the document.

When Hugo builds itself, it creates HTML files for each of the pages, but doesn't add any content besides an empty `div` with a few data attributes on it.

Hugo also creates a JSON file with all of the data for guides, courses, training program, and project videos, and saves it to a directory that can only be accessed by the server (it cannot be opened in the browser).

When a user signs in, I make an API call to my headless WordPress backend. It grabs that file, grabs purchase data from the Easy Digital Downloads API, and compares the two, then sends back a subset of the file that contains only the content the user has access to.

I use some custom vanilla JS to generate the front-end from that data.

### Why not just use WordPress?

A previous iteration of this project used WordPress itself as the learning platform.

This has one distinct advantage: no reliance on JavaScript to work. There were many downsides, however.

Templating was a lot harder. It was *much* slower for users. Authoring content and adding custom properties was harder, too. Everything about the experience was worse&mdash;for me *and* my customers&mdash;than the setup I have now.

## Vimeo

Streaming video well is hard. Vimeo makes it easy.

They compress my files, and let users stream them at a variety of resolutions and speeds. I can add caption files that users can toggle on and off. I can let users directly download the files if I want.

And perhaps most important, I can control where and how the videos are played. I have them restricted to only play on my platform and not show up on Vimeo.com. I can also brand the player and set what controls are surfaced.

This one was a no-brainer.

## GitHub

GitHub serves as version control for the entire front-end. It's webhooks also [trigger fresh builds when I push new content](/automating-the-deployment-of-your-static-site-with-hugo-and-github/).

## Wrapping up

So that's my setup. There are plenty of off-the-shelf options, too.

I decided to build my own because I had a very clear vision for the user experience I wanted for my customers. This also let's me easily bolt-in new offerings down-the-road.

If you want to know more about any piece of the stack, let me know!