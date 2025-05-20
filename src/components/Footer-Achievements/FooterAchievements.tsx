import React, { useEffect, useRef, useState } from "react";
import {
  FooterContainer,
  WhiteLine,
  ExpandedContent,
  Header,
  Grid,
  Circle,
  Label,
} from "./footerAchievements.style";

import heartSvg from "../../assets/heart-conquistas.svg";
import FooterAchievementsSuccess from
  "../Footer-AchievementsSuccess/FooterAchievementsSuccess";

interface Props {
  visible: boolean;               // controlado pelo Footer principal
  expandTrigger: number;          // mantém como estava (abre grid)
  onClose?: () => void;
}

const FooterAchievements: React.FC<Props> = ({
  visible,
  expandTrigger,
  onClose,
}) => {
  /* drawer GRID ---------------------------------------------------- */
  const minHeight = 0;
  const maxHeight = window.innerHeight * 0.75;
  const ref = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(minHeight);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ startY: 0, startHeight: minHeight });

  useEffect(() => {
    if (visible || expandTrigger > 0) setHeight(maxHeight);
    else setHeight(minHeight);
  }, [visible, expandTrigger, maxHeight, minHeight]);

  const start = (e: React.TouchEvent) => {
    if (!ref.current || !visible) return;
    if (e.touches[0].clientY - ref.current.getBoundingClientRect().top > 40) return;
    setDragging(true);
    drag.current = { startY: e.touches[0].clientY, startHeight: height };
  };
  const move = (e: React.TouchEvent) => {
    if (!dragging || !visible) return;
    const delta = drag.current.startY - e.touches[0].clientY;
    setHeight(Math.max(minHeight, Math.min(maxHeight, drag.current.startHeight + delta)));
  };
  const end = () => {
    if (!dragging) return;
    setDragging(false);
    const mid = minHeight + (maxHeight - minHeight) / 2;
    const final = height > mid ? maxHeight : minHeight;
    setHeight(final);
    if (final === minHeight && onClose) onClose(); // fecha GRID
  };

  /* drawer SUCESSO ------------------------------------------------- */
  const [successOpen, setSuccessOpen] = useState(false);

  /* colapsa grid ao abrir sucesso */
  useEffect(() => {
    if (successOpen) setHeight(minHeight);
  }, [successOpen, minHeight]);

  const closeAll = () => {
    setSuccessOpen(false);   // fecha sucesso
    if (onClose) onClose();  // fecha grid
  };

  /* mock achievements -------------------------------------------- */
  const achievements = [
    "Descobridor da Rua Prudente",
    "Rei dos roteiros",
    "Barão do Cabral",
    "Explorador de museus",
  ];

  return (
    <>
      {/* GRID – renderiza só se 'visible' e sucesso fechado */}
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
          <WhiteLine />

          <ExpandedContent $expanded={height > minHeight + 20}>
            <Header>Conquistas</Header>

            <Grid>
              {achievements.map((title) => (
                <div
                  key={title}
                  onClick={() => {
                    if (title === "Rei dos roteiros") setSuccessOpen(true);
                  }}
                  style={{ cursor: title === "Rei dos roteiros" ? "pointer" : "default" }}
                >
                  <Circle>
                    <img src={heartSvg} alt="Conquista" width={72} height={72} />
                  </Circle>
                  <Label>{title}</Label>
                </div>
              ))}
            </Grid>
          </ExpandedContent>
        </FooterContainer>
      )}

      {/* SUCESSO */}
      <FooterAchievementsSuccess
        visible={successOpen}
        onClose={closeAll}
      />
    </>
  );
};

export default FooterAchievements;
