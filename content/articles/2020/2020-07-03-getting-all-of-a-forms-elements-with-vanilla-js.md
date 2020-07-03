---
title: "Getting all of a form's elements with vanilla JS"
date: 2020-07-03T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today, I want to show you a quick trick you can use to get all of the elements in a form using the `HTMLFormElement.elements` property.

Let's dig in.

## Getting all of the elements in a form

Let's say you have a form like this.

```html
<form id="my-form">

	<label for="name">Name</label>
	<input type="text" name="name" id="name">

	<label for="address">Address</label>
	<input type="text" name="address" id="address">

	<label for="email">Email</label>
	<input type="email" name="email" id="email">

	<label for="hear-about-us">How did you hear about us?</label>
	<select name="hear-about-us" id="hear-about-us">
		<option value=""></option>
		<option value="google">Google</option>
		<option value="referral">Referred by a Friend</option>
		<option value="tv">A TV Ad</option>
		<option value="radio">A Radio Ad</option>
	</select>

	<label for="more">Additional thoughts?</label>
	<textarea name="more" id="more"></textarea>

	<p><strong>Do you agree to our terms of service?</strong></p>
	<label>
		<input type="radio" name="tos" value="yes">
		Yes
	</label>
	<label>
		<input type="radio" name="tos" value="no">
		No
	</label>

	<p><strong>Pick your favorite super heros.</strong></p>

	<label>
		<input type="checkbox" name="spiderman">
		Spiderman
	</label>

	<label>
		<input type="checkbox" name="wonderwoman">
		Wonder Woman
	</label>

	<label>
		<input type="checkbox" name="blackpanther">
		Black Panther
	</label>

	<p>
		<button type="submit">Submit</button>
	</p>

</form>
```

You can get all of the elements in the form by getting the form itself, and then calling the `elements` property on it.

```js
var form = document.querySelector('#my-form');
var elements = form.elements;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/VweyEBV)

The `elements` property returns an `HTMLFormControlsCollection`, an array-like set of elements.

You can [convert them to an array](/converting-a-nodelist-to-an-array-with-vanilla-javascript/) using the `Array.from()` method or the `Array.prototype.slice.call()` trick. Then you can use array methods [like `forEach()`](https://vanillajstoolkit.com/reference/loops/array-foreach/) and [the `map()` method](https://vanillajstoolkit.com/reference/arrays/array-map/) to loop through them.

```js
var elemsArr1 = Array.from(elements);
var elemsArr2 = Array.prototype.slice.call(elements);
```

## Browser compatibility

The `HTMLFormElement.elements` method works in all modern browsers, and IE9 and up.