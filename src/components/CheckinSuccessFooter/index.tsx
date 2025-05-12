import React, { useRef, useState, useEffect } from 'react';
import {
  FooterContainer,
  WhiteLine,
  IconContainer,
  Title,
  Message,
  ActionButton
} from './checkinSuccessFooter.style';
import voucherSvg from '../../assets/Coins.svg';

interface CheckinSuccessFooterProps {
  affiliateName: string;
  coinsEarned: number;
  onRedeem: () => void;
  onClose: () => void;
}

const CheckinSuccessFooter: React.FC<CheckinSuccessFooterProps> = ({
  affiliateName,
  coinsEarned,
  onRedeem,
  onClose
}) => {
  const minHeight = 177;
  const maxHeight = window.innerHeight * 0.8;

  const [height, setHeight] = useState(maxHeight);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startY: 0, startHeight: maxHeight });

  useEffect(() => {
    // já inicia aberto ao máximo
    setHeight(maxHeight);
  }, [maxHeight]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragRef.current = { startY: e.touches[0].clientY, startHeight: height };
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = dragRef.current.startY - e.touches[0].clientY;
    setHeight(
      Math.max(minHeight, Math.min(maxHeight, dragRef.current.startHeight + delta))
    );
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
    if (height <= minHeight + 40) {
      onClose();
    } else {
      setHeight(maxHeight);
    }
  };

  return (
    <FooterContainer
      style={{ height, transition: isDragging ? 'none' : 'height 0.3s ease' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <WhiteLine />

      <IconContainer>
        <img src={voucherSvg} alt="Moedas" />
      </IconContainer>

      <Title>Parabéns</Title>

      <Message>
        Você acabou de ganhar {coinsEarned} LupaCoins por ter feito checking no {affiliateName}!
      </Message>

      <ActionButton onClick={onRedeem}>RESGATAR</ActionButton>
    </FooterContainer>
  );
};

export default CheckinSuccessFooter;
