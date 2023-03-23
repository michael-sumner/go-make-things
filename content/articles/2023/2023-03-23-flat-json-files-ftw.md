---
title: Flat JSON files FTW!
date: 2023-03-23T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In the past, I've written about [low-upkeep software](/low-upkeep-software/) and [my love of flat file storage](/a-practical-example-of-flat-file-storage/).

I recently migrated the portal my students use to access all of their courses and workshops to completely flat JSON files, and wanted to talk about how it works, why I did, and how well its working.

Let's dig in!

## How my student portal was setup

The student portal uses static HTML files built with Hugo.

The dashboard displays all of the stuff they've purchased, and individual pages show course or workshop content. Since that content (and access to it) can vary based on what someone's purchased, I make an API call to a backend, get back a JSON response with the user's purchases, and render the HTML for it with JavaScript.

Until a few weeks ago, [I'd been using a headless instance of WordPress](/the-tech-behind-my-javascript-education-platform/) to handle all the backend stuff for me.

It stored usernames and passwords, authenticated credentials, stored user session data, and handled API requests and responses.

## Performance problems

I run about a dozen or so static websites on a single DigitalOcean droplet. Every night at midnight, my server does a rebuild of each one (this is how I handle things like scheduled posts with a static site generator).

A few weeks ago, I started running into memory issues on the server.

Builds would fail because I'd run out of memory to run them. This had never been an issue in the past, and I hadn't made any changes to my setup. 

Except one.

There was a big WordPress update I'd installed. I did some debugging, and discovered the mySQL queries were using up a majority of my memory resources.

So, I decided to remove WordPress from the stack and switch to flat JSON files and a thin PHP API on top of it.

## How it works

I created some PHP files to server as API endpoints: `authenticate.php`, `account.php`, `products.php`, and so on.

I also created a directory on my server that cannot be access with HTTP requests. It's only available on the server. In that directory, I store flat JSON files with a hashed version of the user's password.

```bash
# The filename path
/private-directory/AwesomeUsername.json

# It might contain a string that looks like
$2y$10$tE4t9eHex2bRiZSzzi.7Tuiu8so2S12h/xwykAYPYO9p0bXsuD2iq
```

### Handling passwords and authentication

There was a time where you needed a library to hash and validate passwords with PHP. But the language now has built-in methods to do that: `password_hash()` and `password_verify()`.

They actually use a stronger hashing algorithm than WordPress does.

```php
<?php

// Hash a password
$hashed_password = password_hash('ThisIsNotASecurePassword', PASSWORD_DEFAULT);

// Validate a plaintext password against a hashed one
// This would return false
$is_valid = password_verify('IsThisMyPassword??', $hashed_password);
```

### Reading and writing data

In my PHP API files, I use the `file_get_contents()` and `file_put_contents()` functions to read and write data from JSON files, and `json_decode()` and `json_encode()` to convert strings to JSON and back again.

It's easy and fast, and way less confusing than writing a SQL query!

```php
<?php

// Get JSON from a file
$user_file = file_get_contents('/private-directory/AwesomeUsername.json');
$user = json_decode($user_file);

// Write data back down to a JSON file
// Setting a new password
$user['password'] = password_hash('ThisIsNotASecurePassword', PASSWORD_DEFAULT);
file_put_contents('/private-directory/AwesomeUsername.json', json_encode($user));
```

### Getting data from the API request

You can get the HTTP method used to make the request (`GET`, `POST`, etc.) using the `$_SERVER['REQUEST_METHOD']` property.

```php
<?php
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
	// Do something...
} else {
	// Do something else...
}
```

I used a helper function to get query string parameters, `POST` values, and any `body` data, and combine them all into a single array.

```php
<?php

/**
 * Get data object from API data
 * @return Object The data object
 */
function get_request_data () {
	return array_merge(empty($_POST) ? array() : $_POST, (array) json_decode(file_get_contents('php://input'), true), $_GET);
}

// Get the request data
$data = get_request_data();
```

### Responding to API requests

I created a `send_response()` helper function to respond to API requests.

It sets an `http_response_code()`, encodes a JSON `$response` to a string, then sends a response and ends the rest of the PHP file from running.

```php
<?php

/**
 * Send an API response
 * @param  *       $response The API response
 * @param  integer $code     The response code
 * @param  boolean $encode   If true, encode response
 */
function send_response ($response, $code = 200) {
	http_response_code($code);
	die(json_encode($response));
}
```

To use it, I might do something like this...

```php
<?php

// If the user's credentials are valid
if ($is_valid) {
	send_response(array(
		'status' => 'logged_in',
		'message' => 'You have successfully logged in.'
	));
}

// Otherwise, throw an error
send_response(array(
	'status' => 'failed',
	'message' => 'The username or password you provided is not valid.'
), 400);
```

## Performance improvements

After making the switch, my memory consumption dropped from 85 percent down to about 50 percent.

I still have a WordPress instance running for my ecommerce platform, but removing it from the student portal had a dramatic impact on the performance of my server.