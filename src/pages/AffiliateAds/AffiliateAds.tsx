import { IonContent, IonModal, IonPage } from "@ionic/react";
import AppHeader from "../../components/SimpleHeader";
import {
  Container,
  ModalButton,
  ModalContainer,
  ModalParagraph,
  ModalTitle,
  ShopItem,
  ShopItemFooter,
  ShopItemInfo,
  Title,
} from "./styles";
import { useEffect, useState } from "react";
import { AdvertisementData } from "../../types/api/affiliate";
import { getAdvertisingProducts } from "../../services/affiliateService";

export function AffiliateAdsPage() {
  const [advertisingProducts, setAdvertisingProducts] = useState<
    AdvertisementData[]
  >([]);

  const [selectedProduct, setSelectedProduct] = useState<
    AdvertisementData | undefined
  >();

  useEffect(() => {
    const fetchAdvertisingProducts = async () => {
      const response = await getAdvertisingProducts();
      setAdvertisingProducts(response.data);
    };
    fetchAdvertisingProducts();
  }, []);

  return (
    <IonPage>
      <AppHeader
        title="Publicidade"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />
      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <Container>
          <Title>Destaque sua marca</Title>
          {advertisingProducts.map((product) => (
            <ShopItem key={product.id}>
              <img
                src={product.image_url || "/assets/default-photo.png"}
                alt={product.name}
              />
              <ShopItemFooter>
                <ShopItemInfo>
                  <strong>{product.name}</strong>
                  <button onClick={() => setSelectedProduct(product)}>
                    Ver mais
                  </button>
                </ShopItemInfo>
                <ShopItemInfo>R$ {product.price}</ShopItemInfo>
              </ShopItemFooter>
            </ShopItem>
          ))}
        </Container>
      </IonContent>
      <IonModal
        isOpen={!!selectedProduct}
        onDidDismiss={() => setSelectedProduct(undefined)}
      >
        <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
          <AppHeader
            title={"Publicidade"}
            backgroundColor="#868950"
            textColor="#FFFFFF"
            onBack={() => setSelectedProduct(undefined)}
          />
          <ModalContainer>
            <ModalTitle>{selectedProduct?.name}</ModalTitle>
            <ModalParagraph>{selectedProduct?.description}</ModalParagraph>
            <ModalButton>
              <b>{selectedProduct?.name}</b>
              <br />
              por R$ {selectedProduct?.price}
            </ModalButton>
          </ModalContainer>
        </IonContent>
      </IonModal>
    </IonPage>
  );
}
