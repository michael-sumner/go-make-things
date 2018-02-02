/**
 * Script initializations
 */

// Responsive iframe videos
fluidvids.init({
	selector: ['iframe', 'object'],
	players: ['www.youtube.com', 'player.vimeo.com', 'www.slideshare.net', 'www.hulu.com', 'videopress.com/embed/']
});

// Smooth scrolling anchor links
if (document.querySelector('a[href*="#"]')) {
	var scroll = new SmoothScroll('a[href*="#"]');
}

// Mailchimp form
if (document.querySelector('#mailchimp-form')) {
	mailchimp(function (data) {
		if (data.result !== 'error') {
			window.location.href = '/newsletter-success';
		}
	});
}

// Anchor links on posts
if (document.body.matches('.type-articles.page-single') || document.body.matches('#page-54a32daa7699b0585cab71188bd8c152')) {
	addHeadingLinks('h2, h3, h4, h5, h6', '#', 'link-no-underline');
}