import React, { useEffect, useMemo, useState } from "react";
import { IonPage, IonContent, IonLoading, IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";

import AppHeader from "../../components/SimpleHeader";
import SearchBar from "../../components/SearchButton/SearchBar";

import {
  ScrollArea,
  Container,
  ListWrapper,
  StoreCard,
  StoreImage,
  StoreInfo,
  StoreLine,
} from "./AffiliateStoresPage.style";

import { AffiliateData } from "../../services/interfaces/Affiliate";
import { getAllAffiliates } from "../../services/affiliateService";

import searchIcon from "../../assets/lupa-search.svg";
import sampleImg from "../../assets/sample-store.png";
import { Affiliate } from "../../types/api/affiliate";

interface CardStore {
  id: number;
  name: string;
  category?: string;
  schedule?: string;
  benefits?: string;
  color?: string;
  img?: string;
}

const mapToCard = (a: AffiliateData): CardStore => ({
  id: a.id,
  name: a.nome_local || a.nome_fantasia,
  category: a.categoria,
  schedule: a.horario_funcionamento,
  benefits: a.benefits,
  color: a.color ?? "#E6C178",
  img: a.foto_perfil ?? sampleImg,
});

const AffiliateStoresPage: React.FC = () => {
  const history = useHistory();

  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  /* ─── carrega da API ───────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllAffiliates();
        setAffiliates(data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ??
            "Não foi possível carregar os afiliados."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ─── filtro local ─────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return affiliates;
    return affiliates.filter((s) => s.nome_marca.toLowerCase().includes(q));
  }, [affiliates, query]);

  return (
    <IonPage>
      <AppHeader
        title="Afiliados"
        backgroundColor="#E6C178"
        textColor="#FFFFFF"
      />

      <IonContent
        fullscreen
        style={{ "--background": "#FFFFFF" } as React.CSSProperties}
      >
        <IonLoading isOpen={loading} message="Carregando afiliados…" />
        <IonToast
          isOpen={!!error}
          message={error}
          color="danger"
          duration={4000}
          onDidDismiss={() => setError(undefined)}
        />

        <ScrollArea>
          <Container>
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="O que você procura hoje?"
              iconSrc={searchIcon}
            />

            <ListWrapper>
              {filtered.map((s) => (
                <StoreCard
                  key={s.id}
                  onClick={() => history.push(`/affiliate-view/${s.id}`)}
                >
                  <StoreImage src={sampleImg} alt={s.nome_marca} />

                  <StoreInfo style={{ background: "#E6C178" }}>
                    <StoreLine>{s.nome_completo}</StoreLine>
                    {!!s.categoria && <StoreLine>{s.categoria}</StoreLine>}
                    {/* {!!s.horario && <StoreLine>{s.schedule}</StoreLine>} */}
                    {/* {!!s.benefits && <StoreLine>{s.benefits}</StoreLine>} */}
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

export default AffiliateStoresPage;
