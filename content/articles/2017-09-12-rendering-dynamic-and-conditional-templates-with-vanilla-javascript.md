---
categories:
- Code
- JavaScript
date: '2017-09-12'
permalink: /rendering-dynamic-and-conditional-templates-with-vanilla-javascript/
title: Rendering dynamic and conditional templates with vanilla JavaScript
url: /2017/09/12/rendering-dynamic-and-conditional-templates-with-vanilla-javascript
---

This week, I'm sharing topics from my next [pocket guide](https://gomakethings.com): Vanilla JS Web Apps.

Yesterday, we looked at [how to render content with vanilla JavaScript](https://gomakethings.com/rendering-content-with-vanilla-javascript/). Today, let's look at how to render dynamic and conditional templates.

## Rendering a function instead of a string

If you missed it, here's the `render()` function we created yesterday.

```lang-js
var render = function (template, node) {
    if (!node) return;
    node.innerHTML = template;
};
```

The way it's currently set up, the `template` argument has to be a string.

If it also accepted a function that returned a string, we could set some conditional logic inside the function.

```lang-js
// A string
var templateString = '<h1>Hello world!</h1>';

// A function that returns a string
var templateFunction = function () {
	if (someData.page === 'about') {
		template = '<h1>About Us</h1>';
	} else {
		template = '<h1>Hello world!</h1>';
	}
	return template;
};
```

To support this, we'll change the `node.innerHTML = template` line in our function to check if the template is a string or a function, and if it's a function, run it.

```lang-js
var render = function (template, node) {
	if (!node) return;
	node.innerHTML = (typeof template === 'function' ? template() : template);
};
```

We're using a [ternary operator](https://gomakethings.com/ternary-operators/) here to check the template type and keep our code shorter.

Now we can use a string *or* function as our template.

```lang-js
render(templateString, document.querySelector('#main'));

// or...

render(templateFunction, document.querySelector('#main'));
```

[Here's a working demo.](https://jsfiddle.net/cferdinandi/ctmf0gzu/2/) Change the name of the `page` property to see it in action.

That's it for today. Tomorrow, we'll look at how to further manipulate our element after it's rendered.

If you've already purchased [the complete set of pocket guides](https://gomakethings.com/guides/complete-set/), you'll get "Vanilla JS Web Apps" as a free update when it comes out.

And if you haven't, now's the time to buy! The price will go up when the guide launches.