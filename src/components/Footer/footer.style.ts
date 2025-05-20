/* ────────────────────────────────────────────
 * src/components/Footer/footer.style.ts
 * ──────────────────────────────────────────── */
import styled, { css } from "styled-components";

/* ---------- estrutura base ---------- */
export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #8e9455;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0 -3px 10px #00000080;
  z-index: 2;
  touch-action: none;
  user-select: none;
  overflow: visible;

  &::after {
    content: "";
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 2px;
  }
`;

export const WhiteLine = styled.div`
  width: 180px;
  height: 6px;
  background: #fff;
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
`;

/* ---------- usuário ---------- */
export const UserImageContainer = styled.div`
  width: 98px;
  height: 98px;
  border-radius: 50%;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  overflow: hidden;
  border: 2px solid #8e9455;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;
export const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const UserName = styled.h3`
  color: #fff;
  text-align: center;
  margin-top: 85px;
  font-size: 16px;
  font-weight: 400;
`;

/* ---------- lupas topo ---------- */
export const LupaIcons = styled.div<{ $expanded: boolean }>`
  ${({ $expanded }) =>
    $expanded
      ? css`
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        `
      : css`
          display: none;
        `}
`;

/* ---------- barra de nível + moedas ---------- */
export const LevelContainer = styled.div<{ $expanded: boolean }>`
  color: #fff;
  margin: ${({ $expanded }) =>
    $expanded ? "45px 40px 24px" : "18px 20px 24px"};
`;
export const LevelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const LevelInfo = styled.div`
  min-width: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 32px;
    margin: 0;
    line-height: 0.7;
  }
  p {
    font-size: 14px;
    margin: 0;
  }
`;
export const ProgressBarContainer = styled.div`
  flex: 1;
`;
export const ProgressBar = styled.div<{ $percent: string }>`
  width: 100%;
  height: 10px;
  background: #fff;
  border-radius: 5px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    height: 100%;
    background: var(--orange);
    border-radius: 5px;
    ${({ $percent }) => css`
      width: ${$percent};
      transition: width 0.3s ease;
    `}
  }
`;
export const ExperienceText = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #fff;
  font-size: 14px;
  margin-top: 4px;
`;

/* ---------- Moedas Lupa (fechado) ---------- */
export const LupaPoints = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  margin-bottom: 3px;
  .lupa-footer-icon {
    width: 34px;
    height: 34px;
    display: block;
  }
  div {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const PointsValue = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
`;
export const PointsLabel = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
`;

/* ---------- área expandida ---------- */
export const ExpandedContent = styled.div<{ $expanded: boolean }>`
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  transform: translateY(${({ $expanded }) => ($expanded ? 0 : "20px")});
  visibility: ${({ $expanded }) => ($expanded ? "visible" : "hidden")};
  transition: all 0.3s ease;

  padding: 20px 40px;
  margin-top: 30px;

  /* rolagem — igual aos outros footers */
  max-height: calc(75vh - 200px); /* 200 = header + margem interna */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

/* ---------- conquistas ---------- */
export const AchievementsContain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Achievements = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 0;
`;
export const AchievementCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--orange);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;
export const AchievementTitle = styled.p`
  color: #fff;
  font-size: 14px;
  margin: 5px 0;
  text-align: center;
`;

/* ---------- info list ---------- */
export const InfoList = styled.ul`
  list-style: none;
  margin: 20px 0;
  padding: 0;
  color: #fff;
  li {
    font-size: 16px;
    font-weight: 700;
    line-height: 34px;
  }
`;
