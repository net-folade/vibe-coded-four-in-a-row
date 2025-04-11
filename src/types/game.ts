
export type Player = 1 | 2 | null;
export type Board = Player[][];
export type GameStatus = 'playing' | 'player1_won' | 'player2_won' | 'draw' | 'paused';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  gameStatus: GameStatus;
  winningCells: [number, number][] | null;
}
