import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center cosmic-gradient animate-fade-in">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="w-24 h-24 mx-auto animate-pulse-glow">
            <svg
              className="w-full h-full animate-spin"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-white">O País</h2>
          <p className="text-white/80 text-lg">A carregar notícias...</p>
          <div className="text-white/60 text-2xl font-mono">{progress}%</div>
        </div>
      </div>
    </div>
  );
};
