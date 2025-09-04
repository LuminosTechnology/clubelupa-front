import { Capacitor } from "@capacitor/core";
import { PurchasesPackage } from "@revenuecat/purchases-capacitor";
import { useEffect, useState } from "react";

type RevenueCatHook = {
  packages: PurchasesPackage[];
  hasSubscription: boolean;
  isLoading: boolean;
  error: string | null;
  purchase: (pkg: PurchasesPackage) => Promise<void>;
};

export const useRevenueCatPackages = (): RevenueCatHook => {
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      if (!Capacitor.isNativePlatform() || !window.Purchases) {
        setError("Funcionalidade de assinatura não disponível no dispositivo");
        setIsLoading(false);
        return;
      }

      try {
        const { customerInfo } = await window.Purchases.getCustomerInfo();
        setHasSubscription(!!customerInfo.entitlements.active["socio_premium"]);

        const offerings = await window.Purchases.getOfferings();
        const availablePackages = offerings.current?.availablePackages || [];
        setPackages(availablePackages);
      } catch (error: any) {
        setError(error.message || "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const purchase = async (pkg: PurchasesPackage) => {
    try {
      if (!window.Purchases) return;
      await window.Purchases.purchasePackage({ aPackage: pkg });
      alert("Parabéns! Assinatura ativada!");
      setHasSubscription(true);
    } catch (error: any) {
      if (error.code !== "PURCHASE_CANCELLED") {
        setError(error.message);
      }
    }
  };
  return { error, packages, hasSubscription, isLoading, purchase };
};
