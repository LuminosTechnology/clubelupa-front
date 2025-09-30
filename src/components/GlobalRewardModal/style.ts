import { styled } from 'styled-components';
import Button from "../Button";

export const ShareButton = styled(Button)`
  width: 80%;
  background: #fff;
  margin: 6% 0;
  color: #8e9455 !important;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseBtn = styled.button`
  display: block;
  margin: 0px auto 0;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  bottom: 24%;

  img {
    width: 52px;
    height: 52px;
  }
`;