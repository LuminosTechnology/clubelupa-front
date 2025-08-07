import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonItem,
  IonSelect,
} from "@ionic/react";
import styled from "styled-components";

export const BaseDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const AffiliateDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const FormDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const TermsParagraph = styled.p`
  text-align: center;
  color: white;
  font-size: 1rem;
  width: 100%;
`;

export const TermsLink = styled.a`
  color: #825c12;
  text-decoration: underline;
  font-size: 1rem;
`;

export const AffiliateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 50px;

  gap: 1rem;

  height: 100%;
  overflow: auto;

  h2 {
    color: white;
  }
`;

export const AffiliateSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  padding: 0 50px;
`;

export const AffiliateTitle = styled.h1`
  color: #ffffff;
  font-size: 25px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 16px;
`;

export const AffiliateSubtitle = styled.p`
  color: #ffffff;
  font-size: 18px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 16px;
`;

export const AffiliateErrorMessage = styled.div`
  color: #ff4646;
  font-size: 12px;
  margin-top: 8px;
  width: 100%;
  text-align: left;
`;

export const AffiliateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const InputLabelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const WeekDayPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(0 0 0 / 0.33);
`;

export const WeekDayContainer = styled(IonItem)`
  --background: transparent;
`;

export const TimeInputButton = styled(IonButton)``;

export const TimeInputButtonsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ion-button {
    --background: white;
    --color: black;
  }
`;

export const DatePickerContent = styled(IonContent)``;

export const CustomSelect = styled(IonSelect)`
  --highlight-color: white;
  --background: rgb(255 255 255 / 0.33);

  &::part(icon) {
    margin-left: 1rem;
    color: white;
  }
`;

export const CheckboxLabelContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const CustomCheckbox = styled(IonCheckbox)`
  --checkbox-background-checked: rgb(255 255 255 / 0.25);
  --border-color: rgb(255 255 255 / 0.8);
  --checkbox-background: transparent;
  --checkmark-color: white;
  --border-color-checked: rbg(255 255 255 / 0.8);

  &::part(label) {
    color: white;
  }
`;

export const AffiliateRadioInputContainer = styled.div<{
  direction?: "row" | "column";
}>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  gap: 1rem;

  ion-radio {
    --color: white;

    &::part(label) {
      color: white;
    }
  }
`;

export const FormInputRow = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  gap: 0.5rem;
`;

export const FormInputColumns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SearchCEPButton = styled(IonButton)`
  --background: white;
  --color: var(--orange);
`;

export const RadioOption = styled.div`
  background-color: blue;
  display: flex;
  align-items: center;
`;
