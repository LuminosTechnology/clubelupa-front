import { IonCard } from "@ionic/react";
import CloseIcon from "../../assets/footer-close.svg?react";
import styled from "styled-components";

export const CustomCard = styled.div`
  position: absolute;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0;
  border-radius: 40px 40px 0 0;
  padding: 1rem;
  bottom: calc(-80vh);
  background-color: #8e9455;

  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;

  .swipe-helper {
    position: absolute;
    top: -55px;
    left: 0;
    width: 100%;
    height: 135px;
    z-index: 10;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .closed {
    display: block;
  }
  .open {
    display: none;
  }

  &[data-open="true"] .closed {
    display: none;
  }

  &[data-open="true"] .open {
    display: block;
  }
`;

export const AvatarContainer = styled.div`
  position: absolute;
  top: -55px;
  z-index: 10;
`;

export const AvatarProgressBorder = styled.div<{ $progress: number }>`
  border-radius: 100%;
  aspect-ratio: 1;
  width: 110px;

  padding: 5px;
  background: ${({ $progress }) =>
    `conic-gradient(#D7A07D ${$progress}%, #bfc1c2 ${$progress}% 100%)`};

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const LevelBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: -10px;

  img {
    width: 40px;
  }

  span {
    position: absolute;
    font-size: 1.5rem;
    font-weight: 800;
    color: #0e0e0e;
    z-index: 10;
    transform: translateX(-2px) translateY(-2px) rotate(5deg);
  }
`;

export const CloseButton = styled.button`
  background: rgb(255 255 255 / 0.2);
  border: 1px solid white;
  border-radius: 50%;
  aspect-ratio: 1;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-items: center;
  margin: 0 auto;
  margin-top: 2rem;
`;
