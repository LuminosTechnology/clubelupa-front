import { useState } from "react";
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
            {gamificationSummary?.medals.map((medal) => (
              <AchievementItem
                key={medal.id}
                onClick={() => setSelectedMedal(medal)}
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
