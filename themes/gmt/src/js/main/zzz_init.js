/**
 * Script initializations
 */

fluidvids.init({
	selector: ['iframe', 'object'],
	players: ['www.youtube.com', 'player.vimeo.com', 'www.slideshare.net', 'www.hulu.com', 'videopress.com/embed/']
});

if ( document.querySelector( 'a[href*="#"]' ) ) {
	var scroll = new SmoothScroll('a[href*="#"]');
}

validate.init({
	selector: '#mc-embedded-subscribe-form', // The selector for forms to validate
	disableSubmit: true, // If true, don't submit the form to the server (for Ajax for submission)
	onSubmit: function (form, fields) { // Function to run if the form successfully validates
		submitMailChimpForm(form);
	}
});