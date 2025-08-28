// src/pages/AffiliateStores/AffiliateStoresPage.style.ts
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const AlphabetContainer = styled.div`
  position: fixed;
  top: 140px;
  right: 0;
  display: flex;
  flex-direction: column;
  color: black;
`;

export const AlphabetLetter = styled.button`
  text-align: center;
  border: none;
  color: var(--ion-color-primary);
  padding: 0.25rem;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  font-weight: bold;

  &.active {
    transform: scale(1.2) translateX(-0.5rem);
  }
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
  margin-right: 2rem;
  padding-bottom: 2rem;
`;

export const StoreCard = styled.div`
  display: flex;
  width: 100%;
  scroll-margin-top: 145px;
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
