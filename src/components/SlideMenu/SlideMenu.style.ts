import styled from 'styled-components';

export const MenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const MenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? '0' : '-90%')};
  width: 90%;
  height: 100%;
  background-color: var(--ion-color-tertiary);
  z-index: 1000;
  padding: 50px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  color: white;
  cursor: pointer;
  font-size: 30px;
`;

export const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 50px;
`;

export const MenuItem = styled.button`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 20px 0;
  font-size: 16px;
  font-family: 'Karla', sans-serif;
  cursor: pointer;
  text-align: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 50px;
  right: 50px;
  color: white;
  cursor: pointer;
  font-size: 18px;
`;