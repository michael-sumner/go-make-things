---
title: "WTF is gzipping (and how is it different from minification)?"
date: 2019-11-11T10:30:00-05:00
draft: false
categories:
- Code
- Web Performance
---

Reader Kieran Barker asked me to write an article about what gzipping is, and how it's different from minification. Great idea!

## Gzipping

The `.gzip` format is a compressed file format, a lot like `.zip`. It reduces the size of your files by, on average, 70 percent. That's huge!

Gzipping a file means sending it down the wire in this compressed format.

The cool thing about gzipped files is that they can be sent compressed in that format from the server, and browsers can unzip them and run them on-the-fly. Even though that involves some work for the browser, because the how much it reduces the size of files, it has a dramatic improvement on performance.

For example, the combined HTML, CSS, and JavaScript for Friday's article on [how I structure my JavaScript projects](/how-i-structure-my-vanilla-js-projects/) is 37.9kb. That's 3 round trip HTTP requests.

After gzipping, the total size is just 11.4kb, a single request. That's a massive reduction in size.

### How to gzip your files

You can enable gzipping on your server.

In your site is hosted on an apache server, you'll need to modify your `.htaccess` file. [The HTML5 Boilerplate has the most comprehensive setup.](https://github.com/h5bp/html5-boilerplate/blob/master/dist/.htaccess#L806)

With ngingx, you'll need to [modify your config file](https://varvy.com/pagespeed/enable-compression.html).

You can test if gzipping is enabled by opening the *Network* tab in your browser's developer tools. Each resource will show two numbers: the actual size, and the transferred size.

If the transferred size is smaller (by a meaningful amount), gzip is enabled.

Make sure to check the *Disable cache* button before testing, though.


## Minification

Minification is the process of removing comments and white space from your code.

Modern minifiers, like [TerserJS](https://terser.org/), also rewrite variable names to make them as small as possible, and sometimes make other optimizations as well.

For example, let's say you passed in code like this (this is not well optimized):

```js
/**
 * Add one or more numbers together
 * @param  {Number} The numbers to add
 * @return {Number} The total
 */
var add = function () {

	// Convert the arguments object to an array
	var numbers = Array.prototype.slice.call(arguments);

	// Setup a total
	var total = 0;

	// Loop through each number and add it to the total
	numbers.forEach(function (number) {
		total = total + number;
	});

	return total;

};
```

Terser would return something like this:

```js
var add=function(){var r=Array.prototype.slice.call(arguments),a=0;return r.forEach(function(r){a+=r}),a};
```

As you can see, all of the comments are gone. The internal variables like `numbers` and `total` have been renamed (`r` and `a`, respectively, in this case).

Even `total = total + number` has been rewritten to `total += number` (when then becomes `a+=r` after the variables are renamed).

The amount of bytes minification saves you can vary wildly depending on how much your code can be optimized and how liberal you are about comments and whitespace.

I optimize my code for readibility over brevity, so a minifier saves me a lot of file size. Your mileage may vary.

### How to minify your code

You can use a command line tool like [Terser](https://terser.org/). Or, you can use a GUI like [CodeKit](https://codekitapp.com/) or [Prepros](https://prepros.io/).

They all do more-or-less the same thing, so pick the one you're most comfortable with.

## Should you gzip, minify, or both?

Some developers say that gzipping has so much more of an impact than minifying that minification isn't worth the hassle.

Yes, gzipping has a *much* bigger impact than minifying. But gzipped *and* minified files are always smaller than ones that are just gzipped. Is it enough to make a difference, though? It depends.

[I did some testing on this last year.](/does-minification-actually-matter/) My key takeaway was that if you care about performance, always do both.