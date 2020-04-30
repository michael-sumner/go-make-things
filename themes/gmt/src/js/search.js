import crowsNest from '../../../../../gmt-theme/dist/js/search.js';

crowsNest(function (article, id) {
	var html =
		'<div class="margin-bottom" id="search-result-' + id + '">' +
			'<aside class="text-muted text-small">' +
				'<time datetime="' + article.datetime + '" pubdate>' + article.date + '</time>' +
			'</aside>' +
			'<h2 class="h3 link-block-styled link-no-underline no-padding-top no-margin-bottom">' +
				'<a class="link-no-underline" href="' + article.url + '">' + article.title + '</a>' +
			'</h2>' +
			article.summary.slice(0, 150) + '...' +
		'</div>';
	return html;
});