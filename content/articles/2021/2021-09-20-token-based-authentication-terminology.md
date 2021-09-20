---
title: "Token-based authentication terminology"
date: 2021-09-20T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

_This is an excerpt from my [brand new pocket guide and video course on Token-Based Authentication](https://vanillajsguides.com/token-based-authentication/). It's part of [a new Expert Bundle](https://vanillajsguides.com/expert-bundle/) that also includes courses on State-Based UI and Serverless (coming this week)._

There are numerous terms (and in some cases, buzzwords) used with token-based authentication. Let's demystify them.

## Authorization, Authentication, and Identity

_Authorization_, _authentication_, and _identity_ are related to each other, so we'll be looking at them together.

- **Authentication** is this process of confirming that you are who you say you are. This typically involves providing credentials like a username and password.
- **Authorization** is the process of verifying whether or not you have access to something. The token you get back from the _authentication_ step is typically used for _authorization_ on subsequent API requests.
- **Identity** is information about you, such as your username, email address, or first and last name.

The _authentication_ process returns a token that you use for _authorization_.

Depending on the type of token-based authentication provider you're using, that token (or a second one) may also include _identity_ information.

## JSON Web Tokens

_JSON Web Tokens_ are more commonly referred to as _JWTs_ and pronounced "jot" or "jots" (I have no idea why!).

The tokens returned by the _authentication_ process are often cryptographically-random strings that need to be validated by the third-party that issued them. A _JWT_ is a special kind of token that is self-verifying and contains _identity_ information.

A _JWT_ is compromised of three parts, each separated by a dot (`.`).

- **Header.** The part before the first dot is information about algorithm and token type.
- **Payload.** Data such as the user _identity_ and the permissions they have (often called _claims_).
- **Signature.** A bit of data a server can use to verify that the JWT is valid and has not been tampered with.

A _JWT_ typically looks a bit like this.

```
xxxxx.yyyyy.zzzzz
```

Because they contain a lot of information, the three parts are typically all Base64-URL encoded, resulting in something that looks like this.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

You can decode the _Payload_ part of a JWT and get back a data object with [a small vanilla JS helper function](https://vanillajstoolkit.com/helpers/parsejwt/).

```javascript
/**
 * Decode a JWT payload
 * https://stackoverflow.com/a/38552302
 * @param  {String} token The JWT
 * @return {Object}       The decoded payload
 */
function parseJWT (token) {
	let base64Url = token.split('.')[1];
	let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
	return JSON.parse(jsonPayload);
}
```

## OAuth, OpenID, and SAML

_OAuth_, _OpenID_, and _SAML_ are all _standards_ (guidelines for providing standardized ways of doing the same task) that define protocols for _authenticating_ and _authorizing_ users.

- **OAuth** is one of the most popular standards for _authenticating_ users. It defines the flows that are used in many token-based authentication processes.
- **OpenID** is an _identity_ standard built on top of _OAuth_. In addition to _authenticating_ a user, it returns a JWT that contains _identity_ information.
- **SAML** stands for _Security Assertion Markup Language_. It's an alternative to _OAuth_ that uses an XML-based standard instead of JWTs to handle _authentication_ and _identity_.

There are a handful of vendors, like auth0 and Okta, that provide token-based authentication and identity services. Most of them use a mix of OAuth, OpenID, and SAML, depending on the needs of the customer.