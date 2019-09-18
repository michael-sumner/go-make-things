---
categories:
- Accessibility
- Code
- JavaScript
date: '2016-08-09'
url: /keyboard-accessibility-improvements-with-javascript/
title: Keyboard accessibility improvements with JavaScript
---

This week I added an accessibility enhancement to [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll), my script for animating scrolling to anchor links, that provides a much better experience for keyboard users.

Today, I wanted to quickly share what I did, why, and how it works.

## It's all about focus.

On a typical webpage, if you click an anchor link and then press the "tab" key, you'll get taken to the next focusable element (usually a link or form input) after the anchored element that you've jumped to.

```markup
<a href="#somewhere">Jump down the page</a>
<a href="http://somewhere-else.com">Somewhere else</a>
<div id="somewhere">
	Words and stuff.
	<!-- This link will have focus -->
	<a href="http://one-more-place.com">One more place</a>
</div>
```

Smooth Scroll prevents the default browser behavior, resulting in something like this:

```markup
<a href="#somewhere">Jump down the page</a>
<!-- This link will have focus -->
<a href="http://somewhere-else.com">Somewhere else</a>
<div id="somewhere">
	Words and stuff.
	<a href="http://one-more-place.com">One more place</a>
</div>
```

To fix this, I used the `elem.focus()` method to push focus to the anchored element.

## There's just one problem.

The `elem.focus()` method can only push focus to elements that can normally be tabbed to with a keyboard, and that doesn't include divs, paragraphs, and most other things you'd throw an `id` on.

Fortunately, there's a workaround.

Adding `tabindex="-1"` to an element makes it focusable with JavaScript, but doesn't add it to the normal set of things you can reach with a keyboard (which is good). However, you don't want to set an element's `tabindex` to `-1` if it can already take focus the normal way, since that would pull it out of the keyboard nav flow.

Here's what I ended up doing:

```javascript
// Try to add focus
anchorElem.focus();

// Check if the currently focused element has the same ID as the anchored element we scrolled to
if ( document.activeElement.id !== anchorElem.id ) {
	// If not, give the anchored element a tabindex of -1 and set focus again
	anchorElem.setAttribute( 'tabindex', '-1' );
	anchorElem.focus();
	anchorElem.style.outline = 'none';
}
```

After I set focus, I'm using the `document.activeElement` method to find out which element currently has focus.

If that element's `id` is the same as the anchored element we were scrolling to, we're all good. If it's not, I give a negative `tabindex` and set focus again. I also remove the outline that normally happens when an element is in focus, since this is not something you need a visual indicator of with a keyboard.