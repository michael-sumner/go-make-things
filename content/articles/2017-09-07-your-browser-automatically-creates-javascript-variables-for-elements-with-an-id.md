---
categories:
- Code
- JavaScript
date: '2017-09-07'
permalink: /your-browser-automatically-creates-javascript-variables-for-elements-with-an-id/
title: Your browser automatically creates JavaScript variables for elements with an ID
url: /2017/09/07/your-browser-automatically-creates-javascript-variables-for-elements-with-an-id
---

One of my readers tipped me off to a really cool trick: your browser automatically creates JavaScript variables for any element with a unique ID.

It's part of an obscure feature in the HTML5 spec called "[Named access on the `Window` object](https://html.spec.whatwg.org/#named-access-on-the-window-object)."

## How it works

```lang-html
<div id="example">Here's an example. Open up developer tools and try it yourself.</div>
```

```lang-js
// Automatically logs `<div id="example">`
console.log(example);
```

<div id="example" markdown="1">*Here's an example. Open up developers tools and try it yourself.*</div>

That's great for element's with one-word and camel-case IDs, but what about something like this?

```lang-html
<div id="another-example">Here's another example. Will it work?</div>
```

<div id="another-example" markdown="1">*Here's another example. Will it work?*</div>

You can't just call `another-example` in the console, because that's not a valid JavaScript variable. You'll get this.

```lang-js
console.log(another-example);
// Uncaught ReferenceError: another is not defined
```

Turns out, [the browser attaches these to the `window`](https://dev.to/buntine/dom-elements-with-ids-are-global-variables), and you can reference them as a property.

```lang-js
// Logs `<div id="another-example">`
console.log(window['another-example']);
```

## When should you use this?

Never, ever, ever, ever in your actual code base.

This is great for doing quick debugging without having to use `querySelector()` to look things up, but you should never rely on it in production code. It's too easy to overwrite these.