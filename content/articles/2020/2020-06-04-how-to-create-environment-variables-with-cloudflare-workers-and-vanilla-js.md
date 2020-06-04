---
title: "How to use environment variables with CloudFlare Workers and vanilla JS"
date: 2020-06-04T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

On Monday, we learned [how to create a middleman API with CloudFlare Workers and vanilla JS](/how-to-create-a-middleman-api-with-cloudflare-workers-and-vanilla-js/).

Today, we're going to learn how to store API credentials (and other sensitive info) in an *environment variable* to add an extra layer of safety.

## What's an environment variable?

An *environment variable* is a variable that you can store in your *server environment* and access in your server-side code.

Environment variables are traditionally stored in an `.htaccess` or `.env` file. These are files that live on your server, but typically aren't committed to your code base's version control system.

Environment variables are defined in uppercase, without any spaces or special characters. In an `.htaccess` file, you would write `SetEnv`, then the variable name, followed by the value itself (without any quotes around it).

```apache
SetEnv API_KEY 123abc
```

NodeJS, PHP, and many other server-side languages include methods you can use to get values from environment variables.

```js
// NodeJS
process.env.API_KEY
```

```php
// PHP
getenv('API_KEY')
```

```python
# Python
os.environ['API_KEY']
```

CloudFlare Workers makes using environment variables pretty easy. Let's take a look.

## How to set an environment variable in CloudFlare Workers

<img alt="A screenshot of the CloudFlare Workers environment variable interface" src="/img/articles/cloudflare-workers-envar.jpg">

1. Log into [your CloudFlare Workers account](https://workers.cloudflare.com/)
2. Click on the "Workers" tab in the right-hand sidebar
3. Click on the endpoint you want to add an environment variable to
4. Click the "Settings" tab
5. Under "Environment Variables," click "Add variable"
6. Type the name and value of your variable
7. If you want to mask it so no one can ever view the value, click the "Encrypt" button
8. Click "Save"

## How to use an environment variable in a CloudFlare Worker

You can access environment variables in your workers the same way you would a typical JavaScript variable.

Here's an example using the *New York Time*s API.

```js
var resp = await fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key' + API_KEY);
```

Or, if you're using template literals, like this.

```js
var resp = await fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`);
```

If you're using the CloudFlare Worker CLI tool to manage your code, or if you backup your files in git, this allows you to use sensitive information without actually exposing it in your code.