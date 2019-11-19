---
title: "Location-based pricing"
date: 2019-11-19T10:30:00-05:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- WordPress
---

For the last year or so, I've offered *location-based pricing*.

Customers who live in countries where the exchange rate and local economy make my products more expensive relative to their income level than they would be for someone in the US can purchase my products at a reduced price.

This week, I made some improvements to the program, and wanted to share them with you.

## Why I do this

I first heard about localized pricing from [Wes Bos](https://wesbos.com/courses/), who offers what he calls *pricing parity* on many of his courses. Implementing something like it for my products sat on my to do list for a while.

Then, one day, I got an email from a student in Africa who was having issues getting his credit card to process.

From chatting with him, I learned that he had saved for months to purchase what would be, for someone in the US, an impulse purchase that would cost them less than a days work. For this student, though, it was the equivalent of over a weeks salary.

This felt inherently unfair.

I offered him a special discount code that reduced the price to be more inline, as a percentage of the average salary in house country, with what someone in the US would be pay.

Then I set about figuring out how to formalize this into an automated program for people around the globe.

## What's new?

The old program required customers to enter a location-specific discount code.

This was problematic for two reasons:

1. If someone didn't notice or know about the code, or forgot to enter it, they would pay full US price.
2. My system only allows one discount code to be used per purchase. If I was running a sale, that means they'd have to choose between localized pricing or the sale price, which feels unfair. The localized price is supposed to be the baseline rather than a "discount."

<img alt="A checkout cart with localized pricing messaging" src="/img/articles/pricing-parity.jpg">

The new system automatically detects your location and then adjusts the price of every product in your cart.

Because it doesn't use a discount code anymore, you can still take advantage of sales and promotions on top of your localized price. It also means people can't forget to use it.

If you qualify, I surface some messaging telling you about it and show the before/after price right in the cart.

## How I implemented location-based pricing

My checkout system uses [Easy Digital Downloads (EDD)](http://easydigitaldownloads.com), a WordPress plugin.

Because WordPress is so flexibile, I [wrote a plugin that extends EDD](https://github.com/cferdinandi/gmt-pricing-parity/). It uses [GeoLite 2 data from MaxMind](https://www.maxmind.com/en/home) to detect the customer's location, and hooks into how EDD renders the cart and calculates pricing to update everything.

I'm really happy with how this all turned out, and I'm glad I was able to get it implemented before my big Black Friday/Cyber Monday sale in two weeks.