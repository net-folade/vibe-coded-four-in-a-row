
import { useEffect, useState } from "react";
import { Player } from "@/types/game";
import { useIsMobile } from "@/hooks/use-mobile";

interface GameTimerProps {
  isActive: boolean;
  isPaused: boolean;
  onTimeExpired: () => void;
  currentPlayer: Player;
}

const GameTimer = ({ isActive, isPaused, onTimeExpired, currentPlayer }: GameTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Reset timer when player changes
    setTimeLeft(20);
  }, [currentPlayer]);
  
  useEffect(() => {
    if (!isActive || isPaused) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeExpired();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isActive, isPaused, onTimeExpired]);
  
  // Format time as mm:ss
  const formatTime = (time: number): string => {
    return `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`;
  };
  
  return (
    <div className={`absolute ${isMobile ? 'top-2 right-2 text-lg' : 'top-4 right-4 text-xl'} font-mono font-bold rounded-lg bg-opacity-80 px-4 py-2`}
         style={{ backgroundColor: "#1A1F2C", color: currentPlayer === 1 ? "#ea384c" : "#1EAEDB" }}>
      <div className="flex items-center justify-center space-x-2">
        <div>Time: {formatTime(timeLeft)}</div>
      </div>
    </div>
  );
};

export default GameTimer;
