---
categories:
- Code
- JavaScript
date: '2017-04-13'
title: Attaching multiple elements to a single event listener in vanilla JS
---

Let's say you have an accordion widget on your page, and you want to show or hide the corresponding content whenever one of five different links on a page is clicked.

In jQuery, these clicks are really easy to listen for:

<pre><code class="lang-javascript">$('.accordion-link').on('click', function () {
    // Do something...
});
</code></pre>

The vanilla JS equivalent of <code>.on()</code>, <code>addEventListener()</code>, can only be attached to a single element, not a set of them like in jQuery. How would you handle this?

You <em>could</em> add a separate event listener for every single accordion link on the page, but that would be madness.

<h2>There's an easier way: Event Bubbling.</h2>

An alternate approach is to listen for all clicks on the page by attaching your event listener to the <code>document</code> element. You can then check if the clicked element has the selector you care about.

<pre><code class="lang-javascript">document.addEventListener('click', function (event) {
    if ( event.target.classList.contains( 'accordion-link' ) ) {
        // Do something...
    }
}, false);
</code></pre>

This is known as event bubbling.

As a side benefit of this approach, you can dynamically add elements to the DOM without having to add additional event listeners. Everything just bubbles up and gets checked against our selector in real time.

Next, learn [how to run the same code on multiple events with vanilla JavaScript](https://gomakethings.com/listening-to-multiple-events-in-vanilla-js/). Bubbling not working for you? It may be related to [the use capture argument](https://gomakethings.com/wtf-is-use-capture-in-vanilla-js-event-listeners/).