---
title: How to control the HTTP method forms use
date: 2022-12-29T10:30:00-04:00
draft: false
categories:
- Code
- HTML
---

Last week, I wrote an article about [progressively enhancing HTML forms with JavaScript](/more-html-less-javascript/). In the article, I originally wrote (now corrected)...

> But by default, forms send a `POST` request

This was wrong. By default, forms send a `GET` request to whatever URL is included as the value of the `action` attribute, or the current URL if none is provided. 

**You can modify this default behavior with the `method` attribute.**

Whatever HTTP method you include as its value will be used instead. For example, his form will be sent with the `POST` method instead of `GET`.

```html
<form action="path/to/the/endpoint.php" method="POST">
	<label for="email">Enter your email</label>
	<input type="email" id="email" name="email">
	<button>Subscribe</button>
</form>
```