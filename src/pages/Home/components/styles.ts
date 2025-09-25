import styled from "styled-components";

export const AchievementsContainer = styled.div`
  padding-top: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const AchievementsTitle = styled.h1``;

export const SelectedMedalImage = styled.img`
  width: 60%;
`;
export const AchievementsParagraph = styled.p``;

export const AchievementsListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0 3rem;
  max-height: 50vh;
  overflow-y: auto;
`;

export const AchievementItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  border: none;
  color: white;

  &.disable{
    img{
      filter: grayscale(100%);
    }
  }
`;

export const MainPageContainer = styled.div`
  padding-top: 55px;
`;

export const MainPageMedalButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: start;
  justify-content: center;
`;

export const MainPageMedalButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  span {
    text-align: center;
    color: white;
    font-size: 1rem;
    max-width: 100px;
  }
`;

export const MainPageInformation = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  gap: 1rem;

  span {
    font-size: 1rem;
  }
`;
