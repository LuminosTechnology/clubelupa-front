import { useState } from "react";
import { BottomSheet } from "../../../components/BottomSheet";
import { ColapseButtonsContainer, 
          CollapsedButton, 
          AvatarContainer, 
          AvatarProgressBorder,
        ColapseButtonDiv,
        IconWithCountContainer, // << Importe aqui
          IconCount   } from "../home.style";
import StoreIcon from "../../../assets/store.svg?react";
import BookOpenIcon from "../../../assets/book-open.svg?react";
import { MainPage } from "./main-page";
import { useHistory } from "react-router";
import { AchievementsPage } from "./achievements-page";
import { useAuthContext } from "../../../contexts/AuthContext";
import MedalDefault from "../../../assets/medalha-geral.png";
import HexagonalIcon from "../../../assets/icon.png";
import MoedaVazia from "../../../assets/moeda_vazia.png";

export const HomeBottomSheet = () => {
  const [view, setView] = useState<"main" | "medals">("main");
  const history = useHistory();
  const { user } = useAuthContext();

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
            <ColapseButtonDiv>
              <CollapsedButton onClick={() => history.push("/affiliates")}>
                <BookOpenIcon style={{ width: '70px', height: 'auto', fill: '#8e9455', stroke: '#8e9455' }} />
                <span>Afiliados</span>
              </CollapsedButton>
            </ColapseButtonDiv>

            <AvatarContainer className="avatar-container">  
            <IconWithCountContainer className="icon-left">
              <img src={HexagonalIcon} className="avatar-icon" alt="Ícone Hexagonal" />
              <IconCount>{ user?.points_balance }</IconCount> {/* Use seu número dinâmico aqui */}
            </IconWithCountContainer>     

              <AvatarProgressBorder $progress={0} className="avatar-progress-border">
                <img src={user?.avatar_url || "/assets/default-photo.png"} alt="" />
              </AvatarProgressBorder>

            <IconWithCountContainer className="icon-right">
              <img src={MoedaVazia} className="avatar-icon" alt="Ícone de Moeda" />
              <IconCount className="moeda">{ user?.coins_balance }</IconCount> {/* Use seu número dinâmico aqui */}
            </IconWithCountContainer>                  

            </AvatarContainer>         

            <ColapseButtonDiv>
              <CollapsedButton onClick={() => history.push("/lupacoins")}>
                <StoreIcon style={{ width: '70px', height: 'auto', fill: '#8e9455', stroke: '#8e9455' }} />
                <span>Experiências</span>
                {/* <img src={MedalDefault} alt="Medalha" style={{ width: '18px', height: 'auto', fill: '#8e9455', stroke: '#8e9455', position: 'absolute', bottom: '20px', left: '20px' }} /> */}
              </CollapsedButton>
            </ColapseButtonDiv>

            <img src={MedalDefault} className="teste" alt="Medalha" style={{ width: '18px', height: 'auto', fill: '#8e9455', stroke: '#8e9455', position: 'absolute', bottom: '20px', left: '20px' }} />

          </ColapseButtonsContainer>
      }
      openContent={renderOpenContent()}
    />
  );
};
