// src/components/CheckinSuccessFooter/index.tsx
import React, { useEffect, useRef, useState } from "react";
import footerClose from "../../assets/footer-close.svg";
import voucherSvg from "../../assets/moeda-checkin.svg";
import {
  CloseBtn,
  FooterContainer,
  IconContainer,
  InfoText,
  Shell,
  Subtitle,
  Title,
  WhiteLine,
} from "./checkinSuccessFooter.style";
import { Confetti } from "../../pages/AffiliateView/components/Conffeti";

interface CheckinSuccessFooterProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckinSuccessFooter: React.FC<CheckinSuccessFooterProps> = ({
  onClose,
  isOpen,
}) => {
  const minHeight = 177;
  const maxHeight =
    typeof window !== "undefined" ? window.innerHeight * 0.8 : 600;

  const [currentH, setCurrentH] = useState(minHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const dragRef = useRef({ startY: 0, startHeight: minHeight });

  useEffect(() => {
    if (!isOpen) {
      setCurrentH(minHeight);
      setShowConfetti(false);
      return;
    }

    setShowConfetti(true);
    const openTimer = setTimeout(() => {
      setCurrentH(maxHeight);
    }, 100);

    const hideConfettiTimer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(hideConfettiTimer);
    };
  }, [isOpen, minHeight, maxHeight]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragRef.current = { startY: e.touches[0].clientY, startHeight: currentH };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = dragRef.current.startY - e.touches[0].clientY;
    setCurrentH(
      Math.max(
        minHeight,
        Math.min(maxHeight, dragRef.current.startHeight + delta)
      )
    );
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (currentH <= minHeight + 40) onClose();
    else setCurrentH(maxHeight);
  };

  const translate = maxHeight - currentH;

  return (
    <>
      <Confetti showConfetti={showConfetti} />
      <Shell
        style={{
          height: maxHeight,
          transform: `translateY(${translate}px)`,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          touchAction: isOpen ? "auto" : "none",
          transition: isDragging
            ? "none"
            : "opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)",
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
            Explorar rende <br /> conquistas incríveis
          </Subtitle>
          <InfoText>
            Você acaba de acumular <br /> +10 pontos e 0 moedas Lupa <br /> em
            sua conta.
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
