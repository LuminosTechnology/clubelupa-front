/* ────────────────────────────────────────────
 * Footer principal do usuário – V7
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
} from "./footer.style";

import homeHome       from "../../assets/home-home.svg";
import homeLupa       from "../../assets/home-lupa.svg";
import homeNivel      from "../../assets/moeda_vazia.png";
import homeConquistas from "../../assets/home-conquistas.svg";
import homeLugares    from "../../assets/home-lugares.svg";
import footerClose from "../../assets/footer-close.svg";

import FooterAchievements from "../Footer-Achievements/FooterAchievements";
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
  const location = useLocation();
  const history  = useHistory();

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
  const minHeight = 120;
  const maxHeight = window.innerHeight * 0.8;

  const [height, setHeight]       = useState(minHeight);
  const [isDragging, setDragging] = useState(false);
  const dragRef = useRef({ startY: 0, startHeight: minHeight });

  const isCollapsed = height <= minHeight + 2;      // tolerância de 2 px
const isExpanded  = !isCollapsed;

  /* ─────────── conquistas grid ────────── */
  const [achievementsOpen,    setAchievementsOpen]    = useState(false);
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

  // ponto onde o dedo toca e a altura atual do footer
  dragRef.current = {
    startY: e.touches[0].clientY,
    startHeight: height,
  };
};

  const handleTouchMove = (e: React.TouchEvent) => {
  if (!isDragging || achievementsOpen) return;

  // quanto o dedo se moveu
  const delta = dragRef.current.startY - e.touches[0].clientY;

  // nova altura, limitada entre min e max
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

  /* ------------- só 2 alturas possíveis ------------- */
  // se soltou até 60 px acima do mínimo => cola no minHeight
  if (height <= minHeight + 60) {
    setHeight(minHeight);
  } else {
    setHeight(maxHeight);
  }
};

  /* ─────────── helpers ────────────────── */
  const progressPct = Math.min(
    1,
    (userData.experiencia! / userData.proximo_nivel!) * 150
  );

  const daysUsing = () => {
    if (!currentUser?.created_at) return 0;
    return Math.ceil(
      Math.abs(Date.now() - new Date(currentUser.created_at).getTime()) /
        (1000 * 60 * 60 * 24)
    );
  };

  /* ─────────── render ─────────────────── */
  return (
    <>
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
              "/src/assets/profile-pic.svg"
            }
          />
          <LevelBadge>
            <img src={homeNivel} alt="Moeda de nível" />
            <span>{userData.nivel}</span>
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
              <li>LupaCoins acumuladas: 30</li>
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
