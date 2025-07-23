// src/components/CheckinSuccessFooter/index.tsx
import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  Shell,
  FooterContainer,
  WhiteLine,
  IconContainer,
  Title,
  Subtitle,
  InfoText,
  CloseBtn,
  ConfettiPiece
} from './checkinSuccessFooter.style';
import voucherSvg from '../../assets/moeda-checkin.svg';
import footerClose from '../../assets/footer-close.svg';

interface CheckinSuccessFooterProps {
  onClose: () => void;
}

const CheckinSuccessFooter: React.FC<CheckinSuccessFooterProps> = ({ onClose }) => {
  const minHeight = 177;
  const maxHeight = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 600;

  const [currentH, setCurrentH] = useState(minHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const dragRef = useRef({ startY: 0, startHeight: minHeight });

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setCurrentH(maxHeight);
    }, 500);
    setTimeout(() => setShowConfetti(false), 3500);
  }, [maxHeight]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragRef.current = { startY: e.touches[0].clientY, startHeight: currentH };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = dragRef.current.startY - e.touches[0].clientY;
    setCurrentH(Math.max(minHeight, Math.min(maxHeight, dragRef.current.startHeight + delta)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (currentH <= minHeight + 40) onClose();
    else setCurrentH(maxHeight);
  };

  const confettiPieces = useMemo(() => {
    if (!showConfetti) return [];
    const amount = 60;
    const colors = ['#FF4D4F', '#40A9FF', '#73D13D', '#FAAD14', '#EB2F96', '#13C2C2'];
    const minDur = 1800;
    const maxDur = 3200;
    const delaySpread = 400;
    return Array.from({ length: amount }).map((_, i) => {
      const left = Math.random() * 100;
      const size = 6 + Math.random() * 10;
      const colorPiece = colors[i % colors.length];
      const duration = minDur + Math.random() * (maxDur - minDur);
      const delay = Math.random() * delaySpread;
      return { left, size, colorPiece, duration, delay, key: i };
    });
  }, [showConfetti]);

  const translate = maxHeight - currentH;

  return (
    <>
      {showConfetti &&
        confettiPieces.map(p => (
          <ConfettiPiece
            key={p.key}
            left={p.left}
            size={p.size}
            color={p.colorPiece}
            duration={p.duration}
            delay={p.delay}
          />
        ))}

      <Shell
        style={{
          height: maxHeight,
          transform: `translateY(${translate}px)`,
          transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.22,1,0.36,1)'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <FooterContainer>
          <WhiteLine />
          <IconContainer>
            <img src={voucherSvg} alt="Moedas" />
          </IconContainer>
          <Title>Parabéns</Title>
          <Subtitle>
            Explorar rende <br /> conquistas incriveis
          </Subtitle>
          <InfoText>
            Você acaba de acumular <br /> +10 pontos e 0 moedas Lupa <br /> em sua conta.
          </InfoText>
          <CloseBtn onClick={onClose}>
            <img src={footerClose} alt="Fechar" />
          </CloseBtn>
        </FooterContainer>
      </Shell>
    </>
  );
};

export default CheckinSuccessFooter;
