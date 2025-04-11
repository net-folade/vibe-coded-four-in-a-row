
import { Board, GameState, Player } from "@/types/game";

export const ROWS = 6;
export const COLS = 7;

export const createEmptyBoard = (): Board => {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
};

export const initialGameState: GameState = {
  board: createEmptyBoard(),
  currentPlayer: 1,
  gameStatus: 'playing',
  winningCells: null,
};

// Drop a piece in the specified column
export const dropPiece = (gameState: GameState, col: number): GameState => {
  // Clone the current game state
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
  
  // If game is already over or paused, don't allow more moves
  if (newState.gameStatus !== 'playing') {
    return newState;
  }
  
  // Find the lowest empty row in the column
  const board = newState.board;
  let row = -1;
  
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === null) {
      row = r;
      break;
    }
  }
  
  // If column is full, return unchanged state
  if (row === -1) {
    return newState;
  }
  
  // Place the piece
  board[row][col] = newState.currentPlayer;
  
  // Check for win
  const winningCells = checkWin(board, row, col);
  if (winningCells) {
    newState.winningCells = winningCells;
    newState.gameStatus = newState.currentPlayer === 1 ? 'player1_won' : 'player2_won';
    return newState;
  }
  
  // Check for draw
  if (isBoardFull(board)) {
    newState.gameStatus = 'draw';
    return newState;
  }
  
  // Switch player
  newState.currentPlayer = newState.currentPlayer === 1 ? 2 : 1;
  
  return newState;
};

// Check if the board is full (draw)
const isBoardFull = (board: Board): boolean => {
  for (let col = 0; col < COLS; col++) {
    if (board[0][col] === null) {
      return false;
    }
  }
  return true;
};

// Check for a win starting from the last placed piece
const checkWin = (board: Board, row: number, col: number): [number, number][] | null => {
  const player = board[row][col];
  if (!player) return null;
  
  // Directions: horizontal, vertical, diagonal right-down, diagonal left-down
  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1]
  ];
  
  for (const [dx, dy] of directions) {
    const winningCells: [number, number][] = [];
    
    // Check in positive direction
    let r = row, c = col;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      winningCells.push([r, c]);
      r += dx;
      c += dy;
    }
    
    // Check in negative direction
    r = row - dx;
    c = col - dy;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      winningCells.push([r, c]);
      r -= dx;
      c -= dy;
    }
    
    if (winningCells.length >= 4) {
      return winningCells;
    }
  }
  
  return null;
};

// Reset the game
export const resetGame = (): GameState => {
  return {
    ...initialGameState,
    board: createEmptyBoard(),
  };
};
