import { createGesture } from "@ionic/react";
import { ReactNode, useEffect, useRef } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { AvatarProgressBorder, CloseButton, CustomCard } from "./styles";
import XIcon from "../../assets/x.svg?react";

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

  const OPEN_Y = -window.innerHeight * 0.8;
  const CLOSED_Y = -80;

  useEffect(() => {
    let c = drawerRef.current;
    if (!c) return;

    c.style.transform = `translateY(${CLOSED_Y}px)`;
    c.dataset.open = "false";

    const gesture = createGesture({
      el: c.querySelector(".swipe-helper") as HTMLDivElement,
      gestureName: "swipe-up",
      direction: "y",

      onMove: (e) => {
        let currentY =
          (c.dataset.open === "true" ? OPEN_Y : CLOSED_Y) + e.deltaY;

        if (currentY < OPEN_Y) currentY = OPEN_Y;
        if (currentY > CLOSED_Y) currentY = CLOSED_Y;

        c.style.transition = "none";
        c.style.transform = `translateY(${currentY}px)`;
      },

      onEnd: (e) => {
        c.style.transition = "200ms ease-out";

        if (e.deltaY < -50) {
          c.style.transform = `translateY(${OPEN_Y}px)`;
          c.dataset.open = "true";
        } else {
          c.style.transform = `translateY(${CLOSED_Y}px)`;
          c.dataset.open = "false";
        }
        // console.log(e);
      },
    });

    gesture.enable(true);
  }, []);

  const handleClose = () => {
    let c = drawerRef.current;
    if (!c) return;

    c.style.transform = `translateY(${CLOSED_Y}px)`;
    c.dataset.open = "false";
  };

  return (
    <CustomCard ref={drawerRef}>
      {displayAvatar && (
        <AvatarProgressBorder $progress={40}>
          <img src={user?.avatar_url || "/assets/default-photo.png"} alt="" />
        </AvatarProgressBorder>
      )}
      <div className="swipe-helper" />
      <div className="content-wrapper">
        <div className="closed">{closeContent}</div>
        <div className="open">{openContent}</div>
      </div>
      <CloseButton onClick={handleClose}>
        <XIcon />
      </CloseButton>
    </CustomCard>
  );
};
