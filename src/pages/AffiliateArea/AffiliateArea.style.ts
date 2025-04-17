import styled from 'styled-components';

/* ------ Foto de perfil sobreposta ------ */
export const ProfileWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 48px;      /* metade da altura do círculo (96px) */
  z-index: 3;
`;

export const ProfilePhoto = styled.img`
  position: absolute;
  top: -20px;        /* sobrepõe o header */
  left: 20px;        /* respeita padding lateral */
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
`;

/* ------ Conteúdo principal ------ */
export const AreaContainer = styled.div`
  position: relative;
  padding: 54px 20px 20px;   /* espaço p/ header + metade da foto */
  width: 100%;
  box-sizing: border-box;
`;

export const Name = styled.h2`
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: #868950;
`;

export const SubInfo = styled.p`
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #868950;
`;

/* ------ Ações e divisórias ------ */
export const Option = styled.p<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #868950;
  margin: ${({ primary }) => (primary ? '58px 0 0 0' : '12px 0 0 0')};
  cursor: pointer;
`;

/* Ícone posicionado à esquerda de cada opção (16×16) */
export const OptionIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

/* linha divisória */
export const Divider = styled.hr`
  width: 65%;
  max-width: 280px;
  margin: 6px 0 0 0;
  border: none;
  border-top: 1px solid #868950;
`;

/* Container para o botão de logout, 70px acima do botão */
export const LogoutContainer = styled.div`
  width: 100%;
  margin: 70px 0 0 0;
  display: flex;
  justify-content: center;
`;
