---
categories:
- Code
- JavaScript
date: '2017-11-28'
url: /converting-a-string-to-title-case-with-vanilla-javascript/
title: Converting a string to title case with vanilla JavaScript
---

Yesterday we looked at [how to convert strings to uppercase and lowercase](/converting-strings-to-uppercase-and-lowercase-with-vanilla-javascript/) with vanilla JavaScript. Today, let's look at how to convert them to title case (the first letter of every word capitalized).

There's no native method for this, but we can combine a few methods into a helper function to title case strings.

1. First, we'll convert our entire string to lowercase.
2. Next, we'll split the string into an array of words using ` ` as the delimiter.
3. Then, we'll loop through each word in our array.
4. After that, we'll capitalize the first letter, and lowercase the rest of the string.
4. Finally, we'll combine all of the words back together into a string.

```javascript
// https://gist.github.com/SonyaMoisset/aa79f51d78b39639430661c03d9b1058#file-title-case-a-sentence-for-loop-wc-js
var toTitleCase = function (str) {
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
};
```

And we'd use it like this.

```js
var str = 'HeRe is a MIXED capitalization StRiNg.';

// returns: "Here Is A Mixed Capitalization String."
var str = toTitleCase(str);
```