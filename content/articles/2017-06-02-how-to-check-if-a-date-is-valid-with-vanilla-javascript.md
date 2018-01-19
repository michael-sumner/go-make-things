---
categories:
- Code
- JavaScript
date: '2017-06-02'
title: How to check if a date is valid with vanilla JavaScript
---

While working on a form validation project recently, I needed a way to validate if a date was actually valid or not.

For example, March 30 is a real date, but February 30 doesn't exist. February 29 exists only on leap years. I stumbled upon <a href="https://stackoverflow.com/a/1433119/1293256">this set of JavaScript methods</a> that validates dates (including checking for leap years).

<pre><code class="lang-javascript">/**
 * Get the number of days in any particular month
 * @link https://stackoverflow.com/a/1433119/1293256
 * @param  {integer} m The month (valid: 0-11)
 * @param  {integer} y The year
 * @return {integer}   The number of days in the month
 */
var daysInMonth = function (m, y) {
    switch (m) {
        case 1 :
            return (y % 4 == 0 &amp;&amp; y % 100) || y % 400 == 0 ? 29 : 28;
        case 8 : case 3 : case 5 : case 10 :
            return 30;
        default :
            return 31
    }
};

/**
 * Check if a date is valid
 * @link https://stackoverflow.com/a/1433119/1293256
 * @param  {[type]}  d The day
 * @param  {[type]}  m The month
 * @param  {[type]}  y The year
 * @return {Boolean}   Returns true if valid
 */
var isValidDate = function (d, m, y) {
    m = parseInt(m, 10) - 1;
    return m &gt;= 0 &amp;&amp; m &lt; 12 &amp;&amp; d &gt; 0 &amp;&amp; d &lt;= daysInMonth(m, y);
};
</code></pre>

To use it, call <code>isValidDate()</code> with your day, month, and year as arguments. It uses the <code>daysInMonth()</code> helper method to check if your day actually exists in that month in that particular year.

For example...

<pre><code class="lang-javascript">isValidDate(30, 3, 2017); // March 30, 2017 - true
isValidDate(29, 2, 2017); // February 29, 2017 - false
isValidDate(29, 2, 2016); // February 29, 2016 - true
</code></pre>