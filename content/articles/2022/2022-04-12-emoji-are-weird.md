---
title: Emoji are weird
date: 2022-04-12T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to talk about emoji, and how weirdly JavaScript (and other programming languages) handle them.

Specifically, emoji never have a `length` property of `1`, which makes a lot of things harder than they should be. This came up during the current session of [the Vanilla JS Academy workshop](https://vanillajsacademy.com), and one of my students came up with a simple solution for counting emoji length.

Let's dig in!

## The problem

Let's look at the ice cream cone emoji: `🍦`. If you call the `length` property on it, you get a value of `2`.

```js
let str = '🍦';

// returns 2
str.length;
```

Why is that?

I'm by no means the first person to write about this. [Henri Sivonen provides one of the most detailed and clear explanations](https://hsivonen.fi/string-length/) I've ever read on the topic, using the facepalm emoji (`🤦🏼‍♂️`) as an example.

> The string contains a single emoji consisting of five Unicode scalar values: 
> 
> [click through to the article for the accompanying chart]
> 
> The string that contains one graphical unit consists of 5 Unicode scalar values. First, there’s a base character that means a person face palming. By default, the person would have a cartoonish yellow color. 
> 
> The next character is an emoji skintone modifier the changes the color of the person’s skin (and, in practice, also the color of the person’s hair). By default, the gender of the person is undefined, and e.g. Apple defaults to what they consider a male appearance and e.g. Google defaults to what they consider a female appearance. 
> 
> The next two scalar values pick a male-typical appearance specifically regardless of font and vendor. Instead of being an emoji-specific modifier like the skin tone, the gender specification uses an emoji-predating gender symbol (MALE SIGN) explicitly ligated using the ZERO WIDTH JOINER with the (skin-toned) face-palming person. (Whether it is a good or a bad idea that the skin tone and gender specifications use different mechanisms is out of the scope of this post.) 
> 
> Finally, VARIATION SELECTOR-16 makes it explicit that we want a multicolor emoji rendering instead of a monochrome dingbat rendering.

Different programming languages handle which _scalar values_ to count differently. 

In JavaScript, the facepalm emoji has a `length` of `7`. In Python 3, it's `5`. In Rust, its `17`.

So... how do you count an emoji as a single character, then?

## A simple solution to counting emoji as single characters

A lot of approaches I see use complex regex patterns to try to find and isolate emoji in strings. 

One of my students in my Academy workshop came up with a simpler solution: a `for...of` loop and a `count` variable.

```js
let str = '🍦🎉';
let count = 0;

for (let char of str) {
	count++;
}

// logs 2
console.log(count);

// logs 4
console.log(str.length);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/wvpxOJM?editors=1111)

It's a bit annoying to have to loop and count instead of just using the `length` property, but this approach is simple, readable, and works. Good enough for me!