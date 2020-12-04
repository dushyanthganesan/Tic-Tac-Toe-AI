let w, h, offset, isX, isGameOver, x, y, winner;
let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""]
];
let isTest = false;
let p1 = "X";
let p2 = "O";

function setup() {
	console.log("hello");
	w = 600;
	h = 600;
	offset = 30;
	createCanvas(w, h);
	background(0);
	turn = p1;
	isGameOver = false;
}

function draw() {
	background(255);

	if (!isGameOver) {
	// Draw the X's and O's
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] == "X") {
					line(w/3*j + offset, h/3*i + offset, (j+1)*w/3 - offset, (i+1)*h/3 - offset);
					line(w/3*j + offset, h/3*(i+1) - offset, (j+1)*w/3 - offset, i*h/3 + offset);
				}

				if (board[i][j] == "O"){
					ellipse(w/3*j + offset, h/3*i + offset, w/3 - 2*offset);
					ellipseMode(CORNER);
				}
			}
		}

		// Draw the grid
		line(w/3, 0, w/3, h);
		stroke(0);
		strokeWeight(10);
		line(2*w/3, 0, 2*w/3, h);
		line(0, h/3, w, h/3);
		line(0, 2*h/3, w, 2*h/3);

		winner = checkForWin(false);
		if (winner != null) {
			isGameOver = true;
		}
		
	} else {
		text(winner, w/2, h/2);
		strokeWeight(1);
		textSize(60);
		textAlign(CENTER);
	}

}

function mouseClicked() {
	x = mouseX;
	y = mouseY;

	if (!isGameOver) {
		if (x < w/3) {
			if (y < h/3){
				i1 = 0; i2 = 0;
			} else if (y < 2*h/3) {
				i1 = 1; i2 = 0;
			} else if (y < h) {
				i1 = 2; i2 = 0;
			}
		} else if (x < 2*w/3) {
			if (y < h/3){
				i1 = 0; i2 = 1;
			} else if (y < 2*h/3) {
				i1 = 1; i2 = 1;
			} else if (y < h) {
				i1 = 2; i2 = 1;
			}
		} else if (x < w) {
			if (y < h/3){
				i1 = 0; i2 = 2;
			} else if (y < 2*h/3) {
				i1 = 1; i2 = 2;
			} else if (y < h) {
				i1 = 2; i2 = 2;
			}
		}
		
		if (board[i1][i2] == "") {
			board[i1][i2] = turn;

			// if (turn == p1) {
			// 	turn = p2;
			// } else if (turn == p2) {
			// 	turn = p1;
			// }
			winner = checkForWin(false);
			board = playAI(board);
		}
	}
}


function checkForWin(isTest) {
	for (let i = 0; i < 3; i++){
		if (isEqual(board[i][0], board[i][1], board[i][2])) {
			return board[i][0];
		} else if (isEqual(board[0][i], board[1][i], board[2][i])) {
			return board[0][i];
		} 
	} 

	if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1] != "") {
		return board[0][0];
	} else if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[1][1] != "") {
		return board[1][1];
	}

	if (!board[0].includes("") && !board[1].includes("") && !board[2].includes("") && winner == null) {
		return "Tie";
	}


	
}

function isEqual(a,b,c) {
	return a == b && b == c && a != "";
}