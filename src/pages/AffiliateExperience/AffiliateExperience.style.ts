import styled from 'styled-components';
import { IonCard } from '@ionic/react';

export const Container = styled.div`
  padding: 16px;
`;

export const TabsContainer = styled.div`
  margin-bottom: 20px;
`;

export const VoucherCard = styled(IonCard)`
  --background: #ffffff;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

export const VoucherHeader = styled.div`
    border-bottom: 1px solid #eee;
    padding-bottom: 12px;
    margin-bottom: 12px;
    
    h3 {
        font-size: 1.2em;
        font-weight: bold;
        color: #333;
        margin: 0;
    }
`;

export const UserInfo = styled.div`
  p {
    font-size: 0.9em;
    color: #555;
    margin: 4px 0;

    strong {
      color: #333;
    }
  }
`;

export const ActionContainer = styled.div`
  margin-top: 16px;
`;

export const VoucherInfo = styled.div`
    background-color: #f7f7f7;
    border-radius: 8px;
    padding: 10px;
    font-size: 0.9em;
    color: #444;
    display: flex;
    flex-direction: column;
    gap: 6px;

    span {
        font-weight: 500;
    }
`;

export const NoResultsMessage = styled.div<{ color?: string }>`
  text-align: center;
  margin-top: 40px;
  font-size: 1.1em;
  color: ${({ color }) => (color === 'danger' ? '#eb445a' : '#888')};
`;