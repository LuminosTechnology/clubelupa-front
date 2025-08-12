import { useEffect, useMemo, useState } from "react";
import { ConfettiPiece } from "../AffiliateView.style";

type Props = {
  showConfetti: boolean;
};

export function Confetti({ showConfetti }: Props) {
  const [animKey, setAnimKey] = useState(0);

  const confettiPieces = useMemo(() => {
    const amount = 120;
    const colors = [
      "#FF4D4F",
      "#40A9FF",
      "#73D13D",
      "#FAAD14",
      "#EB2F96",
      "#13C2C2",
    ];
    const minDur = 1800;
    const maxDur = 3200;
    const delaySpread = 400;
    return Array.from({ length: amount }).map((_, i) => {
      const turns = Math.floor(Math.random() * 5) + 2;
      const left = Math.random() * 100;
      const size = 6 + Math.random() * 10;
      const colorPiece = colors[i % colors.length];
      const duration = minDur + Math.random() * (maxDur - minDur);
      const delay = Math.random() * delaySpread;
      return { left, size, colorPiece, duration, delay, turns, key: i };
    });
  }, []);

  useEffect(() => {
    if (showConfetti) {
      setAnimKey((k) => k + 1);
    }
  }, [showConfetti]);

  return (
    <div style={{ pointerEvents: "none" }}>
      {confettiPieces.map((p) => (
        <ConfettiPiece
          key={`${p.key}-${animKey}`}
          left={p.left}
          size={p.size}
          color={p.colorPiece}
          duration={p.duration}
          showConfetti={showConfetti}
          delay={p.delay}
          turns={p.turns}
        />
      ))}
    </div>
  );
}
