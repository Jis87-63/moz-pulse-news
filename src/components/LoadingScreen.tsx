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
      <div className="text-center space-y-10 px-4">
        {/* Logo animado */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto">
            <div className="absolute inset-0 cosmic-gradient rounded-full blur-2xl opacity-60 animate-pulse-glow" />
            <div className="relative w-full h-full rounded-full cosmic-gradient flex items-center justify-center shadow-2xl">
              <svg
                className="w-16 h-16 text-white animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Título e descrição */}
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            O País
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-light">
            A carregar as últimas notícias de Moçambique
          </p>
        </div>

        {/* Barra de progresso moderna */}
        <div className="w-full max-w-md mx-auto space-y-3">
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="absolute inset-y-0 left-0 cosmic-gradient rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center justify-between text-white/50 text-sm">
            <span className="font-mono">{progress}%</span>
            <span className="animate-pulse">●●●</span>
          </div>
        </div>
      </div>
    </div>
  );
};
