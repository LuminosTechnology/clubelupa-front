// src/pages/UpgradePlan/UpgradePlan.style.ts
import styled from 'styled-components';
import Button from '../../components/Button';

/* Avatar sobreposto */
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

/* Container principal */
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

/* Form fields */
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  &:first-of-type {
    margin-top: 40px;
  }
`;

export const Label = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #868950;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  background-color: transparent;
  font-size: 22px;
  font-weight: 400;
  color: #000;
  border: none;
  border-bottom: 1px solid #666666;
  padding: 4px 0;
  outline: none;
  width: 100%;

  &::placeholder {
    color: #666666;
  }
`;

/* CCV input */
export const CCVInput = styled(Input)`
  width: 120px;
`;

/* Row for date + CCV */
export const Row = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

export const HalfField = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PremiumButton = styled(Button)`
  padding: 12px 65px !important;
  background-color: #8E9455 !important;
  color: #ffffff !important;
  font-weight: 700;
  margin-top: 70px;
`;
