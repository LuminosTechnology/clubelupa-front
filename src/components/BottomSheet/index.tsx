import { createGesture } from "@ionic/react";
import { ReactNode, useEffect, useRef } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  AvatarContainer,
  AvatarProgressBorder,
  CloseButton,
  CustomCard,
  LevelBadge,
} from "./styles";
import CoinLevel from "../../assets/moeda_vazia.png";
import XIcon from "../../assets/x.svg?react";
import { useGamificationContext } from "../../contexts/GamificationContext";

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
  const { gamificationSummary } = useGamificationContext();

  const OPEN_Y = -window.innerHeight * 0.8;
  const CLOSED_Y = -80;

  useEffect(() => {
    let c = drawerRef.current;
    if (!c) return;

    c.style.transform = `translateY(${CLOSED_Y}px)`;
    c.dataset.open = "false";

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
        } else if (target === "close") {
          c.style.transform = `translateY(${CLOSED_Y}px)`;
          c.dataset.open = "false";
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
    let c = drawerRef.current;
    if (!c) return;

    c.style.transform = `translateY(${CLOSED_Y}px)`;
    c.dataset.open = "false";

    onClose();
  };

  return (
    <CustomCard ref={drawerRef}>
      {displayAvatar && (
        <AvatarContainer>
          <AvatarProgressBorder $progress={40}>
            <img src={user?.avatar_url || "/assets/default-photo.png"} alt="" />
          </AvatarProgressBorder>
          <LevelBadge>
            <img src={CoinLevel} alt="Moeda de nível" />
            <span>{gamificationSummary?.current_level.number || "0"}</span>
          </LevelBadge>
        </AvatarContainer>
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
