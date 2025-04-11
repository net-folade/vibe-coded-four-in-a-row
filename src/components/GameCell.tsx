
import { Player } from "@/types/game";
import { cn } from "@/lib/utils";

interface GameCellProps {
  value: Player;
  isWinningCell: boolean;
  onClick: () => void;
  isDropping?: boolean;
}

const GameCell = ({ value, isWinningCell, onClick, isDropping = false }: GameCellProps) => {
  const playerClass = value === 1 
    ? 'bg-player1'
    : value === 2 
      ? 'bg-player2'
      : 'bg-empty';
  
  return (
    <div 
      className="w-full h-full flex items-center justify-center p-1 cursor-pointer"
      onClick={onClick}
    >
      <div 
        className={cn(
          "rounded-full w-full h-full transition-all duration-200",
          playerClass,
          isWinningCell && "animate-pulse shadow-lg",
          isDropping && "animate-drop-piece",
          value === null && "hover:bg-gray-200"
        )}
      />
    </div>
  );
};

export default GameCell;
