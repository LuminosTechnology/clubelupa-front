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

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    z-index: 5;
    border-radius: 2px;
  }
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
  /* 65% da altura da tela menos margem-topo */
  max-height: calc(75vh - 50px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  padding: 20px 40px;

  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  visibility: ${({ $expanded }) => ($expanded ? 'visible' : 'hidden')};
  transform: translateY(${({ $expanded }) => ($expanded ? '0' : '20px')});
  transition: all 0.3s ease;
  z-index: 5;
`;

export const VoucherIcon = styled.img`
  width: 69px;
  height: 65px;
  display: block;
  margin: 25px auto 15px;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-align: center;
  margin: 0 0 16px;
`;

export const Validity = styled.div`
  background-color: white;
  color: #8E9455;
  font-size: 16px;
  font-weight: 700;
  border-radius: 30px;
  padding: 8px 16px;
  text-align: center;
  line-height: 1.3;
  margin: 0 auto 24px;
  z-index: 5;
  max-width: 100%;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin: 0 0 8px;
  z-index: 5;
`;

export const Text = styled.p<{ bold?: boolean }>`
  font-size: 16px;
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  color: white;
  margin: 0 0 16px;
  line-height: 1.4;
  z-index: 5;
`;
