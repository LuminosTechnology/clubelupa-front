import styled from 'styled-components';
import { IonButton } from '@ionic/react';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
`;

export const Label = styled.label`
  position: absolute;
  left: 0;
  bottom: 10%;
  /* transform: translateY(-50%); */
  color: white;
  pointer-events: none;
  transition: all 0.2s ease;
  font-size: 16px;

  &.active {
    bottom: 50%;
    font-size: 12px;
  }

  &.error {
    color: #ff4646;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 20px 0 0;
  border: none;
  border-bottom: 1px solid white;
  background: transparent;
  color: white;
  font-weight: 700;
  font-size: 16px;
  outline: none;

  &[type="password"] {
    padding-right: 40px;
  }

  &:focus {
    border-bottom: 2px solid white;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: white !important;
    -webkit-box-shadow: 0 0 0 30px transparent inset !important;
    transition: background-color 5000s ease-in-out 0s;
    background-clip: content-box !important;
    caret-color: white;
    border-bottom: 1px solid white;
  }

  &:-webkit-autofill::first-line {
    font-size: 16px;
    font-weight: 700;
    font-family: inherit;
  }

  &.error:-webkit-autofill,
  &.error:-webkit-autofill:hover,
  &.error:-webkit-autofill:focus,
  &.error:-webkit-autofill:active {
    border-bottom-color: #ff4646;
  }

  &.error {
    border-bottom-color: #ff4646;
  }

  &.error:focus {
    border-bottom: 2px solid #ff4646;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff4646;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 16px;
`;

export const EyeButton = styled(IonButton)`
  position: absolute;
  right: 0;
  top: 20%;
  /* transform: translateY(-50%); */
  margin: 0;
  height: 100%;
  --padding-start: 8px;
  --padding-end: 8px;
  --background: transparent;
  --background-hover: transparent;
  --background-activated: transparent;
  --box-shadow: none;
  
  &::part(native) {
    padding: 0;
  }
`;