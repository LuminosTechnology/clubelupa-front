import styled from "styled-components";

// ocupa todo o espaço abaixo do header fixo
export const ScrollArea = styled.div`
  position: absolute;
  top: 56px; /* ajuste conforme a altura real do seu AppHeader */
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 80px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export const VouncherWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 110px;
  background: #E6C178;
  border-radius: 0 20px 20px 0;
  overflow: hidden;
`;

export const IconContainer = styled.div`
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 69px;
    height: 65px;
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 16px;
  border-left: 3px solid #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const VouncherTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  line-height: 1.3;
`;

export const VouncherCategory = styled.p`
  margin: 4px 0 0;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
`;

export const VouncherExpiry = styled.p`
  margin: 4px 0 0;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
`;

export const ViewMore = styled.button`
  margin-top: 8px;
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: 600;
  color: #94995E;
  cursor: pointer;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;
