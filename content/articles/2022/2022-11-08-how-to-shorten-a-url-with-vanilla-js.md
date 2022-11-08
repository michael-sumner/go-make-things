---
title: How to shorten a URL with vanilla JavaScript and the Shrtcode API
date: 2022-11-08T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

[Shrtcode](https://shrtco.de) is a free link shortening service.

They have a web GUI, but they also have [an API you can call](https://shrtco.de/docs) to shorten URLs. Today, we're going to look at how to use it to shorten URLs.

The API endpoint is `https://api.shrtco.de/v2/shorten`, with the `url` to shorten as a query string parameter.

To shorten the URL for my website, I would do this.

```js
// The URL to shorten
let url = 'https://gomakethings.com';

// Call the API
let request = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
```

I'm [using `async` and `await`](/async-and-await-in-javascript/) in this example. I'm also passing the `url` into the `encodeURIComponent()` function to encode it for use in a URL.

Next, you would use the `Response.json()` method to convert the API response into an object.

```js
// Call the API
let request = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);

// Get the response
let response = await request.json();
```

The API response object has a few properties and variants under the `result` property. The one we want is `full_short_link`.

```js
// The shortened URL
let shortened = response.result.full_short_link;
```