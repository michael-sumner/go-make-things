---
categories:
- Code
- JavaScript
date: '2017-05-29'
permalink: /email-validation-in-javascript/
title: Email validation in JavaScript
url: /2017/05/29/email-validation-in-javascript
---

I'm working on a series of article on JavaScript form validation, and one of the more hotly debated things is how best to validate email addresses.

A lot of regex patterns you'll see shared online end up throwing errors on valid email addresses. The better articles recommend you use one that follows [RFC822](https://www.cs.tut.fi/~jkorpela/rfc/822addr.html), the standard for email address formats.

I found [this awesome snippet from Richard Willis](https://gist.github.com/badsyntax/719800) in my travels.

```lang-javascript
var isEmail = function (email){
	return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );
};

// Example
isEmail('chris'); // false
isEmail('some@email.com'); // true
```

The *only* snag with this is that, per the spec, email addresses without a TLD are also valid. For example, `chris@localhost` is a valid email. Why? Because email addresses on a local server are valid.

I created a slightly modified version that will also check for a TLD (`.com`, `.co.uk`, etc.) if you need to ensure it's a publicly accessible email address.

***Note:*** *Reader [Tom Thorgood](https://tomthorogood.co.uk/) pointed out that the original version of this excluded newer TLD's like `.email`. I've updated it accordingly. Thanks Tom!*

```lang-javascript
var isEmailWithTLD = function (email){
	return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/.test(email);
};

// Example
isEmailWithTLD('some@example'); // false
isEmailWithTLD('some@example.com'); // true
```

You can [grab both of these on GitHub](https://gist.github.com/cferdinandi/d04aad4ce064b8da3edf21e26f8944c4).