function playAI(board) {
  let bestScore = Infinity;
  let bestMove;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        board[i][j] = "O";
        let score = minimax(board, 0, true);
        console.log(score);
        board[i][j] = "";
        if (score < bestScore) {
          bestScore = score;
          bestMove = [i, j];
        }
      }
    }
  }
  board[bestMove[0]][bestMove[1]] = "O";
  return board;

}

let scores = {
  X: 1,
  O: -1,
  Tie: 0
};

function minimax(board, depth, isMaxi) {
  let result = checkForWin(true);
  if (result != null) {
    return scores[result];
  }
  if (isMaxi) {
    let bestScore = - Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = "X";
          let score = minimax(board, depth + 1, false);
          board[i][j] = "";
          bestScore = max(score, bestScore);
          
        }
      }
    } 
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = "O";
          let score = minimax(board, depth + 1, true);
          board[i][j] = "";
          bestScore = min(score, bestScore);
          
        }
      }
    } 
    return bestScore;
  }
  
}