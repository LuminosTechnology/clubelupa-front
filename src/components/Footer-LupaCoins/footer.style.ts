// src/components/Footer-Voucher/footer.style.ts
import styled from 'styled-components';

export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #8E9455;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0px -3px 10px 0px #00000080;
  z-index: 10;
  touch-action: none;
  user-select: none;
`;

export const WhiteLine = styled.div`
  width: 180px;
  height: 6px;
  background-color: white;
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  border-radius: 10px;
`;

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
  visibility: ${({ $expanded }) => ($expanded ? 'visible' : 'hidden')};
  transform: translateY(${({ $expanded }) => ($expanded ? '0' : '20px')});
  transition: all 0.3s ease;
  z-index: 5;
`;

export const VoucherIcon = styled.img`
  width: 69px;
  height: 65px;
  margin-top: 63px;       /* ícone 63px abaixo do topo */
  margin-bottom: 30px;    /* título 30px abaixo do ícone */
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin: 0;
  margin-bottom: 40px;    /* "Alameda..." 40px acima de "Experiência Lupa" */
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin: 0;
  margin-bottom: 17px;    /* texto 17px abaixo de "Experiência Lupa" */
`;

export const Text = styled.p<{ bold?: boolean }>`
  font-size: 16px;
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  color: white;
  margin: 0;
  margin-bottom: 17px;    /* 17px entre os dois textos e do título acima */
  line-height: 1.4;
`;


