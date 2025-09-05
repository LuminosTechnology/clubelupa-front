/* ────────────────────────────────────────────
 * src/pages/Login/login.style.ts
 * ──────────────────────────────────────────── */
import styled from "styled-components";
import Link from "../../components/Link";

/* raiz */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 0 20px 40px; /* ← padding lateral de 20 px */
`;

export const LogoWrapper = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: center;
`;

/* formulário — 50 px abaixo do logo */
export const FormWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* título */
export const FormTitle = styled.h2`
  align-self: flex-start;
  font-size: 25px;
  font-weight: 700;
  font-family: inherit;
  color: #ffffff;
  margin: 0 0 40px 0; /* 40 + gap 20 (inputs) = 60 px */
`;

/* link esqueci senha */
export const ForgotPasswordWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 9px;
`;

/* botão “ENTRAR” */
export const LoginButtonWrapper = styled.div`
  margin-top: 60px;
  width: 100%;
  max-width: 200px;

  button {
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

/* link consentimento */
export const TermsLink = styled(Link)`
  color: #d3e0a2;
  font-size: 16px;
`;

/* ────────── divisor “ou” ──────────
 * ocupa toda a largura, ignorando o padding lateral de 20 px do Container */
export const DividerOr = styled.div`
  margin: 30px -20px 0; /* -20 px compensa o padding do container */
  width: calc(100% + 40px); /* expande 20 px para cada lado */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 300;
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

/* registro — 17 px abaixo do divisor */
export const RegisterContainer = styled.div`
  margin-top: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const RegisterAffiliateLink = styled(Link)`
  margin-top: 2rem;
  color: #d3e0a2;
`;

/* mensagens de erro */
export const ErrorMessage = styled.div`
  color: #ff4646;
  font-size: 12px;
  margin-top: 8px;
  width: 100%;
  text-align: left;
`;
