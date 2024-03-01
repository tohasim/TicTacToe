window.addEventListener("load", start);

// ******* CONTROLLER *********
let currentPlayer = 1;
function start() {
	makeBoardClickable();
	displayBoard();
}

function boardClicked(event) {
	const cell = event.target;
	if (currentPlayer === 1 && cell.classList.contains("cell")) {
		const row = cell.dataset.row;
		const col = cell.dataset.col;
		selectCell(row, col);
	}
}

function selectCell(row, col) {
	if (readFromCell(row, col) === 0) {
		writeToCell(row, col, currentPlayer);
		displayBoard();
		nextTurn();
		return true;
	}
	return false;
}

function nextTurn() {
	if (checkWinner()) alert("winner");
	if (currentPlayer === 1) {
		currentPlayer = 2;
		setTimeout(computerTurn, 1000);
	} else {
		currentPlayer = 1;
	}
}

function computerTurn() {
	setTimeout(5000);
	let availableCells = getEmptyCells();
	if (availableCells.length === 0) {
		alert("No more cells");
	} else {
		const index = Math.floor(Math.random() * availableCells.length);
		const [row, col] = availableCells[index];
		selectCell(row, col);
	}
}

function getEmptyCells() {
	let cells = [];
	for (i = 0; i < 3; i++) {
		for (j = 0; j < 3; j++) {
			if (readFromCell(i, j) === 0) {
				cells.push([i, j]);
			}
		}
	}
	return cells;
}

function checkWinner() {
	const winnerPositions = [
		// Rows
		[
			[0, 0],
			[0, 1],
			[0, 2],
		],
		[
			[1, 0],
			[1, 1],
			[1, 2],
		],
		[
			[2, 0],
			[2, 1],
			[2, 2],
		],
		// Columns
		[
			[0, 0],
			[1, 0],
			[2, 0],
		],
		[
			[0, 1],
			[1, 1],
			[2, 1],
		],
		[
			[0, 2],
			[1, 2],
			[2, 2],
		],
		// Diagonals
		[
			[0, 0],
			[1, 1],
			[2, 2],
		],
		[
			[0, 2],
			[1, 1],
			[2, 0],
		],
	];

	let winner = false;
	for (let n = 0; n < winnerPositions.length; n++) {
		winner = checkPosition(winnerPositions[n]);
		if (winner) {
			return winner;
		}
	}
	return winner;
}

function checkPosition(position) {
	for (let i = 0; i < position.length; i++) {
		const [row, col] = position[i];
		if (model[row][col] !== currentPlayer) {
			return false;
		}
	}
	return true;
}

// ******* VIEW *********
function makeBoardClickable() {
	document.getElementById("board").addEventListener("click", boardClicked);
}

function displayBoard() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			const value = readFromCell(row, col);
			const cell = document.querySelector(
				`[data-row="${row}"][data-col="${col}"]`
			);
			switch (value) {
				case 0:
					cell.textContent = " ";
					break;
				case 1:
					cell.textContent = "X";
					break;
				case 2:
					cell.textContent = "O";
					break;
			}
		}
	}
}

// ******* MODEL *********
const model = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

function writeToCell(row, col, value) {
	model[row][col] = value;
}

function readFromCell(row, col) {
	return model[row][col];
}
