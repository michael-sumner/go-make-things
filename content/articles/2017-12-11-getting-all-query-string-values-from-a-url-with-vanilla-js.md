---
categories:
- Code
- JavaScript
date: '2017-12-11'
permalink: /getting-all-query-string-values-from-a-url-with-vanilla-js/
title: Getting all query string values from a URL with vanilla JavaScript
url: /2017/12/11/getting-all-query-string-values-from-a-url-with-vanilla-js
---

A few years ago, I shared a method for [getting the value of a query string from a URL](/how-to-get-the-value-of-a-querystring-with-native-javascript/).

I recently learned of a technique you can use to get all query string parameters and push them into an object of key/value pairs, [courtesy of CSS Tricks](https://css-tricks.com/snippets/javascript/get-url-variables/).

```lang-js
/**
 * Get the URL parameters
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};
```

You'd use it like this.

```lang-js
// Get parameters from the current URL
getParams(window.location.href);

// Get parameters from a URL string
var url = 'https://gomakethings.com?sandwhich=chicken%20salad&bread=wheat';
getParams(url);
```

## How it works

First, we set up an object to push our parameters into.

```lang-js
var params = {};
```

We need to get the query string portion of our URL. To do that, we create a link, assign our URL as it's `href` value, and then grab the `search` portion (ie. the query string) of the URL.

```lang-js
var parser = document.createElement('a');
parser.href = url;
var query = parser.search.substring(1);
```

Next, we split our string into an array, using the `&` symbol as our delimiter. Each item in the array will be a separate key/value pair.

```lang-js
var vars = query.split('&');
```

Then, we'll loop through each item, splitting it into another array at the `=` symbol. The first item in our array is the key. The second is the value.

We'll run our value through `decodeURIComponent()` to get a proper string, and push the key and value to our `params` object.

```lang-js
for (var i=0; i < vars.length; i++) {
	var pair = vars[i].split('=');
	params[pair[0]] = decodeURIComponent(pair[1]);
}
```

Finally, we'll return the object of key/value pairs.

```lang-js
return params;
```

## Browser Compatibility

This works in all modern browsers, and back to at least IE6.