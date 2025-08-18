import { useState } from "react";
import { BottomSheet } from "../../../components/BottomSheet";
import { ColapseButtonsContainer, CollapsedButton } from "../home.style";

import StoreIcon from "../../../assets/home-home.svg?react";
import LupaIcon from "../../../assets/home-lupa.svg?react";
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
          <MainPage
            onMedalsClick={() => setView("medals")}
            onFavoritePlacesClick={() => history.push("/favorites")}
          />
        );
      case "medals":
        return <AchievementsPage />;
      default:
        null;
    }
  };

  return (
    <BottomSheet
      closeContent={
        <>
          <ColapseButtonsContainer>
            <CollapsedButton onClick={() => history.push("/affiliates")}>
              <LupaIcon />
            </CollapsedButton>
            <CollapsedButton onClick={() => history.push("/lupacoins")}>
              <StoreIcon />
            </CollapsedButton>
          </ColapseButtonsContainer>
        </>
      }
      openContent={renderOpenContent()}
    />
  );
};
