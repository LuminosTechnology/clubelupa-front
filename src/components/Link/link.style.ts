import styled from 'styled-components';

export const StyledLink = styled.a<{ variant?: 'primary' | 'secondary' }>`
  font-family: var(--ion-font-family);
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0;
  text-decoration: underline;
  text-decoration-style: solid;
  color: #FFFFFF;
  cursor: pointer;
  transition: opacity 0.2s ease;
  background-color: transparent;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;