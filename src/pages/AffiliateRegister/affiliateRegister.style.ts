import styled from "styled-components";

export const AffiliateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 50px;

  gap: 0.5rem;

  height: 100%;
  overflow: auto;

  h2 {
    color: white;
  }

  p {
    color: white;
    margin: 0;
    font-size: 14px;
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
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;

export const AffiliateRadioInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const AffiliateRadioInputContainer = styled.div<{
  direction?: "row" | "column";
}>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  gap: 1rem;
`;

export const RadioOption = styled.div`
  background-color: blue;
  display: flex;
  align-items: center;
`;
