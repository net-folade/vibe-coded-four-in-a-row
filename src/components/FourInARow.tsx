
import { useState } from "react";
import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";
import GameTimer from "./GameTimer";
import WinningConfetti from "./WinningConfetti";
import { GameState } from "@/types/game";
import { initialGameState, resetGame, dropPiece } from "@/utils/gameUtils";

const FourInARow = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const handleReset = () => {
    setGameState(resetGame());
  };
  
  const handlePause = () => {
    setGameState(prevState => ({
      ...prevState,
      gameStatus: prevState.gameStatus === 'paused' ? 'playing' : 'paused'
    }));
  };
  
  // Auto-switch players when timer expires
  const handleTimeExpired = () => {
    if (gameState.gameStatus !== 'playing') return;
    
    // Find first available column
    for (let col = 0; col < 7; col++) {
      // Check if column is not full
      if (gameState.board[0][col] === null) {
        // Make a move in this column
        setGameState(dropPiece(gameState, col));
        break;
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 relative">
      <h1 className="text-4xl font-bold text-center my-6 bg-gradient-to-r from-player1 to-player2 text-transparent bg-clip-text">
        Four In A Row
      </h1>
      
      <GameTimer 
        isActive={gameState.gameStatus === 'playing'} 
        isPaused={gameState.gameStatus === 'paused'}
        onTimeExpired={handleTimeExpired}
        currentPlayer={gameState.currentPlayer}
      />
      
      <GameStatus 
        gameState={gameState} 
        onReset={handleReset} 
        onPause={handlePause}
      />
      
      <GameBoard gameState={gameState} setGameState={setGameState} />
      
      <WinningConfetti 
        isActive={gameState.gameStatus === 'player1_won' || gameState.gameStatus === 'player2_won'} 
        winner={gameState.gameStatus === 'player1_won' ? 1 : gameState.gameStatus === 'player2_won' ? 2 : null} 
      />
      
      <div className="text-center mt-8 text-gray-600">
        <p>Connect four of your colored discs in a row (horizontally, vertically, or diagonally) to win!</p>
        <p className="mt-2">
          <span className="inline-block w-3 h-3 rounded-full bg-player1 mr-2"></span> 
          Red goes first
          <span className="inline-block w-3 h-3 rounded-full bg-player2 mx-2 ml-4"></span> 
          Blue goes second
        </p>
      </div>
    </div>
  );
};

export default FourInARow;
