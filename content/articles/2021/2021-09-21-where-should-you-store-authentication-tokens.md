---
title: "Where should you store authentication tokens?"
date: 2021-09-21T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

_This is an excerpt from [my brand new pocket guide and video course on Token-Based Authentication](https://vanillajsguides.com/token-based-authentication/). It’s part of a [new Expert Bundle](https://vanillajsguides.com/expert-bundle/) that also includes courses on State-Based UI and Serverless (available now!)._

Yesterday, we looked at [terminology around token-based authentication](/token-based-authentication-terminology/). Today, I want to discuss where to store authentication tokens and how to keep them safe.

**Quick note:** in yesterday's article, I accidentally mixed up the terms _authentication_ and _authorization_ (repeatedly). The article on my site has been updated to correct this. Thanks to everyone who pointed it out!

## Authentication Token Vulnerabilities

Authentication tokens can provide more security than permanent credentials like a username and password. But if a token is stolen, it can be used to access another user's account.

There are two types of attacks that can result in stolen authentication tokens:

- In a **cross-site scripting (XSS)** attack, malicious JavaScript is injected into your site and run. This code can do things like grab authentication tokens from localStorage or cookies or send them to a third-party.
- In a **cross-site request forgery (CSRF)** attack, an HTTP request is sent to your site from a third-party site (often by submitting a hidden form on a malicious site). If the user is logged into your site already, their authentication cookies will be automatically sent, initiating an action on their behalf without their knowledge.

There a _lot_ of debate about whether authentication tokens should be saved in `localStorage` or cookies to reduce these risks.

## Where should you store authentication tokens?

Tokens stored in `localStorage` are automatically protected from CSRF attacks, because `localStorage` items are not automatically sent to servers with each HTTP request. But they are vulnerable to XSS attacks, where they can be easily accessed by JavaScript.

```javascript
localStorage.setItem('token', 'abcd1234');
```

Cookies can be set with an `httponly` flag. This blocks JavaScript from accessing the cookie, protecting it from a XSS attack. It will still be automatically sent with each HTTP request, so it's still vulnerable to CSRF attacks.

Many articles suggest that a cookie set with the `httponly` flag is the more secure option, because while the token can be used, it's never exposed.

```javascript
document.cookie = 'token=abcd1234; secure; httponly;';
```

However, JavaScript _cannot be used_ to set a cookie with the `httponly` flag, either. The cookie can only be set by a server. If your app is entirely client-side, and you store your token with JavaScript, you can't use this flag. In that case, a cookie is just as vulnerable to XSS attacks as `localStorage`.

## So, which one should you use?

- For client-side only apps, `localStorage` may actually be _more_ secure, since it's not vulnerable to CSRF attacks.
- If you can get and set your token with server-side code, a cookie with the `httponly` flag is probably be the better choice.