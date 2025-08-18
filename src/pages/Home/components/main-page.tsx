import {
  MainPageContainer,
  MainPageInformation,
  MainPageMedalButton,
  MainPageMedalButtonsContainer,
} from "./styles";

import ConquistaIcon from "../../../assets/home-conquistas.svg?react";
import LugaresIcon from "../../../assets/home-lugares.svg?react";
import { useGamificationContext } from "../../../contexts/GamificationContext";

type Props = {
  onMedalsClick: () => void;
  onFavoritePlacesClick: () => void;
};

export const MainPage: React.FC<Props> = ({
  onMedalsClick,
  onFavoritePlacesClick,
}) => {
  const { gamificationSummary } = useGamificationContext();

  return (
    <MainPageContainer>
      <MainPageMedalButtonsContainer>
        <MainPageMedalButton onClick={onMedalsClick}>
          <ConquistaIcon />
          <span>Conquistas</span>
        </MainPageMedalButton>
        <MainPageMedalButton onClick={onFavoritePlacesClick}>
          <LugaresIcon />
          <span>Lugares Favoritos</span>
        </MainPageMedalButton>
      </MainPageMedalButtonsContainer>
      <MainPageInformation>
        <span>
          Lugares já visitados com Lupa:{" "}
          {gamificationSummary?.visited_establishments_count}
        </span>
        <span>
          Moedas Lupa acumuladas: {gamificationSummary?.coins_balance}
        </span>
        <span>Dias usando o Lupa: {gamificationSummary?.days_as_member}</span>
      </MainPageInformation>
    </MainPageContainer>
  );
};
