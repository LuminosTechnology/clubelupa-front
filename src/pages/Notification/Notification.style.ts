// src/pages/Notification/Notification.style.ts
import styled from 'styled-components';

/* ------ Avatar sobreposto ao header ------ */
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

/* ------ Conteúdo principal ------ */
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

export const UserSubInfo = styled.p`
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #868950;
`;

export const Divider = styled.hr`
  width: 65%;
  max-width: 280px;
  margin: 6px 0 0 0;
  border: none;
  border-top: 1px solid #868950;
`;

export const LogoutWrapper = styled.div`
  width: 100%;
  margin: 70px 0 0 0;
  display: flex;
  justify-content: center;
`;

/* container dos toggles, 60px abaixo */
export const ToggleWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 42px;
`;

/* wrapper de cada toggle + label */
export const ToggleOption = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

/* texto ao lado do toggle */
export const ToggleLabel = styled.span`
  font-size: 16px;
  color: #868950;
`;

/* switch toggle */
export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 67px;
  height: 33px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* trilho */
  span {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: #ffffff;               /* trilho branco por padrão */
    border: 1px solid #8E9455;
    border-radius: 33px;
    transition: background 0.4s;
  }

  /* knob */
  span::before {
    content: "";
    position: absolute;
    height: 29px;
    width: 29px;
    left: 2px;
    bottom: 2px;
    background: #8E9455;               /* knob verde quando desativado */
    transition: transform 0.4s, background 0.4s;
    border-radius: 50%;
  }

  /* estado ativado: trilho verde */
  input:checked + span {
    background: #8E9455;
  }

  /* estado ativado: knob branco e deslocado */
  input:checked + span::before {
    background: #ffffff;
    transform: translateX(34px);
  }
`;
