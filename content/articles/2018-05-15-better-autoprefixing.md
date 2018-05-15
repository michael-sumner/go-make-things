---
title: "Better autoprefixing"
date: 2018-05-15T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Web Performance
---

I love [using autoprefixer to automatically add vendor prefixes to CSS rules](https://github.com/postcss/autoprefixer) based on Can I Use data.

It lets me write vanilla, unprefixed CSS and offload that stuff to a system that will do it better than I can (this is what I meant yesterday when I wrote about [technology accelerating what humans do](/dont-throw-technology-solutions-at-people-problems/)).

## How autoprefixer works

For example, you can write this.

```css
::placeholder {
	color: gray;
}
```

And, depending on how you have it configured, it could output something like this for you.

```css
::-webkit-input-placeholder {
	color: gray;
}

:-ms-input-placeholder {
	color: gray;
}

::-ms-input-placeholder {
	color: gray;
}

::placeholder {
	color: gray;
}
```

It can also remove old, unused prefixes from your code for you. For example, this...

```css
a {
    -webkit-border-radius: 5px;
            border-radius: 5px;
}
```

Becomes this...

```css
a {
    border-radius: 5px;
}
```

## The problem with how it's often configured

I often see autoprefixer configured like this.

```js
browsers: ['last 2 version']
```

This is how I always saw it used, so it's how I configured mine a few years ago, too.

[Jamie Kyle pointed out a pretty big issue with this approach, though.](https://jamie.build/last-2-versions)

> When you say "We support the last 2 versions of every browser", you probably don't mean browsers like:
>
> - Internet Explorer Mobile (0.23% market share globally)
> - Blackberry Browser (0.07%)
> - Opera Mobile (0.01%)
> - QQ Browser (0%)
> - Baidu Browser (0%)
>
> But guess what? "last 2 versions" will always match those... forever.

Whoa. Good catch, Kyle! His recommendation instead?

```js
"browsers": [
	">0.25%",
	"not ie 11",
	"not op_mini all"
]
```

I'm not sure I'd drop optimization for Opera Mini, but I like this approach!