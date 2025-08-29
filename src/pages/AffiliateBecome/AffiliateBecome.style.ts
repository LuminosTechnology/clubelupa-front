// src/pages/AffiliateEdit/AffiliateEdit.style.ts
import { IonSelect } from "@ionic/react";
import styled from "styled-components";

export const ProfileWrapper = styled.div<{ scrolled: boolean }>`
  position: fixed;
  top: 120px;
  left: 20px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 3;
  opacity: ${({ scrolled }) => (scrolled ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;

export const PhotoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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
  padding: 20px;
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TitleSection = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: #868950;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ErrorMessage = styled.div`
  color: var(--ion-color-danger);
`;

export const SiteContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  p {
    color: black;
    margin: 0;
  }
`;

export const UploadPhotoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const UploadLogoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  p {
    color: #666;
    font-size: 1rem;
  }
`;

export const UploadImageButton = styled.button`
  border: none;
  aspect-ratio: 16/7;
  width: 100%;
  background-color: #c8c8c8;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    object-fit: fill;
  }
`;

export const UploadPersonPhotoButton = styled.button`
  border: none;
  aspect-ratio: 1;
  width: 80%;
  background-color: #c8c8c8;
  border-radius: 999px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

export const TextAreaWrapper = styled(FieldWrapper)`
  textarea {
    background: transparent;
    color: #000;
    font-size: 16px;
    border: 1px solid #868950;
    border-radius: 4px;
    padding: 8px;
    resize: vertical;
    min-height: 120px;
  }
  textarea::placeholder {
    color: #bfbfbf;
  }
  textarea:focus {
    outline: none;
    border-color: #868950;
  }
`;

export const AffiliateUpdateRadioContainer = styled.div`
  display: flex;
  gap: 1rem;

  ion-radio {
    --color: var(--ion-color-primary);

    &::part(label) {
      color: black;
    }
  }
`;

export const CustomSelect = styled(IonSelect)`
  --highlight-color: white;
  --background: rgb(0 0 0 / 0.33);

  &::part(icon) {
    margin-left: 1rem;
    color: white;
  }
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
`;

export const SalvarButton = styled(BuscarButton)`
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SaveButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
