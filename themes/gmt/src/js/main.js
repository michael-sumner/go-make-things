import './main-components/_matches.polyfill.js';
import './main-components/add-to-cart.js';
import fluidvids from './main-components/fluidvids.js';
import addHeadingLinks from './main-components/heading-links.js';
import easterEgg from './main-components/komani.js';
import mailchimp from './main-components/mailchimp.js';


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
if (document.body.matches('.type-articles.page-single, .type-notes.page-single, [data-heading-links]')) {
	addHeadingLinks('h2, h3, h4, h5, h6', '#', 'link-no-underline');
}

// Easter Egg
easterEgg();