import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 50px;

  h2 {
    color: white;
    margin: 0;
    font-size: 25px;
  }

  p {
    margin: 0;
    font-size: 15px;
  }
`;

export const Text = styled.p`
  color: white;
  font-size: 16px;
  margin-bottom: 32px;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

export const ErrorMessage = styled.div`
  color: #ff4646;
  font-size: 12px;
  margin-top: 8px;
  width: 100%;
  text-align: left;
`;
