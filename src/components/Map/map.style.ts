import styled from "styled-components";

/* --------- área do mapa --------- */
export const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: transparent;
`;

export const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

/* --------- popup / card ---------- */
export const RestaurantCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 320px; /* ↓ menor */
  width: 85%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
`;

/* --------- layout interno -------- */
export const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RestaurantImage = styled.img`
  width: 100%;
  height: 140px; /* ↓ altura */
  object-fit: cover;
`;

export const RestaurantDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px;

  h3 {
    font-size: 14px; /* ↓ */
    color: #333;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 11px; /* ↓ */
    color: #666;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ViewMoreButton = styled.button`
  margin: 0 10px 10px;
  height: 32px; /* ↓ */
  background: var(--ion-color-primary);
  border: none;
  border-radius: 100px;
  color: #fff;
  font-size: 13px; /* ↓ */
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const CheckInButton = styled.button`
  margin: 0 10px 10px;
  background-color: var(--ion-color-secondary);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px; /* ↓ */
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
