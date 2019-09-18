---
title: "Documented code equals better code"
date: 2019-07-19T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

One of the dumbest pieces of feedback I've ever received in my life is:

> You over-document your code.

Nope. Sorry. No such thing.

One really good benefit I've found from documenting the shit out of your code in the code base itself: you notice things that could be done differently/less redundantly when forced to write about what you're doing and why.

For example, yesterday I was working on documenting the code for my new [drum machine project](https://vanillajsprojects.com).

For this project, I need to run some functions on both `keypress` and `click`. My code in the `click` events looked like this.

```js
// If the record button was pressed
// stop any active recording or loop
// and begin new recording sessions
if (event.target.matches('.btn-record')) {
	stop();
	startRecording();
	return;
}

// If the loop button was pressed
// stop any active recording or loop
// and begin loop
if (event.target.matches('.btn-loop')) {
	stop();
	startLooping();
	return;
}
```

And in the `keypress` events it looked like this.

```js
// If the key is "m"
// stop any active recording or loop
// and begin new recording sessions
if (event.key === 'm') {
	stop();
	startRecording();
	return;
}

// If the key is "p"
// stop any active recording or loop
// and begin loop
if (event.key === 'p') {
	stop();
	startLooping();
	return;
}
```

Before every `startRecording()` and `startLooping()` function, I'm always running `stop()` to stop any existing recordings or loops.

By running it separately, I call that same function four separate times. I also run the risk of forgetting to run it if I run `startRecording()` or `startLooping()` elsewhere.

So, I moved that function inside the `startRecording()` and `startLooping()` functions themselves.

Now it always runs automatically when they do, and I've removed some redundancy from my code. Here's the new `click` event code.

```js
// If the record button was pressed begin new recording sessions
if (event.target.matches('.btn-record')) {
	startRecording();
	return;
}

// If the loop button was pressed begin loop
if (event.target.matches('.btn-loop')) {
	startLooping();
	return;
}
```

And the new `keypress` event code.

```js
// If the key is "m" begin new recording sessions
if (event.key === 'm') {
	startRecording();
	return;
}

// If the key is "p" begin loop
if (event.key === 'p') {
	startLooping();
	return;
}
```