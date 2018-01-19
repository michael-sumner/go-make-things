---
categories:
- Code
- Design &amp; UX
date: '2014-01-27'
permalink: /password-usability/
title: Password Usability
url: /2014/01/27/password-usability
---

For the last few months, Luke Wroblewski has been advocating for <a href="http://www.lukew.com/ff/entry.asp?1653">more usable password fields</a>:

<blockquote>
  Here’s how a typical password field works: you enter a character, it displays a “secure” response in the form of a &bull;. What’s wrong with that, you may ask? Very simply put, there’s no way for you to check your work by seeing what you entered. Which turns out to be very useful when you’re forced to use a minimum amount of characters, some punctuation, and the birthdate of at least one French king for your password. So people often submit incorrect passwords and head into downward usability spirals.
</blockquote>

The problem is even worse on mobile devices, where tiny buttons, fat thumbs, and a lack of tactile feedback make it even easier to type in the wrong thing.

<!--more-->

<h2>A Solution</h2>

The recommended solution? Give users the option of hiding or showing their password as they type. That's what Luke does on his web and mobile app, <a href="">Polar</a>. Several others, including <a href="https://twitter.com/lukew/status/422236238444126209">Microsoft</a>, <a href="https://twitter.com/lukew/status/422231021250035712">Amazon</a>, and <a href="https://twitter.com/lukew/status/422231536172146688">LinkedIn</a>, have taken this approach as well.

<img src="https://gomakethings.com/wp-content/uploads/2014/01/login-pw.png" alt="A screenshot of the Polar app login screen" width="395" height="315" class="aligncenter img-border size-full wp-image-5197" />

The team at Cloud Four wrote <a href="http://blog.cloudfour.com/hide-show-passwords-plugin/">a handy little script</a> for enabling this type of behavior. Unfortunately, it's dependent on jQuery and comes pre-styled. That's great if you want something plug-and-play, but it doesn't give you as much flexibility as a developer.

<h2>Introducing X-Ray</h2>

This is all a long winded way of introducing <a href="http://cferdinandi.github.io/x-ray/">X-Ray</a>, a framework-free, style-agnostic, progressively-enhanced script I wrote that lets users show and hide passwords.

<img src="https://gomakethings.com/wp-content/uploads/2014/01/show-hide-pw.png" alt="A screenshot of X-Ray" width="467" height="248" class="aligncenter img-border size-full wp-image-5204" />

You can turn any button or link into a password visibility toggle by adding an <code>.x-ray</code> class to it. Data attributes let you set which password field to toggle, and whether the password should be hidden or visible by default. You can change the toggle text/graphics based on whether or not the password is visible, too.

Modern HTML5 browsers get the enhanced experience, while older browsers receive a traditional field with a masked password.

<a href="http://cferdinandi.github.io/x-ray/">Download X-Ray on Github.</a>