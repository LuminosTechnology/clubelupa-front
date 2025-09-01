/* ────────────────────────────────────────────
 * Footer Voucher (com botão fechar)
 * ──────────────────────────────────────────── */
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import {
  FooterContainer,
  ExpandedContent,
  VoucherIcon,
  Title,
  SectionTitle,
  Text,
  CloseBtn,
} from "./footer.style";

import Button from "../Button";
import voucherSvg from "../../assets/moeda.svg";
import footerClose from "../../assets/footer-close.svg";

const ExchangeButton = styled(Button)`
  margin-top: 30px; /* entre o segundo texto e o botão */
`;

interface FooterVoucherProps {
  visible: boolean;
  expandTrigger: number;
  id: number;
}

const FooterLupaCoins: React.FC<FooterVoucherProps> = ({
  visible,
  expandTrigger,
  id,
}) => {
  /* Drawer -------------------------------------------------------- */
  const minHeight = 0;
  const maxHeight = window.innerHeight * 0.75;
  const footerRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(minHeight);
  const [isDragging, setDrag] = useState(false);
  const dragRef = useRef({ startY: 0, startHeight: minHeight });

  /* abre / fecha via props --------------------------------------- */
  useEffect(() => {
    if (visible || expandTrigger > 0) setHeight(maxHeight);
  }, [visible, expandTrigger, maxHeight]);

  /* Gestos -------------------------------------------------------- */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    if (e.touches[0].clientY - rect.top > 40) return; // só arrasta pela “area de drag”
    setDrag(true);
    dragRef.current = { startY: e.touches[0].clientY, startHeight: height };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = dragRef.current.startY - e.touches[0].clientY;
    setHeight(
      Math.max(
        minHeight,
        Math.min(maxHeight, dragRef.current.startHeight + delta)
      )
    );
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setDrag(false);
    const mid = (minHeight + maxHeight) / 2;
    setHeight(height > mid ? maxHeight : minHeight);
  };

  /* fechar via ícone --------------------------------------------- */
  const collapse = () => setHeight(minHeight);

  /* Render -------------------------------------------------------- */
  return (
    <FooterContainer
      ref={footerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        height,
        transition: isDragging ? "none" : "height 0.3s ease",
        overflow: "hidden",
      }}
    >
      <ExpandedContent $expanded={height > minHeight + 20}>
        <VoucherIcon src={voucherSvg} alt="Voucher" />

        <Title>Alameda Simple Organic Cosméticos</Title>
        <SectionTitle>Experiência Lupa</SectionTitle>

        <Text>
          Escolha entre o tônico “Self Love”, um sabonete facial, uma mini
          argila ou a pastilha dental “Tasty” nas compras acima de R$250!
        </Text>

        <Text>Você quer trocar 155 Moedas Lupa por essa experiência?</Text>

        <ExchangeButton>QUERO TROCAR MINHAS MOEDAS LUPA</ExchangeButton>

        {/* botão fechar */}
        <CloseBtn onClick={collapse}>
          <img src={footerClose} alt="Fechar voucher" />
        </CloseBtn>
      </ExpandedContent>
    </FooterContainer>
  );
};

export default FooterLupaCoins;
