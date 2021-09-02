---
title: "What is token-based authentication?"
date: 2021-09-02T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I'm creating [a new pocket guide and video course](https://vanillajsguides.com) on _token-based authentication_. It's going to be part of a new expert bundle I'm working on.

Today, I wanted to share a work-in-progress from the guide on what token-based authentication actually is. Let's dig in!

## Token-based authentication

_Token-based authentication_ provides a way to keep users logged in, and verify who they and what content they have access to, without having to save permanent credentials like a username and password in the browser.

Here's how it works:

1. The user provides their credentials, typically in the form of a username and password.
2. The credentials are sent to a server for verification.
3. The server generates a _token_, a unique string of random characters that represent the user, and sends it back.
4. The token is saved in the browser (often in a cookie or `localStorage`), and sent with every subsequent request or API call.

The _token_ becomes a proxy for a username and password.

In some token-based authentication setups, tokens are stored as keys in a database, with details about the corresponding user. In others, the token itself contains all of the information about the user, without the need for a server at all.

Tokens can also be set to expire after a short period of time to reduce the security risk if they're ever stolen.

## What is session-based authentication, and how is it different?

Before _token-based authentication_, a popular way to keep users logged in was _session-based authentication_.

With _session-based authentication_, a _token_ is still generated to represent the user. The server sets a cookie with the token, which gets sent on every subsequent request, just like with _token-based authentication_.

But instead of storing the _token_ and associated user info in a database or making it self-contained, the server maintains a session with all of the user details _in memory_.

Here's an oversimplified version using JavaScript.

```javascript
let sessions = {
	kfda987908123jlk: {
		username: 'merlin@wizardschool.com',
		display: 'Merlin',
		permissions: ['admin', 'registration', 'homework']
	},
	rew7812iouio3frx: {
		username: 'neville@wizardschool.com',
		display: 'Neville',
		permissions: ['registration', 'homework']
	}
};
```

This approach has a few major drawbacks.

For large applications with many users, keeping many sessions active in memory can have a big impact on server performance. Storing them in a database and accessing them only when needed can be far more performant.

Today, it's also very common to have pieces of an application spread across multiple servers, sometimes using third-party services. Because sessions are stored in server memory, _session-based authentication_ requires everything to run on that one server.

Token-based authentication also provides a way to update or refresh tokens with new ones for better security. Session tokens typically don't change until the user logs out, making them less secure and easier to spoof.

_Session-based authentication_ still exists, and is still a perfectly valid approach for smaller applications.

But today, _token-based authentication_ is the standard approach for handling authentication, and addresses many of the needs and challenges of modern web apps in a way that _session-based authentication_ cannot.