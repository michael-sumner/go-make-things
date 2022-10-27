---
title: How I implement location-based pricing for my courses and workshops
date: 2022-06-08T10:30:00-04:00
draft: false
categories:
- Business and Leadership
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
---

For the last four years, I've offered automatic location-based pricing adjustments on all of my courses and workshops.

Customers who live in countries where the exchange rate and local economy make my products more expensive relative to someone living in the US can purchase my products at a reduced price.

Today, I wanted to share how I actually implement this, including how I figure out what the adjustments for various countries should be.

Let's dig in!

## Why offer location-based pricing?

A few years ago, I got an email from someone in Africa who had been saving for months to purchase my course bundle.

What would cost a student in the US less than a days work was going to cost this person the equivalent of over a weeks salary. That felt deeply unfair.

I'd heard of the concept of "pricing parity" from [Wes Bos](https://wesbos.com/) a year or two earlier, but this email pushed me to implement it on my own products as well.

If you need a more selfish reason to offer location-based pricing: in the months after I implemented it, my revenue grew by about 50 percent as a massive amount of potential customers who couldn't afford my products before suddenly could.

The experience has been overwhelming positive!

## How to implement location-based pricing

First, let's talk about how it works at a high-level, then I'll explain my specific setup.

1. Create an object of countries that should get a discount, and how much of a discount they should get.
2. Using the requesting IP address, identify which country a visitor is browsing from.
3. Check if that country is in the object of countries that should get a discount.
4. If it is, show them a message letting them know, and apply that discount to their total at checkout.

For example, if your checkout system was powered by JavaScript, your object of discounts might look like this...

```js
let discounts = {
	brazil: 0.63,
	cambodia: 0.65,
	chile: 0.45,
	// ...
};
```

Using an API or a server-side library, you would get the visitor's country. Then, you would check for that country in the `discounts` object.

```js
// returns "Brazil"
let country = getVisitorCountry();

// Check for a discount
let discount = discounts[country.toLowerCase()];
```

If there's a `discount` for them, show it in the UI.

```js
if (discount) {

	// Get the discount message element
	let pricingParity = document.querySelector('#pricing-parity');

	// Show message
	pricingParity.innerHTML = `Looks like you're from ${country}, where this might be a bit expensive. A discount of ${discount * 100}% will automatically be applied to your cart at checkout to make the price more fair.`;

}
```

Finally, in your checkout system, you'll need to apply that discount to the actual purchase price before charging their credit card or PayPal account or whatever.

To do this, multiply the price by the discount (as a fraction), then subtract it from the regular price.

```js
if (discount) {

	// Subtract the discount amount from the normal price
	// Reassign the price variable to the new amount
	price = price - (price * discount);

}
```

## How I implement location-based pricing with Easy Digital Downloads

While [my website is powered by Hugo](/series/hugo-and-static-site-generators/), a static site generator, my checkout system actually runs on a WordPress install with [Easy Digital Downloads (EDD)](https://easydigitaldownloads.com/)

I chose this setup because...

- I wanted to host my own checkout platform rather than using something third-party.
- WordPress is very extensible, so it's easy for me to customize the experience to match the user experience I want for my customers.
- It's easy to add custom APIs for additional integrations (this is how I provide access to courses on a separate portal).

[I wrote a plugin that extends EDD with pricing parity support.](https://github.com/cferdinandi/gmt-pricing-parity/)

It adds a custom post type for _Pricing Parity Discounts_ that I can use to add discount details for various countries. It also uses [GeoLite 2 data from MaxMind](https://www.maxmind.com/en/home) to detect the customer’s location, and match it against a discount.

<img alt="A checkout cart with localized pricing messaging" src="https://gomakethings.com/img/articles/pricing-parity.jpg">

The plugin adds an API I can use to get that discount information and display it on [my various product sites](/resources/). And most importantly, it automatically applies that discount in to the checkout cart.

## How do you decide what the discounts should be?

For years, I used a really basic formula:

```
1 - ( {Location Web Dev Salary} / {US Web Dev Salary } )
```

For example, the average annual web developer salary in Brazil is, according to one site, $24,900 BRL, which converts to $5,132 USD.

I would divide that into $70,000, the average mid-career web developer salary I found at the time, and subtract it from `1` to get my fractional discount.

```js
// returns 0.93
let discount = 1 - (5132/ 70000);
```

The problem with this formula is that it doesn't account for various other economic factors like cost of housing, healthcare, food, and so on.

It sometimes resulted in discounts for affluent European countries with lower salaries but dramatically lower costs of living.

I've looked into various calculators and third-party APIs, and even tried to do my own math on the Big Mac Index. I never felt confident about the results.

~~But then I found [this Pricing Parity Calculator](https://www.exportator.com/purchasing-power-parity-pricing-calculator) that uses data from the OECD and World Bank. It's simple, clear, and I can reason about the math.~~

The calculator I used to use went offline after Heroku got rid of their free plans. I now use [the PPP API](https://purchasing-power-parity.com/), but manually store discount amounts for supported countries rather than calling it live for each purchase.

## What about cheaters?

The most common question I get about location-based pricing is... can't someone just use a VPN to get a discount from a country they don't live in?

Yep! But there's a good pretty good chance that person wouldn't have purchased it at the regular price anyways, and I'm not going to punish all of my wonderful, honest customers because of a few shitty people.

I know of at least one other person in the developer education space who restricts access to the country of purchase if you get a location-based pricing discount. So if, for example, you purchased a course with a "from Brazil" discount, you can only access that course with a Brazil-based IP address.

Frankly, that's bullshit.

What happens if you move? You have to buy the course again? What about if you're traveling for work? You can't learn on the road? What if IP addresses change and the system thinks you're in a country you're not? Sorry, out of luck!

I've found that if you treat people like they're honest, that's how they act.

## Hiccups and gotchas

There are two challenges with maintaining a system like this.

First, economies are constantly in flux. The discount amounts change over time. Sometimes countries that have discounts today might not in the future, or vice versa.

Manually checking the shifting data is annoying, and I don't do it very often.

Similarly, the countries that various IP addresses map to change over time as well. The GeoLite 2 data from MaxMind that I use is a manually included database that I have to update every now and then.

If you don't, it can give discounts to people who live in nearby-but-not-the-country-they're-actually-from discounts, or not give them one at all when they should get one.

For example, I once had a student from Bangladesh get a "Looks like you're from India" message. While the discount amount was similar, because of the political history between India and Bangladesh, that might not be very well-received.

Despite these rough edges, I recommend location-based pricing for anyone who runs an education product business.

I've been able to teach students from all of the world, in countries where I'd otherwise never have been to reach. It's been an amazing experience, and I can't recommend it enough.