/* ────────────────────────────────────────────
 * register-success.style.ts
 * ──────────────────────────────────────────── */
import styled from "styled-components";

/* botão voltar — fixo no topo à esquerda */
export const BackButtonWrapper = styled.div`
  position: absolute;
  top: 50px;   /* mesmo recuo usado nas outras telas */
  left: 50px;
`;

/* área central */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;   /* centraliza verticalmente */
  min-height: 100vh;
  width: 100%;
  padding: 0 50px;
`;

/* “Parabéns” */
export const Title = styled.h1`
  color: #ffffff;
  font-size: 25px;
  font-weight: 700;
  margin: 0;
  text-align: left;
`;

/* “Bem-vindo ao Lupa” */
export const Subtitle = styled.p`
  color: #ffffff;
  font-size: 18px;
  margin: 4px 0 40px 0;
  text-align: left;
`;

/* botão pill branco */
export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    width: 100%;
    max-width: 269px;
    border-radius: 100px;
  }
`;
