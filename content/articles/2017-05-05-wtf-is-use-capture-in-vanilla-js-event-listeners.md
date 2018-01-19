---
categories:
- Code
- JavaScript
date: '2017-05-05'
title: WTF is `use capture` in vanilla JS event listeners?
---

A few weeks ago, I shared an approach to writing event listeners known as <a href="https://gomakethings.com/attaching-multiple-elements-to-a-single-event-listener-in-vanilla-js/">event bubbling</a>.

The last argument in <code>addEventListener()</code> is <code>useCapture</code>, and it specifies whether or not you want to "capture" the event. For most event types, this should be set to <code>false</code>. But certain events, like <code>focus</code>, don't bubble.

Setting <code>useCapture</code> to <code>true</code> allows you to take advantage of event bubbling for events that otherwise don't support it.

<pre><code class="lang-javascript">// Listen for all focus events in the document
document.addEventListener('focus', function (event) {
    // Run functions whenever an element in the document comes into focus
}, true);
</code></pre>

***Update:*** *Not sure when to actually use `use capture`? [Here's how to figure it out.](/when-to-use-use-capture-in-your-event-listeners/)*