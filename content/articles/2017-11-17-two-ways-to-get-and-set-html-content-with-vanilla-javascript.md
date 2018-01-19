---
categories:
- Code
- JavaScript
date: '2017-11-17'
title: Two ways to get and set HTML content with vanilla JavaScript
---

Vanilla JavaScript provides two really easy ways to get and set content in the DOM&mdash;one to manipulate markup, and the other just for text.

## Manipulating HTML

You can use the `innerHTML` to get and set HTML content in an element.

```javascript
var elem = document.querySelector('#some-elem');

// Get HTML content
var html = elem.innerHTML;

// Set HTML content
elem.innerHTML = 'We can dynamically change the HTML. We can even include HTML elements like <a href="#">this link</a>.';
```

If you want to add HTML after what's already in an element instead of replacing it entirely you can use `+=`.

```js
// Add HTML to the end of an element's existing content
elem.innerHTML += ' Add this after what is already there.';
```

And you can add HTML *before* what's already in an element by adding `+ elem.innerHTML` to the end.

```js
// Add HTML to the beginning of an element's existing content
elem.innerHTML = 'We can add this to the beginning. ' + elem.innerHTML;
```

## Manipulating just text content

The `innerHTML` property works great, but what if you just want to get or set content without the markup?

For that, there's `textContent`. It works just like `innerHTML`, but only gets content, and will ignore HTML tags.

```javascript
var elem = document.querySelector('#some-elem');

// Get text content
var text = elem.textContent;

// Set text content
elem.textContent = 'We can dynamically change the content.';

// Add text to the end of an element's existing content
elem.textContent += ' Add this after what is already there.';

// Add text to the beginning of an element's existing content
elem.textContent = 'We can add this to the beginning. ' + elem.textContent;
```

## Browser Compatibility

Both `innerHTML` and `textContent` work in all modern browsers, and IE9 and up.