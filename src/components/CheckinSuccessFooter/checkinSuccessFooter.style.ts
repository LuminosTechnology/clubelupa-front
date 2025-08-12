// src/components/CheckinSuccessFooter/checkinSuccessFooter.style.ts
import styled, { keyframes } from "styled-components";

const olive = "#8e9455";
const addington = "'Addington CF', serif";

export const Shell = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  will-change: transform, opacity;
  z-index: 10;
  touch-action: none;
  user-select: none;
`;

export const FooterContainer = styled.div`
  height: 100%;
  width: 100%;
  background: ${olive};
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  box-shadow: 0 -3px 10px #00000080;
  overflow: hidden;
  position: relative;
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
    width: 150px;
    height: 150px;
    margin-top: 63px;
    margin-bottom: 30px;
  }
`;

export const Title = styled.h3`
  color: #fff;
  text-align: center;
  font-size: 33px;
  margin: 0 0 22px;
  font-weight: 400;
  font-family: ${addington};
`;

export const Subtitle = styled.p`
  color: #fff;
  text-align: center;
  font-size: 30px;
  line-height: 26px;
  margin: 0 24px 36px;
  font-family: ${addington};
  font-style: italic;
  font-weight: 550;
`;

export const InfoText = styled.p`
  color: #fff;
  text-align: center;
  font-size: 25px;
  line-height: 24px;
  margin: 0 24px 72px;
  font-family: ${addington};
  font-weight: 300;
`;

export const CloseBtn = styled.button`
  display: block;
  margin: 20px auto 40px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 52px;
    height: 52px;
  }
`;

const fall = keyframes`
  0% { transform: translateY(-120vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 1; }
`;

export const ConfettiPiece = styled.div<{
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}>`
  position: fixed;
  top: -10vh;
  left: ${({ left }) => left}%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size * 0.4}px;
  background: ${({ color }) => color};
  z-index: 9999;
  animation: ${fall} ${({ duration }) => duration}ms linear
    ${({ delay }) => delay}ms forwards;
  border-radius: 2px;
  pointer-events: none;
`;
