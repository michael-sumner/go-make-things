---
categories:
- Code
date: '2014-07-02'
title: Setting multiple JavaScript plugin options with a single data attribute
---

***Update:*** *After a chat with [Todd Motto](http://toddmotto.com/), I've [updated my approach](https://gomakethings.com/revisiting-the-data-options-data-attribute/).*

All of my native JS plugins let users pass in options during initialization. For some (like [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll) and [Jellyfish](https://github.com/cferdinandi/jellyfish/)), I also provide a way for developers to override these options an item-by-item basis using data attributes.

Developers simply pass in all of their overrides via a single `data-options` attribute rather than forcing developers to use a data attribute for every option they want to change. [Foundation uses this approach](http://foundation.zurb.com/docs/components/orbit.html) in several of their scripts.

```class-markup
// This
data-options="speed: 500;
              easing: easeInOutCubic;
              offset: 0;
              updateURL: false";

// Instead of this
data-speed="500"
data-easing="easeInOutCubic"
data-offset="0"
data-updateURL="false"
```

To do this, I wrote a simple helper function that converts the contents of the `data-options` attribute into an object.

[snippet id="8395"]

## data-options.js

```language-javascript
/**
 * Convert data-options attribute into an object of key/value pairs
 * @private
 * @param {String} options Item-specific options as a data attribute string
 * @returns {Object}
 */
var getDataOptions = function ( options ) {
	var settings = {};

	// Trim whitespace from a string
	var trim = function ( string ) {
		return string.replace(/^s+|s+$/g, '');
	};

	// Create a key/value pair for each setting
	if ( options ) {
		options = options.split(';');
		options.forEach( function(option) {
			option = trim(option);
			if ( option !== '' ) {
				option = option.split(':');
				settings[option[0]] = trim(option[1]);
			}
		});
	}

	return settings;
};
```

### Example

**Markup**
```language-markup
<a
class="example"
href="#"
data-options="speed: 500;
              easing: easeInOutCubic;
              offset: 0;
              updateURL: false";
>
	link
</a>
```

**JavaScript**
```language-javascript
var item = document.querySelector('.example');
var options = getDataOptions( item ? item.getAttribute('data-options') : null );

console.log(options);
// Returns: Object{speed: 500, easing: easeInOutCubic, offset: 0, updateURL: false}
```

See it in action in [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll).

## Update

Todd Motto pointed out [the dangers of using this approach](https://twitter.com/toddmotto/status/484313751429332992/photo/1):

<img src="https://gomakethings.com/wp-content/uploads/2014/07/data-json.png" alt="data-json" width="741" height="127" class="aligncenter img-border">

All values, even numbers and booleans, are converted to strings. His solution is to [use real JSON in your markup](http://jsfiddle.net/toddmotto/aqMpU/):

**Markup**
```language-markup
<a class="example" href="#" data-options='{
    "speed": 500,
    "easing": "easeIn OutCubic",
    "offset": 0,
    "updateURL": false
}'>link</a>
```

**JavaScript**
```language-javascript
var getDataOptions = function ( options ) {
    return (!options || typeof JSON.parse !== 'function') ? {} : JSON.parse(options);
};

var item = document.querySelector('.example');
var options = getDataOptions( item ? item.getAttribute('data-options') : null );

console.log(options);
```

I'll be updating my scripts accordingly.

[snippet id="8397"]