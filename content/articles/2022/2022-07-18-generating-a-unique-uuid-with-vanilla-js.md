---
title: Generating a UUID (Universally Unique Identifier) with vanilla JS
date: 2022-07-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to quick show you how to generate a UUID (University Unique Identifier) using the vanilla JS `crypto.randomUUID()` method.

There's really not much to show. You run it, and it generates a unique ID.

```js
// returns something like this: 
// "f116fb21-79f2-4ec0-8a81-85b5837ea0f3"
let id = crypto.randomUUID();
```

Because it's a cryptographically secure identifier, it requires an SSL certificate to run. However, exceptions are made for `localhost://` and `file://` for testing.