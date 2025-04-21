// src/pages/RecommendAndWin/RecommendAndWin.style.ts
import styled from 'styled-components';
import Button from '../../components/Button';

export const AvatarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 48px;
  z-index: 3;
`;

export const Avatar = styled.img`
  position: absolute;
  top: -20px;
  left: 20px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileContainer = styled.div`
  position: relative;
  padding: 54px 20px 20px; /* espaço para header + metade do avatar */
  width: 100%;
  box-sizing: border-box;
`;

export const UserName = styled.h2`
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: #868950;
`;

export const UserSubInfo = styled.p`
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #868950;
`;

/* novo texto "Enviar convite pelo" */
export const InviteText = styled.p`
  margin: 30px 0 0 0;
  font-size: 16px;
  color: #868950;
`;

export const LogoutWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

export const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 300px;
  background-color: #8E9455 !important;
  color: #ffffff !important;
`;

export const ActionIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
