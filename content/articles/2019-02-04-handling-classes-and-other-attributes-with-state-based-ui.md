---
title: "Handling classes and other attributes with state-based UI"
date: 2019-02-04T10:30:00-05:00
draft: false
categories:
- Code
- Design and UX
- HTML
- JavaScript
---

Last week, we looked at [how to create state-based UIs with vanilla JS](/state-based-ui-with-vanilla-js/).

I received a few questions about the approach, including how to handle things like classes and other attributes. Today, let's look at how to handle that.

*__By the way...__ If you're wondering why I've been writing about this over the last few days, I'm wrapping up a complete rewrite of my [Web Apps pocket guide](https://vanillajsguides.com/web-apps/). I'll be recording the videos for it as soon as it's done.*

## The challenge with attributes

You might normally toggle a class or data attribute on an element using `classList` or `setAttribute()`.

With a state-based UI, if you do that and then update your data, the changes you made that way will get wiped out when the UI refreshes.

Every aspect of the UI is based on something in your data state. If an element should have a particular class or ID, you need to somehow reflect that in your data.

## An example

Let's look at a todo list app for a moment.

Imagine that you want completed items to have a `.completed` class on them so that you can style them with a strikethrough. Your `data` object might look like this.

```js
var data = {
	todos: [
		{
			item: 'Buy a new wand at Ollivanders'
			completed: false
		},
		{
			item: 'Send an owl to Ron',
			completed: true
		}
	]
};
```

In your `template`, you would do something like this.

```js
var template = function () {
	if (data.todos.length < 1) return '<p>You do not have any todos yet. Create your first one.</p>';

	return '<ul>' + data.todos.map(function (todo) {
		var completed = '';
		if (todo.completed) {
			completed = ' class="checked"';
		}
		return '<li' + completed + '>' + todo + '</li>';
	}).join('') + '</ul>';
};
```

And the completed markup would look like this.

```html
<ul>
	<li>Buy a new wand at Ollivanders</li>
	<li class="completed">Send an owl to Ron</li>
</ul>
```