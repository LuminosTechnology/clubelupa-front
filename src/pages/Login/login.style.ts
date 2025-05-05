/* ────────────────────────────────────────────
 * src/pages/Login/login.style.ts
 * ──────────────────────────────────────────── */
import styled from "styled-components";

/* layout root */
export const Container = styled.div`
  position: relative;            /* referência p/ logo absoluta  */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 40px 20px;            /* laterais + rodapé */
`;

/* topo: logo — 100 px do topo sem deslocar o restante  */
export const LogoWrapper = styled.div`
  position: absolute;
  top: 100px;                    /* espaçamento desejado */
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

/* zona central do formulário  */
export const FormWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  /* empurra o formulário para ficar logo abaixo da logo —
   * evita sobreposição sem “empurrar” o bottom link  */
  margin-top: 260px;             /* ajuste fino conforme altura real da logo */
`;

/* botão-ícone de login */
export const IconLoginButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-top: 24px;              /* espaço extra solicitado */
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }
`;

/* wrapper “esqueci minha senha” (direita do input) */
export const ForgotPasswordWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: -6px;
`;

/* “ainda não tem conta?” — distância maior do input */
export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 32px;              /* maior que antes */
  gap: 16px;
`;

/* termos de privacidade no rodapé */
export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    color: #ffffff;
    font-size: 16px;
  }
`;

/* mensagens de erro */
export const ErrorMessage = styled.div`
  color: #ff4646;
  font-size: 12px;
  margin-top: 8px;
  width: 100%;
  text-align: left;
`;

/* ──────────────────────────────────────────
 * Compat: outras telas importam ButtonContainer
 * ────────────────────────────────────────── */
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 30px;

  ion-button {
    max-width: 300px;
  }
`;
