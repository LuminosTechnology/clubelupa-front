// src/pages/AffiliateStores/Experience.style.ts
import styled from "styled-components";

export const ScrollArea = styled.div`
  position: absolute;
  top: 56px;       /* ajuste se seu AppHeader tiver altura diferente */
  bottom: 0;
  left: 0;
  margin-top: 80px;
  right: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 32px 20px 40px 0;
  background: #ffffff;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const StoreCard = styled.div`
  display: flex;
  width: 100%;
`;

export const StoreImage = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
`;

export const StoreInfo = styled.div`
  flex: 1;
  padding: 12px 16px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  background: #F2F2F1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const StoreLine = styled.span`
  color: #666666;
  font-size: 13px;
  font-weight: 600;
`;

export const StoreLineLink = styled.a`
  color: #666666;
  font-size: 13px;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: rgba(0, 0, 0, 0.3);
`;
