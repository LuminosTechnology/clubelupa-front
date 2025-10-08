import { IonAccordionGroup ,IonCheckbox, IonList, IonModal } from "@ionic/react";
import styled from "styled-components";

export const Modal = styled(IonModal)`
  --ion-background-color: #ffffff;
  --ion-text-color: #000000;
  --ion-item-background: #ffffff;
  --ion-item-color: #000000;

  ion-accordion-group {
    padding: 6% 4%;
    background-color: white;
    
  }

  ion-button {
    background-color: #e6c178;
    color: #000;
    border: none;
    padding: 2% 1%;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin: -2% 0 0 4%;
  }

    ion-item {
    color: #9fa369;    
    border: none;
  }

    button {
      border: none;
    }  

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
    margin-right: 10px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 8%;

  h1 {
    font-size: 1.2rem;
    color: #fff;
    font-weight: normal;
    margin: 0;
  }

  ion-button {
    background: transparent;  
    border: 1px solid #fff;
    border-radius: 50%;
    color: #fff;
    padding: 0;
    cursor: pointer;  

    ion-icon {
        font-size: 20px;
    }

  }
  
`;

export const SubmitButton = styled.button`
  background-color: #e6c178;
  color: #000;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 8%;
`;
