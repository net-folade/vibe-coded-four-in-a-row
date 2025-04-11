
import { GameState } from "@/types/game";
import { Button } from "@/components/ui/button";
import { resetGame } from "@/utils/gameUtils";
import { RefreshCw, Pause, Play } from "lucide-react";

interface GameStatusProps {
  gameState: GameState;
  onReset: () => void;
  onPause: () => void;
}

const GameStatus = ({ gameState, onReset, onPause }: GameStatusProps) => {
  const getStatusMessage = (): string => {
    switch (gameState.gameStatus) {
      case 'player1_won':
        return 'Red wins!';
      case 'player2_won':
        return 'Blue wins!';
      case 'draw':
        return 'Game ends in a draw!';
      case 'paused':
        return 'Game paused';
      case 'playing':
      default:
        return `${gameState.currentPlayer === 1 ? 'Red' : 'Blue'}'s turn`;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 my-6">
      <div className="flex items-center gap-4">
        <div 
          className={`text-xl font-bold py-2 px-6 rounded-lg ${
            gameState.gameStatus === 'playing' || gameState.gameStatus === 'paused'
              ? gameState.currentPlayer === 1 
                ? 'bg-player1 text-white'
                : 'bg-player2 text-white'
              : gameState.gameStatus === 'player1_won'
                ? 'bg-player1 text-white'
                : gameState.gameStatus === 'player2_won'
                  ? 'bg-player2 text-white'
                  : 'bg-gray-200 text-gray-800'
          }`}
        >
          {getStatusMessage()}
        </div>
        
        {(gameState.gameStatus === 'playing' || gameState.gameStatus === 'paused') && (
          <Button 
            onClick={onPause}
            variant="outline"
            className="flex items-center gap-2"
            title={gameState.gameStatus === 'paused' ? "Resume Game" : "Pause Game"}
          >
            {gameState.gameStatus === 'paused' ? <Play size={18} /> : <Pause size={18} />}
            <span className="hidden sm:inline">{gameState.gameStatus === 'paused' ? "Resume" : "Pause"}</span>
          </Button>
        )}
        
        <Button 
          onClick={onReset}
          variant="outline"
          className="flex items-center gap-2"
          title="Restart Game"
        >
          <RefreshCw size={18} />
          <span className="hidden sm:inline">Restart</span>
        </Button>
      </div>
    </div>
  );
};

export default GameStatus;
