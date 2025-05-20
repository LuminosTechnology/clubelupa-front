import React, { useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  FooterContainer,
  WhiteLine,
  ExpandedContent,
  HeartWrapper,
  Heading,
  Description,
  ShareButton,
} from "./footerAchievementsSuccess.style";

import champagneGif from "../../assets/gifs/champanhe-bg.gif";        // ← novo GIF
import { shareSocialOutline } from "ionicons/icons";

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const FooterAchievementsSuccess: React.FC<Props> = ({
  visible,
  onClose,
}) => {
  const minHeight = 0;
  const maxHeight = window.innerHeight * 0.75;

  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(visible ? maxHeight : minHeight);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ startY: 0, startHeight: minHeight });

  /* abre/fecha conforme prop */
  useEffect(() => {
    setHeight(visible ? maxHeight : minHeight);
  }, [visible, maxHeight, minHeight]);

  /* drag handlers */
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
      <WhiteLine />

      <ExpandedContent $expanded={height > minHeight + 20}>
        <h2 style={{ color: "white", margin: "0 0 35px" }}>Conquistas</h2>

        <HeartWrapper>
          {/* GIF champanhe */}
          <img src={champagneGif} alt="Celebração" width={180} height={180} />
        </HeartWrapper>

        <Heading>Parabéns</Heading>

        <Description>
          Você recebeu sua conquista por ter visitado todos os
          estabelecimentos afiliados ao Lupa do Bairro Cabral
        </Description>

        <ShareButton>
          <IonIcon icon={shareSocialOutline} style={{ fontSize: 20, marginRight: 12 }} />
          COMPARTILHAR CONQUISTA
        </ShareButton>
      </ExpandedContent>
    </FooterContainer>
  );
};

export default FooterAchievementsSuccess;
