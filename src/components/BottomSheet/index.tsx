import { createGesture } from "@ionic/react";
import { ReactNode, useEffect, useRef, useState  } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  AvatarContainer,
  AvatarProgressBorder,
  CloseButton,
  CustomCard,
  MainPageMedalButtonsContainer,
  MainPageMedalButton,
  SwipeIndicator,
} from "./styles";
import XIcon from "../../assets/x.svg?react";
import { useGamificationContext } from "../../contexts/GamificationContext";
import MedalDefault from "../../assets/medalha-geral.png";
import StoreIcon from "../../assets/store.svg?react";
import BookOpenIcon from "../../assets/book-open.svg?react";
import { useHistory } from "react-router";

type Props = {
  openContent: ReactNode;
  closeContent: ReactNode;
  displayAvatar?: boolean;
  onClose: () => void;
};

export const BottomSheet: React.FC<Props> = ({
  closeContent,
  openContent,
  onClose,
  displayAvatar,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthContext();
  const {  selectedMedal, setSelectedMedalState } = useGamificationContext();
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const OPEN_Y = -window.innerHeight * 0.8;
  const CLOSED_Y = -80;

  useEffect(() => {
    let c = drawerRef.current;
    if (!c) return;

    c.style.transform = `translateY(${CLOSED_Y}px)`;
    c.dataset.open = "false";
    setIsOpen(false);

    let target: "open" | "close" | null = null;

    const gesture = createGesture({
      el: c.querySelector(".swipe-helper") as HTMLDivElement,
      gestureName: "swipe-drawer",
      direction: "y",

      onMove: (e) => {
        let currentY =
          (c.dataset.open === "true" ? OPEN_Y : CLOSED_Y) + e.deltaY;

        if (currentY < OPEN_Y) currentY = OPEN_Y;
        if (currentY > CLOSED_Y) currentY = CLOSED_Y;

        c.style.transition = "none";
        c.style.transform = `translateY(${currentY}px)`;

        if (e.deltaY < -50) target = "open";
        if (e.deltaY > 50) target = "close";
      },

      onEnd: (e) => {
        c.style.transition = "200ms ease-out";

        if (target === "open") {
          c.style.transform = `translateY(${OPEN_Y}px)`;
          c.dataset.open = "true";
          setIsOpen(true);
        } else if (target === "close") {
          c.style.transform = `translateY(${CLOSED_Y}px)`;
          c.dataset.open = "false";
          setIsOpen(false);
        } else {
          // fallback se não passou do threshold
          c.style.transform =
            c.dataset.open === "true"
              ? `translateY(${OPEN_Y}px)`
              : `translateY(${CLOSED_Y}px)`;
        }

        target = null;
      },
    });

    gesture.enable(true);
  }, []);

  const handleClose = () => {
    if(selectedMedal) {
      setSelectedMedalState(null);
      return;
    }
    let c = drawerRef.current;
    if (!c) return;

    c.style.transform = `translateY(${CLOSED_Y}px)`;
    c.dataset.open = "false";
    setIsOpen(false);
    
    
    onClose();
  };

  const handleOpen = () => {
    const c = drawerRef.current;
    if (!c) return;
  
    if (c.dataset.open === "true") return;
  
    c.style.transition = "200ms ease-out";
    c.style.transform = `translateY(${OPEN_Y}px)`;
    c.dataset.open = "true";
    setIsOpen(true);
  };
  

  const handleClick = (e: React.MouseEvent) => {
    const c = drawerRef.current;
    if (!c) return;
  
    if (c.dataset.open === "true") return;
  
    const target = e.target as HTMLElement;
    const isIconOrButton = target.closest(
      ".main-page-medal-buttons-container, button, [data-icon]"
    );
  
    if (isIconOrButton) {
      e.stopPropagation();
      return;
    }
  
    handleOpen();
  };
  
  

  return (
    <CustomCard ref={drawerRef} onClick={handleClick}>
      <div className="swipe-indicator-container">
        <SwipeIndicator  />
      </div>
       <MainPageMedalButtonsContainer className="main-page-medal-buttons-container">
        <MainPageMedalButton 
          onClick={(e) => {
            e.stopPropagation();
            history.push("/affiliates");
          }} 
          data-icon="book-open"
        >
        <BookOpenIcon style={{ width: '70px', height: 'auto', fill: '#8e9455', stroke: '#8e9455'  }} />
          <span>Afiliados</span>
        </MainPageMedalButton>
        <MainPageMedalButton 
          onClick={(e) => {
            e.stopPropagation();
            history.push("/lupacoins");
          }} 
          data-icon="store"
        >
          <StoreIcon style={{ width: '70px', height: 'auto', fill: '#8e9455', stroke: '#8e9455'  }} />
          <span>Experiências</span>
          <img src={MedalDefault} alt="Medalha" style={{ width: '18px', height: 'auto', fill: '#8e9455', stroke: '#8e9455', position: 'absolute', bottom: '20px', left: '35px' }} />
        </MainPageMedalButton>
      </MainPageMedalButtonsContainer>      
      {displayAvatar && isOpen && (
        <>
         <AvatarContainer className="avatar-container">          
          <AvatarProgressBorder $progress={0} className="avatar-progress-border">
            <img src={user?.avatar_url || "/assets/default-photo.png"} alt="" />            
          </AvatarProgressBorder>
        </AvatarContainer> 
        </>
      )}
      <div className="swipe-helper" />
      <div className="content-wrapper">
        <div className="closed">{closeContent}</div>
        <div className="open">
          {openContent}

          <CloseButton onClick={handleClose}>
            <XIcon />
          </CloseButton>
        </div>
      </div>
    </CustomCard>
  );
};
