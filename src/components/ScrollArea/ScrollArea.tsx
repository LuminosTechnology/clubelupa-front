// src/components/ScrollArea.tsx
import React from "react";
import styled from "styled-components";

const StyledScrollArea = styled.div`
  position: absolute;
  top: 140px; /* inicia abaixo do AppHeader (altura: 138.9px) */
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

interface ScrollAreaProps {
  onScroll?: React.UIEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ onScroll, children }) => (
  <StyledScrollArea onScroll={onScroll}>{children}</StyledScrollArea>
);

export default ScrollArea;
