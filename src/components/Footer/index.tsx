/* ────────────────────────────────────────────
 * src/components/Footer/index.tsx
 * ──────────────────────────────────────────── */
import React, { useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  FooterContainer,
  WhiteLine,
  UserImageContainer,
  UserImage,
  UserName,
  LupaIcons,
  ExpandedContent,
  LevelContainer,
  ProgressBar,
  ExperienceText,
  Achievements,
  AchievementCircle,
  AchievementTitle,
  InfoList,
  LevelInfo,
  LevelRow,
  ProgressBarContainer,
  AchievementsContain,
  LupaPoints,
  PointsValue,
  PointsLabel,
} from "./footer.style";

import lupaIcon from "../../assets/icon-lupa.svg";
import lupaIcon2 from "../../assets/icon-lupa2.svg";
import lupaFooter from "../../assets/lupa-footer.svg"; /* novo ícone */

import { getUserByToken } from "../../services/auth-service";
import type { User } from "../../services/interfaces/Auth";

interface FooterProps {
  userData?: {
    nivel?: number;
    experiencia?: number;
    proximo_nivel?: number;
  };
}

const Footer: React.FC<FooterProps> = ({
  userData = { nivel: 1, experiencia: 750, proximo_nivel: 1000 },
}) => {
  /* ─────────── usuário logado ─────────── */
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const user = await getUserByToken();
        setCurrentUser(user);
      } catch (err) {
        console.error("[Footer] Falha ao buscar usuário:", err);
      }
    })();
  }, []);

  /* ─────────── drawer ─────────── */
  const [height, setHeight] = useState(177);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startY: 0, startHeight: 177 });

  const minHeight = 177;
  const maxHeight = window.innerHeight * 0.8;
  const isExpanded = height > minHeight + 100;

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragRef.current = { startY: e.touches[0].clientY, startHeight: height };
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = dragRef.current.startY - e.touches[0].clientY;
    setHeight(
      Math.max(minHeight, Math.min(maxHeight, dragRef.current.startHeight + delta))
    );
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
    setHeight(height > minHeight + (maxHeight - minHeight) / 2 ? maxHeight : minHeight);
  };

  const progressPercent = `${Math.min(
    100,
    (userData.experiencia! / userData.proximo_nivel!) * 100
  )}%`;

  const lupaIcons = [lupaIcon2, lupaIcon2, lupaIcon2, lupaIcon, lupaIcon];

  const calculateDaysSinceCreation = () => {
    if (!currentUser?.created_at) return 0;
    const diff =
      Math.abs(Date.now() - new Date(currentUser.created_at).getTime()) /
      (1000 * 60 * 60 * 24);
    return Math.ceil(diff);
  };

  return (
    <FooterContainer
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        height,
        transition: isDragging ? "none" : "height 0.3s ease",
      }}
    >
      <WhiteLine />

      {/* Foto & nome ---------------------------------------------------- */}
      <UserImageContainer>
        <UserImage
          src={
            currentUser?.avatar_url ||
            currentUser?.profile_photo ||
            "/src/assets/profile-pic.svg"
          }
        />
      </UserImageContainer>
      <UserName>{currentUser?.nome_completo ?? "Usuário"}</UserName>

      {/* Ícones de lupa (apenas quando expandido) ----------------------- */}
      <LupaIcons $expanded={isExpanded}>
        {lupaIcons.map((icon, i) => (
          <img key={i} src={icon} alt={`Lupa ${i}`} width={24} height={24} />
        ))}
      </LupaIcons>

      {/* Barra de nível ------------------------------------------------- */}
      <LevelContainer $expanded={isExpanded}>
        <LevelRow>
          <LevelInfo>
            <h2>{userData.nivel}</h2>
            <p>NÍVEL</p>
          </LevelInfo>

          <ProgressBarContainer>
            <ProgressBar $percent={progressPercent} />
            <ExperienceText>
              {userData.experiencia}/{userData.proximo_nivel}
            </ExperienceText>
          </ProgressBarContainer>

          {/* Moedas Lupa: exibidas só quando NÃO expandido -------------- */}
          {!isExpanded && (
            <LupaPoints>
              <img
                src={lupaFooter}
                alt="Moeda Lupa"
                className="lupa-footer-icon"
              />
              <div>
                <PointsValue>{userData.experiencia}</PointsValue>
                <PointsLabel>Moedas Lupa</PointsLabel>
              </div>
            </LupaPoints>
          )}
        </LevelRow>
      </LevelContainer>

      {/* Conteúdo extra -------------------------------------------------- */}
      <ExpandedContent $expanded={isExpanded}>
        <Achievements>
          {[
            { title: "Descobertas", icon: "bulb" },
            { title: "Conquistas", icon: "trophy-outline" },
            { title: "Medalhas", icon: "medal-outline" },
          ].map((item, i) => (
            <AchievementsContain key={i}>
              <AchievementCircle>
                <IonIcon icon={item.icon} style={{ fontSize: 24 }} />
              </AchievementCircle>
              <AchievementTitle>{item.title}</AchievementTitle>
            </AchievementsContain>
          ))}
        </Achievements>

        <InfoList>
          <li>Lugares visitados com Lupa: 10</li>
          <li>Benefícios já utilizados: 20</li>
          <li>LupaCoins acumuladas: 30</li>
          <li>Dias usando o Lupa: {calculateDaysSinceCreation()}</li>
        </InfoList>
      </ExpandedContent>
    </FooterContainer>
  );
};

export default Footer;
