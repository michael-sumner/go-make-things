---
title: "Recreating the React tic-tac-toe game with vanilla JS"
date: 2018-06-14T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Last week, I kicked off a series where I [recreate popular framework demos with vanilla JS](/javascript-framework-demos-in-vanilla-js/), starting with VueJS.

This week, we're going to build [React's Tic-Tac-Toe game](https://reactjs.org/tutorial/tutorial.html#what-were-building). And we're going to do with fewer lines of code and zero dependencies, and make it more accessible. [You can see the finished script here.](https://jsfiddle.net/cferdinandi/bhk3jnyv/1/)

Let's get started.

## The Starting Markup

The starting markup for this one is an empty `div` with an ID of `#game-board`. We're going to use JavaScript to build the rest of the markup and inject it into that container.

```html
<div id="game-board">Loading...</div>
```

## The board

The React version uses `div` and `button` elements to create the tic-tac-toe board.

The buttons are good for accessibility, because they allow people also navigate around the board using a keyboard. However, someone using a screen reader would have no idea which square in the board they're on. I'm going to use a `table` element instead.

It will look roughly like this.

```html
<table>
	<tbody>
		<tr>
			<td><button class="game-square" data-id="0"></button></td>
			<td><button class="game-square" data-id="1" aria-pressed="true" disabled>X</button></td>
			<td><button class="game-square" data-id="2" aria-pressed="true" disabled>O</button></td>
		</tr>
		<tr>
			<td><button class="game-square" data-id="3"></button></td>
			<td><button class="game-square" data-id="4" aria-pressed="true" disabled>X</button></td>
			<td><button class="game-square" data-id="5"></button></td>
		</tr>
		<tr>
			<td><button class="game-square" data-id="6"></button></td>
			<td><button class="game-square" data-id="7" aria-pressed="true" disabled>O</button></td>
			<td><button class="game-square" data-id="8"></button></td>
		</tr>
	</tbody>
</table>
```

I plan to use a `[data-id]` attribute so that my script can identify which square was pressed. the `aria-pressed` attribute lets screen readers know the button has already been selected, while the `disabled` attribute prevents it from being pressed again.

We'll also add some light styling to the game board.

```css
table {
	border-collapse: collapse;
	border-spacing: 0;
}

.game-square {
	background: none;
	border: 1px solid #808080;
	color: #272727;
	font-size: 2em;
	font-weight: bold;
	height: 1.5em;
	width: 1.5em;
}
```

Planning out the end state like this makes it easier to actually write the script later.

## Tracking States

There are a few pieces of information we need to track for this to work.

First, we need a starting state for the game&mdash;as in, what's the value in each square of our board. This value can be represented as an array of nine items, with each item mapping to the corresponding box in our grid (and `[data-id]`).

To [prevent this default state from being modified](/how-to-handle-immutability-in-javascript/), I'm going to make it a function that returns an array to give it immutability. By default, every square is `null`.

```js
var baseState = function () {
	return [null, null, null, null, null, null, null, null, null];
};
```

The React version tracks game history, and let's users show the board in any previous state. To track that, I'll create an empty array that will hold that data.

```js
var historyState = [];
```

Finally, I need to store the current state of the board, and who's turn it is (`X` or `O`). I'll create two placeholder variables for that.

```js
var currentState, turn;
```

## Starting the game

When the game loads for the first time, or if the user clicks a "Play Again" button that we'll add, I want to reset the state and render the game board.

This will set the `currentState` to the `baseState`, reset the `historyState` to an empty array, and set the current turn to `X`. Then, it will call an `updateBoard()` function we'll use to actually generate the board.

```js
/**
 * Reset the board to it's base state
 */
var resetBoard = function () {
	currentState = baseState();
	historyState = [];
	turn = 'X';
	updateBoard();
};

// Reset the board when the game loads
resetBoard();
```

In the `updateBoard()` function, I use `querySelector` to get the `#game-board` and update it with `innerHTML`.

If a game state is passed into it, we can use that. Otherwise, we'll use the `currentState`. We'll create another helper function, `buildBoard()`, to generate the actual markup string.

```js
/**
 * Update the board based on a state
 * @param  {Array} state The state to update from (optional, defaults to currentState)
 */
var updateBoard = function (state) {
	var board = document.querySelector('#game-board')
	if (!board) return;
	board.innerHTML = buildBoard(state || currentState);
};
```

## Building the board

In the `buildBoard()` function, I create a `rows` variable to hold the markup string, and create a `table` element.

For each square in the `state`, I need to create a `td` element, setup in rows of three. To keep this script lean and clean, we'll handle that in a `buildSquares()` method (more on that in a second).

Then, I'll close off the `table` and add a "Play Again" button. Finally, I'll return the markup string.

```js
/**
 * Build the game board
 * @param  {Array} state The state to build from
 * @return {String}      The markup based on the state
 */
var buildBoard = function (state) {

	// Setup the table
	var rows = '<table><tbody>';

	// Create each square
	rows += buildSquares(state);
	rows += '</tbody></table><p><button id="play-again">Play Again</button></p>';

	return rows;
};
```

In the `buildSquares()` method, I'll setup an empty string assigned to the `rows` variable. This will eventually hold the data for each row in our table.

I'll use `forEach()` to loop through each item in the `state` (our array of squares). If it's not `null`, I'll...

- Use it's value as our button text (the `value` variable).
- Add an `aria-pressed="true"` attribute (the `selected` variable).
- Add a `disabled` attribute (the `disabled` variable).

I also need to check if the current square is the first in a row (and if so create a new `tr`), or the last in the row (and if so close the current `tr`). For now, I'll move the functionality for that to `isFirstInRow()` and `isLastInRow()` methods.

Finally, I'll return my `rows` string so that it can be concatenated in the `buildBoard()` function.

```js
var buildSquares = function (state) {

	// Setup rows
	var rows = '';

	// Loop through each square in the state
	state.forEach(function (square, id) {

		// Variables
		var value = square ? square : '';
		var selected = square ? ' aria-pressed="true"' : '';
		var disabled = square ? ' disabled' : '';

		// Check if it's a new row
		if (isFirstInRow(id)) {
			rows += '<tr>';
		}
		rows += '<td><button class="game-square" data-id="' + id + '"' + selected + disabled + '>' + value + '</button></td>';

		// Check if it's the last column in a row
		if (isLastInRow(id)) {
			rows += '</tr>';
		}

	});

	return rows;

};
```

So, how do we check if it's the first or last square in a row?

We can use a [modulo operator](https://en.wikipedia.org/wiki/Modulo_operation) (`%`) to divide the square's index by the number of items in our row (`3`) and get the remainder.

The math is easier when you start at `1`, so we'll add `1` to the index before doing this. Squares `1`, `4`, and `7` (after adding `1`) are the first in each row. Squares `3`, `6`, and, `9` (after adding `1`) are the last.

`1 / 3`, `4 / 3`, and `7 / 3` have a remainder of `1`. `3 / 3`, `6 / 3`, and `9 / 3` have a remainder of `0`. Using the modulo operator to get the remainder will tell us if the square is first or last in a row. We'll check the remainder and return a boolean.

```js
var isFirstInRow = function (id) {
	return (id + 1) % 3 === 1;
};

var isLastInRow = function (id) {
	return (id + 1) % 3 === 0;
};
```

## Playing the game

Now we're ready to actually play!

Let's [use event bubbling](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/) to listen for `click` events on the `document`.

```js
// Listen for selections
document.addEventListener('click', function (event) {
	// Do something...
}, false);
```

If the `#play-again` button was clicked, we can call the `resetBoard()` method to wipe out the current states and render a clean board.

If the clicked element was our `.game-square` buttons and it doesn't have a `disabled` attribute, we'll update the state and render the board again. We'll handle that in a `renderTurn()` helper function, passing in the button.

```js
// Listen for selections
document.addEventListener('click', function (event) {

	// If #play-again was clicked
	if (event.target.matches('#play-again')) {
		resetBoard();
	}

	// If a .game-square was clicked
	if (event.target.matches('.game-square') && !event.target.hasAttribute('disabled')) {
		renderTurn(event.target);
	}

}, false);
```

First, we'll get the square's ID from the `[data-id]` attribute.

```js
/**
 * Render the board again based on the current user's turn
 * @param  {Node} square The square that was selected
 */
var renderTurn = function (square) {

	// Get selected value
	var selected = event.target.getAttribute('data-id');
	if (!selected) return;

};
```

We'll update that square in the `currentState` array to the `turn` value. This starts with `X`, and, as you'll see further in this function, switches between `X` and `O` with each turn.

```js
/**
 * Render the board again based on the current user's turn
 * @param  {Node} square The square that was selected
 */
var renderTurn = function (square) {

	// Get selected value
	var selected = event.target.getAttribute('data-id');
	if (!selected) return;

	// Update state
	currentState[selected] = turn;

};
```

Next, we want to add the current state of the board to the `historyState` array. We'll do this using the `.push()` method, and pass in a fresh copy of the `currentState` by using the `.slice()` method on it.

```js
/**
 * Render the board again based on the current user's turn
 * @param  {Node} square The square that was selected
 */
var renderTurn = function (square) {

	// Get selected value
	var selected = event.target.getAttribute('data-id');
	if (!selected) return;

	// Update state
	currentState[selected] = turn;

	// Add a historical state
	historyState.push(currentState.slice());

};
```

Now, we can update the board markup by calling our `updateBoard()` method. We'll also update the `turn` variable. If it's currently `X` we'll switch it to `O` and vice-versa.

```js
/**
 * Render the board again based on the current user's turn
 * @param  {Node} square The square that was selected
 */
var renderTurn = function (square) {

	// Get selected value
	var selected = event.target.getAttribute('data-id');
	if (!selected) return;

	// Update state
	currentState[selected] = turn;

	// Add a historical state
	historyState.push(currentState.slice());

	// Render with new state
	updateBoard();

	// Update turn
	turn = turn === 'X' ? 'O' : 'X';

};
```

## What about the history state?

We're tracking the turn history, but not doing anything with it just yet. Let's fix that!

In the `buildBoard()` method, let's concatenate a `buildHistory()` method at the end of our `rows` variable. We'll use this method to build the markup string.

```js
/**
 * Build the game board
 * @param  {Array} state The state to build from
 * @return {String}      The markup based on the state
 */
var buildBoard = function (state) {

	// Setup the board
	var rows = '<table><tbody>';

	// Create each square
	rows += buildSquares(state, winner);
	rows += '</tbody></table><p><button id="play-again">Play Again</button></p>';

	// Create game history
	rows += buildHistory();

	return rows;
};
```

In the `buildHistory()` method, I'll setup a `history` variable to hold the markup.

If the `historyState` array has any items in it, we'll add a "Game History" heading and setup an ordered list. Then, we'll loop through each state and create a list item and button.

On the button, let's add a `[data-history]` attribute with a stringified version of the state for that turn using the `Array.toString()` method.

```js
/**
 * Build the history state buttons markup
 * @return {String} The markup
 */
var buildHistory = function () {

	// Setup history markup
	var history = '';

	// If there's a history state, loop through each state and build a button
	if (historyState.length > 0) {
		history += '<h2>Game History</h2><ol>';
		historyState.forEach(function (move, index) {
			history += '<li><button data-history="' + move.toString() + '">Go to move # ' + (index + 1) + '</button></li>';
		});
		history += '</ol>';
	}

	return history;

};
```

Now we're showing the history buttons, but we need to do something when someone clicks one.

In the event listener, if the clicked element has a `[data-history]` attribute, we can convert it's value back into an array with the `String.split()` method. Then we'll pass that state into the `updateBoard()` method, which will render it for us.

```js
document.addEventListener('click', function (event) {

	// If a .game-square was clicked
	if (event.target.matches('.game-square') && !event.target.hasAttribute('disabled')) {
		renderTurn(event.target);
	}

	// If #play-again was clicked
	if (event.target.matches('#play-again')) {
		resetBoard();
	}

	// If a historical button was clicked
	if (event.target.matches('[data-history]')) {
		updateBoard(event.target.getAttribute('data-history').split(','));
	}

}, false);
```

## What about when someone wins?

The one thing we haven't done yet is handle what happens when someone wins.

In the `buildBoard()` function, let's add a variable and helper method to check if there's a winner. If there is, we'll add a "You've won!" message to the top of the board indicating who won.

We'll also pass that information into our `buildSquares()` method, and use it to disable the entire board.

```js
/**
 * Build the game board
 * @param  {Array} state The state to build from
 * @return {String}      The markup based on the state
 */
var buildBoard = function (state) {

	// Check if there's a winner
	var winner = isWinner();

	// Setup the board
	var rows = winner ? '<p><strong>' + winner + ' is the winner!</string></p>' : '';
	rows += '<table><tbody>';

	// Create each square
	rows += buildSquares(state, winner);
	rows += '</tbody></table><p><button id="play-again">Play Again</button></p>';

	// Create game history
	rows += buildHistory();

	return rows;
};
```

In the `buildSquares()` method under the `disabled` variable, if the square has a value *or* there's a winner, we'll add the `disabled` attribute.

```js
/**
 * Build each square of the game board
 * @param  {Array}   state  The board state
 * @param  {Boolean} winner If true, someone won the game
 * @return {String}         The markup
 */
var buildSquares = function (state, winner) {

	// Setup rows
	var rows = '';

	// Loop through each square in the state
	state.forEach(function (square, id) {

		// Variables
		var value = square ? square : '';
		var selected = square ? ' aria-pressed="true"' : '';
		var disabled = square || winner ? ' disabled' : '';

		// Check if it's a new row
		if (isFirstInRow(id)) {
			rows += '<tr>';
		}
		rows += '<td><button class="game-square" data-id="' + id + '"' + selected + disabled + '>' + value + '</button></td>';

		// Check if it's the last column in a row
		if (isLastInRow(id)) {
			rows += '</tr>';
		}

	});

	return rows;

};
```

## Checking if there's a winner

Ok, but... how do we check if someone won?

There are eight possible winning patterns. I created an array of `wins`, with each item containing an array with the square indexes for those winning patterns.

For example, having the same value in squares `0`, `1`, and `2` (the first row), or squares `0`, `3`, and `6` (the first column) is a winning pattern.

```js
/**
 * Check if there's a winner
 */
var isWinner = function () {

	// Possible winning combinations
	var wins = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	];

};
```

We can [use `Array.filter()` to find any of those matching patterns](/find-every-matching-item-in-an-array-with-vanilla-javascript/) in the `currentState` array.

The `Array.filter()` method let's you check each item in an array against some criteria, and creates a new array containing only the items that match.

We'll call it on the `wins` array, and check if indexes in the `currentState` for each winning pattern all match. If they do, that's a winner.

If the new `isWinner` array has an items in it, there was a winner. We'll return the value of the first item in the winning pattern (either an `X` or `O`). Otherwise, we'll return false.

```js
/**
 * Check if there's a winner
 */
var isWinner = function () {

	// Possible winning combinations
	var wins = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	];

	// Check if there's a winning combo
	var isWinner = wins.filter(function (win) {
		return (currentState[win[0]] && currentState[win[0]] === currentState[win[1]] && currentState[win[0]] === currentState[win[2]]);
	});

	// Return the winner, or false if there isn't one
	return (isWinner.length > 0 ? currentState[isWinner[0][0]] : false);

};
```

## Wrapping up

This was a lot more complex than [the VueJS example from last week](/javascript-framework-demos-in-vanilla-js/).

That said, the finished result is both more accessible than the version in the React docs, *and* fewer lines of code. That feels like a win to me!

[You can view the full working project on JSFiddle.](https://jsfiddle.net/cferdinandi/bhk3jnyv/1/)