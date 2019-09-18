---
categories:
- Code
- JavaScript
date: '2017-04-19'
url: /default-values-for-javascript-variables/
title: Default values for JavaScript variables
---

Sometimes in JavaScript you want to provide a default value for a variable that can be overridden. That's super easy to do with the <code>||</code> operator.

<pre><code class="lang-javascript">var elem = document.querySelector('#some-element') || document.createElement('div');
</code></pre>

In the example above, <code>elem</code> will be set to the element on the page with the ID <code>some-element</code> if such an element exists. If not, an empty div will be created.

I use this all the time in my plugins, where users can pass in options, but don't have to.

<pre><code class="lang-javascript">var userOptions = options || {};
</code></pre>