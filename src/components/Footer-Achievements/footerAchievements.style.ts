import styled from "styled-components";

/* Mesma base do FooterContainer original ----------------------- */
export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #8e9455;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0px -3px 10px #00000080;
  z-index: 12;
  touch-action: none;
  user-select: none;
`;

/* Linha branca (drag handle) igual ao original ----------------- */
export const WhiteLine = styled.div`
  width: 180px;
  height: 6px;
  background-color: white;
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
`;

/* Conteúdo animado --------------------------------------------- */
export const ExpandedContent = styled.div<{ $expanded: boolean }>`
  max-height: calc(75vh - 50px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  padding: 60px 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  visibility: ${({ $expanded }) => ($expanded ? "visible" : "hidden")};
  transform: translateY(${({ $expanded }) => ($expanded ? "0" : "20px")});
  transition: all 0.3s ease;
`;

/* Cabeçalho “Conquistas” --------------------------------------- */
export const Header = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0 0 40px;
`;

/* Grid 2×n ------------------------------------------------------ */
export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 48px;
  column-gap: 20px;
  justify-items: center;
`;

/* Círculo com ícone ------------------------------------------- */
export const Circle = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

/* Label -------------------------------------------------------- */
export const Label = styled.p`
  color: white;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.2;
  margin: 0;
`;
