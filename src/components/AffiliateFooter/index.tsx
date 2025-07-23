/* ────────────────────────────────────────────
 * src/components/AffiliateFooter/index.tsx
 * — Versão que chama `onAction` ao clicar em IR AO ESTABELECIMENTO
 * ──────────────────────────────────────────── */
import { IonIcon } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import {
  ActionButton,
  Description,
  ExpandedContent,
  FooterContainer,
  SocialLink,
  Tagline,
  UserImage,
  UserImageContainer,
  UserName,
} from "./footerAffiliate.style";

import { logoInstagram } from "ionicons/icons";
import { Restaurant } from "../../components/Map";

interface AffiliateFooterProps {
  affiliate?: Restaurant;
  onClose: () => void;
  onAction: () => void; // ← callback para “ir ao estabelecimento”
  visible: boolean;
}

const AffiliateFooter: React.FC<AffiliateFooterProps> = ({
  affiliate,
  onClose,
  onAction,
  visible,
}) => {
  const minHeight = 177;
  const maxHeight = window.innerHeight * 0.8;

  const [height, setHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startY: 0, startHeight: maxHeight });

  useEffect(() => {
    if (visible) {
      setHeight(maxHeight);
      dragRef.current.startHeight = maxHeight;
    } else {
      setHeight(minHeight);
      dragRef.current.startHeight = minHeight;
    }
  }, [visible]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
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
    setIsDragging(false);
    if (height <= minHeight + 40) onClose();
    else setHeight(maxHeight);
  };

  if (!visible && height <= minHeight) {
    return null;
  }

  return (
    <FooterContainer
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ height, transition: isDragging ? "none" : "height 0.3s ease" }}
    >
      {/* imagem + nome */}
      <UserImageContainer>
        <UserImage src={affiliate?.image} />
      </UserImageContainer>
      <UserName>{affiliate?.name}</UserName>

      {/* conteúdo principal */}
      <ExpandedContent>
        <Tagline>
          Conheça o {affiliate?.name} e ganhe {affiliate?.value} Moedas Lupa!
        </Tagline>

        <Description>
          {affiliate?.benefits ||
            `O ${affiliate?.name} é o lugar ideal para você… Faça seu Check-in no estabelecimento para ganhar suas Moedas Lupa!
            e receba o benefício EXCLUSIVO que só o Lupa proporciona.`}
        </Description>

        {/* links sociais */}
        <SocialLink href="#" target="_blank">
          <IonIcon icon={logoInstagram} style={{ fontSize: 20 }} />
          &nbsp;Acesse o instagram
        </SocialLink>

        <SocialLink href="#" target="_blank">
          Acesse o site
        </SocialLink>

        {/* botão ação */}
        <ActionButton variant="secondary" onClick={onAction}>
          IR AO ESTABELECIMENTO
        </ActionButton>
      </ExpandedContent>
    </FooterContainer>
  );
};

export default AffiliateFooter;
