import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 1rem;
  color: var(--ion-color-primary);
`;

export const OpeningHoursList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const OpeningHoursContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  color: black;
`;

export const HourInput = styled.input<{ error?: boolean }>`
  border: 1px solid ${(props) => (props.error ? "red" : "#ccc")};
  background-color: transparent;
  text-align: center;
  color: ${(props) => (props.error ? "red" : "black")};
`;

export const RemoveButton = styled.button`
  background-color: var(--ion-color-danger);
  border-radius: 8px;
  text-align: center;
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  height: 2rem;
`;

export const AddButton = styled.button`
  background-color: var(--ion-color-primary);
  border-radius: 8px;
  text-align: center;
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 1rem;
  margin-left: auto;

  &:disabled {
    opacity: 0.4;
  }
`;
