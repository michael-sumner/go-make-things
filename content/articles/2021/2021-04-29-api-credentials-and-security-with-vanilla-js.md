---
title: "API credentials and security with vanilla JS"
date: 2021-04-29T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

_This is another excerpt from my new and updated [APIs and Asynchronous JS pocket guide](https://vanillajsguides.com/apis/)._

Yesterday, we looked at [different ways to authenticate APIs with vanilla JS](/api-authentication-with-vanilla-js/).

Whenever you're dealing with credentials, you need to be concerned about security. In the article, I had a few examples where the API credentials were hard-coded into the JS file, with this following note...

> **IMPORTANT:** You should not store your API credentials in a JS file like this. More on how to use APIs with this kind of authentication in JavaScript in a future article.

Today is that "future article." Let's dig in.

## Your site or app should be encrypted

If you're sending secure credentials with an API (such as a username/password or key/secret), your site should be encrypted with an SSL certificate. It's ok to use an unencrypted site locally for testing, but production sites should use HTTPS. Many APIs require this.

Many web hosts provide SSL certificates at no cost or for a small fee. If you're comfortable with command line, you can also install one for free using [Let's Encrypt](https://letsencrypt.org/).

## Don't store permanent credentials in the browser or your JS

Permanent credentials, such as a username and password or key and secret, should never be stored in the browser or included in your JavaScript.

**This is BAD**

```javascript
let username = 'myAwesomeUsername';
let password = 'p@ssw0rd!';

let key = 'abcdef';
let secret = '1234';
```

**This is bad, too**

```javascript
localStorage.setItem('credentials', JSON.stringify({
	username: 'myAwesomeUsername',
	password: 'p@ssw0rd!'
}));
```

These should be collected in the UI when they're needed, then immediately discarded.

That generally means using a login form of some kind. Fetching them from a server with Ajax is _**not**_ an acceptable approach, as that API call (and the credentials) can be read by anyone who knows how to open up the network tab in their browser's developer tools.

## API tokens were made to be stored for reuse

API tokens, which are usually obtained by supplying other credentials, were designed specifically to be saved for reuse. Because they expire and often grant limited permissions, they typically create a smaller risk footprint than other user credentials do.

The most secure way to store them is with a cookie with the `secure` flag enabled, but `window.localStorage()` and `window.sessionStorage()` are also options.

```javascript
// This is usually OK
// Short term API tokens were designed to be stored locally
document.cookie = `token=1234; max-age=${60 * 60 * 24 * 14}; secure;`;
localStorage.setItem('token', '1234');
sessionStorage.setItem('token', '1234');
```

## How to handle APIs that don't issue short term tokens or require a user to log in

Sometimes, APIs require credentials but don't provide short term tokens. For example, the Mailchimp API uses a permanent API key with basic auth to authenticate every request.

Alternatively, you made need to make an authenticated API call that does not require any input from a user. _They_ don't have credentials. You do, and want to use that data on a publicly available site.

This creates a serious problem for JavaScript developers.

Tomorrow, we'll look at another approach you can use in these situations to keep your credentials secure: middleman APIs.