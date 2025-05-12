
import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import AppHeader from '../../components/SimpleHeader';
import qrCodePic from '../../assets/qrcode.png'; 

const ScannerNote: React.FC = () => {
  return (
    <IonPage>
      <AppHeader
        title="Escanear Nota Fiscal"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <IonContent
        fullscreen
        style={{
          '--background': '#CCCCCC',
        } as any}
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={qrCodePic}
              alt="QR Code"
              style={{
                width: '280px',
                height: '280px',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ScannerNote;
