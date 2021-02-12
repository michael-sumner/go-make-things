---
title: "How to set and get cookies with vanilla JS"
date: 2021-02-12T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

If you're not familiar with the term, a _cookie_ is a way to store information about your browser session, and persist that data over a period of time.

Before cookies were created, websites had no idea who you were from one page view to the next. Compared to the pervasive tracking of today, that sounds like a dream come true.

But it also meant that websites had no way to log you and keep you logged in, or remember preferences from one page to the next.

While [technology like `localStorage` and `sessionStorage`](https://vanillajstoolkit.com/reference/browser-storage/localstorage/) provide a much nicer way to store data locally, cookies still have their place.

Today, we're going to take a quick look at how to set and get cookies in the browser.

## Setting a cookie

You can use the `document.cookie` property to set a cookie.

The value is a string, using a `{KEY}={VALUE};` format. Cookies can only contain string values.

```js
// Set a cookie named sandwich, with a value of turkey
document.cookie = 'sandwich=turkey;';
```

Cookies can also include several optional settings, most using a `key=value` format, separated by a semicolon (`;`).

- **`path={path}`** - The path to set the cookie at. Defaults to the current path. It might be a good idea to set this to the root path: `path=/`.
- **`domain={domain}`** - The domain for the cookie. Defaults to the current host name.
- **`max-age={max age in seconds}`** - The maximum amount of time to keep the cookie, in seconds.
- **`expires={date in GMT form}`**` - A date on which to expire the cookie.
- **`secure`** - The cookie can only be transmitted over HTTPS.
- **`same-site={lax|strict|none}`** - Whether or not the browser can send the cookie to other sites. The default, `lax`, only sends with same-site requests and navigation `GET` requests; `strict` does not send to any external sites, even when following a link; and `none` does not place any restrictions.

```js
// expires in two weeks: 60 seconds x 60 minutes x 24 hours x 14 days
// we'll look at the math behind this in the next section
document.cookie = `snack=chips; path=/; max-age=${60 * 60 * 24 * 14};`;
```

If you do not set either a `max-age` or `expires` value, cookies can potentially remain in the browser indefinitely. As a best practice, you should generally always set one of the two values.

## Getting a cookie value

All of the cookies for a site are stored as a single string, which makes getting the value of one of them a bit tedious.

```js
// logs a single string with all of the cookies for a site
console.log(document.cookie);
```

[The `getCookie()` helper method](https://vanillajstoolkit.com/helpers/getcookie/) makes this easier.

```js
/**
 * Get the value of a cookie
 * Source: https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
 * @param  {String} name  The name of the cookie
 * @return {String}       The cookie value
 */
function getCookie (name) {
	let value = `; ${document.cookie}`;
	let parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}
```

Pass in the name of the cookie you want to get the value for.

```js
let sandwich = getCookie('sandwich');
let snack = getCookie('snack');
```

## Deleting Cookies

To delete a cookie, you need to set it's `max-age` to `0`, or the `expires` date to the current time or sooner.

Be sure that the `path` matches the one used to set the cookie, or it will not work.

```js
// Delete the cookie
document.cookie = `sandwich=turkey; path=/; max-age=0;`;
```

## Cookie storage limits

Browsers provide differing levels of storage space for cookies, but the general upper limit is 4093 bytes (just over 4kb).

For browsers with a maximum storage limit, this amount is a total for all cookies on your site. Accordingly, you should try to reduce the overall footprint of your data as much as possible.