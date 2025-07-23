/* ────────────────────────────────────────────
 * Footer principal do usuário – V7 + blur + confetes
 * ──────────────────────────────────────────── */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import {
  FooterContainer,
  UserImageContainer,
  UserImage,
  UserName,
  ExpandedContent,
  QuickActions,
  ActionItem,
  ActionIcon,
  ActionTitle,
  InfoList,
  LevelBadge,
  CollapsedNav,
  NavButton,
  CloseFooterBtn,
  BlurOverlay,
  CongratsText,
  ConfettiPiece,
} from "./footer.style";

import homeHome from "../../assets/home-home.svg";
import homeLupa from "../../assets/home-lupa.svg";
import homeNivel from "../../assets/moeda_vazia.png";
import homeConquistas from "../../assets/home-conquistas.svg";
import homeLugares from "../../assets/home-lugares.svg";
import footerClose from "../../assets/footer-close.svg";

import FooterAchievements from "../Footer-Achievements/FooterAchievements";
import { getUserByToken } from "../../services/auth-service";
import type { User } from "../../services/interfaces/Auth";

interface FooterProps {
  userData?: {
    profile_photo?: string;
    experiencia?: number;
    proximo_nivel?: number;
  };
}

const Footer: React.FC<FooterProps> = ({
  userData = { nivel: 10, experiencia: 750, proximo_nivel: 1000 },
}) => {
  const location = useLocation();
  const history = useHistory();

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

  /* ─────────── drawer principal ───────── */
  const minHeight = 80;
  const maxHeight = window.innerHeight * 0.8;

  const [height, setHeight] = useState(minHeight);
  const [isDragging, setDragging] = useState(false);
  const dragRef = useRef({ startY: 0, startHeight: minHeight });

  const isCollapsed = height <= minHeight + 2;
  const isExpanded = !isCollapsed;

  /* ─────────── conquistas grid ────────── */
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [achievementsTrigger, setAchievementsTrigger] = useState(0);

  const collapseFooter = () => {
    setAchievementsOpen(false);
    setHeight(minHeight);
  };

  useEffect(() => {
    setAchievementsOpen(false);
    setHeight(minHeight);
    setDragging(false);
  }, [location.pathname]);

  useEffect(() => {
    if (achievementsOpen) setHeight(minHeight);
  }, [achievementsOpen]);

  /* ─── gestos ─────────────────────────── */
  const handleTouchStart = (e: React.TouchEvent) => {
    if (achievementsOpen) return;
    setDragging(true);
    dragRef.current = { startY: e.touches[0].clientY, startHeight: height };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || achievementsOpen) return;
    const delta = dragRef.current.startY - e.touches[0].clientY;
    setHeight(
      Math.max(
        minHeight,
        Math.min(maxHeight, dragRef.current.startHeight + delta)
      )
    );
  };

  const handleTouchEnd = () => {
    if (achievementsOpen) return;
    setDragging(false);
    if (height <= minHeight + 60) setHeight(minHeight);
    else setHeight(maxHeight);
  };

  /* ─────────── helpers ────────────────── */
  const progressPct = Math.min(
    100,
    (userData.experiencia! / userData.proximo_nivel!) * 150 // → saturado em 100
  );

  const daysUsing = () => {
    if (!currentUser?.created_at) return 0;
    return Math.ceil(
      Math.abs(Date.now() - new Date(currentUser.created_at).getTime()) /
        (1000 * 60 * 60 * 24)
    );
  };

  /* ─────────── blur / parabéns + confete ─ */
  const [showBlur, setShowBlur] = useState(false);

  useEffect(() => {
    if (progressPct >= 100) {
      setShowBlur(true);

      const timer = setTimeout(() => {
        setShowBlur(false);
      }, 3300); // 0,3 s fade-in + 2,7 s visível + 0,3 s fade-out

      return () => clearTimeout(timer);
    }
  }, [progressPct]);

  /* ---------- confetes ---------- */
  const colors = [
    "#ff595e",
    "#ffca3a",
    "#8ac926",
    "#1982c4",
    "#6a4c93",
    "#ffffff",
  ];
  const confettiCount = 40;

  /* ─────────── render ─────────────────── */
  return (
    <>
      {showBlur && (
        <BlurOverlay>
          <CongratsText>PARABÉNS!</CongratsText>

          {/* peças de confete */}
          {Array.from({ length: confettiCount }).map((_, i) => (
            <ConfettiPiece
              key={i}
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor:
                  colors[Math.floor(Math.random() * colors.length)],
                animationDelay: `${Math.random()}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </BlurOverlay>
      )}

      <FooterContainer
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ height, transition: isDragging ? "none" : "height 0.3s ease" }}
      >
        {/* foto + anel de nível + moedinha */}
        <UserImageContainer $progress={progressPct}>
          <UserImage
            src={
              currentUser?.avatar_url ||
              currentUser?.profile_photo ||
              "/assets/default-profile-photo.png"
            }
          />
          <LevelBadge>
            <img src={homeNivel} alt="Moeda de nível" />
          </LevelBadge>
        </UserImageContainer>

        {/* nome somente quando expandido */}
        {isExpanded && (
          <UserName>{currentUser?.nome_completo ?? "Usuário"}</UserName>
        )}

        {/* navegação colapsada */}
        {isCollapsed && (
          <CollapsedNav>
            <NavButton
              $pos="left"
              onClick={() => history.push("/affiliates")}
              aria-label="Buscar"
            >
              <img src={homeLupa} alt="Ícone de busca" />
            </NavButton>
            <NavButton
              $pos="right"
              onClick={() => history.push("/lupacoins")}
              aria-label="Home"
            >
              <img src={homeHome} alt="Ícone home" />
            </NavButton>
          </CollapsedNav>
        )}

        {/* conteúdo expandido */}
        {isExpanded && (
          <ExpandedContent>
            <QuickActions>
              <ActionItem
                onClick={() => {
                  setAchievementsOpen(true);
                  setAchievementsTrigger((n) => n + 1);
                }}
              >
                <ActionIcon src={homeConquistas} alt="Conquistas" />
                <ActionTitle>Conquistas</ActionTitle>
              </ActionItem>

              <ActionItem onClick={() => history.push("/favorites")}>
                <ActionIcon src={homeLugares} alt="Lugares favoritos" />
                <ActionTitle>Lugares Favoritos</ActionTitle>
              </ActionItem>
            </QuickActions>

            <InfoList>
              <li>Lugares visitados com Lupa: 10</li>
              <li>Benefícios já utilizados: 20</li>
              <li>Moedas Lupa acumuladas: 30</li>
              <li>Dias usando o Lupa: {daysUsing()}</li>
            </InfoList>

            <CloseFooterBtn onClick={collapseFooter}>
              <img src={footerClose} alt="Fechar footer" />
            </CloseFooterBtn>
          </ExpandedContent>
        )}
      </FooterContainer>

      {/* grid de conquistas */}
      <FooterAchievements
        visible={achievementsOpen}
        expandTrigger={achievementsTrigger}
        onClose={() => setAchievementsOpen(false)}
      />
    </>
  );
};

export default Footer;
