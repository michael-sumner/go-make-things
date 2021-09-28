---
title: Miniflare from Cloudflare Workers
date: 2021-09-28T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

I just released [a new pocket guide and video course on Serverless](https://vanillajsguides.com/serverless/) as part of my Vanilla JS Pocket Guide series.

There are lots of great options for serverless, including [AWS Lambda](https://aws.amazon.com/lambda), and [Netlify Functions](https://www.netlify.com/products/functions/). But my personal favorite is [Cloudflare Workers](https://workers.cloudflare.com/).

I love CloudFlare Workers for two big reasons:

1. There's a super simple GUI you can use, so command line knowledge isn't required (but is an option if you want).
2. It uses vanilla JS.

Most of the other vendors I've looked at require you to push code to a GitHub account, or use a CLI package, or author your code in another language.

CloudFlare Workers are simple, fast, and let me write code in plain old JavaScript (they support a bunch of other languages, too). They have a bunch of other awesome features, too, like databases and scheduled tasks.

And they have a very generous free plan!

This all makes them a fantastic teaching tool. As a reslut, I use Cloudflare Workers to learn about serverless in the course.

Today, I just learned that they have [a locally hosted simulator for developing and testing Cloudflare Workers called Miniflare](https://miniflare.dev/).

It supports most most Workers features, including their serverless database option, Workers KV. And because its local, you can do all of your development without an internet connection or network calls.

Checkout [Minflare.dev](https://miniflare.dev/) to learn more. [And to learn all about serverless and vanilla JS, check out my new guide and course.](https://vanillajsguides.com/serverless/)