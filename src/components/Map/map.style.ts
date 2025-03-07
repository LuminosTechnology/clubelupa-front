import styled from 'styled-components';

export const MapWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 103.9px);
  position: relative;
  z-index: 0;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const RestaurantCard = styled.div`
  position: absolute;
  transform: translateY(-200px); // Move card above marker
  left: 20px;
  right: 20px;
  height: 100px;
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const RestaurantInfo = styled.div`
  flex: 1;
  display: flex;
  gap: 12px;
  height: 100%;
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