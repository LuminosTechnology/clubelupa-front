import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 50px;
  margin-top: 20%;

  h2 {
    color: white;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  gap: 30px;

  ion-button {
    max-width: 300px;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    color: #FFFFFF;
    font-size: 16px;
    margin-top: 30px;
  }
`;

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  gap: 16px;
`;

export const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% + 100px);
  color: #FFFFFF;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #FFFFFF;
  }

  &::before {
    margin-right: 16px;
  }

  &::after {
    margin-left: 16px;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff4646;
  font-size: 12px;
  margin-top: 8px;
  width: 100%;
  text-align: left;
`;