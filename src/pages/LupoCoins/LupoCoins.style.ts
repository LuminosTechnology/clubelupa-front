// src/pages/Vouncher/LupoCoins.style.ts
import { IonContent, IonModal } from "@ionic/react";
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

// novo container para o saldo
export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;

export const BalanceLabel = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #8e9455;
  margin: 0;
  text-align: center;
`;

export const BalanceAmount = styled.p`
  font-size: 25px;
  font-weight: 800;
  color: #8e9455;
  margin: 0px 0 0;
  text-align: center;
`;

export const VouncherWrapper = styled.div`
  display: flex;
  width: 100%;
  background: #e0a075;
  border-radius: 0 20px 20px 0;
  min-height: 130px;
  max-height: 130px;
`;

export const IconContainer = styled.div`
  min-width: 130px;
  max-width: 130px;
  min-height: 130px;
  max-height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    flex: 1;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  svg {
    width: 100%;
  }
`;

export const CustomModal = styled(IonModal)`
  --background: transparent;
`;

export const CustomModalContent = styled.div`
  border-radius: 40px 40px 0 0;
  background: var(--ion-color-primary);
  height: 100%;
  overflow-y: auto;
  padding-top: 40px;
`;

export const VoucherImage = styled.img`
  width: 100%;
  border-radius: 100px;
  height: 120px;
  object-fit: cover;
  padding: 0 1rem;
`;

export const VoucherContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1rem;
`;

export const EstablishmentName = styled.h3`
  font-size: 1rem;
  margin: 0;
  text-align: center;
`;

export const VoucherCategory = styled.h3`
  font-size: 0.8rem;
  margin: 0;
  text-align: center;
`;

export const CloseVoucherButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(255 255 255 / 0.5);
  border: 1px solid white;
  border-radius: 50%;
  padding: 0.5rem;
  margin: 0 auto;
`;

export const VoucherSection = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

export const DescriptionTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  text-align: center;
  color: white;
`;

export const DescriptionText = styled.p`
  font-size: 1rem;
  color: white;
  margin: 0;
  text-align: center;
`;

export const VoucherText = styled.p`
  font-size: 1rem;
  margin: 0;
  text-align: center;
  color: white;
`;

export const VoucherButton = styled.button`
  background-color: white;
  color: var(--ion-color-primary);
  text-transform: uppercase;
  padding: 1rem;
  border: none;
  font-size: 1rem;
  border-radius: 99px;
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 16px;
  border-left: 0px solid #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const VouncherTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1.3;
`;

export const VouncherCategory = styled.p`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 400;
  color: #ffffff;
`;

export const VouncherQuantity = styled.p`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 400;
  color: #ffffff;
`;

export const ViewMore = styled.button`
  margin: 0;
  background: none;
  border: none;
  font-size: 0.8rem;
  padding: 0;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;
