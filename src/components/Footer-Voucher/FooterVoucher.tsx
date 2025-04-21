// src/components/Footer-Voucher/FooterVoucher.tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  FooterContainer,
  WhiteLine,
  ExpandedContent,
  VoucherIcon,
  Title,
  Validity,
  SectionTitle,
  Text,
} from './footer.style';
import voucherSvg from '../../assets/voucher.svg';

interface FooterVoucherProps {
  visible: boolean;
  expandTrigger: number;
}

const FooterVoucher: React.FC<FooterVoucherProps> = ({ visible, expandTrigger }) => {
  const minHeight = 0;
  // agora ocupa 65% da altura da tela
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
        <Validity>
          Válido até dia 22/02 às<br />
          23:59 (horário de Brasília)
        </Validity>
        <SectionTitle>Experiência Lupa</SectionTitle>
        <Text>
          Escolha entre o tônico “Self Love”, um sabonete facial, uma mini argila
          ou a pastilha dental “Tasty” nas compras acima de R$250!
        </Text>
        <SectionTitle>Como utilizar?</SectionTitle>
        <Text bold>No espaço físico</Text>
        <Text>
          Basta acessar a área do assinante e se identificar ao parceiro apresentando
          seu cartão virtual. Escanear o QR Code no estabelecimento. Apresente ao
          parceiro a confirmação e pronto! Aproveite e viva sua experiência!
        </Text>
        <Text bold>De forma online</Text>
        <Text>
          Para pedidos pelo Whatsapp ou Instagram: Basta enviar o código do seu
          cartão digital ao parceiro, aguardar a confirmação sobre sua identidade e
          ser feliz!
        </Text>
      </ExpandedContent>
    </FooterContainer>
  );
};

export default FooterVoucher;
