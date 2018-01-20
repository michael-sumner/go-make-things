---
categories:
- Code
- CSS
- JavaScript
date: '2017-12-29'
url: /testing-for-css-pseudo-class-support-with-vanilla-javascript/
title: Testing for CSS pseudo-class support with vanilla JavaScript
---

Yesterday, we learned [how to check for CSS feature support with vanilla JS](/testing-for-css-support-with-vanilla-javascript/) using `CSS.supports()`. Unfortunately, this method cannot be used to test for CSS pseudo-classes.

Fortunately, [user cuixiping over on StackOverflow](https://stackoverflow.com/a/41098605/1293256) shared this useful helper method that let's you do just that!

```js
/**
 * Test for pseudo-class support
 * @param  {String} pseudoClass The pseudo-class
 * @return {Boolean}            Returns true if supported
 */
var supportsPseudo = function (pseudoClass) {

	// Get the document stylesheet
	var ss = document.styleSheets[0];

	// Create a stylesheet if one doesn't exist
	if (!ss) {
		var el = document.createElement('style');
		document.head.appendChild(el);
		ss = document.styleSheets[0];
		document.head.removeChild(el);
	}

	// Test the pseudo-class by trying to style with it
	var testPseudo = function () {
		try {
			if (!(/^:/).test(pseudoClass)) {
				pseudoClass = ':' + pseudoClass;
			}
			ss.insertRule('html' + pseudoClass + '{}', 0);
			ss.deleteRule(0);
			return true;
		} catch(e) {
			return false;
		}
	};

	// Run the test
	return testPseudo();

};
```

To use it, pass in the pseudo-class you'd like to test.

```js
if (supportsPseudo(':nth-of-type()')) {
	// :nth-of-type is supported...
} else {
	// :nth-of-type is NOT supported...
}
```

## Browser Compatibility

This works in all modern browsers, and IE9 and above.