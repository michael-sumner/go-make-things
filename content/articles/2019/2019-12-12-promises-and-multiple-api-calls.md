---
title: "How to use the fetch() method to make multiple API calls with vanilla JavaScript"
date: 2019-12-12T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Sometimes, you need to call an API, and then use data you get back from that API to call another one. [Promises make this easier.](/promises-in-javascript/)

## An example

For an example, let's say you wanted to [get a specific post](https://jsonplaceholder.typicode.com/posts/5) from [JSON Placeholder](https://jsonplaceholder.typicode.com/) using the `/posts` endpoint.

```js
// This gets a post with the ID "5"
fetch('https://jsonplaceholder.typicode.com/posts/5');
```

The API returns an ID for the post author, but no additional information.

```js
var data = {
	userId: 1,
	id: 5,
	title: "nesciunt quas odio",
	body: "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque"
};
```

If you wanted to take this data and render a post into the UI with author information, you would need to call another API endpoint&mdash;`/users`&mdash;and pass along the `userId` as a parameter.

```js
fetch('https://jsonplaceholder.typicode.com/users/' + data.userId);
```

## Nesting `fetch()` methods

Because the `fetch()` method returns a Promise, you can `return` it from inside a `then()` callback method, and the next `then()` method in the chain will run once it resolves.

Using our example above, we would first call our `/posts` endpoint. Then, we would store the returned post `data` to a variable named `post`.

Next, we would `return` a new `fetch()` call to the `/users` endpoint, using the `data.userId` property as part of the endpoint call. once it resolves, we have both pieces of data we need to render our UI.

For now, let's just log the `post` and `userData` objects to the console.

```js
var post;

// Call the API
fetch('https://jsonplaceholder.typicode.com/posts/5').then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {

	// Store the post data to a variable
	post = data;

	// Fetch another API
	return fetch('https://jsonplaceholder.typicode.com/users/' + data.userId);

}).then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (userData) {
	console.log(post, userData);
}).catch(function (error) {
	console.warn(error);
});
```

If you want to call multiple API calls simultaneously, [there's a better approach using `Promise.all()`](/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method/).

But if one API calls requires data from another, returning the `fetch()` method like this provides a simple, readable, flat structure and let's you use a single `catch()` for all of your API calls.