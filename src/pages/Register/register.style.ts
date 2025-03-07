import styled from "styled-components";

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

export const ContainerSucess = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  padding: 0 50px;
`;

export const Title = styled.h1`
  color: #FFFFFF;
  font-size: 25px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
`;

export const Subtitle = styled.p`
  color: #FFFFFF;
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