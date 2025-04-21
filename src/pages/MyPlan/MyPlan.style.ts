// src/pages/MyPlan/MyPlan.style.ts
import styled from 'styled-components';
import Button from '../../components/Button';   // ← import direto do seu components/Button

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
  padding: 54px 20px 20px;
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

export const InfoText = styled.p`
  margin: 50px 0 0;
  font-size: 16px;
  color: #868950;
  line-height: 1.4;
`;

export const PlanValue = styled.p`
  margin: 14px 0 20px 0;
  font-size: 18px;
  font-weight: 400;
  color: #868950;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

/* estendendo seu Button para criar o PremiumButton */
export const PremiumButton = styled(Button)`
  /* anula altura fixa */
  height: auto !important;
  max-height: none !important;

  /* padding extra para o texto caber */
  padding: 12px 65px !important;

  /* permite quebra de linha e centraliza */
  white-space: normal !important;
  line-height: 1.2;
  text-align: center !important;

  margin-top: 20px;
  background-color: #8E9455 !important;
  color: #ffffff !important;
  font-weight: 700;
`;
