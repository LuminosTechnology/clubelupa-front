import styled from "styled-components";
import Button from "../Button";

export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #8e9455;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0 -3px 10px #00000080;
  z-index: 14;
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

export const HeartWrapper = styled.div`
  width: 250px;
  height: 250px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Heading = styled.h3`
  color: white;
  font-size: 26px;
  font-weight: 700;
  margin: 0 0 32px;
`;

export const Description = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 700; /* bold */
  line-height: 1.4;
  max-width: 320px;
  margin: 0 0 50px;
`;

export const ShareButton = styled(Button)`
  width: 100%;
  background: #fff;
  color: #8e9455 !important;     /* texto na cor pedida */
  font-weight: 700;
`;
