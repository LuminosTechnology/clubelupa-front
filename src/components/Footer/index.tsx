import React, { useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
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
  AchievementsContain
} from './footer.style';
import lupaIcon from '../../assets/icon-lupa.svg';
import lupaIcon2 from '../../assets/icon-lupa2.svg';

interface FooterProps {
  userData: {
    nome_completo: string;
    foto_url?: string;
    nivel: number;
    experiencia: number;
    proximo_nivel: number;
    created_at: string;
  };
}

const Footer: React.FC<FooterProps> = ({ userData }) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(177);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);
  const currentPositionY = useRef(0);
  const footerRef = useRef<HTMLDivElement>(null);
  const lupaIcons = [
    lupaIcon2,
    lupaIcon2,
    lupaIcon2,
    lupaIcon,
    lupaIcon
  ];
  const dragRef = useRef<{
    startY: number;
    startHeight: number;
  }>({ startY: 0, startHeight: 177 });

  const minHeight = 177;
  const maxHeight = window.innerHeight * 0.8;

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragRef.current = {
      startY: e.touches[0].clientY,
      startHeight: height
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const delta = dragRef.current.startY - e.touches[0].clientY;
    const newHeight = Math.max(minHeight,
      Math.min(maxHeight, dragRef.current.startHeight + delta)
    );

    setHeight(newHeight);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Snap to min or max height based on current position
    if (height > minHeight + (maxHeight - minHeight) / 2) {
      setHeight(maxHeight);
    } else {
      setHeight(minHeight);
    }
  };

  const calculateDaysSinceCreation = () => {
    const createdDate = new Date(userData.created_at);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <FooterContainer
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        height: `${height}px`,
        transition: isDragging ? 'none' : 'height 0.3s ease'
      }}
    >
      <WhiteLine />
      <UserImageContainer>
        <UserImage src={userData.foto_url || '/src/assets/profile-pic.svg'} />
      </UserImageContainer>
      <UserName>{userData.nome_completo}</UserName>
      <LupaIcons>
        {lupaIcons.map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt={`Lupa icon ${index + 1}`}
            style={{ width: '24px', height: '24px' }}
          />
        ))}
      </LupaIcons>

      <ExpandedContent $expanded={height > minHeight + 100}>
        <LevelContainer>
          <LevelRow>
            <LevelInfo>
              <h2>{userData.nivel}</h2>
              <p>NÍVEL</p>
            </LevelInfo>
            <ProgressBarContainer>
              <ProgressBar />
              <ExperienceText>
                <span>{userData.experiencia}</span>
                <span>/</span>
                <span>{userData.proximo_nivel}</span>
              </ExperienceText>
            </ProgressBarContainer>
          </LevelRow>
        </LevelContainer>

        <Achievements>
            {[
            { title: 'Descobertas', icon: 'bulb' },
            { title: 'Conquistas', icon: 'trophy-outline' },
            { title: 'Medalhas', icon: 'medal-outline' }
            ].map((item, index) => (
            <AchievementsContain key={index}>
              <AchievementCircle>
              <IonIcon icon={item.icon} style={{ fontSize: '24px' }} />
              </AchievementCircle>
              <AchievementTitle>{item.title}</AchievementTitle>
            </AchievementsContain>
            ))}
        </Achievements>

        <InfoList>
          <li>Lugares visitados com Lupa: 10</li>
          <li>Benefícios ja útilizados: 20</li>
          <li>LupaCoins acumuladas: 30</li>
          <li>Dias usando o Lupa: {calculateDaysSinceCreation()}</li>
        </InfoList>
      </ExpandedContent>
    </FooterContainer>
  );
};

export default Footer;