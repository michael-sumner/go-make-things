---
title: "Callback hell is a myth"
date: 2018-08-31T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
- Web Performance
---

Earlier this year, I wrote a bit about [promises and callbacks when making API calls](/promise-based-xhr/#why-promises-are-great).

> Imagine you’re making an API call. You get back a list of posts. Then you want to make another call to get details on the first post in the list. Then you want to take that data and clean it up a bit before finally using it to render some DOM content.
>
>Here’s what that might look like in a traditional callback model.
>
> ```js
> getPosts('https://some-api.com/posts', function (posts) {
>  	getFirstPost('https://some-api.com/post/' + posts[0].id, function (post) {
>		scrubData(post, function (postData) {
>			renderPostInDom(postData);
>		});
>	});
> });
> ```
>
> This is often referred to as “Callback Hell,” and Promises help fix it by allowing you to chain methods together using `.then()`, which does exactly what it sounds like. First this, then that, then that, then that.

The thing is, I've never really had a situation where I've encountered the crazy nesting doll situation that most folks think of when they talk about callback hell. It's generally been a non-issue for me.

Last week, I stumbled across [Valeri Karpov's 2015 article, "Callback hell is a myth."](http://thecodebarbarian.com/2015/03/20/callback-hell-is-a-myth) I was intrigued.

Valeri makes two assertions:

1. Most callback hell situations can be avoided by *writing better code*.
2. The pain callbacks can cause is a warning side that our code is poorly written.

> Much like how the pain of your hands burning means you mistakenly picked up a hot pot in the kitchen, or a headache in the morning means you drank too much last night, the pain of dealing with 10 layers of nested callbacks in a single function means you desperately need to refactor. The small friction introduced by writing a callback is just enough to make you twice about "is this extra I/O really necessary, or can I design this in a better way?"

[Its worth reading the whole thing.](http://thecodebarbarian.com/2015/03/20/callback-hell-is-a-myth)