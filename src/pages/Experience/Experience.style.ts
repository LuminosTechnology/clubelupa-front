// src/pages/Experience/Experience.style.ts

import styled from 'styled-components';
import { IonCard } from '@ionic/react';

export const ScrollArea = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const Container = styled.div`
  padding: 16px;
  background-color: #ffffff;
`;

export const TabsContainer = styled.div`
  margin-bottom: 20px;
`;

export const ListWrapper = styled.div`
  margin-top: 20px;
`;

export const StoreCard = styled(IonCard)`
  --background: #f9f9f9;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* Espaçamento entre as linhas */
`;

export const StoreLine = styled.span`
  font-size: 1em;
  color: #666;

  &:first-child {
    font-weight: bold;
    font-size: 1.15em;
    color: #333;
  }
`;

export const RedemptionCodeWrapper = styled.div`
  margin-top: 16px;
  padding: 12px;
  background-color: #e0a075;
  color: #ffffff;
  border-radius: 8px;
  text-align: center;

  span {
    font-weight: bold;
    font-size: 1.3em;
    letter-spacing: 2px;
  }

  p {
      margin: 4px 0 0;
      font-size: 0.8em;
  }
`;

export const UsedDate = styled.div`
    margin-top: 12px;
    font-size: 0.9em;
    color: #888;
    text-align: right;
    width: 100%;
`;

export const NoResultsMessage = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 1.1em;
  color: #888;
`;