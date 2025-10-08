import { useState } from "react";
import { BottomSheet } from "../../../components/BottomSheet";
import { ColapseButtonsContainer, CollapsedButton } from "../home.style";
import StoreIcon from "../../../assets/store.svg?react";
import BookOpenIcon from "../../../assets/book-open.svg?react";
import { MainPage } from "./main-page";
import { useHistory } from "react-router";
import { AchievementsPage } from "./achievements-page";
import MedalDefault from "../../../assets/medalha-geral.png";

export const HomeBottomSheet = () => {
  const [view, setView] = useState<"main" | "medals">("main");
  const history = useHistory();

  const renderOpenContent = () => {
    switch (view) {
      case "main":
        return (
          <MainPage />
        );
      case "medals":
        return <AchievementsPage />;
      default:
        null;
    }
  };

  return (
    <BottomSheet
      displayAvatar
      onClose={() => setView("main")}
      closeContent={
          <ColapseButtonsContainer>
            <CollapsedButton onClick={() => history.push("/affiliates")}>
              <BookOpenIcon style={{ width: '70px', height: 'auto', fill: '#8e9455', stroke: '#8e9455' }} />
              <span>Afiliados</span>
            </CollapsedButton>
            <CollapsedButton onClick={() => history.push("/lupacoins")}>
              <StoreIcon style={{ width: '70px', height: 'auto', fill: '#8e9455', stroke: '#8e9455' }} />
              <span>Experiências</span>
              <img src={MedalDefault} alt="Medalha" style={{ width: '18px', height: 'auto', fill: '#8e9455', stroke: '#8e9455', position: 'absolute', bottom: '20px', left: '20px' }} />
            </CollapsedButton>
          </ColapseButtonsContainer>
      }
      openContent={renderOpenContent()}
    />
  );
};
