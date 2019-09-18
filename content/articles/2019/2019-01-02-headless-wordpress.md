---
title: "Headless WordPress with Static Website Generators"
date: 2019-01-02T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
- WordPress
---

Since moving to a static-site generator, I occasionally need a server backend to handle logic for me.

In one case, I use it to handle user account creation for my learning platform. WordPress stores all of the usernames/passwords, and I can use JS to make calls to it, log users in, and surface "logged in only" user content.

More often, though, I'm using it as a middle-man for API calls that require the user of keys/secrets, or return data I don't want to fully expose publicly.

Here's how it works...

## Install WordPress

Obviously, you need WordPress.

The easiest way to do this is to install it on a subdirectory of your static site. Something like `mysite.com/backend/` or `mysite.com/headless/` or `mysite.com/controller/`.

If your host lets you 1-click install to a subdirectory, awesome! If not, you may have to manually create a database and setup the `wp-config.php` file (beyond the scope of this tutorial).

## Create a plugin

I setup a plugin to handle all of the "app stuff" for me. Call it whatever you want.

```php
<?php

/**
 * Plugin Name: My App Management Plugin
 * Plugin URI: https://github.com/YOU/REPO-URL
 * GitHub Plugin URI: https://github.com/YOU/REPO-URL
 * Description: Manage all the app stuff for my static site
 * Version: 0.0.1
 * Author: YOU
 * Author URI: http://your-site.com
 * License: GPLv3
 *
 * Notes and references:
 * - https://codex.wordpress.org/Function_Reference/wp_send_json
 * - https://codex.wordpress.org/AJAX_in_Plugins
 * - https://www.smashingmagazine.com/2011/10/how-to-use-ajax-in-wordpress/
 */
```

I often put this on GitHub and use the [GitHub Updater](https://github.com/afragen/github-updater) plugin to install it and handle updating easily.

## The lazy way to pass sensitive info into your plugin

I'm too lazy to setup a proper plugin options page in the dashboard for this, so I add environment variables to my `.htaccess` file. You could also add them to a `.env` file instead.

**In the `.htaccess` file**

```ApacheConf
SetEnv VARIABLE_NAME_ALL_CAPS variable_value_mixed_case
```

**In the plugin**

```php
$some_variable = getenv('VARIABLE_NAME_ALL_CAPS');
```

## Make it "headless"

It's not *truly* headless, as you can still access the Dashboard. But we'd like to keep people off of the front end since it's supposed to be a middleman layer.

For this one, create an environment variable named `FRONTEND_URL` with the URL for the front-end of your app. This will redirect people away from any non-Dashboard pages.

```php
<?php

	/**
	 * Redirect users away from the front end
	 */
	function my_app_manager_redirect_from_front_end () {
		$url = getenv('FRONTEND_URL');
		if (is_admin() || empty($url) || $GLOBALS['pagenow'] === 'wp-login.php') return;
		wp_redirect($url);
		exit;
	}
	add_action('init', 'my_app_manager_redirect_from_front_end');
```

## Creating backend endpoints

In your plugin, you can setup endpoints that you can call with JavaScript to expose or return data.

For example, let's say you want to check if the current user was logged in. If they are, you want to return their email address.

### Create an endpoint

First, let's setup a function in the plugin to handle this.

Create a function, then setup two `add_action()` hooks. The first starts with `wp_ajax_`, and is accessible only to logged in users. The second second starts with `wp_ajax_nopriv_`, and is accessible to logged out users.

You generally need both, but if the thing you're trying to get should only be seen by people who are logged in, only use `wp_ajax_`.

Whatever you put after `wp_ajax_` and `wp_ajax_nopriv_` in the hook name becomes the endpoint name. The second argument is the function to run when this action is triggered.

```php
<?php

	/**
	 * Check if the user is logged in
	 */
	function my_app_manager_is_logged_in () {
		// We'll do stuff here...
	}
	add_action('wp_ajax_my_app_manager_is_logged_in', 'my_app_manager_is_logged_in');
	add_action('wp_ajax_nopriv_my_app_manager_is_logged_in', 'my_app_manager_is_logged_in');
```

### Restrict to Ajax calls

We don't want people to call the endpoint directly.

Restrict it to Ajax calls by checking for an `HTTP_X_REQUESTED_WITH` header, and making sure it has a value of `xmlhttprequest`. If not, bail.

```php
<?php

	/**
	 * Check if the user is logged in
	 */
	function my_app_manager_is_logged_in () {

		// Bail if not an Ajax request
		if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
			header('Location: ' . $_SERVER['HTTP_REFERER']);
			return;
		}

	}
	add_action('wp_ajax_my_app_manager_is_logged_in', 'my_app_manager_is_logged_in');
	add_action('wp_ajax_nopriv_my_app_manager_is_logged_in', 'my_app_manager_is_logged_in');
```

### Doing stuff

If that all checks out, you can do stuff.

You might want to [get some API data using the `wp_remote_request()` method](https://developer.wordpress.org/reference/functions/wp_remote_request/), or get some data from your database.

For this example, we're going to use [the `is_user_logged_in()` method](https://developer.wordpress.org/reference/functions/is_user_logged_in/) to check if the current visitor is logged in.

```php
<?php

	/**
	 * Check if the user is logged in
	 */
	function my_app_manager_is_logged_in () {

		// Bail if not an Ajax request
		if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
			header('Location: ' . $_SERVER['HTTP_REFERER']);
			return;
		}

		// If the user is not logged in
		if (!is_user_logged_in()) {
			// Do something...
		}

		// Get the current user's email and send that along
		// Do something else...

	}
	add_action('wp_ajax_my_app_manager_is_logged_in', 'my_app_manager_is_logged_in');
	add_action('wp_ajax_nopriv_my_app_manager_is_logged_in', 'my_app_manager_is_logged_in');
```

### Send data back as a response

Finally, you want to actually send a response back to the Ajax call.

For that, we'll use the `wp_send_json()` method. Pass in an array of data you can use in your JavaScript. I like to include four items:

- A status code (`200`, `404`, etc.)
- A status type (`failed`, `success`, etc.)
- A status message (`There was an error calling this API. Please try again.`)
- If successful, the actual requested data

```php
<?php

	/**
	 * Check if the user is logged in
	 */
	function my_app_manager_is_logged_in () {

		// Bail if not an Ajax request
		if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
			header('Location: ' . $_SERVER['HTTP_REFERER']);
			return;
		}

		// If the user is not logged in
		if (!is_user_logged_in()) {
			wp_send_json(array(
				'code' => 401,
				'status' => 'failed',
				'message' => 'Not logged in.'
			));
		}

		// Get the current user's email
		$user = wp_get_current_user();
		wp_send_json(array(
			'code' => 200,
			'status' => 'success',
			'data' => array(
				'email' => $user->user_email
			)
		));

	}
	add_action('wp_ajax_my_app_manager_is_logged_in', 'my_app_manager_is_logged_in');
	add_action('wp_ajax_nopriv_my_app_manager_is_logged_in', 'my_app_manager_is_logged_in');
```

## Calling an endpoint with JavaScript

Once you've got an endpoint setup, you obviously are going to want to call it.

### Setting up a call

We're going to make a `POST` Ajax call to `/wp-admin/admin-ajax.php` at whatever the URL for your headless WordPress install is. Since our endpoint will reject anything that doesn't have an `X-Request-With` header, we need to add that as well.

Here's a helper function we can use and build on.

```js
var callHeadlessEndpoint = function () {

	// Set up our HTTP request
	var xhr = new XMLHttpRequest();

	// Setup our listener to process completed requests
	xhr.onreadystatechange = function () {

		// Only run if the request is complete
		if (xhr.readyState !== 4) return;

		// Process our return data
		if (xhr.status >= 200 && xhr.status < 300) {
			// Do something...
		}

	};

	// Create and send a POST request
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.open('GET', 'https://your-site.com/dashboard/wp-admin/admin-ajax.php');
	xhr.send();

};
```

### Calling the right endpoint

Remember that bit you added after `wp_ajax_` and/or `wp_ajax_nopriv_`? That's your endpoint name.

To call that endpoint, we want to add it as a query string variable to the URL, with a key of `action`.

Let's add an argument, `endpoint`, to our helper function, and append its value to the URL.

```js
var callHeadlessEndpoint = function (endpoint) {

	// Set up our HTTP request
	var xhr = new XMLHttpRequest();

	// Setup our listener to process completed requests
	xhr.onreadystatechange = function () {

		// Only run if the request is complete
		if (xhr.readyState !== 4) return;

		// Process our return data
		if (xhr.status >= 200 && xhr.status < 300) {
			// Do something...
		}

	};

	// Create and send a POST request
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.open('GET', 'https://your-site.com/dashboard/wp-admin/admin-ajax.php?' + endpoint);
	xhr.send();

};
```

Now, you can call your endpoint like this:

```js
callHeadlessEndpoint('action=my_app_manager_is_logged_in');
```

### Handling the data you get back

Now we're making a call, but we're not doing anything with the data.

Let's add a callback argument. You can pass in an anonymous or named function. The helper function will run the response through `JSON.parse()` and pass it into the `callback`.

```js
var callHeadlessEndpoint = function (endpoint, callback) {

	// Set up our HTTP request
	var xhr = new XMLHttpRequest();

	// Setup our listener to process completed requests
	xhr.onreadystatechange = function () {

		// Only run if the request is complete
		if (xhr.readyState !== 4) return;

		// Process our return data
		if (xhr.status >= 200 && xhr.status < 300) {
			callback(JSON.parse(xhr.responseText));
		}

	};

	// Create and send a POST request
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.open('GET', 'https://your-site.com/dashboard/wp-admin/admin-ajax.php?' + endpoint);
	xhr.send();

};
```

You would use it like this.

```js
// Process the API data
var handleLoggedInStatus = function (data) {

	// If the user is logged in
	if (data.code === 200) {
		console.log('Logged in with ' + data.data.email);
	}

	// Otherwise
	else {
		console.log('Not logged in yet.');
	}

};

// Call the endpoint
callHeadlessEndpoint('action=my_app_manager_is_logged_in', handleLoggedInStatus);
```

## Passing data *into* your headless WordPress instance

Sometimes, you want to take data from your front-end, pass it back to your headless WordPress instance, and do something with it.

For example, maybe you want to get an email address from a form field and use the MailChimp API to subscribe someone to your newsletter.

You can add more query string data to your `endpoint` argument in your `callHeadlessEndpoint()` function, like this.

```js
callHeadlessEndpoint('action=subscribe_to_newsletter&email=someone@gmail.com', handleNewsletterSubscription);
```

In your plugin, in your function for the endpoint, you can use the `$_POST` object to access this data.

```php
<?php

	/**
	 * Sign someone up to your newsletter
	 */
	function subscribe_to_newsletter () {

		// Bail if not an Ajax request
		if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest') {
			header('Location: ' . $_SERVER['HTTP_REFERER']);
			return;
		}

		// Get the user's email address
		$email = $_POST['email'];

		// Do some API call stuff and return a response

	}
	add_action('wp_ajax_subscribe_to_newsletter', 'subscribe_to_newsletter');
	add_action('wp_ajax_nopriv_subscribe_to_newsletter', 'subscribe_to_newsletter');
```

## Wrapping up

There's a *lot* of things you can do with this approach.

One really nice benefit of hooking into the `wp-ajax.php` file like this is that it automatically restricts use of your endpoints to your domain.

If you need to do cross domain endpoints, you can use the [WP REST API](https://developer.wordpress.org/rest-api/) to setup custom endpoints. But for most static site implementations, that's not really needed.

Hope that helps get you started!