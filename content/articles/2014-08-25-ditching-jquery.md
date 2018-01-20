---
categories:
- Code
date: '2014-08-25'
url: /ditching-jquery/
title: Ditching jQuery
---

This article details how I write modern, native JavaScript (aka vanilla JS), and includes a growing collection of native JavaScript equivalents for common jQuery tasks.

[snippet id="8395"]

## Table of Contents

1. [Why go native?](#why-go-native)
2. [My approach](#my-approach)
	* [Cutting the mustard](#cutting-the-mustard)
	* [What browsers are supported?](#what-browsers-are-supported)
	* [Hiding content after the JS is loaded](#hiding-content-after-the-js-is-loaded)
3. [Native JavaScript APIs](#native-javascript-apis)
	* [Selectors](#selectors)
	* [Looping through objects](#looping-through-objects)
	* [Class manipulation](#class-manipulation)
	* [Manipulate styles](#manipulate-styles)
	* [Manipulate attributes](#manipulate-attributes)
	* [Event listeners](#event-listeners)
	* [Waiting until the DOM is ready](#waiting-until-the-dom-is-ready)
	* [Manipulate height](#manipulate-height)
	* [Working with forms](#working-with-forms)
	* [HTML content](#html-content)
	* [Extend](#extend)
	* [Is an element in the viewport?](#is-an-element-in-the-viewport)
	* [Get distances to the top of the document](#get-distances-to-the-top-of-the-document)
	* [Get document height](#get-document-height)
	* [Climb up the DOM](#climb-up-the-dom)
	* [Climb down the DOM](#climb-down-the-dom)
	* [Get sibling elements](#get-sibling-elements)
	* [Get a querystring](#get-a-querystring)
	* [Get HTML from another page](#get-html-from-another-page)
	* [Get JSON Data](#get-json-data)
	* [Working with AJAX and APIs](#working-with-ajax-and-apis)
4. [Learn more](#learn-more)

## Why go native?

One of the benefits of a framework like jQuery is that it smooths out all of the weird browser inconsistencies you might run into. But, all that abstraction and extra code adds a lot of weight and performance latency to a site.

[Tim Kadlec writes...](http://timkadlec.com/2014/01/smart-defaults-on-libraries-and-frameworks/)

> It’s not just download sizes that you should be worried about. In a presentation given at Velocity in 2011, [Maximiliano Firtman pointed out](http://www.slideshare.net/firt/mobile-web-html5-performance-optimization/95) that on some phones (older, but still popular, BlackBerry devices for example) can take up to 8 seconds just to parse jQuery. More recent [research from Stoyan Stefanov](http://jsperf.com/zepto-jq-eval) revealed that even on iOS 5.1, it was taking as many as 200-300ms to parse jQuery.

And while I unfortunately don't have hard numbers to back it up, I have found that converting the sites I build over to native JavaScript has had a dramatic impact on site performance.

***Update:*** *[Tim's got some updated data](http://timkadlec.com/2014/09/js-parse-and-execution-time/), and while modern iOS and Android devices are lightning fast, older models&mdash;including ones that are still on the market&mdash;performed much more poorly.*

## My approach

The web is for everyone, but [support is not the same as optimization](http://bradfrostweb.com/blog/mobile/support-vs-optimization/).

Rather than trying to provide the same level of functionality for older browsers, I use progressive enhancement to serve a basic experience to all browsers (even Netscape and IE 5). Newer browsers that support modern APIs and techniques get the enhanced experience.

**To be clear, I’m not advocating dropping support for older and less capable browsers.** They still have access to all of the content. They just don’t always get the same layout or extra features.

### Cutting the mustard

I used a feature detection technique that the BBC calls [“cutting the mustard.”](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard)

A simple browser test determines whether or not a browser supports modern JavaScript APIs. If it does, it gets the enhanced experience. If not, it gets a more basic one.

```language-javascript
var supports = !!document.querySelector && !!window.addEventListener;
if ( !supports ) return;
```

The `!!` converts the API method into a boolean value that you can test against. You can (and should) add all of the APIs you need to test against to this list.

The `!supports` if statement stops running the script of the browser doesn't support the appropriate APIs.


### What browsers are supported?

To quote the BBC:

> - IE9+
> - Firefox 3.5+
> - Opera 9+ (and probably further back)
> - Safari 4+
> - Chrome 1+ (I think)
> - iPhone and iPad iOS1+
> - Android phone and tablets 2.1+
> - Blackberry OS6+
> - Windows 7.5+ (new Mango version)
> - Mobile Firefox (all the versions we tested)
> - Opera Mobile (all the versions we tested)

### Hiding content after the JS is loaded

In my scripts, after the mustard test is run, I include this line which adds a class to the `<html>` element after the script is loaded.

```language-javascript
document.documentElement.className += ' js-MyPlugin';
```

In my CSS, I can prefix styles with `.js-MyPlugin` to ensure that JS-specific styles are only applied in supported browsers after the required files have downloaded. This does result in some [FOUT](http://en.wikipedia.org/wiki/Flash_of_unstyled_content), but it's worth it to ensure that users can always access content.

## Native JavaScript APIs

Below is a growing list of native JavaScript equivalents of jQuery APIs. Unless otherwise noted, these provide support for IE9 and above.

***Quick aside:*** *Many modern web and ECMAScript 5 APIs were influenced by jQuery, and have made working on the web much easier. Thanks jQuery!*

### Selectors

<del datetime="2014-11-27T01:02:39+00:00">Native JavaScript</del> HTML5 provides two APIs to select elements in the DOM. `document.querySelector()` gets the first matching element, while `document.querySelectorAll()` returns a node list of all matching elements.

Also supported in IE8, but only for CSS 2.1 selectors.

```language-javascript
var firstClass = document.querySelector( '.some-class' );
var firstId = document.querySelector( '#some-id' );
var firstData = document.querySelector( '[data-example]' );

var allClasses = document.querySelectorAll( '.some-class' );
var allData = document.querySelectorAll( '[data-example]' );
```

### Looping through objects

Iterate over arrays, objects, and node lists. Supported all the way back to IE6.

```language-javascript
// Arrays and node lists
var elems = document.querySelectorAll( '.some-class' );
for ( var i = 0, len = elems.length; i < len; i++ ) {
    console.log(i) // index
    console.log(elems[i]) // object
}

// Objects
var obj = {
	apple: 'yum',
	pie: 3.214,
	applePie: true
};
for ( var prop in obj ) {
	if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
		console.log( prop ); // key
		console.log( obj[prop] ); // value
	}
}
```

***Note:*** *Todd Motto has created [a simple helper method](https://github.com/toddmotto/foreach) that's useful if you frequently loop over objects.*

### Class manipulation

Add, remove, and check for classes. The `classList` API support starts with IE10, but a [polyfill provides support back to IE8](https://github.com/eligrey/classList.js/). You should always use it.

```language-javascript
var elem = document.querySelector( '#some-element' );
elem.classList.add( 'some-class' ); // Add class
elem.classList.remove( 'some-other-class' ); // Remove class
elem.classList.toggle( 'some-other-class' ); // Add or remove class
if ( elem.classList.contains( 'some-third-class' ) ) { // Check for class
	console.log( 'yep!' );
}
```

### Manipulate styles

Get and set inline styles. This is supported all the way back to IE6.

```language-javascript
var elem = document.querySelector( '#some-element' );
var color = elem.style.color; // Get a CSS attribute
elem.style.color = 'rebeccapurple'; // Set a CSS attribute
var height = elem.style.minHeight; // Get a CSS attribute
elem.style.minHeight = '200px'; // Set a CSS attribute
```

***Note:*** *Not sure what the right property name is? I Google these all the time!*

### Manipulate attributes

Add, remove, and check for attributes.

```language-javascript
var elem = document.querySelector( '#some-element' );

elem.getAttribute( 'data-example' ); // Get data attribute
elem.setAttribute( 'data-example', 'Hello world' ); // Set data attribute
if ( elem.hasAttribute( 'data-example' ) ) { // Check data attribute
	console.log( 'yep!' );
}
```

You can use these APIs to get and set all sorts of attributes&mdash;not just data attributes. However, there's usually an API you can call directly on the element, too.

```language-javascript
var elem = document.querySelector( '#some-element' );

// Set an ID
elem.setAttribute( 'id', 'new-id' );
elem.id = 'new-id';

// Set width
elem.setAttribute( 'width', '200px' );
elem.width = '200px';

// Get title
var title = elem.getAttribute( 'title' );
var titleToo = elem.title;
```

### Event listeners

Listen for clicks, hovers, [and more](https://developer.mozilla.org/en-US/docs/Web/Events).

```language-javascript
var elem = document.querySelector( '.some-class' );
elem.addEventListener( 'click', function( event ) {
    // Do stuff
}, false);
```

Unlike jQuery, each event requires its own listener, but you can assign a function to a variable to keep your code more DRY.

```language-javascript
var elem = document.querySelector( '.some-class' );
var someFunction = function ( event ) {
	// Do stuff
};
elem.addEventListener( 'click', someFunction, false );
elem.addEventListener( 'mouseover', someFunction, false );
```

And if you need to pass multiple variables into a function assigned to a variable, use the [`.bind()` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind). The first variable is the one assigned to `this`, and event is automatically passed in as the last variable.

```language-javascript
var elem = document.querySelector( '.some-class' );
var someFunction = function ( var1, var2, var3, event ) {
	// Do stuff
}
elem.addEventListener('click', someFunction.bind( null, var1, var2, var3 ), false);
elem.addEventListener('mouseover', someFunction.bind( null, var1, var2, var3 ), false);
```

***Note:*** *`.bind()` was a late addition to ECMAScript 5, and some otherwise compliant browsers don't support it. You should [include the polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility) if you use it.*

With named functions, you can also remove event listeners.

```language-javascript
elem.removeEventListener( 'click', someFunction, false );
elem.removeEventListener( 'mouseover', someFunction, false );
```

If you need to apply the same event listener on multiple elements, you *can* loop through each element and add a listener. A better and more performant approach, though, is to listen for events on the entire document and filter just the elements you need.

```language-javascript
/**
 * Function to filter what's clicked and run your functions
 * @param  {Event} event The event
 */
var eventHandler = function ( event ) {

	// Get the clicked element
	var toggle = event.target;

	// If clicked element is the one you're looking for, run your methods
	if ( toggle.hasAttribute( 'data-example' ) || toggle.classList.contains( 'sample-class' ) ) {
		event.preventDefault(); // Prevent default click event
		someMethod( the, arguments, to, pass, into, method );
	}

};

// Listen for all click events on the document
document.addEventListener( 'click', eventHandler, false );
```

### Waiting until the DOM is ready

Run JS methods after the DOM is ready. While modern browsers support the `DOMContentReady` event listener, code won't execute if it's called after the DOM is loaded (the event it's listening for has already happened). The `ready()` method provided below executes your scripts immediately if the DOM is ready, and waits until it is if it's not.

Under `readyState`, `interactive` runs once the document is done but before all images and stylesheets have been downloaded. `complete` runs after that stuff is downloaded, too. I've included both for completeness.

```javascript
/**
 * Run event after DOM is ready
 * @param  {Function} fn Callback function
 */
var ready = function ( fn ) {

    // Sanity check
    if ( typeof fn !== 'function' ) return;

    // If document is already loaded, run method
    if ( document.readyState === 'interactive' || document.readyState === 'complete' ) {
        return fn();
    }

    // Otherwise, wait until document is loaded
    document.addEventListener( 'DOMContentLoaded', fn, false );

};

// Example
ready(function() {
    // Do stuff...
});
```

### Manipulate height

Get and set height. It's a lot trickier in native JS than it should be, because there are multiple APIs for getting height, and they all return slightly different measurements. The `getHeight()` method provided below returns the largest measurement. These are supported back to IE6.

```language-javascript
/**
 * Get the height of an element
 * @param  {Node}   elem The element
 * @return {Number}      The height
 */
var getHeight = function ( elem ) {
	return Math.max( elem.scrollHeight, elem.offsetHeight, elem.clientHeight );
};

var elem = document.querySelector( '#some-element' );
var height = getHeight( elem ); // Get height
elem.style.height = '200px'; // Set height
```

### Working with forms

Get field types, input content and states. These are supported back to IE6.

```language-javascript
var form = document.querySelector( '#some-form' );
var input = document.querySelector( '#some-input' );

var forms = document.forms; // Get all forms on a page
var formElems = form.elements; // Get all form elements
var inputType = input.type.toLowerCase(); // Get input type and convert to lowercase (radio, checkbox, text, etc.)
var inputValue = input.value; // Get input value
var inputName = input.name; // Get input name
var isChecked = input.checked; // Get the checked status of a checkbox or radio button
var isDisabled = input.disabled; // Get input disabled status
```

### HTML content

Get and set HTML content.

```language-javascript
var elem = document.querySelector( '#some-element' );
var html = elem.innerHTML; // Get HTML
elem.innerHTML = 'Hello world!'; // Set HTML
```

### Extend

Merge two or more objects together. The jQuery `$.extend()` API merges the content of subsequent objects into the first one, overriding it's original values. The method provided below returns a new object instead, preserving all of the original objects and their properties. Supported back to IE6.

```language-javascript
/**
 * Merge two or more objects. Returns a new object.
 * Set the first argument to `true` for a deep or recursive merge
 * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
 * @param {Object}   objects  The objects to merge together
 * @returns {Object}          Merged values of defaults and options
 */
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
	var merge = function ( obj ) {
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
var newObjectShallow = extend( object1, object2, object3 );
var newObjectDeep = extend( true, object1, object2, object3 );
```

### Is an element in the viewport?

Determine if an element is the viewport or not. Supported back to IE6.

```language-javascript
/**
 * Determine if an element is in the viewport
 * @param  {Node}    elem The element
 * @return {Boolean}      Returns true if element is in the viewport
 */
var isInViewport = function ( elem ) {
	var distance = elem.getBoundingClientRect();
	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

var elem = document.querySelector( '#some-element' );
isInViewport( elem ); // Boolean: returns true/false
```

### Get distances to the top of the document

Get your current position from the top of the page, or that of an element.

```javascript
// Get current location's distance from the top of the page
var position = window.pageYOffset;

/**
 * Get an element's distance from the top of the page
 * @param  {Node}   elem The element
 * @return {Number}      Distance from the top of the page
 */
var getElemDistance = function ( elem ) {
    var location = 0;
    if ( elem.offsetParent ) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while ( elem );
    }
    return location >= 0 ? location : 0;
};
var elem = document.querySelector( '#some-element' );
var location = getElemDistance( elem );
```

### Get document height

Get the height of the document element. Supported back to IE6.

```language-javascript
/**
 * Get the height of the `document` element
 * @return {Number} The height
 */
var getDocumentHeight = function () {
	return Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.offsetHeight,
		document.body.clientHeight,
		document.documentElement.clientHeight
	);
};
```

### Climb up the DOM

Get the parent of an element. Supported back to IE6.

```language-javascript
var elem = document.querySelector( '#some-element' );
var parent = elem.parentNode;
```

Get closest DOM element up the tree that contains any valid CSS selector.

```language-javascript
/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
var getClosest = function ( elem, selector ) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Get closest match
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}

	return null;

};

var elem = document.querySelector( '#some-element' );
var closest = getClosest( elem, '.some-class' );
var closestLink = getClosest( elem, 'a' );
var closestExcludingElement = getClosest( elem.parentNode, '.some-class' );
```

Get all parent elements up the DOM tree, optionally filtering by any valid CSS selector. Includes the element itself.

```language-javascript
/**
 * Get all of an element's parent elements up the DOM tree
 * @param  {Node}   elem     The element
 * @param  {String} selector A class, ID, data attribute or tag to filter against [optional]
 * @return {Array}           The parent elements
 */
var getParents = function ( elem, selector ) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Setup parents array
	var parents = [];

	// Get matching parent elements
	for ( ; elem && elem !== document; elem = elem.parentNode ) {

		// Add matching parents to array
		if ( selector ) {
			if ( elem.matches( selector ) ) {
				parents.push( elem );
			}
		} else {
			parents.push( elem );
		}

	}

	return parents;

};

var elem = document.querySelector( '#some-element' );
var parents = getParents( elem, '.some-class' );
var allParents = getParents( elem.parentNode );
```

Get all parent elements up the DOM tree until a matching parent is found, optionally filtering by any valid CSS selector. Includes the element itself.

```javascript
/**
 * Get all of an element's parent elements up the DOM tree until a matching parent is found
 * @param  {Node}   elem     The element
 * @param  {String} parent   The selector for the parent to stop at
 * @param  {String} selector The selector to filter against [optionals]
 * @return {Array}           The parent elements
 */
var getParentsUntil = function ( elem, parent, selector ) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Setup parents array
	var parents = [];

	// Get matching parent elements
	for ( ; elem && elem !== document; elem = elem.parentNode ) {

		if ( parent ) {
			if ( elem.matches( parent ) ) break;
		}

		if ( selector ) {
			if ( elem.matches( selector ) ) {
				parents.push( elem );
			}
			break;
		}

		parents.push( elem );

	}

	return parents;

};

// Examples
var elem = document.querySelector( '#some-element' );
var parentsUntil = getParentsUntil( elem, '.some-class' );
var parentsUntilByFilter = getParentsUntil( elem, '.some-class', '[data-something]' );
var allParentsUntil = getParentsUntil( elem );
var allParentsExcludingElem = getParentsUntil( elem.parentNode );
```

### Climb down the DOM

Get all child nodes of an element. Supported back to IE6.

```language-javascript
var elem = document.querySelector( '#some-element' );
var all = elem.childNodes;
```

Get the first child node of an element. Supported back to IE6.

```language-javascript
var elem = document.querySelector( '#some-element' );
var first = elem.firstChild;
```

Get the first element that matches a class, ID, or data attribute.

```language-javascript
var elem = document.querySelector( '#some-element' );
var firstMatch = elem.querySelector( '.sample-class' );
```

Get all elements that match a class, ID, or data attribute.

```language-javascript
var elem = document.querySelector( '#some-element' );
var allMatches = elem.querySelectorAll( '.sample-class' );
```

### Get sibling elements

Get all siblings of an element. Supported back to IE6.

```javascript
/**
 * Get all siblings of an element
 * @param  {Node}  elem The element
 * @return {Array}      The siblings
 */
var getSiblings = function ( elem ) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	for ( ; sibling; sibling = sibling.nextSibling ) {
		if ( sibling.nodeType === 1 && sibling !== elem ) {
			siblings.push( sibling );
		}
	}
	return siblings;
};

var elem = document.querySelector( '#some-element' );
var siblings = getSiblings( elem );
```

### Get a querystring

Get a `querystring` from a URL. Supported back to at least IE6.

```javascript
/**
 * Get the value of a query string from a URL
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from [optional]
 * @return {String}       The value
 */
var getQueryString = function ( field, url ) {
	var href = url ? url : window.location.href;
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	var string = reg.exec(href);
	return string ? string[1] : null;
};

// http://example.com&this=chicken&that=sandwich
var thisOne = getQueryString( 'this' ); // returns 'chicken'
var thatOne = getQueryString( 'that' ); // returns 'sandwich'
var anotherOne = getQueryString( 'another' ); // returns null
var yetAnotherOne = getQueryString( 'example', 'http://another-example.com&example=something' ); // returns 'something'
```

### Get HTML from another page

Get the contents of another HTML document, or from a specific element in another document. Only works for documents on the same domain. Supported back to IE8 and above.

```javascript
/**
 * Get HTML from another URL
 * @param  {String}   url     The URL
 * @param  {Function} success Callback on success
 * @param  {Function} error   Callback on failure
 */
var getURL = function ( url, success, error ) {

	// Feature detection
	if ( !window.XMLHttpRequest ) return;

	// Create new request
	var request = new XMLHttpRequest();

	// Setup callbacks
	request.onreadystatechange = function () {

		// If the request is complete
		if ( request.readyState === 4 ) {

			// If the request failed
			if ( request.status !== 200 ) {
				if ( error && typeof error === 'function' ) {
					error( request.responseText, request );
				}
				return;
			}

			// If the request succeeded
			if ( success && typeof success === 'function' ) {
				success( request.responseText, request );
			}
		}

	};

	// Get the HTML
	request.open( 'GET', url );
	request.send();

};

// Example 1: Generic Example
getURL(
	'/about',
	function (data) {
		// On success...
		var div = document.createElement( 'div' );

	},
	function (data) {
		// On failure...
	}
);

// Example 2: Find a specific element in the HTML and inject it into the current page
getURL(
	'/about',
	function (data) {

		// Create a div and inject the HTML into it
		var div = document.createElement( 'div' );
		div.innerHTML = data;

		// Find the element you're looking for in the div
		var elem = div.querySelector( '#some-element' );
		var location = document.querySelector( '#another-element' );

		// Quit if the element or the place where you want to inject it don't exist
		if ( !elem || !location ) return;

		// Inject the element into the DOM
		location.innerHTML = elem.innerHTML;

	}
);
```

### Get JSON Data

Get JSON data from another server. Supported back to IE6.

```javascript
/**
 * Get JSONP data
 * @param  {String}   url      The JSON URL
 * @param  {Function} callback The function to run after JSONP data loaded
 */
var getJSONP = function ( url, callback ) {

	// Create script with url and callback (if specified)
	var ref = window.document.getElementsByTagName( 'script' )[ 0 ];
	var script = window.document.createElement( 'script' );
	script.src = url + (url.indexOf( '?' ) + 1 ? '&' : '?') + 'callback=' + callback;

	// Insert script tag into the DOM (append to <head>)
	ref.parentNode.insertBefore( script, ref );

	// After the script is loaded (and executed), remove it
	script.onload = function () {
		this.remove();
	};

};

// Example
var logAPI = function ( data ) {
	console.log( data );
}
getJSONP( 'http://api.petfinder.com/shelter.getPets?format=json&key=12345&shelter=AA11', 'logAPI' );
```

### Working with AJAX and APIs

For robust API interactions, check out [Atomic by Todd Motto](https://github.com/toddmotto/atomic), supported back to IE8.

## Learn More

My first go-to site for anything JavaScript related is the [Mozilla Developer Network](https://developer.mozilla.org/), which is essentially a user guide for the web. They provide documentation on tons of web and JS APIs, with examples, browser compatibility information, and polyfills when needed. Just add `mdn` to your Google searches.

If that fails, I turn to [Stack Overflow](http://stackoverflow.com/). Make sure to add `vanilla js` to your searches. Typing `without jQuery` returns a ton of jQuery-based responses instead.

[snippet id="8397"]