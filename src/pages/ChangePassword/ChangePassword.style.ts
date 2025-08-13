import styled from "styled-components";

/* ------ Avatar sobreposto ao header ------ */
export const AvatarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 48px;
  z-index: 3;
`;

export const Avatar = styled.img`
  position: absolute;
  top: -20px;
  left: 20px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
`;

/* ------ Conteúdo principal ------ */
export const ProfileContainer = styled.div`
  position: relative;
  padding: 0 2rem; /* espaço p/ header + metade do avatar */
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  height: 50%;
  justify-content: center;
  margin-top: 5rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: var(--ion-color-primary);
  font-weight: bold;
`;

export const Input = styled.input<{ error: boolean }>`
  color: var(--ion-color-primary);
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--ion-color-primary);
  border-color: ${(props) =>
    props.error ? "var(--ion-color-danger)" : "var(--ion-color-primary)"};
  font-size: 1.2rem;
  padding: 6px;
  &::placeholder {
    color: var(--ion-color-primary);
  }
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: var(--ion-color-danger);
  line-height: 1.5;
  margin: 0;
`;

export const Button = styled.button`
  border: none;
  border-radius: 999px;
  background-color: var(--ion-color-primary);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem 1rem;
`;
