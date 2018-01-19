---
categories:
- Code
- JavaScript
date: '2017-04-20'
title: Shuffling JavaScript array values
---

This tip comes from <a href="https://blog.jscrambler.com/12-extremely-useful-hacks-for-javascript/">John Howard's 12 Extremely Useful Hacks for JavaScript article</a>.

If you ever need to randomly sort an array of items in JavaScript, here's a simple function to help you do so:

<pre><code class="lang-javascript">var shuffle = function (arr) {
    // Create a clone of the array so that we don't shuffle the original one
    var arrClone = arr.slice(0);
    // Shuffle the array
    return arrClone.sort(function() {
        return Math.random() - 0.5
    })
}
</code></pre>

To use it, pass in any array.

<pre><code class="lang-javascript">var flavors = ['chocolate', 'vanilla', 'coffee', 'strawberry'];
var shuffledFlavors = shuffle( flavors );
// ex. return ["coffee", "vanilla", "strawberry", "chocolate"]
</code></pre>