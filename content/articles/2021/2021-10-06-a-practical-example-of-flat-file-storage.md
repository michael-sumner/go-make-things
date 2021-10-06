---
title: A practical example of flat file storage
date: 2021-10-06T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

In yesterday's article [on low upkeep software](/low-upkeep-software/), I mentioned my love of flat file storage.

> One of the more interesting approaches Jeff uses, and one I’ve done myself for some personal projects, is to store data as flat files.

One of my students asked me what exactly that means, so today, I wanted to explain a bit more and share a practical example.

Let's dig in!

## What _is_ flat file storage?

Rather than storing data in a database, you can store it in a file. Here's an example of a JSON file that contains simplified pricing details for my products.

```json
{
	"guides": {
		"ebook": 49,
		"video": 94,
		"both": 99
	},
	"academy": 995
}
```

Typically, you'd choose one that supports data formatting, like JSON or YAML or XML.

But, you could also use something like a text file with delimiters to separate details instead. It's not a good idea, but you could do it.

## Accessing flat file data

Many server-side languages include a method for reading a file's contents into a string. PHP has [the `file_get_contents()` method](https://www.php.net/manual/en/function.file-get-contents.php). Node.js has [the `readFile()` and `readFileSync()` methods](https://nodejs.org/api/fs.html#fs_filehandle_readfile_options).

Then, you can typically use another method to convert the string into a data format like JSON. In PHP, you might use [the `json_decode()` method](https://www.php.net/manual/en/function.json-decode.php). In Node.js, you might use the `JSON.parse()` method.

```php
// A PHP example
$file = file_get_contents('my-data.json');
$json = json_decode($file);
```

```js
// A Node.js example
let file = fs.readFileSync('my-data.json');
let json = JSON.parse(file);
```

Once you have the file in a data format, you can access any of the data you need on your server. You might...

- Use it to generate content
- Send it via an API
- Write data to it
- Delete data from it

If you make any changes, you can save the file back down.

In PHP, you might use [the `json_encode()`](https://www.php.net/manual/en/function.json-encode.php) and [`file_put_content()` methods](https://www.php.net/manual/en/function.file-put-contents.php). In Node.js, you might use the `JSON.parse()` and [`fs.writeFile()` methods](https://nodejs.org/api/fs.html#fs_filehandle_writefile_data_options).

```php
// A PHP example
$encoded = json_encode($json);
file_put_contents('my-data.json', $encoded);
```

```js
// A Node.js example
let encoded = JSON.stringify(json);
fs.writeFile('my-data.json', encoded);
```

## Is this a good idea?

In a large production app? Probably not. There's a reason databases are popular and widely used.

They can provide some security advantages. And with large datasets, can also be more performant than reading and writing to one large data file.

But for small and simple projects, I love being able to work with simple JSON files. It also makes debugging a lot easier.

## A practical example

This is the approach I use to render content on the student portal for people who purchase [my courses and ebooks](https://gomakethings.com/resources).

[I use Hugo](/series/hugo-and-static-site-generators/), a static-site generator, to create the HTML.

It takes my markdown files, combines them with some simple template files, and generates a bunch of flat HTML files. I have mine configured to omit most of the content from the HTML files themselves, and also generate a JSON file with the content.

That file gets placed in a directory that can't be accessed via an HTTP request. I use an `.htaccess` file to block all access.

```htaccess
deny from all
```

This blocks HTTP requests, but my server can still access the file.

I wrote a small little PHP-driven API that reads those files, checks if the user has access, and sends back a JSON response with the stuff they've purchased.

In my JavaScript, I make a `fetch()` call to my API, get the user's stuff, and display it in the UI.