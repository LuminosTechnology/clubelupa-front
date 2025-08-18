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
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
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

export const AvatarProgressBorder = styled.div<{ $progress: number }>`
  border-radius: 100%;
  aspect-ratio: 1;
  width: 110px;

  background: ${({ $progress }) =>
    `conic-gradient(#D7A07D ${$progress}%, #bfc1c2 ${$progress}% 100%)`};

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  position: absolute;
  top: -55px;
  z-index: 10;
  padding: 5px;

  img {
    background-color: red;
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
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
