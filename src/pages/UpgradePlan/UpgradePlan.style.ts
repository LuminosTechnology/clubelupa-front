// src/pages/UpgradePlan/UpgradePlan.style.ts
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
  padding: 54px 20px 20px; /* espaço p/ header + metade do avatar */
  width: 100%;
  box-sizing: border-box;
`;

export const UserName = styled.h2`
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: #868950;
`;

/* 4px entre subinfos (CPF e email colados) */
export const UserSubInfo = styled.p`
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #868950;
`;

/* ----- Campos de formulário ----- */
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  /* primeiro campo 40px abaixo do email */
  &:first-of-type {
    margin-top: 40px;
  }
`;

export const Label = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #868950;
  margin-bottom: 5px; /* 5px entre título e input */
`;

export const Input = styled.input`
  background-color: transparent;
  font-size: 22px;
  font-weight: 400;
  color: #000;
  border: none;
  border-bottom: 1px solid #666666; /* linha em #666666 */
  padding: 4px 0;
  outline: none;
  width: 100%;

  &::placeholder {
    color: #666666;
    pointer-events: none;
  }
`;

/* campo CCV com largura fixa */
export const CCVInput = styled(Input)`
  width: 120px; /* ajusta pra caber "XXX" e evita linha longa */
`;

export const Row = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

export const HalfField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PremiumButton = styled(Button)`
  height: auto !important;
  max-height: none !important;
  padding: 12px 65px !important;
  white-space: normal !important;
  text-align: center !important;
  background-color: #8E9455 !important;
  color: #ffffff !important;
  font-weight: 700;
  margin-top: 70px;
`;
