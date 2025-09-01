import styled from "styled-components";

/* --------- área do mapa --------- */
export const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: transparent;
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MapLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* --------- popup / card ---------- */
export const RestaurantCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  transform: translate(-50%, 150%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  &.show {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px; /* ↓ um pouco menor */
  color: #666;
  z-index: 2;
  background-color: white;
  border-radius: 100%;
  aspect-ratio: 1;
  width: 20px;
  height: 20px;
`;

/* --------- layout interno -------- */
export const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RestaurantImage = styled.img`
  width: 100%;
  aspect-ratio: 2;
  object-fit: cover;
`;

export const RestaurantDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.25rem;

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 1rem;
    color: #666;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

export const SeeMoreLink = styled.button`
  background: transparent;
  width: 100%;
  border: none;
  color: var(--ion-color-primary);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 0.5rem;
  text-transform: uppercase;

  &:hover {
    opacity: 0.9;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ScanButton = styled.button`
  background: var(--ion-color-tertiary);
  flex: 1;
  border: none;
  border-radius: 100px;
  width: 100%;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 0.5rem 1rem; /* ↓ */
  text-transform: uppercase;

  &:hover {
    opacity: 0.9;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ViewMoreButton = styled.button`
  background: var(--ion-color-primary);
  border: none;
  border-radius: 100px;
  color: #fff;
  font-size: 1rem;
  width: 100%;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 0.5rem 1rem; /* ↓ */
  text-transform: uppercase;

  &:hover {
    opacity: 0.9;
  }
`;

export const CheckInButton = styled.button`
  background-color: var(--ion-color-secondary);
  color: #fff;
  border: none;
  border-radius: 99px;
  padding: 0.5rem 1rem; /* ↓ */
  width: 100%;
  cursor: pointer;
  font-size: 14px; /* ↓ */
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #7a834a;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const CheckInMessage = styled.p`
  color: #ff4646;
  font-size: 13px; /* ↓ */
  text-align: center;
  margin: 0 0 10px;
`;
