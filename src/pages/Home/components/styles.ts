import styled from "styled-components";

export const AchievementsContainer = styled.div`
  padding-top: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const AchievementsTitle = styled.h1`
margin: 0;
`;

export const SelectedMedalImage = styled.img<{ $containsMedal: boolean }>`
  width: 60%;
  
`;
export const AchievementsParagraph = styled.p`
margin: 0;
`;

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
  margin-top: 64px;
  overflow-y: auto;
  max-height: calc(65vh - 100px);
  
  @media (max-height: 600px) {
    max-height: calc(55vh - 100px);
    padding-bottom: 100px;
  }
  
  @media (max-height: 500px) {
    max-height: calc(45vh - 100px);
    padding-bottom: 120px;
  }
`;


export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainPageTitle = styled.h2`
  color: #8e9455;
  font-size: 28px;
  font-weight: 400;
  font-family: serif;
  text-align: center;
  margin: 0;
`;

export const MainPageSubtitle = styled.p`
  color: #8e9455;
  font-size: 20px;
  font-family: serif;
  font-style: italic;
  text-align: center;
  margin: 0;
`;

export const PointsBadge = styled.div`
  display: inline-block;
  background: #7c8836;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  padding: 8px 14px;
  border-radius: 10px;
`;

export const PointsBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const MedalsPreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 360px;
  margin: 0 auto 8px;
`;

export const MedalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  gap: 8px;
`;

export const MedalCircle = styled.div<{ $src?: string; $earned?: boolean }>`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${({ $src }) => ($src ? `url(${$src}) center/80% no-repeat` : "transparent")};
  filter: ${({ $earned }) => ($earned ? 'grayscale(0%) blur(0px)' : 'grayscale(100%) blur(2px)')};
`;

export const MedalLabel = styled.div`
  font-size: 14px;
  text-align: center;
`;

export const SeeMoreLink = styled.button`
  background: none;
  border: none;
  color: #fafafa;
  font-size: 14px;
  text-decoration: underline;
`;


export const MainPageInformation = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;

  span {
    font-size: 1rem;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #8e9455;
  font-size: 14px;
  text-decoration: underline;
`;

export const MedalInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
