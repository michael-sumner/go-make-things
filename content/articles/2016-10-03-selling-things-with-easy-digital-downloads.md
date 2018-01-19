---
categories:
- Business &amp; Leadership
- Code
- WordPress
date: '2016-10-03'
permalink: /selling-things-with-easy-digital-downloads/
title: Selling things with Easy Digital Downloads
url: /2016/10/03/selling-things-with-easy-digital-downloads
---

I use [Easy Digital Downloads](https://easydigitaldownloads.com/) to sell [my books and other products](https://gomakethings.com/books/).

I've made some customizations and added some extensions to the out-of-the-box setup. Today, I wanted to share with you what I've done.

## Payment gateways

EDD supports PayPal Standard by default. It's kind of terrible.

I added the free [PayPal for Easy Digital Downloads](https://wordpress.org/plugins/pal-for-edd/) plugin, which adds PayPal Express Checkout and other options.

I also purchased the [Stripe Payment Gateway extension](https://easydigitaldownloads.com/downloads/stripe-gateway/), so that people can pay via credit card through [Stripe](https://stripe.com).

## Updates by email

Since I planned on giving people free updates, I purchased the [Product Updates extension](https://easydigitaldownloads.com/downloads/edd-product-updates/). This lets you send email updates to people who have purchased a product with links to download the updated files.

I would strongly recommend using something like [Postman SMTP](https://wordpress.org/plugins/postman-smtp/) with this, otherwise emails will get lost in the PHP void.

## MailChimp Integration

EDD sells a [MailChimp extension](https://easydigitaldownloads.com/downloads/mail-chimp/) that lets you add purchasers to a list in MailChimp.

I'm both too cheap to buy it, and wanted the ability to segment purchasers within a list, which the extension doesn't not allow you to do. So, I wrote my own.

I already have a custom [MailChimp plugin](https://github.com/cferdinandi/gmt-mailchimp) I use to embed MailChimp forms on my site. [MailChimp for EDD](https://github.com/cferdinandi/gmt-mailchimp-for-edd) extends it, giving you the ability to add people who buy a product or use a discount code to a list, and segment them into groups within that list.

## A better empty cart

The default empty cart message is a bit lame. The free [Easy Digital Downloads - Empty Cart](https://wordpress.org/plugins/easy-digital-downloads-empty-cart/) plugin lets you customize it.

## Removing the name fields

I don't need someone's name when they buy one of my books. I only need their email address, and wanted to keep the checkout process as frictionless as possible.

I used the following code in my `functions.php` file to remove the name fields:

```lang-php
/**
 * Unset first and last name as required fields in checkout
 * @param  Array $required_fields Required fields
 */
function keel_edd_purchase_form_required_fields( $required_fields ) {
	unset( $required_fields['edd_first'] );
	unset( $required_fields['edd_last'] );
	return $required_fields;
}
add_filter( 'edd_purchase_form_required_fields', 'keel_edd_purchase_form_required_fields' );

/**
 * Remove default name fields from checkout
 */
function keel_edd_remove_names() {
  remove_action( 'edd_purchase_form_after_user_info', 'edd_user_info_fields' );
}
add_action( 'init', 'keel_edd_remove_names' );

/**
 * Override the checkout fields markup without the name fields
 */
function keel_edd_user_info_fields() {
	if( is_user_logged_in() ) :
		$user_data = get_userdata( get_current_user_id() );
	endif;
	?>
	<fieldset id="edd_checkout_user_info">
		<?php do_action( 'edd_purchase_form_before_email' ); ?>
		<p id="edd-email-wrap">
			<label class="edd-label" for="edd-email"><strong><?php _e('Email Address', 'edd'); ?></strong></label>
			<input class="edd-input required" type="email" name="edd_email" placeholder="<?php _e('Email address', 'edd'); ?>" id="edd-email" value="<?php echo is_user_logged_in() ? $user_data->user_email : ''; ?>"/>
		</p>
		<?php do_action( 'edd_purchase_form_after_email' ); ?>
		<?php do_action( 'edd_purchase_form_user_info' ); ?>
	</fieldset>
	<?php
}
add_action( 'edd_purchase_form_after_user_info', 'keel_edd_user_info_fields' );
```

## Only allow a single item on checkout

Because I'm not running a proper store, I don't want to have a "View Cart" link in my navigation. I want someone to click on the "Buy Now" button and go right to the checkout. Choosing another item removes the first one.

(Admittedly, this made more sense when I sold just one book with three different packages.)

Here's the PHP I added to my `functions.php` file to make that happen:

```lang-php
/**
 * Only allow a single item at checkout
 */
function keel_edd_force_single_item_cart() {
	edd_empty_cart();
	return edd_get_cart_contents();
}
add_filter( 'edd_add_to_cart', 'keel_edd_force_single_item_cart', 1, 1 );
```

## Display "JavaScript Required" message on checkout if JS is disabled

Both PayPal and Stripe require JavaScript to work. To make this more obvious, I wanted to disable the checkout button and add an error message if it's disabled.

First, I added this PHP to my `functions.php` file. It creates the deactivated button and error message:

```lang-php
/**
 * Disable purchase button if no JS
 */
function keel_edd_no_js_disable_purchase() {
	$label = edd_get_option( 'checkout_label', '' );

	if ( edd_get_cart_total() ) {
		$complete_purchase = ! empty( $label ) ? $label : __( 'Purchase', 'easy-digital-downloads' );
	} else {
		$complete_purchase = ! empty( $label ) ? $label : __( 'Free Download', 'easy-digital-downloads' );
	}

	echo
		'<div id="keel-edd-no-js-purchase-message">' .
			'<em>' . __( 'Please enabled JavaScript to complete your purchase.', 'keel' ) . '</em><br>' .
			'<button class="btn btn-large disabled" disabled="disabled">' . $complete_purchase . '</button>' .
		'</div>';
}
add_action( 'edd_purchase_form_after_submit', 'keel_edd_no_js_disable_purchase' );
```

Then, I added this JavaScript to my site, which adds a special class to the site if JavaScript is enabled:

```lang-javascript
;(function (window, document, undefined) {

	'use strict';

	// JavaScript enabled
	document.documentElement.className += ' js-edd';

})(window, document);
```

Finally, I included this CSS on my site, which hooks into that class to hide the error message when JavaScript is available:

```lang-css
/* Message above disabled "Complete Purchase" button when JS isn't enabled */
.js-edd #keel-edd-no-js-purchase-message {
	display: none;
	visibility: hidden;
}
```

## Only load PayPal scripts and styles at checkout

The free PayPal payment gateway plugin loads some extra CSS and JavaScript throughout the whole site. I only want those files to load on checkout for better performance.

This bit of PHP added to my `functions.php` file does the trick:

```lang-php
/**
 * Only load PayPal JS and CSS on checkout page
 */
function keel_edd_only_load_files_on_checkout() {
	if ( is_page( 'checkout' ) ) return;
	wp_dequeue_style( 'pal-for-edd' );
	wp_dequeue_script( 'pal-for-edd' );
	wp_dequeue_script( 'pal-for-eddpaypal_for_edd_blockUI' );
}
add_action( 'wp_enqueue_scripts', 'keel_edd_only_load_files_on_checkout' );
```

## Hide unneeded Stripe fields

When paying with credit card, the Stripe payment gateway adds address fields. I'm not shipping anything, so the only one I need is a zip code and country, which are used to verify the credit card.

I added this bit of PHP to my `functions.php` file to hide the others:

```lang-php
/**
 * Removes the credit card billing address fields
 */
function keel_edd_remove_default_fields() {
	remove_action( 'edd_after_cc_fields', 'edd_default_cc_address_fields' );
}
add_action( 'init', 'keel_edd_remove_default_fields' );



/**
 * Adds in only the required credit card address fields
 * @link https://easydigitaldownloads.com/forums/topic/can-i-remove-billing-details-from-checkout-page/#post-445013
 */
function keel_edd_default_cc_address_fields() {
	ob_start(); ?>
	<fieldset id="edd_cc_address" class="cc-address">
		<span><legend><?php _e( 'Billing Details', 'edd' ); ?></legend></span>
		<?php do_action( 'edd_cc_billing_top' ); ?>
		<p id="edd-card-zip-wrap">
			<label for="card_zip" class="edd-label">
				<?php _e( 'Billing Zip / Postal Code', 'edd' ); ?>
				<?php if( edd_field_is_required( 'card_zip' ) ) { ?>
					<span class="edd-required-indicator">*</span>
				<?php } ?>
			</label>
			<span class="edd-description"><?php _e( 'The zip or postal code for your billing address.', 'edd' ); ?></span>
			<input type="text" size="4" name="card_zip" class="card-zip edd-input required" placeholder="<?php _e( 'Zip / Postal code', 'edd' ); ?>" value="<?php echo $zip; ?>"/>
		</p>

		<p id="edd-card-country-wrap">
			<label for="billing_country" class="edd-label">
				<?php _e( 'Billing Country', 'edd' ); ?>
				<?php if( edd_field_is_required( 'billing_country' ) ) { ?>
					<span class="edd-required-indicator">*</span>
				<?php } ?>
			</label>
			<span class="edd-description"><?php _e( 'The country for your billing address.', 'edd' ); ?></span>
			<select name="billing_country" id="billing_country" class="billing_country edd-select<?php if( edd_field_is_required( 'billing_country' ) ) { echo ' required'; } ?>">
				<?php
				$selected_country = edd_get_shop_country();
				if( $logged_in && ! empty( $user_address['country'] ) && '*' !== $user_address['country'] ) {
					$selected_country = $user_address['country'];
				}
				$countries = edd_get_country_list();
				foreach( $countries as $country_code => $country ) {
				  echo '<option value="' . esc_attr( $country_code ) . '"' . selected( $country_code, $selected_country, false ) . '>' . $country . '</option>';
				}
				?>
			</select>
		</p>

		<?php do_action( 'edd_cc_billing_bottom' ); ?>
	</fieldset>
	<?php
	echo ob_get_clean();
}
add_action( 'edd_after_cc_fields', 'keel_edd_default_cc_address_fields' );
```

## Additional style updates

I added a handful of other little style changes, mostly to bring the default EDD layout inline with the rest of my site.

Since they're custom to my theme, I won't share them here, but if EDD provides plenty of classes and IDs you can hook into for styling.