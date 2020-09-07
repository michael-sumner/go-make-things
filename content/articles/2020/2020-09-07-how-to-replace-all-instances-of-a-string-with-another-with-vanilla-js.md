---
title: "How to replace all instances of a string with another with vanilla JS"
date: 2020-09-07T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

On Friday, we looked at [how to use the `String.replace()` method to replace one string with another](/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/#replacing-multiple-strings).

One of the things we discussed was that the the `String.replace()` method only replaces the first instance of a string (unless you use a regex pattern, which is annoying).

```js
// Awkwardly worded, but roll with it
var wizards = 'Of all the wizards in Lord of the Rings, Radagast is my favorite of the wizards.';

// returns "Of all the sorcerers in Lord of the Rings, Radagast is my favorite of the wizards."
var sorcerers = wizards.replace('wizards', 'sorcerers');
```

Today, we're going to learn about an easy way to replace all instances of one string inside another.

Let's dig in.

## The `String.replaceAll()` method

The `String.replaceAll()` method works just like the `String.replace()` method, but it replaces all instances of a string instead of the first matching one.

```js
// Awkwardly worded, but roll with it
var wizards = 'Of all the wizards in Lord of the Rings, Radagast is my favorite of the wizards.';

// returns "Of all the sorcerers in Lord of the Rings, Radagast is my favorite of the sorcerers."
var sorcerers = wizards.replaceAll('wizards', 'sorcerers');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/NWNXoXv)

Like the `String.replace()` you can use it with a regex pattern (even though that's what we're trying to avoid here). If you do, you have to use the global (`g`) flag or it won't work.

## Browser Compatibility

Browser support for the `String.replaceAll()` method is... pretty spotty.

It works in Chrome and Edge 85, which is the brand new latest version as of August 2020. It also works in Firefox and Safari (both on macOS and iOS).

I'm seeing conflicting data about whether or not it works on the Android browser for mobile. It *doesn't* work in Firefox for mobile.

I wrote a little [polyfill to patch in support to unsupported browsers](https://vanillajstoolkit.com/polyfills/stringreplaceall/), since this one isn't on polyfill.io yet.