// src/pages/Experience/Experience.tsx

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonLabel, IonSpinner, IonList } from "@ionic/react";

import AppHeader from "../../components/SimpleHeader";
import SearchBar from '../../components/SearchButton/SearchBar';

import {
  Container,
  ListWrapper,
  StoreCard,
  StoreInfo,
  StoreLine,
  TabsContainer,
  RedemptionCodeWrapper,
  UsedDate,
  NoResultsMessage
} from "./Experience.style";

import searchIcon from "../../assets/lupa-search.svg";

// Importando o novo serviço e o tipo correto
import { ExperienceService } from "../../services/experience-partner-service";
import { ExperienceRedemption } from "../../types/api/affiliateExperience";

const Experience: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'toUse' | 'used'>('toUse');

  const [toUseList, setToUseList] = useState<ExperienceRedemption[]>([]);
  const [usedList, setUsedList] = useState<ExperienceRedemption[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'toUse') {
        const response = await ExperienceService.getUserToUseRedemptions();
        setToUseList(response.data);
      } else {
        const response = await ExperienceService.getUserRedeemed();
        setUsedList(response.data);
      }
    } catch (error) {
      console.error("Falha ao buscar experiências:", error);
      // Aqui você pode adicionar um toast de erro se desejar
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filterExperiences = (list: ExperienceRedemption[]) => {
      if (!query) return list;
      const queryLower = query.toLowerCase();
      return list.filter(exp =>
          (exp.experience_name || '').toLowerCase().includes(queryLower) ||
          (exp.establishment_name || '').toLowerCase().includes(queryLower)
      );
  };
  
  // Usando useMemo para evitar re-filtragens desnecessárias
  const filteredToUseList = useMemo(() => filterExperiences(toUseList), [toUseList, query]);
  const filteredUsedList = useMemo(() => filterExperiences(usedList), [usedList, query]);

  const renderList = (list: ExperienceRedemption[], isUsedTab: boolean) => {
    if (loading) {
      return <IonSpinner name="crescent" style={{ display: 'block', margin: 'auto', marginTop: '50px' }}/>;
    }

    if (list.length === 0) {
        return (
            <NoResultsMessage>
                {query 
                    ? "Nenhum resultado encontrado para sua busca."
                    : (isUsedTab ? 'Você ainda não resgatou nenhuma experiência.' : 'Você não possui experiências para resgatar.')}
            </NoResultsMessage>
        );
    }

    return (
      <IonList style={{ background: 'transparent' }}>
        {list.map(exp => (
          <StoreCard key={exp.id}>
            <StoreInfo>
              <StoreLine>{exp.experience_name}</StoreLine>
              <StoreLine>{exp.establishment_name}</StoreLine>
              <StoreLine>{exp.cost_in_coins} Moedas</StoreLine>
            </StoreInfo>
            {isUsedTab ? (
              <UsedDate>
                Utilizado em: {exp.used_at?.short_with_time}
              </UsedDate>
            ) : (
              <RedemptionCodeWrapper>
                <p>Apresente este código no estabelecimento:</p>
                <span>{exp.redemption_code}</span>
              </RedemptionCodeWrapper>
            )}
          </StoreCard>
        ))}
      </IonList>
    );
  };

  return (
    <IonPage>
      <AppHeader
        title="Minhas Experiências"
        backgroundColor="#E0A075"
        textColor="#FFFFFF"
      />

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as React.CSSProperties}>
          <Container>
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Buscar por experiência ou local"
              iconSrc={searchIcon}
            />

            <TabsContainer>
                <IonSegment value={activeTab} onIonChange={e => setActiveTab(e.detail.value as any)}>
                    <IonSegmentButton value="toUse">
                        <IonLabel>A Resgatar</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="used">
                        <IonLabel>Resgatados</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
            </TabsContainer>

            <ListWrapper>
              {activeTab === 'toUse' 
                ? renderList(filteredToUseList, false) 
                : renderList(filteredUsedList, true)
              }
            </ListWrapper>
          </Container>
      </IonContent>
    </IonPage>
  );
};

export default Experience;