// src/pages/AffiliateStores/AffiliateStoresPage.style.ts
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

export const SearchBarWrapper = styled.div`
  margin-left: 20px;
  height: 43px;
  border-radius: 100px;
  background: #f0f0ef;
  border: 1px solid #868950;
  display: flex;
  align-items: center;
  padding: 0 15px;
  gap: 12px;
`;

export const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-family: "Karla", sans-serif;
  font-size: 12px;
  color: #cbccce;
  outline: none;

  &::placeholder {
    color: #cbccce;
  }
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
