import '../../../../../gmt-theme/dist/js/add-to-cart.js';
import addHeadingLinks from '../../../../../gmt-theme/dist/js/heading-links.js';
import convertkit from '../../../../../gmt-theme/dist/js/convertkit.js';

// ConvertKit signup
convertkit();

// Anchor links on posts
if (document.body.matches('.type-articles.page-single, .type-notes.page-single, [data-heading-links]')) {
	addHeadingLinks('h2, h3, h4, h5, h6', '#', 'link-no-underline');
}