
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FooterContainer,
  WhiteLine,
  ExpandedContent,
  VoucherIcon,
  Title,
  SectionTitle,
  Text,
} from './footer.style';
import Button from '../Button';
import voucherSvg from '../../assets/Coins.svg';

const ExchangeButton = styled(Button)`
  margin-top: 30px; /* só aqui entre o segundo Text e o Button */
`;

interface FooterVoucherProps {
  visible: boolean;
  expandTrigger: number;
}

const FooterLupaCoins: React.FC<FooterVoucherProps> = ({ visible, expandTrigger }) => {
  const minHeight = 0;
  const maxHeight = window.innerHeight * 0.75;
  const footerRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(minHeight);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startY: number; startHeight: number }>({
    startY: 0,
    startHeight: minHeight,
  });

  useEffect(() => {
    if (visible || expandTrigger > 0) {
      setHeight(maxHeight);
    }
  }, [visible, expandTrigger, maxHeight]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const touchY = e.touches[0].clientY - rect.top;
    if (touchY > 40) {
      setIsDragging(false);
      return;
    }
    setIsDragging(true);
    dragRef.current = {
      startY: e.touches[0].clientY,
      startHeight: height,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = dragRef.current.startY - e.touches[0].clientY;
    const newH = Math.max(minHeight, Math.min(maxHeight, dragRef.current.startHeight + delta));
    setHeight(newH);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const midpoint = minHeight + (maxHeight - minHeight) / 2;
    setHeight(height > midpoint ? maxHeight : minHeight);
  };

  return (
    <FooterContainer
      ref={footerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        height: `${height}px`,
        transition: isDragging ? 'none' : 'height 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <WhiteLine />

      <ExpandedContent $expanded={height > minHeight + 20}>
        <VoucherIcon src={voucherSvg} alt="Voucher" />
        <Title>Alameda Simple Organic Cosméticos</Title>
        <SectionTitle>Experiência Lupa</SectionTitle>
        <Text>
          Escolha entre o tônico “Self Love”, um sabonete facial, uma mini argila ou a pastilha dental “Tasty” nas compras acima de R$250!
        </Text>
        <Text>
          Você quer trocar 155 LupaCoins por essa experiência?
        </Text>
        <ExchangeButton>
          QUERO TROCAR MINHAS LUPACOINS
        </ExchangeButton>
      </ExpandedContent>
    </FooterContainer>
  );
};

export default FooterLupaCoins;
