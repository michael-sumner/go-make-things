---
title: "Adding more structure to your JavaScript projects"
date: 2018-10-09T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

When you write a lot of code, and manage a lot of projects, having a consistent structure to your code is really important.

It makes your code easier to read, for both you and others jumping into the project later. It also lets you come back to your code months or years later and more easily start working with code you haven't seen in a while. Everything feels familiar.

Today, let's look at a simple pattern you can use to add more structure to your JS projects.

## A simple pattern

All of my plugins, scripts, and functions follow the same general pattern:

1. Variables
2. Methods
3. Inits and Event Listeners

First, I list or setup any variables related to the plugin. Then I include all of my functions and methods. Then, at the end, I run any initializations or functions, and setup my event listeners.

## An example

Here's an example using a revealing module pattern.

```js
var myPlugin = (function () {

    'use strict';

    //
    // Variables
    //

    var app = document.querySelector('#app');
    var someOtherVar = 'abc';
    var num = 123;
    var timer;


    //
    // Methods
    //

    var add = function () {
        total = 0;
        for (var i = 0; i < arguments.length; i++) {
            total += arguments[i];
        }
        return total;
    };

    var subtract = function () {
        if (arguments.length < 1) return 0;
        total = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            total = total - arguments[i];
        }
        return total;
    };

    var sayHi = function (event) {
        event.preventDefault();
        alert('Hi!');
    };


    //
    // Inits & Event Listeners
    //

    timer = 0;
    add(1, 2, 3);

    document.addEventListener('click', sayHi, false);

})();
```

## It works *inside* functions, too

I also use this approach inside functions, to give them a structure that mirrors the script or plugin they're part of.

```js
var toggleAccordion = function (toggle) {

	// Variables
	var activeToggle = document.querySelector('.accordion-toggle.active');
	var activeContent = document.querySelector('.accordion-content.active');
	var content = document.querySelector(toggle.hash);
	if (!content) return;

	// Hide active content
	activeToggle.classList.remove('active');
	activeContent.classList.remove('active');

	// Show new content
	toggle.classList.add('active');
	content.classList.add('active');

};
```