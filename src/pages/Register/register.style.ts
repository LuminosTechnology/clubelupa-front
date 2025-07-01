/* ────────────────────────────────────────────
 * register.style.ts
 * ──────────────────────────────────────────── */
import styled from "styled-components";
import Link from "../../components/Link";

/* layout principal */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 50px;
  
  /* título — 60 px abaixo do BackButton */
  h2 {
    color: #ffffff;
    font-size: 25px;
    font-weight: 700;
    margin-top: 60px;
    margin-bottom: 40px;      /* distância até o primeiro input (40 + gap 20 = 60) */
  }
`;

/* botão criar conta */
export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 40px;            /* 40 px após o último campo */
  display: flex;
  justify-content: center;

  button {
    max-width: 250px;
    width: 100%;
  }
`;

/* consentimento */
export const TermsWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 320px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    color: #ffffff;
    font-size: 16px;
  }
`;

/* link consentimento com cor #825C12 */
export const TermsLink = styled(Link)`
  color: #825C12;
  font-size: 16px;
`;

/* divisor “ou” */
export const DividerOr = styled.div`
  margin: 30px -20px 0;
  width: calc(100% + 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  letter-spacing: 2px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-top: 1px solid #ffffff;
    opacity: 0.7;
  }

  &::before {
    margin-right: 12px;
  }
  &::after {
    margin-left: 12px;
  }
`;

/* link para login — 17 px abaixo do divisor */
export const LoginLinkContainer = styled.div`
  margin-top: 17px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

/* mensagens de erro */
export const ErrorMessage = styled.div`
  color: #ff4646;
  font-size: 12px;
  margin-top: 8px;
  width: 100%;
  text-align: left;
`;
