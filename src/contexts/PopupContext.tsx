import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { PopupData, PopupService } from "../services/popup-service";

interface PopupContextType {
    currentPopup: PopupData | null;
    dismissPopup: () => void;
    handlePopupAction: () => void; // Para lidar com o clique na imagem
    postPopupRedirect: string | null;
    clearPostPopupRedirect: () => void;
}

export const PopupContext = createContext<PopupContextType>({} as PopupContextType);

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentPopup, setCurrentPopup] = useState<PopupData | null>(null);
    const [postPopupRedirect, setPostPopupRedirect] = useState<string | null>(null);

    const fetchNextPopup = useCallback(async () => {
        // Só busca um novo pop-up se não houver um sendo exibido
        if (currentPopup) return;

        const response = await PopupService.getNextPopup();
        if (response) {
            setCurrentPopup(response.data);
        }
    }, [currentPopup]);

    // Lógica de verificação a cada 5 minutos
    useEffect(() => {
        // Faz uma verificação inicial assim que o app carrega
        fetchNextPopup();

        // Configura o intervalo para verificações futuras
        const intervalId = setInterval(() => {
            fetchNextPopup();
        }, 5 * 60 * 1000); // 5 minutos em milissegundos

        // Limpa o intervalo quando o provider for desmontado para evitar memory leaks
        return () => clearInterval(intervalId);
    }, [fetchNextPopup]);

    const dismissPopup = () => {
        setCurrentPopup(null);
    };
    
    const handlePopupAction = () => {
        if (currentPopup?.establishment_id) {
            setPostPopupRedirect(`/affiliate-view/${currentPopup.establishment_id}`);
        }
        dismissPopup();
    };

    const clearPostPopupRedirect = () => {
        setPostPopupRedirect(null);
    };

    useEffect(() => {
        if (import.meta.env.DEV) {
            console.log("Modo de teste de Popup ativado. Use window.testPopup(data) no console.");

            const triggerTestPopup = (customPopupData: PopupData) => {
                console.log("Disparando popup de teste com os dados:", customPopupData);

                setCurrentPopup(customPopupData);
            };
            
            ( window as any ).testPopup = triggerTestPopup;
        }
    }, []);

    return (
        <PopupContext.Provider value={{
            currentPopup,
            dismissPopup,
            handlePopupAction,
            postPopupRedirect,
            clearPostPopupRedirect
        }}>
            {children}
        </PopupContext.Provider>
    );
};

export const usePopupContext = () => useContext(PopupContext);