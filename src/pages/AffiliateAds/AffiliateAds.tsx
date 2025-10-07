import { IonContent, IonModal, IonPage, IonAlert, IonButton } from "@ionic/react";
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
import { ProductPurchaseService } from "../../services/product-purchase-service";

export function AffiliateAdsPage() {
  const [advertisingProducts, setAdvertisingProducts] = useState<
    AdvertisementData[]
  >([]);

  const [selectedProduct, setSelectedProduct] = useState<
    AdvertisementData | undefined
  >();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchAdvertisingProducts = async () => {
      const response = await getAdvertisingProducts();
      setAdvertisingProducts(response.data);
    };
    fetchAdvertisingProducts();
  }, []);

  const convertPrice = (value: string) => {
    const valueNumber = Number(value);

    const hasCents = valueNumber % 1 !== 0;

    return hasCents
      ? `R$ ${valueNumber.toFixed(2).replace(".", ",")}`
      : `R$ ${valueNumber.toFixed(0)}`;
  };

  const handlePurchaseClick = () => {
    console.log("Purchase button clicked, setting showConfirmation to true");
    setShowConfirmation(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedProduct) return;

    setIsPurchasing(true);
    try {
      const response = await ProductPurchaseService.purchaseProduct(selectedProduct.id);
      setAlertMessage(response.message);
      setShowAlert(true);
      setSelectedProduct(undefined);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error purchasing product:", error);
      setAlertMessage("Erro ao processar a compra. Tente novamente.");
      setShowAlert(true);
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleCancelPurchase = () => {
    setShowConfirmation(false);
  };

  return (
    <IonPage>
      <AppHeader
        title="Loja do Afiliado"
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
              <ShopItemFooter onClick={() => setSelectedProduct(product)}>
                <ShopItemInfo>
                  <strong>{product.name}</strong>
                  <p>Ver mais</p>
                </ShopItemInfo>
                <ShopItemInfo>
                  {convertPrice(String(product?.price) || "00.00")}
                </ShopItemInfo>
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
            title={"Loja do Afiliado"}
            backgroundColor="#868950"
            textColor="#FFFFFF"
            onBack={() => setSelectedProduct(undefined)}
          />
          <ModalContainer>
            <ModalTitle>{selectedProduct?.name}</ModalTitle>
            <ModalParagraph>{selectedProduct?.description}</ModalParagraph>
            <ModalButton onClick={handlePurchaseClick}>
              <b>{selectedProduct?.name}</b> {' '}
              por {convertPrice(String(selectedProduct?.price || "00.00"))}
            </ModalButton>
          </ModalContainer>
        </IonContent>
      </IonModal>

      <IonModal isOpen={showConfirmation} onDidDismiss={handleCancelPurchase}>
        <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              color: '#868950', 
              fontSize: '1.5rem', 
              marginBottom: '1rem',
              fontFamily: 'Addington CF, serif'
            }}>
              Confirmação de Compra
            </h2>
            <p style={{ 
              color: '#666', 
              fontSize: '1.1rem', 
              marginBottom: '2rem',
              lineHeight: '1.5'
            }}>
              Tem certeza de que quer comprar este serviço?
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              width: '100%',
              maxWidth: '300px'
            }}>
              <IonButton
                fill="outline"
                onClick={handleCancelPurchase}
                disabled={isPurchasing}
                style={{ flex: 1 }}
              >
                Cancelar
              </IonButton>
              <IonButton
                fill="solid"
                onClick={handleConfirmPurchase}
                disabled={isPurchasing}
                style={{ 
                  flex: 1,
                  '--background': '#868950',
                  '--background-hover': '#6d6f3f',
                  color: 'white'
                } as any}
              >
                {isPurchasing ? "Processando..." : "Sim, quero comprar"}
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Tudo certo!"
        message={alertMessage}
        buttons={['OK']}
      />
    </IonPage>
  );
}
