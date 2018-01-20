---
categories:
- Code
- JavaScript
date: '2017-11-29'
url: /let-var-and-const/
title: let, var, and const
---

ES6 introduced two new ways to define variables: <code>let</code> and <code>const</code>.

They've been the source of a fair bit of confusion, particularly around when to use which. Let's clear that up.

<h2><code>let</code></h2>

<code>let</code> does the <em>almost</em> the same exact thing as <code>var</code>.

The big difference between <code>let</code> and <code>var</code> is that you can't redefine a variable set with <code>let</code> in the same scope.

<pre><code class="lang-javascript">// The value of `sandwich` is "tuna"
var sandwich = 'tuna';

// The value of `sandwich` is now "chicken"
var sandwich = 'chicken';

// The value of `chips` is "Cape Cod"
let chips = 'Cape Cod';

// Throws an error: "Uncaught SyntaxError: Identifier 'chips' has already been declared"
let chips = 'Lays';
</code></pre>

You can still change the value of <code>chips</code>. You just can't define it as a new variable once it's already been defined <em>within the current scope</em>.

You <em>can</em> use <code>let</code> to define a new variable with the same name in a different scope, though.

<pre><code class="lang-javascript">// The value of `chips` is "Cape Cod"
let chips = 'Cape Cod';

// The value of `chips` is now "Lays"
chips = 'Lays';

var getChips = function () {

    // This works because it's a different scope
    let chips = 'Wise';

    // Returns "Wise"
    return chips;

};

// Logs "Lays" in the console
console.log(chips);
</code></pre>

<h2><code>const</code></h2>

Unlike <code>var</code> and <code>let</code>, if you define a variable with <code>const</code>, it cannot be given a new value. It is, as the term implies, constant.

<pre><code class="lang-javascript">// The value of sandwich is "tuna"
const sandwich = 'tuna';

// Throws an error: "Uncaught TypeError: Assignment to constant variable."
sandwich = 'chicken';
</code></pre>

<h2>Browser Compatibility</h2>

<code>let</code> and <code>const</code> work in all modern browsers, and IE11 and up. They cannot be polyfilled.

To push support back further, you would need to use a compiler like <a href="https://babeljs.io">Babel</a>. Babel does actually have an "in the browser" version you can load with a script tag, <em>but...</em> it requires you to inline your entire script, so it's not really a good solution for production sites.