---
categories:
- Design &amp; UX
date: '2014-04-03'
permalink: /why-mobile-first-and-progressive-enhancement-are-the-right-way-forward/
title: Why mobile-first and progressive enhancement are the right way forward
url: /2014/04/03/why-mobile-first-and-progressive-enhancement-are-the-right-way-forward
---

Last summer, <a href="https://gomakethings.com/adopting-a-dog-from-your-phone/">I predicted</a> that 2014 would be the year that mobile traffic cracked the 50-percent mark at <a href="http://www.pawsnewengland.com/">PAWS New England</a>.

Just three months into the year, and it's already happened.

<!--more-->

<h2>The Numbers</h2>

Over the last three years, traffic has grown by almost 5x. Desktop visitors now account for less than half of all traffic.

<table>
    <thead>
        <tr>
            <th></th>
            <th>All Traffic</th>
            <th>Mobile &amp; Tablet</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>May 2011</strong></td>
            <td>5,229</td>
            <td>468 (~9%)</td>
        </tr>
        <tr>
            <td><strong>May 2012</strong></td>
            <td>8,559</td>
            <td>2,035 (~23%)</td>
        </tr>
        <tr>
            <td><strong>January 2013</strong></td>
            <td>21,697</td>
            <td>7,894 (~36%)</td>
        </tr>
        <tr>
            <td><strong>August 2013</strong></td>
            <td>15,621</td>
            <td>6,987 (~45%)</td>
        </tr>
        <tr>
            <td><strong>March 2014</strong></td>
            <td>24,955</td>
            <td>12,917 (~52%)</td>
        </tr>
    </tbody>
</table>

<h2>The Devices</h2>

The PAWS New England website was accessed by 289 different mobile devices in March of 2014. These devices included a good number of high-end smart phones running Apple iOS and Android. They also included a long tail of not-so-smart and feature phones&mdash;including a healthy handful of old BlackBerry devices.

And as I discussed in <a href="https://gomakethings.com/adopting-a-dog-from-your-phone/">Adopting a dog from your phone</a>, people aren't just browsing. They're submitting adoption applications and making donations. Mobile is an essential part of our organization's success.

<h2>Mobile-First and Progressive Enhancement</h2>

Many of the long-tail devices that access the PAWS site have varying levels of support for things like icon fonts, modern JavaScript APIs, and even media queries.

By using a mobile-first code structure, and layering in JS functionality as a feature and not a requirement, we ensure that all users get an experience that's appropriate to the size of their screen and capabilities of their device. Content for everyone, advanced layouts and features for browsers and devices that support them.

This approach lets us support more users with less testing... and ultimately allows us to save the lives of more dogs.