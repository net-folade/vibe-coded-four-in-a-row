
import { useEffect, useState } from "react";
import { GameState } from "@/types/game";
import { COLS, ROWS, dropPiece } from "@/utils/gameUtils";
import GameCell from "./GameCell";

interface GameBoardProps {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
}

const GameBoard = ({ gameState, setGameState }: GameBoardProps) => {
  const [droppingCell, setDroppingCell] = useState<{ row: number, col: number } | null>(null);

  // Handle column click
  const handleColumnClick = (col: number) => {
    if (gameState.gameStatus !== 'playing') return;
    
    // Check if column is full
    if (gameState.board[0][col] !== null) return;
    
    // Find lowest empty row in this column
    let row = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (gameState.board[r][col] === null) {
        row = r;
        break;
      }
    }
    
    if (row !== -1) {
      // Animate the dropping piece
      setDroppingCell({ row, col });
      
      // After animation, update the game state
      setTimeout(() => {
        setGameState(dropPiece(gameState, col));
        setDroppingCell(null);
      }, 500); // Match with the animation duration
    }
  };

  // Check if a cell is part of a winning line
  const isWinningCell = (row: number, col: number): boolean => {
    if (!gameState.winningCells) return false;
    return gameState.winningCells.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-board p-4 rounded-lg">
        <div 
          className="grid"
          style={{ 
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            gap: '8px',
            aspectRatio: `${COLS}/${ROWS}`
          }}
        >
          {/* Generate cells for the board */}
          {gameState.board.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <GameCell 
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                isWinningCell={isWinningCell(rowIndex, colIndex)}
                onClick={() => handleColumnClick(colIndex)}
                isDropping={droppingCell?.row === rowIndex && droppingCell?.col === colIndex}
              />
            ))
          )}
        </div>
      </div>
      
      {/* Column indicators for clicking */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {Array(COLS).fill(null).map((_, colIndex) => (
          <button
            key={colIndex}
            className={`h-2 rounded-full ${
              gameState.currentPlayer === 1 ? 'bg-player1' : 'bg-player2'
            } ${gameState.gameStatus !== 'playing' ? 'opacity-50' : 'opacity-100'}`}
            onClick={() => handleColumnClick(colIndex)}
            disabled={gameState.gameStatus !== 'playing' || gameState.board[0][colIndex] !== null}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
