---
title: "Persisting state across views in a multi-page app with vanilla JS"
date: 2019-05-30T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

On Tuesday, I explained [some of my issues with single page apps](/the-problem-with-single-page-apps/) (or *SPAs*), and shared an alternative approach: multi-page apps.

Newsletter reader [Reed Jones](https://www.reedjones.com/) emailed me to ask a great follow-up question (shared with permission):

> How would you persist state across multiple pages?

If I need state across multiple UIs, I lean on `localStorage` or `sessionStorage` to store the data and access it on page load.

If stored data exists, I update my data state. If not, I use an empty object instead. Something like this:

```js
/**
 * Save state to localStorage
 */
var setState = function () {
	localStorage.setItem('my-awesome-app', JSON.stringify(myData));
};

/**
 * Get saved state from localStorage (if it exists)
 * @return {Object} The data, or an empty object
 */
var getState = function () {
	var saved = localStorage.getItem('my-awesome-app');
	if (saved) {
		return JSON.parse(saved);
	}
	return {};
};

// Get the initial state on page load
var myData = getState();
```

Whenever something happens to update the state, I fire my `setState()` method to save it.

Imagine a todo list app. Whenever someone clicks the button to add a list item, we want to update the list and save the data to `localStorage`.

```js
addTodoBtn.addEventListener('click', function (event) {

	// Run code to update the list and UI, then...

	// Save the state
	setState();

}, false);
```