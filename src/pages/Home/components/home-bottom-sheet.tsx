import { useState } from "react";
import { BottomSheet } from "../../../components/BottomSheet";
import { ColapseButtonsContainer, CollapsedButton } from "../home.style";

import StoreIcon from "../../../assets/store.svg?react";
import BookOpenIcon from "../../../assets/book-open.svg?react";
import { MainPage } from "./main-page";
import { useHistory } from "react-router";
import { AchievementsPage } from "./achievements-page";

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
            </CollapsedButton>
            <CollapsedButton onClick={() => history.push("/lupacoins")}>
              <StoreIcon style={{ width: '70px', height: 'auto', fill: '#8e9455', stroke: '#8e9455' }} />
            </CollapsedButton>
          </ColapseButtonsContainer>
      }
      openContent={renderOpenContent()}
    />
  );
};
