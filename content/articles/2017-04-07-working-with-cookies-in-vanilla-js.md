---
categories:
- Code
- JavaScript
date: '2017-04-07'
url: /working-with-cookies-in-vanilla-js/
title: Working with cookies in vanilla JS
---

Setting a cookie in JavaScript is relatively straightforward:

```javascript
document.cookie = 'sandwich=turkey; expires=Fri, 31 Dec 2024 23:59:59 GMT;
```

But what if you want to do save a more complex cookie value? Or retrieve the value of the cookie? For those tasks, you need to use regex patterns. And those are, frankly, a pain in the ass.

Fortunately, there are a couple of simple helper libraries we can use to make working with cookies easier.

## If you only need to retrieve cookie values

For that, you only need this [super lightweight `getCookie()` helper method](https://gist.github.com/wpsmith/6cf23551dd140fb72ae7):

```javascript
var getCookie = function (name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
};

// Example
var cookieVal = getCookie( 'sandwich' ); // returns "turkey"
```

## If you want to do more complex cookie manipulation

The Mozilla Developer Network provides a [simple cookie library](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework)---`docCookies`---that you can use to get, set, and remove cookies.

After you include it on your site, it's let you do things like this:

```javascript
// Set a cookie
docCookies.setItem( 'sandwich', 'turkey with tomato and mayo', new Date(2020, 5, 12) );

// Get a cookie
var cookieVal = docCookies.getItem('sandwich');

// Remove a coookie
docCookies.removeItem( 'sandwich' );
```

It's a bit larger in size than `getCookie()`, but much more robust if you need to do more than just the basics.