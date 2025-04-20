import styled from 'styled-components';

export const Container = styled.div`
  // ...existing code...
`;

export const BackButton = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-bottom: 5px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;