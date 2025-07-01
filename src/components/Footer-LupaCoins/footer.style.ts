/* ────────────────────────────────────────────
 * Styles – Footer Voucher (com botão fechar)
 * ──────────────────────────────────────────── */
import styled from "styled-components";

/* Drawer base ----------------------------------------------------- */
export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #8e9455;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0 -3px 10px #00000080;
  z-index: 10;
  touch-action: none;
  user-select: none;
`;

/* Conteúdo interno ------------------------------------------------ */
export const ExpandedContent = styled.div<{ $expanded: boolean }>`
  max-height: calc(75vh - 50px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  padding: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  visibility: ${({ $expanded }) => ($expanded ? "visible" : "hidden")};
  transform: translateY(${({ $expanded }) => ($expanded ? "0" : "20px")});
  transition: all 0.3s ease;
`;

/* Ícone da moeda -------------------------------------------------- */
export const VoucherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 63px;      /* 63 px abaixo do topo */
  margin-bottom: 20px;   /* título 30 px abaixo */
`;

/* Textos ---------------------------------------------------------- */
export const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 40px 0;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 17px 0;
`;

export const Text = styled.p<{ bold?: boolean }>`
  font-size: 16px;
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  color: #fff;
  margin: 0 0 17px 0;
  line-height: 1.4;
`;

/* Botão fechar ---------------------------------------------------- */
export const CloseBtn = styled.button`
  display: block;
  margin: 20px auto 0;    /* 20 px abaixo do botão de troca */
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 52px;
    height: 52px;
  }
`;
