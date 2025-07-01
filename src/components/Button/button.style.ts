import styled from 'styled-components';

export const StyledButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  max-height: 43px;
  padding: 0 65px;
  line-height: 100%;
  font-size: 16px;
  font-weight: 700;
  background-color: white;
  color: ${props => props.variant === 'secondary' ? '#E0A075' : '#8E9455'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  height: 43px;
  font-family: var(--ion-font-family);
  border-radius: 100px;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;