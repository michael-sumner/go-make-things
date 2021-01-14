import '../../../../../gmt-theme/dist/js/_matches.polyfill.js';
import '../../../../../gmt-theme/dist/js/add-to-cart.js';
import fluidvids from '../../../../../gmt-theme/dist/js/fluid-vids.js';
import addHeadingLinks from '../../../../../gmt-theme/dist/js/heading-links.js';
// import easterEgg from './main-components/konami.js';
import mailchimp from '../../../../../gmt-theme/dist/js/mailchimp.js';


/**
 * Script initializations
 */

// Responsive iframe videos
// fluidvids();

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
// easterEgg();