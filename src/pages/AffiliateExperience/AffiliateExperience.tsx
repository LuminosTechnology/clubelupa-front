// src/pages/AffiliateExperience/AffiliateExperiencePage.tsx

import React, { useState, useEffect, useCallback } from 'react';
import {
  IonPage,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonSpinner,
  IonAlert,
  IonToast,
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { RefresherEventDetail } from '@ionic/core';

import AppHeader from '../../components/SimpleHeader';
import {
  Container,
  TabsContainer,
  VoucherCard,
  VoucherInfo,
  UserInfo,
  ActionContainer,
  NoResultsMessage,
  VoucherHeader,
} from './AffiliateExperience.style';

// Importando do serviço e tipos reais
import {
  getToUseRedemptions,
  getRedeemed,
  markRedemptionAsUsed,
} from '../../services/affiliateService';
import { ExperienceRedemption } from '../../types/api/affiliateExperience';

export function AffiliateExperiencePage() {
  const [activeTab, setActiveTab] = useState<'toRedeem' | 'redeemed'>('toRedeem');
  const [toRedeemList, setToRedeemList] = useState<ExperienceRedemption[]>([]);
  const [redeemedList, setRedeemedList] = useState<ExperienceRedemption[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showApprovalAlert, setShowApprovalAlert] = useState(false);
  const [selectedRedemption, setSelectedRedemption] = useState<ExperienceRedemption | null>(null);
  const [toast, setToast] = useState<{ message: string; color: string; icon: string } | null>(null);

  const fetchData = useCallback(async (showLoadingSpinner = true) => {
    if (showLoadingSpinner) {
      setLoading(true);
    }
    
    try {
      if (activeTab === 'toRedeem') {
        const response = await getToUseRedemptions();
        setToRedeemList(response.data);
      } else {
        const response = await getRedeemed();
        setRedeemedList(response.data);
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Falha ao carregar os dados. Tente novamente.';
      setToast({ message: errorMessage, color: 'danger', icon: closeCircleOutline });
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await fetchData(false); // não mostra o spinner central, só o do refresher
    event.detail.complete();
  };

  const handleApproveClick = (redemption: ExperienceRedemption) => {
      setSelectedRedemption(redemption);
      setShowApprovalAlert(true);
  };

  const handleConfirmRedemption = async (redemptionCode: string) => {
      if (!redemptionCode?.trim()) {
          setToast({ message: 'Por favor, insira um código.', color: 'warning', icon: closeCircleOutline });
          return;
      }

      try {
          await markRedemptionAsUsed(redemptionCode);
          setToast({ message: 'Voucher resgatado com sucesso!', color: 'success', icon: checkmarkCircleOutline });
          
          // Atualiza a lista A Resgatar, removendo o que foi aprovado
          setToRedeemList(prev => prev.filter(item => item.id !== selectedRedemption?.id));
          
      } catch (err: any) {
           const errorMessage = err?.response?.data?.message || 'Ocorreu um erro desconhecido.';
           setToast({ message: errorMessage, color: 'danger', icon: closeCircleOutline });
      }
  };
  
  const handleTabChange = (tab: 'toRedeem' | 'redeemed') => {
      setActiveTab(tab);
      // Limpa as listas para evitar mostrar dados antigos enquanto carrega
      if (tab === 'toRedeem') setRedeemedList([]);
      else setToRedeemList([]);
  }

  const renderList = (list: ExperienceRedemption[], isRedeemedTab: boolean) => {
    if (loading) {
      return <IonSpinner name="crescent" style={{ display: 'block', margin: 'auto', marginTop: '50px' }} />;
    }
    if (list.length === 0) {
      return (
        <NoResultsMessage>
          {isRedeemedTab ? 'Nenhum voucher foi resgatado ainda.' : 'Nenhum voucher a ser resgatado no momento.'}
        </NoResultsMessage>
      );
    }
    return (
      <IonList style={{ background: 'transparent' }}>
        {list.map((item) => (
          <VoucherCard key={item.id}>
            <VoucherHeader>
                <h3>{item.experience_name}</h3>
            </VoucherHeader>
            <UserInfo>
              <p><strong>Sócio:</strong> {item.user.name}</p>
              <p><strong>Email:</strong> {item.user.email}</p>
              <p><strong>Telefone:</strong> {item.user.phone_number}</p>
            </UserInfo>
            <ActionContainer>
              {isRedeemedTab ? (
                 <VoucherInfo>
                    <span><strong>Utilizado em:</strong> {item.used_at?.short_with_time}</span>
                    <span><strong>Código:</strong> {item.redemption_code}</span>
                 </VoucherInfo>
              ) : (
                <IonButton expand="block" onClick={() => handleApproveClick(item)}>
                  Aprovar
                </IonButton>
              )}
            </ActionContainer>
          </VoucherCard>
        ))}
      </IonList>
    );
  };

  return (
    <IonPage>
      <AppHeader title="Gerenciar Experiências" backgroundColor="#868950" textColor="#FFFFFF" />
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <Container>
          <TabsContainer>
            <IonSegment value={activeTab} onIonChange={(e) => handleTabChange(e.detail.value as any)}>
              <IonSegmentButton value="toRedeem">
                <IonLabel>A Resgatar</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="redeemed">
                <IonLabel>Resgatados</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </TabsContainer>

          {activeTab === 'toRedeem' ? renderList(toRedeemList, false) : renderList(redeemedList, true)}
        </Container>
      </IonContent>
      
      <IonAlert
        isOpen={showApprovalAlert}
        onDidDismiss={() => setShowApprovalAlert(false)}
        header={'Aprovar Resgate'}
        message={`Insira o código localizador fornecido pelo sócio para confirmar o uso da experiência: <br/><strong>${selectedRedemption?.experience_name}</strong>`}
        inputs={[{ name: 'redemptionCode', type: 'text', placeholder: 'Código Localizador' }]}
        buttons={[
          { text: 'Cancelar', role: 'cancel' },
          { text: 'Confirmar', handler: (data) => handleConfirmRedemption(data.redemptionCode) },
        ]}
        cssClass="custom-alert"
      />
      
      <IonToast
        isOpen={!!toast}
        message={toast?.message}
        onDidDismiss={() => setToast(null)}
        duration={4000}
        color={toast?.color}
        position="top"
        icon={toast?.icon}
      />
    </IonPage>
  );
}