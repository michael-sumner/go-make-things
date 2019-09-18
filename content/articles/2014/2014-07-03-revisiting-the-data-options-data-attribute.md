---
categories:
- Code
date: '2014-07-03'
url: /revisiting-the-data-options-data-attribute/
title: Revisiting the <code>data-options</code> data attribute
---

Yesterday, I posted about a technique I use to [set multiple JavaScript plugin options with a single data attribute](/setting-multiple-javascript-plugin-options-with-a-single-data-attribute/).

[Todd Motto](http://toddmotto.com/) identified a few issues with the implementation I recommended:

* If you break your attributes across multiple lines, as shown in my demo, the code breaks.
* It converts everything into a string, including booleans and numbers.

Todd recommended the use of JSON instead.

**Markup**
```markup
<a
class="example"
href="#"
data-options='{
              	"speed": 500,
              	"easing": "easeInOutCubic",
              	"offset": 0,
              	"updateURL": false
              }'
>
    link
</a>
```

**JavaScript**
```javascript
var getDataOptions = function ( options ) {
	return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse( options );
};

var item = document.querySelector('.example');
var options = getDataOptions( item ? item.getAttribute('data-options') : null );

console.log(options);
// Returns: Object{speed: 500, easing: "easeInOutCubic", offset: 0, updateURL: false}
```

This approach requires that the `data-options` attribute is [valid JSON](http://jsonlint.com/), which is not inherently a bad thing but does make it a bit easier to work with for developers not familiar with that format.

Regardless, I'm converted my plugins that use the `data-options` approach over to this implementation.