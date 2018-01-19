---
categories:
- Code
- WordPress
date: '2015-06-19'
permalink: /preventing-email-spam-without-using-a-lame-contact-form/
title: Preventing email spam without using a lame contact form
url: /2015/06/19/preventing-email-spam-without-using-a-lame-contact-form
---

Contact forms suck. But so does the email spam that happens when you post your raw email address on your website.

Fortunately, there's a really easy way to make that go away.

<h2>Encoding your email address</h2>

Encode your email address into character entities. This transforms an email like <code>some@email.com</code> into <code>&amp;amp;#115;&amp;amp;#111;&amp;amp;#109;&amp;amp;#101;&amp;amp;#064;&amp;amp;#101;&amp;amp;#109;&amp;amp;#097;&amp;amp;#105;&amp;amp;#108;&amp;amp;#046;&amp;amp;#099;&amp;amp;#111;&amp;amp;#109;</code>.

This renders as a readable characters to your visitors (including those with screen readers), but looks like gibberish to a spam bot.

It's not just for email, either. You can encode phone numbers, too.

There's a <a href="http://wbwip.com/wbw/emailencoder.html">free online tool</a> you can use. If you're a WordPress user, you can also use <a href="https://codex.wordpress.org/Protection_From_Harvesters">their native <code>antispambot()</code> method</a>. I wrote a plugin for <a href="https://github.com/cferdinandi/antispambot">using it in the text editor</a>.