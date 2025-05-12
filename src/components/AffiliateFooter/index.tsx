/* ────────────────────────────────────────────
 * src/components/AffiliateFooter/index.tsx
 * — Versão que chama `onAction` ao clicar em IR AO ESTABELECIMENTO
 * ──────────────────────────────────────────── */
import React, { useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import {
  FooterContainer,
  WhiteLine,
  UserImageContainer,
  UserImage,
  UserName,
  ExpandedContent,
  LupaIcons,
  Tagline,
  Description,
  ActionButton,
  SocialLink
} from './footerAffiliate.style';

import lupaIcon from '../../assets/icon-lupa.svg';
import lupaIcon2 from '../../assets/icon-lupa2.svg';
import { Restaurant } from '../../components/Map';
import { logoInstagram } from 'ionicons/icons';

interface AffiliateFooterProps {
  affiliate: Restaurant;
  onClose: () => void;
  onAction: () => void;    // ← callback para “ir ao estabelecimento”
}

const AffiliateFooter: React.FC<AffiliateFooterProps> = ({
  affiliate,
  onClose,
  onAction
}) => {
  const minHeight = 177;
  const maxHeight = window.innerHeight * 0.8;
  const [height, setHeight] = useState(maxHeight);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startY: 0, startHeight: maxHeight });

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
    if (height <= minHeight + 40) onClose();
    else setHeight(maxHeight);
  };

  const lupaIcons = [lupaIcon2, lupaIcon2, lupaIcon2, lupaIcon, lupaIcon];

  return (
    <FooterContainer
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ height, transition: isDragging ? 'none' : 'height 0.3s ease' }}
    >
      <WhiteLine />

      {/* imagem + nome */}
      <UserImageContainer>
        <UserImage src={affiliate.image} />
      </UserImageContainer>
      <UserName>{affiliate.name}</UserName>

      {/* ícones de lupa */}
      <LupaIcons>
        {lupaIcons.map((icon, i) => (
          <img key={i} src={icon} alt={`Lupa ${i}`} width={24} height={34} />
        ))}
      </LupaIcons>

      {/* conteúdo principal */}
      <ExpandedContent>
        <Tagline>
          Conheça o {affiliate.name} e ganhe {affiliate.value} Lupacoins!
        </Tagline>

        <Description>
          {affiliate.benefits ||
            `O ${affiliate.name} é o lugar ideal para você… Faça seu Check-in no estabelecimento para ganhar suas Lupacoins
            e receba o benefício EXCLUSIVO que só o Lupa proporciona.`}
        </Description>

        {/* links sociais */}
        <SocialLink href="#" target="_blank">
          <IonIcon icon={logoInstagram} style={{ fontSize: 20 }} />
          &nbsp;Acesse o instagram
        </SocialLink>

        <SocialLink href="#" target="_blank">Acesse o site</SocialLink>

        {/* botão ação */}
        <ActionButton variant="secondary" onClick={onAction}>
          IR AO ESTABELECIMENTO
        </ActionButton>
      </ExpandedContent>
    </FooterContainer>
  );
};

export default AffiliateFooter;
