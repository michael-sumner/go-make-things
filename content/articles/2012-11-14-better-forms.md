---
categories:
- Code
date: '2012-11-14'
excerpt: A simple tip for more usable forms using HTML5.
title: Better Forms
---

Ever notice how on some sites, the keyboard on your iPhone or Android changes based on what you're doing?

Entering a URL? Here's a .com button. Entering an email address? The @ symbol is conveniently located on the main keyboard.

This feature improves the usability of your site on mobile devices. It's actually really easy to implement, and it's already built-in to the <a href="https://gomakethings.com/go-mobile-first/">Go Mobile First</a> theme.

Here's how to add it to your site...
<!--more-->
<h2>Changing Input Type</h2>

Just a quick heads up: this is an HTML5 feature.

Most input fields have a <code>type="text"</code> tag associated with them. For URLs, change this to <code class="language-markup">type="url"</code>. For email addresses, <code>type="email"</code>. There's a <a href="http://diveintohtml5.info/forms.html">bunch of stuff</a> you can do with numbers, too.

What about older browsers that don't support HTML5? They'll treat the new tags like they're <code>type="text"</code>, so nothing breaks.

Learn more at <a href="http://diveintohtml5.info/forms.html">Dive Into HTML5</a>.

<h2>Bonus: Required Fields</h2>

Content Management Systems like WordPress do server-side validation on forms and kick out an error if a required field is left blank. However, this requires your site to send data to the server, get a reply, and then reload the page. Not the fastest way to do things.

HTML5 offers browser-based form validation. Just add <code>required</code> to the required field, and modern browsers will generate an error if it's left blank. Once again, older browsers just ignore it.

<h4>Referenced & Useful Links</h4>

<ol>
<li><a href="https://gomakethings.com/go-mobile-first/">Go Mobile First</a></li>
<li><a href="http://diveintohtml5.info/forms.html">Dive Into HTML5</a></li>
</ol>