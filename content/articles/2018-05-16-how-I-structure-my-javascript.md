---
title: "How I structure my JavaScript plugins"
date: 2018-05-16T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

One of the most common questions I get asked by my [pocket guide](https://vanillajsguides.com) and [Vanilla JS Academy](https://vanillajsacademy.com) students is how to best structure code.

There's no one right answer here, but today I wanted to share how I structure most of my scripts and plugins.

My code is usually broken into three sections:

1. Variables
2. Methods
3. Initializations and Event Listeners

I literally add these labels to my code, putting my variables up at the top, my methods in the middle, and then any initializations and such down at the bottom.

Here's an example.

```js
var myCoolPlugin = function (name) {

	//
	// Variables
	//

	var someVar = 'thing 1';
	var someOtherVar = 123;
	var isTrue = false;


	//
	// Methods
	//

	/**
	 * Log any numbers that are passed in to the console
	 */
	var runTheNumbers = function () {
		arguments.forEach(function (number) {
			console.log(number);
		});
	};

	/**
	 * Say hi to someone
	 * @param  {String} name The person's name
	 */
	var sayHi = function (name) {
		alert('Hello, ' + name + '!');
	};


	//
	// Inits & Event Listeners
	//

	// Log some numbers on initialization
	runTheNumbers(1, 2, 3, 4, 5);

	// Say hi to the user when a button is clicked
	document.addEventListener('click', function (event) {
		if (event.target.matches('.say-hi')) {
			sayHi(event.target.getAttribute('data-name'));
		}
	}, false);

};
```

I use this structure in both plugins, and in bigger methods inside my plugins.

The consistency makes it easier for me to look at code I've written and get a sense for what's going on, even if I haven't looked at it in a while.