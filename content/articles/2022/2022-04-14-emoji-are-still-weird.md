---
title: Emoji are still weird (but modern browser methods help)
date: 2022-04-14T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The other day, I wrote about [how emoji don't count as a single character](/emoji-are-weird/), and some of the challenges with counting them in a string. 

I also shared a simple trick for getting the number of emoji. Unfortunately, that trick falls apart pretty quickly with more complex emoji.

Today, I wanted to dig deeper, and share a modern browser API that fixes this problem. Let's dig in!

## The problem

The trick I shared uses a `for...of` loop and `count` variable to loop through a string and count the emoji in it.

```js
let str = '🍦🎉';
let count = 0;

for (let char of str) {
	count++;
}
```

In this example, `count` has a value of `2`.

A few readers shared alternate versions using [destructuring](/destructuring-in-javascript/) or [the `Array.from()` method](https://vanillajstoolkit.com/reference/arrays/array-from/) to convert the string to an array and check its `length`.

```js
let count1 = Array.from(str).length;
let count2 = [...str].length;
```

With the example `str` used, these all work. But some emoji actually count as more than two characters. The _facepalm_ emoji, for example, has a `length` of `5`.

```js
let str = '🍦🎉🤦‍♂️';
let count = [...str].length;
```

Here, `count` has a value of `6`, rather than the expected `3`.

## The `Intl.Segmenter()` object

The `Intl` API exposes a variety of methods that can be used to _Internationalize_ strings and numbers in a browser-native way.

One of the newer objects in the API is the `Intl.Segmenter()` object, which can be used to segment strings into characters, words, or sentences in a way that considers international conventions.

It's primary use is for languages with non-Roman characters (Mandarin, for example). [The MDN documentation for the API provides this explanation for how it differs from `String.split()`.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter)

> If we were to use String.prototype.split(" ") to segment a text in words, we would not get the correct result if the locale of the text does not use whitespaces between words (which is the case for Japanese, Chinese, Thai, Lao, Khmer, Myanmar, etc.).
> 
> ```js
> const str = "吾輩は猫である。名前はたぬき。";
> console.table(str.split(" "));
> // ['吾輩は猫である。名前はたぬき。']
> // The two sentences are not correctly segmented.
> ```

We can use this object to accurately count emoji in a string as well.

## Counting emoji in a string with the `Intl.Segmenter()` object

First, we'll create a new `Intl.Segmenter()` object.

While the constructor for this can accept a `locale` and object of `options` as arguments, they're both optional and we don't need either for this particular use.

```js
// Create a Segmenter object
let splitEmoji = new Intl.Segmenter();
```

Next, we'll run the `Intl.Segmenter.prototype.segment()` method on the `splitEmoji` object we created, and pass our string of emoji into it. This creates a `Segments` object.

```js
// Create a Segmenter object
let splitEmoji = new Intl.Segmenter();

// Segment the string
let str = '🍦🎉🤦‍♂️';
let segment = splitEmoji.segment(str);
```

Finally, we can convert the `Segment` object into an array, and get it's `length` property.

```js
// Create a Segmenter object
let splitEmoji = new Intl.Segmenter();

// Segment the string
let str = '🍦🎉🤦‍♂️';
let segment = splitEmoji.segment(str);

// Get the number of characters
let count = Array.from(segment).length;
```

Here, `count` has a value of `3`.

You can also shorten this into a one-liner if you'd like.

```js
// Get the number of characters
let count = Array.from(new Intl.Segmenter().segment(str)).length;
```

## Browser support

Now for the bad news: the `Intl.Segmenter()` method works in all modern browsers... except Firefox.

There are various polyfills out there, but I can't speak to how good one is over another. Because this API is intended for internationalization, they require you to import specific language dictionaries or configuration files to work.