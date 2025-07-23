/* ────────────────────────────────────────────
 * Estilos – Footer V7 + blur + confetes
 * ──────────────────────────────────────────── */
import styled, { css, keyframes } from "styled-components";

/* ---------- animações ---------- */
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;
/* confete “caindo” */
const confettiFall = keyframes`
  0%   { transform: translateY(-100vh) rotate(0deg);   opacity: 1; }
  100% { transform: translateY(100vh)  rotate(720deg); opacity: 0; }
`;

/* ---------- blur + texto ---------- */
export const BlurOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-out forwards,
    ${fadeOut} 0.3s ease-in forwards 2.7s;
  pointer-events: none; /* não captura cliques */
`;

const pop = keyframes`
  from { transform: scale(0.6); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
`;

export const CongratsText = styled.h1`
  font-size: 48px;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 0 0 10px #00000080;
  animation: ${pop} 0.3s ease-out forwards,
    ${fadeOut} 0.3s ease-in forwards 2.7s;
`;

/* cada “pedaço” de confete */
export const ConfettiPiece = styled.span`
  position: absolute;
  top: -10px;
  width: 8px;
  height: 14px;
  border-radius: 2px;
  animation: ${confettiFall} 3s ease-out forwards;
  pointer-events: none;
`;

/* ---------- estrutura base ---------- */
export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #8e9455;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  box-shadow: 0 -3px 20px #00000040;
  z-index: 2;
  touch-action: none;
  user-select: none;
  overflow: visible;
`;

/* ---------- foto + anel progressivo ---------- */
export const UserImageContainer = styled.div<{ $progress: number }>`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 110px;
  height: 110px;
  border-radius: 50%;
  padding: 5px;
  background: ${({ $progress }) =>
    `conic-gradient(#D7A07D ${$progress}%, #bfc1c2 ${$progress}% 100%)`};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;
export const UserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
export const LevelBadge = styled.div`
  position: absolute;
  bottom: 2px;
  left: -7px;
  width: 41px;
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;

  img {
    width: 100%;
    height: 100%;
  }
  span {
    position: absolute;
    font-size: 14px;
    font-weight: 800;
    color: #0e0e0e;
  }
`;

/* ---------- nome (somente expandido) ---------- */
export const UserName = styled.h3`
  color: #fff;
  text-align: center;
  margin-top: 65px;
  font-size: 16px;
  font-weight: 400;
`;

/* ---------- nav colapsada ---------- */
export const CollapsedNav = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
`;
export const NavButton = styled.button<{ $pos: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $pos }) =>
    $pos === "left"
      ? css`
          left: 20%;
          transform: translate(-50%, -50%);
        `
      : css`
          right: 20%;
          transform: translate(50%, -50%);
        `}
  background: none;
  border: none;
  padding: 0;

  img {
    width: 34px;
    height: 34px;
  }
`;

/* ---------- conteúdo expandido ---------- */
export const ExpandedContent = styled.div`
  padding-top: 100px;
  text-align: center;
`;

/* ---------- quick actions ---------- */
export const QuickActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
`;
export const ActionItem = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
export const ActionIcon = styled.img`
  width: 104px;
  height: 104px;
`;
export const ActionTitle = styled.span`
  color: #fff;
  font-size: 14px;
  margin-top: 6px;
`;

/* ---------- info list ---------- */
export const InfoList = styled.ul`
  display: inline-block;
  text-align: left;
  padding: 0;
  margin: 0 auto;
  list-style: none;
  color: #fff;

  li {
    font-size: 16px;
    font-weight: 700;
    line-height: 34px;
  }
`;

/* ---------- botão fechar ---------- */
export const CloseFooterBtn = styled.button`
  display: block;
  margin: 20px auto 0;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 52px;
    height: 52px;
  }
`;
