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

import embaixadorSvg   from "../../assets/embaixador.svg";
import frequentadorSvg from "../../assets/frequentador.svg";
import exploradorSvg   from "../../assets/explorador.svg";
import cinefiloSvg     from "../../assets/cinefilo.svg";
import pegadaSvg       from "../../assets/pegada.svg";
import footerClose     from "../../assets/footer-close.svg";

import FooterAchievementsSuccess from
  "../Footer-AchievementsSuccess/FooterAchievementsSuccess";

interface Props {
  visible: boolean;
  expandTrigger: number;
  onClose?: () => void;
}

type Achievement = {
  title: string;
  icon: string;
  progress: number;   // 0–100
  earned: boolean;
};

const FooterAchievements: React.FC<Props> = ({
  visible,
  expandTrigger,
  onClose,
}) => {
  const minHeight = 0;
  const maxHeight = window.innerHeight * 0.75;
  const ref = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(minHeight);
  const [dragging, setDrag] = useState(false);
  const drag = useRef({ startY: 0, startHeight: minHeight });

  // controla qual medalha foi clicada
  const [selected, setSelected] = useState<Achievement | null>(null);
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
    if (e.touches[0].clientY - ref.current.getBoundingClientRect().top > 40) return;
    setDrag(true);
    drag.current = { startY: e.touches[0].clientY, startHeight: height };
  };
  const move = (e: React.TouchEvent) => {
    if (!dragging || !visible) return;
    const delta = drag.current.startY - e.touches[0].clientY;
    setHeight(Math.max(minHeight, Math.min(maxHeight, drag.current.startHeight + delta)));
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

  const achievements: Achievement[] = [
    { title: "Embaixador",             icon: embaixadorSvg,   progress: 100, earned: true  },
    { title: "Frequentador\nPremium",  icon: frequentadorSvg, progress: 100, earned: true  },
    { title: "Explorador\nUrbano",     icon: exploradorSvg,   progress: 100, earned: true  },
    { title: "Cinéfilo",               icon: cinefiloSvg,     progress: 100, earned: true  },
    { title: "Primeira\nPegada",       icon: pegadaSvg,       progress: 100, earned: true  },
    { title: "Acervo\nEspecial",       icon: exploradorSvg,   progress: 80,  earned: false },
  ];

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
              {achievements.map((ach) => (
                <div key={ach.title}>
                  <AchievementWrapper
                    $earned={ach.earned}
                    $progress={ach.progress}
                    // só abre o success se já conquistado
                    onClick={() => {
                      if (ach.earned) {
                        setSelected(ach);
                        setSuccessOpen(true);
                      }
                    }}
                    style={{ cursor: ach.earned ? "pointer" : "default" }}
                  >
                    <Icon
                      $src={ach.icon}
                      $earned={ach.earned}
                    />
                  </AchievementWrapper>
                  <Label>{ach.title}</Label>
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
          icon={selected.icon}
          title={selected.title}
          onClose={closeAll}
        />
      )}
    </>
  );
};

export default FooterAchievements;
