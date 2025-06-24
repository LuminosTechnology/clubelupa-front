/* ────────────────────────────────────────────
 * Estilos – Footer V7
 * ──────────────────────────────────────────── */
import styled, { css } from "styled-components";

/* ---------- estrutura base ---------- */
export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #8e9455;
  border-top-left-radius: 70px;
  border-top-right-radius: 70px;
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
  padding: 5px; /* espessura da barra */
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
          left: 25%;
          transform: translate(-50%, -50%);
        `
      : css`
          right: 25%;
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
/* bloco centralizado, mas texto alinhado à esquerda */
export const InfoList = styled.ul`
  display: inline-block;         /* <-- era inline-block */
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

/* ---------- botão fechar (52 × 52) ---------- */
export const CloseFooterBtn = styled.button`
  display: block;         /* força quebrar linha */
  margin: 20px auto 0;    /* 20 px abaixo dos textos e centralizado */
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 52px;
    height: 52px;
  }
`;
