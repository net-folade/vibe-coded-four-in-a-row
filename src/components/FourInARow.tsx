
import { useState } from "react";
import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";
import { GameState } from "@/types/game";
import { initialGameState, resetGame } from "@/utils/gameUtils";

const FourInARow = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const handleReset = () => {
    setGameState(resetGame());
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-6 bg-gradient-to-r from-player1 to-player2 text-transparent bg-clip-text">
        Four In A Row
      </h1>
      
      <GameStatus gameState={gameState} onReset={handleReset} />
      
      <GameBoard gameState={gameState} setGameState={setGameState} />
      
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
