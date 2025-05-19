/* ──────────────────────────────────────────────────────────────
   src/pages/AffiliateStores/Favorites.tsx
   ────────────────────────────────────────────────────────────── */
import React, { useCallback, useMemo, useState } from "react";
import {
  IonPage,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
} from "@ionic/react";
import { Link } from "react-router-dom";

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
  StoreLineLink,
} from "./Favorites.stlye";

import searchIcon from "../../assets/lupa-search.svg";
import sampleImg from "../../assets/sample-store.png";

import {
  getFavorites,
  FavoriteStore,
} from "../../services/favoritesService";

/* Paleta por categoria */
const categoryColors: Record<string, string> = {
  Cosméticos: "#E6C178",
  Alimentação: "#8E9455",
  Saúde: "#E0A075",
  Casa: "#E6C178",
  default: "#E6C178",
};

const Favorites: React.FC = () => {
  const [query, setQuery] = useState("");
  const [stores, setStores] = useState<FavoriteStore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ----------------------------------------------------------------
     Recarrega favoritos sempre que a view ganha foco (soft refresh)
     ---------------------------------------------------------------- */
  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFavorites();
      setStores(data);
    } catch (err) {
      console.error("[Favorites] Erro ao buscar favoritos:", err);
      setError("Não foi possível carregar seus favoritos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  useIonViewWillEnter(loadFavorites); // executa toda vez que volta para esta tela

  /* ----------------------------------------------------------------
     Filtro pelo campo de busca
     ---------------------------------------------------------------- */
  const filteredStores = useMemo(
    () =>
      (stores ?? []).filter((s) =>
        (s?.nome_local ?? "")
          .toLowerCase()
          .includes(query.toLowerCase().trim())
      ),
    [stores, query]
  );

  return (
    <IonPage>
      <AppHeader
        title="Meus Favoritos"
        backgroundColor="#E6C178"
        textColor="#FFFFFF"
      />

      <IonContent
        fullscreen
        style={{ "--background": "#FFFFFF" } as React.CSSProperties}
      >
        {/* pull-to-refresh manual, além do soft refresh automático */}
        <IonRefresher
          slot="fixed"
          onIonRefresh={(e) => loadFavorites().finally(() => e.detail.complete())}
        >
          <IonRefresherContent
            pullingText="Puxe para atualizar"
            refreshingSpinner="circles"
          />
        </IonRefresher>

        <ScrollArea>
          <Container>
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="O que você procura hoje?"
              iconSrc={searchIcon}
            />

            {error && <p style={{ color: "red", paddingLeft: 20 }}>{error}</p>}

            <ListWrapper>
              {filteredStores.map((store) => {
                const cardColor =
                  categoryColors[store.categoria ?? ""] ??
                  categoryColors.default;

                return (
                  <StoreCard key={store.id}>
                    {/* foto */}
                    <StoreImage
                      src={store.profile_photo || sampleImg}
                      alt={store.nome_local ?? "Estabelecimento"}
                    />

                    {/* informações */}
                    <StoreInfo style={{ background: cardColor }}>
                      <StoreLine>{store.nome_local ?? "—"}</StoreLine>
                      <StoreLine>{store.categoria ?? "—"}</StoreLine>
                      <StoreLine>
                        {store.horario_funcionamento ?? "—"}
                      </StoreLine>

                      {/* link para a página de detalhes */}
                      <StoreLineLink
                        as={Link}
                        to={`/affiliate-view/${store.id}`}
                      >
                        Ver benefícios
                      </StoreLineLink>
                    </StoreInfo>
                  </StoreCard>
                );
              })}

              {!loading && filteredStores.length === 0 && (
                <p style={{ paddingLeft: 20 }}>
                  Nenhum estabelecimento encontrado.
                </p>
              )}
            </ListWrapper>
          </Container>
        </ScrollArea>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
