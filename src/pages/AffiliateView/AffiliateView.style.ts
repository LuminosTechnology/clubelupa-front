import styled, { keyframes, css } from "styled-components";

export const SpinnerContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const ScrollArea = styled.div`
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export const PhotoHeader = styled.div<{ image: string }>`
  position: relative;
  height: 280px;
  width: 100%;
  background: url(${(p) => p.image}) center/cover no-repeat;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
`;

export const BackButtonWrapper = styled.button<{ color: string }>`
  position: fixed;
  margin-top: 2rem;
  left: 5%;
  z-index: 10;
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

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 25px 0;
`;

const bump = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

type Button = {
  liked: boolean;
  animate: boolean;
  color: string;
};

export const LikeButton = styled.button.attrs({ type: "button" })<Button>`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  svg {
    width: 38px;
    height: 38px;
    color: ${({ liked, color }) => (liked ? color : "#666")};
    transition: all 200ms ease-in-out;

    ${({ animate }) =>
      animate &&
      css`
        animation: ${bump} 300ms ease-out both;
      `}
  }
`;

export const TitleOpenStatusContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;

  p {
    color: #888;
    margin: 0;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 0 25px;
`;
export const Title = styled.h1<{ color: string }>`
  margin: 0;
  font-size: 25px;
  font-weight: 700;
  color: ${({ color }) => color};
  line-height: 1.2;
  max-width: 80%;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export const OpenStatus = styled.span<{ status?: "open" | "closed" }>`
  background-color: ${({ status }) =>
    status === "open"
      ? "var(--green)"
      : status === "closed"
      ? "#c06361"
      : "#666"};
  border-radius: 99px;
  font-weight: bold;
  color: white;
  padding: 0 1rem;
  line-height: 100%;
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: var(--ion-color-danger);
  line-height: 1.5;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CheckinMessage = styled.p<{ color: string }>`
  font-size: 1rem; /* ↓ */
  text-align: center;
  margin: 0 0 10px;
  color: ${({ color }) => color};
`;

export const CTAButton = styled.button<{ bg: string }>`
  display: block;
  width: 217px;
  margin: 0 auto;
  padding: 14px 0;
  margin-bottom: 0.5rem;
  background: ${({ bg }) => bg};
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Section = styled.div`
  padding: 0 25px;
  display: flex;
  flex-direction: column;
`;

export const ProductPhoto = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
`;

export const BehindScenesPhoto = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
`;

export const SectionTitle = styled.h3<{ color: string }>`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ color }) => color};
`;

export const MainCategory = styled.h3<{ color: string }>`
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ color }) => color};
`;

export const SectionText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
`;

export const AddressText = styled.a`
  margin: 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
`;

export const LinksContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const LinkRow = styled.a<{ color: string }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 12px;
  padding: 0 25px;
  color: ${({ color }) => color};
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

export const BoldLink = styled.a<{ color: string }>`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  color: ${({ color }) => color};
  text-decoration: underline;
  margin: 16px 0;
  cursor: pointer;
`;

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

const fall = (turns: number) => keyframes`
  0% { transform: translateY(-120vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(${360 * turns}deg); opacity: 1; }
`;

export const ConfettiPiece = styled.div<{
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  turns: number;
  showConfetti: boolean;
}>`
  position: fixed;
  top: -1rem;
  left: ${({ left }) => left}%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size * 0.4}px;
  background: ${({ color }) => color};
  z-index: 9999;
  animation: ${({ turns }) => fall(turns)} ${({ duration }) => duration}ms
    linear ${({ delay }) => delay}ms forwards;
  opacity: ${({ showConfetti }) => (showConfetti ? 1 : 0)};
  border-radius: 2px;
  pointer-events: none;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
`;

export const AlternativeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 0 25px;
`;

export const AlternativeLabel = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
  text-align: center;
`;

export const AlternativeButton = styled.button<{ bg: string }>`
  display: block;
  width: 217px;
  margin: 0 auto;
  padding: 14px 0;
  background: ${({ bg }) => bg};
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;