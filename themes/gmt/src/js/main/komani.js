var easterEgg = function () {

	// Define the pattern and completed items in the sequence
	var pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
	var current = 0;

	// Event listener callback
	var keyHandler = function (event) {

		// If the key isn't in the pattern, or isn't the current key in the pattern, reset
		if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
			current = 0;
			return;
		}

		// Update how much of the pattern is complete
		current++;

		// If complete, rick roll!
		if (pattern.length === current) {
			window.location.href = '/fun';
		}

	};

	// Listen for keydown events
	document.addEventListener('keydown', keyHandler, false);

};