---
categories:
- Code
date: '2014-06-30'
url: /vanilla-javascript-version-of-jquery-extend/
title: Vanilla JavaScript version of jQuery.extend()
---

When writing [vanilla JavaScript plugins](https://gist.github.com/cferdinandi/ece94569aefcffa5f7fa), I often need to merge a set of user options into the plugin defaults to create the settings that ultimately get applied.

jQuery makes this really easy via their [`extend()` method](http://api.jquery.com/jquery.extend/). Fortunately, there's an easy way to do this with native JS, too!


## A native JS `extend()` function

The jQuery `$.extend()` API merges the content of subsequent objects into the first one, overriding it's original values. The method provided below returns a new object instead, preserving all of the original objects and their properties. Supported back to IE6.

```language-javascript
// Pass in the objects to merge as arguments.
// For a deep extend, set the first argument to `true`.
var extend = function () {

	// Variables
	var extended = {};
	var deep = false;
	var i = 0;
	var length = arguments.length;

	// Check if a deep merge
	if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
		deep = arguments[0];
		i++;
	}

	// Merge the object into the extended object
	var merge = function (obj) {
		for ( var prop in obj ) {
			if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
				// If deep merge and property is an object, merge properties
				if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
					extended[prop] = extend( true, extended[prop], obj[prop] );
				} else {
					extended[prop] = obj[prop];
				}
			}
		}
	};

	// Loop through each object and conduct a merge
	for ( ; i < length; i++ ) {
		var obj = arguments[i];
		merge(obj);
	}

	return extended;

};

// Example objects
var object1 = {
	apple: 0,
	banana: { weight: 52, price: 100 },
	cherry: 97
};
var object2 = {
	banana: { price: 200 },
	durian: 100
};
var object3 = {
	apple: 'yum',
	pie: 3.214,
	applePie: true
}

// Create a new object by combining two or more objects
var newObjectShallow = extend(object1, object2, object3);
var newObjectDeep = extend(true, object1, object2, object3);
```
