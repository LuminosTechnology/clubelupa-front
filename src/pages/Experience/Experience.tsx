import React, { useEffect, useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { useLocation } from "react-router-dom";

import AppHeader from "../../components/SimpleHeader";
import SearchBar from '../../components/SearchButton/SearchBar';

import {
  ScrollArea,
  Container,
  ListWrapper,
  StoreCard,
  StoreInfo,
  StoreLine,
} from "./Experience.style";

import searchIcon from "../../assets/lupa-search.svg";
import { ExperienceService } from "../../services/experiencesService";
import { ExperienceHistory } from "../../types/api/experiences";

export interface Store {
  id: number;
  name: string;
  category: string;
  img: string;
}


const Experience: React.FC = () => {
  const [query, setQuery] = useState("");
  const [experiences, setExperiences] = useState<ExperienceHistory[]>([]);
  const location = useLocation();
 
  const fetchExperiences = async () => {
    const response = await ExperienceService.getExperiencesByUser();
    setExperiences(response);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [location.pathname]);

  return (
    <IonPage>
      <AppHeader
        title="Histórico de Exp."
        backgroundColor="#E0A075"
        textColor="#FFFFFF"
      />

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as React.CSSProperties}>
        <ScrollArea>
          <Container>
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="O que você procura hoje?"
              iconSrc={searchIcon}
            />

            <ListWrapper>
              {experiences.map(exp => (
                <StoreCard key={exp.id}>
                  <StoreInfo>
                    <StoreLine>{exp.experience_name}</StoreLine>
                    <StoreLine>{exp.establishment_name}</StoreLine>
                    <StoreLine>{exp.cost_in_coins} Moedas</StoreLine>
                  </StoreInfo>
                </StoreCard>
              ))}
            </ListWrapper>
          </Container>
        </ScrollArea>
      </IonContent>
    </IonPage>
  );
};

export default Experience;
