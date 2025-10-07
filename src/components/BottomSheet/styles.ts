import { IonCard } from "@ionic/react";
import CloseIcon from "../../assets/footer-close.svg?react";
import styled from "styled-components";

export const CustomCard = styled.div`
  position: absolute;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0;
  border-radius: 60px 60px 0 0;
  padding: 1rem;
  bottom: calc(-80vh);

  background: linear-gradient(
    180deg,
    #fafafa 0%,
    #f2f3eb 25%,
    #e3e6d2 45%,
    #bac090 75%,
    #a3ab6a 100%
  );

  color: #43403e;

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

  &[data-open='true'] .closed {
    display: none;
  }

  &[data-open='true'] .open {
    display: block;
  }

  &[data-open='true'] .avatar-container {
    top: 20px;
    margin-bottom: 1rem; 
    z-index: 1;

  }

  &[data-open='true'] .avatar-progress-border {
    width: 90px !important;
  }

  &[data-open='false'] .main-page-medal-buttons-container {
  display: none;
  }
`;

export const AvatarContainer = styled.div`
  position: absolute;
  top: -55px;
  z-index: 10;
  transition: all 0.3s ease; 
  img {
    border-radius: 50%;
  }
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


export const MainPageMedalButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: start;
  justify-content: space-between;
  width: 100%;
`;

export const MainPageMedalButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;

  span {
    text-align: center;
    color: #8e9455;
    font-size: 0.875rem;
    max-width: 100px;
  }
`;