import { IonContent, IonHeader, IonToolbar } from "@ionic/react";
import styled from "styled-components";

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
  margin-bottom: 2rem;
  font-size: 16px;
  color: #868950;
`;

/* ------ Itens de menu e divisórias ------ */
export const MenuOption = styled.p<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #868950;
  margin: 0;
  padding: 12px;
  cursor: pointer;
`;

export const DeleteAccountOption = styled.p<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: var(--ion-color-danger);
  margin: ${({ primary }) => (primary ? "58px 0 0 0" : "12px 0 0 0")};
  cursor: pointer;
  margin-top: 2rem;
`;

export const MenuIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

export const Divider = styled.hr`
  width: 100%;
  margin: 6px 0 0 0;
  border: none;
  border-top: 1px solid #868950;
`;

/* Container para o botão de logout, 70px acima */
export const LogoutWrapper = styled.div`
  width: 100%;
  margin: 70px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
`;

export const PasswordInput = styled.input`
  background-color: transparent;
  border: 1px solid black;
  font-size: 1.2rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
`;

export const DeleteAccountModalContent = styled(IonContent)`
  display: flex;
  flex-direction: column;

  --background: white;
  --color: black;
`;
export const DeleteAccountModalHeader = styled(IonHeader)``;
export const DeleteAccountModalToolbar = styled(IonToolbar)`
  --background: var(--ion-color-danger);
  --color: white;
`;

export const DeleteAccountColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;

  p {
    margin: 0;
  }
`;

export const DeleteButton = styled.button`
  background-color: var(--ion-color-danger);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0.75rem 2rem;
  border-radius: 999px;
`;
