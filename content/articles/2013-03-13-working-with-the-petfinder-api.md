---
categories:
- Design &amp; UX
date: '2013-03-13'
permalink: /working-with-the-petfinder-api/
title: Working with the Petfinder API
url: /2013/03/13/working-with-the-petfinder-api
---

The <a href="http://www.pawsnewengland.com/">PAWS New England</a> dog rescue website is responsive, but the Petfinder widget they were using to display the dogs they have available for adoption was not.

Last month, I built them a <a href="http://www.pawsnewengland.com/our-dogs/">custom solution using the Petfinder API</a>. Today, I wanted to talk about my experience implementing it.
<!--more-->
<h2>Working with a Grid</h2>

<img src="https://gomakethings.com/wp-content/uploads/2013/03/petfinder-api-responsive.jpg" alt="Screenshots of the PAWS Petfinder API on an iPhone, iPad, and laptop" width="640" height="250" class="aligncenter size-full wp-image-4256" />

Adopting a dog is both a logical decision (size, energy level, etc.) and an emotional one (this dog is cute/manly/awesome). I wanted to tap into both sides of the decision-making process by displaying big, beautiful photos of dogs alongside key information.

One of the things I love about working with responsive grids like <a href="http://cferdinandi.github.com/kraken/">Kraken</a> (which powers the PAWS website) is how flexible they are. Building a responsive showcase for PAWS dogs was as simple as tying into the existing grid.

Potential adopters can search for their new best friend on any device with an internet connection.

<h2>Cached for Faster Loading</h2>

APIs can be slow, and Petfinder's is no exception.

The biggest factor impacting Petfinder API performance was the number of animals you were requesting information for. PAWS saves hundreds of animals each year, and we obviously want people to see all of the dogs they have available.

The API was taking upwards of 60 seconds to load, and because their site is powered by WordPress and generated on-demand, nothing would display until the API was finished rendering. Not good.

The solution to this was really simple.

The PAWS website already uses the <a href="http://wordpress.org/extend/plugins/quick-cache/">Quick Cache plugin</a> to increase site performance. The plugin pre-builds the dog list page once an hour and serves that, eliminating the need to ping to the API every time someone wants to see a list of dogs.

<h2>Client-Side Filtering</h2>

<img src="https://gomakethings.com/wp-content/uploads/2013/03/petfinder-api-sort.jpg" alt="A screenshot of the PAWS Petfinder API sort functionality" width="361" height="226" class="aligncenter img-border size-full wp-image-4265" />

There are a lot of different things you might look for when adopting a dog.

Puppy or older dog? Small, large, or somewhere in between? Male or female? How are they with other dogs? With cats? Only interested in certain breeds?

I wrote a simple jQuery script that allows for real-time, client-side filtering.

Rather than rebuilding the page each time someone changes criteria, everyone gets the same HTML (which allows us to take advantage of the cache plugin I mentioned earlier). Each dog is assigned classes for various things: gender, age, breed and so on. When you toggle one of the filters, the jQuery script looks for dogs who match that class and hides or shows them based on your criteria.

Very lightweight. Very fast.

<h2>Progressively Enhanced</h2>

<img src="https://gomakethings.com/wp-content/uploads/2013/03/paws-progressive-enhacement.jpg" alt="A screenshot of a progressively enhanced PAWS dog listing" width="640" height="408" class="aligncenter img-border size-full wp-image-4296" />

Given the diversity of devices that can access the internet today, it's really important that sites are fully functional on devices that lack support for media queries, JavaScript and so on.

The list of PAWS dogs starts as a simple grid with photos of dogs and basic info. Clicking on a dog takes you to their Petfinder listing.

If your browser supports JavaScript, the filters are added, allowing you sort through dogs that match your criteria. Clicking on a dog opens up a drop-down menu with more information and a full-description, as well as a link to an adoption form if you really like the dog.

But even without JavaScript, the page still works.

<h2>A little help</h2>

I have to give major kudos to Bridget Wessel and her <a href="http://wordpress.org/extend/plugins/petfinder-listings/">Petfinder Listings plugin</a>. While my solution forgoes the plugin, her PHP was instrumental in getting the API data into WordPress.

Definitely give her work a look.

<h3>The Petfinder API for WordPress Toolkit</h3>

To help other developers who may be looking to do something similar, I open sourced my code. Check out the <a href="https://github.com/cferdinandi/petfinder-api-for-wordpress">Petfinder API for WordPress Toolkit on GitHub</a>.

***Note:*** *I've released a CMS-agnostic JavaScript plugin for working with Petfinder called [petfinderAPI4everybody.js](https://github.com/cferdinandi/petfinderAPI4everybody).*

And if you're looking to adopt an awesome dog (or just want to see a whole bunch of cuteness), check out <a href="http://www.pawsnewengland.com/our-dogs/">PAWS New England</a>.