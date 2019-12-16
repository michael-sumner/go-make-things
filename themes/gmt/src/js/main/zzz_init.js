/**
 * Script initializations
 */

// Responsive iframe videos
fluidvids.init({
	selector: ['iframe', 'object'],
	players: ['www.youtube.com', 'player.vimeo.com', 'www.slideshare.net', 'www.hulu.com', 'videopress.com/embed/', 'noti.st']
});

// Mailchimp form
if (document.querySelector('#mailchimp-form')) {
	mailchimp(function (response) {
		if (response.code === 200) {
			window.location.href = '/newsletter-success';
		}
	});
}

// Anchor links on posts
if (document.body.matches('.type-articles.page-single, .type-notes.page-single, #page-54a32daa7699b0585cab71188bd8c152')) {
	addHeadingLinks('h2, h3, h4, h5, h6', '#', 'link-no-underline');
}

// Easter Egg
easterEgg();