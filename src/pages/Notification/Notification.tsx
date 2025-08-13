// src/pages/Notification/Notification.tsx
import { IonContent, IonPage } from "@ionic/react";
import React, { useCallback, useEffect, useState } from "react";
import AppHeader from "../../components/SimpleHeader";

import {
  Avatar,
  AvatarWrapper,
  ProfileContainer,
  ToggleLabel,
  ToggleOption,
  ToggleSwitch,
  ToggleWrapper,
  UserName,
  UserSubInfo,
} from "./Notification.style";

import { Preferences } from "@capacitor/preferences";
import { LOCAL_STORAGE_KEYS } from "../../config/constants";
import { useAuthContext } from "../../contexts/AuthContext";

type PreferenceKey = "receiveEmailAds" | "notifications";

const preferenceMap: Record<PreferenceKey, string> = {
  receiveEmailAds: LOCAL_STORAGE_KEYS.RECEIVE_EMAIL_ADS,
  notifications: LOCAL_STORAGE_KEYS.NOTIFICATIONS,
};

const Notification: React.FC = () => {
  const { user } = useAuthContext();
  const [prefs, setPrefs] = useState<Record<PreferenceKey, boolean>>({
    receiveEmailAds: false,
    notifications: false,
  });

  const loadPreferences = useCallback(async () => {
    const entries = await Promise.all(
      (Object.keys(preferenceMap) as PreferenceKey[]).map(async (key) => {
        const { value } = await Preferences.get({ key: preferenceMap[key] });
        return [key, value === "true"] as const;
      })
    );
    setPrefs(Object.fromEntries(entries) as typeof prefs);
  }, []);

  const togglePreference = async (key: PreferenceKey) => {
    const newValue = !prefs[key];
    setPrefs((prev) => ({ ...prev, [key]: newValue }));
    await Preferences.set({ key: preferenceMap[key], value: String(newValue) });
  };

  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  return (
    <IonPage>
      <AppHeader
        title="Notificações"
        backgroundColor="#868950"
        textColor="#FFFFFF"
      />

      <AvatarWrapper>
        <Avatar src={user?.avatar_url || "/assets/default-photo.png"} />
      </AvatarWrapper>

      <IonContent fullscreen style={{ "--background": "#FFFFFF" } as any}>
        <ProfileContainer>
          <UserName>{user?.name ?? ""}</UserName>
          <UserSubInfo>{user?.email ?? ""}</UserSubInfo>

          {/* Dois toggles com labels */}
          <ToggleWrapper>
            <ToggleOption>
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={prefs.receiveEmailAds}
                  onChange={() => togglePreference("receiveEmailAds")}
                />
                <span />
              </ToggleSwitch>
              <ToggleLabel>Receber e‑mails de promoção</ToggleLabel>
            </ToggleOption>
            <ToggleOption>
              <ToggleSwitch>
                <input
                  type="checkbox"
                  checked={prefs.notifications}
                  onChange={() => togglePreference("notifications")}
                />
                <span />
              </ToggleSwitch>
              <ToggleLabel>Notificações</ToggleLabel>
            </ToggleOption>
          </ToggleWrapper>
        </ProfileContainer>
      </IonContent>
    </IonPage>
  );
};

export default Notification;
