import styled from 'styled-components';

export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #8E9455;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0px -3px 10px 0px #00000080;
  z-index: 2;
  overflow: visible;
  touch-action: none;
  user-select: none;

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 2px;
  }
`;

export const WhiteLine = styled.div`
  width: 180px;
  height: 6px;
  background-color: white;
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
`;


export const UserImageContainer = styled.div`
  width: 98px;
  height: 98px;
  border-radius: 50%;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  overflow: hidden;
  border: 2px solid #8E9455;
  z-index: 999;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UserName = styled.h3`
  color: white;
  text-align: center;
  margin-top: 85px;
  font-size: 16px;
  font-weight: 400;
`;

export const LupaIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

export const ExpandedContent = styled.div<{ $expanded: boolean }>`
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  transform: translateY(${({ $expanded }) => ($expanded ? '0' : '20px')});
  transition: all 0.3s ease;
  visibility: ${({ $expanded }) => ($expanded ? 'visible' : 'hidden')};
  padding: 20px 40px;
  margin-top: 50px;
`;

export const LevelContainer = styled.div`
  color: white;
  margin-bottom: 20px;
`;

export const LevelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
`;

export const LevelInfo = styled.div`
    display: flex;
    min-width: 40px;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  
  h2 {
    font-size: 35px;
    margin: 0;
    padding: 0;
    line-height: 0.7;
  }
  
  p {
    font-size: 16px;
    margin: 0;
  }
`;

export const ProgressBarContainer = styled.div`
  flex: 1;
`;


export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: white;
  border-radius: 6px;
  position: relative;
  margin-top: 10px;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 60%;
    background-color: var(--orange);
    border-radius: 6px;
  }
`;

export const ExperienceText = styled.div`
  display: flex;
  justify-content: flex-end;
  color: white;
  font-size: 16px;
  margin-top: 4px;

  span {
    margin: 0 2px;
  }
`;

export const AchievementsContain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Achievements = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 45px 0;
  align-items: center;
`;

export const AchievementCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--orange);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

export const AchievementTitle = styled.p`
  color: white;
  text-align: center;
  margin: 5px 0;
  font-size: 14px;
`;

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  color: white;
  
  li {
    font-weight: 700;
    font-size: 16px;
    line-height: 34px;
    
    &:last-child {
      border-bottom: none;
    }
  }
`;