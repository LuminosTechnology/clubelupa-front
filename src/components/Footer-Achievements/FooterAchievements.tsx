/* ────────────────────────────────────────────
 * Drawer de Conquistas – v2 (ajustado)
 * ──────────────────────────────────────────── */
import React, { useEffect, useRef, useState } from "react";
import {
  FooterContainer,
  ExpandedContent,
  Grid,
  AchievementWrapper,
  Icon,
  Label,
  CloseBtn,
} from "./footerAchievements.style";

import embaixadorSvg from "../../assets/embaixador.svg";
import frequentadorSvg from "../../assets/frequentador.svg";
import exploradorSvg from "../../assets/explorador.svg";
import cinefiloSvg from "../../assets/cinefilo.svg";
import pegadaSvg from "../../assets/pegada.svg";
import footerClose from "../../assets/footer-close.svg";

import FooterAchievementsSuccess from "../Footer-AchievementsSuccess/FooterAchievementsSuccess";
import { Medal } from "../../types/api/user";
import { useGamificationContext } from "../../contexts/GamificationContext";

interface Props {
  visible: boolean;
  expandTrigger: number;
  onClose?: () => void;
}

const FooterAchievements: React.FC<Props> = ({
  visible,
  expandTrigger,
  onClose,
}) => {
  const minHeight = 0;
  const maxHeight = window.innerHeight * 0.75;
  const ref = useRef<HTMLDivElement>(null);

  const { gamificationSummary } = useGamificationContext();

  const [height, setHeight] = useState(minHeight);
  const [dragging, setDrag] = useState(false);
  const drag = useRef({ startY: 0, startHeight: minHeight });

  // controla qual medalha foi clicada
  const [selected, setSelected] = useState<Medal | null>(null);
  // abre o footer de sucesso
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (visible || expandTrigger > 0) setHeight(maxHeight);
    else setHeight(minHeight);
  }, [visible, expandTrigger, maxHeight, minHeight]);

  // quando o success abre, fecha o drawer de conquistas
  useEffect(() => {
    if (successOpen) setHeight(minHeight);
  }, [successOpen]);

  const start = (e: React.TouchEvent) => {
    if (!ref.current || !visible) return;
    if (e.touches[0].clientY - ref.current.getBoundingClientRect().top > 40)
      return;
    setDrag(true);
    drag.current = { startY: e.touches[0].clientY, startHeight: height };
  };
  const move = (e: React.TouchEvent) => {
    if (!dragging || !visible) return;
    const delta = drag.current.startY - e.touches[0].clientY;
    setHeight(
      Math.max(minHeight, Math.min(maxHeight, drag.current.startHeight + delta))
    );
  };
  const end = () => {
    if (!dragging) return;
    setDrag(false);
    const mid = (minHeight + maxHeight) / 2;
    const final = height > mid ? maxHeight : minHeight;
    setHeight(final);
    if (final === minHeight && onClose) onClose();
  };

  const closeAll = () => {
    setSuccessOpen(false);
    setSelected(null);
    if (onClose) onClose();
  };

  if (!gamificationSummary) return null;
  return (
    <>
      {/* Drawer de Conquistas */}
      {visible && !successOpen && (
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
          <ExpandedContent $expanded={height > minHeight + 20}>
            <Grid>
              {gamificationSummary.medals.map((medal) => (
                <div key={medal.id}>
                  <AchievementWrapper
                    $earned={true}
                    $progress={100}
                    // só abre o success se já conquistado
                    onClick={() => {
                      setSuccessOpen(true);
                      setSelected(medal);
                      // if (medal.earned) {
                      //   setSelected(medal);
                      //   setSuccessOpen(true);
                      // }
                    }}
                    // style={{ cursor: medal.earned ? "pointer" : "default" }}
                  >
                    <Icon $src={medal.icon_url} $earned={true} />
                  </AchievementWrapper>
                  <Label>{medal.name}</Label>
                </div>
              ))}
            </Grid>

            <CloseBtn
              onClick={() => {
                setHeight(minHeight);
                if (onClose) onClose();
              }}
            >
              <img src={footerClose} alt="Fechar conquistas" />
            </CloseBtn>
          </ExpandedContent>
        </FooterContainer>
      )}

      {/* Drawer de Sucesso */}
      {selected && (
        <FooterAchievementsSuccess
          visible={successOpen}
          medal={selected}
          onClose={closeAll}
        />
      )}
    </>
  );
};

export default FooterAchievements;
