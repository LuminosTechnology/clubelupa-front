import styled from "styled-components";

export const MenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const MenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? "0" : "-90%")};
  width: 90%;
  height: 100%;
  background-color: var(--ion-color-tertiary);
  z-index: 1000;
  padding: 55px;
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
  margin-top: 150px;
`;

export const MenuItem = styled.button<{ enabled?: boolean }>`
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  padding: 12px 0;
  padding-left: 12px;
  font-size: 16px;
  font-weight: 700;
  font-family: "Karla", sans-serif;
  cursor: pointer;
  text-align: center;
  transition: opacity 0.2s ease;
  width: 100%;
  text-align: left;
  position: relative;

  display: flex;
  align-items: center;

  opacity: ${({ enabled }) => (enabled ? 1 : 0.4)};

  &:hover {
    opacity: ${({ enabled }) => (enabled ? 0.8 : 0.4)};
  }

  &:last-child {
    border-bottom: none;
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
