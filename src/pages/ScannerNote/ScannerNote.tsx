import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import styled, { keyframes } from 'styled-components';
import AppHeader from '../../components/SimpleHeader';
import qrCodePic from '../../assets/qrcode.png';
import scanFrame from '../../assets/scanqr.png';

const sweep = keyframes`
  0%   { top: -2px; }
  50%  { top: calc(100% - 2px); }
  100% { top: -2px; }
`;

const Outer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FrameWrap = styled.div`
  position: relative;
  width: 340px;
  height: 340px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FrameImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 2;
  pointer-events: none;
`;

const ScanArea = styled.div`
  position: absolute;
  width: 240px;
  height: 240px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QR = styled.img`
  width: 220px;
  height: 220px;
  object-fit: contain;
  z-index: 1;
`;

const RedLine = styled.div`
  position: absolute;
  left: 50%;
  width: 340px;
  height: 2px;
  background: #ff0000;
  transform: translateX(-50%);
  animation: ${sweep} 3s linear infinite;
  will-change: top;
  z-index: 4;
  pointer-events: none;
`;

const ScannerNote: React.FC = () => (
  <IonPage>
    <AppHeader title="Escanear Nota Fiscal" backgroundColor="#868950" textColor="#FFFFFF" />
    <IonContent fullscreen style={{ '--background': '#CCCCCC' } as any}>
      <Outer>
        <FrameWrap>
          <ScanArea>
            <QR src={qrCodePic} alt="QR Code" />
          </ScanArea>
          <RedLine />
          <FrameImg src={scanFrame} alt="Moldura de scan" />
        </FrameWrap>
      </Outer>
    </IonContent>
  </IonPage>
);

export default ScannerNote;
