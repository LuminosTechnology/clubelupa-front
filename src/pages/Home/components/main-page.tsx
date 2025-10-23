import {
  MainPageContainer,
  MainPageInformation,
  MainPageTitle,
  MainPageSubtitle,
  PointsBadge,
  PointsBadgeWrapper,
  MedalsPreviewGrid,
  MedalCard,
  MedalCircle,
  MedalLabel,
  SeeMoreLink,
  TitleContainer,
  AchievementsParagraph,
  SelectedMedalImage,
  AchievementsTitle,
  MedalInformationContainer,
} from "./styles";
import { useGamificationContext } from "../../../contexts/GamificationContext";
import { Medal } from "../../../types/api/user";
import { useEffect, useState } from "react";

export const MainPage: React.FC = () => {
  const { gamificationSummary, selectedMedal, setSelectedMedalState } = useGamificationContext();
  const [medals, setMedals] = useState<Medal[] | null>(null);

  useEffect( () => {
    const med = gamificationSummary && gamificationSummary.medals.map(medal => ({ 
      ...medal, containsMedal: true
    } ) );
  
    const doNotHaveMedals = gamificationSummary && gamificationSummary.does_not_have_medals.map(medal => ({ 
      ...medal, containsMedal: false
    } ) );;
  
    const medalList = [...med ?? [], ...doNotHaveMedals ?? []]
  
    setMedals(medalList);
  
  }, [gamificationSummary?.does_not_have_medals, gamificationSummary?.medals] );

  const handleSeeMore = (medal: Medal, isInEarnedMedals: Boolean) => {
    medal.containsMedal = isInEarnedMedals ? true : false;
    setSelectedMedalState(medal);
  }

  return (
    <MainPageContainer>

      {selectedMedal ? (
        <MedalInformationContainer>
            <SelectedMedalImage
              src={selectedMedal.icon_url}
              alt={selectedMedal.name}
              $containsMedal={false}
            />
            <AchievementsTitle>Parabéns</AchievementsTitle>
            <AchievementsParagraph>
              {selectedMedal.description}
            </AchievementsParagraph>
        </MedalInformationContainer>
      ) : (
      <MainPageInformation>
        
        <TitleContainer>
          <MainPageTitle>Complete objetivos</MainPageTitle>
          <MainPageSubtitle>e desbloqueie medalhas!</MainPageSubtitle>
        </TitleContainer>

        <PointsBadgeWrapper>
          <PointsBadge>
            Você tem: {gamificationSummary?.points_balance ?? 0} pontos
          </PointsBadge>
        </PointsBadgeWrapper>

        <MedalsPreviewGrid>
          {medals?.map((m) => {
            const isInEarnedMedals = gamificationSummary?.medals?.some(earnedMedal => earnedMedal.id === m.id) || false;
            
            return (
              <MedalCard key={m.id}>
                <MedalCircle $src={m.icon_url} $earned={isInEarnedMedals} />
                <MedalLabel>{m.name}</MedalLabel>
                
                <SeeMoreLink onClick={ () => handleSeeMore(m, isInEarnedMedals) }>Ver mais</SeeMoreLink>
              </MedalCard>
            );
          })}
        </MedalsPreviewGrid>
    </MainPageInformation>
    )}
    </MainPageContainer>
  );
};
