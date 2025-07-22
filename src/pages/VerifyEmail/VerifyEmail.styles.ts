import { IonContent } from "@ionic/react";
import styled from "styled-components";

export const CustomContent = styled(IonContent)`
  &::part(scroll) {
    display: flex;
    flex-direction: column;
    padding: 50px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  justify-content: center;
`;

export const Title = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
`;

export const Text = styled.p`
  font-size: 1rem;
  color: white;
  line-height: 1;
  margin: 0;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ErrorMessage = styled.p`
  color: #ff4646;
`;

export const Input = styled.input`
  height: 3.5rem;
  width: 3.5rem;
  aspect-ratio: 1;
  background-color: white;
  border-radius: 8px;
  border: none;
  text-align: center;
  color: #333;
  font-size: 2rem;
`;
