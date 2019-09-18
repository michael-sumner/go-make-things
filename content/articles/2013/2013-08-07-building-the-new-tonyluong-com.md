---
categories:
- Design and UX
date: '2013-08-07'
url: /building-the-new-tonyluong-com/
title: Building the new TonyLuong.com
---

<img src="https://gomakethings.com/wp-content/uploads/2013/08/tonyluong.jpg" alt="A screenshot of Tony Luong&#039;s website" width="832" height="446" class="aligncenter img-border size-full wp-image-4690" />

Last week, Boston-based professional photographer <a href="http://tonyluong.com/">Tony Luong launched his new website</a>, which I built.

Today I want walk you through the design and development process.
<!--more-->
<h2>Rapid Prototyping</h2>

Tony and I spent a little bit of time talking about what he needed in a new site: It should look and work great on any device, it should have a flexible content management system, and it should be fast.

He actually really liked the look of his current site, but wanted it to work better.

Tony had a great sense of who his audience was and what they're looking for when they visit his site or check out portfolio. So after a few quick chats, I made a few napkin sketches and converted them into working HTML.

<img src="https://gomakethings.com/wp-content/uploads/2013/08/tonyluong-many-screens.jpg" alt="Tony&#039;s site at various screen sizes" width="832" height="320" class="aligncenter size-full wp-image-4720" />

<a href="http://cferdinandi.github.io/kraken/">The Kraken boilerplate</a> made it really easy to build a working prototype. In just a few hours, I had a working site Tony could play with, and it really helped him get a sense for how his site would work across a range of screen sizes.

Tony has a strong sense of design, so this was a really collaborative process. We'd bounce a few ideas around, prototype, and repeat.

Once we got things close to where we wanted them, we moved into production with a full-featured WordPress site.

<h2>A Customized WordPress Backend</h2>

<img src="https://gomakethings.com/wp-content/uploads/2013/08/tonyluong-theme-settings.jpg" alt="A screenshot of Tony&#039;s customized WordPress backend" width="832" height="499" class="aligncenter img-border size-full wp-image-4721" />

As a professional photographer, Tony's had some very specific needs from a content management system. The WordPress API makes it really easy to modify the backend to fit his workflow.

I created custom templates for the different types of content he shares: photo albums, text-based content, and links to other sites. Custom fields let him mark albums as new, and select the photo that will be the cover image for each album.

A theme settings page gives Tony even more control, letting him easily adjust the navigation structure, add Google Analytics, and change his footer text.

<h2>A Focus on Performance</h2>

Tony's a professional photographer, so his site is obviously focused on big, beautiful photos of his work. Unfortunately, big photos can result in big page weight and slow performance.

We spent a <em>lot</em> of time testing, tweaking, and testing again to make his site as fast as possible.

One of the first things we did was take advantage of WordPress's built-in image compression. By adjusting the compression rate, we reduced the size of his photos by 80% or more, while maintaining a great image quality.

Earlier versions of the redesign relied on jQuery for small-screen navigation and a responsive image slider. Unfortunately, it made the site feel slow and sluggish.

<h3>Cutting the Mustard</h3>

When I explained the idea of progressive enhancement to Tony, he jumped at it.

I implemented the BBC's <a href="http://responsivenews.co.uk/post/18948466399/cutting-the-mustard">"cutting the mustard"</a> test to determine browser capabilities. By default, all browsers have access to a basic navigation menu and all of Tony's photos.

Browsers that support modern JavaScript API's get enhanced navigation on smaller screens, and a touch-friendly, responsive slider for navigating photo albums.

Moving away from jQuery to modern, vanilla JavaScript had a striking impact on performance. I'll be writing a separate article on how that all worked.

<h2>Lessons</h2>

There were a few key takeaways from this project:

<ol>
<li class="space-bottom-small">Get into the browser as quickly as possible. Working prototypes are a much better way to help people understand responsive design.</li>
<li class="space-bottom-small">Separate style from functionality. The prototypes we used first focused on how everything would work. Once we got that figured out, we moved on to how things should look. The separation was really useful.</li>
<li class="space-bottom-small">Progressive enhancement (and vanilla JS) for the win. By being comfortable providing a more feature-light experience to older browsers (with access to the same content, of course), we were able to create a better experience for everyone.</li>
</ol>