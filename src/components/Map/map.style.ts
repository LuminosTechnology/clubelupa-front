import styled from 'styled-components';

export const MapWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 103.9px);
  position: relative;
  margin-top: -35px;
  z-index: 0;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const RestaurantCard = styled.div`
  position: absolute;
  top: 29%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  min-width: 300px;
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #666;
`;

export const RestaurantInfo = styled.div`
  display: flex;
  gap: 12px;
`;

export const RestaurantImage = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 8px;
  object-fit: cover;
`;

export const RestaurantDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;

  h3 {
    font-size: 16px;
    color: #333;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 12px;
    color: #666;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ViewMoreButton = styled.button`
  min-width: 100px;
  height: 36px;
  background: var(--ion-color-primary);
  border: none;
  border-radius: 100px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
  padding: 0 16px;

  &:hover {
    opacity: 0.9;
  }
`;

export const CheckInButton = styled.button`
  background-color:  --ion-color-secondary;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #7A834A;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const CheckInMessage = styled.p`
  color: #ff4646;
  font-size: 14px;
  text-align: center;
  margin: 0;
`;