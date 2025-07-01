import React, { useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import { shareSocialOutline } from "ionicons/icons";

import {
  FooterContainer,
  ExpandedContent,
  HeartWrapper,
  Heading,
  Description,
  ShareButton,
  CloseBtn,               // import do novo botão
} from "./footerAchievementsSuccess.style";

import champagneGif from "../../assets/gifs/champanhe-bg.gif";
import footerClose from "../../assets/footer-close.svg";  // ícone de fechar

interface Props {
  visible: boolean;
  icon: string;
  title: string;
  onClose?: () => void;
}

const FooterAchievementsSuccess: React.FC<Props> = ({
  visible,
  icon,
  title,
  onClose,
}) => {
  const minHeight = 0;
  const maxHeight = window.innerHeight * 0.75;
  const ref = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(visible ? maxHeight : minHeight);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ startY: 0, startHeight: minHeight });

  // abre/fecha conforme prop
  useEffect(() => {
    setHeight(visible ? maxHeight : minHeight);
  }, [visible, maxHeight, minHeight]);

  // handlers de drag
  const start = (e: React.TouchEvent) => {
    if (!ref.current) return;
    const grip = e.touches[0].clientY - ref.current.getBoundingClientRect().top;
    if (grip > 40) return;
    setDragging(true);
    drag.current = { startY: e.touches[0].clientY, startHeight: height };
  };
  const move = (e: React.TouchEvent) => {
    if (!dragging) return;
    const delta = drag.current.startY - e.touches[0].clientY;
    setHeight(Math.max(minHeight, Math.min(maxHeight, drag.current.startHeight + delta)));
  };
  const end = () => {
    if (!dragging) return;
    setDragging(false);
    const mid = minHeight + (maxHeight - minHeight) / 2;
    const final = height > mid ? maxHeight : minHeight;
    setHeight(final);
    if (final === minHeight && onClose) onClose();
  };

  return (
    <FooterContainer
      ref={ref}
      onTouchStart={start}
      onTouchMove={move}
      onTouchEnd={end}
      style={{
        height,
        transition: dragging ? "none" : "height 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Removida a WhiteLine */}

      <ExpandedContent $expanded={height > minHeight + 20}>
        <HeartWrapper>
          <img src={icon || champagneGif} alt={title} width={180} height={180} />
        </HeartWrapper>

        <Heading>{title}</Heading>

        <Description>
          Parabéns! Você desbloqueou a conquista <strong>{title}</strong>.
        </Description>

        <ShareButton onClick={() => {/* lógica de compartilhamento */}}>
          <IonIcon icon={shareSocialOutline} style={{ fontSize: 20, marginRight: 12 }} />
          COMPARTILHAR CONQUISTA
        </ShareButton>

        {/* Novo botão de fechar */}
        <CloseBtn onClick={onClose}>
          <img src={footerClose} alt="Fechar conquistas" />
        </CloseBtn>
      </ExpandedContent>
    </FooterContainer>
  );
};

export default FooterAchievementsSuccess;
