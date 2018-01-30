---
title: "Decoding HTML entities with vanilla JavaScript"
date: 2018-01-30T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- HTML
---

Over the weekend, I finished up the site for [my vanilla JavaScript mini courses](https://gomakethings.com/courses/). People who've purchased courses will be able to log in and watch the videos on any device with an internet connection.

The text for each video is sent along as an encoded string in JSON. That means that this:

```html
<p>In this course, you'll learn:</p>
```

Comes through like this:

```html
&lt;p&gt;In this course, you&amp;rsquo;ll learn:&lt;/p&gt;
```

To display this, I need to decode the string back into real HTML.

How? Here's a simple helper function to do just that, courtesy of [Rob Wu on StackOverflow](https://stackoverflow.com/a/7394787/1293256).

```js
var decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

// Example
// Returns "<p>In this course, you'll learn:</p>"
var decoded = decodeHTML('&lt;p&gt;In this course, you&amp;rsquo;ll learn:&lt;/p&gt;');
```

It works by creating a `<textarea>` element and injecting your encoded HTML into it. The browser automatically converts that back into proper HTML. You can then grab the `value` from the `<textarea>`, and like magic, you have decided HTML.