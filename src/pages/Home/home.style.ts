import { IonAlert } from "@ionic/react";
import styled from "styled-components";

export const Teste = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    background: transparent;
    z-index: 1;  
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 50px;

  h2 {
    color: white;
  }
`;

export const ColapseButtonsContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  z-index: 20;
  `;

export const CollapsedButton = styled.button`
  background: none;
  flex-direction: column;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  position: relative;
  span {
    text-align: center;
    color: #8e9455;
    font-size: 0.875rem;
  }
`;

export const ContainerSuccess = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  padding: 0 50px;
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 25px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
`;

export const Subtitle = styled.p`
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;

export const ErrorMessage = styled.div`
  color: #ff4646;
  font-size: 12px;
  margin-top: 8px;
  width: 100%;
  text-align: left;
`;

export const UserDataContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    color: #333;
    margin-bottom: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
      color: #666;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;
export const StyledAlert = styled(IonAlert)`
  .alert-message {
    white-space: pre-line; /* Faz o \n virar quebra de linha */
  }
`;

