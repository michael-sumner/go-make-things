---
title: "Keeping credentials secure when making API calls with JavaScript"
date: 2019-07-21T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

*This is an excerpt from my [APIs with Vanilla JS](https://vanillajsguides.com/apis/) pocket guide.*

Some APIs&mdash;like the [Ron Swanson Quotes Generator](https://github.com/jamesseanwright/ron-swanson-quotes) and [Random Dog](https://random.dog/woof.json)&mdash;work by simply calling an endpoint.

Others&mdash;like [the New York Times](https://developer.nytimes.com/) and many endpoints for [the GitHub API](https://developer.github.com/v3/#authentication)&mdash;require you to authenticate who you are before you can make API calls.

To authenticate you, the API may require:

1. Your username and password.
2. A *key* and *secret*.
3. An *API key* or *OAuth token*.

These are often passed to the API as query string values on the endpoint URL. For example, here's how you make a call to the New York Times API.

```http
https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=my_api_key_1234
```

### Including authentication credentials in your JavaScript is bad

The big challenge with using APIs that require authentication in your JavaScript is that you're forced to expose your API credentials to use them.

Anyone who knows how to view source or view requests in their browser's Developer Tools can view those credentials, steal them, and use them to access the API as you.

For APIs that let you send new data or update and delete existing data, that can be really dangerous. It's also an issue for APIs that expose private data, restrict the number of calls you can make, or cost money to use.

**As a rule of thumb, _never_ include credentials in client side JavaScript.**

The only time I personally would make an exception to that are for APIs that are:

1. Free, and
2. Only allow `GET` requests, and
3. Surface public data that's accessible elsewhere.

Bonus points of the credentials are restricted in use to a specific domain or URL.

### How to securely use authenticated APIs in JavaScript

What if you need or want to an API that doesn't mean those criteria? How can you access that data with JavaScript if you can't include your credentials in your JS?

The trick is to setup an API endpoint on a server that you can call with your JavaScript.

This middleware API stores your credentials securely on the server, and makes the real API call on your request. It then sends back the data, optionally filtering out any data you don't want exposed publicly first.

#### An example: the Mailchimp API

For example, [the Mailchimp API](https://developer.mailchimp.com/) requires an API key and private list ID to subscribe users.

I don't want to expose either of those publicly, or someone could spam subscribe my list, delete subscribers, and so on.

I created [a WordPress plugin](https://github.com/cferdinandi/gmt-mailchimp-wp-rest-api) that uses the newish [WP REST API](https://developer.wordpress.org/rest-api/) to create a custom endpoint I can call from my JavaScript.

```http
http://my-site-url.com/wp-json/gmt-mailchimp/v1/subscribe/
```

In WordPress, I can save my API key and list ID. I can also add a list of allowed domains, and any requests that come from domains other than those are ignored.

On the server, it uses [the `wp_remote_request()` method](https://developer.wordpress.org/reference/functions/wp_remote_request/) and the arguments I send along to ping the actual Mailchimp API or subscribe a new user (or update an existing one). Then, it returns a status code letting me know if it worked or not.

This let's me keep my authentication credentials secret and still use APIs in my JavaScript.

#### How can you do something like that?

There are countless ways to set up your own server-side middleware for your APIs, and getting into the details is well beyond the scope of this guide.

So much of what I would recommend depends on your comfort writing server-side code, the programming languages you already know, and what you're trying to accomplish.

Because my background is in WordPress, and because it provides some create helper methods for creating middleware endpoints and making Ajax calls in PHP, it's my go-to solution for this kind of thing.

The best solution for you might be something different.