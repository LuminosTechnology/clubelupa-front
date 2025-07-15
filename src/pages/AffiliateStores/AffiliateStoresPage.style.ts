// src/pages/AffiliateStores/AffiliateStoresPage.style.ts
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: blue;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  background-color: red;
`;

export const AlphabetContainer = styled.div`
  position: fixed;
  top: 250px;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: black;
  padding: 0.25rem;
`;

export const AlphabetLetter = styled.button`
  text-align: center;
  background: transparent;
  border: none;
  color: var(--ion-color-primary);
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 2rem;
`;

export const StoreListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  flex: 1;
`;

export const StoreCard = styled.div`
  display: flex;
  width: 100%;
`;

export const StoreImage = styled.img`
  width: 110px;
  aspect-ratio: 1;
  object-fit: cover;
`;

export const StoreInfo = styled.div`
  flex: 1;
  padding: 12px 16px;
  border-left: 3px solid #ffffff;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const StoreLine = styled.span`
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
`;
