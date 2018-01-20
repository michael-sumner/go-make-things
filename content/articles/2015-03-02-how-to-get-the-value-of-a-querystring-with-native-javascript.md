---
categories:
- Code
- JavaScript
date: '2015-03-02'
permalink: /how-to-get-the-value-of-a-querystring-with-native-javascript/
title: How to get the value of a query string with native JavaScript
url: /2015/03/02/how-to-get-the-value-of-a-querystring-with-native-javascript
---

Here's a simple method you can use to get the value of a querystring with native JavaScript:

```javascript
/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
var getQueryString = function ( field, url ) {
	var href = url ? url : window.location.href;
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	var string = reg.exec(href);
	return string ? string[1] : null;
};
```

<!--more-->

Let's say your URL is `http://example.com&this=chicken&that=sandwich`. You want to get the value of `this`, `that`, and `another`.

```javascript
var thisOne = getQueryString('this'); // returns 'chicken'
var thatOne = getQueryString('that'); // returns 'sandwich'
var anotherOne = getQueryString('another'); // returns null
```

If you want to use a URL other than the one in the `window`, you can pass one in as a second argument.

```javascript
var yetAnotherOne = getQueryString('example', 'http://another-example.com&example=something'); // returns 'something'
```