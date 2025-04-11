
import { useEffect, useState } from "react";
import { Player } from "@/types/game";
import confetti from "canvas-confetti";

interface WinningConfettiProps {
  isActive: boolean;
  winner: Player;
}

const WinningConfetti = ({ isActive, winner }: WinningConfettiProps) => {
  const [isConfettiDone, setIsConfettiDone] = useState(false);

  useEffect(() => {
    if (!isActive || isConfettiDone || !winner) return;
    
    // Colors based on winner
    const colors = winner === 1 
      ? ['#ea384c', '#D946EF', '#F97316'] // Red player colors
      : ['#1EAEDB', '#33C3F0', '#9b87f5'];  // Blue player colors
    
    const end = Date.now() + 3000; // 3 seconds of confetti
    
    const runConfetti = () => {
      const opts = {
        particleCount: 50,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors: colors
      };
      
      // Launch two confetti bursts from different sides
      confetti({
        ...opts,
        origin: { x: 0.2, y: 0.5 }
      });
      
      confetti({
        ...opts,
        origin: { x: 0.8, y: 0.5 }
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(runConfetti);
      } else {
        setIsConfettiDone(true);
      }
    };
    
    runConfetti();
    
    return () => {
      confetti.reset(); // Clean up confetti
    };
  }, [isActive, winner, isConfettiDone]);
  
  return null; // This is a functional component, no UI
};

export default WinningConfetti;
