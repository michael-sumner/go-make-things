---
categories:
- Code
- CSS
- JavaScript
date: '2017-08-23'
permalink: /two-ways-to-set-an-elements-css-with-vanilla-javascript/
title: Two ways to set an element&#8217;s CSS with vanilla JavaScript
url: /2017/08/23/two-ways-to-set-an-elements-css-with-vanilla-javascript
---

Yesterday, we looked at [how to get an element's CSS attributes with vanilla JavaScript](https://gomakethings.com/getting-an-elements-css-attributes-with-vanilla-javascript/). One thing I neglected to mention: `getComputedStyle()` can only be used to get values, not set them.

Today, let's look at how to set CSS with vanilla JS.

## Approach 1: Inline Styles

The easiest way to set an element's style with JavaScript is using the `style` property.

JavaScript uses camel case instead of a dash for property names (you can [view a full list of properties on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference)), but it's pretty straightforward otherwise:

```lang-javascript
var elem = document.querySelector('#some-element');

// Set color to purple
elem.style.color = 'purple';

// Set the background color to a light gray
elem.style.backgroundColor = '#e5e5e5';

// Set the height to 150px
elem.style.height = '150px';
```

The `style` property adds styles inline on the element.

```lang-markup
<div id="some-element" style="color: purple; background-color: #e5e5e5; height: 150px;">
    Hello, world!
</div>
```

This can make your markup pretty messy, though. It's also less performant for browsers to render.

## Approach 2: Adding Global Styles

An alternate approach is to inject a `<style>` element with your CSS properties into the DOM. This is useful when setting styles that should apply to a set of elements instead of just a single one.

First, we'll create a style element.

```lang-javascript
var style = document.createElement('style');
```

Next, we'll add our styles by giving the `style` an `innerHTML`.

```lang-javascript
var style = document.createElement('style');
style.innerHTML =
	'.some-element {' +
		'color: purple;' +
		'background-color: #e5e5e5;' +
		'height: 150px;' +
	'}';
```

Finally, we'll inject the styles into the DOM. To do this, we'll grab the first `script` tag we find in the DOM and use `insertBefore()` to add our `style` tag before it.

```lang-javascript
// Create our stylesheet
var style = document.createElement('style');
style.innerHTML =
	'.some-element {' +
		'color: purple;' +
		'background-color: #e5e5e5;' +
		'height: 150px;' +
	'}';

// Get the first script tag
var ref = document.querySelector('script');

// Insert our new styles before the first script tag
ref.parentNode.insertBefore(style, ref);
```

## So, which approach should you use?

I use a mix of both.

Inline styles are useful when you need to set item-specific styles.

For example, I have a script that [normalizes the height of elements](https://github.com/cferdinandi/right-height) that are next to each other. I use `style` to set the height directly to each element.

If a style applies to a class of elements, though? I'll inject a `style` tag for better performance and reusability.