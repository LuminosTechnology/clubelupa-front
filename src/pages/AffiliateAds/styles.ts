import styled from "styled-components";

export const Title = styled.h1`
  color: var(--ion-color-primary);
  font-size: 2rem;
  font-family: "Addington CF", sans-serif;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  align-items: center;
`;

export const ShopItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  overflow: hidden;

  img {
    aspect-ratio: 5/2;
    width: 100%;
    object-fit: cover;
  }
`;

export const ShopItemFooter = styled.div`
  display: flex;
  background-color: var(--ion-color-primary);
  padding: 0.75rem 1rem;
  justify-content: space-between;
`;

export const ShopItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 1.2rem;

  strong {
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  button {
    color: white;
    background-color: transparent;
    border: none;
    text-align: left;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  gap: 2rem;
`;

export const ModalTitle = styled.h1`
  font-family: "Addington CF", serif;
  color: var(--ion-color-primary);
  font-size: 2rem;
  width: 100%;
  margin: 0;
`;

export const ModalParagraph = styled.p`
  font-family: "Karla", sans-serif;
  color: var(--ion-color-primary);
  font-size: 1.2rem;
  width: 100%;
  margin: 0;
`;

export const ModalButton = styled.button`
  border-radius: 999px;
  background-color: var(--ion-color-primary);
  color: white;
  text-align: center;
  font-size: 1.25rem;
  padding: 0.5rem 4rem;
  min-width: 250px;

  b {
    text-transform: uppercase;
    font-size: inherit;
  }
`;
