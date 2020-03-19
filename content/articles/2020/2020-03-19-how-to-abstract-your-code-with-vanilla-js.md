---
title: "How to abstract your code with vanilla JS"
date: 2020-03-19T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

One of the biggest challenges I hear about from developers is that they struggle with how to abstract their code.

Today, we're going to look at a few different examples [using the `fetch()` method](/how-to-use-the-fetch-api-with-vanilla-js/), and I'll show you how I would abstract that code.

## Repeating the same task

For today's article, we'll be using [the JSONPlaceholder APIs](https://jsonplaceholder.typicode.com/). They let you make real API calls and get data back.

For our first example, lets say you wanted to `POST` data to the `/posts` endpoint. You're going to need to make the call several times, but with different `body` data each time.

```js
// Create a post about Harry Potter
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: JSON.stringify({
		title: 'Harry Potter',
		body: 'Made bad decisions and got out of them through a combination of luck and good friends.',
		userId: 1
	}),
	headers: {
		'Content-type': 'application/json; charset=UTF-8'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn(error);
});

// Create a post about Hermione Granger
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: JSON.stringify({
		title: 'Hermione Granger',
		body: 'The All Star, constantly being ignored and gas lighted by her male peers.',
		userId: 7
	}),
	headers: {
		'Content-type': 'application/json; charset=UTF-8'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn(error);
});
```

The two API calls are almost identical.

We can abstract these two calls into a single helper method, and pass our `body` data in as an argument.

```js
/**
 * Create an article
 * @param  {Object} article The article data
 */
var createArticle = function (article) {
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: JSON.stringify(article),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	}).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject(response);
	}).then(function (data) {
		console.log(data);
	}).catch(function (error) {
		console.warn(error);
	});
};
```

Then, we can create our articles like this.

```js
// Create article about Harry Potter
createArticle({
	title: 'Harry Potter',
	body: 'Made bad decisions and got out of them through a combination of luck and good friends.',
	userId: 1
});

// Create article about Hermione Granger
createArticle({
	title: 'Hermione Granger',
	body: 'The All Star, constantly being ignored and gas lighted by her male peers.',
	userId: 7
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/ExjpjWK)

This helps you avoid repeating the same code over and over again, a concept known as *DRY* (an acronym for *Don't Repeat Yourself*).

It also results in code that's easier to read.

## Calling different endpoints with shared options

Now lets say you wanted to make `POST` calls to a few different endpoints. The `method` and `headers` will be the same, but the `url`, `body`, and callback functions will not.

For one call, you want to create an article. For the other, you want to create a todo.

```js
// Create an article about Harry Potter
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: JSON.stringify({
		title: 'Harry Potter',
		body: 'Made bad decisions and got out of them through a combination of luck and good friends.',
		userId: 1
	}),
	headers: {
		'Content-type': 'application/json; charset=UTF-8'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	renderArticle(data);
}).catch(function (error) {
	console.warn(error);
});

// Create a todo item
fetch('https://jsonplaceholder.typicode.com/todos', {
	method: 'POST',
	body: JSON.stringify({
		title: 'Buy a wand from Olivander\'s',
		completed: false,
		userId: 1
	}),
	headers: {
		'Content-type': 'application/json; charset=UTF-8'
	}
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	renderTodo(data);
}).catch(function (error) {
	console.warn(error);
});
```

A lot of the code is similar here, so this is a good candidate for abstraction, too. There are three different ways you could approach it.

### Option 1: a helper function for options

One simple way to abstract this is to create a helper function to returns the `options` object.

You can pass in the `body` data as an argument, and the helper function handles the rest.

```js
var getOptions = function (data) {
	return {
		method: 'POST',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	};
};
```

You would use it like this.

```js
// Create an article about Harry Potter
fetch('https://jsonplaceholder.typicode.com/posts', getOptions({
		title: 'Harry Potter',
		body: 'Made bad decisions and got out of them through a combination of luck and good friends.',
		userId: 1
})).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	renderArticle(data);
}).catch(function (error) {
	console.warn(error);
});

// Create a todo item
fetch('https://jsonplaceholder.typicode.com/todos', getOptions({
		title: 'Buy a wand from Olivander\'s',
		completed: false,
		userId: 1
})).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	renderTodo(data);
}).catch(function (error) {
	console.warn(error);
});
```

[You can play with the `getOptions()` method here.](https://codepen.io/cferdinandi/pen/mdJjJwX)

### Option 2: return a Promise

If you wanted to take this a step further, you could create a helper function that makes the `fetch()` call and checks that the data is `ok`, and then returns the `response.json()` for you.

```js
var getData = function (url, data) {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	}).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject(response);
	});
};
```

Because this returns a Promise, you can chain `.then()` and `catch()` methods to it. You would use it like this.

```js
// Create an article about Harry Potter
getData('https://jsonplaceholder.typicode.com/posts', {
		title: 'Harry Potter',
		body: 'Made bad decisions and got out of them through a combination of luck and good friends.',
		userId: 1
}).then(function (data) {
	renderArticle(data);
}).catch(function (error) {
	console.warn(error);
});

// Create a todo item
getData('https://jsonplaceholder.typicode.com/todos', {
		title: 'Buy a wand from Olivander\'s',
		completed: false,
		userId: 1
}).then(function (data) {
	renderTodo(data);
}).catch(function (error) {
	console.warn(error);
});
```

[Check out how returning Promises works in this demo.](https://codepen.io/cferdinandi/pen/qBdydom)

### Option 3: use callback functions

As a third option, you could handle the entire call inside a helper function, and pass in a callback method to run when successful.

```js
var makeCall = function (url, data, callback) {
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-type': 'application/json; charset=UTF-8'
		}
	}).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject(response);
	}).then(function (data) {
		// If there's a callback function, run it
		if (callback && typeof callback === 'function') {
			callback(data);
		}
	}).catch(function (error) {
		console.warn(error);
	});
};
```

You would use it like this.

```js
// Create an article about Harry Potter
makeCall('https://jsonplaceholder.typicode.com/posts', {
		title: 'Harry Potter',
		body: 'Made bad decisions and got out of them through a combination of luck and good friends.',
		userId: 1
}, renderArticle);

// Create a todo item
makeCall('https://jsonplaceholder.typicode.com/todos', {
		title: 'Buy a wand from Olivander\'s',
		completed: false,
		userId: 1
}, renderTodo);
```

[Experiment with the `makeCall()` function here.](https://codepen.io/cferdinandi/pen/ExjpjLN)

## There's no one right way

Each approach has pros and cons. There's no one right way.

In the examples above, `makeCall()` results in the most abstracted functions, but is potentially requires more changes if you need to refactor your code base later. The `getOptions()` method abstracts the least amount of code, but provides more flexibility.

Hopefully, this helps get you started with creating your own abstractions.