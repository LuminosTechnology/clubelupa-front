import styled from 'styled-components';
import Button from '../Button';

const olive = '#8e9455';
const borderBlue = '#0f63ff';

export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: ${olive};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0 -3px 10px #00000080;
  z-index: 4;
  overflow: visible;
  touch-action: none;
  user-select: none;
`;

export const WhiteLine = styled.div`
  width: 180px;
  height: 6px;
  background: #fff;
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
`;

export const IconContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;

  img {
    width: 69px;
  height: 65px;
  margin-top: 63px;       /* ícone 63px abaixo do topo */
  margin-bottom: 30px;    /* título 30px abaixo do ícone */
  }
`;

export const Title = styled.h3`
  color: #fff;
  text-align: center;
  font-size: 25px;
  margin: 24px 0 16px;
  font-weight: 700;
  `;

export const Message = styled.p`
  color: #fff;
  text-align: center;
  font-weight: 700;
  font-size: 25px;
  line-height: 28px;
  margin: 0 24px 32px;
`;

export const ActionButton = styled(Button)`
  width: 100%;
  max-width: 340px;
  height: 60px;
  border-radius: 40px;
  margin: 0 auto 40px;
  display: block;
  background: #fff;
  color: ${olive};
  font-size: 16px;
  font-weight: 700;
`;
