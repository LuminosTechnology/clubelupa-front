import styled from "styled-components";
import InstaIcon from "../../components/icons/InstaIcon";

/* Container que engloba header + conteúdo e habilita o scroll */
export const ScrollArea = styled.div`
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

/* Header com foto do afiliado */
export const PhotoHeader = styled.div<{ image: string }>`
  position: relative;
  height: 280px;
  width: 100%;
  background: url(${p => p.image}) center/cover no-repeat;
  padding: 30px;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  overflow: hidden;
`;

/* Botão de voltar dentro de um círculo */
export const BackButtonWrapper = styled.button<{ color: string }>`
  position: absolute;
  top: 45px;
  left: 26px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: ${({ color }) => color};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s ease;
  z-index: 2;

  &:hover { opacity: 0.8; }
  &:active { opacity: 0.6; }
`;

export const BackButton = styled.img`
  width: 20px;
  height: 20px;
`;

/* Conteúdo abaixo do header — agora apenas padding */
export const InfoContainer = styled.div`
  padding: 20px;
`;

/* wrapper que alinha título e ícone de like */
export const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

/* título: bold 25px */
export const Title = styled.h1<{ color: string }>`
  margin: 0;
  font-size: 25px;
  font-weight: 700;
  color: ${({ color }) => color};
  max-width: 60%;
  word-break: break-word;
  line-height: 1.2;
`;

/* ícone de like ao lado */
export const LikeIcon = styled.img`
  width: 38px;
  height: 38px;
  margin-left: 8px;
  flex-shrink: 0;
`;

/* subtítulo: bold 16px */
export const SubTitle = styled.h2<{ color: string }>`
  margin: 4px 0 16px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ color }) => color};
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h3<{ color: string }>`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${({ color }) => color};
`;

/* texto do corpo */
export const SectionText = styled.p`
  margin: 4px 0 0;
  font-size: 16px;
  font-weight: 700;
  color: #666666;
  line-height: 1.5;
`;

/* link para Instagram */
export const LinkRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const LinkIcon = styled(InstaIcon)<{ $color: string }>`
  color: ${({ $color }) => $color};
  margin-right: 8px;
  flex-shrink: 0;
`;

export const LinkText = styled.a<{ color: string }>`
  font-size: 14px;
  color: ${({ color }) => color};
  text-decoration: none;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

/* botão CTA */
export const CTAButton = styled.button<{ bg: string }>`
  display: block;
  width: 100%;
  padding: 12px 0;
  margin: 24px 0;
  background: ${({ bg }) => bg};
  color: #ffffff;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:hover { opacity: 0.9; }
  &:active { opacity: 0.7; }
`;
