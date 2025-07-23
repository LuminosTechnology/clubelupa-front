import styled from "styled-components";
import Button from "../Button"; /* Button reutilizado */

/* paleta da print */
const olive = "#8e9455"; // fundo
const borderBlue = "#0f63ff"; // borda

/* ---------- estrutura base ---------- */
export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: ${olive};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0 -3px 10px #00000080;
  z-index: 3;
  touch-action: none;
  user-select: none;
  overflow: visible;
`;

export const WhiteLine = styled.div`
  width: 180px;
  height: 6px;
  background: #fff;
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
`;

/* ---------- imagem + nome ---------- */
export const UserImageContainer = styled.div`
  width: 98px;
  height: 98px;
  border-radius: 50%;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  overflow: hidden;
  border: 2px solid ${olive};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;
export const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const UserName = styled.h3`
  color: #fff;
  text-align: center;
  margin-top: 85px;
  font-size: 18px;
  font-weight: 400;
`;

/* ---------- lupa icons ---------- */
export const LupaIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 12px;
`;

/* ---------- conteúdo ---------- */
export const ExpandedContent = styled.div`
  padding: 30px 24px 40px;
  margin-top: 24px;
  color: #fff;
  text-align: center;
`;
export const Tagline = styled.h4`
  font-size: 20px;
  font-weight: 700;
  margin: 16px 0 24px;
  line-height: 1.3;
`;
export const Description = styled.p`
  font-size: 16px;
  line-height: 28px;
  margin: 0 0 32px;
`;
export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  color: #fff;
  font-size: 16px;
  margin: 12px 0 0;
  text-decoration: none;
`;
export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 28px 0 32px;
  li {
    font-size: 16px;
    line-height: 28px;
  }
`;

/* ---------- botão (usa o componente reutilizável) ---------- */
export const ActionButton = styled(Button)`
  width: 100%;
  max-width: 340px;
  height: 60px;
  border-radius: 40px;
  border: none;
  background: #fff;
  color: ${olive};
  font-size: 18px;
  font-weight: 700;
  margin: 32px auto 0; /* distância extra para cima */
  display: block;
  cursor: pointer;
`;
