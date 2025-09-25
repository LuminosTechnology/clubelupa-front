import { useEffect, useState } from "react";
import { useGamificationContext } from "../../../contexts/GamificationContext";
import { Medal } from "../../../types/api/user";
import {
  AchievementItem,
  AchievementsContainer,
  AchievementsListContainer,
  AchievementsParagraph,
  AchievementsTitle,
  SelectedMedalImage,
} from "./styles";

export const AchievementsPage = () => {
  const { gamificationSummary } = useGamificationContext();
  const [selectedMedal, setSelectedMedal] = useState<Medal | null>(null);
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

  return (
    <AchievementsContainer>
      {selectedMedal ? (
        <>
          <SelectedMedalImage
            src={selectedMedal.icon_url}
            alt={selectedMedal.name}
          />
          <AchievementsTitle>Parabéns</AchievementsTitle>
          <AchievementsParagraph>
            {selectedMedal.description}
          </AchievementsParagraph>
        </>
      ) : (
        <>
          <AchievementsTitle>Conquistas</AchievementsTitle>
          <AchievementsListContainer>
            {medals?.map((medal) => (
              <AchievementItem
                key={medal.id}
                onClick={() => { medal.containsMedal && setSelectedMedal(medal) } }
                className={`${!medal.containsMedal && 'disable'}`}
              >
                <img src={medal.icon_url} alt={medal.name} />
                <span>{medal.name}</span>
              </AchievementItem>
            ))}
          </AchievementsListContainer>
        </>
      )}
    </AchievementsContainer>
  );
};
