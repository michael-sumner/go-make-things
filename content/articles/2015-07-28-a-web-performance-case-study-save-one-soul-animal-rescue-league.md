---
categories:
- Design &amp; UX
date: '2015-07-28'
title: 'A web performance case study: Save One Soul Animal Rescue League'
---

Earlier this year, I provided [Save One Soul Animal Rescue League](http://sosarl.org/) with some guidance on how to improve the performance of their website.

At the time, their site was taking [3.5 seconds to start rendering](http://www.webpagetest.org/result/141013_H6_QWE/), and it was more than 7 seconds before the first piece of visible text even showed up. After implementing my recommendations, [their site starts rendering content in 1.7 seconds](http://www.webpagetest.org/result/150426_W6_NBP/), with text becoming readable in under 3 seconds.

Their site is more than twice as fast as it was before!

There's still a lot of little things they can do to improve those numbers even further, but a few minor changes had a big impact on their site.

I interviewed Mike Gualtieri, the web developer for SOSARL, to talk about the changes he made and how they affected the sites performance. Here's what he had to say.

<!--more-->

## The Interview with SOSARL

**Chris (from Go Make Things): What made you decide to focus on web performance for SOSARL?**

Mike (from SOSARL): I had e-mailed you in October of 2014 to thank you, as your design for PAWS New England had very much inspired the design of SOSARL's site.

The problem with my design was that sure, I had designed it to look all slick but it had absolutely no optimization&mdash;a point you raised to me in our e-mail exchange. I knew that the site seemed to load a little slow sometimes, but I hadn't done a test in quite some time.

Seeing the load times that you had gotten when you analyzed the site was eye-opening and a reminder that I though I had built a good-looking site, it won't mean a thing if users are giving up when the page isn't loading fast enough. So, I took some of the great advice that you had given me and I was able to cut down the load time in half, and then some.

**Chris: Where there any key metrics or targets you looked at? Did you have a target goal for the finished optimizations?**

Mike: I didn't have a specific target in mind, I just knew that I needed to bring the "Time to First Byte" and the "Start Render" time way down. Originally they were 2.330s and 3.562s, respectively - contributing to a total load time of 18.684s.

When I saw that number, I couldn't believe it, my jaw almost went through the floor. Imagine waiting almost 20 seconds for a site that you want to visit to fully render&mdash;it was completely unacceptable.

**Chris: What steps did you take to the improve your site performance?**

Mike: First I went for the easy stuff. I got rid of a few parallax effects and slide/fade-in animations that I had given to some images. They were "nice-to-have," but honestly completely unnecessary as far as the average user for our site goes.

I also identified several images that were taking *way* too long to load because they were ridiculously large and uncompressed&mdash;something I had been a bit careless about. I scaled and compressed the images that needed it, and in some cases completely ditched the original image and went with something else altogether.

After that, I saw that there was a JS-based widget that we were loading in the footer which showed a random adoptable dog's name/picture as a "Featured Dog". This was taking almost 12 seconds to load! I decided to get rid of that widget on all pages site-wide. It was not used much at all, and it was all the way down in the footer area, which is unlikely to be seen by the casual user.

Those were the heaviest hitters by themselves, but I still decided there was more to be done, so I installed [Quick Cache (now ZenCache)](http://zencache.com/) since we're on the [WordPress platform](https://wordpress.org/). I enabled server-side *and* client-side caching, which made a *huge* difference&mdash;almost an unbelievable amount of difference in load times.

After installing ZenCache Pro (we sprung for the Pro option, more on that soon), I saw that it detected we weren't leveraging [gZIP compression](http://gzipwtf.com/), so I modified our `.htaccess` file and voila! I was seeing an 80% reduction in file size.

ZenCache Pro also minifies HTML/CSS for me, so I enabled that and saw even faster load times.

Finally, I researched some ways to defer the loading of javascript or load it asynchronously, since a ton of it was done in the `<head>` section. I installed a plugin to handle that, and once I did that my load time decreased by at least another 20%.

**Chris: Of the changes you made, what had the biggest impact on your performance?**

Mike: Installing ZenCache Pro, by far. The combination of the minifying/combining of the CSS files, as well as the client/server-side caching was *huge*.

**Chris: Which of your optimizations was the hardest to implement?**

Mike: So, confession time: I'm not a web designer/developer by trade, I'm an IT guy&mdash;a virtualization engineer to be specific. When it comes to building websites, I know my way around for sure, and I know what the average user is looking for, but I'm relatively novice as far as coding goes. I'm learning for sure, this whole experience has taught me so much, but I'm by no means an expert.

With that out of the way... we're using a Wordpress.org platform for sosarl.org, so I simply installed ZenCache Pro and WP Deferred Javascripts, made the appropriate tweaks and made sure I didn't break the website or the javascript-based toolkit which loaded our list of adoptable dogs.

There were other parts which were trial-and-error, but I'd hardly say that was difficult to implement. I suppose if we replaced the word "hardest" with "most time-consuming," it would be getting the images to be optimized while maintaining a high level of quality. That was a lot of time for me as I ended up ditching a whole bunch of images that didn't look great, so I ended up having to create all new images using GIMP. For instance, for some of the homepage sliders, there would be a large background image and a smaller foreground image on the slide. To create a nice effect, I'd adjust the color saturation and darken the background image, and apply a slight-to-moderate blurring filter. The foreground image would be the original, unaltered image.

Eventually I ditched the slider foreground image and just went with a large, high-quality (but properly compressed) slider background image with a darkened box behind the slider text, and this saved not only load time, but the overall size of the page.

All told, I brought the site's size down from a whopping, hefty 9 MB to 1.9 MB. Still a bit high, but that's more than 4-fold improvement!

I should also mention that I'm using a DB optimizer too (the [WP-Optimize plugin](https://wordpress.org/plugins/wp-optimize/)) which runs automatically every week to keep our database size in check. What effect that has on performance, I'm not sure&mdash;I haven't let the database get large enough for me to find out! But, with all of the page revisions, spam comments/trackbacks, the occasional orphaned post draft, I can see it getting out of control pretty easily, so at the very least, it can't hurt!

**Chris: I know you just made these changes a short while ago, but have you seen any changes your analytics yet as a result?**

Unfortunately, I wasn't doing a very good job of keeping metrics before January of this year, but I will say that since I put these optimizations in place around the March/April timeframe, we saw a huge uptick in visitors and page views.

Granted, that does coincide with more events being held in March/April (the epic amount of snow that was dumped on us really put a damper on events and adoptions at the beginning of the year), but it was a sizable (nearly 4-fold) increase.

Thank you again Chris for all the help and advice. It's been extremely valuable to me not only with SOSARL but a great learning experience that I can hopefully pass on to others too.