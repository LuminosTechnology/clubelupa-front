import styled from "styled-components";

export const CustomCard = styled.div`
  position: absolute;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0 1rem;

  justify-content: flex-start;
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
   width: 100%;
   height: auto;
  }

  .closed {
    display: block;
    width: 100%;
    padding-top: 8px;
  }

  .open {
    display: none;
    min-height: calc(70vh - 200px);
  }

  &[data-open='true'] {
    padding-top: 1rem;
    border-radius: 60px 60px 0 0;
  }

  &[data-open='false'] {
    border-radius: 30px 30px 0 0;
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

  &[data-open='true'] .swipe-indicator-container {
    display: block;
    opacity: 1;
  }

  &[data-open='false'] .swipe-indicator-container {
    display: none;
    opacity: 0;
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
  padding: 0.875rem;
  display: flex;
  align-items: center;
  justify-items: center;
  margin: 0 auto;
  position: sticky;
  z-index: 50;
  justify-self: center;
  margin-bottom: 10px;
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
  position: relative;
  z-index: 30;

  span {
    text-align: center;
    color: #8e9455;
    font-size: 0.875rem;
    max-width: 100px;
  }
`;

export const SwipeIndicator = styled.div`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 4px;
  background-color: rgba(104, 102, 102, 0.5);
  border-radius: 2px;
  z-index: 20;
  transition: opacity 0.3s ease;
`;
