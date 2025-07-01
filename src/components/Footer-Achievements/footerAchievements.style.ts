/* ────────────────────────────────────────────
 * Styles – Conquistas v2 (ajustado)
 * ──────────────────────────────────────────── */
import styled, { css } from "styled-components";

/* Drawer base ----------------------------------------------------- */
export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #8e9455;
  border-top-left-radius: 70px;
  border-top-right-radius: 70px;
  box-shadow: 0 -3px 20px #00000040;
  z-index: 12;
  touch-action: none;
`;

/* Conteúdo -------------------------------------------------------- */
export const ExpandedContent = styled.div<{ $expanded: boolean }>`
  padding: 50px 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  visibility: ${({ $expanded }) => ($expanded ? "visible" : "hidden")};
  transform: translateY(${({ $expanded }) => ($expanded ? "0" : "20px")});
  transition: all 0.3s ease;
`;

/* Grid ------------------------------------------------------------ */
export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px 20px;
  justify-items: center;
`;

/* Medalha + anel progressivo ------------------------------------- */
export const AchievementWrapper = styled.div<{
  $progress: number;
  $earned: boolean;
}>`
  width: 104px;
  height: 104px;
  border-radius: 100%;
      /* espessura do anel */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;

  /* só desenha o anel quando ainda não conquistado */
  ${({ $earned, $progress }) =>
    !$earned &&
    css`
      background: conic-gradient(
        #D7A07D ${$progress}%,
        #BFC1C2 ${$progress}% 100%
      );
    `}
`;

/* Ícone interno --------------------------------------------------- */
export const Icon = styled.div<{ $src: string; $earned: boolean }>`
  width: 96px;           /* deixa 4px de “anel” à volta */
  height: 96px;
  border-radius: 100%;
  background: url(${({ $src }) => $src}) center / cover no-repeat;

  /* cinza + opacidade se ainda não conquistou */
  ${({ $earned }) =>
    !$earned &&
    css`
      filter: grayscale(1) blur(2px);
      opacity: 1;
    `}
`;

/* Título ---------------------------------------------------------- */
export const Label = styled.p`
  white-space: pre-line;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.2;
  margin: 0;
`;

/* Botão fechar ---------------------------------------------------- */
export const CloseBtn = styled.button`
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
