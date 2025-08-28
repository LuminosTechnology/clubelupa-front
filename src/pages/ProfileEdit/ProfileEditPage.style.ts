import styled from "styled-components";

export const ProfileWrapper = styled.div<{ scrolled: boolean }>`
  position: fixed;
  top: 120px;
  left: 20px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 20;
  opacity: ${({ scrolled }) => (scrolled ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;

export const PhotoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 20;
`;

export const ProfilePhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const EditOverlay = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 32%;
  background: #868950;
  color: #ffffff;
  border: none;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Content = styled.div`
  background: #ffffff;
  margin-top: 100px; /* espaço extra para caber a foto fixa + header */
  padding: 20px;
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TitleSection = styled.h2`
  margin: 0 0 30px;
  font-size: 22px;
  font-weight: 800;
  color: #868950;
`;

export const FieldWrapper = styled.div<{ disabled?: boolean }>`
  opacity: ${({ disabled = false }) => (disabled ? 0.4 : 1)};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InputTextTheme = styled.div`
  input {
    background: transparent !important;
    color: #000;
    font-size: 18px;
    font-weight: 800;
    border: none;
    border-bottom: 1px solid #868950;
    padding: 4px 0;
    width: 100%;
  }
  input::placeholder {
    color: #bfbfbf;
    font-size: 18px;
  }
  input:focus {
    outline: none;
    border-bottom: 1px solid #868950;
  }
`;

export const GreenLabelTheme = styled.div`
  label {
    color: #868950 !important;
    font-size: 15px !important;
  }
`;

export const CepRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
`;

export const BuscarButton = styled.button`
  height: 40px;
  padding: 0 54px;
  background: #8e9455;
  color: #ffffff;
  border: none;
  border-radius: 100px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  &:active {
    opacity: 0.85;
  }
  &:disabled {
    opacity: 0.4;
  }
`;

export const SalvarButton = styled(BuscarButton)``;

export const SaveButtonWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;
