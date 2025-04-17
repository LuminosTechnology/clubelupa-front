import styled from 'styled-components';

/* -------- Foto sobreposta -------- */
export const ProfileWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  z-index: 3;
`;

export const ProfilePhoto = styled.img`
  position: absolute;
  top: -20px;
  left: 20px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 4px solid #ffffff;
  object-fit: cover;
`;

export const EditPhotoButton = styled.button`
  position: absolute;
  bottom: -16px;
  left: 20px;
  width: 96px;
  height: 32px;
  background: #868950;
  color: #ffffff;
  border: none;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  font-size: 14px;
  cursor: pointer;
`;

/* -------- Conteúdo -------- */
export const EditContainer = styled.div`
  position: relative;
  padding: 160px 20px 40px;   /* 160px p/ header (140) + foto (sobresposta) */
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;          /* garante rolagem se o conteúdo for grande */
`;

export const TitleSection = styled.h2`
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  color: #868950;
`;

/* Botão centralizado */
export const SaveButtonWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;

export const GreenTheme = styled.div`
  color: #868950;

  /* rótulos do FloatingInput (caso use label flutuante) */
  label {
    color: #868950 !important;
  }

  /* texto digitado */
  input {
    color: #868950 !important;
    border-color: #868950 !important;
  }

  /* placeholder */
  input::placeholder {
    color: #868950 !important;
    opacity: 0.7;
  }

  /* borda inferior / foco do FloatingInput */
  .underline, .underline:after {
    background-color: #868950 !important;
  }
`;