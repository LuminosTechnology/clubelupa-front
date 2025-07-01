// src/pages/AffiliateView/AffiliateView.style.ts
import styled, { keyframes, css } from 'styled-components';

/* área de scroll */
export const ScrollArea = styled.div`
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

/* header com imagem */
export const PhotoHeader = styled.div<{ image: string }>`
  position: relative;
  height: 280px;
  width: 100%;
  background: url(${p => p.image}) center/cover no-repeat;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
`;

/* botão voltar */
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
  outline: none;
  -webkit-tap-highlight-color: transparent;
`;
export const BackButton = styled.img`
  width: 20px;
  height: 20px;
`;

/* container */
export const InfoContainer = styled.div`
  padding: 24px;
`;

/* keyframes de bump */
const bump = keyframes`
  0%   { transform: scale(1); }
  50%  { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

/* botão de like cinza que vira colorido ao clicar */
export const LikeButton = styled.button.attrs({ type: 'button' })<{
  liked: boolean;
  animate: boolean;
}>`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  img {
    width: 38px;
    height: 38px;

    /* cinza quando não curtido, sem filtro quando curtido */
    filter: ${({ liked }) =>
      liked ? 'none' : 'grayscale(100%)'};
    transition: filter 200ms ease-in-out;

    ${({ animate }) =>
      animate &&
      css`
        animation: ${bump} 300ms ease-out both;
      `}
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;
export const Title = styled.h1<{ color: string }>`
  margin: 0;
  font-size: 25px;
  font-weight: 700;
  color: ${({ color }) => color};
  line-height: 1.2;
  max-width: 80%;
`;

/* descrição */
export const Description = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 24px;
`;

/* botão CTA */
export const CTAButton = styled.button<{ bg: string }>`
  display: block;
  width: 100%;
  padding: 14px 0;
  margin-bottom: 32px;
  background: ${({ bg }) => bg};
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
`;

/* seções comuns */
export const Section = styled.div`
  margin-bottom: 20px;
`;
export const SectionTitle = styled.h3<{ color: string }>`
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ color }) => color};
`;
export const SectionText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
`;

/* link com ícone (instagram) */
export const LinkRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;
export const LinkIcon = styled.div<{ color: string }>`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;
export const LinkText = styled.a<{ color: string }>`
  font-size: 14px;
  color: ${({ color }) => color};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

/* link simples (site) */
export const PlainLinkRow = styled.div`
  margin-bottom: 12px;
`;
export const PlainLink = styled.a<{ color: string }>`
  font-size: 14px;
  color: ${({ color }) => color};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

/* link em negrito sempre sublinhado */
export const BoldLink = styled.a<{ color: string }>`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  color: ${({ color }) => color};
  text-decoration: underline;
  margin: 16px 0;
  cursor: pointer;
`;

/* história */
export const HistoryRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 4px;
`;
export const HistoryIcon = styled(LinkIcon)``;
export const HistTitle = styled.h3<{ color: string }>`
  font-size: 14px;
  font-weight: 700;
  color: ${({ color }) => color};
  margin: 0;
`;
export const HistText = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin: 0;
`;
