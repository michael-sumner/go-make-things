---
title: "You should always attach your vanilla JS click events to the window"
date: 2018-08-15T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- JavaScript
---

*__IMPORTANT:__ The title of this article is wrong. After some additional testing, the article has been updated below to reflect that.*

I almost always use [event delegation](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/) for my JavaScript event listeners. It's better for performance, and gives you a bit more flexibility.

I often get asked about whether you should attach your events to the `document` or `window` when using this approach. [For a long time](/document-vs-window-in-javascript/), I advocated [attaching to the `document`](/should-you-attach-your-event-to-the-window-or-document-when-using-event-delegation/) unless the event absolutely *needs* to be attached to the `window`.

> I personally choose the option that’s closest to the elements I care about and still works.
>
> That’s usually the `document`, but certain events, like `scroll` and `resize`, only happen on the `window`, so you have to listen to the `window` instead.

**I was wrong.**

## A bug in Firefox

[Twitter user Dror T shared with me this week...](https://twitter.com/dror3go/status/1029347428791672832)

> Hey - noticed you have a habit to attach the "click" event on the document - please note that in @firefox this event will capture any mouse click event (left, right, wheel), which causes issues.

Here's what's going on.

Every single major browser only fires `click` events on the `document` for left clicks and taps. Right clicks, middle clicks, and mouse wheel clicks are ignored.

**Except in Firefox.**

[Here's a demo you can play with to see it in action.](https://codepen.io/cferdinandi/pen/ejaVza)

<p data-height="265" data-theme-id="light" data-slug-hash="ejaVza" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="Click Event Delegation on the Document" class="codepen"></p>

There are [bug reports for this from 18 years ago](https://bugzilla.mozilla.org/show_bug.cgi?id=71705) (supposedly fixed 10 years ago).

Some have argued that this is "to spec." A `click` doesn't have to inherently mean "left click." However, I don't think that's how most developers think about it, and it's certainly not how browser makers have thought about it, either.

There's also special events specifically for detecting right clicks and mouse wheel clicks: `contextmenu` and `auxclick`, respectively.

```js
document.addEventListener('contextmenu', function (event) {
	alert('A right click happened!');
}, false);
```

Firefox even seems to have recognized the error of their ways. From [the MDN event reference page](https://developer.mozilla.org/en-US/docs/Web/Events#Most_Common_Categories) (emphasis mine):

> A pointing device button **(ANY button; soon to be primary button only)** has been pressed and released on an element.

## What should you do about it?

Whether or not this is a bug (it is), and even though Firefox will be changing this behavior (at some point, maybe? It's been 18 years!), we still need to address it.

Users don't and shouldn't have to care about browser quirks. That's on us as developers.

There's one simple change you can make to make this issue go away: ~~attach to the `window`, always.~~ attach your events to `document.documentElement`.

The right click issue doesn't happen in Firefox when you attach your `click` events to it instead of the `document`. [Here's another demo.](https://codepen.io/cferdinandi/pen/bjyLvm)

<p data-height="265" data-theme-id="light" data-slug-hash="bjyLvm" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="Click Event Delegation on the Window" class="codepen"></p>

Alternatively, you can also continue to attach your `click` event to the `document` or `window` and filter out clicks that aren't on the left mouse button.

```js
document.addEventListener('click', function (event) {

	// Don't run if right-click
	if (event.button !== 0) return;

	// Otherwise, do your thing!

});
```

[Here's a demo of that approach for you to try.](https://codepen.io/cferdinandi/pen/KBLGzG)

<p data-height="265" data-theme-id="light" data-slug-hash="KBLGzG" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="Click event delegation filtering out everything but left clicks" class="codepen"></p>