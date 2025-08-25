import { IonCheckbox, IonList, IonModal } from "@ionic/react";
import styled from "styled-components";

export const Modal = styled(IonModal)`
  --ion-background-color: #ffffff;
  --ion-text-color: #000000;
  --ion-item-background: #ffffff;
  --ion-item-color: #000000;
`;

export const List = styled(IonList)`
  .sub-list {
    margin-left: 20px;
  }
`;

export const Checkbox = styled(IonCheckbox)`
  --background: #fff;
  --border-color: var(--ion-color-primary);
  --checkmark-color: white;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
`;

export const SubmitButton = styled.button`
  background-color: #e6c178;
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;
