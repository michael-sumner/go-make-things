---
title: "How to access and use data attributes in your CSS"
date: 2018-03-15T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
---

I use data attributes all the time in my JavaScript. But did you know that you can also use them in your CSS?

Today, I'm going to show you how to target them as selectors, and (way more cool) access their values and do things with them.

## Targeting data attributes with CSS

You use `#` for IDs (`#main`), and `.` for classes (`.click-me`).

But you can also target data attributes by wrapping them in square brackets (`[]`).

```css
[data-some-component] {
	font-weight: bold;
	font-size: 1.2em;
}
```

[Here's a demo.](https://jsfiddle.net/cferdinandi/5sb6500e/1/)

For a use case like that, you're better served with a class, but sometimes it's helpful to be able to scope selectors by only elements with a specific data attribute.

*__Note:__ This can be used for all sorts of other attributes, too, like `title`, `src`, `alt` and more. I'll cover that in another article.*

A more powerful use, though, is accessing the actual content of a data attribute.

## Getting a data attribute's value in CSS

You can access the content of a data attribute with the `attr()` CSS function. In every major browser, it's use is limited to the `content` property.

For example, let's say you wanted to add some content dynamically to a component based on a data attribute value. You could do this.

```html
<div data-content="Some content goes here."></div>
```

And in your CSS, you do this.

```css
[data-content]:before {
	content: attr(data-content);
}
```

[Here's a demo of it in action.](https://jsfiddle.net/cferdinandi/bamyq6hm/)

With this example, that content is better served in the markup itself. But when you *need* to use the `content` property and want dynamic content, this is a cool way to do it.

A quick accessibility note: some screenreader/browser combos do not read text rendered with `content`, so critical content should always go in the markup.

## Browser Compatibility

Both attribute selectors and the `attr()` function work in all major browsers. Attribute selectors also work back to IE7, while the `attr()` function works  in IE8 and up.